import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_ID = "default";

/** Digits only, with country code (e.g. 91XXXXXXXXXX for India). */
function toWhatsAppDigits(raw: string | null | undefined): string {
  const fallback = "919990074072";
  if (!raw) return fallback;
  const d = raw.replace(/\D/g, "");
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`;
  if (d.length >= 10) return d;
  return fallback;
}

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: DEFAULT_ID } });
    const display = settings?.contactPhone || "+91-9990074072";
    const whatsappDigits = toWhatsAppDigits(settings?.contactPhone);
    return NextResponse.json({
      whatsappDigits,
      displayPhone: display,
    });
  } catch (e) {
    console.error("public contact GET:", e);
    return NextResponse.json(
      { whatsappDigits: "919990074072", displayPhone: "+91-9990074072" },
      { status: 200 }
    );
  }
}
