import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true, phone: true, role: true, avatar: true, createdAt: true } },
        reviews: { include: { user: { select: { name: true, avatar: true } } }, orderBy: { createdAt: "desc" } },
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    await prisma.property.update({ where: { id }, data: { views: { increment: 1 } } });

    return NextResponse.json({ property });
  } catch (error) {
    console.error("Property GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.ownerId !== session.userId && session.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const data = await req.json();
    const updated = await prisma.property.update({ where: { id }, data });

    return NextResponse.json({ property: updated });
  } catch (error) {
    console.error("Property PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.ownerId !== session.userId && session.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Property deleted" });
  } catch (error) {
    console.error("Property DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
