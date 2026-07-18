'use client';

import { motion, AnimatePresence } from "framer-motion";
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
    <section id="faq" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <CrystalIcon icon={MessageSquare} className="mx-auto mb-6" />
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 7</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isActive = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <p className="text-white/60 font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
