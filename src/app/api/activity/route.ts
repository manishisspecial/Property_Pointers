import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const { action, page, latitude, longitude, details } = await req.json();

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    let city: string | undefined;
    if (latitude && longitude) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          { headers: { "User-Agent": "PropertyPointers/1.0" } }
        );
        const geo = await res.json();
        city = geo?.address?.city || geo?.address?.town || geo?.address?.village;
      } catch {}
    }

    await prisma.activityLog.create({
      data: {
        userId: session?.userId || null,
        action,
        details,
        ip,
        userAgent,
        latitude: latitude || null,
        longitude: longitude || null,
        city: city || null,
        page,
      },
    });

    if (session?.userId && latitude && longitude) {
      await prisma.user.update({
        where: { id: session.userId },
        data: { latitude, longitude, city: city || undefined },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activity log error:", error);
    return NextResponse.json({ success: false, error: "Could not save your request" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    const [activities, total] = await Promise.all([
      prisma.activityLog.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activityLog.count(),
    ]);

    return NextResponse.json({ activities, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Activity GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
