import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function clampRating(v: any): number | null {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return Math.max(1, Math.min(5, Math.round(n)));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getSession();

    const societyName = (body.societyName || "").toString().trim();
    const city = (body.city || "").toString().trim();
    const locality = (body.locality || "").toString().trim();
    const comment = (body.comment || body.review || "").toString().trim();
    const ratingOverall = clampRating(body.ratingOverall || body.rating);

    if (!societyName) return NextResponse.json({ error: "Society name is required." }, { status: 400 });
    if (!city) return NextResponse.json({ error: "City is required." }, { status: 400 });
    if (!locality) return NextResponse.json({ error: "Locality is required." }, { status: 400 });
    if (!ratingOverall) return NextResponse.json({ error: "Overall rating (1-5) is required." }, { status: 400 });
    if (!comment || comment.length < 20) return NextResponse.json({ error: "Please share at least 20 characters of experience." }, { status: 400 });

    const authorName = session?.name || (body.authorName || body.name || "").toString().trim();
    const authorEmail = session?.email || (body.authorEmail || body.email || "").toString().trim() || null;
    if (!authorName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });

    const review = await prisma.societyReview.create({
      data: {
        societyName,
        city,
        locality,
        builderName: body.builderName ? String(body.builderName).trim() : null,
        authorId: session?.userId || null,
        authorName,
        authorEmail,
        ratingOverall,
        ratingConstr: clampRating(body.ratingConstr),
        ratingAmen: clampRating(body.ratingAmen),
        ratingMaint: clampRating(body.ratingMaint),
        ratingSafety: clampRating(body.ratingSafety),
        pros: body.pros ? String(body.pros) : null,
        cons: body.cons ? String(body.cons) : null,
        comment,
        yearsResiding: body.yearsResiding ? Number(body.yearsResiding) || null : null,
        status: session?.role === "admin" ? "approved" : "pending",
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err) {
    console.error("[society-reviews POST]", err);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const session = await getSession();
    const scope = searchParams.get("scope");
    const isAdminView = scope === "admin" && session?.role === "admin";

    const where: any = isAdminView ? {} : { status: "approved" };
    if (searchParams.get("city")) where.city = searchParams.get("city");
    if (searchParams.get("locality")) where.locality = searchParams.get("locality");
    if (searchParams.get("society")) where.societyName = { contains: searchParams.get("society"), mode: "insensitive" };

    const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
    const [items, total] = await Promise.all([
      prisma.societyReview.findMany({ where, orderBy: { createdAt: "desc" }, take: limit }),
      prisma.societyReview.count({ where }),
    ]);

    return NextResponse.json({ items, total });
  } catch (err) {
    console.error("[society-reviews GET]", err);
    return NextResponse.json({ error: "Failed to load reviews." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: "id and status required." }, { status: 400 });
    const review = await prisma.societyReview.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, review });
  } catch (err) {
    console.error("[society-reviews PATCH]", err);
    return NextResponse.json({ error: "Failed to update review." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    await prisma.societyReview.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[society-reviews DELETE]", err);
    return NextResponse.json({ error: "Failed to delete review." }, { status: 500 });
  }
}
