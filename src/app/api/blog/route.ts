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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const all = searchParams.get("all");

    const where: Record<string, unknown> = {};

    if (all !== "true") {
      where.published = true;
    }
    if (category && category !== "all") where.category = category;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: where as any,
        include: {
          author: { select: { id: true, name: true, avatar: true, role: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where: where as any }),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Blog GET error:", error);
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
    const slug = toSlug(data.slug || data.title || "");
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const metaTags = Array.isArray(data.metaTags) ? data.metaTags : [];
    const faqs = Array.isArray(data.faqs) ? data.faqs : [];

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        metaTags: JSON.stringify(metaTags),
        schemaJson: data.schemaJson || null,
        faqs: JSON.stringify(faqs),
        coverImage: data.coverImage || null,
        category: data.category || "general",
        tags: JSON.stringify(tags),
        authorId: session.userId,
        published: data.published ?? false,
      },
    });

    return NextResponse.json({ post, message: "Blog post created" }, { status: 201 });
  } catch (error) {
    console.error("Blog POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
