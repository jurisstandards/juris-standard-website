import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { CrystalIcon } from "./CrystalIcon";

export function EditorialPhilosophy() {
  return (
    <section id="philosophy" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 hover:border-gold-500/30 transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-400/50 transition-all duration-1000" />
          
          <div className="flex items-center space-x-6 mb-10 border-b border-white/5 pb-8">
            <CrystalIcon icon={Landmark} />
            <div>
              <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-2">Section 1</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white font-light tracking-tight">Editorial Philosophy</h2>
            </div>
          </div>

          <div className="space-y-6 text-white/60 font-light leading-relaxed md:text-lg mb-16">
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

          <div className="relative border-l-2 border-gold-500/40 pl-8 py-2 group-hover:border-gold-400 transition-colors duration-1000">
            <p className="font-serif text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 italic leading-snug drop-shadow-sm">
              "Recognition founded on merit. Preserved with integrity."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
