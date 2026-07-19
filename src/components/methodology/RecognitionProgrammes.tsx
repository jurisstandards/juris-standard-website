'use client';

import { Landmark, Scale, Newspaper, Cpu, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CrystalIcon } from "./CrystalIcon";

const programmes = [
  {
    id: 'professional',
    title: "Legal Professional",
    icon: Scale,
    intro: "Recognising individual legal practitioners across specialist areas of practice.",
    includes: [
      "Corporate Elite", "Litigation Masters", "Arbitration Leaders", "Tax Leaders", 
      "Banking & Finance Leaders", "Intellectual Property Leaders", "Technology & Data Leaders", 
      "Competition Leaders", "Employment Leaders", "Real Estate Leaders", "Energy Leaders", 
      "Infrastructure Leaders", "Healthcare Leaders", "White Collar Defence Leaders", 
      "Constitutional Leaders", "International Trade Leaders", "Future Leaders", "Women in Law"
    ]
  },
  {
    id: 'firm',
    title: "Law Firm Excellence",
    icon: Landmark,
    intro: "Recognition for legal institutions demonstrating excellence in legal practice and leadership.",
    includes: [
      "Full-Service Excellence", "Boutique Excellence", "Corporate Practice", "Litigation Practice", 
      "Tax Practice", "Technology Practice", "ESG Practice", "Innovation in Practice", 
      "Regional Excellence", "National Excellence", "International Excellence", "Emerging Law Firm"
    ]
  },
  {
    id: 'media',
    title: "Legal Media",
    icon: Newspaper,
    intro: "Recognition for organisations contributing to legal journalism, publishing, research and professional education.",
    includes: [
      "Legal Journalism", "Legal Publishing", "Legal Commentary", "Academic Publications", 
      "Legal Research", "Podcast Excellence", "Digital Legal Platforms", "Legal Education"
    ]
  },
  {
    id: 'innovation',
    title: "Legal Innovation",
    icon: Cpu,
    intro: "Recognition for organisations advancing legal services through innovation.",
    includes: [
      "Artificial Intelligence", "Legal Research Technology", "Legal Analytics", "Practice Management", 
      "Compliance Technology", "Contract Lifecycle", "Litigation Technology", "Knowledge Management", 
      "RegTech", "ESG Technology", "Access to Justice"
    ]
  }
];

export function RecognitionProgrammes() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="programmes" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-transparent">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">5</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 5</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Recognition Programmes</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
          <p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">
            The Juris Standard Index consists of specialised Recognition Programmes designed to acknowledge excellence across different sectors of the legal profession. Each programme follows the same Editorial Methodology while recognising the unique characteristics of different professional disciplines.
          </p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programmes.map((prog, index) => {
            const isActive = openId === prog.id;
            return (
              <div
                key={prog.id}
                className={`group relative bg-[#050505]/80 backdrop-blur-md border rounded-2xl p-8 transition-all duration-700 cursor-pointer ${
                  isActive 
                    ? 'border-gold-500/40 shadow-[0_10px_40px_rgba(212,175,55,0.1)]' 
                    : 'border-white/10 hover:border-gold-500/30 hover:bg-[#0a0a0a]'
                }`}
                onClick={() => setOpenId(isActive ? null : prog.id)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:border-gold-500/30 transition-colors duration-500 shadow-inner">
                      <prog.icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? 'text-gold-400' : 'text-white/40'}`} />
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 ${isActive ? 'rotate-180 text-gold-400' : ''}`} />
                  </div>
                  
                  <h3 className={`font-serif text-2xl font-light mb-3 transition-colors duration-500 ${isActive ? 'text-gold-100' : 'text-white'}`}>
                    {prog.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6">
                    {prog.intro}
                  </p>

                  
                    {isActive && (
                      <div
                        className="border-t border-white/10 pt-6 mt-2"
                      >
                        <h4 className="text-[0.65rem] uppercase tracking-widest text-gold-500/70 font-semibold mb-4">Includes</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                          {prog.includes.map((item, i) => (
                            <li key={i} className="flex items-center text-xs text-neutral-300 font-light">
                              <div className="w-1 h-1 rounded-full bg-gold-500/50 mr-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex justify-end">
                          <button className="text-[0.65rem] uppercase tracking-widest text-neutral-400 hover:text-gold-300 font-semibold flex items-center transition-colors">
                            Explore Programmes
                            <ArrowRight className="w-3 h-3 ml-2" />
                          </button>
                        </div>
                      </div>
                    )}
                  
                </div>
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
