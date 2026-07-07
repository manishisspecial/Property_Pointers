import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * Dynamic locality route.
 *
 * The 25 known localities are served by static rewrites in next.config.mjs
 * (each pointing at its own PP_LOC_*.html). This React page is only reached
 * when a user requests /localities/<slug> for a locality that ISN'T rewritten
 * — in that case we serve the shared PP_LOCALITY_TEMPLATE.html so the URL
 * still resolves to a well-designed page instead of a 404.
 */

const KNOWN_SLUGS = new Set<string>([
  "baner-pune",
  "wakad-pune",
  "hinjewadi-pune",
  "kharadi-pune",
  "whitefield-bengaluru",
  "electronic-city-bengaluru",
  "sarjapur-road-bengaluru",
  "gachibowli-hyderabad",
  "kondapur-hyderabad",
  "manikonda-hyderabad",
  "sector-62-noida",
  "sector-75-noida",
  "sector-137-noida",
  "sector-150-noida",
  "greater-noida-west",
  "sohna-road-gurugram",
  "sector-67-gurugram",
  "dwarka-expressway-gurugram",
  "dwarka-delhi",
  "rohini-delhi",
  "thane-west-mumbai",
  "navi-mumbai",
  "rajarhat-kolkata",
  "new-town-kolkata",
  "zirakpur-chandigarh",
]);

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = slugToTitle(params.slug);
  return {
    title: `${title} — Locality Guide, Prices & Reviews | PropertyPointers`,
    description: `Complete locality guide for ${title}: property prices, connectivity, schools, hospitals, projects, safety and market outlook.`,
  };
}

export default async function LocalityDynamicPage({ params }: { params: { slug: string } }) {
  // Known slugs are handled by next.config.mjs rewrites — this page is only a fallback.
  // If the slug is in the known set, Next's routing would have hit the rewrite before this file.
  // But if a user hits it via SPA navigation, we still want a good result.
  const slug = params.slug;
  const isKnown = KNOWN_SLUGS.has(slug);

  const htmlFile = isKnown
    ? mapSlugToFile(slug)
    : "PP_LOCALITY_TEMPLATE.html";

  const filePath = path.join(process.cwd(), "public", "pp", htmlFile);

  let html: string;
  try {
    html = await readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  // Extract only the body content (client HTML files include their own <html>/<head>/<body>)
  const inner = extractBody(html);
  const styles = extractStyles(html);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: inner }} />
    </>
  );
}

function mapSlugToFile(slug: string): string {
  const map: Record<string, string> = {
    "baner-pune": "PP_LOC_BANER_PUNE.html",
    "wakad-pune": "PP_LOC_WAKAD_PUNE.html",
    "hinjewadi-pune": "PP_LOC_HINJEWADI_PUNE.html",
    "kharadi-pune": "PP_LOC_KHARADI_PUNE.html",
    "whitefield-bengaluru": "PP_LOC_WHITEFIELD_BENGALURU.html",
    "electronic-city-bengaluru": "PP_LOC_ELECTRONIC_CITY.html",
    "sarjapur-road-bengaluru": "PP_LOC_SARJAPUR_ROAD.html",
    "gachibowli-hyderabad": "PP_LOC_GACHIBOWLI_HYDERABAD.html",
    "kondapur-hyderabad": "PP_LOC_KONDAPUR_HYDERABAD.html",
    "manikonda-hyderabad": "PP_LOC_MANIKONDA_HYDERABAD.html",
    "sector-62-noida": "PP_LOC_SECTOR_62_NOIDA.html",
    "sector-75-noida": "PP_LOC_SECTOR_75_NOIDA.html",
    "sector-137-noida": "PP_LOC_SECTOR_137_NOIDA.html",
    "sector-150-noida": "PP_LOC_SECTOR_150_NOIDA.html",
    "greater-noida-west": "PP_LOC_GREATER_NOIDA_WEST.html",
    "sohna-road-gurugram": "PP_LOC_SOHNA_ROAD_GURUGRAM.html",
    "sector-67-gurugram": "PP_LOC_SECTOR_67_GURUGRAM.html",
    "dwarka-expressway-gurugram": "PP_LOC_DWARKA_EXPRESSWAY.html",
    "dwarka-delhi": "PP_LOC_DWARKA_DELHI.html",
    "rohini-delhi": "PP_LOC_ROHINI_DELHI.html",
    "thane-west-mumbai": "PP_LOC_THANE_WEST_MUMBAI.html",
    "navi-mumbai": "PP_LOC_NAVI_MUMBAI.html",
    "rajarhat-kolkata": "PP_LOC_RAJARHAT_KOLKATA.html",
    "new-town-kolkata": "PP_LOC_NEW_TOWN_KOLKATA.html",
    "zirakpur-chandigarh": "PP_LOC_ZIRAKPUR_CHANDIGARH.html",
  };
  return map[slug] || "PP_LOCALITY_TEMPLATE.html";
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

function extractStyles(html: string): string {
  const styles: string[] = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    styles.push(m[1]);
  }
  return styles.join("\n");
}
