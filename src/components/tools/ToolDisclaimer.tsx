import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export function ToolDisclaimer({ extra }: { extra?: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
      <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
      <p className="text-[13px] text-amber-900 leading-relaxed">
        <strong>Important disclaimer:</strong> Results are <strong>indicative only</strong> and provided for
        informational purposes. They do not constitute financial, legal or investment advice.
        {extra ? ` ${extra}` : ""} Actual figures may vary based on lender policies, government rates and individual
        circumstances. Always consult a qualified advisor before any financial commitment. Data accurate as of May 2026.{" "}
        <Link href="/disclaimer" className="font-semibold underline">Read full disclaimer</Link>.
      </p>
    </div>
  );
}
