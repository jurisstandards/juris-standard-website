'use client';

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
    <section id="considerations" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">4</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 4</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Editorial Considerations</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
          <p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">
            Different Recognition Programmes require different editorial perspectives. Accordingly, editorial consideration is holistic rather than formulaic. No individual factor determines recognition. Instead, editors consider the overall professional profile within the context of the relevant Recognition Programme.
          </p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {considerations.map((item, index) => {
            const isActive = openId === item.id;
            return (
              <div
                key={item.id}
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
                
                
                  {isActive && (
                    <div
                      >
                      <p className="text-neutral-400 text-sm font-light leading-relaxed pt-2 border-t border-white/5">
                        {item.content}
                      </p>
                    </div>
                  )}
                
              </div>
            );
          })}
        </div>

        {/* Editorial Notice Panel */}
        <div
          className="bg-[#111]/80 backdrop-blur-xl border border-gold-500/30 rounded-[2rem] p-8 md:p-12 shadow-[inset_0_0_40px_rgba(212,175,55,0.05),0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Editorial Notice</span>
          <p className="text-white/70 font-light leading-relaxed md:text-lg">
            Editorial Considerations provide guidance regarding the broader themes that may inform editorial review. The relative importance of individual considerations varies according to the Recognition Programme and institutional context. Editorial judgement remains independent and holistic.
          </p>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
