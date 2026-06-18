import { cn } from "@/lib/utils";
import Link from "next/link";

interface InsightCardProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
  href: string;
  className?: string;
}

export function InsightCard({ category, title, date, readTime, href, className }: InsightCardProps) {
  return (
    <Link href={href} className={cn("group block relative overflow-hidden h-80 rounded-sm bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)] hover:border-t-gold-500/40 hover:border-x-gold-500/20 transition-all duration-700 hover:-translate-y-1", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Abstract lines in background to look premium */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0 transform group-hover:scale-105">
         <svg className="w-64 h-64 text-white" viewBox="0 0 100 100" fill="none">
            <path d="M100 0 L0 100" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round"/>
            <path d="M100 20 L20 100" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round"/>
            <path d="M100 40 L40 100" stroke="currentColor" strokeWidth="0.2" strokeLinecap="round"/>
         </svg>
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <div className="self-start">
          <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md text-gold-400 border border-gold-500/20 text-[0.6rem] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(197,160,89,0.05)] rounded-sm transition-colors group-hover:border-gold-500/40">
            {category}
          </span>
        </div>

        <div>
          <h3 className="font-serif text-[1.3rem] text-white mb-6 leading-snug group-hover:text-gold-100 transition-colors duration-300 drop-shadow-md pr-4">
            {title}
          </h3>
          <div className="flex items-center space-x-4 text-[0.65rem] text-white/40 tracking-[0.2em] uppercase font-medium">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-gold-500/40" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
