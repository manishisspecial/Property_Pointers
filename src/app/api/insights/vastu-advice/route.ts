import { NextRequest, NextResponse } from "next/server";
import {
  buildVastuAdvice,
  buildVastuSystemPrompt,
  buildVastuUserPrompt,
  parseAIVastuResponse,
  parseNorthHint,
} from "@/lib/vastu-advice";

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
      return NextResponse.json(
        { error: "Please upload a floor plan or design file." },
        { status: 400 }
      );
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WebP, GIF, or PDF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 12 MB." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey && file.type.startsWith("image/")) {
      try {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            system: buildVastuSystemPrompt(),
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "image",
                    source: {
                      type: "base64",
                      media_type: file.type,
                      data: base64,
                    },
                  },
                  {
                    type: "text",
                    text: buildVastuUserPrompt(northHint),
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data.content?.map((b: { text?: string }) => b.text || "").join("") || "";
          const parsed = parseAIVastuResponse(rawText);

          if (parsed) {
            return NextResponse.json({
              advice: parsed,
              aiPowered: true,
              received: {
                name: file.name,
                type: file.type,
                sizeBytes: file.size,
              },
            });
          }
        }
      } catch (aiError) {
        console.error("AI analysis failed, falling back to rule-based:", aiError);
      }
    }

    await file.arrayBuffer();
    const advice = buildVastuAdvice(northHint, file.name);

    return NextResponse.json({
      advice,
      aiPowered: false,
      received: {
        name: file.name,
        type: file.type,
        sizeBytes: file.size,
      },
    });
  } catch (e) {
    console.error("vastu-advice:", e);
    return NextResponse.json(
      { error: "Could not process your request." },
      { status: 500 }
    );
  }
}
