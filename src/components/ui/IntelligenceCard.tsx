import { cn } from "@/lib/utils";

interface IntelligenceCardProps {
  category: string;
  value: string;
  subtitle: string;
  className?: string;
}

export function IntelligenceCard({ category, value, subtitle, className }: IntelligenceCardProps) {
  // Generate a safe unique ID for the SVG gradients based on the category name
  const gradientId = category.replace(/\s+/g, '');

  return (
    <div className={cn("p-6 md:p-8 rounded-xl bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:border-gold-500/40 hover:shadow-[0_15px_50px_rgba(212,175,55,0.15)] transition-all duration-700 flex flex-col justify-between h-[280px]", className)}>
      
      {/* Background Grid Pattern for terminal feel */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
      
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-50 group-hover:opacity-100 group-hover:via-gold-400 transition-all duration-700" />
      <div className="absolute -top-10 inset-x-0 h-20 bg-gold-500/10 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Region */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-1 h-1 rounded-full bg-gold-400 shadow-[0_0_5px_#D4AF37]" />
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/60 group-hover:text-gold-200/80 transition-colors duration-500">
                {category}
              </span>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl md:text-5xl font-light tracking-tight text-white drop-shadow-md">
                {value}
              </span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-0.5 rounded-sm">
                + Trend
              </span>
            </div>
            <p className="text-white/40 text-xs tracking-wide uppercase font-medium mt-3">
              {subtitle}
            </p>
          </div>
        </div>

        {/* The Premium Graph */}
        <div className="absolute bottom-0 left-0 right-0 h-[120px] w-full pt-4 opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`area-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id={`line-${gradientId}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFDF73" stopOpacity="1" />
              </linearGradient>
              <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Premium X/Y Grid Lines */}
            <path d="M0 10 L100 10 M0 20 L100 20 M0 30 L100 30" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <path d="M20 0 L20 40 M40 0 L40 40 M60 0 L60 40 M80 0 L80 40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

            {/* Filled Area */}
            <path d="M0 40 L0 32 C 15 30, 30 35, 45 25 C 60 15, 75 18, 90 5 L 100 0 L 100 40 Z" fill={`url(#area-${gradientId})`} />
            
            {/* Glowing Trend Line */}
            <path d="M0 32 C 15 30, 30 35, 45 25 C 60 15, 75 18, 90 5 L 100 0" stroke={`url(#line-${gradientId})`} strokeWidth="1.2" fill="none" filter={`url(#glow-${gradientId})`} />
            
            {/* Data Point Marker */}
            <circle cx="100" cy="0" r="2" fill="#FFDF73" filter={`url(#glow-${gradientId})`} />
          </svg>
        </div>
      </div>
    </div>
  );
}
