import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jsPDF } from "jspdf";

function safeParseJSON(str: string | null | undefined): any[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

const STATUS_MAP: Record<string, string> = {
  upcoming: "Upcoming",
  "under-construction": "Under Construction",
  "ready-to-move": "Ready to Move",
};

const TYPE_MAP: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  mixed: "Mixed Use",
  plots: "Plots / Land",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({ where: { slug } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const images = safeParseJSON(project.images);
    const configs = safeParseJSON(project.configurations);
    const amenities = safeParseJSON(project.amenities);
    const highlights = safeParseJSON(project.highlights);
    const locationAdvantages = safeParseJSON(project.locationAdvantages);

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = 210;
    const pageH = 297;
    const margin = 15;
    const contentW = pageW - margin * 2;
    let y = margin;

    const navy = [18, 32, 64] as [number, number, number];
    const gold = [212, 175, 55] as [number, number, number];
    const gray = [100, 100, 100] as [number, number, number];
    const lightGray = [150, 150, 150] as [number, number, number];

    const checkPageBreak = (needed: number) => {
      if (y + needed > pageH - margin) {
        doc.addPage();
        y = margin;
        return true;
      }
      return false;
    };

    // Header bar
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 25, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Property Pointers", margin, 16);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("propertypointers.com", pageW - margin, 16, { align: "right" });

    y = 35;

    // Project title
    doc.setTextColor(...navy);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(project.title, contentW);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 8 + 2;

    // Location
    doc.setFontSize(11);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text(`${project.location}, ${project.city}, ${project.state}`, margin, y);
    y += 6;
    doc.text(`by ${project.builderName}`, margin, y);
    y += 10;

    // Hero image
    if (images.length > 0) {
      const imgData = await fetchImageAsBase64(images[0]);
      if (imgData) {
        try {
          const imgH = 70;
          doc.addImage(imgData, "JPEG", margin, y, contentW, imgH, undefined, "MEDIUM");
          y += imgH + 8;
        } catch {
          y += 5;
        }
      }
    }

    checkPageBreak(60);

    // Quick facts box
    doc.setFillColor(245, 245, 250);
    doc.roundedRect(margin, y, contentW, 42, 3, 3, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...navy);
    doc.text("Project Snapshot", margin + 5, y + 8);

    const facts = [
      ["Type", TYPE_MAP[project.propertyType] || project.propertyType],
      ["Status", STATUS_MAP[project.projectStatus] || project.projectStatus],
      ["Possession", project.possessionDate || "TBA"],
      ["Starting Price", `Rs. ${project.startingPrice} ${project.priceUnit}+`],
      ["Total Area", project.totalArea || "N/A"],
      ["Units", project.totalUnits ? `${project.totalUnits}+` : "N/A"],
      ["RERA", project.reraNumber || "N/A"],
    ];

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    let factY = y + 14;
    let col = 0;
    for (let i = 0; i < facts.length; i++) {
      const [label, value] = facts[i];
      const xOff = margin + 5 + col * 60;
      doc.setTextColor(...lightGray);
      doc.text(label, xOff, factY);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.text(value, xOff, factY + 4);
      doc.setFont("helvetica", "normal");
      col++;
      if (col >= 3) {
        col = 0;
        factY += 12;
      }
    }
    y += 50;

    checkPageBreak(40);

    // Description
    if (project.description) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("About the Project", margin, y);
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      const descLines = doc.splitTextToSize(project.description.slice(0, 800), contentW);
      for (const line of descLines.slice(0, 12)) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 5;
      }
      y += 5;
    }

    checkPageBreak(30);

    // Configurations
    if (configs.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("Configurations", margin, y);
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(configs.join("  |  "), margin, y);
      y += 8;
    }

    checkPageBreak(50);

    // Highlights
    if (highlights.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("Key Highlights", margin, y);
      y += 7;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      for (const h of highlights.slice(0, 10)) {
        checkPageBreak(6);
        doc.setTextColor(...gold);
        doc.text("•", margin, y);
        doc.setTextColor(...gray);
        doc.text(String(h), margin + 4, y);
        y += 5;
      }
      y += 5;
    }

    checkPageBreak(50);

    // Amenities
    if (amenities.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("Amenities", margin, y);
      y += 7;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      const amenityText = amenities.slice(0, 20).join("  •  ");
      const amenityLines = doc.splitTextToSize(amenityText, contentW);
      for (const line of amenityLines.slice(0, 6)) {
        checkPageBreak(5);
        doc.text(line, margin, y);
        y += 4.5;
      }
      y += 5;
    }

    checkPageBreak(50);

    // Location advantages
    if (locationAdvantages.length > 0) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("Location Advantages", margin, y);
      y += 7;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      for (const adv of locationAdvantages.slice(0, 10)) {
        checkPageBreak(5);
        const place = typeof adv === "string" ? adv : adv.place;
        const dist = typeof adv === "string" ? "" : adv.distance;
        doc.setTextColor(...gray);
        doc.text(`• ${place}`, margin, y);
        if (dist) {
          doc.setTextColor(...gold);
          doc.text(dist, margin + 80, y);
        }
        y += 5;
      }
      y += 5;
    }

    // Additional images
    const extraImages = images.slice(1, 4);
    if (extraImages.length > 0) {
      checkPageBreak(55);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...navy);
      doc.text("Gallery", margin, y);
      y += 7;

      const imgW = (contentW - 6) / 3;
      const imgH = 40;
      let imgX = margin;
      for (const imgUrl of extraImages) {
        const imgData = await fetchImageAsBase64(imgUrl);
        if (imgData) {
          try {
            doc.addImage(imgData, "JPEG", imgX, y, imgW, imgH, undefined, "MEDIUM");
          } catch {}
        }
        imgX += imgW + 3;
      }
      y += imgH + 8;
    }

    // Footer disclaimer
    checkPageBreak(25);
    doc.setFillColor(250, 248, 240);
    doc.rect(margin, y, contentW, 20, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(120, 100, 60);
    const disclaimer =
      "This brochure is for informational purposes only. Prices, specifications, availability, and possession timelines " +
      "are indicative and subject to change. Please verify all details with the developer before making any decisions.";
    const discLines = doc.splitTextToSize(disclaimer, contentW - 6);
    doc.text(discLines, margin + 3, y + 5);
    y += 22;

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...navy);
    doc.text("Property Pointers — Your trusted real estate partner", margin, y);
    doc.setTextColor(...gold);
    doc.text("propertypointers.com", pageW - margin, y, { align: "right" });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
    const filename = `${slug}-brochure.pdf`;

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Brochure generation error:", error);
    return NextResponse.json({ error: "Failed to generate brochure" }, { status: 500 });
  }
}
