'use client';

import { PenTool, Shield, Search, Scale, Award, Library, ChevronDown } from "lucide-react";
import { useState } from "react";

const stages = [
  {
    id: 1,
    title: "Editorial Submission",
    icon: PenTool,
    intro: "Structured profile submission via the Juris Standard Portal detailing practice scope and credentials.",
    details: [
      "Applicants supply structured information aligned with their designated Recognition Programme.",
      "Strictly proportionate inquiry collecting core institutional, practice and casework data.",
      "Marks the initiation of independent editorial consideration (does not imply recognition)."
    ]
  },
  {
    id: 2,
    title: "Editorial Screening",
    icon: Shield,
    intro: "Preliminary compliance and administrative review to confirm eligibility and completeness.",
    details: [
      "Verification that submitted documentation fulfills jurisdictional and practice benchmarks.",
      "Outcomes: Proceed to Editorial Research, Request Supplementary Info, or Submission Deferred.",
      "Screening acts as an administrative gateway ensuring high data accuracy before deep evaluation."
    ]
  },
  {
    id: 3,
    title: "Editorial Research",
    icon: Search,
    intro: "Objective background analysis combining provided materials with publicly available peer data.",
    details: [
      "In-depth review of public legal records, verified achievements, and institutional stature.",
      "Cross-referencing legal publications, precedent decisions, and market intelligence.",
      "Provides qualitative evidentiary grounding for subsequent editorial deliberation."
    ]
  },
  {
    id: 4,
    title: "Editorial Evaluation",
    icon: Scale,
    intro: "Rigorous qualitative assessment by the Editorial Board against published criteria.",
    details: [
      "Holistic analysis against the specific Programme guidelines and Core Principles.",
      "Deliberate qualitative assessment rather than automated algorithms or commercial metrics.",
      "Focus on demonstrated legal expertise, leadership impact, and professional distinction."
    ]
  },
  {
    id: 5,
    title: "Editorial Decision",
    icon: Award,
    intro: "Definitive independent determination reached by the editorial committee.",
    details: [
      "Possible determinations: Recognised, Information Requested, Deferred, or Not Recognised.",
      "All decisions reflect solely the editorial opinion of Juris Standard.",
      "Maintains strict independence; internal deliberations remain confidential to safeguard autonomy."
    ]
  },
  {
    id: 6,
    title: "Official Publication",
    icon: Library,
    intro: "Formal archiving and issuance within the verified Juris Standard Index repository.",
    details: [
      "Publication of verified editorial profile, official recognition category, and tier status.",
      "Issuance of permanent Record ID, digital certificate credentials, and vault listing.",
      "Ongoing periodic review to ensure continuing accuracy and relevance across annual editions."
    ]
  }
];

export function RecognitionFramework() {
  const [activeStage, setActiveStage] = useState<number | null>(1);

  return (
    <section id="framework" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Ambient glow */}
        <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-[#CBAA69]/5 blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                03
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 03 • PROGRESSION TIMELINE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Recognition Framework
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            A structured 6-stage continuum from submission to official publication.
          </p>
        </div>

        {/* Horizontal Mini Progression Tracker (Compact Breadcrumb) */}
        <div className="hidden lg:grid grid-cols-6 gap-2 mb-8 p-2 bg-[#050504] border border-white/[0.06] rounded-[2px]">
          {stages.map((st) => {
            const isSelected = activeStage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStage(st.id)}
                className={`py-2 px-3 text-left transition-all duration-300 rounded-[2px] border ${
                  isSelected
                    ? "bg-[#CBAA69]/15 border-[#CBAA69]/50 text-white shadow-sm"
                    : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
                }`}
              >
                <span className={`block text-[0.5rem] uppercase tracking-[0.2em] font-mono ${isSelected ? 'text-[#CBAA69]' : 'text-white/30'}`}>
                  STAGE 0{st.id}
                </span>
                <span className="block text-[0.68rem] font-serif truncate mt-0.5">
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Connected Vertical Pipeline / Compact Cards */}
        <div className="relative space-y-3">
          {/* Subtle vertical connector spine */}
          <div className="absolute left-[27px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-[#CBAA69]/30 via-white/10 to-[#CBAA69]/30 hidden sm:block pointer-events-none" />

          {stages.map((st) => {
            const isActive = activeStage === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStage(isActive ? null : st.id)}
                className={`group relative rounded-[3px] border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-[#060504] border-[#CBAA69]/40 shadow-[0_5px_20px_rgba(0,0,0,0.6)]"
                    : "bg-[#060504]/50 border-white/[0.06] hover:border-white/20 hover:bg-[#070605]"
                }`}
              >
                {/* Active Gold Left Indicator */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors ${
                    isActive ? "bg-[#CBAA69]" : "bg-transparent"
                  }`}
                />

                <div className="p-4 sm:px-6 sm:py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    {/* Stage icon bubble */}
                    <div
                      className={`w-9 h-9 shrink-0 rounded-[2px] border flex items-center justify-center transition-colors relative z-10 ${
                        isActive
                          ? "bg-[#CBAA69]/20 border-[#CBAA69] text-[#CBAA69]"
                          : "bg-black/60 border-white/10 text-white/40 group-hover:text-white/80 group-hover:border-white/20"
                      }`}
                    >
                      <st.icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>

                    {/* Stage Title and Summary */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[0.5rem] font-mono tracking-[0.2em] uppercase text-[#CBAA69]">
                          Stage 0{st.id}
                        </span>
                        <span className="text-white/20 text-xs hidden sm:inline">•</span>
                        <h3
                          className={`text-sm sm:text-base font-serif font-light truncate ${
                            isActive ? "text-white font-normal" : "text-white/85"
                          }`}
                        >
                          {st.title}
                        </h3>
                      </div>
                      <p className="text-xs text-white/50 font-light truncate hidden sm:block">
                        {st.intro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[0.55rem] uppercase tracking-[0.15em] text-[#CBAA69]/70 hidden md:inline">
                      {isActive ? "Collapse" : "Details"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                        isActive ? "rotate-180 text-[#CBAA69]" : "group-hover:text-white"
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isActive && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-5 sm:pl-[70px] pt-1 border-t border-white/[0.04]">
                    <p className="text-xs sm:text-[0.82rem] text-white/80 font-normal mb-3 sm:hidden">
                      {st.intro}
                    </p>
                    <ul className="space-y-2 text-xs sm:text-[0.82rem] text-neutral-300 font-light leading-relaxed">
                      {st.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#CBAA69] mt-1.5 shrink-0 opacity-80" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
