"use client";

import { ImageIcon, Type } from "lucide-react";
import {
  IMAGE_DIMENSION_GUIDELINES,
  IMAGE_UPLOAD_API,
  ONBOARDING_CHAR_LIMITS,
  type OnboardingRole,
} from "@/lib/content-guidelines";

export default function GuidelinesPanel({ role }: { role: OnboardingRole }) {
  const limitRows =
    role === "partner"
      ? [
          ["Company / firm name", ONBOARDING_CHAR_LIMITS.partner.company],
          ["Primary city", ONBOARDING_CHAR_LIMITS.partner.city],
          ["RERA license", ONBOARDING_CHAR_LIMITS.partner.reraLicense],
          ["About your services", ONBOARDING_CHAR_LIMITS.partner.details],
        ]
      : role === "vendor"
        ? [
            ["Business name", ONBOARDING_CHAR_LIMITS.vendor.businessName],
            ["Service category", ONBOARDING_CHAR_LIMITS.vendor.category],
            ["Primary city", ONBOARDING_CHAR_LIMITS.vendor.city],
            ["Portfolio / website URL", ONBOARDING_CHAR_LIMITS.vendor.portfolio],
            ["About your services", ONBOARDING_CHAR_LIMITS.vendor.details],
          ]
        : [
            ["Organization name", ONBOARDING_CHAR_LIMITS.developer.companyName],
            ["Primary city", ONBOARDING_CHAR_LIMITS.developer.city],
            ["Website URL", ONBOARDING_CHAR_LIMITS.developer.website],
            ["RERA / registration", ONBOARDING_CHAR_LIMITS.developer.reraNumber],
            ["About your projects", ONBOARDING_CHAR_LIMITS.developer.about],
          ];

  return (
    <div className="rounded-2xl border border-gold-200/80 bg-gradient-to-br from-gold-50/90 to-white p-4 sm:p-5 mb-6 shadow-sm space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-gold-700 mb-2 flex items-center gap-2">
          <ImageIcon size={14} className="shrink-0" />
          Image uploads (when you add photos later)
        </p>
        <ul className="text-xs text-gray-600 space-y-2 leading-relaxed">
          <li>
            <strong className="text-navy-800">Max file size:</strong>{" "}
            {IMAGE_UPLOAD_API.maxFileSizeLabel} per file (same as site-wide upload).
          </li>
          <li>
            <strong className="text-navy-800">Formats:</strong>{" "}
            {IMAGE_UPLOAD_API.allowedFormatsDisplay}.
          </li>
        </ul>
        <div className="mt-3 space-y-2.5">
          {IMAGE_DIMENSION_GUIDELINES.map((row) => (
            <div
              key={row.key}
              className="rounded-lg bg-white/80 border border-gray-100 px-3 py-2 text-[11px] sm:text-xs text-gray-700"
            >
              <p className="font-semibold text-navy-800">{row.title}</p>
              <p className="mt-0.5">
                <span className="text-gray-500">Size:</span> {row.dimensions}
              </p>
              <p>
                <span className="text-gray-500">Aspect:</span> {row.aspectRatio}
              </p>
              <p className="text-gray-500 mt-0.5">{row.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gold-100 pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-gold-700 mb-2 flex items-center gap-2">
          <Type size={14} className="shrink-0" />
          Text fields on this page
        </p>
        <p className="text-xs text-gray-600 mb-2">
          Character limits below apply to everyone for consistency. Extra text is not saved.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white/90">
          <table className="w-full text-[11px] sm:text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80 text-left">
                <th className="py-2 px-3 font-semibold text-gray-600">Field</th>
                <th className="py-2 px-3 font-semibold text-gray-600 whitespace-nowrap">
                  Max characters
                </th>
              </tr>
            </thead>
            <tbody>
              {limitRows.map(([label, max]) => (
                <tr key={label} className="border-b border-gray-50 last:border-0">
                  <td className="py-1.5 px-3 text-gray-800">{label}</td>
                  <td className="py-1.5 px-3 font-mono text-navy-700">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
