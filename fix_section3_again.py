import os

content = """'use client';

import { Compass, PenTool, Search, Scale, Shield, Library, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CrystalIcon } from "./CrystalIcon";
import { motion, AnimatePresence } from "framer-motion";

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
        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
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
        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
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
        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
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
        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
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
        <ul className="list-disc pl-5 space-y-2 text-neutral-400">
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
    <section id="framework" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Premium Slightly Gray Card Wrapper */}
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">3</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 3</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Recognition Framework</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
              <p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">
                The Juris Standard Index follows a structured editorial framework designed to recognise professional excellence through consistency, independence and responsible editorial judgement.
              </p>
              
              <div className="space-y-3">
                {stages.map((stage, index) => {
                  const isActive = activeStage === stage.id;
                  return (
                    <div
                      key={stage.id}
                      className={`group relative border rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
                        isActive 
                          ? 'bg-[#050505] border-gold-500/40 shadow-[0_5px_20px_rgba(212,175,55,0.1)]' 
                          : 'bg-black/20 border-white/5 hover:border-gold-500/20 hover:bg-[#111]/40'
                      }`}
                      onClick={() => setActiveStage(isActive ? null : stage.id)}
                    >
                      {/* Horizontal animated connector line for active state */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-500 ${isActive ? 'bg-gradient-to-b from-gold-400 to-gold-600' : 'bg-transparent'}`} />

                      <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-5">
                          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] group-hover:border-gold-500/40 transition-colors duration-500 relative overflow-hidden">
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gold-500/20 blur-md opacity-100' : 'opacity-0 group-hover:bg-white/10 group-hover:blur-sm group-hover:opacity-100'}`} />
                            <stage.icon className={`w-4 h-4 transition-all duration-500 relative z-10 ${isActive ? 'text-gold-300 drop-shadow-[0_0_12px_rgba(212,175,55,1)] scale-110' : 'text-neutral-300 group-hover:text-gold-100'}`} />
                          </div>
                          <div>
                            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/70 block mb-1">Stage {stage.id}</span>
                            <h3 className={`text-lg md:text-xl font-serif font-light transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80'}`}>
                              {stage.title}
                            </h3>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 ${isActive ? 'rotate-180 text-gold-400' : ''}`} />
                      </div>

                      {isActive && (
                        <div className="px-6 pb-6 pl-[4.75rem]">
                          <p className="text-white/90 font-medium mb-3">{stage.intro}</p>
                          <div className="text-neutral-400 font-light text-sm md:text-[0.95rem] leading-relaxed space-y-3">
                            {stage.content}
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
      </div>
    </section>
  );
}
"""

with open(r'd:\jurisstandard\src\components\methodology\RecognitionFramework.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Section 3 symmetric fix applied.")
