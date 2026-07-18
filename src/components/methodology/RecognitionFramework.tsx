'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Compass, PenTool, Search, Scale, Shield, Library, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CrystalIcon } from "./CrystalIcon";

const stages = [
  {
    id: 1,
    title: "Editorial Submission",
    icon: PenTool,
    intro: "The editorial journey begins with the submission of a professional or institutional profile through the Juris Standard Editorial Submission Portal.",
    content: (
      <div className="space-y-4">
        <p>Applicants provide information relevant to the selected Recognition Programme together with supporting professional information where appropriate.</p>
        <p>The submission process is designed to be structured, efficient and proportionate, requesting only information relevant to editorial consideration.</p>
        <p>Editorial Submission enables the Editorial Office to understand the applicant's professional background, area of practice, institutional profile and relevant supporting material before editorial review begins.</p>
        <p className="text-gold-400 italic">Submission represents the commencement of editorial consideration only and should not be interpreted as recognition or approval.</p>
      </div>
    )
  },
  {
    id: 2,
    title: "Editorial Screening",
    icon: Shield,
    intro: "Following submission, the Editorial Office conducts an initial administrative review.",
    content: (
      <div className="space-y-4">
        <p><strong>Purpose:</strong> To confirm that the submission contains sufficient information for editorial consideration.</p>
        <ul className="list-disc pl-5 space-y-2 text-white/50">
          <li>Proceed to Editorial Research</li>
          <li>Additional Information Requested</li>
          <li>Submission Deferred</li>
        </ul>
        <p>Editorial Screening does not determine recognition. It simply prepares the submission for editorial review.</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Editorial Research",
    icon: Search,
    intro: "Editorial Research seeks to establish a comprehensive understanding of the submitted profile.",
    content: (
      <div className="space-y-4">
        <p>Research may include review of:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/50">
          <li>Professional information provided within the submission.</li>
          <li>Publicly available professional information.</li>
          <li>Professional publications and activities.</li>
          <li>Institutional information.</li>
          <li>Where appropriate, additional information relevant to the Recognition Programme.</li>
        </ul>
        <p>The objective is to support informed editorial judgement.</p>
      </div>
    )
  },
  {
    id: 4,
    title: "Editorial Evaluation",
    icon: Scale,
    intro: "Editorial Evaluation represents the core stage of the recognition process.",
    content: (
      <div className="space-y-4">
        <p>Editors consider the submission within the context of:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/50">
          <li>The specific Recognition Programme</li>
          <li>Published Editorial Principles</li>
          <li>Professional Merit & Institutional Context</li>
          <li>Supporting Information & Editorial Research</li>
        </ul>
        <p>Evaluation is qualitative rather than mechanical. Editorial judgement remains central throughout the process.</p>
      </div>
    )
  },
  {
    id: 5,
    title: "Editorial Decision",
    icon: Shield,
    intro: "Following evaluation, an independent editorial decision is reached.",
    content: (
      <div className="space-y-4">
        <p>Recognition decisions reflect the editorial opinion of Juris Standard based upon information available during the review process.</p>
        <p>Recognition may be:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/50">
          <li>Recognised</li>
          <li>Further Information Requested</li>
          <li>Deferred</li>
          <li>Not Recognised</li>
        </ul>
        <p className="text-gold-400 italic">No explanation of internal deliberations is provided.</p>
      </div>
    )
  },
  {
    id: 6,
    title: "Publication",
    icon: Library,
    intro: "Where recognition is approved, the editorial profile may be published within the relevant Recognition Programme.",
    content: (
      <div className="space-y-4">
        <p>Publication includes:</p>
        <ul className="list-disc pl-5 space-y-2 text-white/50">
          <li>Editorial Profile</li>
          <li>Recognition Category</li>
          <li>Professional Information</li>
          <li>Institutional Information (where applicable)</li>
        </ul>
        <p>Publication does not constitute professional licensing, certification or regulatory approval.</p>
      </div>
    )
  }
];

export function RecognitionFramework() {
  const [activeStage, setActiveStage] = useState<number | null>(1);

  return (
    <section id="framework" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <CrystalIcon icon={Compass} className="mx-auto mb-6" />
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 3</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Recognition Framework</h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto mb-8">
            The Juris Standard Index follows a structured editorial framework designed to recognise professional excellence through consistency, independence and responsible editorial judgement.
          </p>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="space-y-6">
          {stages.map((stage, index) => {
            const isActive = activeStage === stage.id;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative border rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer ${
                  isActive 
                    ? 'bg-[#111]/80 border-gold-500/40 shadow-[0_10px_40px_rgba(212,175,55,0.05)]' 
                    : 'bg-[#0a0a0a]/60 border-white/10 hover:border-gold-500/20 hover:bg-[#111]/40'
                }`}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
              >
                {/* Horizontal animated connector line for active state */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-700 ${isActive ? 'bg-gradient-to-b from-gold-400 to-gold-600' : 'bg-transparent'}`} />

                <div className="px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-inner group-hover:border-gold-500/30 transition-colors duration-500">
                      <stage.icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? 'text-gold-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-white/40'}`} />
                    </div>
                    <div>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/70 block mb-1">Stage {stage.id}</span>
                      <h3 className={`text-xl md:text-2xl font-serif font-light transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 ${isActive ? 'rotate-180 text-gold-400' : ''}`} />
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pl-[6.5rem]">
                        <p className="text-white/80 font-medium mb-4">{stage.intro}</p>
                        <div className="text-white/50 font-light text-sm leading-relaxed space-y-4">
                          {stage.content}
                        </div>
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
