import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.userId },
      include: {
        property: {
          include: { owner: { select: { name: true, email: true, phone: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Favorites GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please login to save favorites" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    const existing = await prisma.favorite.findUnique({
      where: { userId_propertyId: { userId: session.userId, propertyId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ message: "Removed from favorites", added: false });
    }

    await prisma.favorite.create({
      data: { userId: session.userId, propertyId },
    });

    return NextResponse.json({ message: "Added to favorites", added: true });
  } catch (error) {
    console.error("Favorites POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
