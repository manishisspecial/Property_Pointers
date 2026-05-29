export interface ResultRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export function ToolResultCard({
  headline,
  headlineLabel,
  headlineSub,
  rows,
  split,
  note,
  children,
}: {
  headline: string;
  headlineLabel: string;
  headlineSub?: string;
  rows?: ResultRow[];
  split?: { leftLabel: string; rightLabel: string; leftPct: number };
  note?: { text: string; tone: "good" | "warn" | "info" };
  children?: React.ReactNode;
}) {
  const toneClass =
    note?.tone === "warn"
      ? "bg-amber-500/15 text-amber-200 border-amber-400/30"
      : note?.tone === "good"
      ? "bg-emerald-500/15 text-emerald-200 border-emerald-400/30"
      : "bg-white/5 text-gray-200 border-white/10";

  return (
    <div className="gradient-navy rounded-2xl p-6 sm:p-7 text-white shadow-lg">
      <p className="text-[11px] font-bold tracking-[0.15em] text-gold-400 uppercase">{headlineLabel}</p>
      <p className="text-4xl sm:text-5xl font-extrabold mt-2 tabular-nums">{headline}</p>
      {headlineSub && <p className="text-sm text-gray-300 mt-1">{headlineSub}</p>}

      {split && (
        <div className="mt-5">
          <div className="h-2.5 rounded-full overflow-hidden bg-white/10 flex">
            <div className="bg-gold-500 h-full" style={{ width: `${split.leftPct}%` }} />
            <div className="bg-emerald-400 h-full" style={{ width: `${100 - split.leftPct}%` }} />
          </div>
          <div className="flex justify-between text-[11px] text-gray-400 mt-1.5">
            <span>{split.leftLabel}</span>
            <span>{split.rightLabel}</span>
          </div>
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="mt-5 divide-y divide-white/10">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-2.5">
              <span className="text-sm text-gray-300">{r.label}</span>
              <span className={`text-sm font-semibold tabular-nums ${r.highlight ? "text-gold-400" : "text-white"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {note && <div className={`mt-4 text-[13px] rounded-xl border px-3.5 py-2.5 ${toneClass}`}>{note.text}</div>}

      {children}
    </div>
  );
}
