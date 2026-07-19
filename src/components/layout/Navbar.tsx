"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSubmissionStore } from "@/lib/submissionStore";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "The Index™", href: "/juris-index" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Network", href: "/network" },
  { name: "Awards", href: "/awards" },
  { name: "Membership", href: "/membership" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { currentStage } = useSubmissionStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSubmissionPage = pathname === "/enter-the-index";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6"
      )}
    >
      <div className={cn(
        "flex items-center justify-between",
        isSubmissionPage 
          ? "w-full px-6 lg:pl-[80px] xl:pl-[95px] lg:pr-12" 
          : "w-full px-8 md:px-16 lg:px-24 xl:px-32"
      )}>
        <Link href="/" className="flex items-center group">
          {/* Official Horizontal Logo */}
          <div className="h-[46px] md:h-[52px] w-auto relative flex-shrink-0 transition-all duration-300 group-hover:opacity-90">
            <img 
              src="/logo/logo-horizontal-stacked.png" 
              alt="Juris Standard" 
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-normal text-neutral-300 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <Link
            href="/login"
            className="text-[15px] font-normal text-neutral-300 hover:text-white transition-colors tracking-wide"
          >
            Login
          </Link>
          <Link
            href="/request-access"
            className="group flex items-center gap-2 text-[15px] font-normal text-gold-300 border border-gold-500/40 bg-transparent px-5 py-2 hover:bg-gold-500/10 hover:border-gold-400 hover:text-gold-200 transition-all duration-300 rounded-[1px]"
          >
            <span>Request Access</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1 font-light">&rarr;</span>
          </Link>
        </div>
        
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
}
