import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (session.role !== "admin") {
      where.userId = session.userId;
    }
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where: where as any,
      include: {
        property: { select: { id: true, title: true, city: true, price: true, images: true, type: true } },
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Inquiries GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please login to send inquiries" }, { status: 401 });
    }

    const { propertyId, message, phone } = await req.json();

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId,
        userId: session.userId,
        userName: session.name,
        userEmail: session.email,
        userPhone: phone,
        message,
      },
    });

    return NextResponse.json({ inquiry, message: "Inquiry sent successfully" }, { status: 201 });
  } catch (error) {
    console.error("Inquiry POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
