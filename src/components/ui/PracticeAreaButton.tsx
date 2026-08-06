import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface PracticeAreaButtonProps {
  label: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function PracticeAreaButton({
  label,
  icon: Icon,
  href,
  className,
}: PracticeAreaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center justify-center gap-3 p-4 min-w-[120px] transition-all duration-300",
        className
      )}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1 group-hover:-translate-y-1 transition-transform duration-300">
        <Icon className="w-8 h-8 text-gold-500/80 group-hover:text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.2)] transition-colors" strokeWidth={1} />
      </div>
      <span className="text-[0.65rem] font-medium text-white/70 group-hover:text-white transition-colors text-center">
        {label}
      </span>
    </Link>
  );
}
