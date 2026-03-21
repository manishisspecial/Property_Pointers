import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        category: data.category,
        tags: data.tags ? JSON.stringify(data.tags) : undefined,
        published: data.published,
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
