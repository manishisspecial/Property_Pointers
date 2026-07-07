"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Clock, MapPin } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type Request = {
  id: string;
  name: string;
  city: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

const KNOWN_LOCALITIES: { slug: string; name: string; city: string }[] = [
  { slug: "baner-pune", name: "Baner", city: "Pune" },
  { slug: "wakad-pune", name: "Wakad", city: "Pune" },
  { slug: "hinjewadi-pune", name: "Hinjewadi", city: "Pune" },
  { slug: "kharadi-pune", name: "Kharadi", city: "Pune" },
  { slug: "whitefield-bengaluru", name: "Whitefield", city: "Bengaluru" },
  { slug: "electronic-city-bengaluru", name: "Electronic City", city: "Bengaluru" },
  { slug: "sarjapur-road-bengaluru", name: "Sarjapur Road", city: "Bengaluru" },
  { slug: "gachibowli-hyderabad", name: "Gachibowli", city: "Hyderabad" },
  { slug: "kondapur-hyderabad", name: "Kondapur", city: "Hyderabad" },
  { slug: "manikonda-hyderabad", name: "Manikonda", city: "Hyderabad" },
  { slug: "sector-62-noida", name: "Sector 62", city: "Noida" },
  { slug: "sector-75-noida", name: "Sector 75", city: "Noida" },
  { slug: "sector-137-noida", name: "Sector 137", city: "Noida" },
  { slug: "sector-150-noida", name: "Sector 150", city: "Noida" },
  { slug: "greater-noida-west", name: "Greater Noida West", city: "Greater Noida" },
  { slug: "sohna-road-gurugram", name: "Sohna Road", city: "Gurugram" },
  { slug: "sector-67-gurugram", name: "Sector 67", city: "Gurugram" },
  { slug: "dwarka-expressway-gurugram", name: "Dwarka Expressway", city: "Gurugram" },
  { slug: "dwarka-delhi", name: "Dwarka", city: "Delhi" },
  { slug: "rohini-delhi", name: "Rohini", city: "Delhi" },
  { slug: "thane-west-mumbai", name: "Thane West", city: "Mumbai" },
  { slug: "navi-mumbai", name: "Navi Mumbai", city: "Mumbai" },
  { slug: "rajarhat-kolkata", name: "Rajarhat", city: "Kolkata" },
  { slug: "new-town-kolkata", name: "New Town", city: "Kolkata" },
  { slug: "zirakpur-chandigarh", name: "Zirakpur", city: "Chandigarh" },
];

export default function AdminLocalitiesPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"published" | "requests">("published");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/locality-request");
    const data = await res.json();
    setRequests(data.items || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  async function updateStatus(id: string, next: string) {
    await fetch("/api/locality-request", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    fetchRequests();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
          <MapPin size={22} /> Localities
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the {KNOWN_LOCALITIES.length} published locality guides and process user requests for new ones.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("published")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "published" ? "bg-navy-800 text-white" : "bg-white text-navy-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Published ({KNOWN_LOCALITIES.length})
        </button>
        <button
          onClick={() => setTab("requests")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "requests" ? "bg-navy-800 text-white" : "bg-white text-navy-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          User Requests ({requests.length})
        </button>
      </div>

      {tab === "published" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {KNOWN_LOCALITIES.map((l) => (
            <a
              key={l.slug}
              href={`/localities/${l.slug}`}
              target="_blank"
              rel="noopener"
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-navy-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-navy-900">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.city}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
                  LIVE
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400 font-mono">/localities/{l.slug}</p>
            </a>
          ))}
        </div>
      )}

      {tab === "requests" && (
        <>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading…</div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl text-gray-500">No locality requests yet.</div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Locality</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">City</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Requester</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Notes</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 align-top">
                      <td className="py-3 px-4 font-semibold text-navy-800">{r.name}</td>
                      <td className="py-3 px-4 text-gray-700">{r.city}</td>
                      <td className="py-3 px-4">
                        <p className="text-gray-800">{r.requesterName}</p>
                        <p className="text-xs text-gray-500">{r.requesterEmail}</p>
                        {r.requesterPhone && <p className="text-xs text-gray-500">{r.requesterPhone}</p>}
                        <p className="text-xs text-gray-400 mt-1">{timeAgo(r.createdAt)}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs">
                        <p className="line-clamp-2">{r.notes || "—"}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          r.status === "published" ? "bg-green-100 text-green-700"
                          : r.status === "in_progress" ? "bg-blue-100 text-blue-700"
                          : r.status === "rejected" ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateStatus(r.id, "in_progress")} className="p-1.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100" title="In progress">
                            <Clock size={13} />
                          </button>
                          <button onClick={() => updateStatus(r.id, "published")} className="p-1.5 rounded bg-green-50 text-green-700 hover:bg-green-100" title="Published">
                            <CheckCircle2 size={13} />
                          </button>
                          <button onClick={() => updateStatus(r.id, "rejected")} className="p-1.5 rounded bg-red-50 text-red-700 hover:bg-red-100" title="Reject">
                            <XCircle size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
