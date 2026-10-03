import { Award, Briefcase, GraduationCap, Building2, Lightbulb, TrendingUp, Globe, Clock, BookOpen, AlertCircle } from "lucide-react";

const considerations = [
  {
    id: "01",
    title: "Professional Experience",
    tag: "TENURE",
    icon: Briefcase,
    content: "Consistency, depth, and maturity of active practice demonstrated over sustained multi-year periods."
  },
  {
    id: "02",
    title: "Specialist Expertise",
    tag: "TECHNICAL",
    icon: Award,
    content: "Demonstrated technical capability, subject-matter mastery, and distinction within defined practice areas."
  },
  {
    id: "03",
    title: "Practice Leadership",
    tag: "LEADERSHIP",
    icon: TrendingUp,
    content: "Guiding institutional practice groups, leading major transactions/disputes, and pioneering ethical benchmarks."
  },
  {
    id: "04",
    title: "Civic & Sector Impact",
    tag: "CONTRIBUTION",
    icon: GraduationCap,
    content: "Advancing legal education, regulatory policy, pro bono access, and institutional stewardship."
  },
  {
    id: "05",
    title: "Thought Leadership",
    tag: "SCHOLARSHIP",
    icon: BookOpen,
    content: "Authoring definitive treatises, speaking at global summits, and contributing original jurisprudence."
  },
  {
    id: "06",
    title: "Institutional Maturity",
    tag: "GOVERNANCE",
    icon: Building2,
    content: "Organisational governance, partner retention, succession systems, and institutional development."
  },
  {
    id: "07",
    title: "Innovation & Technology",
    tag: "MODERNISATION",
    icon: Lightbulb,
    content: "Pioneering operational efficiency, automated workflows, legaltech adoption, and forward-looking methods."
  },
  {
    id: "08",
    title: "Cross-Border Calibre",
    tag: "GLOBAL",
    icon: Globe,
    content: "Multijurisdictional advisory, coordination across international forums, and foreign counsel collaboration."
  },
  {
    id: "09",
    title: "Sustained Distinction",
    tag: "LONGEVITY",
    icon: Clock,
    content: "Longitudinal track record of professional standing, avoiding temporary or transactional visibility."
  }
];

export function EditorialConsiderations() {
  return (
    <section id="considerations" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                04
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 04 • EVALUATION CRITERIA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Editorial Considerations
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            Nine holistic qualitative dimensions informing editorial discretion.
          </p>
        </div>

        {/* 3x3 Compact Micro-Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
          {considerations.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#060504] border border-white/[0.07] hover:border-[#CBAA69]/40 rounded-[3px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:bg-[#080706]"
            >
              {/* Subtle top indicator */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#CBAA69]/0 to-transparent group-hover:via-[#CBAA69]/40 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-[2px] bg-[#120f0a] border border-[#CBAA69]/20 flex items-center justify-center group-hover:border-[#CBAA69]/50 transition-colors">
                      <item.icon className="w-3.5 h-3.5 text-[#CBAA69]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[0.5rem] font-mono tracking-[0.2em] text-[#CBAA69]/60">
                      CRITERIA {item.id}
                    </span>
                  </div>
                  <span className="text-[0.48rem] uppercase tracking-[0.18em] text-white/30 font-medium">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm sm:text-[0.95rem] font-serif text-white font-light mb-1.5 group-hover:text-[#CBAA69] transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-[0.8rem] font-light leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Editorial Notice Strip */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#120f0a]/90 via-[#0a0907] to-[#120f0a]/90 border border-[#CBAA69]/20 rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
          <div className="w-7 h-7 rounded-[2px] bg-[#CBAA69]/10 border border-[#CBAA69]/30 flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5 text-[#CBAA69]" />
          </div>
          <p className="text-xs sm:text-[0.8rem] text-white/70 font-light leading-relaxed">
            <strong className="text-white font-medium">Holistic Assessment:</strong> No individual criterion determines recognition. The weighting of each dimension adapts dynamically to the institutional context and specific Recognition Programme.
          </p>
        </div>
      </div>
    </section>
  );
}
