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
        "group relative flex flex-col h-[400px] w-full max-w-[280px] mx-auto overflow-hidden rounded-[4px] transition-all duration-500",
        "bg-gradient-to-b from-[#0a0a0a] to-[#000000] border border-gold-500/20",
        "hover:border-gold-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1",
        className
      )}
    >
      {/* Soft inner glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {/* Typography at top */}
      <div className="relative z-10 pt-6 px-6">
        <span className="block text-[0.65rem] font-medium uppercase tracking-[0.15em] text-gold-500/80 mb-1 transition-colors group-hover:text-gold-400">
          {topLabel}
        </span>
        <h3 className="font-serif text-[1.1rem] text-white/95 tracking-wide uppercase leading-tight drop-shadow-sm transition-colors group-hover:text-white">
          {mainLabel}
        </h3>
      </div>

      {/* 3D Asset in center */}
      <div className="absolute inset-0 top-16 flex items-center justify-center p-4 pointer-events-none">
        {/* We use a mask to fade out the top edge slightly so it doesn't overlap text awkwardly, though the images have black backgrounds */}
        <div className="relative w-full h-full flex items-center justify-center mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-500">
          <img 
            src={imageSrc} 
            alt={mainLabel}
            className="w-[85%] h-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Arrow button at bottom right */}
      <div className="absolute bottom-5 right-5 z-10">
        <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500/10 group-hover:border-gold-500/60">
          <ArrowRight className="w-3.5 h-3.5 text-gold-500/70 group-hover:text-gold-300 transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
