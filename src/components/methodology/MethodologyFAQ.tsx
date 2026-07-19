'use client';

import { MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CrystalIcon } from "./CrystalIcon";

const faqs = [
  {
    q: "What is the Juris Standard Index?",
    a: "The Juris Standard Index is an independent editorial publication recognising professional excellence across the legal profession through structured editorial assessment."
  },
  {
    q: "Does submission guarantee recognition?",
    a: "No. Submission begins the editorial review process. Recognition is determined solely through independent editorial assessment."
  },
  {
    q: "May I submit more than one Recognition Programme?",
    a: "Yes. Separate editorial submissions may be made where appropriate. Each programme is reviewed independently."
  },
  {
    q: "Can additional information be requested?",
    a: "Yes. Where necessary, the Editorial Office may request additional information to assist editorial review."
  },
  {
    q: "How long does editorial review usually take?",
    a: "Review timelines vary depending upon the Recognition Programme and editorial workload. Estimated timelines are displayed during the Editorial Submission process."
  },
  {
    q: "Can recognised profiles be updated?",
    a: "Yes. Recognised profiles may be reviewed periodically to maintain accuracy."
  },
  {
    q: "Does recognition expire?",
    a: "Editorial profiles may be reviewed and updated over time to ensure continued relevance and accuracy."
  },
  {
    q: "How can I contact the Editorial Office?",
    a: "Editorial contact information is available in the Editorial Office section below."
  }
];

export function MethodologyFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">7</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 7</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Frequently Asked Questions</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
          
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = openIndex === index;
            return (
              <div
                key={index}
                className={`group border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? 'bg-[#111]/80 border-gold-500/40 shadow-[0_10px_40px_rgba(212,175,55,0.05)]' 
                    : 'bg-[#0a0a0a]/60 border-white/10 hover:border-gold-500/30'
                }`}
                onClick={() => setOpenIndex(isActive ? null : index)}
              >
                <div className="px-8 py-6 flex items-center justify-between">
                  <h3 className={`font-serif text-lg transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80'}`}>
                    {faq.q}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 shrink-0 ml-6 ${isActive ? 'rotate-180 text-gold-400' : ''}`} />
                </div>
                
                
                  {isActive && (
                    <div
                      >
                      <div className="px-8 pb-8 pt-2">
                        <p className="text-neutral-300 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  )}
                
              </div>
            );
          })}
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
