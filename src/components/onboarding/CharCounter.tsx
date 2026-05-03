"use client";

export default function CharCounter({ current, max }: { current: number; max: number }) {
  const over = current > max;
  const warn = !over && current > Math.floor(max * 0.9);
  return (
    <p
      className={`text-xs mt-1 tabular-nums ${
        over ? "text-red-600 font-medium" : warn ? "text-amber-600" : "text-gray-400"
      }`}
      aria-live="polite"
    >
      {current} / {max} characters
    </p>
  );
}
