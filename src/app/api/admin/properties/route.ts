import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const verified = searchParams.get("verified");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (verified === "true") where.verified = true;
    if (verified === "false") where.verified = false;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: where as any,
        include: { owner: { select: { name: true, email: true, role: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.property.count({ where: where as any }),
    ]);

    return NextResponse.json({ properties, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin properties error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { id, ...data } = await req.json();
    const property = await prisma.property.update({ where: { id }, data });

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Admin property update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
