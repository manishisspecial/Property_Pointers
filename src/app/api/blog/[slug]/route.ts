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

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, avatar: true, role: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Blog slug GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { slug } = await params;
    const data = await req.json();
    const nextSlug = data.slug ? toSlug(data.slug) : undefined;
    const tags = Array.isArray(data.tags) ? data.tags : undefined;
    const metaTags = Array.isArray(data.metaTags) ? data.metaTags : undefined;
    const faqs = Array.isArray(data.faqs) ? data.faqs : undefined;

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        title: data.title ?? undefined,
        slug: nextSlug,
        excerpt: data.excerpt ?? undefined,
        content: data.content ?? undefined,
        metaTitle: data.metaTitle ?? undefined,
        metaDescription: data.metaDescription ?? undefined,
        metaTags: metaTags ? JSON.stringify(metaTags) : undefined,
        schemaJson: data.schemaJson ?? undefined,
        faqs: faqs ? JSON.stringify(faqs) : undefined,
        coverImage: data.coverImage ?? undefined,
        category: data.category ?? undefined,
        tags: tags ? JSON.stringify(tags) : undefined,
        published: data.published ?? undefined,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Blog PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { slug } = await params;
    await prisma.blogPost.delete({ where: { slug } });

    return NextResponse.json({ message: "Blog post deleted" });
  } catch (error) {
    console.error("Blog DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
