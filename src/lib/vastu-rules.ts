export const DIRECTIONS = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
] as const;

export type VastuDirection = (typeof DIRECTIONS)[number];

export const ROOM_LABELS: Record<string, string> = {
  mainEntrance: "Main Entrance",
  kitchen: "Kitchen",
  masterBedroom: "Master Bedroom",
  poojaRoom: "Pooja Room",
  livingRoom: "Living Room",
  toilet: "Toilet / Bathroom",
  staircase: "Staircase",
  waterTank: "Water Tank (Overhead)",
  septicTank: "Septic Tank",
};

export const PROPERTY_TYPES = [
  "Apartment / Flat",
  "Independent House / Villa",
  "Plot / Land",
  "Builder Floor",
  "Penthouse",
  "Row House",
] as const;

interface VastuRule {
  ideal: VastuDirection[];
  good: VastuDirection[];
  bad: VastuDirection[];
  idealMsg: string;
  goodMsg: string;
  badMsg: string;
  weight: number;
}

export const VASTU_RULES: Record<string, VastuRule> = {
  mainEntrance: {
    ideal: ["North", "North-East", "East"],
    good: ["North-West", "West"],
    bad: ["South", "South-West", "South-East"],
    idealMsg:
      "Excellent — North/North-East/East entrance invites prosperity and positive energy.",
    goodMsg: "Acceptable — North-West or West entrance is generally neutral.",
    badMsg:
      "Inauspicious — South or South-West entrance can obstruct prosperity. Consider remedial measures.",
    weight: 18,
  },
  kitchen: {
    ideal: ["South-East"],
    good: ["North-West"],
    bad: ["North-East", "South-West", "North"],
    idealMsg:
      "Ideal — South-East (Agni corner) is perfect for the kitchen.",
    goodMsg: "Acceptable — North-West kitchen is considered workable.",
    badMsg:
      "Problematic placement. North-East or South-West kitchen can cause health issues. Remediation advised.",
    weight: 15,
  },
  masterBedroom: {
    ideal: ["South-West"],
    good: ["South", "West"],
    bad: ["North-East", "South-East"],
    idealMsg:
      "Excellent — South-West master bedroom promotes stability and restful sleep.",
    goodMsg:
      "Good — South or West bedroom is acceptable for the master suite.",
    badMsg:
      "Unfavourable — North-East or South-East master bedroom may disturb sleep and health.",
    weight: 15,
  },
  poojaRoom: {
    ideal: ["North-East", "East"],
    good: ["North"],
    bad: ["South", "South-West", "West"],
    idealMsg:
      "Perfect — North-East/East Pooja room amplifies positive spiritual energy.",
    goodMsg:
      "Acceptable — North direction is workable for prayer space.",
    badMsg:
      "Inauspicious — Pooja room in South, South-West, or West is not recommended.",
    weight: 12,
  },
  livingRoom: {
    ideal: ["North", "East", "North-East"],
    good: ["North-West", "West"],
    bad: ["South-West"],
    idealMsg:
      "Excellent — North/East living room promotes social harmony and well-being.",
    goodMsg:
      "Acceptable — North-West or West living room is generally fine.",
    badMsg:
      "Avoid South-West for living room as it may create restlessness.",
    weight: 10,
  },
  toilet: {
    ideal: ["North-West", "West"],
    good: ["South", "South-East"],
    bad: ["North-East", "South-West", "East"],
    idealMsg:
      "Good — North-West/West toilet is the most favourable placement.",
    goodMsg: "Workable — South or South-East toilet is acceptable.",
    badMsg:
      "Problematic — Toilet in North-East or East can severely impact health and finances.",
    weight: 12,
  },
  staircase: {
    ideal: ["South", "South-West", "West"],
    good: ["North-West"],
    bad: ["North-East"],
    idealMsg:
      "Ideal — South/South-West/West staircase is considered auspicious.",
    goodMsg: "Acceptable — North-West staircase is workable.",
    badMsg:
      "Avoid North-East staircase as it can block positive energy flow.",
    weight: 8,
  },
  waterTank: {
    ideal: ["North-West", "West", "South-West"],
    good: ["North"],
    bad: ["North-East", "South-East"],
    idealMsg:
      "Good — North-West/West/South-West is ideal for overhead water storage.",
    goodMsg: "Acceptable placement.",
    badMsg:
      "Avoid placing overhead tank in North-East — it is considered inauspicious.",
    weight: 5,
  },
  septicTank: {
    ideal: ["North-West", "South-East"],
    good: ["West"],
    bad: ["North-East", "South-West", "East"],
    idealMsg: "Ideal placement for septic tank.",
    goodMsg: "Acceptable placement.",
    badMsg:
      "Septic tank in North-East or South-West can have severe negative Vastu effects.",
    weight: 5,
  },
};

