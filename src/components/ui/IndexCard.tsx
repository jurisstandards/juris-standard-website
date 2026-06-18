import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface IndexCardProps {
  category: string;
  title: string;
  href: string;
  className?: string;
  delay?: number;
  icon?: ReactNode;
}

export function IndexCard({ category, title, href, className, delay = 0, icon }: IndexCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between h-[360px] p-8 overflow-hidden rounded-sm bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-t-gold-500/40 hover:border-x-gold-500/20 hover:-translate-y-2",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle ambient lighting on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Text - Fixed height for perfect symmetry across all cards */}
        <div className="h-20 transform group-hover:translate-x-1 transition-transform duration-500 ease-out">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-gold-400/80 mb-2 block transition-colors">
            {category}
          </span>
          {/* Text is forced to a single line with dynamic responsive sizing to prevent the 'S' in INFLUENCERS from dropping */}
          <h3 className="font-serif text-[1.15rem] lg:text-[1rem] xl:text-[0.95rem] 2xl:text-[1.15rem] text-white tracking-wider uppercase leading-snug transition-all whitespace-nowrap drop-shadow-md">
            {title}
          </h3>
        </div>

        {/* SVG Gradient Definition for Icons */}
        <svg width="0" height="0" className="absolute">
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#E5C158" offset="0%" />
            <stop stopColor="#C49B3E" offset="50%" />
            <stop stopColor="#9C7524" offset="100%" />
          </linearGradient>
        </svg>

        {/* Ultra-Premium Glassmorphic Icon Assembly */}
        <div className="flex-grow flex items-center justify-center pointer-events-none relative z-0 mt-2">
           {/* Soft glow behind the ring */}
           <div className="absolute w-24 h-24 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-500/20 transition-all duration-700" />
           
           <div className="relative flex items-center justify-center w-28 h-28 rounded-full border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.6)] transition-all duration-700 bg-gradient-to-b from-white/[0.02] to-transparent group-hover:border-gold-500/30">
              {/* Inner dark well */}
              <div className="absolute inset-[3px] rounded-full border border-black/50 bg-[#050505]/80 backdrop-blur-md" />
              
              {/* The Bespoke SVG Geometry */}
              <div className="relative z-10 opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                 {icon}
              </div>
           </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto self-end relative z-10 pt-4">
          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-gold-400/50">
            <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
