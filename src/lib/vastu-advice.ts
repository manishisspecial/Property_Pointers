export type NorthHint =
  | "unknown"
  | "north_top"
  | "north_right"
  | "north_bottom"
  | "north_left";

export interface VastuRoomAnalysis {
  room: string;
  detectedDirection: string;
  status: "Good" | "Average" | "Needs Attention";
  comment: string;
  suggestion: string;
}

export interface VastuAdvicePayload {
  summary: string;
  sections: { title: string; items: string[] }[];
  disclaimer: string;
  score?: number;
  grade?: "Excellent" | "Good" | "Average" | "Needs Attention";
  confidence?: "High" | "Medium" | "Low";
  positivePoints?: string[];
  issues?: string[];
  recommendations?: string[];
  roomWiseAnalysis?: VastuRoomAnalysis[];
}

const ORIENTATION_LINE: Record<NorthHint, string> = {
  unknown:
    "If your drawing does not show compass direction, add a small north arrow before you finalize interiors—most Vastu tips are interpreted relative to magnetic north.",
  north_top:
    "You indicated north is toward the top of your upload. Use that to map zones: NE (top-right from north), SE (bottom-right), SW (bottom-left), NW (top-left).",
  north_right:
    "You indicated north is to the right of your plan. Rotate mentally so north points up; then apply the usual NE/SE/SW/NW quadrant ideas.",
  north_bottom:
    "You indicated north is toward the bottom of your upload. Flip the plan mentally so north is up when reading classical direction-based tips.",
  north_left:
    "You indicated north is to the left of your plan. Rotate the layout so north is at the top when comparing with standard Vastu diagrams.",
};

export function buildVastuSystemPrompt(): string {
  return `You are the PropertyPointers Vastu Analysis Assistant.

Analyze the uploaded floor plan image using traditional Vastu Shastra principles.

YOUR TASK:
1. Carefully examine the floor plan image. Identify all visible rooms, zones, labels, and structural elements.
2. Using the stated facing direction / north hint, estimate the compass direction of each detected room/element.
3. Apply standard Vastu Shastra guidelines to score each placement.
4. Return ONLY a valid JSON object — no explanation, no markdown, no backticks.

IMPORTANT RULES:
- This is indicative guidance only. Never claim 100% accuracy.
- Do not provide legal, engineering, architectural or structural certification.
- If a room is not visible or identifiable in the floor plan, set detectedDirection to "Not Detected" and status to "Average".
- Confidence: "High" if floor plan is clear with labeled rooms, "Medium" if partially labeled, "Low" if unclear/sketch.
- Score range 0-100. Grade: "Excellent" (80-100), "Good" (60-79), "Average" (40-59), "Needs Attention" (0-39).

Return this exact JSON structure:
{
  "score": <number 0-100>,
  "grade": "<Excellent|Good|Average|Needs Attention>",
  "confidence": "<High|Medium|Low>",
  "summary": "<2-3 sentence buyer-friendly summary of the overall Vastu profile>",
  "positivePoints": ["<point 1>", "<point 2>", "..."],
  "issues": ["<issue 1>", "<issue 2>", "..."],
  "recommendations": ["<rec 1>", "<rec 2>", "..."],
  "roomWiseAnalysis": [
    {
      "room": "<Room name>",
      "detectedDirection": "<Direction or Not Detected>",
      "status": "<Good|Average|Needs Attention>",
      "comment": "<What was detected and why this is good/bad>",
      "suggestion": "<Practical Vastu remedy or confirmation>"
    }
  ],
  "disclaimer": "This Vastu analysis is purely indicative, based on traditional Vastu Shastra principles applied to the uploaded floor plan image. It does not constitute professional architectural, structural, legal, or engineering advice. Results depend on image clarity and stated directions. Always verify with a qualified Vastu consultant, licensed architect, and site professional before making any property decisions. PropertyPointers makes no warranty of accuracy or completeness."
}`;
}

