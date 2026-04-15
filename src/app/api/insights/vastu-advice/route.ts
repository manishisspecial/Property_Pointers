import { NextRequest, NextResponse } from "next/server";
import { buildVastuAdvice, parseNorthHint } from "@/lib/vastu-advice";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const northHint = parseNorthHint(formData.get("northHint") as string | null);

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "Please upload a floor plan or design file." }, { status: 400 });
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        {
          error: "Unsupported file type. Use JPG, PNG, WebP, GIF, or PDF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large. Maximum size is 12 MB." }, { status: 400 });
    }

    await file.arrayBuffer();

    const advice = buildVastuAdvice(northHint, file.name);

    return NextResponse.json({
      advice,
      received: {
        name: file.name,
        type: file.type,
        sizeBytes: file.size,
      },
    });
  } catch (e) {
    console.error("vastu-advice:", e);
    return NextResponse.json({ error: "Could not process your request." }, { status: 500 });
  }
}
