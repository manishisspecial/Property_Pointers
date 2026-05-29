export interface TableColumn {
  key: string;
  header: string;
  align?: "left" | "right";
}

export function ComparisonTable({
  title,
  caption,
  columns,
  rows,
  highlightRowKey,
}: {
  title?: string;
  caption?: string;
  columns: TableColumn[];
  rows: Record<string, string>[];
  highlightRowKey?: string;
}) {
  return (
    <div>
      {title && <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>}
      {caption && <p className="text-sm text-gray-500 mb-3">{caption}</p>}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-navy-700">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-4 py-3 font-semibold whitespace-nowrap ${c.align === "right" ? "text-right" : "text-left"}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, i) => (
              <tr
                key={i}
                className={highlightRowKey && row.__key === highlightRowKey ? "bg-gold-50 font-semibold" : "hover:bg-gray-50"}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`px-4 py-3 text-navy-800 whitespace-nowrap tabular-nums ${c.align === "right" ? "text-right" : "text-left"}`}
                  >
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
