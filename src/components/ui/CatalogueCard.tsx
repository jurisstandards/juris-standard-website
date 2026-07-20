import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CatalogueCardProps {
  title: string;
  description: string;
  href: string;
  isSignature?: boolean;
  className?: string;
}

export function CatalogueCard({
  title,
  description,
  href,
  isSignature = false,
  className,
}: CatalogueCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden transition-all duration-500",
        "border border-white/5 bg-[#0a0a0a]",
        "hover:border-gold-500/30 hover:bg-[#111111]",
        isSignature ? "p-10 md:p-14 min-h-[350px] md:min-h-[400px]" : "p-8 md:p-10 min-h-[250px] md:min-h-[280px]",
        className
      )}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.05)_0%,_transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div>
          {isSignature && (
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-[1px] bg-gold-500/50" />
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-gold-400/80">
                Signature Recognition
              </span>
            </div>
          )}
          
          <h3 className={cn(
            "font-serif tracking-wide text-white/95 leading-tight transition-colors group-hover:text-gold-200",
            isSignature ? "text-3xl md:text-5xl mb-4 md:mb-6" : "text-xl md:text-2xl mb-3"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "font-light tracking-wide text-neutral-400 leading-relaxed",
            isSignature ? "text-base md:text-lg max-w-xl" : "text-sm md:text-sm max-w-xs"
          )}>
            {description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-white/[0.05] pt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50 group-hover:text-gold-400/80 transition-colors duration-300">
            View Collection
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500/10 group-hover:border-gold-500/50">
            <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-gold-300 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
