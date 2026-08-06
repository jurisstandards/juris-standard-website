import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NumberedIndexCard } from "@/components/ui/NumberedIndexCard";
import { ArrowRight, ShieldCheck, Crown, Globe, Scale, Search, Clock, FileText, User, Building2 } from "lucide-react";
import Link from "next/link";

export default function ExploreIndexPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-gold-500/30 flex flex-col font-sans text-neutral-300">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[750px] lg:h-[850px] flex items-center mt-16 lg:mt-20 overflow-hidden">
        {/* Background Image with improved contrast and lighting */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/collections/hero_hall.jpg')" }}
        />
        {/* Richer dark overlay gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-black/70 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/60 z-0" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_60%)] -translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />
        
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="max-w-3xl pt-10 lg:pt-0">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-gold-500/60 block" />
              <span className="text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.4em] text-gold-400 font-semibold">
                EXPLORE
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] text-white leading-[1.05] tracking-wide mb-8 drop-shadow-2xl font-light">
              THE JURIS STANDARD <br/>
              <span className="font-medium bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                INDEX<sup className="text-[0.3em] ml-2 text-gold-500">™</sup>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-300 font-light tracking-wide max-w-xl mb-14 border-l-[3px] border-gold-500/80 pl-8 leading-relaxed shadow-sm">
              The world's definitive record of legal excellence.<br/>
              Independent. Authoritative. Global.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <Link href="#collections" className="group relative flex items-center justify-between px-10 py-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-gold-500/50 text-gold-400 text-sm font-semibold uppercase tracking-[0.25em] transition-all overflow-hidden min-w-[280px] shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:border-gold-400">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">ENTER THE INDEX</span>
                <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <Link href="#live" className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 hover:text-gold-400 transition-colors">
                View Current Recognitions 
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg min-w-[340px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Top decorative line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            
            <div className="flex flex-col p-2">
              {[
                { icon: ShieldCheck, title: "INDEPENDENT", desc: "Editorially Independent" },
                { icon: Crown, title: "AUTHORITATIVE", desc: "Rigorous Research" },
                { icon: Scale, title: "VERIFIED", desc: "By Leading Experts" },
                { icon: Globe, title: "GLOBAL", desc: "Across Jurisdictions" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-default p-5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors rounded-md">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 group-hover:border-gold-500/50 group-hover:bg-gold-500/20 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[0.7rem] uppercase tracking-[0.25em] text-white font-medium mb-1">{feature.title}</h4>
                      <p className="text-[0.65rem] text-neutral-400 font-light tracking-wide">{feature.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto pb-32">
        
        {/* 2. THE 8 COLLECTIONS GRID */}
        <section id="collections" className="py-8 -mt-20 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
            <NumberedIndexCard number="01" topLabel="LAW FIRM" mainLabel="EXCELLENCE™" href="/juris-index/law-firms" imageSrc="/collections/icon_law_firm.jpg" />
            <NumberedIndexCard number="02" topLabel="CORPORATE" mainLabel="ELITE™" href="/juris-index/professionals/corporate-elite" imageSrc="/collections/icon_corporate.jpg" />
            <NumberedIndexCard number="03" topLabel="LITIGATION" mainLabel="MASTERS™" href="/juris-index/professionals/litigation-masters" imageSrc="/collections/icon_litigation.jpg" />
            <NumberedIndexCard number="04" topLabel="GENERAL COUNSEL" mainLabel="EXCELLENCE™" href="/juris-index/professionals/general-counsel" imageSrc="/collections/icon_ring.jpg" />
            
            <NumberedIndexCard number="05" topLabel="LEGAL" mainLabel="ACADEMIA™" href="/juris-index/academia" imageSrc="/collections/icon_book.jpg" />
            <NumberedIndexCard number="06" topLabel="LEGAL" mainLabel="INNOVATION EXCELLENCE™" href="/juris-index/legal-innovation" imageSrc="/collections/icon_globe.jpg" />
            <NumberedIndexCard number="07" topLabel="PUBLIC" mainLabel="LEADERSHIP™" href="/juris-index/public-leadership" imageSrc="/collections/icon_capitol.jpg" />
            <NumberedIndexCard number="08" topLabel="JURIS STANDARD" mainLabel="HONOURS™" href="/juris-index/honours" imageSrc="/collections/icon_compass.jpg" />
          </div>
        </section>

        {/* 3. LIVE FROM THE INDEX */}
        <section id="live" className="py-8 border-t border-white/10 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">LIVE FROM THE INDEX</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[0.55rem] uppercase tracking-widest text-green-400 font-medium">LIVE</span>
              </div>
            </div>
            <Link href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50 hover:text-gold-400 transition-colors flex items-center gap-2">
              VIEW ALL UPDATES <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-4">
            {[
              { icon: Building2, text: "Khaitan & Co. recognised in Law Firm Excellence™", time: "2m ago" },
              { icon: User, text: "Aarav Mehta recognised in Corporate Elite™", time: "5m ago" },
              { icon: Scale, text: "AZB & Partners recognised in Litigation Masters™", time: "12m ago" },
              { icon: User, text: "Priya Khanna recognised in General Counsel Excellence™", time: "18m ago" },
              { icon: FileText, text: "New editorial published: India's Arbitration Landscape 2024", time: "25m ago" }
            ].map((update, idx) => (
              <div key={idx} className="flex-none w-72 flex items-start gap-4 p-4 border border-white/10 rounded-sm bg-[#050505]">
                <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <update.icon className="w-3.5 h-3.5 text-gold-500/80" />
                </div>
                <div>
                  <p className="text-xs text-white/80 leading-relaxed mb-2">{update.text}</p>
                  <span className="text-[0.6rem] text-neutral-500">{update.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROFILES & FIRMS */}
        <section className="py-8 grid grid-cols-1 xl:grid-cols-2 gap-8 border-t border-white/10 mt-4">
          
          {/* Top Lawyers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">TOP LAWYERS - LIVE</h3>
              <Link href="#" className="text-[0.6rem] uppercase tracking-[0.2em] text-white/50 hover:text-gold-400 transition-colors">VIEW ALL</Link>
            </div>
            <div className="flex gap-4 items-center">
              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 flex-shrink-0"><ArrowRight className="w-3 h-3 rotate-180" /></button>
              
              <div className="flex-grow grid grid-cols-3 gap-4">
                {/* Profile 1 */}
                <div className="p-4 border border-white/10 bg-[#050505] flex flex-col rounded-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
                      <User className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                      <h4 className="text-xs text-white/90 font-medium">Aarav Mehta</h4>
                      <span className="text-[0.6rem] text-neutral-500">Khaitan & Co.</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70 border border-gold-500/30 px-2 py-1 rounded-[2px]">CORPORATE ELITE™</span>
                  </div>
                </div>
                {/* Profile 2 */}
                <div className="p-4 border border-white/10 bg-[#050505] flex flex-col rounded-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
                      <User className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                      <h4 className="text-xs text-white/90 font-medium">Priya Khanna</h4>
                      <span className="text-[0.6rem] text-neutral-500">General Counsel</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70 border border-gold-500/30 px-2 py-1 rounded-[2px]">GC EXCELLENCE™</span>
                  </div>
                </div>
                {/* Profile 3 */}
                <div className="p-4 border border-white/10 bg-[#050505] flex flex-col rounded-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
                      <User className="w-5 h-5 text-white/30" />
                    </div>
                    <div>
                      <h4 className="text-xs text-white/90 font-medium">Sanjay K. Nayar</h4>
                      <span className="text-[0.6rem] text-neutral-500">Khaitan & Co.</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70 border border-gold-500/30 px-2 py-1 rounded-[2px]">LITIGATION MASTERS™</span>
                  </div>
                </div>
              </div>

              <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 flex-shrink-0"><ArrowRight className="w-3 h-3" /></button>
            </div>
          </div>

          {/* Top Law Firms */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-500">TOP LAW FIRMS - LIVE</h3>
              <Link href="#" className="text-[0.6rem] uppercase tracking-[0.2em] text-white/50 hover:text-gold-400 transition-colors flex items-center gap-2">VIEW ALL <ArrowRight className="w-3 h-3" /></Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 h-[120px]">
                {/* Firm 1 */}
                <div className="p-5 border border-white/10 bg-[#050505] flex flex-col justify-between rounded-sm items-center text-center hover:border-gold-500/30 transition-colors cursor-pointer">
                  <h2 className="font-serif text-lg tracking-widest text-white/90 mt-2 mb-2">KHAITAN<br/><span className="text-xs tracking-widest">& CO</span></h2>
                  <div className="w-full pt-3 border-t border-white/10">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70">LAW FIRM EXCELLENCE™</span>
                  </div>
                </div>
                {/* Firm 2 */}
                <div className="p-5 border border-white/10 bg-[#050505] flex flex-col justify-between rounded-sm items-center text-center hover:border-gold-500/30 transition-colors cursor-pointer">
                  <h2 className="font-serif text-lg tracking-widest text-white/90 mt-2 mb-2">AZB <br/><span className="text-xs tracking-widest">& PARTNERS</span></h2>
                  <div className="w-full pt-3 border-t border-white/10">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70">LITIGATION MASTERS™</span>
                  </div>
                </div>
                {/* Firm 3 */}
                <div className="p-5 border border-white/10 bg-[#050505] flex flex-col justify-between rounded-sm items-center text-center hover:border-gold-500/30 transition-colors cursor-pointer">
                  <h2 className="font-serif text-lg tracking-widest text-white/90 mt-4 mb-2">TRILEGAL</h2>
                  <div className="w-full pt-3 border-t border-white/10 mt-auto">
                    <span className="text-[0.55rem] uppercase tracking-[0.1em] text-gold-500/70">LAW FIRM EXCELLENCE™</span>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER WIDGETS */}
        <section className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-white/10 mt-4">
          
          {/* Magazine */}
          <div className="p-8 border border-white/10 bg-[#050505] flex flex-col md:flex-row justify-between items-start md:items-end rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.1)_0%,_transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-sm">
              <h3 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-500 mb-6">FROM JURIS STANDARD MAGAZINE™</h3>
              <span className="text-[0.55rem] text-neutral-500 uppercase tracking-widest mb-2 block">MAY 2024 ISSUE</span>
              <h4 className="font-serif text-2xl text-white/95 mb-4 leading-tight">The New Era of<br/>Cross-Border Legal Excellence</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6 md:mb-0">How leading law firms are shaping the future of global commerce.</p>
            </div>
            <Link href="#" className="relative z-10 text-[0.65rem] uppercase tracking-[0.2em] text-gold-400 hover:text-white transition-colors border border-gold-500/30 px-6 py-3 rounded-sm hover:bg-gold-500/10 whitespace-nowrap">
              READ MAGAZINE →
            </Link>
          </div>

          {/* Search */}
          <div className="p-8 border border-white/10 bg-[#050505] rounded-sm flex flex-col justify-center relative">
            <h3 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-500 mb-6">SEARCH THE INDEX</h3>
            
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search lawyers, law firms, practice areas, jurisdictions..."
                className="w-full bg-black border border-white/20 rounded-sm py-4 pl-4 pr-12 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-gold-500/50"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/30" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[0.55rem] uppercase tracking-widest text-neutral-500">POPULAR SEARCHES</span>
              <div className="flex flex-wrap gap-2">
                {["M&A", "Arbitration", "Tax", "Dispute Resolution", "IP", "Employment", "Banking", "Real Estate", "Corporate", "Delhi", "Mumbai", "Singapore", "London", "New York"].map(tag => (
                  <span key={tag} className="text-[0.6rem] text-neutral-400 px-3 py-1.5 border border-white/10 rounded-full hover:bg-white/5 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Link href="#" className="absolute bottom-8 right-8 text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/70 hover:text-gold-400 transition-colors flex items-center gap-2">
              ADVANCED SEARCH <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </section>

      </div>
      
      <Footer />
    </main>
  );
}
