import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 401 });
    }

    const { slug } = await params;
    const data = await req.json();

    const updateData: Record<string, unknown> = {};
    const directFields = [
      "title", "description", "builderName", "builderLogo", "location",
      "city", "state", "reraNumber", "projectStatus", "possessionDate",
      "priceUnit", "propertyType", "totalArea", "brochureUrl",
    ];

    for (const field of directFields) {
      if (data[field] !== undefined) updateData[field] = data[field];
    }

    if (data.startingPrice !== undefined) updateData.startingPrice = parseFloat(data.startingPrice);
    if (data.totalUnits !== undefined) updateData.totalUnits = data.totalUnits ? parseInt(data.totalUnits) : null;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.verified !== undefined) updateData.verified = data.verified;

    const jsonFields = ["highlights", "configurations", "images", "amenities", "floorPlans", "locationAdvantages"];
    for (const field of jsonFields) {
      if (data[field] !== undefined) updateData[field] = JSON.stringify(data[field]);
    }

    if (data.title && data.title !== (await prisma.project.findUnique({ where: { slug } }))?.title) {
      const newSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const existing = await prisma.project.findUnique({ where: { slug: newSlug } });
      if (!existing || existing.slug === slug) {
        updateData.slug = newSlug;
      }
    }

    const project = await prisma.project.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({ project, message: "Project updated successfully" });
  } catch (error) {
    console.error("Project PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 401 });
    }

    const { slug } = await params;
    await prisma.project.delete({ where: { slug } });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Project DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
