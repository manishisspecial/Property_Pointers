"use client";

import { useCallback, useState } from "react";
import {
  Loader2,
  Upload,
  X,
  Sparkles,
  Download,
  CheckCircle2,
  AlertTriangle,
  Home,
  Lightbulb,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import type { VastuAdvicePayload } from "@/lib/vastu-advice";
import { generateVastuPDF } from "@/lib/vastu-pdf";

type NorthOption = {
  value: string;
  label: string;
};

const NORTH_OPTIONS: NorthOption[] = [
  { value: "unknown", label: "Not sure / not marked" },
  { value: "north_top", label: "North is toward the top of the image" },
  { value: "north_right", label: "North is to the right" },
  { value: "north_bottom", label: "North is toward the bottom" },
  { value: "north_left", label: "North is to the left" },
];

const GRADE_BADGE: Record<string, string> = {
  Excellent: "bg-green-500",
  Good: "bg-amber-500",
  Average: "bg-orange-500",
  "Needs Attention": "bg-red-500",
};

const CONFIDENCE_STYLE: Record<string, { text: string; bg: string }> = {
  High: { text: "text-green-400", bg: "bg-green-500/10" },
  Medium: { text: "text-amber-400", bg: "bg-amber-500/10" },
  Low: { text: "text-red-400", bg: "bg-red-500/10" },
};

const STATUS_STYLE: Record<string, { bg: string; border: string; badge: string }> = {
  Good: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-500" },
  Average: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-500" },
  "Needs Attention": { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-500" },
};

export default function VastuDesignAdvisor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [northHint, setNorthHint] = useState("unknown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    advice: VastuAdvicePayload;
    aiPowered?: boolean;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"summary" | "rooms" | "recommendations">("summary");

  const revokePreview = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    revokePreview();
  }, [revokePreview]);

  const onPick = useCallback(
    (f: File | null) => {
      if (!f) {
        clearFile();
        return;
      }
      setResult(null);
      setError(null);
      revokePreview();
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(f));
      }
    },
    [clearFile, revokePreview]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a floor plan or design file first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("northHint", northHint);
      const res = await fetch("/api/insights/vastu-advice", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult({ advice: data.advice, aiPowered: data.aiPowered });
      setActiveTab("summary");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleDownloadPDF = async () => {
    if (!result?.advice) return;
    setDownloading(true);
    try {
      const advice = result.advice;
      const rooms =
        advice.roomWiseAnalysis?.map((r) => ({
          room: r.room,
          direction: r.detectedDirection,
          status: r.status,
          statusLabel: r.status,
          comment: r.comment,
        })) ?? [];

      let floorPlanDataUrl: string | null = null;
      if (file && file.type.startsWith("image/")) {
        floorPlanDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        });
      }

      await generateVastuPDF({
        property: {
          name: "Property Owner",
          city: "",
          propertyType: "",
          facing: "",
        },
        score: advice.score ?? 0,
        grade: advice.grade ?? "Average",
        confidence: advice.confidence,
        summary: advice.summary,
        positives: advice.positivePoints ?? [],
        issues: advice.issues ?? [],
        recommendations: advice.recommendations ?? [],
        rooms,
        floorPlanDataUrl,
        isAI: result.aiPowered,
      });
    } catch {
      alert("PDF generation failed. Please try again.");
    }
    setDownloading(false);
  };

  const hasAIResult =
    result?.advice?.score != null && result?.advice?.roomWiseAnalysis != null;

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <span className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
          <Sparkles size={22} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-navy-900">
            Upload your layout &amp; get guidance
          </h2>
          <p className="text-gray-600 mt-1 text-sm leading-relaxed">
            Add a floor plan, brochure layout, or hand sketch (image or PDF).
            We&apos;ll return direction-aware Vastu-oriented ideas you can
            discuss with your architect—files are not stored on our servers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-navy-800 mb-2">
            Where is north on your drawing?
          </label>
          <select
            value={northHint}
            onChange={(e) => setNorthHint(e.target.value)}
            className="input-field max-w-xl text-sm"
          >
            {NORTH_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-800 mb-2">
            Floor plan or design file
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const dropped = e.dataTransfer.files?.[0];
                onPick(dropped ?? null);
              }}
              className={`flex flex-col items-center justify-center w-full sm:max-w-md min-h-[160px] rounded-xl border-2 border-dashed bg-gray-50 hover:bg-gold-50/40 transition-colors cursor-pointer px-4 py-6 text-center group ${
                dragActive
                  ? "border-gold-500 bg-gold-50/60"
                  : "border-gray-200 hover:border-gold-400"
              }`}
            >
              <Upload
                className="text-gold-600 mb-2 group-hover:scale-105 transition-transform"
                size={28}
              />
              <span className="text-sm font-medium text-navy-800">
                Click to upload or drag a file here
              </span>
              <span className="text-xs text-gray-500 mt-1">
                JPG, PNG, WebP, GIF, or PDF · max 12 MB
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                className="hidden"
                onChange={(e) => onPick(e.target.files?.[0] ?? null)}
              />
            </label>

            {file && (
              <div className="flex-1 w-full min-w-0 space-y-2">
                <div className="flex items-start gap-2 justify-between rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-white hover:text-navy-800 transition-colors"
                    aria-label="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>
                {previewUrl && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-navy-950 max-h-56">
                    <img
                      src={previewUrl}
                      alt="Plan preview"
                      className="w-full h-full object-contain max-h-56"
                    />
                  </div>
                )}
                {file.type === "application/pdf" && (
                  <p className="text-xs text-gray-500">
                    PDF selected. Preview not shown in browser—advice will still
                    be generated.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <p
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 text-white font-semibold px-6 py-3 text-sm hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[200px]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Analysing floor plan…
            </>
          ) : (
            <>
              <Sparkles size={18} className="text-gold-400" />
              Get Vastu-style advice
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 space-y-5"
          >
            {/* AI badge */}
            {result.aiPowered && (
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 bg-gold-500/10 border border-gold-500/30 text-gold-600 font-semibold rounded-full px-3 py-1">
                  <Sparkles size={12} /> AI-Powered Analysis
                </span>
              </div>
            )}

            {/* Enhanced AI result with score */}
            {hasAIResult ? (
              <>
                {/* Score card */}
                <div className="rounded-2xl gradient-navy text-white p-6 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl" />
                  <div className="relative flex flex-col sm:flex-row items-center gap-6">
                    <div className="shrink-0">
                      <div
                        className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
                        style={{
                          background: `conic-gradient(${
                            GRADE_BADGE[result.advice.grade || "Average"] === "bg-green-500"
                              ? "#22c55e"
                              : GRADE_BADGE[result.advice.grade || "Average"] === "bg-amber-500"
                                ? "#d97706"
                                : GRADE_BADGE[result.advice.grade || "Average"] === "bg-orange-500"
                                  ? "#ea580c"
                                  : "#ef4444"
                          } ${(result.advice.score ?? 0) * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                        }}
                      >
                        <div className="w-[76px] h-[76px] rounded-full bg-navy-900 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white leading-none">
                            {result.advice.score}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            /100
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                        {result.advice.grade && (
                          <span
                            className={clsx(
                              "text-white text-xs font-bold rounded-full px-3 py-1",
                              GRADE_BADGE[result.advice.grade]
                            )}
                          >
                            {result.advice.grade}
                          </span>
                        )}
                        {result.advice.confidence && (
                          <span
                            className={clsx(
                              "text-xs font-bold rounded-full px-3 py-1",
                              CONFIDENCE_STYLE[result.advice.confidence]?.text,
                              CONFIDENCE_STYLE[result.advice.confidence]?.bg
                            )}
                          >
                            {result.advice.confidence} Confidence
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-extrabold">
                        Vastu Analysis Report
                      </h3>
                      {result.advice.summary && (
                        <p className="text-gray-400 text-sm mt-2 italic leading-relaxed">
                          &ldquo;{result.advice.summary}&rdquo;
                        </p>
                      )}
                      <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${result.advice.score ?? 0}%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                  {(
                    [
                      ["summary", "Summary"],
                      ["rooms", "Room Analysis"],
                      ["recommendations", "Recommendations"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={clsx(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all",
                        activeTab === id
                          ? "bg-white text-navy-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Summary tab */}
                {activeTab === "summary" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-gray-100 p-5 border-t-[3px] border-t-green-500">
                      <h4 className="text-green-600 font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Positive Points
                      </h4>
                      {(result.advice.positivePoints ?? []).length === 0 ? (
                        <p className="text-gray-500 text-sm">
                          No strong positives detected.
                        </p>
                      ) : (
                        result.advice.positivePoints?.map((p, i) => (
                          <div
                            key={i}
                            className="flex gap-2 mb-2 text-sm"
                          >
                            <Sparkles
                              size={12}
                              className="text-gold-500 mt-0.5 shrink-0"
                            />
                            <span className="text-gray-700 leading-relaxed">
                              {p}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-5 border-t-[3px] border-t-red-500">
                      <h4 className="text-red-600 font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Issues Found
                      </h4>
                      {(result.advice.issues ?? []).length === 0 ? (
                        <p className="text-green-600 text-sm font-semibold">
                          No major issues detected.
                        </p>
                      ) : (
                        result.advice.issues?.map((iss, i) => (
                          <div
                            key={i}
                            className="flex gap-2 mb-2 text-sm"
                          >
                            <AlertTriangle
                              size={12}
                              className="text-red-400 mt-0.5 shrink-0"
                            />
                            <span className="text-gray-700 leading-relaxed">
                              {iss}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Room Analysis tab */}
                {activeTab === "rooms" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Home size={16} className="text-gold-500" />
                      <h4 className="font-bold text-navy-900 text-sm">
                        Room-wise AI Analysis
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Directions auto-detected from your floor plan. Verify with
                      a compass on-site.
                    </p>
                    {(result.advice.roomWiseAnalysis ?? []).map((r, i) => {
                      const meta =
                        STATUS_STYLE[r.status] || STATUS_STYLE.Average;
                      return (
                        <div
                          key={i}
                          className={clsx(
                            "p-4 rounded-xl border",
                            meta.bg,
                            meta.border
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-bold text-navy-900 text-sm">
                                  {r.room}
                                </span>
                                <span
                                  className={clsx(
                                    "text-white text-[11px] font-bold rounded-full px-2.5 py-0.5",
                                    meta.badge
                                  )}
                                >
                                  {r.status}
                                </span>
                                {r.detectedDirection &&
                                  r.detectedDirection !== "Not Detected" && (
                                    <span className="text-[11px] font-semibold text-navy-700 bg-navy-100/50 rounded-full px-2 py-0.5">
                                      <Compass
                                        size={10}
                                        className="inline mr-1"
                                      />
                                      {r.detectedDirection}
                                    </span>
                                  )}
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {r.comment}
                              </p>
                              {r.suggestion && (
                                <p className="text-xs text-gray-500 mt-1">
                                  <Lightbulb
                                    size={10}
                                    className="inline mr-1 text-gold-500"
                                  />
                                  {r.suggestion}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Recommendations tab */}
                {activeTab === "recommendations" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb size={16} className="text-gold-500" />
                      <h4 className="font-bold text-navy-900 text-sm">
                        Practical Recommendations
                      </h4>
                    </div>
                    {(result.advice.recommendations ?? []).map((r, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <Compass
                          size={12}
                          className="text-gold-500 mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {r}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 leading-relaxed bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <strong className="text-gray-500">Disclaimer:</strong>{" "}
                  {result.advice.disclaimer}
                </p>

                {/* Download PDF */}
                <div className="flex justify-center">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 rounded-xl bg-navy-900 text-white font-semibold px-6 py-3 text-sm hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {downloading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Generating PDF…
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download PDF Report
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* Fallback: rule-based guidance (original display) */
              <div className="rounded-2xl border border-navy-800 bg-gradient-to-br from-navy-900 to-navy-800 text-white p-6 shadow-lg ring-1 ring-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-400/90">
                  Guidance for your plan
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  {result.advice.summary}
                </p>

                <div className="mt-6 space-y-5">
                  {result.advice.sections.map((sec) => (
                    <div
                      key={sec.title}
                      className="border-t border-white/10 pt-4 first:border-0 first:pt-0"
                    >
                      <h3 className="font-semibold text-white text-sm">
                        {sec.title}
                      </h3>
                      <ul className="mt-2 space-y-2 text-sm text-gray-300 leading-relaxed">
                        {sec.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-gold-500 shrink-0 mt-0.5">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                  {result.advice.disclaimer}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
