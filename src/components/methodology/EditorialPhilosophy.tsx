import { Landmark, Shield, Sparkles } from "lucide-react";

export function EditorialPhilosophy() {
  return (
    <section id="philosophy" className="relative z-10 scroll-mt-28">
      {/* Connected Section Container */}
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Subtle gold aura */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#CBAA69]/5 blur-[100px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                01
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 01 • FOUNDATIONAL MANDATE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Editorial Philosophy
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/[0.08] bg-black/40 rounded-[2px] self-start sm:self-auto">
            <Shield className="w-3.5 h-3.5 text-[#CBAA69]" />
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/50 font-medium">
              Independent Standard
            </span>
          </div>
        </div>

        {/* Content: Compact 2-Column Editorial Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Statements */}
          <div className="lg:col-span-7 space-y-3.5 text-neutral-300 text-sm md:text-[0.92rem] leading-relaxed font-light">
            <p className="border-l border-[#CBAA69]/40 pl-4 py-0.5 text-white/90">
              Juris Standard was established with a singular objective: to recognise excellence across the legal profession through an independent, rigorous editorial framework.
            </p>
            <p>
              Recognition reflects sustained professional achievement, leadership, technical expertise and institutional contribution rather than commercial visibility or promotional expenditure.
            </p>
            <p>
              The Juris Standard Index preserves the credibility of professional honours by applying unwavering, consistent editorial criteria across every category and submission.
            </p>
            <p className="text-white/50 text-xs">
              * Recognition acknowledges peer distinction and institutional merit; it does not constitute certification, licence or statutory endorsement.
            </p>
          </div>

          {/* Right Column: Compact Luxury Quote Plaque */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 bg-gradient-to-br from-[#120f0a] to-[#050505] border border-[#CBAA69]/25 rounded-[3px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#CBAA69]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#CBAA69]" />
                <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69] font-semibold">
                  Core Axiom
                </span>
              </div>
              <blockquote className="font-serif text-lg sm:text-xl text-white font-light italic leading-snug mb-3">
                &ldquo;Recognition founded on merit. Preserved with integrity.&rdquo;
              </blockquote>
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                The Juris Standard Editorial Board
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
