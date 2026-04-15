import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const db = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { onboardingComplete: true, profileMeta: true, phone: true },
  });

  return NextResponse.json({
    user: {
      ...session,
      onboardingComplete: db?.onboardingComplete === true,
      profileMeta: db?.profileMeta ?? null,
      phone: db?.phone ?? null,
    },
  });
}
