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
    const baseStyles = "group inline-flex items-center px-6 py-2.5 text-[14px] font-normal transition-colors duration-200 rounded-[1px] cursor-pointer";

    const variants = {
      primary: "bg-gold-500/10 border border-gold-500/40 text-gold-300 hover:bg-gold-500/20 hover:text-gold-200",
      secondary: "bg-charcoal-800 text-gold-400 hover:bg-charcoal-700 border border-gold-500/20 hover:border-gold-500/50",
      outline: "bg-transparent border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:text-gold-200",
      ghost: "bg-transparent text-white/70 hover:text-gold-400 px-4 py-2",
    };

    const content = (
      <>
        <span>{children}</span>
        {showArrow && (
          <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1 font-light">&rarr;</span>
        )}
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
