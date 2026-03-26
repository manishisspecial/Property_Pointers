"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle, Star } from "lucide-react";

type ReviewItem = {
  author: string;
  rating: number;
  text: string;
  tag: string;
};

type ThreadItem = {
  title: string;
  replies: number;
  lastActive: string;
};

type Props = {
  projectSlug: string;
  initialProjectReviews: ReviewItem[];
  initialLocalityReviews: ReviewItem[];
  initialThreads: ThreadItem[];
};

export default function ProjectReviewsForum({
  projectSlug,
  initialProjectReviews,
  initialLocalityReviews,
  initialThreads,
}: Props) {
  const [activeTab, setActiveTab] = useState<"project" | "locality" | "forum">("project");
  const [projectReviews, setProjectReviews] = useState<ReviewItem[]>(initialProjectReviews);
  const [localityReviews, setLocalityReviews] = useState<ReviewItem[]>(initialLocalityReviews);
  const [threads, setThreads] = useState<ThreadItem[]>(initialThreads);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const items = activeTab === "project" ? projectReviews : activeTab === "locality" ? localityReviews : [];

  useEffect(() => {
    async function fetchCommunity() {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${projectSlug}/community`);
        if (!res.ok) return;
        const data = await res.json();
        setProjectReviews(data.projectReviews || []);
        setLocalityReviews(data.localityReviews || []);
        setThreads(data.threads || []);
      } finally {
        setLoading(false);
      }
    }
    fetchCommunity();
  }, [projectSlug]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("");
    const form = new FormData(e.currentTarget);
    const author = String(form.get("author") || "Anonymous");
    const text = String(form.get("text") || "");
    const title = String(form.get("title") || "");
    if (activeTab !== "forum" && !text) {
      setStatus("Please add your review text.");
      return;
    }
    if (activeTab === "forum" && !title) {
      setStatus("Please add a forum topic title.");
      return;
    }
    const body =
      activeTab === "forum"
        ? { type: "forum", title }
        : { type: activeTab, author, text, rating: Number(form.get("rating") || 4) };
    const res = await fetch(`/api/projects/${projectSlug}/community`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      setStatus("Please login first to submit.");
      return;
    }
    if (!res.ok) {
      setStatus("Could not submit right now.");
      return;
    }
    e.currentTarget.reset();
    setStatus("Submitted for moderation.");
    const latest = await fetch(`/api/projects/${projectSlug}/community`);
    if (latest.ok) {
      const data = await latest.json();
      setProjectReviews(data.projectReviews || []);
      setLocalityReviews(data.localityReviews || []);
      setThreads(data.threads || []);
    }
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-navy-900">Reviews & Forum</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setActiveTab("project")} className={`px-3 py-1.5 rounded-full text-sm ${activeTab === "project" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700"}`}>
          Project Reviews
        </button>
        <button onClick={() => setActiveTab("locality")} className={`px-3 py-1.5 rounded-full text-sm ${activeTab === "locality" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700"}`}>
          Locality Reviews
        </button>
        <button onClick={() => setActiveTab("forum")} className={`px-3 py-1.5 rounded-full text-sm ${activeTab === "forum" ? "bg-navy-800 text-white" : "bg-gray-100 text-gray-700"}`}>
          Buyer Forum
        </button>
      </div>

      {activeTab === "forum" ? (
        <div className="mt-5 space-y-3">
          {threads.length === 0 && <p className="text-sm text-gray-500">No forum threads yet.</p>}
          {threads.map((thread) => (
            <div key={thread.title} className="rounded-xl border border-gray-200 p-4">
              <p className="font-semibold text-navy-900">{thread.title}</p>
              <p className="text-sm text-gray-500 mt-1">{thread.replies} replies • Last active {thread.lastActive}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {items.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
          {items.map((review) => (
            <div key={`${review.author}-${review.text.slice(0, 12)}`} className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-navy-900">{review.author}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-gold-50 text-gold-700">{review.tag}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-amber-600">
                <Star size={14} className="fill-amber-400" /> {review.rating.toFixed(1)}
              </p>
              <p className="mt-2 text-sm text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-gray-200 p-4 bg-gray-50 grid gap-2 sm:grid-cols-2">
        {activeTab === "forum" ? (
          <>
            <input name="title" placeholder="Start a discussion topic" className="input-field sm:col-span-2" />
            <button className="btn-primary sm:col-span-2 justify-center">Post Topic</button>
          </>
        ) : (
          <>
            <input name="author" placeholder="Your Name" className="input-field" />
            <select name="rating" className="input-field">
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            <textarea name="text" placeholder="Write your review" className="input-field sm:col-span-2 min-h-[90px]" />
            <button className="btn-primary sm:col-span-2 justify-center">Submit Review</button>
          </>
        )}
      </form>
      {(status || loading) && (
        <p className="mt-2 text-xs text-gray-500">{loading ? "Refreshing community updates..." : status}</p>
      )}

      <p className="mt-4 text-xs text-gray-500 flex items-center gap-1">
        <MessageCircle size={12} /> Community moderation is active to keep discussions useful.
      </p>
    </section>
  );
}
