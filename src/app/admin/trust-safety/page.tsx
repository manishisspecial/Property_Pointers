"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertOctagon, ClipboardCheck, XCircle, Loader2, Save } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type Report = {
  id: string;
  subjectType: string;
  subjectName: string;
  city: string | null;
  locality: string | null;
  incidentDate: string | null;
  amount: number | null;
  currency: string;
  description: string;
  evidenceUrls: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string | null;
  anonymous: boolean;
  status: string;
  adminNotes: string | null;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  investigating: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

export default function AdminTrustSafetyPage() {
  const [items, setItems] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");
  const [notesEditing, setNotesEditing] = useState<Record<string, string>>({});

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/trust-safety/scam-report");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function updateStatus(id: string, next: string) {
    await fetch("/api/trust-safety/scam-report", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    fetchItems();
  }

  async function saveNotes(id: string) {
    const adminNotes = notesEditing[id] || "";
    await fetch("/api/trust-safety/scam-report", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminNotes }),
    });
    setNotesEditing((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    fetchItems();
  }

  const filtered = status === "all" ? items : items.filter((r) => r.status === status);
  const counts = {
    all: items.length,
    pending: items.filter((r) => r.status === "pending").length,
    investigating: items.filter((r) => r.status === "investigating").length,
    resolved: items.filter((r) => r.status === "resolved").length,
    dismissed: items.filter((r) => r.status === "dismissed").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
          <AlertOctagon size={22} className="text-red-600" /> Trust &amp; Safety
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Triage scam / fraud reports from the public reporter form. Aim to respond within 48 hours.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "pending", "investigating", "resolved", "dismissed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === s ? "bg-navy-800 text-white" : "bg-white text-navy-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {s[0].toUpperCase() + s.slice(1)} <span className="ml-1 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl text-gray-500">No reports match this filter.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            let evidence: string[] = [];
            try { evidence = JSON.parse(r.evidenceUrls); } catch {}
            const notesDraft = notesEditing[r.id] ?? r.adminNotes ?? "";
            const isDraftDirty = notesDraft !== (r.adminNotes || "");

            return (
              <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${STATUS_COLORS[r.status] || "bg-gray-100 text-gray-600"}`}>
                        {r.status}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-red-50 text-red-700">
                        {r.subjectType}
                      </span>
                      {r.city && <span className="text-[11px] text-gray-500">📍 {r.city}{r.locality ? ` · ${r.locality}` : ""}</span>}
                      {r.amount && (
                        <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                          {r.currency} {r.amount.toLocaleString("en-IN")}
                        </span>
                      )}
                      {r.anonymous && <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">ANON</span>}
                    </div>
                    <h3 className="text-base font-bold text-navy-900">{r.subjectName}</h3>
                    <p className="text-[11px] text-gray-400">
                      reported by {r.anonymous ? "Anonymous" : r.reporterName}
                      {!r.anonymous && ` · ${r.reporterEmail}`}
                      {r.reporterPhone && !r.anonymous && ` · ${r.reporterPhone}`}
                      {" · "}{timeAgo(r.createdAt)}
                      {r.incidentDate && ` · incident ${new Date(r.incidentDate).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => updateStatus(r.id, "investigating")} className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100" title="Mark investigating">
                      <Loader2 size={14} />
                    </button>
                    <button onClick={() => updateStatus(r.id, "resolved")} className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100" title="Mark resolved">
                      <ClipboardCheck size={14} />
                    </button>
                    <button onClick={() => updateStatus(r.id, "dismissed")} className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100" title="Dismiss">
                      <XCircle size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">{r.description}</p>

                {evidence.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[10px] font-bold text-navy-500 uppercase tracking-wider mb-1">Evidence ({evidence.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {evidence.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener" className="text-xs text-blue-600 hover:underline">
                          File {i + 1} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <label className="text-[10px] font-bold text-navy-500 uppercase tracking-wider">Admin notes</label>
                  <div className="flex gap-2 mt-1">
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesEditing((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      className="flex-1 text-sm text-gray-800 p-2 rounded-lg border border-gray-200 focus:border-navy-400 outline-none"
                      rows={2}
                      placeholder="Internal notes, follow-ups, verdicts…"
                    />
                    <button
                      onClick={() => saveNotes(r.id)}
                      disabled={!isDraftDirty}
                      className="px-3 self-start py-2 rounded-lg bg-navy-800 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Save size={12} /> Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
