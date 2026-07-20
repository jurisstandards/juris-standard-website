import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InstitutionalCardProps {
  title: string;
  subtitle: string;
  collections?: string[];
  href: string;
  isSignature?: boolean;
  className?: string;
  delay?: number;
}

export function InstitutionalCard({
  title,
  subtitle,
  collections,
  href,
  isSignature = false,
  className,
  delay = 0,
}: InstitutionalCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-sm transition-all duration-500",
        "bg-gradient-to-b from-[#111111] to-[#050505] border border-white/[0.05]",
        "hover:border-gold-500/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]",
        isSignature ? "p-10 lg:p-14 min-h-[400px]" : "p-8 lg:p-10 min-h-[300px]",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle ambient lighting on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          {isSignature && (
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-[1px] bg-gold-500/50" />
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-gold-400/80">
                Signature Recognition
              </span>
            </div>
          )}
          
          <h3 className={cn(
            "font-serif tracking-wide text-white/95 leading-tight transition-colors group-hover:text-gold-100",
            isSignature ? "text-3xl md:text-4xl lg:text-5xl mb-4" : "text-2xl md:text-3xl mb-3"
          )}>
            {title}
          </h3>
          
          <p className={cn(
            "font-light tracking-wide text-neutral-400 leading-relaxed transition-colors group-hover:text-neutral-300",
            isSignature ? "text-base md:text-lg max-w-lg" : "text-sm md:text-base max-w-md"
          )}>
            {subtitle}
          </p>
        </div>

        <div className="mt-8 flex flex-col">
          {collections && collections.length > 0 && (
            <div className="overflow-hidden mb-6">
              <div className="transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-500/60 block mb-3">
                  Featured Collections
                </span>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {collections.map((collection, idx) => (
                    <li key={idx} className="text-sm font-light text-neutral-300/80 tracking-wide flex items-center">
                      <span className="w-1 h-1 rounded-full bg-gold-500/30 mr-2" />
                      {collection}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between border-t border-white/[0.05] pt-6 mt-auto">
            <span className="text-xs uppercase tracking-[0.15em] text-white/40 group-hover:text-gold-400/80 transition-colors duration-300">
              Explore Index
            </span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500/10 group-hover:border-gold-500/50">
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-gold-300 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
