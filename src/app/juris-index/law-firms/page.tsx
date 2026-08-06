import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, MapPin, Briefcase, Gavel, Scale, FileText, Landmark, Lightbulb, Users, Building, ArrowRight, ShieldCheck, Globe, Award, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const featuredFirms = [
  { name: "Khaitan\n& Co.", tier: "TIER 1 FIRM", practices: "Corporate, M&A, Tax", location: "Mumbai, India", font: "font-serif text-lg leading-tight" },
  { name: "AZB &\nPARTNERS", tier: "TIER 1 FIRM", practices: "Dispute Resolution,\nArbitration", location: "Mumbai, India", font: "font-sans uppercase tracking-widest text-[0.95rem]" },
  { name: "||L TRILEGAL", tier: "TIER 1 FIRM", practices: "Corporate, M&A, PE", location: "New Delhi, India", font: "font-sans uppercase tracking-widest text-[0.95rem]" },
  { name: "cyril amarchand\nmangaldas", tier: "TIER 1 FIRM", practices: "Corporate, M&A, Tax", location: "Mumbai, India", font: "font-serif lowercase text-lg text-[#C5A059]" },
  { name: "Shardul\nAmarchand\nMangaldas", tier: "TIER 1 FIRM", practices: "Dispute Resolution", location: "New Delhi, India", font: "font-serif text-base leading-tight" },
  { name: "J. Sagar\nAssociates", tier: "TIER 1 FIRM", practices: "IP, Technology", location: "New Delhi, India", font: "font-serif text-[1.3rem] leading-tight" },
  { name: "Luthra and\nLuthra\nLaw Offices", tier: "TIER 1 FIRM", practices: "Dispute Resolution,\nArbitration", location: "New Delhi, India", font: "font-serif text-lg leading-tight" },
  { name: "IndusLaw", tier: "TIER 1 FIRM", practices: "Corporate, M&A, PE", location: "Bangalore, India", font: "font-serif text-[1.4rem]" },
  { name: "K&S\npartners", tier: "TIER 1 FIRM", practices: "IP, Patents, Trademarks", location: "New Delhi, India", font: "font-serif text-[1.35rem] leading-tight" },
  { name: "Nishith\nDesai\nAssociates", tier: "TIER 1 FIRM", practices: "International Tax,\nCorporate", location: "Mumbai, India", font: "font-serif text-lg leading-tight" },
];

const practiceAreas = [
  { name: "Corporate / M&A", icon: Briefcase },
  { name: "Dispute Resolution", icon: Gavel },
  { name: "Arbitration", icon: Scale },
  { name: "Tax", icon: FileText },
  { name: "Banking & Finance", icon: Landmark },
  { name: "IP & Technology", icon: Lightbulb },
  { name: "Employment", icon: Users },
  { name: "Real Estate", icon: Building },
];

const liveUpdates = [
  { icon: Building, text: "Khaitan & Co. recognised in Law Firm Excellence™", time: "2m ago" },
  { icon: Users, text: "AZB & Partners – New editorial profile published", time: "12m ago" },
  { icon: Scale, text: "Trilegal recognised in Dispute Resolution Excellence™", time: "18m ago" },
  { icon: Globe, text: "Cyril Amarchand Mangaldas ranked Tier 1 in Tax Excellence™", time: "25m ago" },
];

const trustBadges = [
  { icon: ShieldCheck, title: "INDEPENDENT", subtitle: "EDITORIAL" },
  { icon: CheckCircle2, title: "INSTITUTIONALLY", subtitle: "VERIFIED" },
  { icon: Globe, title: "RESEARCH", subtitle: "DRIVEN" },
  { icon: Award, title: "INTERNATIONAL", subtitle: "STANDARDS" },
  { icon: ShieldCheck, title: "PERMANENT", subtitle: "RECOGNITION" },
];

