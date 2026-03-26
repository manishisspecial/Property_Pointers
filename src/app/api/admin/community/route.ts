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

const ACTIONS = [
  "project_review",
  "locality_review",
  "forum_thread",
  "developer_review",
  "developer_feedback",
];

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const logs = await prisma.activityLog.findMany({
      where: { action: { in: ACTIONS } },
      orderBy: { createdAt: "desc" },
      take: 300,
    });

    const entries = logs
      .map((log) => {
        const details = safeParse(log.details) || {};
        return {
          id: log.id,
          contentId: details.id || log.id,
          action: log.action,
          page: log.page,
          status: details.status || "approved",
          author: details.author || "User",
          text: details.text || details.title || "",
          rating: details.rating ?? null,
          createdAt: log.createdAt,
          moderatedBy: details.moderatedBy || null,
          moderatedAt: details.moderatedAt || null,
          moderationHistory: details.moderationHistory || [],
        };
      })
      .filter((entry) => (status ? entry.status === status : true))
      .filter((entry) => (type ? entry.action === type : true));

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Admin community GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }
    const existing = await prisma.activityLog.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    const details = safeParse(existing.details) || {};
    details.status = status;
    details.moderatedBy = session.name || session.email || "Admin";
    details.moderatedAt = new Date().toISOString();
    details.moderationHistory = Array.isArray(details.moderationHistory) ? details.moderationHistory : [];
    details.moderationHistory.push({
      status,
      by: session.name || session.email || "Admin",
      at: details.moderatedAt,
    });
    await prisma.activityLog.update({
      where: { id },
      data: { details: JSON.stringify(details) },
    });
    return NextResponse.json({ message: "Moderation updated" });
  } catch (error) {
    console.error("Admin community PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
