import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const serviceableOnly = searchParams.get("serviceable") !== "false";

    const where: Record<string, unknown> = {};
    if (serviceableOnly) where.isServiceable = true;
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { state: { contains: q, mode: "insensitive" } },
      ];
    }

    const cities = await prisma.city.findMany({
      where: where as any,
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Cities GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