export function buildVastuUserPrompt(northHint: NorthHint): string {
  const orientationLine = ORIENTATION_LINE[northHint] ?? ORIENTATION_LINE.unknown;
  return `North orientation hint: ${orientationLine}\n\nPlease analyse this floor plan image and return the JSON response.`;
}

export function buildVastuAdvice(
  northHint: NorthHint,
  fileName: string
): VastuAdvicePayload {
  const orientation = ORIENTATION_LINE[northHint] ?? ORIENTATION_LINE.unknown;

  return {
    summary: `Here is general Vastu-aligned guidance for your layout ("${fileName}"). These points are educational—not a substitute for an on-site consultant.`,
    sections: [
      {
        title: "Orientation & your file",
        items: [
          orientation,
          "Confirm the main entrance relative to north: many guidelines reference whether the entry falls in north, east, NE, etc.",
        ],
      },
      {
        title: "Entry & living zone",
        items: [
          "A clear, bright entry with no obstruction directly inside supports better circulation and feels more welcoming.",
          "If possible, avoid placing heavy walls or storage immediately behind the main door swing.",
        ],
      },
      {
        title: "Kitchen & utilities",
        items: [
          "Classical texts often place the kitchen toward the south-east quadrant; in apartments, prioritize ventilation, gas safety, and distance from bedrooms.",
          "Keep water points and drainage well maintained—stagnation affects comfort regardless of direction.",
        ],
      },
      {
        title: "Bedrooms & rest",
        items: [
          "South-west quadrant is often suggested for the master bedroom for a sense of stability; ensure good cross-ventilation and minimal noise from lifts or ducts.",
          "Avoid aligning the bed so your feet point directly at the door if it feels awkward; head toward south or east is a common preference.",
        ],
      },
      {
        title: "Center (Brahmasthan)",
        items: [
          "Keep the approximate center of the home relatively open—avoid heavy clutter, wet areas, or closed stores if the plan allows.",
        ],
      },
      {
        title: "Light & air (works for any plan)",
        items: [
          "Prioritize daylight in living areas; use mirrors and light colours where natural light is weak.",
          "Fix damp corners early—they affect both structure and indoor air quality.",
        ],
      },
    ],
    disclaimer:
      "This is automated, general guidance only. Floor plans vary by city, building code, and personal needs. For binding decisions, consult a qualified Vastu practitioner and your architect.",
  };
}

export function parseNorthHint(value: string | null): NorthHint {
  const v = value ?? "unknown";
  if (
    v === "unknown" ||
    v === "north_top" ||
    v === "north_right" ||
    v === "north_bottom" ||
    v === "north_left"
  ) {
    return v;
  }
  return "unknown";
}

export function parseAIVastuResponse(rawText: string): VastuAdvicePayload | null {
  try {
    const clean = rawText.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);

    const payload: VastuAdvicePayload = {
      summary: parsed.summary || "",
      sections: [],
      disclaimer: parsed.disclaimer || "",
      score: typeof parsed.score === "number" ? parsed.score : undefined,
      grade: parsed.grade,
      confidence: parsed.confidence,
      positivePoints: Array.isArray(parsed.positivePoints) ? parsed.positivePoints : [],
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
      roomWiseAnalysis: Array.isArray(parsed.roomWiseAnalysis) ? parsed.roomWiseAnalysis : [],
    };

    if (payload.roomWiseAnalysis && payload.roomWiseAnalysis.length > 0) {
      payload.sections = [
        {
          title: "AI Analysis Summary",
          items: [payload.summary, ...(payload.positivePoints || [])],
        },
      ];
      if ((payload.issues || []).length > 0) {
        payload.sections.push({
          title: "Issues Detected",
          items: payload.issues || [],
        });
      }
      if ((payload.recommendations || []).length > 0) {
        payload.sections.push({
          title: "Recommendations",
          items: payload.recommendations || [],
        });
      }
    }

    return payload;
  } catch {
    return null;
  }
}
