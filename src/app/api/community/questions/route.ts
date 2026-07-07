import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const CATEGORIES = new Set(["general", "legal", "loan", "vastu", "investment", "locality", "rera", "nri", "buying", "selling", "renting"]);
const STATUSES = new Set(["pending", "approved", "rejected"]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getSession();

    const title = (body.title || "").toString().trim();
    const questionBody = (body.body || body.question || "").toString().trim();
    if (!title || title.length < 8) return NextResponse.json({ error: "Question title must be at least 8 characters." }, { status: 400 });
    if (!questionBody || questionBody.length < 20) return NextResponse.json({ error: "Question body must be at least 20 characters." }, { status: 400 });

    const authorName = session?.name || (body.authorName || body.name || "").toString().trim();
    const authorEmail = session?.email || (body.authorEmail || body.email || "").toString().trim() || null;
    if (!authorName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });

    const category = CATEGORIES.has(body.category) ? body.category : "general";

    const question = await prisma.communityQuestion.create({
      data: {
        title,
        body: questionBody,
        category,
        city: body.city ? String(body.city).trim() : null,
        locality: body.locality ? String(body.locality).trim() : null,
        authorId: session?.userId || null,
        authorName,
        authorEmail,
        status: session?.role === "admin" ? "approved" : "pending",
      },
    });

    return NextResponse.json({ success: true, question }, { status: 201 });
  } catch (err) {
    console.error("[community/questions POST]", err);
    return NextResponse.json({ error: "Failed to submit question." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const session = await getSession();
    const scope = searchParams.get("scope"); // "admin" -> admin sees all; default = approved only
    const category = searchParams.get("category");
    const city = searchParams.get("city");
    const limit = Math.min(Number(searchParams.get("limit") || 50), 200);

    const isAdminView = scope === "admin" && session?.role === "admin";

    const where: any = {};
    if (!isAdminView) where.status = "approved";
    if (category && CATEGORIES.has(category)) where.category = category;
    if (city) where.city = city;

    const [items, total] = await Promise.all([
      prisma.communityQuestion.findMany({
        where,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: limit,
        include: { answers: { where: isAdminView ? {} : { status: "approved" }, orderBy: { upvotes: "desc" } } },
      }),
      prisma.communityQuestion.count({ where }),
    ]);

    return NextResponse.json({ items, total });
  } catch (err) {
    console.error("[community/questions GET]", err);
    return NextResponse.json({ error: "Failed to load questions." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });

    const { id, status, featured } = await req.json();
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    if (status && !STATUSES.has(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

    const data: any = {};
    if (status) data.status = status;
    if (typeof featured === "boolean") data.featured = featured;

    const question = await prisma.communityQuestion.update({ where: { id }, data });
    return NextResponse.json({ success: true, question });
  } catch (err) {
    console.error("[community/questions PATCH]", err);
    return NextResponse.json({ error: "Failed to update question." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    await prisma.communityAnswer.deleteMany({ where: { questionId: id } });
    await prisma.communityQuestion.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[community/questions DELETE]", err);
    return NextResponse.json({ error: "Failed to delete question." }, { status: 500 });
  }
}
