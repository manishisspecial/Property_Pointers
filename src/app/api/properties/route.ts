import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const q = searchParams.get("q");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const furnished = searchParams.get("furnished");
    const featured = searchParams.get("featured");
    const verified = searchParams.get("verified");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const ownerId = searchParams.get("ownerId");

    const where: Record<string, unknown> = { status: "active" };

    if (type) where.type = type;
    if (category && category !== "all") where.category = category;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (ownerId) where.ownerId = ownerId;
    if (featured === "true") where.featured = true;
    if (verified === "true") where.verified = true;
    if (bedrooms) where.bedrooms = parseInt(bedrooms);
    if (furnished) where.furnishing = furnished;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice);
      if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice);
    }
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { locality: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        { address: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    let orderBy: Record<string, string> = { createdAt: "desc" };
    if (sort === "price_low") orderBy = { price: "asc" };
    else if (sort === "price_high") orderBy = { price: "desc" };
    else if (sort === "popular") orderBy = { views: "desc" };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: where as any,
        include: { owner: { select: { id: true, name: true, email: true, phone: true, role: true, avatar: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.property.count({ where: where as any }),
    ]);

    return NextResponse.json({
      properties,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Properties GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const data = await req.json();
    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        type: data.type,
        category: data.category,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        balconies: data.balconies ? parseInt(data.balconies) : null,
        area: parseFloat(data.area),
        areaUnit: data.areaUnit || "sqft",
        floor: data.floor,
        totalFloors: data.totalFloors,
        facing: data.facing,
        furnishing: data.furnishing,
        age: data.age,
        address: data.address,
        locality: data.locality,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        images: JSON.stringify(data.images || []),
        amenities: JSON.stringify(data.amenities || []),
        ownerId: session.userId,
        ownerType: data.ownerType || "owner",
      },
    });

    return NextResponse.json({ property, message: "Property listed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Property POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
