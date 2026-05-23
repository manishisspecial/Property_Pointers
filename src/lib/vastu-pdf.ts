import { jsPDF } from "jspdf";

const NAVY: [number, number, number] = [15, 32, 68];
const GOLD: [number, number, number] = [201, 168, 76];
const WHITE: [number, number, number] = [255, 255, 255];
const LIGHT: [number, number, number] = [248, 248, 252];

interface PropertyDetails {
  name: string;
  city: string;
  location?: string;
  propertyType: string;
  facing: string;
  contact?: string;
  mobile?: string;
  email?: string;
}

interface RoomRow {
  room: string;
  direction: string;
  status: string;
  statusLabel: string;
  comment: string;
  score?: number;
  max?: number;
}

interface PdfReportData {
  property: PropertyDetails;
  score: number;
  grade: string;
  gradeColor?: string;
  confidence?: string;
  summary?: string;
  positives: string[];
  issues: string[];
  recommendations: string[];
  rooms: RoomRow[];
  floorPlanDataUrl?: string | null;
  isAI?: boolean;
}

const STATUS_RGB: Record<string, [number, number, number]> = {
  ideal: [34, 197, 94],
  good: [201, 168, 76],
  Good: [34, 197, 94],
  bad: [239, 68, 68],
  "Needs Attention": [239, 68, 68],
  neutral: [100, 116, 139],
  Average: [201, 168, 76],
};

