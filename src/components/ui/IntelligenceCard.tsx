import { cn } from "@/lib/utils";

interface IntelligenceCardProps {
  category: string;
  value: string;
  subtitle: string;
  className?: string;
}

export function IntelligenceCard({ category, value, subtitle, className }: IntelligenceCardProps) {
  return (
    <div className={cn("p-8 rounded-sm bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)] transition-all duration-700 flex flex-col justify-between h-full relative overflow-hidden group hover:border-t-gold-500/40 hover:border-x-gold-500/20 hover:-translate-y-1", className)}>
      {/* Subtle ambient lighting on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400/80 mb-5 block transition-colors">
          {category}
        </span>
        <div className="text-4xl lg:text-5xl font-serif text-white tracking-[0.05em] mb-2 group-hover:text-gold-100 transition-colors drop-shadow-md">
          {value}
        </div>
        <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium mt-3">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 flex justify-end relative z-10">
        {/* Abstract mini chart line placeholder */}
        <svg className="w-20 h-10 text-gold-500 opacity-60 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all duration-700 group-hover:-translate-y-1" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 30L12 24L22 26L36 14L46 18L62 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 30L12 24L22 26L36 14L46 18L62 2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="opacity-10 blur-sm group-hover:opacity-30 transition-opacity duration-700"/>
          <circle cx="62" cy="2" r="2.5" fill="#fdfaf2" className="drop-shadow-[0_0_8px_#c5a059]" />
        </svg>
      </div>
    </div>
  );
}
