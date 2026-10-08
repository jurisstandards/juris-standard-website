import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PremiumIndexCardProps {
  topLabel: string;
  mainLabel: string;
  href: string;
  imageSrc: string;
  className?: string;
}

export function PremiumIndexCard({
  topLabel,
  mainLabel,
  href,
  imageSrc,
  className,
}: PremiumIndexCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col h-[460px] w-full max-w-[300px] mx-auto overflow-hidden rounded-[10px] transition-all duration-700 ease-out",
        "bg-[#020202] border border-[#C5A059]/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]",
        "hover:border-[#C5A059]/40 hover:shadow-[0_0_40px_rgba(197,160,89,0.15)] hover:-translate-y-2",
        className
      )}
    >
      {/* Top Edge Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Subtle inner glow for glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Typography at top */}
      <div className="relative z-10 pt-8 px-7">
        <span className="block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-[#C5A059] mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          {topLabel}
        </span>
        <h3 className="font-serif text-[1.25rem] text-[#FFFFF0] tracking-wide uppercase leading-tight drop-shadow-sm group-hover:text-white transition-colors duration-500">
          {mainLabel}
        </h3>
      </div>

      {/* 3D Asset in center */}
      <div className="absolute inset-0 top-20 flex items-center justify-center p-2 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt={mainLabel}
            className="w-[95%] h-[95%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              filter: 'contrast(1.05) brightness(1.05)',
            }}
          />
        </div>
      </div>

      {/* Elegant Arrow button at bottom right */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="w-9 h-9 rounded-full border border-[#C5A059]/20 flex items-center justify-center transition-all duration-500 group-hover:border-[#C5A059]/80 group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)]">
          <ArrowRight className="w-4 h-4 text-[#C5A059]/50 group-hover:text-[#C5A059] transition-colors duration-500 transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
