import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FirmProfileCard } from "@/components/ui/FirmProfileCard";
import { PracticeAreaButton } from "@/components/ui/PracticeAreaButton";
import { Search, Briefcase, Gavel, Scale, FileText, Landmark, Lightbulb, User, Building, ArrowRight, Building2, ShieldCheck, CheckCircle2, Globe, Medal, Globe2, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function LawFirmExcellencePage() {
  return (
    <main className="min-h-screen bg-[#020202] selection:bg-gold-500/30 flex flex-col font-sans text-neutral-300">
      <Navbar />
      
      {/* 1. HERO & SEARCH SECTION */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-gold-500/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
             <img src="/collections/firm_lobby_hero.jpg" alt="Law Firm Excellence" className="w-full h-full object-cover object-left mask-image-linear-left" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/90 to-transparent z-10" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto relative z-20 flex flex-col">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-wide mb-6 font-light">
              LAW FIRM <br/>
              <span className="font-medium bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                EXCELLENCE<sup className="text-[0.3em] ml-2 text-gold-500">™</sup>
              </span>
            </h1>
            <p className="text-sm md:text-base text-neutral-300 font-light tracking-wide max-w-lg mb-10 leading-relaxed opacity-80">
              Recognising the world's leading law firms for their unwavering commitment to excellence.
            </p>

            <div className="w-full max-w-xl mb-6 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/20 to-gold-500/0 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden">
                <div className="pl-4 pr-3 py-4 flex items-center justify-center">
                  <Search className="w-5 h-5 text-gold-500/60" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search law firms, practice areas, jurisdictions..."
                  className="w-full bg-transparent border-none py-4 pr-4 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:ring-0"
                />
                <button className="pr-4 pl-3 py-4 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/5 hover:bg-gold-500/10 transition-colors">
                    <Search className="w-3.5 h-3.5 text-gold-500" />
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[0.65rem] text-neutral-500">Popular Searches:</span>
              {["Corporate / M&A", "Dispute Resolution", "Tax", "Arbitration", "Banking & Finance"].map(tag => (
                <Link key={tag} href="#" className="text-[0.65rem] text-white/50 hover:text-gold-400 transition-colors underline decoration-white/20 underline-offset-4 hover:decoration-gold-400/50">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto pb-24">
        
        {/* 2. FEATURED LAW FIRMS */}
        <section className="py-12 border-b border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">FEATURED LAW FIRMS</h2>
            <Link href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-2">
              VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <FirmProfileCard 
              name="Khaitan & Co." 
              logoNode={<h3 className="font-serif text-[1.6rem] text-white/95 leading-none">Khaitan<br/><span className="text-[1.2rem] opacity-80">& Co.</span></h3>}
              tier="TIER 1 FIRM" practiceAreas="Corporate, M&A, Tax" location="Mumbai, India" href="#"
            />
            <FirmProfileCard 
              name="AZB & PARTNERS" 
              logoNode={<h3 className="font-serif text-[1.4rem] text-white/95 leading-tight tracking-wide">AZB &<br/>PARTNERS</h3>}
              tier="TIER 1 FIRM" practiceAreas="Dispute Resolution, Arbitration" location="Mumbai, India" href="#"
            />
            <FirmProfileCard 
              name="TRILEGAL" 
              logoNode={<div className="flex items-center gap-2"><div className="flex gap-0.5"><div className="w-1 h-6 bg-white/80"/><div className="w-1 h-6 bg-white/50"/><div className="w-1 h-6 bg-white/20"/></div><h3 className="font-serif text-[1.3rem] text-white/95 tracking-widest uppercase">TRILEGAL</h3></div>}
              tier="TIER 1 FIRM" practiceAreas="Corporate, M&A, PE" location="New Delhi, India" href="#"
            />
            <FirmProfileCard 
              name="Cyril Amarchand Mangaldas" 
              logoNode={<div className="flex flex-col"><div className="font-serif text-[2.5rem] leading-none text-gold-500/80 -ml-1 italic">cam</div><h3 className="font-serif text-[0.8rem] text-white/80 leading-tight">cyril amarchand<br/>mangaldas</h3></div>}
              tier="TIER 1 FIRM" practiceAreas="Corporate, M&A, Tax" location="Mumbai, India" href="#"
            />
            <FirmProfileCard 
              name="Shardul Amarchand Mangaldas" 
              logoNode={<div className="flex items-center gap-3"><Globe2 className="w-8 h-8 text-gold-500/60" strokeWidth={1} /><h3 className="font-serif text-[0.85rem] text-white/90 leading-tight">Shardul<br/>Amarchand<br/>Mangaldas</h3></div>}
              tier="TIER 1 FIRM" practiceAreas="Dispute Resolution" location="New Delhi, India" href="#"
            />
            
            <FirmProfileCard 
              name="J. Sagar Associates" 
              logoNode={<h3 className="font-serif text-[1.5rem] text-white/95 leading-tight">J. Sagar<br/>Associates</h3>}
              tier="TIER 1 FIRM" practiceAreas="IP, Technology" location="New Delhi, India" href="#"
            />
            <FirmProfileCard 
              name="Luthra and Luthra" 
              logoNode={<h3 className="font-serif text-[1.4rem] text-white/95 leading-tight">Luthra and<br/>Luthra<br/><span className="text-[1rem] opacity-70">Law Offices</span></h3>}
              tier="TIER 1 FIRM" practiceAreas="Dispute Resolution, Arbitration" location="New Delhi, India" href="#"
            />
            <FirmProfileCard 
              name="IndusLaw" 
              logoNode={<h3 className="font-serif text-[1.7rem] text-white/95 tracking-wide">IndusLaw</h3>}
              tier="TIER 1 FIRM" practiceAreas="Corporate, M&A, PE" location="Bangalore, India" href="#"
            />
            <FirmProfileCard 
              name="K&S Partners" 
              logoNode={<div className="flex flex-col"><h3 className="font-serif text-[1.8rem] text-white/95 leading-none mb-1">K&S</h3><span className="text-[0.65rem] text-white/70 tracking-widest uppercase">partners</span><span className="text-[0.5rem] text-neutral-500 mt-1">Intellectual Property Attorneys</span></div>}
              tier="TIER 1 FIRM" practiceAreas="IP, Patents, Trademarks" location="New Delhi, India" href="#"
            />
            <FirmProfileCard 
              name="Nishith Desai Associates" 
              logoNode={<h3 className="font-serif text-[1.4rem] text-white/95 leading-tight">Nishith<br/>Desai<br/>Associates</h3>}
              tier="TIER 1 FIRM" practiceAreas="International Tax, Corporate" location="Mumbai, India" href="#"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Link href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/60 hover:text-gold-400 transition-colors border border-white/10 px-8 py-3 rounded-sm hover:border-gold-500/30 hover:bg-gold-500/5 flex items-center gap-2">
              VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* 3. EXPLORE BY PRACTICE AREA */}
        <section className="py-10 border-b border-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-8">EXPLORE BY PRACTICE AREA</h2>
          <div className="flex items-center justify-between overflow-x-auto hide-scrollbar gap-2 w-full">
            <PracticeAreaButton label="Corporate / M&A" icon={Briefcase} href="#" />
            <PracticeAreaButton label="Dispute Resolution" icon={Gavel} href="#" />
            <PracticeAreaButton label="Arbitration" icon={Scale} href="#" />
            <PracticeAreaButton label="Tax" icon={FileText} href="#" />
            <PracticeAreaButton label="Banking & Finance" icon={Landmark} href="#" />
            <PracticeAreaButton label="IP & Technology" icon={Lightbulb} href="#" />
            <PracticeAreaButton label="Employment" icon={User} href="#" />
            <PracticeAreaButton label="Real Estate" icon={Building} href="#" />
          </div>
        </section>

        {/* 4. DASHBOARD SPLIT */}
        <section className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-white/5">
          
          {/* Live Updates */}
          <div className="p-6 md:p-8 bg-[#0a0a0a] border border-white/5 rounded-md flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">LIVE FROM THE INDEX</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[0.55rem] uppercase tracking-widest text-green-400 font-medium">LIVE</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-5 flex-grow justify-center mb-6">
              {[
                { icon: Building2, text: "Khaitan & Co. recognised in Law Firm Excellence™", time: "2m ago" },
                { icon: User, text: "AZB & Partners - New editorial profile published", time: "12m ago" },
                { icon: Scale, text: "Trilegal recognised in Dispute Resolution Excellence™", time: "18m ago" },
                { icon: Globe, text: "Cyril Amarchand Mangaldas ranked Tier 1 in Tax Excellence™", time: "25m ago" }
              ].map((update, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-gold-500/20 flex items-center justify-center flex-shrink-0 bg-gold-500/5 group-hover:border-gold-500/50 transition-colors">
                      <update.icon className="w-3.5 h-3.5 text-gold-500/80" />
                    </div>
                    <p className="text-xs text-white/80 font-light group-hover:text-white transition-colors">{update.text}</p>
                  </div>
                  <span className="text-[0.65rem] text-neutral-600 w-12 text-right">{update.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <Link href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-600 hover:text-gold-400 transition-colors flex items-center gap-2">
                VIEW ALL UPDATES <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Jurisdictions */}
          <div className="p-6 md:p-8 bg-[#0a0a0a] border border-white/5 rounded-md flex flex-col h-full relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.05)_0%,_transparent_60%)] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">TOP LAW FIRMS BY JURISDICTION</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-sm bg-black text-[0.65rem] text-white cursor-pointer hover:border-gold-500/30 transition-colors">
                India <ChevronDown className="w-3 h-3 text-neutral-500" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between flex-grow relative z-10 gap-8">
              {/* Map Graphic representation (using a styled icon group to simulate a map dot density) */}
              <div className="w-40 h-40 relative flex items-center justify-center opacity-60">
                 {/* This represents the dotted map in the screenshot */}
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjMiLz4KPC9zdmc+')] [mask-image:radial-gradient(circle_at_center,_black_0%,_transparent_70%)]" />
                 <Globe2 className="w-24 h-24 text-gold-500/20" strokeWidth={0.5} />
                 <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                 <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-white/50 rounded-full" />
                 <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-white/50 rounded-full" />
              </div>

              <div className="flex flex-col gap-6 w-full md:w-1/2">
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-gold-500 w-16 text-right">120+</span>
                  <span className="text-[0.65rem] text-neutral-400 uppercase tracking-widest font-light">Law Firms Recognised</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-gold-500 w-16 text-right">25+</span>
                  <span className="text-[0.65rem] text-neutral-400 uppercase tracking-widest font-light">Cities Represented</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-gold-500 w-16 text-right">15+</span>
                  <span className="text-[0.65rem] text-neutral-400 uppercase tracking-widest font-light">Practice Areas</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 flex justify-end relative z-10">
              <Link href="#" className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50 hover:text-gold-400 transition-colors flex items-center gap-2">
                VIEW ALL JURISDICTIONS <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. TRUST BADGES */}
        <section className="py-8">
          <div className="flex flex-wrap items-center justify-between gap-6 px-4 py-6 bg-[#050505] border border-white/5 rounded-md">
             {[
               { icon: ShieldCheck, title: "INDEPENDENT", sub: "EDITORIAL" },
               { icon: CheckCircle2, title: "INSTITUTIONALLY", sub: "VERIFIED" },
               { icon: Globe, title: "RESEARCH", sub: "DRIVEN" },
               { icon: Medal, title: "INTERNATIONAL", sub: "STANDARDS" },
               { icon: ShieldCheck, title: "PERMANENT", sub: "RECOGNITION" }, // Using shield again as placeholder for the last badge
             ].map((badge, idx) => (
               <div key={idx} className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-full border border-gold-500/20 flex items-center justify-center bg-gold-500/5 group-hover:border-gold-500/50 transition-colors">
                   <badge.icon className="w-4 h-4 text-gold-500/70" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[0.6rem] text-white/90 font-medium uppercase tracking-widest">{badge.title}</span>
                   <span className="text-[0.55rem] text-neutral-500 font-medium uppercase tracking-widest">{badge.sub}</span>
                 </div>
               </div>
             ))}
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}
