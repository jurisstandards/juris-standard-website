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
        "group relative flex flex-col h-[420px] w-full max-w-[280px] mx-auto overflow-hidden rounded-[8px] transition-all duration-500",
        "bg-[#030303] border border-[#C5A059]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
        "hover:border-[#C5A059]/50 hover:shadow-[0_0_25px_rgba(197,160,89,0.15)] hover:-translate-y-1",
        className
      )}
    >
      {/* Subtle inner glow for glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Typography at top */}
      <div className="relative z-10 pt-8 px-6">
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-1">
          {topLabel}
        </span>
        <h3 className="font-serif text-[1.15rem] text-[#FFFFF0] tracking-wider uppercase leading-tight drop-shadow-sm">
          {mainLabel}
        </h3>
      </div>

      {/* 3D Asset in center - No weird mix-blend so colors stay pure golden */}
      <div className="absolute inset-0 top-16 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt={mainLabel}
            className="w-[90%] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Elegant Arrow button at bottom right */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="w-8 h-8 rounded-full border border-[#C5A059]/30 flex items-center justify-center transition-all duration-300 group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/60">
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]/70 group-hover:text-[#C5A059] transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
