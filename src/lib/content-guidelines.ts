/**
 * Platform-wide content rules shown during onboarding and reusable elsewhere
 * (listing forms, dashboards). Aligns with `/api/upload` (10MB max).
 */

export const IMAGE_UPLOAD_API = {
  maxFileSizeBytes: 10 * 1024 * 1024,
  maxFileSizeLabel: "10 MB",
  allowedFormatsDisplay: "JPEG, PNG, WebP, GIF, SVG",
} as const;

/** Recommended specs when users prepare logos, covers, and listing photos */
export const IMAGE_DIMENSION_GUIDELINES = [
  {
    key: "logo",
    title: "Logo / brand mark",
    dimensions: "400 × 400 px (square), minimum 200 × 200 px",
    aspectRatio: "1 : 1",
    note: "PNG or WebP with transparent background works best.",
  },
  {
    key: "cover",
    title: "Cover / banner",
    dimensions: "1920 × 1080 px or 1200 × 630 px",
    aspectRatio: "16 : 9 or ~1.91 : 1",
    note: "Used on profile or marketing surfaces; avoid text too close to edges.",
  },
  {
    key: "listing",
    title: "Property photos",
    dimensions: "At least 1280 × 720 px on the longest side",
    aspectRatio: "Landscape preferred for the first image",
    note: "Sharp, well-lit photos; keep file under the upload limit after compression.",
  },
] as const;

/** Max characters per onboarding field (same limits enforced in `/api/user/onboarding`) */
export const ONBOARDING_CHAR_LIMITS = {
  partner: {
    company: 120,
    city: 80,
    category: 80,
    experience: 24,
    reraLicense: 80,
    details: 2000,
  },
  vendor: {
    businessName: 120,
    category: 80,
    city: 80,
    portfolio: 500,
    details: 2000,
  },
  developer: {
    companyName: 120,
    city: 80,
    website: 500,
    reraNumber: 80,
    about: 2000,
  },
} as const;

export type OnboardingRole = keyof typeof ONBOARDING_CHAR_LIMITS;
