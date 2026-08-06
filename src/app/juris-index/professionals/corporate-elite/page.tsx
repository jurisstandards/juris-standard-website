import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Search, FileText, Briefcase, MapPin, Calendar, Award, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { NumberedIndexCard } from "@/components/ui/NumberedIndexCard";

export default function CorporateElitePortalPage() {
  return (
    <main className="min-h-screen bg-[#020202] selection:bg-gold-500/30 flex flex-col font-sans text-neutral-300">
      <Navbar />
      
      {/* 1. HERO & EDITORIAL FOREWORD */}
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden border-b border-gold-500/10">
        <div className="absolute inset-0 z-0">
          {/* Reusing the corporate icon as a background blend */}
          <div className="absolute right-0 top-0 w-full h-full opacity-30 flex justify-end items-center mix-blend-screen overflow-hidden">
             <img src="/collections/icon_corporate.jpg" alt="Corporate Elite" className="w-[800px] h-[800px] object-cover scale-150 translate-x-1/4" style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/95 to-transparent z-10" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto relative z-20 flex flex-col lg:flex-row justify-between items-start gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-gold-500/60 block" />
              <span className="text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.4em] text-gold-400 font-semibold">
                THE INSTITUTIONAL RECORD
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide mb-8 font-light">
              CORPORATE <br/>
              <span className="font-medium bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                ELITE<sup className="text-[0.3em] ml-2 text-gold-500">™</sup>
              </span>
            </h1>

            {/* Editorial Foreword (Collection 8) */}
            <div className="p-8 bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
              <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-6">EDITORIAL FOREWORD</h3>
              <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed mb-4">
                "The Corporate Elite™ recognition is reserved strictly for those distinguished practitioners who have demonstrated an unwavering commitment to professional excellence, shaping the global corporate landscape through rigorous counsel and exceptional strategic acumen. This is not a directory; it is the definitive, permanent institutional record of legal preeminence."
              </p>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/5">
                  <span className="font-serif text-xl text-gold-400 italic">JS</span>
                </div>
                <div>
                  <h4 className="text-xs text-white/90 font-medium tracking-wide uppercase">The Editorial Board</h4>
                  <span className="text-[0.6rem] text-neutral-500 uppercase tracking-widest">Juris Standard Index</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Verification Portal */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <div className="p-8 bg-[#0a0a0a] border border-white/10 rounded-md">
              <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> RECOGNITION VERIFICATION
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Verify the official status and standing of any lawyer recognised within the Corporate Elite™ index.
              </p>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter Recognition ID (e.g., CE-2024-XXXX)"
                  className="w-full bg-black border border-white/20 rounded-sm py-3 pl-4 pr-12 text-xs text-white/90 placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 uppercase"
                />
                <button className="absolute right-0 top-0 h-full px-4 border-l border-white/20 hover:bg-white/5 transition-colors">
                  <Search className="w-4 h-4 text-gold-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-24 flex flex-col gap-24">
        
        {/* 2. THE INSTITUTIONAL COLLECTIONS */}
        <section>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-500 font-medium mb-4 block">
              THE ARCHITECTURE OF EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white/95 tracking-wide">
              Institutional Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Collection 1: Recognised Lawyers */}
            <Link href="/juris-index/professionals/corporate-elite/lawyers" className="group p-8 bg-[#050505] border border-white/5 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden h-[280px] flex flex-col">
              <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <Search className="w-8 h-8 text-gold-500/60 mb-6 group-hover:text-gold-400 transition-colors" strokeWidth={1} />
              <h3 className="font-serif text-xl text-white/90 mb-3">Recognised Lawyers</h3>
              <p className="text-[0.65rem] text-neutral-400 uppercase tracking-widest leading-relaxed mb-auto">
                The official annual record of all Corporate Elite™ recognised lawyers.
              </p>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold-400 transition-colors mt-6">
                ACCESS RECORD <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Collection 2: Recognition Domains */}
            <div className="group p-8 bg-gradient-to-b from-[#111] to-[#050505] border border-gold-500/20 hover:border-gold-500/50 transition-all duration-500 relative overflow-hidden h-[280px] flex flex-col md:col-span-2 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_left,_rgba(212,175,55,0.1)_0%,_transparent_70%)] pointer-events-none" />
              <div className="flex justify-between items-start mb-6 z-10">
                <Briefcase className="w-8 h-8 text-gold-500 mb-6 group-hover:text-gold-400 transition-colors" strokeWidth={1} />
                <Link href="#" className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500 hover:text-white transition-colors border border-gold-500/30 px-4 py-2 rounded-sm hover:bg-gold-500/10">
                  EXPLORE DOMAINS
                </Link>
              </div>
              <h3 className="font-serif text-2xl text-white/95 mb-3 z-10">Recognition Domains</h3>
              <p className="text-[0.65rem] text-neutral-400 uppercase tracking-widest leading-relaxed mb-6 z-10">
                Discover recognised professionals across distinct domains of corporate excellence.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto z-10">
                {["Mergers & Acquisitions", "Private Equity", "Venture Capital", "Banking & Finance", "Capital Markets", "Corporate Governance"].map(domain => (
                  <span key={domain} className="text-[0.55rem] text-white/70 px-3 py-1.5 border border-white/10 bg-black hover:border-gold-500/40 hover:text-gold-400 cursor-pointer transition-colors uppercase tracking-wider">
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            {/* Collection 3: Browse by Law Firm */}
            <Link href="/juris-index/professionals/corporate-elite/firms" className="group p-8 bg-[#050505] border border-white/5 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden h-[280px] flex flex-col">
              <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <Building2 className="w-8 h-8 text-gold-500/60 mb-6 group-hover:text-gold-400 transition-colors" strokeWidth={1} />
              <h3 className="font-serif text-xl text-white/90 mb-3">Institutional Breakdown</h3>
              <p className="text-[0.65rem] text-neutral-400 uppercase tracking-widest leading-relaxed mb-auto">
                Explore the index structured by the leading law firms housing recognised excellence.
              </p>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold-400 transition-colors mt-6">
                BROWSE BY FIRM <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Collection 4: Browse by Jurisdiction */}
            <Link href="/juris-index/professionals/corporate-elite/jurisdictions" className="group p-8 bg-[#050505] border border-white/5 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden h-[280px] flex flex-col">
              <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <MapPin className="w-8 h-8 text-gold-500/60 mb-6 group-hover:text-gold-400 transition-colors" strokeWidth={1} />
              <h3 className="font-serif text-xl text-white/90 mb-3">Regional Discovery</h3>
              <p className="text-[0.65rem] text-neutral-400 uppercase tracking-widest leading-relaxed mb-auto">
                Filter the Corporate Elite™ index across specific global jurisdictions and cities.
              </p>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold-400 transition-colors mt-6">
                BROWSE JURISDICTIONS <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Collection 5: Annual Editions */}
            <Link href="/juris-index/professionals/corporate-elite/archive" className="group p-8 bg-[#050505] border border-white/5 hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden h-[280px] flex flex-col">
              <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <Calendar className="w-8 h-8 text-gold-500/60 mb-6 group-hover:text-gold-400 transition-colors" strokeWidth={1} />
              <h3 className="font-serif text-xl text-white/90 mb-3">Annual Editions Archive</h3>
              <p className="text-[0.65rem] text-neutral-400 uppercase tracking-widest leading-relaxed mb-auto">
                The permanent institutional archive of all previous recognition editions.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                <span className="text-[0.55rem] text-gold-500/80 px-2 py-1 border border-gold-500/20 bg-gold-500/5">2027</span>
                <span className="text-[0.55rem] text-neutral-500 px-2 py-1 border border-white/10 bg-white/5 line-through">2026</span>
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-gold-400 transition-colors mt-auto">
                VIEW ARCHIVE <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </section>

        {/* 6. RECOGNITION ASSETS */}
        <section className="py-16 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl md:text-4xl text-white/95 tracking-wide mb-6">
                Official Recognition Assets
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-10 max-w-lg">
                Every recognised Corporate Elite™ lawyer receives a suite of highly prestigious digital and physical assets to signify their official standing within the Juris Standard Index.
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                {[
                  "Institutional Certificate", "Recognition Plaque", "LinkedIn Integration",
                  "Official Website Badge", "Verified Email Signature", "Press & Media Kit"
                ].map((asset, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-500" />
                    <span className="text-xs uppercase tracking-widest text-white/80">{asset}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link href="#" className="inline-block text-[0.65rem] uppercase tracking-[0.2em] text-black bg-gold-500 hover:bg-gold-400 transition-colors px-8 py-4 font-semibold rounded-sm">
                  VIEW ASSET GUIDELINES
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] bg-gradient-to-tr from-[#111] to-[#0a0a0a] border border-gold-500/20 rounded-lg flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center">
                <Award className="w-24 h-24 text-gold-500 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" strokeWidth={0.5} />
                <h4 className="font-serif text-2xl text-white/90 tracking-widest uppercase">Official Record</h4>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
