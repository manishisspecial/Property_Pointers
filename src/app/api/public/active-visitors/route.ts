import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ROWS = 8000;
const SETTINGS_ID = "default";

/**
 * Public aggregate for the home page "Browsing right now" stat.
 * Admin can choose real-time unique visitors (15 min window) or a fixed manual number (SiteSettings).
 */
export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: SETTINGS_ID } });
    }

    const mode = settings.activeVisitorsDisplay === "manual" ? "manual" : "exact";
    if (mode === "manual") {
      const n = Math.max(0, settings.manualActiveVisitors ?? 20);
      return NextResponse.json({
        activeVisitors: n,
        windowMinutes: WINDOW_MS / 60000,
      });
    }

    const since = new Date(Date.now() - WINDOW_MS);
    const logs = await prisma.activityLog.findMany({
      where: { createdAt: { gte: since } },
      select: { userId: true, ip: true },
      take: MAX_ROWS,
    });

    const seen = new Set<string>();
    for (const row of logs) {
      const key = row.userId ? `u:${row.userId}` : `ip:${row.ip || "unknown"}`;
      seen.add(key);
    }

    const raw = seen.size;
    const floor = Math.max(0, parseInt(process.env.ACTIVE_VISITORS_FLOOR || "0", 10) || 0);
    const activeVisitors = Math.max(raw, floor);

    return NextResponse.json({
      activeVisitors,
      windowMinutes: WINDOW_MS / 60000,
    });
  } catch (error) {
    console.error("active-visitors error:", error);
    return NextResponse.json(
      { activeVisitors: 0, windowMinutes: 15, error: "unavailable" },
      { status: 200 }
    );
  }
}
