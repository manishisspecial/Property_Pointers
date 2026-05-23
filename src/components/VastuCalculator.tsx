"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Loader2,
  Sparkles,
  Home,
  Lightbulb,
} from "lucide-react";
import clsx from "clsx";
import {
  DIRECTIONS,
  ROOM_LABELS,
  PROPERTY_TYPES,
  calcVastu,
  type VastuResult,
  type VastuStatus,
} from "@/lib/vastu-rules";
import { generateVastuPDF } from "@/lib/vastu-pdf";

const STEPS = ["Details", "Floor Plan", "Room Directions", "Report"];

const STATUS_META: Record<
  VastuStatus,
  { bg: string; border: string; badge: string; label: string }
> = {
  ideal: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-500", label: "Ideal" },
  good: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-500", label: "Good" },
  bad: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-500", label: "Needs Attention" },
  neutral: { bg: "bg-gray-50", border: "border-gray-200", badge: "bg-gray-400", label: "Neutral" },
};

const GRADE_BADGE: Record<string, string> = {
  Excellent: "bg-green-500",
  Good: "bg-amber-500",
  Average: "bg-orange-500",
  "Needs Attention": "bg-red-500",
};

export default function VastuCalculator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    city: "",
    location: "",
    propertyType: "",
    facing: "",
  });
  const [rooms, setRooms] = useState<Record<string, string>>(
    Object.fromEntries(Object.keys(ROOM_LABELS).map((k) => [k, ""]))
  );
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [floorPlanDataUrl, setFloorPlanDataUrl] = useState<string | null>(null);
  const [result, setResult] = useState<VastuResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = (f: string) => (v: string) =>
    setForm((p) => ({ ...p, [f]: v }));
  const setRoom = (r: string) => (v: string) =>
    setRooms((p) => ({ ...p, [r]: v }));

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFloorPlan(file);
    const reader = new FileReader();
    reader.onload = (ev) => setFloorPlanDataUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const step1Valid =
    form.name && form.city && form.propertyType && form.facing;
  const step3Valid = Object.values(rooms).some(Boolean);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setResult(calcVastu(rooms, form.facing));
      setGenerating(false);
      setStep(3);
    }, 1200);
  };

  const handleDownload = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const roomRows = Object.entries(rooms)
        .filter(([, v]) => v)
        .map(([key, dir]) => {
          const analysis = result.roomAnalysis[key];
          const statusLabelMap: Record<VastuStatus, string> = {
            ideal: "Ideal",
            good: "Good",
            bad: "Needs Attention",
            neutral: "Neutral",
          };
          return {
            room: ROOM_LABELS[key],
            direction: dir,
            status: analysis?.status ?? "neutral",
            statusLabel: statusLabelMap[analysis?.status ?? "neutral"],
            comment: analysis?.msg ?? "",
            score: analysis?.score,
            max: analysis?.max,
          };
        });

      await generateVastuPDF({
        property: {
          name: form.name,
          city: form.city,
          location: form.location,
          propertyType: form.propertyType,
          facing: form.facing,
          contact: form.contact,
        },
        score: result.score,
        grade: result.grade,
        positives: result.positives,
        issues: result.issues,
        recommendations: result.recommendations,
        rooms: roomRows,
        floorPlanDataUrl,
      });
    } catch {
      alert("PDF generation failed. Please try again.");
    }
    setDownloading(false);
  };

  const handleReset = () => {
    setStep(0);
    setResult(null);
    setFloorPlan(null);
    setFloorPlanDataUrl(null);
    setForm({ name: "", contact: "", city: "", location: "", propertyType: "", facing: "" });
    setRooms(Object.fromEntries(Object.keys(ROOM_LABELS).map((k) => [k, ""])));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy opacity-[0.98]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <p className="text-xs font-bold tracking-wider text-gray-300 uppercase">
            Tools · Vastu Calculator
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Vastu Score Calculator
          </h1>
          <p className="text-gray-300 mt-2 max-w-xl text-sm sm:text-base">
            Enter your property details and room directions to get an indicative
            Vastu score with a downloadable branded report.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-300">
            {["Room-wise Analysis", "Vastu Score & Grade", "Branded PDF Report", "Instant Results"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-gold-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={clsx(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    i < step && "bg-gold-500 text-navy-900",
                    i === step && "bg-navy-900 text-gold-400 ring-2 ring-gold-500",
                    i > step && "bg-gray-200 text-gray-400"
                  )}
                >
                  {i < step ? <CheckCircle2 size={18} /> : i + 1}
                </div>
                <span
                  className={clsx(
                    "text-[11px] font-medium whitespace-nowrap",
                    i === step ? "text-navy-900" : "text-gray-400"
                  )}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={clsx(
                    "w-12 sm:w-16 h-0.5 mb-5 mx-1 transition-colors",
                    i < step ? "bg-gold-500" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: Property Details */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-navy-900">
                Property & Owner Details
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Enter your property and owner details to personalise your Vastu
                report.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldInput
                  label="Your Name"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="e.g. Rajesh Sharma"
                  required
                />
                <FieldInput
                  label="Mobile / Email (optional)"
                  value={form.contact}
                  onChange={setField("contact")}
                  placeholder="For report reference"
                />
                <FieldInput
                  label="City"
                  value={form.city}
                  onChange={setField("city")}
                  placeholder="e.g. Mumbai"
                  required
                />
                <FieldInput
                  label="Locality / Area"
                  value={form.location}
                  onChange={setField("location")}
                  placeholder="e.g. Andheri West"
                />
                <FieldSelect
                  label="Property Type"
                  value={form.propertyType}
                  onChange={setField("propertyType")}
                  options={[...PROPERTY_TYPES]}
                  required
                />
                <FieldSelect
                  label="Facing Direction"
                  value={form.facing}
                  onChange={setField("facing")}
                  options={[...DIRECTIONS]}
                  required
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={!step1Valid}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Floor Plan Upload */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-navy-900">
                Upload Floor Plan
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Upload your floor plan image. This will be included in your PDF
                report.
              </p>

              <div
                onClick={() => fileRef.current?.click()}
                className={clsx(
                  "border-2 border-dashed rounded-xl p-10 sm:p-12 text-center cursor-pointer transition-colors",
                  floorPlan
                    ? "border-gold-400 bg-gold-50/40"
                    : "border-gray-200 bg-gray-50 hover:border-gold-400 hover:bg-gold-50/30"
                )}
              >
                {floorPlanDataUrl ? (
                  <div>
                    <img
                      src={floorPlanDataUrl}
                      alt="Floor plan preview"
                      className="max-h-48 mx-auto rounded-lg border-2 border-gold-400 mb-3"
                    />
                    <p className="text-green-600 font-semibold text-sm">
                      <CheckCircle2 size={14} className="inline mr-1" />
                      {floorPlan?.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <div>
                    <Upload
                      size={36}
                      className="mx-auto text-gold-500 mb-3"
                    />
                    <p className="text-navy-900 font-semibold">
                      Click to upload floor plan
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      JPG, PNG accepted · Optional but recommended
                    </p>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </div>

              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
                <p className="text-xs text-blue-700">
                  <strong>Tip:</strong> Upload a clear photo or scan of your
                  architect&apos;s floor plan. Room directions are entered
                  manually in the next step.
                </p>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(0)} className="btn-outline inline-flex items-center gap-2">
                  <ChevronLeft size={16} /> Back
                </button>
                <button onClick={() => setStep(2)} className="btn-primary inline-flex items-center gap-2">
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Room Directions */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-navy-900">
                Room Placement & Directions
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Select the direction each room or element is located within your
                property. Use a compass for best accuracy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(ROOM_LABELS).map(([key, label]) => (
                  <div
                    key={key}
                    className={clsx(
                      "rounded-xl p-4 border transition-all",
                      rooms[key]
                        ? "border-gold-400 bg-gold-50/30"
                        : "border-gray-100 bg-gray-50"
                    )}
                  >
                    <label className="block text-xs font-bold text-navy-900 uppercase tracking-wide mb-2">
                      {label}
                    </label>
                    <select
                      value={rooms[key]}
                      onChange={(e) => setRoom(key)(e.target.value)}
                      className="input-field text-sm w-full"
                    >
                      <option value="">Select direction</option>
                      {DIRECTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                <p className="text-xs text-amber-800">
                  Select at least a few rooms for a meaningful analysis. You can
                  skip rooms that are not applicable.
                </p>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="btn-outline inline-flex items-center gap-2">
                  <ChevronLeft size={16} /> Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!step3Valid || generating}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Calculating…
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Generate Vastu Report
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Report */}
          {step === 3 && result && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              {/* Score Hero */}
              <div className="rounded-2xl gradient-navy text-white p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl" />
                <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  {/* Score Circle */}
                  <div className="shrink-0">
                    <div
                      className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
                      style={{
                        background: `conic-gradient(${result.gradeColor} ${result.score * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                      }}
                    >
                      <div className="w-[88px] h-[88px] rounded-full bg-navy-900 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white leading-none">
                          {result.score}
                        </span>
                        <span className="text-[11px] text-gray-400">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                      <span
                        className={clsx(
                          "text-white text-xs font-bold rounded-full px-3 py-1",
                          GRADE_BADGE[result.grade]
                        )}
                      >
                        {result.grade}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold">
                      Overall Vastu Score
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {form.name} · {form.city}
                      {form.location ? `, ${form.location}` : ""} ·{" "}
                      {form.facing}-facing {form.propertyType}
                    </p>
                    <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Positives + Issues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 border-t-[3px] border-t-green-500">
                  <h3 className="text-green-600 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Positive Vastu Points
                  </h3>
                  {result.positives.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No strong positives detected with current selections.
                    </p>
                  ) : (
                    result.positives.map((p, i) => (
                      <div key={i} className="flex gap-2 mb-3 text-sm">
                        <Sparkles
                          size={14}
                          className="text-gold-500 mt-0.5 shrink-0"
                        />
                        <span className="text-gray-700 leading-relaxed">
                          {p}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 border-t-[3px] border-t-red-500">
                  <h3 className="text-red-600 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} /> Issues Found
                  </h3>
                  {result.issues.length === 0 ? (
                    <p className="text-green-600 text-sm font-semibold">
                      <CheckCircle2 size={14} className="inline mr-1" />
                      No major Vastu issues detected.
                    </p>
                  ) : (
                    result.issues.map((iss, i) => (
                      <div key={i} className="flex gap-2 mb-3 text-sm">
                        <AlertTriangle
                          size={14}
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

              {/* Room-wise Analysis */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-bold text-navy-900 mb-1 flex items-center gap-2">
                  <Home size={18} className="text-gold-500" />
                  Room-wise Vastu Analysis
                </h3>
                <p className="text-xs text-gray-400 mb-5">
                  Directions entered manually. Verify with a compass on-site.
                </p>
                <div className="space-y-3">
                  {Object.entries(rooms)
                    .filter(([, v]) => v)
                    .map(([key, dir]) => {
                      const analysis = result.roomAnalysis[key];
                      if (!analysis) return null;
                      const meta = STATUS_META[analysis.status];
                      return (
                        <div
                          key={key}
                          className={clsx(
                            "flex items-center gap-4 p-4 rounded-xl border",
                            meta.bg,
                            meta.border
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-bold text-navy-900 text-sm">
                                {ROOM_LABELS[key]}
                              </span>
                              <span
                                className={clsx(
                                  "text-white text-[11px] font-bold rounded-full px-2.5 py-0.5",
                                  meta.badge
                                )}
                              >
                                {meta.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {analysis.msg}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-extrabold text-navy-900">
                              {dir}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {analysis.score}/{analysis.max} pts
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Lightbulb size={18} className="text-gold-500" />
                  Practical Recommendations
                </h3>
                <div className="space-y-3">
                  {result.recommendations.map((r, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <Compass
                        size={14}
                        className="text-gold-500 mt-0.5 shrink-0"
                      />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-gold-500 to-gold-400 rounded-2xl p-6 text-center">
                <p className="text-navy-900 font-extrabold text-lg">
                  Explore India&apos;s Real Estate Ecosystem
                </p>
                <p className="text-navy-900/70 text-sm mt-1">
                  Compare developers · Connect with realty advisors · Discover
                  vendors
                </p>
                <span className="inline-block mt-3 bg-navy-900 text-gold-400 font-bold rounded-lg px-5 py-2 text-sm">
                  PropertyPointers.com
                </span>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong className="text-gray-600">Disclaimer:</strong> This
                  Vastu analysis is purely indicative and based on traditional
                  Vastu Shastra principles. It does not constitute professional
                  architectural, structural, legal, or engineering advice. Scores
                  and recommendations should not replace on-site inspections,
                  professional consultations, or due diligence. PropertyPointers
                  makes no claims of accuracy or completeness.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={handleReset} className="btn-outline inline-flex items-center gap-2">
                  <RotateCcw size={16} /> New Analysis
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Generating PDF…
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Download PDF Report
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Field Components ───────────────────────────────────────────────── */

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-gold-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field w-full text-sm"
      />
    </div>
  );
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-800 uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-gold-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field w-full text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
