"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck, ShieldAlert, ExternalLink, Loader2 } from "lucide-react";
import { RERA_PORTALS, ReraResult, ReraSearchType, lookupReraProject } from "@/lib/rera";
import { ToolContainer, ToolCard } from "@/components/tools/ToolShell";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDisclaimer } from "@/components/tools/ToolDisclaimer";
import FAQAccordion from "@/components/FAQAccordion";
import { RERA_FAQ as FAQ } from "./faqs";

const TABS: { id: ReraSearchType; label: string }[] = [
  { id: "project", label: "Project Name" },
  { id: "rera", label: "RERA Number" },
  { id: "builder", label: "Builder Name" },
];

export default function ReraCheckTool() {
  const [type, setType] = useState<ReraSearchType>("project");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReraResult | null>(null);

  async function handleCheck() {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await lookupReraProject(query, type);
    setResult(res);
    setLoading(false);
  }

  return (
    <ToolContainer>
      <ToolCard>
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <ShieldCheck size={14} /> Free Tool · No Registration Needed
        </div>
        <h2 className="text-xl font-bold text-navy-900 mt-4">Verify any property project</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter a project name, RERA registration number or builder, then confirm on the official state portal.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center rounded-xl border border-gray-200 bg-white focus-within:border-gold-400 overflow-hidden">
            <Search size={18} className="ml-3 text-gray-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="e.g. UPRERAPRJ123456 or project name"
              className="w-full px-3 py-3 text-sm text-navy-900 outline-none"
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Check RERA
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                type === t.id ? "bg-gold-500 text-navy-950 border-gold-400" : "bg-gray-50 text-navy-700 border-gray-200 hover:border-gold-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {result && (
          <div className="mt-6">
            {result.found ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck size={18} /> Indicative match found
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                  <Field label="Registration No." value={result.registrationNo} />
                  <Field label="Status" value={result.status} />
                  <Field label="Project" value={result.projectName} />
                  <Field label="State" value={result.state} />
                  <Field label="Valid Till" value={result.validTill} />
                  <Field label="Complaints" value={String(result.complaints ?? "—")} />
                </div>
                {result.portalUrl && (
                  <a
                    href={result.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-navy-900 hover:text-gold-600"
                  >
                    Verify on official portal <ExternalLink size={14} />
                  </a>
                )}
                <p className="text-[11px] text-emerald-800/70 mt-3">
                  Indicative result for demonstration. Always confirm details on the official RERA portal.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2 text-amber-700 font-semibold">
                  <ShieldAlert size={18} /> No indicative match
                </div>
                <p className="text-sm text-amber-900 mt-2">
                  We couldn&apos;t match &quot;{result.query}&quot;. Search directly on your state&apos;s official RERA
                  portal below.
                </p>
              </div>
            )}
          </div>
        )}
      </ToolCard>

      <ToolCard>
        <h3 className="text-lg font-bold text-navy-900">Official state RERA portals</h3>
        <p className="text-sm text-gray-500 mt-1">Click a state to verify directly on the government portal.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {RERA_PORTALS.map((p) => (
            <a
              key={p.state}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all px-4 py-3.5"
            >
              <div className="min-w-0">
                <p className="font-semibold text-navy-900 text-sm truncate">{p.state}</p>
                <p className="text-xs text-gray-500 truncate">{p.name}</p>
              </div>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-navy-800 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </ToolCard>

      <ToolCard>
        <FAQAccordion title="RERA Check FAQ" items={FAQ} />
      </ToolCard>

      <ToolCard>
        <ToolGrid exclude="/tools/rera-check" />
      </ToolCard>

      <ToolDisclaimer extra="This tool is not an official RERA source. It provides indicative guidance and links to official state portals, which are the authoritative record." />
    </ToolContainer>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg bg-white border border-emerald-100 px-3 py-2">
      <p className="text-[11px] text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-navy-900">{value ?? "—"}</p>
    </div>
  );
}
