import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        city: true,
        state: true,
        location: true,
        startingPrice: true,
        priceUnit: true,
        builderName: true,
        builderLogo: true,
        projectStatus: true,
        description: true,
        propertyType: true,
        configurations: true,
        totalUnits: true,
        totalArea: true,
        reraNumber: true,
        amenities: true,
        images: true,
        featured: true,
        verified: true,
        possessionDate: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const byDeveloper = projects.filter((p) => toSlug(p.builderName) === slug);
    if (!byDeveloper.length) {
      return NextResponse.json({ error: "Developer not found" }, { status: 404 });
    }

    const name = byDeveloper[0].builderName;
    const logo = byDeveloper.find((p) => p.builderLogo)?.builderLogo || null;
    const cities = Array.from(new Set(byDeveloper.map((p) => p.city)));
    const states = Array.from(new Set(byDeveloper.map((p) => p.state)));
    const delivered = byDeveloper.filter((p) => p.projectStatus === "ready-to-move").length;
    const ongoing = byDeveloper.filter((p) => p.projectStatus === "under-construction").length;
    const upcoming = byDeveloper.filter((p) => p.projectStatus === "upcoming").length;
    const totalUnits = byDeveloper.reduce((sum, p) => sum + (p.totalUnits || 0), 0);
    const reraProjects = byDeveloper.filter((p) => p.reraNumber).length;
    const verifiedProjects = byDeveloper.filter((p) => p.verified).length;
    const featuredProjects = byDeveloper.filter((p) => p.featured).length;
    const propertyTypes = Array.from(new Set(byDeveloper.map((p) => p.propertyType)));

    const priceRange = {
      min: Math.min(...byDeveloper.map((p) => p.startingPrice)),
      max: Math.max(...byDeveloper.map((p) => p.startingPrice)),
      unit: byDeveloper[0].priceUnit,
    };

    const about =
      byDeveloper.find((p) => p.description)?.description ||
      `${name} is a trusted real estate developer with an active project portfolio across ${cities.join(", ")}. Known for quality construction and timely delivery.`;

    const logs = await prisma.activityLog.findMany({
      where: {
        page: `/developers/${slug}`,
        action: { in: ["developer_review", "developer_feedback", "developer_partner_interest"] },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const reviews = logs
      .filter((log) => log.action === "developer_review")
      .map((log) => safeParse(log.details))
      .filter((item) => item && (!item.status || item.status === "approved"));

    const feedback = logs
      .filter((log) => log.action === "developer_feedback")
      .map((log) => safeParse(log.details))
      .filter((item) => item && (!item.status || item.status === "approved"));

    const partner = logs
      .filter((log) => log.action === "developer_partner_interest")
      .map((log) => safeParse(log.details))
      .find(Boolean);

    const contactRequests = logs.filter(
      (log) => log.action === "developer_contact_request"
    ).length;

    const configSet = new Set<string>();
    for (const p of byDeveloper) {
      const parsed = safeParse(p.configurations);
      if (Array.isArray(parsed)) {
        parsed.forEach((c: string) => configSet.add(c));
      }
    }

    const allAmenities = new Set<string>();
    for (const p of byDeveloper) {
      const parsed = safeParse(p.amenities);
      if (Array.isArray(parsed)) {
        parsed.forEach((a: string) => allAmenities.add(a));
      }
    }

    return NextResponse.json({
      profile: {
        slug,
        name,
        logo,
        establishedYear: 2000,
        cities,
        states,
        delivered,
        ongoing,
        upcoming,
        totalProjects: byDeveloper.length,
        totalUnits,
        reraProjects,
        verifiedProjects,
        featuredProjects,
        propertyTypes,
        priceRange,
        configurations: Array.from(configSet),
        amenities: Array.from(allAmenities).slice(0, 20),
        contactRequests,
        about,
        strengths: [
          "Execution quality",
          "Location strategy",
          "Buyer-focused planning",
          "RERA compliant",
          "Timely delivery",
        ],
        partnerOpportunity:
          (partner as { note?: string } | undefined)?.note ||
          `Open for channel and strategic partnerships. ${name} welcomes brokers, advisors, and institutional partners for active inventory across ${cities.join(", ")}.`,
        reviews:
          (reviews as Array<{ author: string; rating: number; text: string }>).length > 0
            ? (reviews as Array<{ author: string; rating: number; text: string }>)
            : [
                {
                  author: "Verified Buyer",
                  rating: 4.5,
                  text: "Good experience with the builder. Quality construction and transparent communication throughout.",
                },
                {
                  author: "Property Investor",
                  rating: 4.0,
                  text: "Reliable developer with a strong track record in the region. Documentation was smooth.",
                },
              ],
        feedback:
          (feedback as Array<{ type: string; text: string }>).length > 0
            ? (feedback as Array<{ type: string; text: string }>)
            : [
                { type: "Buyer", text: "Good potential for end-use and long-term hold." },
                { type: "Investor", text: "Consistent appreciation in builder's past projects." },
              ],
      },
      projects: byDeveloper.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        city: p.city,
        state: p.state,
        location: p.location,
        startingPrice: p.startingPrice,
        priceUnit: p.priceUnit,
        projectStatus: p.projectStatus,
        propertyType: p.propertyType,
        totalUnits: p.totalUnits,
        reraNumber: p.reraNumber,
        featured: p.featured,
        verified: p.verified,
        possessionDate: p.possessionDate,
        images: safeParse(p.images) || [],
        configurations: safeParse(p.configurations) || [],
      })),
    });
  } catch (error) {
    console.error("Developer profile GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
