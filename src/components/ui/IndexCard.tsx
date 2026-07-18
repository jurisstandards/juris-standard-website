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
        "group relative flex flex-col justify-between h-[280px] p-6 lg:p-8 overflow-hidden rounded-sm bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/[0.08] border-t-gold-500/20 shadow-lg transition-all duration-200 hover:border-gold-500/30 hover:bg-[#181818]",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      
      {/* Subtle ambient lighting on hover - minimized */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Text - Fixed height for perfect symmetry across all cards */}
        <div className="h-16 transition-transform duration-200 ease-out">
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-400/70 mb-2 block transition-colors group-hover:text-gold-400/90">
            {category}
          </span>
          <h3 className="font-serif text-[1.1rem] lg:text-[0.95rem] xl:text-[0.9rem] 2xl:text-[1.05rem] text-white/90 tracking-wide uppercase leading-snug transition-colors whitespace-nowrap group-hover:text-white">
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

        {/* Ultra-Premium Glassmorphic Icon Assembly - Minimized */}
        <div className="flex-grow flex items-center justify-center pointer-events-none relative z-0 mt-2">
           {/* Soft glow behind the ring */}
           <div className="absolute w-20 h-20 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-500/10 transition-all duration-200" />
           
           <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-white/[0.1] shadow-sm transition-all duration-200 bg-white/[0.02] group-hover:border-gold-500/30">
              {/* Inner dark well */}
              <div className="absolute inset-[2px] rounded-full bg-[#0d0d0d] transition-colors duration-200" />
              
              {/* The Bespoke Image Geometry */}
              <div className="relative z-10 flex items-center justify-center w-full h-full mix-blend-screen transition-all duration-200 opacity-90 group-hover:opacity-100">
                 {icon}
              </div>
           </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto self-end relative z-10 pt-4">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200 group-hover:bg-gold-400/80 group-hover:border-gold-400 shadow-lg group-hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-black transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
