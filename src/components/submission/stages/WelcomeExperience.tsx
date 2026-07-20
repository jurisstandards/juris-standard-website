"use client";

import { useSubmissionStore } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Milestone, BookOpen, ChevronRight, Gem, Crown, TrendingUp, Zap, Megaphone, Award, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { IndexCard } from "@/components/ui/IndexCard";

export function WelcomeExperience() {
  const { setStage, isNavigatingBack } = useSubmissionStore();
  const [showIndex, setShowIndex] = useState(false);
  const indexRef = useRef<HTMLDivElement>(null);

  const handleExploreIndex = () => {
    setShowIndex(true);
    // Scroll immediately so the user sees the section fading in while scrolling down
    setTimeout(() => {
      if (indexRef.current) {
        const top = indexRef.current.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 10);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen relative z-10">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <div className="w-full flex-1 flex items-center px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-16 relative">

        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,175,55,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(212,175,55,0.04)_0%,transparent_55%)] pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Content ─────────────────── */}
          <motion.div
            initial={isNavigatingBack ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-left pt-4"
          >
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.3em] text-neutral-500 font-semibold mb-10">
              <span>Estimated Time: 5–7 Minutes</span>
              <span className="w-1 h-1 rounded-full bg-gold-500/30 hidden md:block" />
              <span>Auto Saved</span>
              <span className="w-1 h-1 rounded-full bg-gold-500/30 hidden md:block" />
              <span>Private &amp; Confidential</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-serif uppercase tracking-wide mb-6 font-light leading-[1.1]">
              <span className="text-white block">Welcome to the</span>
              <span className="text-gold-400 drop-shadow-[0_4px_20px_rgba(212,175,55,0.2)] block mt-2">
                Juris Standard Index
              </span>
            </h2>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-gold-500/60 to-transparent mb-8" />

            {/* Description */}
            <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl">
              The Juris Standard Index is an editorial institution dedicated to recognising excellence across the legal profession. This experience has been carefully designed to understand your professional journey through a structured editorial process.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={isNavigatingBack ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* PRIMARY: Continue Journey */}
              <button
                onClick={() => setStage("track_selection")}
                className="group relative inline-flex items-center justify-center px-10 py-4 bg-gold-500/10 border border-gold-500/40 text-gold-300 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.3em] rounded-sm transition-all duration-300 hover:bg-gold-500/20 hover:border-gold-400 hover:text-gold-200 shadow-[0_0_25px_rgba(212,175,55,0.12)] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]"
              >
                Continue Journey
                <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* SECONDARY: Explore the Index */}
              <button
                onClick={handleExploreIndex}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/10 text-white/50 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-sm transition-all duration-300 hover:border-white/25 hover:text-white/80"
              >
                Explore the Index
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform opacity-60" />
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Cards column ─────────────── */}
          <div className="flex flex-col gap-4">
            {/* Go Back — top-right above first card */}
            <div className="flex justify-end">
              <a
                href="/"
                className="group flex items-center gap-2 px-4 py-2 border border-white/[0.07] rounded-sm text-white/30 hover:text-white/65 hover:border-white/20 text-[0.6rem] uppercase tracking-[0.2em] font-semibold transition-all duration-200"
              >
                <ChevronRight className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                Go Back
              </a>
            </div>

            {/* Info Cards */}
            {[
              {
                title: "Editorial Independence",
                icon: Scale,
                desc: "Every submission is independently assessed against published editorial standards.",
              },
              {
                title: "Recognition Journey",
                icon: Milestone,
                desc: "Your submission progresses through structured editorial stages before any recognition decision.",
              },
              {
                title: "Institutional Record",
                icon: BookOpen,
                desc: "Recognised professionals become part of the permanent Juris Standard institutional record.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] hover:border-gold-500/25 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                style={{ background: "linear-gradient(135deg, #161616 0%, #0c0c0c 100%)" }}
              >
                {/* Top gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex items-start gap-6 p-7 lg:p-8">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-b from-[#1e1e1e] to-[#111] border border-white/[0.07] group-hover:border-gold-500/25 transition-all duration-400 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gold-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <card.icon className="w-6 h-6 text-gold-400/70 group-hover:text-gold-400 relative z-10 transition-colors duration-300" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base lg:text-lg font-serif text-white/90 mb-2 group-hover:text-white transition-colors duration-300 leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed group-hover:text-neutral-400 transition-colors duration-300">
                      {card.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-500/30 group-hover:bg-gold-500/5 transition-all duration-300 mt-1">
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPLORE THE INDEX SECTION ─────────────────────────────────── */}
      {/* Always in DOM to avoid layout shift during scroll — visibility controlled by showIndex */}
      <div
        ref={indexRef}
        aria-hidden={!showIndex}
        style={{ display: showIndex ? "block" : "none" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={showIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full px-8 md:px-16 lg:px-24 xl:px-32 py-16 relative"
        >
              {/* Section ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

              <div className="w-full max-w-[1600px] mx-auto">
                {/* Section header */}
                <div className="flex items-start justify-between mb-10 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-400/60 font-semibold">Institutional Record</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide leading-tight">
                      The Juris Standard Index
                    </h3>
                    <p className="text-neutral-500 text-sm mt-2 font-light">
                      A research-driven institutional record of legal excellence.
                    </p>
                  </div>
                  <a
                    href="/juris-index"
                    className="flex-shrink-0 group flex items-center gap-2 text-white/40 hover:text-white/80 text-[0.65rem] uppercase tracking-[0.2em] font-semibold border border-white/10 hover:border-white/25 px-5 py-3 rounded-sm transition-all duration-200"
                  >
                    View All Indexes
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* 6 Index Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {[
                    { delay: 0, category: "Corporate", title: "Elite", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><Gem className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                    { delay: 100, category: "Litigation", title: "Masters", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><Scale className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                    { delay: 200, category: "Arbitration", title: "Leaders", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><Crown className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                    { delay: 300, category: "Law Firm", title: "Rankings", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><TrendingUp className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                    { delay: 400, category: "General Counsel", title: "Power List", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><Zap className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                    { delay: 500, category: "Global", title: "Influencers", icon: <div className="relative flex items-center justify-center w-20 h-20"><div className="absolute inset-0 bg-gold-500/5 rounded-full blur-xl group-hover:bg-gold-400/15 transition-colors duration-700" /><Megaphone className="w-10 h-10 text-gold-400/90 drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] stroke-[1.5px] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700" /></div> },
                  ].map((card) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + card.delay / 1000 }}
                    >
                      <IndexCard
                        delay={card.delay}
                        category={card.category}
                        title={card.title}
                        href="/juris-index"
                        icon={card.icon}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
      </div>

    </div>
  );
}
