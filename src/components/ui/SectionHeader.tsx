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
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide drop-shadow-sm font-light">
            {title}
          </h2>
        </div>
        {subtitle && (
          <div className="pl-[3.25rem] mt-2">
            <p className="text-neutral-400 text-sm md:text-[15px] font-light leading-relaxed tracking-wide max-w-xl">
              {subtitle}
            </p>
          </div>
        )}
      </div>
      
      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex items-center mt-8 md:mt-0 px-5 py-2 text-[14px] font-normal text-gold-300 border border-gold-500/40 bg-transparent hover:bg-gold-500/10 hover:text-gold-200 transition-colors duration-300 rounded-[1px]"
        >
          <span>{actionText}</span>
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1 font-light">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
