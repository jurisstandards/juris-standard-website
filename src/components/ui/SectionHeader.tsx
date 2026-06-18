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
          <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-[0.05em] drop-shadow-md">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-white/50 text-sm md:text-base leading-relaxed tracking-wide max-w-xl pl-[3.25rem]">
            {subtitle}
          </p>
        )}
      </div>
      
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex items-center mt-8 md:mt-0 pb-2 text-xs uppercase tracking-[0.25em] text-gold-400 hover:text-gold-300 transition-colors border-b border-gold-500/30 hover:border-gold-400"
        >
          {actionText}
          <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
