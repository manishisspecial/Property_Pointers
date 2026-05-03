export type CsvColumn<T> = {
  header: string;
  accessor: (row: T) => unknown;
};

function escapeCsv(value: unknown): string {
  if (value === null || value === undefined) return "";

  let str: string;
  if (value instanceof Date) {
    str = value.toISOString();
  } else if (typeof value === "boolean") {
    str = value ? "Yes" : "No";
  } else if (typeof value === "number") {
    str = Number.isFinite(value) ? String(value) : "";
  } else if (typeof value === "object") {
    try {
      str = JSON.stringify(value);
    } catch {
      str = String(value);
    }
  } else {
    str = String(value);
  }

  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCSV<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((c) => escapeCsv(c.header)).join(",");
  if (rows.length === 0) return header;
  const body = rows
    .map((row) => columns.map((c) => escapeCsv(c.accessor(row))).join(","))
    .join("\r\n");
  return `${header}\r\n${body}`;
}

export function timestampedFilename(base: string): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
  const cleaned = base.replace(/\.csv$/i, "").replace(/[^a-z0-9_-]+/gi, "-");
  return `${cleaned}-${stamp}.csv`;
}

export function downloadCSV(filename: string, csv: string) {
  if (typeof window === "undefined") return;
  const safeName = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  // BOM (\uFEFF) ensures Excel correctly detects UTF-8 encoding for non-ASCII chars (₹, names).
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safeName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportToCSV<T>(
  baseName: string,
  rows: T[],
  columns: CsvColumn<T>[]
) {
  downloadCSV(timestampedFilename(baseName), toCSV(rows, columns));
}
