import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("BlogCategory GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { name } = await req.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = toSlug(name);
    const existing = await prisma.blogCategory.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const category = await prisma.blogCategory.create({
      data: { name: name.trim(), slug },
    });

    return NextResponse.json({ category, message: "Category created" }, { status: 201 });
  } catch (error) {
    console.error("BlogCategory POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Category id is required" }, { status: 400 });
    }

    await prisma.blogCategory.delete({ where: { id } });

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("BlogCategory DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
