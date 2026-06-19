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
    const baseStyles = ""; // We remove the base styling because the custom CSS provides everything.

    const variants = {
      primary: "btn-primary-ultra",
      secondary: "bg-charcoal-800 text-gold-400 hover:bg-charcoal-700 px-8 py-4 border border-gold-500/20 hover:border-gold-500/50",
      outline: "btn-secondary-ultra",
      ghost: "bg-transparent text-white/70 hover:text-gold-400 px-4 py-2",
    };

    const content = (
      <>
        <span className="relative z-10 flex items-center">
          {children}
          {showArrow && <ArrowRight className="ml-4 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-[600ms]" />}
        </span>
        {variant === "outline" && (
          <>
            <span className="btn-corner tl"></span>
            <span className="btn-corner tr"></span>
            <span className="btn-corner bl"></span>
            <span className="btn-corner br"></span>
          </>
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
