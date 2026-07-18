'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, GraduationCap, Building2, Lightbulb, TrendingUp, Globe, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CrystalIcon } from "./CrystalIcon";

const considerations = [
  {
    id: 1,
    title: "Professional Experience",
    icon: Briefcase,
    content: "The consistency, depth and maturity of professional practice over a sustained period."
  },
  {
    id: 2,
    title: "Professional Expertise",
    icon: Award,
    content: "Demonstrated capability, specialised knowledge and technical excellence within distinct legal disciplines."
  },
  {
    id: 3,
    title: "Leadership",
    icon: TrendingUp,
    content: "Leadership demonstrated within professional practice, institutional governance, legal teams or the broader legal profession."
  },
  {
    id: 4,
    title: "Professional Contribution",
    icon: GraduationCap,
    content: "Contribution towards legal education, research, institutional development, public policy or the overall advancement of the profession."
  },
  {
    id: 5,
    title: "Thought Leadership",
    icon: BookOpen,
    content: "Publications, academic contribution, professional speaking engagements, legal writing and knowledge development."
  },
  {
    id: 6,
    title: "Institutional Development",
    icon: Building2,
    content: "Applicable primarily to Law Firms, Legal Media and Legal Innovation. Considers organisational growth, governance, professional standards and institutional maturity."
  },
  {
    id: 7,
    title: "Innovation",
    icon: Lightbulb,
    content: "Development of new ideas, legal technology, professional systems, operational excellence or research."
  },
  {
    id: 8,
    title: "Cross-Border Engagement",
    icon: Globe,
    content: "Where relevant: International practice, cross-border matters, engagement with international institutions and global collaboration."
  },
  {
    id: 9,
    title: "Long-Term Contribution",
    icon: Clock,
    content: "Sustained professional contribution over time rather than isolated or temporary achievement."
  }
];

import { BookOpen } from "lucide-react";

export function EditorialConsiderations() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section id="considerations" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <CrystalIcon icon={Award} className="mx-auto mb-6" />
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 4</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Editorial Considerations</h2>
          <p className="text-white/50 text-lg font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            Different Recognition Programmes require different editorial perspectives. Accordingly, editorial consideration is holistic rather than formulaic. No individual factor determines recognition. Instead, editors consider the overall professional profile within the context of the relevant Recognition Programme.
          </p>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {considerations.map((item, index) => {
            const isActive = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-[#0a0a0a]/60 backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'border-gold-500/40 shadow-[0_10px_30px_rgba(212,175,55,0.1)]' 
                    : 'border-white/10 hover:border-gold-500/30'
                }`}
                onClick={() => setOpenId(isActive ? null : item.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <item.icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? 'text-gold-400' : 'text-white/40'}`} />
                    <h3 className={`font-serif text-lg transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-500 ${isActive ? 'rotate-180 text-gold-400' : ''}`} />
                </div>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-white/50 text-sm font-light leading-relaxed pt-2 border-t border-white/5">
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial Notice Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-[#111]/80 backdrop-blur-xl border border-gold-500/30 rounded-[2rem] p-8 md:p-12 shadow-[inset_0_0_40px_rgba(212,175,55,0.05),0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Editorial Notice</span>
          <p className="text-white/70 font-light leading-relaxed md:text-lg">
            Editorial Considerations provide guidance regarding the broader themes that may inform editorial review. The relative importance of individual considerations varies according to the Recognition Programme and institutional context. Editorial judgement remains independent and holistic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