export type VastuStatus = "ideal" | "good" | "bad" | "neutral";

export interface RoomAnalysis {
  status: VastuStatus;
  msg: string;
  score: number;
  max: number;
}

export type VastuGrade = "Excellent" | "Good" | "Average" | "Needs Attention";

export interface VastuResult {
  score: number;
  grade: VastuGrade;
  gradeColor: string;
  positives: string[];
  issues: string[];
  recommendations: string[];
  roomAnalysis: Record<string, RoomAnalysis>;
}

export function calcVastu(
  rooms: Record<string, string>,
  facing: string
): VastuResult {
  let totalScore = 0;
  let maxScore = 0;
  const positives: string[] = [];
  const issues: string[] = [];
  const roomAnalysis: Record<string, RoomAnalysis> = {};

  const facingBonus: Record<string, number> = {
    North: 5,
    "North-East": 5,
    East: 4,
    "North-West": 3,
    West: 2,
    "South-East": 1,
    South: 0,
    "South-West": 0,
  };
  const facingScore = facingBonus[facing] ?? 2;
  totalScore += facingScore;
  maxScore += 5;

  if (facingScore >= 4) {
    positives.push(
      `Property faces ${facing} — considered highly auspicious for wealth and health.`
    );
  } else if (facingScore <= 1) {
    issues.push(
      `${facing}-facing property may require Vastu remedies at the entrance.`
    );
  }

  Object.entries(rooms).forEach(([key, direction]) => {
    if (!direction || !VASTU_RULES[key]) return;
    const rule = VASTU_RULES[key];
    maxScore += rule.weight;

    if (rule.ideal.includes(direction as VastuDirection)) {
      totalScore += rule.weight;
      roomAnalysis[key] = {
        status: "ideal",
        msg: rule.idealMsg,
        score: rule.weight,
        max: rule.weight,
      };
      positives.push(
        `${ROOM_LABELS[key]} in ${direction} — ${rule.idealMsg}`
      );
    } else if (rule.good.includes(direction as VastuDirection)) {
      const s = Math.round(rule.weight * 0.65);
      totalScore += s;
      roomAnalysis[key] = {
        status: "good",
        msg: rule.goodMsg,
        score: s,
        max: rule.weight,
      };
    } else if (rule.bad.includes(direction as VastuDirection)) {
      const s = Math.round(rule.weight * 0.1);
      totalScore += s;
      roomAnalysis[key] = {
        status: "bad",
        msg: rule.badMsg,
        score: s,
        max: rule.weight,
      };
      issues.push(
        `${ROOM_LABELS[key]} in ${direction}: ${rule.badMsg}`
      );
    } else {
      const s = Math.round(rule.weight * 0.45);
      totalScore += s;
      roomAnalysis[key] = {
        status: "neutral",
        msg: "Direction is neither strongly favourable nor unfavourable.",
        score: s,
        max: rule.weight,
      };
    }
  });

  const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let grade: VastuGrade;
  let gradeColor: string;
  if (pct >= 80) {
    grade = "Excellent";
    gradeColor = "#22c55e";
  } else if (pct >= 65) {
    grade = "Good";
    gradeColor = "#C9A84C";
  } else if (pct >= 45) {
    grade = "Average";
    gradeColor = "#f97316";
  } else {
    grade = "Needs Attention";
    gradeColor = "#ef4444";
  }

  const recommendations: string[] = [];
  if (issues.some((i) => /entrance/i.test(i))) {
    recommendations.push(
      "Place a Vastu pyramid or copper swastik at the main entrance to mitigate south-facing effects."
    );
  }
  if (issues.some((i) => /kitchen/i.test(i))) {
    recommendations.push(
      "Ensure the cook faces East while cooking; use sea salt in corners to neutralise kitchen Vastu doshas."
    );
  }
  if (issues.some((i) => /toilet/i.test(i))) {
    recommendations.push(
      "Keep the toilet lid closed at all times; use black tourmaline or salt lamps near the toilet area."
    );
  }
  if (issues.some((i) => /pooja/i.test(i))) {
    recommendations.push(
      "If Pooja room cannot be relocated, place idols facing East/West and use yellow or white decor."
    );
  }
  if (pct >= 80) {
    recommendations.push(
      "Overall excellent Vastu profile. Maintain clean, clutter-free spaces to retain positive energy flow."
    );
  }
  recommendations.push(
    "Consult a certified Vastu expert before making structural changes based on this indicative analysis."
  );
  recommendations.push(
    "Verify all directions using a magnetic compass on-site for accuracy."
  );

  return {
    score: pct,
    grade,
    gradeColor,
    positives,
    issues,
    recommendations,
    roomAnalysis,
  };
}
