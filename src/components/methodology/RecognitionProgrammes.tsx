'use client';

import { Building2, Award, Scale, Sparkles, Star, Cpu, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const programmes = [
  {
    id: 'law-firms',
    title: "Law Firm Excellence™",
    tag: "INSTITUTIONAL",
    icon: Building2,
    target: "Law Firms & Institutions",
    desc: "Recognising premier law firms demonstrating institutional excellence, multidisciplinary capability, and governance standards.",
    areas: ["Full-Service Practice", "Boutique Excellence", "Corporate & M&A", "Banking & Finance", "Dispute Resolution"],
    href: "/juris-index/law-firms"
  },
  {
    id: 'corporate-elite',
    title: "Corporate Elite™",
    tag: "CORPORATE COUNSEL",
    icon: Award,
    target: "In-House & General Counsel",
    desc: "Honouring distinguished in-house legal leaders, general counsel, and corporate directors navigating commercial complexities.",
    areas: ["General Counsel", "Corporate Governance", "M&A & Private Equity", "Regulatory Compliance", "Capital Markets"],
    href: "/juris-index/professionals/corporate-elite"
  },
  {
    id: 'litigation-masters',
    title: "Litigation Masters™",
    tag: "DISPUTE RESOLUTION",
    icon: Scale,
    target: "Advocates & Trial Counsel",
    desc: "Acknowledging standout advocates, courtroom litigators, and arbitration masters shaping landmark jurisprudence and outcomes.",
    areas: ["Commercial Litigation", "International Arbitration", "Constitutional Law", "Appellate Practice", "Insolvency"],
    href: "/juris-index/professionals/litigation-masters"
  },
  {
    id: 'women-leaders',
    title: "Women Leaders™",
    tag: "DISTINGUISHED COUNSEL",
    icon: Sparkles,
    target: "Trailblazing Female Practitioners",
    desc: "Celebrating outstanding female managing partners, general counsel, and senior practitioners driving institutional excellence.",
    areas: ["Managing Partners", "Senior Corporate Counsel", "Specialist Practice Heads", "Strategic Leadership", "Dealmakers"],
    href: "/juris-index/professionals/women-leaders"
  },
  {
    id: 'future-leaders',
    title: "Future Leaders™",
    tag: "RISING STARS (UNDER 40)",
    icon: Star,
    target: "Next-Gen Partners & Counsel",
    desc: "Recognising the next generation of legal talent demonstrating peer distinction, high velocity casework, and leadership potential.",
    areas: ["Emerging Partners", "Corporate Specialists", "Dispute Innovators", "Cross-Border Counsel", "Sector Pioneers"],
    href: "/juris-index/professionals/future-leaders"
  },
  {
    id: 'legal-innovation',
    title: "Legal Innovation Excellence™",
    tag: "LEGALTECH & AI",
    icon: Cpu,
    target: "Tech Organisations & Innovators",
    desc: "Acknowledging organisations, technologies, and visionary operations modernising workflows, artificial intelligence, and service delivery.",
    areas: ["Legal Artificial Intelligence", "Workflow Automation", "Contract Intelligence", "RegTech", "Practice Systems"],
    href: "/juris-index/legal-innovation"
  }
];

export function RecognitionProgrammes() {
  return (
    <section id="programmes" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Subtle accent glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#CBAA69]/5 blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                05
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 05 • RECOGNITION PROGRAMMES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Recognition Programmes
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            The six definitive recognition tracks comprising the Juris Standard Index.
          </p>
        </div>

        {/* 6 Compact, Symmetrical High-Impact Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {programmes.map((prog, index) => (
            <div
              key={prog.id}
              className="group relative bg-[#060504] border border-white/[0.07] hover:border-[#CBAA69]/40 rounded-[3px] p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between hover:bg-[#080706] shadow-md hover:shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle top indicator on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CBAA69] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-[2px] bg-[#120f0a] border border-[#CBAA69]/25 flex items-center justify-center group-hover:border-[#CBAA69]/60 group-hover:bg-[#CBAA69]/10 transition-colors">
                    <prog.icon className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[0.48rem] uppercase tracking-[0.2em] text-[#CBAA69]/80 font-semibold px-2 py-0.5 border border-[#CBAA69]/20 bg-[#CBAA69]/5 rounded-[2px]">
                    {prog.tag}
                  </span>
                </div>

                {/* Target Audience */}
                <span className="block text-[0.55rem] uppercase tracking-[0.15em] text-white/40 mb-1 font-mono">
                  {prog.target}
                </span>

                {/* Title */}
                <h3 className="text-lg font-serif text-white font-light mb-2.5 group-hover:text-[#CBAA69] transition-colors leading-snug">
                  {prog.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 text-xs sm:text-[0.82rem] font-light leading-relaxed mb-4">
                  {prog.desc}
                </p>

                {/* Area Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {prog.areas.map((area, aIdx) => (
                    <span
                      key={aIdx}
                      className="px-2 py-0.5 text-[0.52rem] uppercase tracking-[0.1em] text-white/60 bg-white/[0.03] border border-white/[0.05] rounded-[2px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <Link
                  href={prog.href}
                  className="inline-flex items-center text-[0.6rem] uppercase tracking-[0.18em] text-[#CBAA69] hover:text-white transition-colors font-medium group/link"
                >
                  <span>Explore Index</span>
                  <ArrowRight className="w-3 h-3 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/enter-the-index"
                  className="text-[0.55rem] uppercase tracking-[0.15em] text-white/35 hover:text-white/80 transition-colors"
                >
                  Apply &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
