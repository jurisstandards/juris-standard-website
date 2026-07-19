import { Landmark } from "lucide-react";
import { CrystalIcon } from "./CrystalIcon";

export function EditorialPhilosophy() {
  return (
    <section id="philosophy" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          {/* Subtle top glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">1</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 1</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Editorial Philosophy</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">

          <div className="space-y-3 text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">
            <p>
              Juris Standard was established with a singular objective: to recognise excellence across the legal profession through an independent editorial framework.
            </p>
            <p>
              Recognition should reflect sustained professional achievement, leadership, expertise and contribution rather than commercial visibility or promotional activity.
            </p>
            <p>
              The Juris Standard Index seeks to preserve the credibility of professional recognition by applying consistent editorial standards across every programme and every submission.
            </p>
            <p>
              Recognition within the Index is intended to acknowledge professional distinction and institutional excellence. It is not a certification, licence or regulatory approval.
            </p>
          </div>

          <div className="relative border-l-[3px] border-gold-500/60 pl-6 py-3 mt-6 group-hover:border-gold-400 transition-colors duration-500 bg-gradient-to-r from-gold-500/10 to-transparent rounded-r-lg">
            <p className="font-serif text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 italic leading-snug drop-shadow-sm">
              "Recognition founded on merit. Preserved with integrity."
            </p>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
