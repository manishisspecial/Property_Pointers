import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { role } = session;
  if (role !== "partner" && role !== "vendor" && role !== "developer") {
    return NextResponse.json({ error: "Onboarding not required for this role" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  let profileMeta: Record<string, string> = {};

  if (role === "partner") {
    const company = String(body.company ?? "").trim();
    const category = String(body.category ?? "").trim();
    const city = String(body.city ?? "").trim();
    const experience = String(body.experience ?? "").trim();
    const reraLicense = String(body.reraLicense ?? "").trim();
    const details = String(body.details ?? "").trim();
    if (!company || !category) {
      return NextResponse.json({ error: "Company name and category are required." }, { status: 400 });
    }
    profileMeta = { company, category, city, experience, reraLicense, details };
  } else if (role === "vendor") {
    const businessName = String(body.businessName ?? "").trim();
    const category = String(body.category ?? "").trim();
    const city = String(body.city ?? "").trim();
    const portfolio = String(body.portfolio ?? "").trim();
    const details = String(body.details ?? "").trim();
    if (!businessName || !category) {
      return NextResponse.json({ error: "Business name and service category are required." }, { status: 400 });
    }
    profileMeta = { businessName, category, city, portfolio, details };
  } else {
    const companyName = String(body.companyName ?? "").trim();
    const city = String(body.city ?? "").trim();
    const website = String(body.website ?? "").trim();
    const reraNumber = String(body.reraNumber ?? "").trim();
    const about = String(body.about ?? "").trim();
    if (!companyName || !city) {
      return NextResponse.json({ error: "Organization name and city are required." }, { status: 400 });
    }
    profileMeta = { companyName, city, website, reraNumber, about };
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      onboardingComplete: true,
      profileMeta,
    },
  });

  return NextResponse.json({ ok: true });
}
