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
    <div className={cn("p-5 md:p-6 rounded-xl bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-white/[0.08] shadow-sm relative overflow-hidden group hover:border-gold-500/30 transition-all duration-150 flex flex-col justify-between h-[210px]", className)}>
      
      {/* Background Grid Pattern for terminal feel */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.02] pointer-events-none" />
      
      {/* Ambient Top Glow - Minimized */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-150" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Region */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <div className="w-1 h-1 rounded-full bg-gold-400/80" />
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white/60 group-hover:text-gold-300/90 transition-colors duration-150">
                {category}
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl md:text-4xl font-light tracking-tight text-white drop-shadow-sm">
                {value}
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-sm">
                + Trend
              </span>
            </div>
            <p className="text-white/40 text-[0.65rem] tracking-wide uppercase font-medium mt-2">
              {subtitle}
            </p>
          </div>
        </div>

        {/* The Premium Graph */}
        <div className="absolute bottom-0 left-0 right-0 h-[90px] w-full pt-2 opacity-70 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
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
            <path d="M0 10 L100 10 M0 20 L100 20 M0 30 L100 30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <path d="M20 0 L20 40 M40 0 L40 40 M60 0 L60 40 M80 0 L80 40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

            {/* Filled Gradient Area */}
            <path d="M0 40 L0 35 C 20 33, 40 38, 60 25 C 80 12, 90 15, 100 5 L 100 40 Z" fill={`url(#area-${gradientId})`} />
            
            {/* Glowing Main Solid Line */}
            <path d="M0 35 C 20 33, 40 38, 60 25 C 80 12, 90 15, 100 5" stroke={`url(#line-${gradientId})`} strokeWidth="1.2" fill="none" filter={`url(#glow-${gradientId})`} />
            
            {/* End Point Node */}
            <circle cx="100" cy="5" r="1.5" fill="#FFDF73" filter={`url(#glow-${gradientId})`} />
            <circle cx="100" cy="5" r="4" fill="none" stroke="#FFDF73" strokeWidth="0.5" strokeOpacity="0.5" className="animate-pulse" />
          </svg>
        </div>
      </div>
    </div>
  );
}
