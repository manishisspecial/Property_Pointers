import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body.name || body.locality || "").toString().trim();
    const city = (body.city || "").toString().trim();
    const requesterName = (body.requesterName || body.yourName || body.name_field || "").toString().trim();
    const requesterEmail = (body.requesterEmail || body.email || "").toString().trim();

    if (!name) return NextResponse.json({ error: "Locality name is required." }, { status: 400 });
    if (!city) return NextResponse.json({ error: "City is required." }, { status: 400 });
    if (!requesterName) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
    if (!requesterEmail || !requesterEmail.includes("@")) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });

    const request = await prisma.localityRequest.create({
      data: {
        name,
        city,
        requesterName,
        requesterEmail,
        requesterPhone: body.requesterPhone ? String(body.requesterPhone) : null,
        notes: body.notes ? String(body.notes) : null,
      },
    });

    return NextResponse.json({ success: true, id: request.id, message: "We'll prioritise this locality and email you when it's live." }, { status: 201 });
  } catch (err) {
    console.error("[locality-request POST]", err);
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  const items = await prisma.localityRequest.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json({ items });
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (session?.role !== "admin") return NextResponse.json({ error: "Admin only." }, { status: 403 });
  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: "id and status required." }, { status: 400 });
    const request = await prisma.localityRequest.update({ where: { id }, data: { status } });
    return NextResponse.json({ success: true, request });
  } catch (err) {
    console.error("[locality-request PATCH]", err);
    return NextResponse.json({ error: "Failed to update request." }, { status: 500 });
  }
}
