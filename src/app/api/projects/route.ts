import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const propertyType = searchParams.get("propertyType");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const q = searchParams.get("q");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const where: Record<string, unknown> = {};

    if (city) where.city = { contains: city, mode: "insensitive" };
    if (propertyType) where.propertyType = propertyType;
    if (status) where.projectStatus = status;
    if (featured === "true") where.featured = true;

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { builderName: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "price_low") orderBy = { startingPrice: "asc" };
    else if (sort === "price_high") orderBy = { startingPrice: "desc" };
    else if (sort === "popular") orderBy = { views: "desc" };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: where as any,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where: where as any }),
    ]);

    return NextResponse.json({
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 401 });
    }

    const data = await req.json();

    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await prisma.project.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: finalSlug,
        description: data.description || "",
        highlights: JSON.stringify(data.highlights || []),
        builderName: data.builderName,
        builderLogo: data.builderLogo || null,
        location: data.location,
        city: data.city,
        state: data.state || "Delhi NCR",
        reraNumber: data.reraNumber || null,
        projectStatus: data.projectStatus || "under-construction",
        possessionDate: data.possessionDate || null,
        startingPrice: parseFloat(data.startingPrice),
        priceUnit: data.priceUnit || "Lac",
        propertyType: data.propertyType || "residential",
        configurations: JSON.stringify(data.configurations || []),
        totalArea: data.totalArea || null,
        totalUnits: data.totalUnits ? parseInt(data.totalUnits) : null,
        images: JSON.stringify(data.images || []),
        amenities: JSON.stringify(data.amenities || []),
        floorPlans: JSON.stringify(data.floorPlans || []),
        locationAdvantages: JSON.stringify(data.locationAdvantages || []),
        brochureUrl: data.brochureUrl || null,
        featured: data.featured || false,
        verified: data.verified || false,
      },
    });

    return NextResponse.json({ project, message: "Project created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Project POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
