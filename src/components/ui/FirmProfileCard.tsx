import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

interface FirmProfileCardProps {
  name: string;
  logoNode?: React.ReactNode;
  tier: string;
  practiceAreas: string;
  location: string;
  href: string;
  className?: string;
}

export function FirmProfileCard({
  name,
  logoNode,
  tier,
  practiceAreas,
  location,
  href,
  className,
}: FirmProfileCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col justify-between p-6 h-[260px] w-full rounded-md transition-all duration-500",
        "bg-gradient-to-b from-[#161616] via-[#0a0a0a] to-[#050505] border border-white/5",
        "hover:border-gold-500/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.05)] hover:-translate-y-1",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
        className
      )}
    >
      <div className="flex-grow flex flex-col">
        {/* Logo or Name */}
        <div className="h-16 flex items-start justify-start mb-4">
          {logoNode ? (
            logoNode
          ) : (
            <h3 className="font-serif text-2xl text-white/95 leading-tight tracking-wide">
              {name}
            </h3>
          )}
        </div>

        {/* Tier */}
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-500/80 mb-2">
          {tier}
        </span>

        {/* Practice Areas */}
        <p className="text-xs text-white/90 font-light mb-auto leading-relaxed">
          {practiceAreas}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-neutral-500">
          <MapPin className="w-3.5 h-3.5 text-gold-500/50" />
          <span className="text-[0.65rem] tracking-wide">{location}</span>
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold-400 transition-colors">
          VIEW PROFILE
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
