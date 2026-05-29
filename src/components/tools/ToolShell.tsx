import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ToolHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: boolean;
}) {
  return (
    <div className="relative overflow-hidden gradient-navy">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-28 sm:pb-14">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-[12px] text-gray-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-gray-500" />
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <ChevronRight size={12} className="text-gray-500" />
            <span className="text-gold-400">{title}</span>
          </nav>
        )}
        {eyebrow && (
          <p className="text-[11px] font-bold tracking-[0.15em] text-gold-400 uppercase">{eyebrow}</p>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">{title}</h1>
        {subtitle && <p className="text-gray-300 mt-3 max-w-2xl text-sm sm:text-base">{subtitle}</p>}
      </div>
    </div>
  );
}

export function ToolContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7">{children}</div>
    </div>
  );
}

export function ToolCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 ${className}`}>
      {children}
    </section>
  );
}
