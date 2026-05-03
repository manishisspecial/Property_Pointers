import Link from "next/link";
import {
  ArrowLeft,
  Info,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Mail,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export interface LegalMetaItem {
  label: string;
  value: string;
}

export interface LegalDocumentProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  intro?: string;
  meta?: LegalMetaItem[];
  icon?: LucideIcon;
  children: ReactNode;
}

export function LegalDocument({
  eyebrow = "Property Pointers — India's #1 Trusted Real Estate Platform",
  title,
  subtitle,
  intro,
  meta = [],
  icon: Icon,
  children,
}: LegalDocumentProps) {
  return (
    <main className="min-h-screen bg-navy-950 text-gray-300">
      <section className="relative overflow-hidden border-b border-white/10 gradient-navy">
        <div className="pointer-events-none absolute -top-32 -right-24 w-[min(80vw,520px)] h-[min(80vw,520px)] rounded-full bg-gold-500/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 w-[min(90vw,560px)] h-[min(90vw,560px)] rounded-full bg-blue-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0H0z' fill='%23fff'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
            {Icon && <Icon size={14} className="text-gold-400" />}
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300/90">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-3xl">
              {subtitle}
            </p>
          )}

          {meta.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-300/80">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-white font-medium break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {intro && (
            <p className="mt-8 text-sm sm:text-base text-gray-300/90 max-w-3xl leading-relaxed border-l-2 border-gold-500/60 pl-4">
              {intro}
            </p>
          )}
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12 sm:space-y-14">{children}</div>
      </article>

      <section className="border-t border-white/10 bg-navy-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="text-xs text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <Globe size={12} />
              www.propertypointers.com
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail size={12} />
              legal@propertypointers.com
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export interface SectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export function Section({ number, title, children }: SectionProps) {
  return (
    <section className="scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-white/10">
        {number && (
          <span className="font-mono text-xs sm:text-sm font-semibold text-gold-400/90 tracking-wider">
            {number}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-5 text-sm sm:text-[15px] leading-relaxed text-gray-300/90">
        {children}
      </div>
    </section>
  );
}

export interface SubSectionProps {
  number?: string;
  title: string;
  children: ReactNode;
}

export function SubSection({ number, title, children }: SubSectionProps) {
  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
        {number ? <span className="text-gold-400 mr-2">{number}</span> : null}
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export interface BulletListProps {
  items: ReactNode[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="text-gold-400/80 select-none mt-0.5">▸</span>
          <span className="flex-1 text-gray-300/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

type CalloutVariant = "info" | "notice" | "warning" | "advisory" | "success";

const calloutStyles: Record<
  CalloutVariant,
  { border: string; bg: string; iconColor: string; icon: LucideIcon; titleColor: string }
> = {
  info: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-400",
    icon: Info,
    titleColor: "text-blue-200",
  },
  notice: {
    border: "border-gold-500/30",
    bg: "bg-gold-500/5",
    iconColor: "text-gold-400",
    icon: Info,
    titleColor: "text-gold-200",
  },
  warning: {
    border: "border-red-500/30",
    bg: "bg-red-500/5",
    iconColor: "text-red-400",
    icon: AlertTriangle,
    titleColor: "text-red-200",
  },
  advisory: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-400",
    icon: ShieldAlert,
    titleColor: "text-amber-200",
  },
  success: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    iconColor: "text-emerald-400",
    icon: CheckCircle2,
    titleColor: "text-emerald-200",
  },
};

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = "notice", title, children }: CalloutProps) {
  const style = calloutStyles[variant];
  const Icon = style.icon;
  return (
    <div
      className={`rounded-xl border ${style.border} ${style.bg} p-4 sm:p-5 backdrop-blur-sm`}
    >
      <div className="flex gap-3">
        <Icon size={18} className={`${style.iconColor} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className={`text-sm font-semibold ${style.titleColor} mb-1.5`}>
              {title}
            </p>
          )}
          <div className="text-sm text-gray-300/90 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface DataTableRow {
  label: string;
  value: ReactNode;
}

export interface DataTableProps {
  headers?: [string, string];
  rows: DataTableRow[];
}

export function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {headers && (
            <thead className="bg-white/[0.04] border-b border-white/10">
              <tr>
                <th className="text-left px-4 sm:px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300/90 w-[38%]">
                  {headers[0]}
                </th>
                <th className="text-left px-4 sm:px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300/90">
                  {headers[1]}
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 first:border-t-0 align-top"
              >
                <td className="px-4 sm:px-5 py-3 font-medium text-white/90 w-[38%]">
                  {row.label}
                </td>
                <td className="px-4 sm:px-5 py-3 text-gray-300/85">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
