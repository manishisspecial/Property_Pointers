import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalProperties,
      totalInquiries,
      activeListings,
      newUsersToday,
      newPropertiesToday,
      newInquiriesToday,
      propertiesData,
      recentUsers,
      recentInquiries,
      recentActivities,
      totalViews,
      propertiesByType,
      propertiesByCity,
      usersByRole,
      monthlyData,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.property.count(),
      prisma.inquiry.count(),
      prisma.property.count({ where: { status: "active" } }),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.property.count({ where: { createdAt: { gte: today } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: today } } }),
      prisma.property.aggregate({ _sum: { views: true } }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 10, select: { id: true, name: true, email: true, role: true, city: true, createdAt: true } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { property: { select: { title: true } }, user: { select: { name: true } } } }),
      prisma.activityLog.findMany({ orderBy: { createdAt: "desc" }, take: 20, include: { user: { select: { name: true } } } }),
      prisma.property.aggregate({ _sum: { views: true } }),
      prisma.property.groupBy({ by: ["type"], _count: true }),
      prisma.property.groupBy({ by: ["city"], _count: true, orderBy: { _count: { city: "desc" } }, take: 10 }),
      prisma.user.groupBy({ by: ["role"], _count: true }),
      getMonthlyData(),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalProperties,
        totalInquiries,
        activeListings,
        totalViews: propertiesData._sum.views || 0,
        newUsersToday,
        newPropertiesToday,
        newInquiriesToday,
      },
      recentUsers,
      recentInquiries,
      recentActivities,
      propertiesByType,
      propertiesByCity,
      usersByRole,
      monthlyData,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getMonthlyData() {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const start = new Date();
    start.setMonth(start.getMonth() - i, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const [users, properties, inquiries] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: start, lt: end } } }),
      prisma.property.count({ where: { createdAt: { gte: start, lt: end } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: start, lt: end } } }),
    ]);

    months.push({
      month: start.toLocaleString("en-IN", { month: "short" }),
      users,
      properties,
      inquiries,
    });
  }
  return months;
}
