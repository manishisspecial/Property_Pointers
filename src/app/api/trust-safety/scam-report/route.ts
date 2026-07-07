import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const SUBJECT_TYPES = new Set(["builder", "project", "advisor", "listing", "other"]);
const STATUSES = new Set(["pending", "investigating", "resolved", "dismissed"]);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subjectType = SUBJECT_TYPES.has(body.subjectType) ? body.subjectType : "other";
    const subjectName = (body.subjectName || body.subject || "").toString().trim();
    const description = (body.description || body.details || "").toString().trim();
    const reporterName = (body.reporterName || body.name || "").toString().trim();
    const reporterEmail = (body.reporterEmail || body.email || "").toString().trim();

    if (!subjectName) return NextResponse.json({ error: "Please name the entity you are reporting." }, { status: 400 });
    if (!description || description.length < 30) return NextResponse.json({ error: "Please provide at least 30 characters of detail." }, { status: 400 });
    if (!reporterName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
    if (!reporterEmail || !reporterEmail.includes("@")) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

    let evidenceUrls = "[]";
    if (Array.isArray(body.evidenceUrls)) evidenceUrls = JSON.stringify(body.evidenceUrls.slice(0, 10));

    const report = await prisma.scamReport.create({
      data: {
        subjectType,
        subjectName,
        city: body.city ? String(body.city).trim() : null,
        locality: body.locality ? String(body.locality).trim() : null,
        incidentDate: body.incidentDate ? new Date(body.incidentDate) : null,
        amount: body.amount ? Number(body.amount) || null : null,
        currency: body.currency || "INR",
        description,
        evidenceUrls,
        reporterName,
        reporterEmail,
        reporterPhone: body.reporterPhone ? String(body.reporterPhone).trim() : null,
        anonymous: !!body.anonymous,
      },
    });

    return NextResponse.json({ success: true, reportId: report.id, message: "Report received. Our trust & safety team will review it within 48 hours." }, { status: 201 });
  } catch (err) {
    console.error("[scam-report POST]", err);
    return NextResponse.json({ error: "Failed to submit report." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const where: any = {};
    if (status && STATUSES.has(status)) where.status = status;

    const items = await prisma.scamReport.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 });
    return NextResponse.json({ items, total: items.length });
  } catch (err) {
    console.error("[scam-report GET]", err);
    return NextResponse.json({ error: "Failed to load reports." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
    const { id, status, adminNotes } = await req.json();
    if (!id) return NextResponse.json({ error: "id required." }, { status: 400 });
    if (status && !STATUSES.has(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    const data: any = {};
    if (status) data.status = status;
    if (typeof adminNotes === "string") data.adminNotes = adminNotes;
    const report = await prisma.scamReport.update({ where: { id }, data });
    return NextResponse.json({ success: true, report });
  } catch (err) {
    console.error("[scam-report PATCH]", err);
    return NextResponse.json({ error: "Failed to update report." }, { status: 500 });
  }
}
