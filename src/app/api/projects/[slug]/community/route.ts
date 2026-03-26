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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = `/projects/${slug}`;
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "true";
    const session = await getSession();
    const isAdmin = !!session && session.role === "admin";

    const logs = await prisma.activityLog.findMany({
      where: {
        page,
        action: { in: ["project_review", "locality_review", "forum_thread"] },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const parsedProjectReviews = logs
      .filter((log) => log.action === "project_review")
      .map((log) => safeParse(log.details))
      .filter(Boolean);
    const parsedLocalityReviews = logs
      .filter((log) => log.action === "locality_review")
      .map((log) => safeParse(log.details))
      .filter(Boolean);
    const parsedThreads = logs
      .filter((log) => log.action === "forum_thread")
      .map((log) => safeParse(log.details))
      .filter(Boolean);

    const filterByStatus = (items: any[]) => {
      if (adminMode && isAdmin) return items;
      return items.filter((item) => !item.status || item.status === "approved");
    };

    return NextResponse.json({
      projectReviews: filterByStatus(parsedProjectReviews),
      localityReviews: filterByStatus(parsedLocalityReviews),
      threads: filterByStatus(parsedThreads),
    });
  } catch (error) {
    console.error("Project community GET error:", error);
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
    const body = await req.json();
    const type = String(body.type || "");
    const page = `/projects/${slug}`;

    const action =
      type === "project"
        ? "project_review"
        : type === "locality"
          ? "locality_review"
          : type === "forum"
            ? "forum_thread"
            : "";
    if (!action) {
      return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
    }

    const payload =
      type === "forum"
        ? {
            id: crypto.randomUUID(),
            title: String(body.title || ""),
            replies: 0,
            lastActive: "just now",
            status: "pending",
            userId: session.userId,
            author: session.name || "User",
          }
        : {
            id: crypto.randomUUID(),
            author: session.name || String(body.author || "User"),
            rating: Number(body.rating || 4),
            text: String(body.text || ""),
            tag: type === "project" ? "Buyer" : "Resident",
            status: "pending",
            userId: session.userId,
          };

    await prisma.activityLog.create({
      data: {
        action,
        page,
        details: JSON.stringify(payload),
      },
    });

    return NextResponse.json({ message: "Community post created" }, { status: 201 });
  } catch (error) {
    console.error("Project community POST error:", error);
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
      return NextResponse.json({ error: "id and status are required" }, { status: 400 });
    }
    const page = `/projects/${slug}`;
    const logs = await prisma.activityLog.findMany({
      where: {
        page,
        action: { in: ["project_review", "locality_review", "forum_thread"] },
      },
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
    console.error("Project community PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
