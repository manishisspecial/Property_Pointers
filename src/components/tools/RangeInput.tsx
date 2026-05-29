"use client";

export function RangeInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  displayValue,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  displayValue: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-navy-700">{label}</label>
        <span className="text-sm font-bold text-navy-900 tabular-nums">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 accent-gold-500 cursor-pointer"
        aria-label={label}
      />
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-navy-700">{label}</label>
      <div className="mt-1.5 flex items-center rounded-xl border border-gray-200 bg-white focus-within:border-gold-400 transition-colors overflow-hidden">
        {prefix && <span className="pl-3 text-gray-400 text-sm">{prefix}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2.5 text-sm text-navy-900 outline-none bg-transparent tabular-nums"
        />
        {suffix && <span className="pr-3 text-gray-400 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}
