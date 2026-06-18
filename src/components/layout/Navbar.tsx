"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "The Index™", href: "/index" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Network", href: "/network" },
  { name: "Awards", href: "/awards" },
  { name: "Membership", href: "/membership" },
  { name: "Insights", href: "/insights" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-2xl tracking-widest text-gold-400 leading-none">
            JURIS
          </span>
          <span className="font-serif text-[0.65rem] tracking-[0.3em] text-white/70 uppercase leading-tight mt-1 transition-colors group-hover:text-gold-200">
            Standard
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[0.65rem] uppercase tracking-[0.15em] text-white/70 hover:text-gold-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/login"
            className="text-[0.65rem] uppercase tracking-[0.15em] text-white/70 hover:text-gold-400 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/request-access"
            className="text-[0.65rem] uppercase tracking-[0.15em] text-gold-400 border border-gold-500/30 px-5 py-2 hover:bg-gold-500/10 hover:border-gold-500 transition-all"
          >
            Request Access
          </Link>
        </div>
        
        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
}
