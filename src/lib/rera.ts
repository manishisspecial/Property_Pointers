// RERA verification seam. There is no unified free RERA API in India — each
// state authority runs its own portal. For now this returns an indicative
// (demo) result and points users to the official portal. Swap `lookupReraProject`
// for a real provider/integration later without touching the UI.

export interface ReraPortal {
  state: string;
  name: string;
  url: string;
}

export const RERA_PORTALS: ReraPortal[] = [
  { state: "Uttar Pradesh", name: "UP-RERA", url: "https://www.up-rera.in" },
  { state: "Maharashtra", name: "MahaRERA", url: "https://maharerait.mahaonline.gov.in" },
  { state: "Karnataka", name: "K-RERA", url: "https://rera.karnataka.gov.in" },
  { state: "Haryana", name: "H-RERA", url: "https://hrera.in" },
  { state: "Rajasthan", name: "RERA Rajasthan", url: "https://rera.rajasthan.gov.in" },
  { state: "Telangana", name: "TS-RERA", url: "https://rera.telangana.gov.in" },
  { state: "Delhi", name: "Delhi RERA", url: "https://rera.delhi.gov.in" },
  { state: "Gujarat", name: "GujRERA", url: "https://gujrera.gujarat.gov.in" },
  { state: "Tamil Nadu", name: "TN-RERA", url: "https://rera.tn.gov.in" },
  { state: "West Bengal", name: "WB-HIRA", url: "https://hira.wb.gov.in" },
];

export type ReraSearchType = "project" | "rera" | "builder";

export interface ReraResult {
  found: boolean;
  query: string;
  type: ReraSearchType;
  // Present only when found (demo data for now).
  registrationNo?: string;
  projectName?: string;
  builder?: string;
  state?: string;
  status?: "Registered" | "Expired" | "Not Found";
  validTill?: string;
  approvedUnits?: number;
  complaints?: number;
  portalUrl?: string;
}

// NOTE: indicative/demo result. Always verify on the official state portal.
export async function lookupReraProject(query: string, type: ReraSearchType): Promise<ReraResult> {
  await new Promise((r) => setTimeout(r, 700));
  const trimmed = query.trim();
  if (!trimmed) {
    return { found: false, query: trimmed, type };
  }
  // Demo: treat anything that looks like a RERA number as "registered".
  const looksLikeRera = /[A-Z]{2,}RERA|RERA[A-Z]*\d{4,}/i.test(trimmed) || type === "rera";
  if (looksLikeRera) {
    return {
      found: true,
      query: trimmed,
      type,
      registrationNo: trimmed.toUpperCase(),
      projectName: type === "rera" ? "Sample Registered Project" : trimmed,
      builder: "Builder details on official portal",
      state: "Uttar Pradesh",
      status: "Registered",
      validTill: "2028-12-31",
      approvedUnits: 240,
      complaints: 0,
      portalUrl: RERA_PORTALS[0].url,
    };
  }
  return { found: false, query: trimmed, type };
}
