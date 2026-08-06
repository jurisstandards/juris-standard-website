import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NumberedIndexCardProps {
  number: string;
  topLabel: string;
  mainLabel: string;
  href: string;
  imageSrc: string;
  className?: string;
}

export function NumberedIndexCard({
  number,
  topLabel,
  mainLabel,
  href,
  imageSrc,
  className,
}: NumberedIndexCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col items-center justify-between aspect-square w-full overflow-hidden rounded-lg transition-all duration-500",
        "bg-gradient-to-b from-[#111] via-[#050505] to-[#000] border border-gold-500/20",
        "hover:border-gold-400/60 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:-translate-y-1",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {/* Soft inner glow and hover gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] group-hover:bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] transition-colors duration-500 pointer-events-none" />

      {/* Number at top left */}
      <div className="absolute top-5 left-5 z-10">
        <span className="font-serif text-lg md:text-xl text-gold-600/70 group-hover:text-gold-400 transition-colors drop-shadow-sm">
          {number}
        </span>
      </div>

      {/* 3D Asset in center */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none mt-[-15%]">
        <div className="relative w-full h-full flex items-center justify-center mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          <img 
            src={imageSrc} 
            alt={mainLabel}
            className="w-[85%] h-auto object-contain drop-shadow-[0_10px_20px_rgba(212,175,55,0.15)] group-hover:drop-shadow-[0_10px_25px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all duration-700 ease-out"
          />
        </div>
      </div>

      {/* Typography and Button at bottom */}
      <div className="absolute bottom-6 w-full flex flex-col items-center z-10 px-4">
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-gold-500 mb-1 transition-colors group-hover:text-gold-400 text-center drop-shadow-sm">
          {topLabel}
        </span>
        <h3 className="font-serif text-sm md:text-[0.95rem] text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors group-hover:text-white text-center mb-5">
          {mainLabel}
        </h3>
        
        <div className="w-7 h-7 rounded-full border border-gold-500/30 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500/20 group-hover:border-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.0)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <ArrowRight className="w-3.5 h-3.5 text-gold-500 group-hover:text-gold-300 transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
