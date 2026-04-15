export type NorthHint =
  | "unknown"
  | "north_top"
  | "north_right"
  | "north_bottom"
  | "north_left";

export interface VastuAdvicePayload {
  summary: string;
  sections: { title: string; items: string[] }[];
  disclaimer: string;
}

const ORIENTATION_LINE: Record<NorthHint, string> = {
  unknown:
    "If your drawing does not show compass direction, add a small north arrow before you finalize interiors—most Vastu tips are interpreted relative to magnetic north.",
  north_top: "You indicated north is toward the top of your upload. Use that to map zones: NE (top-right from north), SE (bottom-right), SW (bottom-left), NW (top-left).",
  north_right: "You indicated north is to the right of your plan. Rotate mentally so north points up; then apply the usual NE/SE/SW/NW quadrant ideas.",
  north_bottom: "You indicated north is toward the bottom of your upload. Flip the plan mentally so north is up when reading classical direction-based tips.",
  north_left: "You indicated north is to the left of your plan. Rotate the layout so north is at the top when comparing with standard Vastu diagrams.",
};

export function buildVastuAdvice(northHint: NorthHint, fileName: string): VastuAdvicePayload {
  const orientation = ORIENTATION_LINE[northHint] ?? ORIENTATION_LINE.unknown;

  return {
    summary: `Here is general Vastu-aligned guidance for your layout (“${fileName}”). These points are educational—not a substitute for an on-site consultant.`,
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