export async function generateVastuPDF(data: PdfReportData): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // ── Header ────────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 40, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 40, W, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...WHITE);
  doc.text("PropertyPointers", 14, 18);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GOLD);
  doc.text(
    data.isAI
      ? "Real Estate Ecosystem Platform  ·  AI-Powered Vastu Analysis"
      : "Real Estate Ecosystem Platform",
    14,
    26
  );

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...WHITE);
  doc.text("Vastu Analysis Report", 14, 36);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 190, 210);
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  doc.text(`Generated: ${dateStr}`, W - 14, 20, { align: "right" });
  doc.text(
    data.isAI ? "AI Vision Analysis · Indicative Only" : "Indicative Vastu Guidance",
    W - 14,
    28,
    { align: "right" }
  );

  if (data.isAI) {
    doc.setFillColor(201, 168, 76);
    doc.roundedRect(W - 60, 32, 48, 8, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...NAVY);
    doc.text("AI-ANALYSED FLOOR PLAN", W - 36, 37.5, { align: "center" });
  }

  let y = 50;

  // ── Property Details ──────────────────────────────────────────────────
  const p = data.property;
  const details: [string, string][] = [
    ["Owner", p.name || "—"],
    ["City", p.city || "—"],
    ["Locality", p.location || "—"],
    ["Property Type", p.propertyType || "—"],
    ["Facing Direction", p.facing || "—"],
  ];
  if (p.mobile) details.push(["Mobile", `+91 ${p.mobile}`]);
  if (p.email) details.push(["Email", p.email]);
  if (p.contact) details.push(["Contact", p.contact]);

  const half = Math.ceil(details.length / 2);
  const cardH = 12 + half * 9 + 4;

  doc.setFillColor(...LIGHT);
  doc.roundedRect(12, y, W - 24, cardH, 3, 3, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.roundedRect(12, y, W - 24, cardH, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...NAVY);
  doc.text("PROPERTY & OWNER DETAILS", 18, y + 8);

  doc.setFontSize(8);
  details.forEach(([l, v], i) => {
    const col = i < half ? 0 : 1;
    const row = i % half;
    const cx = col === 0 ? 18 : 110;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 110, 130);
    doc.text(l + ":", cx, y + 16 + row * 9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    const val = v.length > 30 ? v.slice(0, 29) + "…" : v;
    doc.text(val, cx + 28, y + 16 + row * 9);
  });
  y += cardH + 6;

  // ── Score Card ────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.roundedRect(12, y, W - 24, 46, 3, 3, "F");

  doc.setFillColor(...GOLD);
  doc.circle(36, y + 23, 13, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...NAVY);
  doc.text(String(data.score), 36, y + 20, { align: "center" });
  doc.setFontSize(7);
  doc.text("/100", 36, y + 27, { align: "center" });

  doc.setFontSize(20);
  doc.setTextColor(...GOLD);
  doc.text(data.grade, 56, y + 16);

  doc.setFontSize(9);
  doc.setTextColor(180, 200, 230);
  doc.setFont("helvetica", "normal");
  doc.text("Overall Vastu Grade", 56, y + 24);

  if (data.confidence) {
    const confColor: Record<string, [number, number, number]> = {
      High: [34, 197, 94],
      Medium: [201, 168, 76],
      Low: [239, 68, 68],
    };
    const cc = confColor[data.confidence] || GOLD;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...cc);
    doc.text(`Confidence: ${data.confidence}`, 56, y + 32);
  }

  const barX = 56;
  const barY = y + 38;
  const barW = W - 80;
  doc.setFillColor(40, 55, 100);
  doc.roundedRect(barX, barY, barW, 4, 1, 1, "F");
  doc.setFillColor(...GOLD);
  doc.roundedRect(barX, barY, barW * (data.score / 100), 4, 1, 1, "F");

  y += 52;

  // ── Summary ───────────────────────────────────────────────────────────
  if (data.summary) {
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(12, y, W - 24, 20, 3, 3, "F");
    doc.setDrawColor(180, 200, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(12, y, W - 24, 20, 3, 3, "S");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(40, 60, 100);
    const sumLines = doc.splitTextToSize(`"${data.summary}"`, W - 36);
    doc.text(sumLines, 18, y + 8);
    y += 26;
  }

  // ── Floor Plan Image ──────────────────────────────────────────────────
  if (data.floorPlanDataUrl) {
    try {
      const imgH = 58;
      doc.setFillColor(...LIGHT);
      doc.roundedRect(12, y, W - 24, imgH + 14, 3, 3, "F");
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.3);
      doc.roundedRect(12, y, W - 24, imgH + 14, 3, 3, "S");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...NAVY);
      doc.text(
        data.isAI ? "AI-ANALYSED FLOOR PLAN" : "UPLOADED FLOOR PLAN",
        18,
        y + 8
      );
      if (data.isAI) {
        doc.setFillColor(...GOLD);
        doc.roundedRect(W - 56, y + 3, 42, 7, 2, 2, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...NAVY);
        doc.text("VISION ANALYSED", W - 35, y + 7.5, { align: "center" });
      }
      doc.addImage(data.floorPlanDataUrl, "JPEG", W / 2 - 44, y + 12, 88, imgH - 6);
      y += imgH + 20;
    } catch {
      // skip image if it fails
    }
  }

  // ── Room-wise Analysis ────────────────────────────────────────────────
  if (data.rooms.length > 0) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text("ROOM-WISE VASTU ANALYSIS", 14, y);
    y += 8;

    data.rooms.forEach((r) => {
      if (y > 258) {
        doc.addPage();
        y = 20;
      }
      const sc = STATUS_RGB[r.status] || [100, 116, 139];
      const rowH = 22;

      doc.setFillColor(...LIGHT);
      doc.roundedRect(12, y, W - 24, rowH, 2, 2, "F");
      doc.setFillColor(...sc);
      doc.roundedRect(12, y, 3, rowH, 1, 1, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...NAVY);
      doc.text(r.room, 19, y + 7);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 90, 110);
      doc.setFontSize(7.5);
      const cLines = doc.splitTextToSize(r.comment || "", 100);
      doc.text(cLines[0] || "", 19, y + 13);
      if (cLines[1]) doc.text(cLines[1], 19, y + 18);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...sc);
      doc.text(r.direction || "—", W - 18, y + 8, { align: "right" });
      doc.setTextColor(80, 100, 140);
      doc.setFontSize(7);
      const rightInfo =
        r.score != null && r.max != null
          ? `${r.statusLabel}  |  ${r.score}/${r.max} pts`
          : r.statusLabel;
      doc.text(rightInfo, W - 18, y + 15, { align: "right" });

      y += rowH + 3;
    });
    y += 4;
  }

  // ── Positives ─────────────────────────────────────────────────────────
  if (data.positives.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(34, 120, 70);
    doc.text("POSITIVE VASTU POINTS", 14, y);
    y += 7;
    data.positives.slice(0, 6).forEach((pt) => {
      if (y > 268) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(40, 80, 60);
      const lines = doc.splitTextToSize("• " + pt, W - 32);
      doc.text(lines, 17, y);
      y += lines.length * 5 + 2;
    });
    y += 3;
  }

  // ── Issues ────────────────────────────────────────────────────────────
  if (data.issues.length > 0) {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(180, 50, 40);
    doc.text("VASTU ISSUES FOUND", 14, y);
    y += 7;
    data.issues.slice(0, 6).forEach((iss) => {
      if (y > 268) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(140, 50, 40);
      const lines = doc.splitTextToSize("• " + iss, W - 32);
      doc.text(lines, 17, y);
      y += lines.length * 5 + 2;
    });
    y += 3;
  }

  // ── Recommendations ───────────────────────────────────────────────────
  if (data.recommendations.length > 0) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text("PRACTICAL RECOMMENDATIONS", 14, y);
    y += 7;
    data.recommendations.forEach((rec) => {
      if (y > 268) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(50, 60, 90);
      const lines = doc.splitTextToSize("→ " + rec, W - 32);
      doc.text(lines, 17, y);
      y += lines.length * 5 + 2;
    });
    y += 6;
  }

  // ── CTA ───────────────────────────────────────────────────────────────
  if (y > 258) {
    doc.addPage();
    y = 20;
  }
  doc.setFillColor(...GOLD);
  doc.roundedRect(12, y, W - 24, 22, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text(
    "Explore properties · Compare developers · Connect with realty advisors",
    W / 2,
    y + 9,
    { align: "center" }
  );
  doc.text(
    "Discover vendors & services at  PropertyPointers.com",
    W / 2,
    y + 17,
    { align: "center" }
  );
  y += 28;

  // ── Disclaimer ────────────────────────────────────────────────────────
  if (y > 260) {
    doc.addPage();
    y = 20;
  }
  doc.setFillColor(245, 245, 250);
  doc.roundedRect(12, y, W - 24, 26, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(120, 120, 140);
  doc.text("DISCLAIMER", 18, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(130, 130, 150);
  const disclaimer =
    "This Vastu analysis is purely indicative, based on traditional Vastu Shastra principles. It does not constitute professional architectural, structural, legal, or engineering advice. Results depend on image clarity and stated directions. Always verify with a qualified Vastu consultant, licensed architect, and site professional before making any property decisions. PropertyPointers makes no warranty of accuracy or completeness.";
  const dLines = doc.splitTextToSize(disclaimer, W - 38);
  doc.text(dLines, 18, y + 13);

  // ── Footer ────────────────────────────────────────────────────────────
  doc.setFillColor(...NAVY);
  doc.rect(0, H - 12, W, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(140, 160, 200);
  doc.text(
    "© PropertyPointers.com  |  Indicative Vastu Guidance  |  Not a substitute for professional advice",
    W / 2,
    H - 5,
    { align: "center" }
  );

  doc.save(`PropertyPointers_Vastu_${data.property.name || "Report"}.pdf`);
}
