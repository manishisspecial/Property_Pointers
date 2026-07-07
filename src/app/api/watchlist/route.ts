import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function requireUser() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  const session = await requireUser();
  if (!session) return NextResponse.json({ items: [] }, { status: 401 });
  const items = await prisma.builderWatchlistItem.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  try {
    const { developerSlug, developerName } = await req.json();
    if (!developerSlug) return NextResponse.json({ error: "developerSlug required." }, { status: 400 });

    // Resolve name from DB if not provided
    let name = developerName;
    if (!name) {
      const dev = await prisma.developer.findUnique({ where: { slug: developerSlug } });
      name = dev?.name || developerSlug;
    }

    const item = await prisma.builderWatchlistItem.upsert({
      where: { userId_developerSlug: { userId: session.userId, developerSlug } },
      update: {},
      create: { userId: session.userId, developerSlug, developerName: name },
    });
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (err) {
    console.error("[watchlist POST]", err);
    return NextResponse.json({ error: "Failed to add to watchlist." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await requireUser();
  if (!session) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  try {
    const { developerSlug } = await req.json();
    if (!developerSlug) return NextResponse.json({ error: "developerSlug required." }, { status: 400 });
    await prisma.builderWatchlistItem.deleteMany({
      where: { userId: session.userId, developerSlug },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[watchlist DELETE]", err);
    return NextResponse.json({ error: "Failed to remove from watchlist." }, { status: 500 });
  }
}
