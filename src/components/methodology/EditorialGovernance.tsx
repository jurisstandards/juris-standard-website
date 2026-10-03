import { Landmark, Scale, FileCheck, ShieldAlert, Lock, Info, ScrollText } from "lucide-react";

const governanceItems = [
  {
    title: "Institutional Oversight",
    icon: Landmark,
    content: "The Editorial Office centrally administers workflows, candidate screening, profile curation, and compliance with published guidelines."
  },
  {
    title: "Quad-Pillar Standards",
    icon: Scale,
    content: "Every decision adheres to four benchmarks: Independence, Qualitative Consistency, Institutional Integrity, and Public Transparency."
  },
  {
    title: "Profile Administration",
    icon: FileCheck,
    content: "Indexed profiles are maintained as living publications. Factual amendments undergo rigorous verification before archiving."
  },
  {
    title: "Information Veracity",
    icon: Info,
    content: "Applicants hold absolute responsibility for factual accuracy. Misrepresentation leads to immediate exclusion from the Index."
  },
  {
    title: "Editorial Rectification",
    icon: ShieldAlert,
    content: "Clear protocols exist for third-party or subject correction notices, evaluated swiftly by senior editorial ombudsmen."
  },
  {
    title: "Privilege & Discretion",
    icon: Lock,
    content: "Submissions and internal deliberations are treated under strict editorial non-disclosure to protect candidate integrity."
  }
];

export function EditorialGovernance() {
  return (
    <section id="governance" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                06
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 06 • INSTITUTIONAL GOVERNANCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Editorial Governance & Policies
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            Institutional standards safeguarding the credibility and objectivity of the Index.
          </p>
        </div>

        {/* 6 Compact Micro-Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
          {governanceItems.map((item, index) => (
            <div
              key={index}
              className="group bg-[#060504] border border-white/[0.07] hover:border-[#CBAA69]/40 rounded-[3px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:bg-[#080706]"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-[2px] bg-[#120f0a] border border-[#CBAA69]/20 flex items-center justify-center group-hover:border-[#CBAA69]/50 transition-colors">
                    <item.icon className="w-3.5 h-3.5 text-[#CBAA69]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm sm:text-[0.95rem] font-serif text-white font-light group-hover:text-[#CBAA69] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-neutral-400 text-xs sm:text-[0.8rem] font-light leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Editorial Charter Plaque */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-[#120f0a] via-[#080705] to-[#040404] border border-[#CBAA69]/30 rounded-[3px] overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CBAA69]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <ScrollText className="w-4 h-4 text-[#CBAA69]" />
                <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69] font-bold">
                  The Juris Standard Editorial Charter
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-light mb-3">
                Uncompromising Commitment to Legal Excellence
              </h3>
              <p className="text-neutral-300 text-xs sm:text-[0.85rem] font-light leading-relaxed">
                Juris Standard is dedicated to recognizing peer distinction through an independent editorial mechanism founded on qualitative integrity, meticulous research, and transparency. Recognition reflects an autonomous editorial opinion that serves the global legal profession with lasting credibility.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-8 text-left md:text-right">
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69] font-serif font-bold block mb-1">
                ADOPTED BY EDITORIAL COUNCIL
              </span>
              <span className="text-xs text-white/50 font-mono">
                JS-DOC-EDG-2027
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
