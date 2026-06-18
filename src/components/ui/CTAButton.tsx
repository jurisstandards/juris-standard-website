import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  showArrow?: boolean;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = "primary", href, showArrow = false, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center text-xs uppercase tracking-widest font-medium transition-all duration-300";

    const variants = {
      primary: "relative overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-md border border-gold-500/40 text-gold-200 hover:text-gold-100 hover:border-gold-300 group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] px-10 py-4",
      secondary: "bg-charcoal-800 text-gold-400 hover:bg-charcoal-700 px-8 py-4 border border-gold-500/20 hover:border-gold-500/50",
      outline: "relative overflow-hidden bg-transparent text-white/70 hover:text-gold-300 px-10 py-4 border border-white/10 hover:border-gold-500/40 group transition-all duration-500",
      ghost: "bg-transparent text-white/70 hover:text-gold-400 px-4 py-2",
    };

    const content = (
      <>
        <span className="relative z-10 flex items-center tracking-[0.25em]">
          {children}
          {showArrow && <ArrowRight className="ml-4 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />}
        </span>
        {/* Sweeping shine effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer pointer-events-none" />
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cn(baseStyles, variants[variant], className)}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);
CTAButton.displayName = "CTAButton";
