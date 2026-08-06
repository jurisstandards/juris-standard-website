import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, MapPin, Briefcase, Gavel, Scale, FileText, Landmark, Lightbulb, Users, Building, ArrowRight, ShieldCheck, Globe, Award, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const featuredFirms = [
  { name: "Khaitan\n& Co.", tier: "TIER 1 FIRM", practices: "Corporate, M&A, Tax", location: "Mumbai, India", font: "font-serif" },
  { name: "AZB &\nPARTNERS", tier: "TIER 1 FIRM", practices: "Dispute Resolution,\nArbitration", location: "Mumbai, India", font: "font-sans uppercase tracking-widest text-xl" },
  { name: "||L TRILEGAL", tier: "TIER 1 FIRM", practices: "Corporate, M&A, PE", location: "New Delhi, India", font: "font-sans uppercase tracking-widest text-lg" },
  { name: "cyril amarchand\nmangaldas", tier: "TIER 1 FIRM", practices: "Corporate, M&A, Tax", location: "Mumbai, India", font: "font-serif lowercase text-xl text-[#C5A059]" },
  { name: "Shardul\nAmarchand\nMangaldas", tier: "TIER 1 FIRM", practices: "Dispute Resolution", location: "New Delhi, India", font: "font-serif text-lg leading-tight" },
  { name: "J. Sagar\nAssociates", tier: "TIER 1 FIRM", practices: "IP, Technology", location: "New Delhi, India", font: "font-serif text-2xl leading-tight" },
  { name: "Luthra and\nLuthra\nLaw Offices", tier: "TIER 1 FIRM", practices: "Dispute Resolution,\nArbitration", location: "New Delhi, India", font: "font-serif text-xl leading-tight" },
  { name: "IndusLaw", tier: "TIER 1 FIRM", practices: "Corporate, M&A, PE", location: "Bangalore, India", font: "font-serif text-3xl" },
  { name: "K&S\npartners", tier: "TIER 1 FIRM", practices: "IP, Patents, Trademarks", location: "New Delhi, India", font: "font-serif text-2xl leading-tight" },
  { name: "Nishith\nDesai\nAssociates", tier: "TIER 1 FIRM", practices: "International Tax,\nCorporate", location: "Mumbai, India", font: "font-serif text-xl leading-tight" },
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
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-28 border-b border-[#222222] bg-[#000000] overflow-hidden">
        <div className="w-full max-w-[2000px] mx-auto flex flex-col lg:flex-row">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] px-6 md:px-12 lg:px-20 xl:px-32 py-20 flex flex-col justify-center z-10">
            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl text-[#FFFFF0] leading-[1.05] tracking-wide mb-6 font-light uppercase">
              LAW FIRM <br/>
              <span className="font-medium text-[#C5A059]">
                EXCELLENCE<sup className="text-[0.4em] ml-2">™</sup>
              </span>
            </h1>
            
            <p className="text-sm md:text-base text-[#FFFFF0]/80 font-light leading-relaxed mb-12 max-w-md">
              Recognising the world's leading law firms for their unwavering commitment to excellence.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center bg-[#050505] border border-[#333333] rounded-lg w-full max-w-xl focus-within:border-[#C5A059] transition-colors overflow-hidden group">
                <div className="pl-4 pr-3 py-4">
                  <Search className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search law firms, practice areas, jurisdictions..."
                  className="w-full bg-transparent border-none py-4 pr-4 text-[0.85rem] text-[#FFFFF0] placeholder:text-[#FFFFF0]/40 focus:outline-none focus:ring-0"
                />
                <button className="px-6 py-4 flex items-center justify-center border-l border-[#333333] hover:bg-[#111111] transition-colors group-focus-within:border-[#C5A059]">
                  <Search className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-[#FFFFF0]/50 tracking-wider">
                Popular Searches: 
                <span className="text-[#FFFFF0]/80 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] underline-offset-4">Corporate / M&A</span>
                <span className="text-[#FFFFF0]/80 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] underline-offset-4">Dispute Resolution</span>
                <span className="text-[#FFFFF0]/80 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] underline-offset-4">Tax</span>
                <span className="text-[#FFFFF0]/80 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] underline-offset-4">Arbitration</span>
                <span className="text-[#FFFFF0]/80 cursor-pointer hover:text-[#C5A059] transition-colors underline decoration-[#333333] underline-offset-4">Banking & Finance</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-[55%] relative h-[400px] lg:h-auto min-h-[500px]">
             {/* Gradient fade to blend image smoothly on the left */}
             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 hidden lg:block" />
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-10" />
             
             {/* Note: In production, we'll assume firm_lobby_hero.jpg exists in public/collections/ */}
             <img 
               src="/collections/firm_lobby_hero.jpg" 
               alt="Law Firm Excellence" 
               className="w-full h-full object-cover object-center absolute inset-0 brightness-[0.7] contrast-125"
             />
             
             {/* Subtle golden ambient glow over the image */}
             <div className="absolute inset-0 bg-[#C5A059]/5 mix-blend-overlay pointer-events-none" />
          </div>

        </div>
      </section>

      {/* 2. FEATURED LAW FIRMS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#222222]">
          <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">FEATURED LAW FIRMS</h2>
          <Link href="#" className="hidden md:flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
            VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredFirms.map((firm, idx) => (
            <Link key={idx} href="#" className="group flex flex-col justify-between p-6 bg-[#050505] border border-[#222222] rounded-[4px] min-h-[220px] hover:border-[#C5A059]/50 transition-colors shadow-sm">
              <div className="flex flex-col">
                <div className="h-16 flex items-center mb-6">
                  <h3 className={`${firm.font} text-[#FFFFF0] leading-snug whitespace-pre-line group-hover:text-[#C5A059] transition-colors`}>
                    {firm.name}
                  </h3>
                </div>
                <span className="text-[0.55rem] font-medium tracking-[0.15em] text-[#C5A059] mb-3 uppercase">{firm.tier}</span>
                <p className="text-[0.7rem] text-[#FFFFF0]/80 whitespace-pre-line leading-relaxed mb-4">{firm.practices}</p>
              </div>
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center gap-1.5 text-[0.65rem] text-[#FFFFF0]/50 tracking-wider">
                  <MapPin className="w-3 h-3 text-[#C5A059]" /> {firm.location}
                </div>
                <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-[#FFFFF0]/40 group-hover:text-[#C5A059] transition-colors">
                  VIEW PROFILE <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center w-full">
           <button className="w-full max-w-xl py-4 border border-[#333333] rounded-[4px] text-[0.65rem] uppercase tracking-[0.2em] text-[#FFFFF0]/70 hover:bg-[#111111] hover:text-[#C5A059] hover:border-[#C5A059]/50 transition-colors flex items-center justify-center gap-2">
             VIEW ALL LAW FIRMS <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </section>

      {/* 3. EXPLORE BY PRACTICE AREA */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-12">
        <div className="flex flex-col mb-8 pb-4 border-b border-[#222222]">
          <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">EXPLORE BY PRACTICE AREA</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-6 overflow-x-auto pb-4 custom-scrollbar">
          {practiceAreas.map((area, idx) => (
            <Link key={idx} href="#" className="flex flex-col items-center gap-4 group min-w-[100px]">
              <area.icon className="w-7 h-7 text-[#C5A059] stroke-[1px] group-hover:scale-110 transition-transform" />
              <span className="text-[0.65rem] text-[#FFFFF0]/70 group-hover:text-[#C5A059] transition-colors text-center uppercase tracking-widest">{area.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. LIVE FEED & MAP STATS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Live Feed */}
          <div className="flex-1 bg-[#050505] border border-[#222222] rounded-[4px] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-[#222222] pb-4">
              <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">LIVE FROM THE INDEX</h2>
              <div className="flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.2em] text-green-500 uppercase">
                <Circle className="w-2 h-2 fill-green-500 animate-pulse" /> LIVE
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {liveUpdates.map((update, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center shrink-0 group-hover:border-[#C5A059] transition-colors">
                    <update.icon className="w-3.5 h-3.5 text-[#C5A059]" />
                  </div>
                  <p className="text-[0.75rem] text-[#FFFFF0]/80 leading-relaxed pr-8">{update.text}</p>
                  <span className="ml-auto text-[0.6rem] text-[#FFFFF0]/40 shrink-0 uppercase tracking-widest mt-1">{update.time}</span>
                </div>
              ))}
            </div>

            <Link href="#" className="mt-8 pt-6 border-t border-[#222222] flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
              VIEW ALL UPDATES <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Map Stats */}
          <div className="flex-1 bg-[#050505] border border-[#222222] rounded-[4px] p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(197,160,89,0.05)_0%,_transparent_60%)] pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 border-b border-[#222222] pb-4 relative z-10">
              <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">TOP LAW FIRMS BY JURISDICTION</h2>
              <div className="px-3 py-1.5 border border-[#333333] rounded-[2px] bg-[#000000] text-[0.65rem] text-[#FFFFF0] cursor-pointer flex items-center gap-2">
                India <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12 relative z-10 flex-grow">
              {/* Map Placeholder */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative opacity-60">
                 {/* A simple dotted map representation using unicode dots for illustration, but realistically this would be an SVG. Since we can't easily inline a complex map SVG, we'll simulate the look. */}
                 <div className="w-full h-full bg-[#111111] rounded-full flex items-center justify-center relative overflow-hidden border border-[#222222]">
                    <Globe className="w-32 h-32 text-[#333333]" strokeWidth={0.5} />
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#C5A059] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#C5A059] animate-pulse" />
                 </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-8 justify-center flex-grow">
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-[#C5A059] w-16">120+</span>
                  <span className="text-[0.7rem] text-[#FFFFF0]/80 tracking-widest uppercase">Law Firms Recognised</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-[#C5A059] w-16">25+</span>
                  <span className="text-[0.7rem] text-[#FFFFF0]/80 tracking-widest uppercase">Cities Represented</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl text-[#C5A059] w-16">15+</span>
                  <span className="text-[0.7rem] text-[#FFFFF0]/80 tracking-widest uppercase">Practice Areas</span>
                </div>
              </div>
            </div>

            <Link href="#" className="mt-8 pt-6 border-t border-[#222222] flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors relative z-10">
              VIEW ALL JURISDICTIONS <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. TRUST BADGES */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-12 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-[#222222] py-8">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <badge.icon className="w-8 h-8 text-[#C5A059] stroke-[1px]" />
              <div className="flex flex-col">
                <span className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/80 leading-tight">{badge.title}</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/50 leading-tight">{badge.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
