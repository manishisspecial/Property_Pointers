import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const q = searchParams.get("q");
    const sort = searchParams.get("sort") || "projects";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        builderName: true,
        builderLogo: true,
        city: true,
        state: true,
        projectStatus: true,
        startingPrice: true,
        priceUnit: true,
        propertyType: true,
        featured: true,
        verified: true,
        totalUnits: true,
        description: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const devMap = new Map<
      string,
      {
        slug: string;
        name: string;
        logo: string | null;
        cities: Set<string>;
        states: Set<string>;
        total: number;
        delivered: number;
        ongoing: number;
        upcoming: number;
        featured: boolean;
        verified: boolean;
        totalUnits: number;
        minPrice: number;
        priceUnit: string;
        propertyTypes: Set<string>;
        about: string;
      }
    >();

    for (const p of projects) {
      const slug = toSlug(p.builderName);
      const existing = devMap.get(slug);

      if (existing) {
        existing.cities.add(p.city);
        existing.states.add(p.state);
        existing.total++;
        existing.propertyTypes.add(p.propertyType);
        if (p.projectStatus === "ready-to-move") existing.delivered++;
        else if (p.projectStatus === "under-construction") existing.ongoing++;
        else if (p.projectStatus === "upcoming") existing.upcoming++;
        if (p.featured) existing.featured = true;
        if (p.verified) existing.verified = true;
        if (p.totalUnits) existing.totalUnits += p.totalUnits;
        if (p.startingPrice < existing.minPrice) {
          existing.minPrice = p.startingPrice;
          existing.priceUnit = p.priceUnit;
        }
        if (!existing.logo && p.builderLogo) existing.logo = p.builderLogo;
      } else {
        devMap.set(slug, {
          slug,
          name: p.builderName,
          logo: p.builderLogo || null,
          cities: new Set([p.city]),
          states: new Set([p.state]),
          total: 1,
          delivered: p.projectStatus === "ready-to-move" ? 1 : 0,
          ongoing: p.projectStatus === "under-construction" ? 1 : 0,
          upcoming: p.projectStatus === "upcoming" ? 1 : 0,
          featured: p.featured,
          verified: p.verified,
          totalUnits: p.totalUnits || 0,
          minPrice: p.startingPrice,
          priceUnit: p.priceUnit,
          propertyTypes: new Set([p.propertyType]),
          about:
            p.description?.slice(0, 200) ||
            `${p.builderName} has an active project portfolio across key markets.`,
        });
      }
    }

    let developers = Array.from(devMap.values()).map((d) => ({
      slug: d.slug,
      name: d.name,
      logo: d.logo,
      cities: Array.from(d.cities),
      states: Array.from(d.states),
      totalProjects: d.total,
      delivered: d.delivered,
      ongoing: d.ongoing,
      upcoming: d.upcoming,
      featured: d.featured,
      verified: d.verified,
      totalUnits: d.totalUnits,
      minPrice: d.minPrice,
      priceUnit: d.priceUnit,
      propertyTypes: Array.from(d.propertyTypes),
      about: d.about,
    }));

    if (q) {
      const lower = q.toLowerCase();
      developers = developers.filter(
        (d) =>
          d.name.toLowerCase().includes(lower) ||
          d.cities.some((c) => c.toLowerCase().includes(lower))
      );
    }

    if (city && city !== "all") {
      developers = developers.filter((d) =>
        d.cities.some((c) => c.toLowerCase() === city.toLowerCase())
      );
    }

    if (sort === "projects") {
      developers.sort((a, b) => b.totalProjects - a.totalProjects);
    } else if (sort === "delivered") {
      developers.sort((a, b) => b.delivered - a.delivered);
    } else if (sort === "name") {
      developers.sort((a, b) => a.name.localeCompare(b.name));
    }

    const allCities = Array.from(
      new Set(developers.flatMap((d) => d.cities))
    ).sort();

    return NextResponse.json({
      developers: developers.slice(0, limit),
      total: developers.length,
      cities: allCities,
    });
  } catch (error) {
    console.error("Developers list GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
