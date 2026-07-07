import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const BANDS = [
  { min: 0,  max: 34,  band: "not_ready",     label: "Not Ready" },
  { min: 35, max: 59,  band: "exploring",     label: "Exploring" },
  { min: 60, max: 79,  band: "shortlisting",  label: "Shortlisting" },
  { min: 80, max: 100, band: "ready",         label: "Ready to Buy" },
];

function computeReadinessBand(score: number): string {
  const b = BANDS.find((x) => score >= x.min && score <= x.max);
  return b ? b.band : "exploring";
}

/**
 * Compute a 0..100 buyer readiness score from a list of quiz answers.
 * Each answer object: { key, value, weight? }
 *   - value 1..5 (5 = strongest positive signal)
 *   - weight defaults to 1
 * The score is normalized to 0..100.
 */
function computeScoreFromAnswers(answers: any[]): number {
  if (!Array.isArray(answers) || answers.length === 0) return 0;
  let weightedSum = 0;
  let weightTotal = 0;
  for (const a of answers) {
    const value = Math.max(1, Math.min(5, Number(a.value) || 0));
    const weight = Math.max(0.5, Math.min(3, Number(a.weight) || 1));
    weightedSum += value * weight;
    weightTotal += weight;
  }
  if (weightTotal === 0) return 0;
  const avg = weightedSum / weightTotal; // 1..5
  return Math.round(((avg - 1) / 4) * 100); // -> 0..100
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const session = await getSession();

    const answers = Array.isArray(body.answers) ? body.answers : [];
    if (answers.length === 0) {
      return NextResponse.json({ error: "Please answer at least one question." }, { status: 400 });
    }

    const score = typeof body.score === "number" ? Math.max(0, Math.min(100, Math.round(body.score))) : computeScoreFromAnswers(answers);
    const readinessBand = computeReadinessBand(score);

    const record = await prisma.buyerScore.create({
      data: {
        userId: session?.userId || null,
        sessionId: body.sessionId ? String(body.sessionId) : null,
        name: session?.name || (body.name ? String(body.name) : null),
        email: session?.email || (body.email ? String(body.email) : null),
        score,
        readinessBand,
        answers: JSON.stringify(answers).slice(0, 8000),
        city: body.city ? String(body.city) : null,
        budget: body.budget ? Number(body.budget) || null : null,
      },
    });

    return NextResponse.json({ success: true, score: record.score, readinessBand, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("[buyer-score POST]", err);
    return NextResponse.json({ error: "Failed to save your score." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(req.url);

    if (session?.role === "admin" && searchParams.get("scope") === "admin") {
      const items = await prisma.buyerScore.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
      return NextResponse.json({ items });
    }

    if (session) {
      const items = await prisma.buyerScore.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
      return NextResponse.json({ items });
    }

    return NextResponse.json({ items: [] });
  } catch (err) {
    console.error("[buyer-score GET]", err);
    return NextResponse.json({ error: "Failed to load scores." }, { status: 500 });
  }
}
