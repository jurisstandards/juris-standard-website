"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSubmissionStore } from "@/lib/submissionStore";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { User, LogOut, LayoutDashboard } from "lucide-react";

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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

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

  // Build user initials for the avatar
  const userInitials = user
    ? (user.user_metadata?.full_name || user.email || "U")
        .split(/[@.\s]/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p: string) => p[0]?.toUpperCase() ?? "")
        .join("")
    : "";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-[2000px] w-full px-6 md:px-12 lg:px-16 xl:px-24">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center group relative flex-shrink-0">
          <div className="h-[42px] md:h-[48px] w-auto relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/logo/logo-horizontal-stacked.png" 
              alt="Juris Standard" 
              className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            />
            {/* Glass Shine Effect */}
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

        {/* ── Desktop Nav (hidden below lg) ── */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-shrink-0">
          {/* Navigation Links */}
          {navLinks.map((link) => {
            const isIndexLink = link.href === "/enter-the-index";
            const onIndexPage = pathname === "/enter-the-index";
            const isActive = pathname === link.href;

            const linkClasses = cn(
              "relative group whitespace-nowrap px-2 xl:px-3 py-1.5 text-[12px] xl:text-[13px] font-normal tracking-wide transition-colors duration-300",
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

          {/* ── Right Actions: User + Request Access ── */}
          <div className="flex items-center gap-3 ml-3 xl:ml-5 flex-shrink-0">
            {user ? (
              /* Logged-in: compact circle avatar only */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="group w-9 h-9 rounded-full bg-[#0a0a0a] border border-white/15 hover:border-[#CBAA69]/50 flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(203,170,105,0.2)] relative overflow-hidden flex-shrink-0"
                  title={user.email || "My Account"}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CBAA69]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[0.55rem] font-bold text-white/60 group-hover:text-[#CBAA69] tracking-wider relative z-10 transition-colors">
                    {userInitials}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-[3px] shadow-2xl py-1.5 z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-[0.6rem] uppercase tracking-widest text-white/40">Signed in as</p>
                      <p className="text-[0.7rem] text-[#CBAA69] tracking-wide font-medium mt-1 truncate">
                        {user.user_metadata?.full_name || user.email?.split("@")[0] || "Member"}
                      </p>
                    </div>
                    <Link href="/my-juris" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-[0.65rem] uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                      <User className="w-3.5 h-3.5" />
                      My Profile
                    </Link>
                    <Link href="/admin" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-[0.65rem] uppercase tracking-widest text-[#CBAA69]/80 hover:text-[#CBAA69] hover:bg-[#CBAA69]/5 transition-colors border-t border-white/5">
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Admin Panel
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[0.65rem] uppercase tracking-widest text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-colors border-t border-white/5 text-left">
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[12px] xl:text-[13px] font-normal text-neutral-300 hover:text-white transition-colors tracking-wide whitespace-nowrap"
              >
                Login
              </Link>
            )}

            <Link
              href="/request-access"
              className="group relative inline-flex items-center justify-center whitespace-nowrap px-4 xl:px-5 py-2 bg-transparent border border-gold-500/30 text-gold-300 text-[10px] xl:text-[11px] font-semibold uppercase tracking-widest rounded-sm overflow-hidden transition-all duration-300 hover:border-gold-400 hover:text-white hover:bg-gold-500/5 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
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
