"use client";

import { useCallback, useState } from "react";
import { Loader2, Upload, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { VastuAdvicePayload } from "@/lib/vastu-advice";

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

export default function VastuDesignAdvisor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [northHint, setNorthHint] = useState("unknown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ advice: VastuAdvicePayload } | null>(null);
  const [dragActive, setDragActive] = useState(false);

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
      setResult({ advice: data.advice });
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <span className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
          <Sparkles size={22} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-navy-900">Upload your layout &amp; get guidance</h2>
          <p className="text-gray-600 mt-1 text-sm leading-relaxed">
            Add a floor plan, brochure layout, or hand sketch (image or PDF). We&apos;ll return direction-aware Vastu-oriented ideas you can
            discuss with your architect—files are not stored on our servers.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-navy-800 mb-2">Where is north on your drawing?</label>
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
          <label className="block text-sm font-medium text-navy-800 mb-2">Floor plan or design file</label>
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
                dragActive ? "border-gold-500 bg-gold-50/60" : "border-gray-200 hover:border-gold-400"
              }`}
            >
              <Upload className="text-gold-600 mb-2 group-hover:scale-105 transition-transform" size={28} />
              <span className="text-sm font-medium text-navy-800">Click to upload or drag a file here</span>
              <span className="text-xs text-gray-500 mt-1">JPG, PNG, WebP, GIF, or PDF · max 12 MB</span>
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
                    <p className="text-sm font-medium text-navy-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
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
                    <img src={previewUrl} alt="Plan preview" className="w-full h-full object-contain max-h-56" />
                  </div>
                )}
                {file.type === "application/pdf" && (
                  <p className="text-xs text-gray-500">PDF selected. Preview not shown in browser—advice will still be generated.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2" role="alert">
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
              Preparing guidance…
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
            className="mt-8 rounded-2xl border border-navy-800 bg-gradient-to-br from-navy-900 to-navy-800 text-white p-6 shadow-lg ring-1 ring-white/10"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-400/90">Guidance for your plan</p>
            <p className="text-sm text-gray-300 mt-2">{result.advice.summary}</p>

            <div className="mt-6 space-y-5">
              {result.advice.sections.map((sec) => (
                <div key={sec.title} className="border-t border-white/10 pt-4 first:border-0 first:pt-0">
                  <h3 className="font-semibold text-white text-sm">{sec.title}</h3>
                  <ul className="mt-2 space-y-2 text-sm text-gray-300 leading-relaxed">
                    {sec.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-gold-500 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-4">{result.advice.disclaimer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
