import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  actionText,
  actionHref,
  className,
  icon,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between mb-16", className)}>
      <div className="max-w-2xl relative">
        <div className="flex items-center space-x-6 mb-4">
          {icon && (
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gold-400 blur-xl opacity-20" />
              <div className="relative text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                {icon}
              </div>
            </div>
          )}
          <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f0] to-[#888888] uppercase tracking-[0.05em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="pl-[3.25rem]">
            <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-wide max-w-xl border-l-2 border-gold-500/40 pl-4 py-1">
              {subtitle}
            </p>
          </div>
        )}
      </div>
      
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex items-center mt-8 md:mt-0 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:via-gold-300 hover:to-gold-400 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:-translate-y-0.5"
        >
          {actionText}
          <ArrowRight className="ml-3 w-4 h-4 text-black/70 group-hover:text-black transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
