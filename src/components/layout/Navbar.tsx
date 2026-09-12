"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSubmissionStore } from "@/lib/submissionStore";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { User, LogOut, Shield, LayoutDashboard } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "The Index", href: "/enter-the-index" },
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
  const router = useRouter();
  const { currentStage, setStage } = useSubmissionStore();

  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowDropdown(false);
    await supabase.auth.signOut();
    router.refresh();
  };

  const isSubmissionPage = pathname === "/enter-the-index";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6"
      )}
    >
      <div className={cn(
        "flex items-center justify-between mx-auto max-w-[2000px]",
        isSubmissionPage 
          ? "w-full px-6 lg:pl-[80px] xl:pl-[95px] lg:pr-12" 
          : "w-full px-6 md:px-12 lg:px-24 xl:px-32"
      )}>
        <Link href="/" className="flex items-center group relative">
          <div className="h-[46px] md:h-[52px] w-auto relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/logo/logo-horizontal-stacked.png" 
              alt="Juris Standard" 
              className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            />
            {/* Continuous Glass Shine Effect mapped to the logo shape */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                maskImage: 'url("/logo/logo-horizontal-stacked.png")',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskImage: 'url("/logo/logo-horizontal-stacked.png")',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
              }}
            >
              <div className="absolute inset-y-0 w-[40%] animate-glass-shine bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-[25deg] opacity-90" />
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-12">
          {/* Navigation Links */}
          <div className="flex items-center space-x-5 xl:space-x-7">
            {navLinks.map((link) => {
              const isIndexLink = link.href === "/enter-the-index";
              const onIndexPage = pathname === "/enter-the-index";
              const isActive = pathname === link.href;

              const linkClasses = cn(
                "relative group px-1 py-1 text-[13px] xl:text-[14px] font-normal tracking-wide transition-colors duration-300",
                isActive ? "text-white" : "text-neutral-300 hover:text-white"
              );

              if (isIndexLink && onIndexPage) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setStage("welcome");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={linkClasses}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={linkClasses}
                >
                  {link.name}
                  <span className={cn(
                    "absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-500 origin-center",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              );
            })}
          </div>

          {/* Login / User Link & Request Access */}
          <div className="flex items-center space-x-6 relative">
            {user ? (
              <Link
                href="/my-juris"
                className="group flex items-center gap-3 px-1 py-1 transition-all duration-300"
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[0.55rem] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                    My Profile
                  </span>
                  <span className="text-[0.6rem] text-[#CBAA69] tracking-widest uppercase font-medium mt-0.5">
                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "Member"}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#050505] border border-white/10 group-hover:border-[#CBAA69]/50 flex items-center justify-center transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(203,170,105,0.15)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CBAA69]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[0.5rem] font-bold text-white/50 group-hover:text-[#CBAA69] tracking-wider relative z-10 transition-colors">
                    {(user.user_metadata?.full_name || user.email || "U")
                      .split(/[@.\s]/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p: string) => p[0]?.toUpperCase() ?? "")
                      .join("")}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-[13px] xl:text-[14px] font-normal text-neutral-300 hover:text-white transition-colors tracking-wide"
              >
                Login
              </Link>
            )}

            <Link
              href="/request-access"
              className="group relative inline-flex items-center justify-center px-6 py-2 bg-transparent border border-gold-500/30 text-gold-300 text-[11px] xl:text-[12px] font-semibold uppercase tracking-widest rounded-sm overflow-hidden transition-all duration-300 hover:border-gold-400 hover:text-white hover:bg-gold-500/5 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Access
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

