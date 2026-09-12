"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Home, Trophy, Bookmark, Clock, User, LogOut } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

const NAV = [
  { label: "Overview", href: "/my-juris", icon: Home },
  { label: "My Records", href: "/my-juris/records", icon: Trophy },
  { label: "My Shortlist", href: "/my-juris/shortlist", icon: Bookmark },
  { label: "Recently Viewed", href: "/my-juris/recently-viewed", icon: Clock },
  { label: "My Account", href: "/my-juris/account", icon: User },
];

export default function MyJurisLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050402] flex items-center justify-center">
        <div className="w-1 h-8 bg-[#CBAA69]/40 animate-pulse rounded-full" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050402] text-[#FFFFF0] font-sans selection:bg-[#CBAA69]/20 flex flex-col">
      <Navbar />
      
      {/* 
        Aligned to the left matching Navbar padding.
      */}
      <div className="flex-1 w-full px-8 md:px-12 xl:px-16 pt-[120px] pb-10 flex flex-col md:flex-row gap-8 lg:gap-14 relative z-10">
        
        {/* Elegant, thin sidebar */}
        <aside className="w-full md:w-[260px] xl:w-[280px] shrink-0 flex flex-col justify-between h-[calc(100vh-9rem)] max-h-[750px] pb-4">
          <div className="flex flex-col gap-4">
            <div className="mb-6 px-2">
              <h2 className="text-[0.65rem] font-serif text-[#CBAA69] tracking-[0.25em] mb-2 uppercase font-medium">My Juris™</h2>
              <p className="text-[0.55rem] uppercase tracking-[0.3em] text-white/40 leading-[2.0] font-light">
                YOUR PERSONAL<br/>JURIS STANDARD SPACE
              </p>
            </div>
            
            <nav className="flex flex-col gap-1">
              {NAV.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-4 px-4 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.25em] transition-all duration-300 rounded-[2px] ${
                      isActive
                        ? "bg-gradient-to-r from-[#CBAA69]/[0.05] to-transparent text-[#CBAA69] border-l-[1px] border-[#CBAA69]"
                        : "text-white/50 hover:text-white hover:bg-white/[0.02] border-l-[1px] border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 opacity-80" strokeWidth={1.2} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom actions */}
          <div className="border-t border-[#CBAA69]/10 px-2 pt-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 py-3 px-3 w-full text-left text-[0.6rem] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-white hover:bg-white/[0.02] transition-all rounded-[2px]"
            >
              <LogOut className="w-4 h-4 opacity-80" strokeWidth={1.2} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area — Subtle, thin border, refined dark background */}
        <div className="flex-1 bg-[#070503] border border-[#CBAA69]/10 rounded-[2px] shadow-xl relative overflow-hidden flex flex-col h-[calc(100vh-9rem)] max-h-[750px]">
           {/* Very faint internal glow */}
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
           
           <div className="relative z-10 flex-1 overflow-y-auto">
             {children}
           </div>
        </div>
      </div>
    </main>
  );
}
