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
    const role = searchParams.get("role");

    const where: Record<string, unknown> = {};
    if (role) where.role = role;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: where as any,
        select: {
          id: true, name: true, email: true, phone: true, role: true, verified: true,
          city: true, state: true, latitude: true, longitude: true,
          lastLoginAt: true, lastLoginIp: true, createdAt: true,
          _count: { select: { properties: true, inquiries: true, favorites: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where: where as any }),
    ]);

    return NextResponse.json({ users, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin users error:", error);
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
    delete data.password;
    delete data.email;

    const user = await prisma.user.update({ where: { id }, data });
    return NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
