import os
import re

# 1. Restore RecognitionFramework.tsx with the old design but with highlighted icons and premium gray wrapper

s3_content = """'use client';

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
    <section id="framework" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 3</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Recognition Framework</h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto mb-8">
            The Juris Standard Index follows a structured editorial framework designed to recognise professional excellence through consistency, independence and responsible editorial judgement.
          </p>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="space-y-3">
          {stages.map((stage, index) => {
            const isActive = activeStage === stage.id;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] group-hover:border-gold-500/40 transition-all duration-500 relative overflow-hidden">
                      <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gold-500/20 blur-md opacity-100' : 'opacity-0 group-hover:bg-white/10 group-hover:blur-sm group-hover:opacity-100'}`} />
                      <stage.icon className={`w-5 h-5 transition-all duration-500 relative z-10 ${isActive ? 'text-gold-300 drop-shadow-[0_0_12px_rgba(212,175,55,1)] scale-110' : 'text-neutral-300 group-hover:text-gold-100'}`} />
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

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 pb-8 pl-[6.5rem]">
                        <p className="text-white/80 font-medium mb-4">{stage.intro}</p>
                        <div className="text-neutral-400 font-light text-sm leading-relaxed space-y-4">
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
      </div>
    </section>
  );
}
"""

with open(r'd:\jurisstandard\src\components\methodology\RecognitionFramework.tsx', 'w', encoding='utf-8') as f:
    f.write(s3_content)


# 2. Update the buttons in EditorialOffice.tsx to be much more premium
filepath_eo = r'd:\jurisstandard\src\components\methodology\EditorialOffice.tsx'
with open(filepath_eo, 'r', encoding='utf-8') as f:
    content_eo = f.read()

new_buttons = r'''<div className="flex flex-col sm:flex-row items-center justify-center gap-6 shrink-0 w-full md:w-auto mt-6 md:mt-0">
            <Link
              href="/enter-the-index"
              className="group/btn relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-gold-500/30 text-gold-400 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-200 transition-all duration-500 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                Enter the Index
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button
              onClick={() => {
                document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group/btn2 relative inline-flex items-center justify-center px-10 py-5 bg-[#0a0a0a] border border-white/10 text-white/70 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.2em] rounded-none hover:border-white/30 hover:text-white transition-all duration-500 w-full sm:w-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Explore Programmes</span>
            </button>
          </div>'''

content_eo = re.sub(
    r'<div className="flex flex-col sm:flex-row items-center justify-center gap-4 shrink-0 w-full md:w-auto">.*?</div>',
    new_buttons,
    content_eo,
    flags=re.DOTALL
)

with open(filepath_eo, 'w', encoding='utf-8') as f:
    f.write(content_eo)


# 3. Add Newsletter and Footer to Methodology Page
filepath_mp = r'd:\jurisstandard\src\app\methodology\page.tsx'
with open(filepath_mp, 'r', encoding='utf-8') as f:
    content_mp = f.read()

# Instead of just <Footer />, we inject the newsletter section right before it.
newsletter_html = r'''
      {/* Newsletter Section */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden z-10 w-full">
         <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-black pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(197,160,89,0.1)_0%,_transparent_60%)] pointer-events-none" />
         
         <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col lg:flex-row items-center justify-between">
           <div className="max-w-2xl mb-12 lg:mb-0 text-center lg:text-left">
             <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-wide mb-4 drop-shadow-sm font-light">
               Stay Ahead.<br />Stay Influential.
             </h2>
             <p className="text-neutral-400 font-light text-base max-w-md mx-auto lg:mx-0">
               Subscribe to our exclusive intelligence updates and gain the competitive edge.
             </p>
           </div>
           
           <div className="w-full lg:w-auto flex-1 max-w-lg flex flex-col sm:flex-row gap-0 rounded-[1px] bg-transparent border border-white/10 overflow-hidden transition-all duration-200 hover:border-gold-500/30 focus-within:border-gold-500/50">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 bg-transparent border-none px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all"
               suppressHydrationWarning
             />
             <button 
               className="bg-gold-500/10 text-gold-300 font-normal text-[13px] px-8 py-3 hover:bg-gold-500/20 hover:text-gold-200 transition-colors border-l border-white/10"
               suppressHydrationWarning
             >
               Subscribe
             </button>
           </div>
         </div>
      </section>
      
      <Footer />
'''

content_mp = content_mp.replace('<Footer />', newsletter_html)
with open(filepath_mp, 'w', encoding='utf-8') as f:
    f.write(content_mp)

print("Fixes applied successfully.")
