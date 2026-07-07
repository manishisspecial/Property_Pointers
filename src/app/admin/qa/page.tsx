"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Trash2, Star, MessageSquareReply } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type Answer = {
  id: string;
  body: string;
  authorName: string;
  authorRole: string;
  upvotes: number;
  status: string;
  createdAt: string;
};

type Question = {
  id: string;
  title: string;
  body: string;
  category: string;
  city: string | null;
  locality: string | null;
  authorName: string;
  authorEmail: string | null;
  status: string;
  featured: boolean;
  views: number;
  createdAt: string;
  answers: Answer[];
};

export default function AdminQAPage() {
  const [items, setItems] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/community/questions?scope=admin&limit=200");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  async function moderate(id: string, next: "approved" | "rejected" | "pending") {
    await fetch("/api/community/questions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    fetchItems();
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await fetch("/api/community/questions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, featured: !featured }),
    });
    fetchItems();
  }

  async function remove(id: string) {
    if (!confirm("Delete this question and all its answers? This cannot be undone.")) return;
    await fetch("/api/community/questions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchItems();
  }

  const filtered = status === "all" ? items : items.filter((q) => q.status === status);

  const counts = {
    all: items.length,
    pending: items.filter((q) => q.status === "pending").length,
    approved: items.filter((q) => q.status === "approved").length,
    rejected: items.filter((q) => q.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Community Q&amp;A Moderation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Approve, reject or feature questions submitted through the public Q&amp;A community page.
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
            {s[0].toUpperCase() + s.slice(1)}{" "}
            <span className="ml-1 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl text-gray-500">No questions match this filter.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                        q.status === "approved" ? "bg-green-100 text-green-700"
                        : q.status === "pending" ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}>{q.status}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium uppercase tracking-wider">
                        {q.category}
                      </span>
                      {q.city && <span className="text-[11px] text-gray-500">📍 {q.city}{q.locality ? ` · ${q.locality}` : ""}</span>}
                      {q.featured && <span className="text-[11px] px-2 py-0.5 rounded bg-gold-100 text-gold-700 font-semibold">FEATURED</span>}
                    </div>
                    <h3 className="text-base font-semibold text-navy-900 leading-snug">{q.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{q.body}</p>
                    <p className="text-[11px] text-gray-400 mt-2">
                      by {q.authorName}{q.authorEmail ? ` · ${q.authorEmail}` : ""} · {timeAgo(q.createdAt)} · {q.answers.length} answer{q.answers.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moderate(q.id, "approved")}
                      className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100"
                      title="Approve"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <button
                      onClick={() => moderate(q.id, "rejected")}
                      className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                      title="Reject"
                    >
                      <XCircle size={16} />
                    </button>
                    <button
                      onClick={() => toggleFeatured(q.id, q.featured)}
                      className={`p-2 rounded-lg ${q.featured ? "bg-gold-100 text-gold-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                      title={q.featured ? "Unfeature" : "Feature"}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => remove(q.id)}
                      className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                  className="text-xs text-navy-700 font-medium hover:text-navy-900 flex items-center gap-1"
                >
                  <MessageSquareReply size={13} />
                  {expanded === q.id ? "Hide" : "Show"} answers ({q.answers.length})
                </button>
              </div>
              {expanded === q.id && q.answers.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-2">
                  {q.answers.map((a) => (
                    <div key={a.id} className="p-3 bg-white rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-navy-800">{a.authorName}</span>
                        {a.authorRole !== "user" && (
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gold-700 bg-gold-50 px-1.5 py-0.5 rounded">
                            {a.authorRole}
                          </span>
                        )}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          a.status === "approved" ? "bg-green-100 text-green-700"
                          : a.status === "pending" ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}>{a.status}</span>
                        <span className="text-[10px] text-gray-400">{timeAgo(a.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{a.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
