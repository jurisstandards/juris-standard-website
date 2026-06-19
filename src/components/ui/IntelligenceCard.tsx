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
    <div className={cn("p-8 rounded-xl bg-[#111111]/80 backdrop-blur-2xl border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.8)] hover:bg-[#161616]/90 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group hover:border-gold-500/30 hover:-translate-y-1", className)}>
      
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-gold-500/50 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/50 group-hover:text-gold-400 transition-colors duration-500">
              {category}
            </span>
            {/* Small status indicator */}
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/30 group-hover:bg-gold-400 group-hover:shadow-[0_0_8px_#D4AF37] transition-all duration-500" />
          </div>
          
          <div className="text-4xl lg:text-5xl font-light tracking-tight text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold-200 transition-all duration-500">
            {value}
          </div>
          <p className="text-gold-500/70 text-xs tracking-wide uppercase font-medium">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 w-full relative z-10">
          {/* Professional Smooth Area Chart */}
          <svg className="w-full h-16 opacity-60 group-hover:opacity-100 transition-all duration-700" viewBox="0 0 100 40" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`area-${gradientId}`} x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D4AF37" stopOpacity="0.15" />
                <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`line-${gradientId}`} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D4AF37" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="1" stopColor="#FFDF73" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Smooth Bézier curve instead of jagged lines */}
            <path d="M0 40 L0 35 C 20 35, 30 15, 50 20 C 70 25, 85 5, 100 2 L 100 40 Z" fill={`url(#area-${gradientId})`} className="group-hover:opacity-100 transition-opacity duration-700" />
            <path d="M0 35 C 20 35, 30 15, 50 20 C 70 25, 85 5, 100 2" stroke={`url(#line-${gradientId})`} strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_4px_8px_rgba(212,175,55,0.6)] transition-all duration-500" />
            
            {/* Professional data point indicator */}
            <circle cx="100" cy="2" r="2" fill="#FFDF73" className="drop-shadow-[0_0_6px_#FFDF73]" />
            <circle cx="100" cy="2" r="4" fill="transparent" stroke="#FFDF73" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />
          </svg>
        </div>
      </div>
    </div>
  );
}
