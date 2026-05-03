"use client";

import { Download } from "lucide-react";
import { exportToCSV, type CsvColumn } from "@/lib/csv";

export interface ExportButtonProps<T> {
  data: T[];
  columns: CsvColumn<T>[];
  filename: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  showCount?: boolean;
}

export default function ExportButton<T>({
  data,
  columns,
  filename,
  label = "Export CSV",
  disabled,
  className = "",
  showCount = true,
}: ExportButtonProps<T>) {
  const isDisabled = disabled || data.length === 0;

  return (
    <button
      type="button"
      onClick={() => exportToCSV(filename, data, columns)}
      disabled={isDisabled}
      title={
        isDisabled
          ? "No data to export"
          : `Export ${data.length} row${data.length === 1 ? "" : "s"} as CSV`
      }
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-gray-200 bg-white text-navy-700 hover:bg-gold-50 hover:border-gold-300 hover:text-gold-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm ${className}`}
    >
      <Download size={15} />
      <span>{label}</span>
      {showCount && data.length > 0 && (
        <span className="ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-md text-[11px] font-semibold bg-gray-100 text-gray-600">
          {data.length}
        </span>
      )}
    </button>
  );
}
