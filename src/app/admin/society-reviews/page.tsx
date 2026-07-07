"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Trash2, Star } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type Review = {
  id: string;
  societyName: string;
  city: string;
  locality: string;
  builderName: string | null;
  authorName: string;
  authorEmail: string | null;
  ratingOverall: number;
  ratingConstr: number | null;
  ratingAmen: number | null;
  ratingMaint: number | null;
  ratingSafety: number | null;
  pros: string | null;
  cons: string | null;
  comment: string;
  yearsResiding: number | null;
  status: string;
  createdAt: string;
};

export default function AdminSocietyReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/community/society-reviews?scope=admin&limit=200");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function moderate(id: string, next: "approved" | "rejected" | "pending") {
    await fetch("/api/community/society-reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    fetchItems();
  }

  async function remove(id: string) {
    if (!confirm("Delete this review permanently?")) return;
    await fetch("/api/community/society-reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  }

  const filtered = status === "all" ? items : items.filter((r) => r.status === status);

  const counts = {
    all: items.length,
    pending: items.filter((r) => r.status === "pending").length,
    approved: items.filter((r) => r.status === "approved").length,
    rejected: items.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Society Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">
          Moderate resident-submitted reviews of specific societies before they appear publicly.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((s) => (
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
        <div className="p-12 text-center bg-white rounded-xl text-gray-500">No reviews match this filter.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      r.status === "approved" ? "bg-green-100 text-green-700"
                      : r.status === "pending" ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                    }`}>{r.status}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className={i < r.ratingOverall ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-navy-900 leading-snug">{r.societyName}</h3>
                  <p className="text-xs text-gray-500">{r.locality}, {r.city}{r.builderName ? ` · by ${r.builderName}` : ""}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => moderate(r.id, "approved")} className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100" title="Approve">
                    <CheckCircle2 size={14} />
                  </button>
                  <button onClick={() => moderate(r.id, "rejected")} className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100" title="Reject">
                    <XCircle size={14} />
                  </button>
                  <button onClick={() => remove(r.id)} className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed line-clamp-4 mb-3">{r.comment}</p>

              {(r.pros || r.cons) && (
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  {r.pros && (
                    <div className="p-2 bg-green-50 rounded">
                      <p className="text-green-700 font-semibold mb-0.5">Pros</p>
                      <p className="text-green-800 line-clamp-2">{r.pros}</p>
                    </div>
                  )}
                  {r.cons && (
                    <div className="p-2 bg-red-50 rounded">
                      <p className="text-red-700 font-semibold mb-0.5">Cons</p>
                      <p className="text-red-800 line-clamp-2">{r.cons}</p>
                    </div>
                  )}
                </div>
              )}

              {(r.ratingConstr || r.ratingAmen || r.ratingMaint || r.ratingSafety) && (
                <div className="grid grid-cols-4 gap-1 mb-3 text-[10px]">
                  {[
                    { label: "Constr", val: r.ratingConstr },
                    { label: "Amen", val: r.ratingAmen },
                    { label: "Maint", val: r.ratingMaint },
                    { label: "Safety", val: r.ratingSafety },
                  ].map((x) => (
                    <div key={x.label} className="text-center bg-gray-50 rounded py-1">
                      <p className="text-gray-500">{x.label}</p>
                      <p className="font-bold text-navy-800">{x.val || "—"}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-2">
                by {r.authorName}{r.yearsResiding ? ` · ${r.yearsResiding}y resident` : ""} · {timeAgo(r.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
