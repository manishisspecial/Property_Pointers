import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const [developers, projects] = await Promise.all([
      prisma.developer.findMany({ orderBy: { updatedAt: "desc" } }),
      prisma.project.findMany({
        select: { builderName: true, city: true, projectStatus: true },
      }),
    ]);

    const projectStats = new Map<string, { total: number; cities: Set<string> }>();
    for (const p of projects) {
      const slug = toSlug(p.builderName);
      const entry = projectStats.get(slug) || { total: 0, cities: new Set<string>() };
      entry.total++;
      entry.cities.add(p.city);
      projectStats.set(slug, entry);
    }

    const result = developers.map((d) => {
      const stats = projectStats.get(d.slug);
      return {
        ...d,
        strengths: safeParseJSON(d.strengths),
        operatingCities: safeParseJSON(d.operatingCities),
        projectCount: stats?.total || 0,
        cities: stats ? Array.from(stats.cities) : [],
      };
    });

    const knownSlugs = new Set(developers.map((d) => d.slug));
    const unlinked: Array<{ slug: string; name: string; projectCount: number; cities: string[] }> = [];
    for (const p of projects) {
      const slug = toSlug(p.builderName);
      if (!knownSlugs.has(slug) && !unlinked.find((u) => u.slug === slug)) {
        const stats = projectStats.get(slug)!;
        unlinked.push({
          slug,
          name: p.builderName,
          projectCount: stats.total,
          cities: Array.from(stats.cities),
        });
      }
    }

    return NextResponse.json({ developers: result, unlinked });
  } catch (error) {
    console.error("Admin developers GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const data = await req.json();
    if (!data.name) {
      return NextResponse.json({ error: "Developer name is required" }, { status: 400 });
    }

    const slug = data.slug || toSlug(data.name);
    const developer = await prisma.developer.upsert({
      where: { slug },
      create: {
        name: data.name,
        slug,
        logo: data.logo || null,
        about: data.about || null,
        establishedYear: data.establishedYear ? parseInt(data.establishedYear) : null,
        strengths: JSON.stringify(data.strengths || []),
        partnerOpportunity: data.partnerOpportunity || null,
        operatingCities: JSON.stringify(data.operatingCities || []),
        website: data.website || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        featured: data.featured || false,
        verified: data.verified || false,
      },
      update: {
        name: data.name,
        logo: data.logo || null,
        about: data.about || null,
        establishedYear: data.establishedYear ? parseInt(data.establishedYear) : null,
        strengths: JSON.stringify(data.strengths || []),
        partnerOpportunity: data.partnerOpportunity || null,
        operatingCities: JSON.stringify(data.operatingCities || []),
        website: data.website || null,
        contactEmail: data.contactEmail || null,
        contactPhone: data.contactPhone || null,
        featured: data.featured ?? undefined,
        verified: data.verified ?? undefined,
      },
    });

    return NextResponse.json({ developer, message: "Developer saved" });
  } catch (error) {
    console.error("Admin developers POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    await prisma.developer.delete({ where: { slug } });
    return NextResponse.json({ message: "Developer deleted" });
  } catch (error) {
    console.error("Admin developers DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function safeParseJSON(str: string): string[] {
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
