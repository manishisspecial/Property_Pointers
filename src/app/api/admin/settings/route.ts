import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const DEFAULT_ID = "default";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: DEFAULT_ID } });
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: { id: DEFAULT_ID } });
    }
    return NextResponse.json(settings);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const allowed = [
      "siteName", "siteDescription", "contactEmail", "contactPhone",
      "address", "facebook", "twitter", "instagram", "linkedin", "maintenanceMode",
    ] as const;

    const data: Record<string, string | boolean> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }

    const settings = await prisma.siteSettings.upsert({
      where: { id: DEFAULT_ID },
      create: { id: DEFAULT_ID, ...data },
      update: data,
    });

    return NextResponse.json(settings);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
