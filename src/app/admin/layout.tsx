"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminNavLinks from "@/components/admin/AdminNavLinks";
import {
  LayoutDashboard, FileText, ClipboardList, Users, ArrowLeft, Shield, Loader2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/records", label: "Records", icon: FileText },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/magazine", label: "Magazine", icon: FileText },
];

const ADMIN_EMAILS = ["jurisstandard@gmail.com"];

type AuthState =
  | { status: "loading" }
  | { status: "denied" }
  | { status: "ok"; email: string };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function check() {
      // The site stores the Supabase session in the browser (localStorage),
      // so the admin check must happen client-side.
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      const email = user.email ?? "";
      let isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());

      if (!isAdmin) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        isAdmin = profile?.role?.toLowerCase() === "admin";
      }

      if (cancelled) return;
      setAuth(isAdmin ? { status: "ok", email } : { status: "denied" });
    }

    check();
    return () => { cancelled = true; };
  }, [router]);

  if (auth.status === "loading") {
    return (
      <div className="min-h-screen bg-[#101217] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#E3C888] animate-spin" />
      </div>
    );
  }

  if (auth.status === "denied") {
    return (
      <div className="min-h-screen bg-[#101217] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-serif text-[#CBAA69] mb-4">Access Denied</h1>
        <p className="text-white/80 mb-8">Your account does not have admin privileges.</p>
        <Link href="/" className="px-6 py-2 bg-[#CBAA69] text-black font-semibold rounded-[2px]">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15171c] text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-gradient-to-r from-[#1f232b] to-[#181b21] border-b border-white/15 shadow-lg shadow-black/30 flex items-center px-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-[2px] h-5 bg-[#CBAA69]" />
          <span className="text-[0.76rem] uppercase tracking-[0.35em] text-[#E3C888] font-semibold">
            Juris Standard
          </span>
          <span className="text-white/65 text-[0.85rem]">/</span>
          <span className="text-[0.76rem] uppercase tracking-[0.25em] text-white/80">
            Admin Panel
          </span>
        </div>
        <div className="ml-auto flex items-center gap-5">
          <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-widest text-[#E3C888]">
            <Shield className="w-3 h-3" />
            <span>{auth.email}</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Site
          </Link>
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <aside className="fixed top-14 left-0 bottom-0 w-64 bg-gradient-to-b from-[#1f232b] to-[#14161b] border-r border-white/15 flex flex-col z-40">
          <nav className="flex-1 py-6 px-3">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-white/65 px-3 mb-4 font-semibold">
              Navigation
            </p>
            <div className="flex flex-col gap-1">
              <AdminNavLinks items={navItems} />
            </div>
          </nav>
          <div className="p-3 border-t border-white/15">
            <div className="px-3 py-2">
              <p className="text-[0.72rem] uppercase tracking-widest text-white/65">Juris Standard</p>
              <p className="text-[0.72rem] text-white/65 mt-0.5">Admin Console v2.0</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 min-h-[calc(100vh-56px)] bg-gradient-to-br from-[#1b1e25] via-[#1d2028] to-[#15171c]">
          {children}
        </main>
      </div>
    </div>
  );
}
