interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Pin shape / building hybrid */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e7b543" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
      </defs>
      {/* Outer pin shape */}
      <path
        d="M20 2C12.268 2 6 8.268 6 16c0 10 14 22 14 22s14-12 14-22c0-7.732-6.268-14-14-14z"
        fill="url(#logoGradient)"
        opacity="0.15"
      />
      <path
        d="M20 2C12.268 2 6 8.268 6 16c0 10 14 22 14 22s14-12 14-22c0-7.732-6.268-14-14-14z"
        stroke="url(#logoGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Building inside the pin */}
      <rect x="14" y="10" width="5" height="14" rx="0.5" fill="url(#logoGradient)" opacity="0.9" />
      <rect x="21" y="13" width="5" height="11" rx="0.5" fill="url(#logoGradient)" opacity="0.7" />
      {/* Windows */}
      <rect x="15.5" y="12" width="2" height="1.8" rx="0.3" fill="white" opacity="0.9" />
      <rect x="15.5" y="15.5" width="2" height="1.8" rx="0.3" fill="white" opacity="0.9" />
      <rect x="15.5" y="19" width="2" height="1.8" rx="0.3" fill="white" opacity="0.9" />
      <rect x="22.5" y="15" width="2" height="1.8" rx="0.3" fill="white" opacity="0.9" />
      <rect x="22.5" y="18.5" width="2" height="1.8" rx="0.3" fill="white" opacity="0.9" />
      {/* Door */}
      <rect x="16" y="22" width="1.5" height="2" rx="0.3" fill="white" opacity="0.7" />
      {/* Small pointer dot at bottom of pin */}
      <circle cx="20" cy="34" r="1.2" fill="url(#logoGradient)" />
    </svg>
  );
}

export default function Logo({ variant = "light", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { icon: "w-7 h-7", text: "text-xl", gap: "gap-1.5" },
    md: { icon: "w-8 h-8", text: "text-2xl", gap: "gap-2" },
    lg: { icon: "w-10 h-10", text: "text-3xl", gap: "gap-2.5" },
    xl: { icon: "w-14 h-14", text: "text-5xl", gap: "gap-3" },
  };

  const s = sizeMap[size];
  const propertyColor = variant === "light" ? "text-white" : "text-navy-900";

  return (
    <span className={`inline-flex items-center ${s.gap}`}>
      <LogoIcon className={`${s.icon} shrink-0`} />
      <span className={`${s.text} tracking-tight leading-none`}>
        <span className={`${propertyColor} font-extralight`}>Property</span>
        <span className="text-gold-500 font-semibold">Pointers</span>
      </span>
    </span>
  );
}
