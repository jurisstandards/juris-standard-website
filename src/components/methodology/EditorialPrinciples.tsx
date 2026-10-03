import { Scale, Award, Shield, BookOpen } from "lucide-react";

const principles = [
  {
    title: "Independence",
    icon: Scale,
    tag: "AUTONOMOUS",
    content: "Editorial decisions remain strictly independent, immune to advertising relationships, commercial visibility, sponsorships or external influence."
  },
  {
    title: "Merit",
    icon: Award,
    tag: "EXCELLENCE",
    content: "Recognition reflects demonstrable professional competence, landmark casework, strategic expertise, innovation and peer contribution."
  },
  {
    title: "Integrity",
    icon: Shield,
    tag: "CONSISTENCY",
    content: "Every candidate profile is assessed with institutional fairness, rigorous objectivity, and identical published editorial metrics."
  },
  {
    title: "Transparency",
    icon: BookOpen,
    tag: "ACCESSIBILITY",
    content: "Juris Standard openly publishes its methodology, evaluation stages, and governance charter to maintain absolute professional trust."
  }
];

export function EditorialPrinciples() {
  return (
    <section id="principles" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Subtle accent glow */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[250px] bg-[#CBAA69]/5 blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                02
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 02 • CORE PILLARS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Editorial Principles
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-xs font-light leading-relaxed">
            Four non-negotiable benchmarks governing every evaluation.
          </p>
        </div>

        {/* 4 Compact Horizontal / Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {principles.map((p, i) => (
            <div
              key={i}
              className="group relative bg-[#060504] border border-white/[0.07] hover:border-[#CBAA69]/40 rounded-[3px] p-5 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Gold hairline indicator on hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CBAA69] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-[2px] bg-[#120f0a] border border-[#CBAA69]/20 flex items-center justify-center group-hover:border-[#CBAA69]/50 group-hover:bg-[#CBAA69]/10 transition-colors">
                    <p.icon className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/60 font-semibold">
                    {p.tag}
                  </span>
                </div>
                
                <h3 className="text-lg font-serif text-white font-light mb-2 group-hover:text-[#CBAA69] transition-colors">
                  {p.title}
                </h3>
                
                <p className="text-neutral-400 text-xs sm:text-[0.82rem] font-light leading-relaxed">
                  {p.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
                <span>Pillar 0{i + 1}</span>
                <span className="text-[#CBAA69]/50">• Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
