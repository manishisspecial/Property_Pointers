"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { timeAgo, formatPrice } from "@/lib/utils";
import { MessageCircle, User, Building2, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchInquiries(); }, []);

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(data.inquiries || []);
    } catch {}
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Inquiries</h1>
        <p className="text-sm text-gray-500">{inquiries.length} total inquiries</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">From</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Message</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-navy-800">{inq.userName}</p>
                    <p className="text-xs text-gray-400">{inq.userEmail}</p>
                    {inq.userPhone && <p className="text-xs text-gray-400">{inq.userPhone}</p>}
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/properties/${inq.propertyId}`} className="font-medium text-navy-800 hover:text-gold-600 line-clamp-1">
                      {inq.property?.title || "Property"}
                    </Link>
                    {inq.property?.price && <p className="text-xs text-gray-400">{formatPrice(inq.property.price)}</p>}
                  </td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{inq.message}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      inq.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      inq.status === "responded" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{inq.status}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{timeAgo(inq.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {inquiries.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">No inquiries yet</div>
        )}
      </div>
    </div>
  );
}