export default function LawFirmExcellencePortal() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0]">
      {/* 
        The Navbar is global and absolute.
        We don't need to change Navbar itself, we just make sure our Hero is top-0 and spans underneath it.
      */}
      <Navbar />
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-[#000000] overflow-hidden pt-32 pb-16">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/collections/firm_lobby_hero.jpg" 
            alt="Law Firm Excellence" 
            className="w-full h-full object-cover object-center md:object-right opacity-80"
          />
          {/* Black gradient overlay fading from left (dark) to right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 md:via-[#000000]/60 to-transparent" />
          {/* Bottom fade into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 relative z-10 flex flex-col">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] text-[#FFFFF0] leading-[1.05] tracking-wide mb-5 font-light uppercase drop-shadow-lg">
              LAW FIRM <br/>
              <span className="font-medium text-[#C5A059]">
                EXCELLENCE<sup className="text-[0.35em] ml-2 tracking-normal">™</sup>
              </span>
            </h1>
            
            <p className="text-[0.95rem] md:text-base text-[#FFFFF0]/85 font-light leading-relaxed mb-10 max-w-lg drop-shadow-md">
              Recognising the world's leading law firms for their unwavering commitment to excellence.
            </p>

            <div className="flex flex-col gap-4 max-w-xl">
              <div className="flex items-center bg-[#050505]/70 backdrop-blur-md border border-[#C5A059]/30 rounded-md w-full focus-within:border-[#C5A059]/70 focus-within:bg-[#050505]/90 transition-all overflow-hidden group shadow-lg">
                <div className="pl-4 pr-2 py-3.5">
                  <Search className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search law firms, practice areas, jurisdictions..."
                  className="w-full bg-transparent border-none py-3.5 pr-4 text-[0.8rem] text-[#FFFFF0] placeholder:text-[#FFFFF0]/50 focus:outline-none focus:ring-0"
                />
                <button className="px-5 py-3.5 flex items-center justify-center border-l border-[#C5A059]/20 hover:bg-[#C5A059]/10 transition-colors">
                  <Search className="w-4 h-4 text-[#C5A059]" strokeWidth={2} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[0.65rem] text-[#FFFFF0]/60 tracking-wider">
                Popular Searches: 
                <span className="text-[#FFFFF0]/90 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] hover:decoration-[#C5A059] underline-offset-4">Corporate / M&A</span>
                <span className="text-[#FFFFF0]/90 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] hover:decoration-[#C5A059] underline-offset-4">Dispute Resolution</span>
                <span className="text-[#FFFFF0]/90 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] hover:decoration-[#C5A059] underline-offset-4">Tax</span>
                <span className="text-[#FFFFF0]/90 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] hover:decoration-[#C5A059] underline-offset-4">Arbitration</span>
                <span className="text-[#FFFFF0]/90 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] hover:decoration-[#C5A059] underline-offset-4">Banking & Finance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED LAW FIRMS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-3 border-b border-[#222222]">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.25em] text-[#FFFFF0] uppercase">FEATURED LAW FIRMS</h2>
          <Link href="#" className="hidden md:flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
            VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 
          Reduced sizing and padding for cards to make them ultra-premium. 
          Changed from p-6 to p-4, reduced min-height, tighter typography.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {featuredFirms.map((firm, idx) => (
            <Link key={idx} href="#" className="group flex flex-col justify-between p-4 bg-gradient-to-br from-[#050505] to-[#020202] border border-[#1a1a1a] rounded-[2px] h-[180px] hover:border-[#C5A059]/40 hover:shadow-[0_4px_20px_rgba(197,160,89,0.05)] transition-all duration-300">
              <div className="flex flex-col">
                <div className="h-10 flex items-start mb-3">
                  <h3 className={`${firm.font} text-[#FFFFF0] leading-snug whitespace-pre-line group-hover:text-[#C5A059] transition-colors`}>
                    {firm.name}
                  </h3>
                </div>
                <span className="text-[0.5rem] font-medium tracking-[0.2em] text-[#C5A059] mb-1.5 uppercase">{firm.tier}</span>
                <p className="text-[0.65rem] text-[#FFFFF0]/70 whitespace-pre-line leading-relaxed">{firm.practices}</p>
              </div>
              <div className="flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-1.5 text-[0.6rem] text-[#FFFFF0]/40 tracking-wider">
                  <MapPin className="w-2.5 h-2.5 text-[#C5A059]/70" /> {firm.location}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-[0.25em] text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors">
                    VIEW PROFILE
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#FFFFF0]/20 group-hover:text-[#C5A059] transform group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center w-full">
           <button className="w-full max-w-sm py-3 border border-[#222222] rounded-[2px] text-[0.6rem] uppercase tracking-[0.25em] text-[#FFFFF0]/60 hover:bg-[#C5A059]/5 hover:text-[#C5A059] hover:border-[#C5A059]/40 transition-colors flex items-center justify-center gap-2 shadow-sm">
             VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </section>

      {/* 3. EXPLORE BY PRACTICE AREA */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-10">
        <div className="flex flex-col mb-6 pb-3 border-b border-[#222222]">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.25em] text-[#FFFFF0] uppercase">EXPLORE BY PRACTICE AREA</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-6 overflow-x-auto pb-2 custom-scrollbar">
          {practiceAreas.map((area, idx) => (
            <Link key={idx} href="#" className="flex flex-col items-center gap-3 group min-w-[90px]">
              <area.icon className="w-6 h-6 text-[#C5A059]/80 stroke-[1.2px] group-hover:text-[#C5A059] group-hover:scale-105 transition-all duration-300" />
              <span className="text-[0.6rem] text-[#FFFFF0]/60 group-hover:text-[#C5A059] transition-colors text-center uppercase tracking-widest">{area.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. LIVE FEED & MAP STATS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Live Feed */}
          <div className="flex-1 bg-gradient-to-b from-[#050505] to-[#020202] border border-[#1a1a1a] rounded-[2px] p-6 flex flex-col hover:border-[#2a2a2a] transition-colors">
            <div className="flex items-center justify-between mb-6 border-b border-[#1a1a1a] pb-3">
              <h2 className="text-[0.7rem] font-semibold tracking-[0.25em] text-[#FFFFF0] uppercase">LIVE FROM THE INDEX</h2>
              <div className="flex items-center gap-1.5 text-[0.55rem] font-semibold tracking-[0.25em] text-green-500/90 uppercase">
                <Circle className="w-1.5 h-1.5 fill-green-500/90 animate-pulse" /> LIVE
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {liveUpdates.map((update, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 rounded-full border border-[#222222] bg-[#000000] flex items-center justify-center shrink-0 group-hover:border-[#C5A059]/50 transition-colors">
                    <update.icon className="w-2.5 h-2.5 text-[#C5A059]/80" />
                  </div>
                  <p className="text-[0.7rem] text-[#FFFFF0]/75 leading-relaxed pr-6 group-hover:text-[#FFFFF0] transition-colors">{update.text}</p>
                  <span className="ml-auto text-[0.55rem] text-[#FFFFF0]/30 shrink-0 uppercase tracking-widest mt-1 font-mono">{update.time}</span>
                </div>
              ))}
            </div>

            <Link href="#" className="mt-auto pt-5 border-t border-[#1a1a1a] flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-[#C5A059]/80 hover:text-[#C5A059] transition-colors">
              VIEW ALL UPDATES <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          {/* Map Stats */}
          <div className="flex-1 bg-gradient-to-b from-[#050505] to-[#020202] border border-[#1a1a1a] rounded-[2px] p-6 flex flex-col relative overflow-hidden hover:border-[#2a2a2a] transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(197,160,89,0.03)_0%,_transparent_60%)] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 border-b border-[#1a1a1a] pb-3 relative z-10">
              <h2 className="text-[0.7rem] font-semibold tracking-[0.25em] text-[#FFFFF0] uppercase">TOP LAW FIRMS BY JURISDICTION</h2>
              <div className="px-2.5 py-1 border border-[#222222] rounded-[2px] bg-[#000000] text-[0.6rem] text-[#FFFFF0]/70 cursor-pointer flex items-center gap-1.5 hover:text-[#C5A059] hover:border-[#C5A059]/30 transition-colors">
                India <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12 relative z-10 flex-grow py-4">
              {/* Map SVG Placeholder (Highly minimal dot map representation) */}
              <div className="w-40 h-40 relative opacity-40 mix-blend-screen">
                 {/* This represents the dotted map. Since we can't easily inline a perfect dotted map of India, we'll use a sophisticated globe structure as a placeholder that looks high-tech. */}
                 <div className="w-full h-full rounded-full border border-[#333333] flex items-center justify-center relative overflow-hidden">
                    <Globe className="w-32 h-32 text-[#222222]" strokeWidth={0.5} />
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#C5A059] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#C5A059] animate-pulse" />
                    <div className="absolute top-[40%] left-[60%] w-1 h-1 bg-[#C5A059] rounded-full shadow-[0_0_5px_#C5A059]" />
                    <div className="absolute top-[60%] left-[45%] w-1 h-1 bg-[#C5A059] rounded-full shadow-[0_0_5px_#C5A059]" />
                 </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-6 justify-center flex-grow">
                <div className="flex items-center gap-5">
                  <span className="font-serif text-2xl text-[#C5A059] w-14">120+</span>
                  <span className="text-[0.65rem] text-[#FFFFF0]/60 tracking-widest uppercase">Law Firms Recognised</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-serif text-2xl text-[#C5A059] w-14">25+</span>
                  <span className="text-[0.65rem] text-[#FFFFF0]/60 tracking-widest uppercase">Cities Represented</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-serif text-2xl text-[#C5A059] w-14">15+</span>
                  <span className="text-[0.65rem] text-[#FFFFF0]/60 tracking-widest uppercase">Practice Areas</span>
                </div>
              </div>
            </div>

            <Link href="#" className="mt-auto pt-5 border-t border-[#1a1a1a] flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-[#C5A059]/80 hover:text-[#C5A059] transition-colors relative z-10">
              VIEW ALL JURISDICTIONS <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. TRUST BADGES */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-10 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#1a1a1a] py-6">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3 group">
              <badge.icon className="w-6 h-6 text-[#C5A059]/80 stroke-[1.2px] group-hover:text-[#C5A059] transition-colors" />
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-medium uppercase tracking-widest text-[#FFFFF0]/70 leading-tight">{badge.title}</span>
                <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/40 leading-tight">{badge.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
