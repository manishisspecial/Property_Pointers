import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function safeParse(value: string | null | undefined) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

const ALLOWED_ACTIONS = ["developer_review", "developer_feedback"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "true";
    const session = await getSession();
    const isAdmin = !!session && session.role === "admin";
    const page = `/developers/${slug}`;

    const logs = await prisma.activityLog.findMany({
      where: { page, action: { in: ALLOWED_ACTIONS } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const reviews = logs
      .filter((log) => log.action === "developer_review")
      .map((log) => safeParse(log.details))
      .filter(Boolean);
    const feedback = logs
      .filter((log) => log.action === "developer_feedback")
      .map((log) => safeParse(log.details))
      .filter(Boolean);

    const visible = (items: any[]) => {
      if (adminMode && isAdmin) return items;
      return items.filter((item) => !item.status || item.status === "approved");
    };

    return NextResponse.json({ reviews: visible(reviews), feedback: visible(feedback) });
  } catch (error) {
    console.error("Developer community GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Please login to post" }, { status: 401 });
    }
    const { slug } = await params;
    const { type, text, rating } = await req.json();
    if (!["review", "feedback"].includes(type) || !text) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const action = type === "review" ? "developer_review" : "developer_feedback";
    const payload =
      type === "review"
        ? {
            id: crypto.randomUUID(),
            author: session.name || "User",
            rating: Number(rating || 4),
            text: String(text),
            status: "pending",
            userId: session.userId,
          }
        : {
            id: crypto.randomUUID(),
            type: "Buyer",
            text: String(text),
            status: "pending",
            userId: session.userId,
          };

    await prisma.activityLog.create({
      data: {
        userId: session.userId,
        action,
        page: `/developers/${slug}`,
        details: JSON.stringify(payload),
      },
    });

    return NextResponse.json({ message: "Submitted for moderation" }, { status: 201 });
  } catch (error) {
    console.error("Developer community POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const { slug } = await params;
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }
    const page = `/developers/${slug}`;
    const logs = await prisma.activityLog.findMany({
      where: { page, action: { in: ALLOWED_ACTIONS } },
    });
    for (const log of logs) {
      const data = safeParse(log.details);
      if (data && data.id === id) {
        data.status = status;
        await prisma.activityLog.update({
          where: { id: log.id },
          data: { details: JSON.stringify(data) },
        });
        return NextResponse.json({ message: "Moderation updated" });
      }
    }
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  } catch (error) {
    console.error("Developer community PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
