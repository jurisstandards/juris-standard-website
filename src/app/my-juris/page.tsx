"use client";

import Link from "next/link";
import { Trophy, Bookmark, Clock, User, ArrowRight } from "lucide-react";

const CARDS = [
  {
    icon: Trophy,
    title: "MY RECORDS",
    desc: "Your official Juris Standard recognitions.",
    href: "/my-juris/records",
  },
  {
    icon: Bookmark,
    title: "MY SHORTLIST",
    desc: "Your saved records.",
    href: "/my-juris/shortlist",
  },
  {
    icon: Clock,
    title: "RECENTLY VIEWED",
    desc: "Return to your recently explored records.",
    href: "/my-juris/recently-viewed",
  },
  {
    icon: User,
    title: "MY ACCOUNT",
    desc: "Manage your account settings.",
    href: "/my-juris/account",
  },
];

export default function MyJurisOverviewPage() {
  return (
    <div className="flex flex-col h-full bg-[#070503]">
      {/* ── COMPACT HERO ── */}
      <section className="relative flex flex-col md:flex-row justify-between items-center px-10 xl:px-14 py-12 border-b border-[#CBAA69]/10 shrink-0">
        <div className="relative z-10 flex flex-col">
          <p className="text-[0.55rem] uppercase tracking-[0.4em] text-[#CBAA69]/80 mb-3 font-medium">
            WELCOME BACK
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide drop-shadow-sm">
            MY JURIS<sup className="text-[0.35em] ml-1 text-[#CBAA69]/70">™</sup>
          </h1>
        </div>

        <div className="relative z-10 hidden md:block text-right border-r-[1.5px] border-[#CBAA69]/40 pr-6">
          <blockquote className="font-serif text-xl md:text-2xl text-white/70 italic font-light leading-tight tracking-wide">
            &ldquo;Recognised today. A stronger tomorrow.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── COMPACT 4 CARDS GRID ── */}
      <section className="p-10 xl:p-14 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
          {CARDS.map(({ icon: Icon, title, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex items-center justify-between p-8 border border-[#CBAA69]/15 bg-[#0a0805] hover:border-[#CBAA69]/40 hover:bg-[#0c0a06] transition-all duration-300 rounded-[2px]"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-full border border-[#CBAA69]/20 bg-transparent flex items-center justify-center shrink-0 group-hover:bg-[#CBAA69]/[0.03] transition-colors">
                  <Icon className="w-5 h-5 text-[#CBAA69]/80 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.2} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/90 group-hover:text-white transition-colors">
                    {title}
                  </h2>
                  <p className="text-[0.65rem] text-white/50 group-hover:text-white/70 transition-colors font-light">
                    {desc}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#CBAA69]/30 group-hover:text-[#CBAA69] group-hover:translate-x-1 transition-all duration-300 relative z-10" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── THIN BOTTOM BANNER ── */}
      <section className="px-10 xl:px-14 pb-10 mt-auto shrink-0">
        <div className="relative w-full border border-[#CBAA69]/15 bg-[#0a0805] px-8 py-5 flex items-center justify-between rounded-[2px]">
          <p className="text-[0.55rem] uppercase tracking-[0.3em] text-white/60 font-medium">
            EXCELLENCE LIVES LONGER <span className="text-[#CBAA69]/40 mx-4 font-light">|</span> WHEN IT IS RECOGNISED.
          </p>
          <p className="text-[0.5rem] uppercase tracking-[0.25em] text-[#CBAA69]/80 font-serif font-medium hidden lg:block">
            THE JURIS STANDARD™
          </p>
        </div>
      </section>
    </div>
  );
}
