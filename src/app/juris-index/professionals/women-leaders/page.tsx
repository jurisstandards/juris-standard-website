"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowRight, ShieldCheck, Share2, FileText, Code2, QrCode,
  Scale, Building2, MapPin, Award, Globe, Users,
  ArrowRightCircle, User, Star, Landmark, Briefcase
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function WomenLeadersTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";
  const recordsRef = useRef<HTMLDivElement>(null);

  const scrollToRecords = () => {
    recordsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-[#222222]">
        
        {/* Full-width Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src="/collections/women_leaders_bg.png" 
            alt="Women Leaders" 
            className="w-full h-full object-contain opacity-100 scale-75"
            style={{ objectPosition: '60% center' }}
          />
        </div>

        {/* Left gradient — dark shadow behind the text */}
        <div 
          className="absolute inset-0 z-1 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.0) 75%)' }}
        />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-1 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-1 pointer-events-none" />
        {/* Right edge fade — wider to cover the image border */}
        <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-black via-black/90 to-transparent z-1 pointer-events-none" />

        {/* Hero Content */}
        <div className={`${containerClasses} relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8`}>
          <div className="flex flex-col max-w-xl lg:max-w-2xl w-full mt-8">

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-[1px] bg-[#CBAA69]" />
              <span className="text-[0.60rem] uppercase tracking-[0.2em] text-[#CBAA69] font-medium font-sans">
                THE INSTITUTIONAL RECORD OF WOMEN SHAPING LAW
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] font-light leading-[1.05] tracking-tight drop-shadow-2xl mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block mb-2">
                WOMEN
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D3] to-[#CBAA69] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-2 pr-4 relative">
                LEADERS<sup className="text-[0.35em] ml-1 absolute top-4 text-[#D4AF37]">™</sup>
              </span>
            </h1>

            <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-10 leading-[1.7] font-light tracking-wide shadow-sm">
              A considered record of women distinguished by legal excellence, leadership, professional contribution and lasting influence across the legal profession.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button onClick={scrollToRecords} className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]">
                ENTER THE RECORD <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/about" className="px-8 py-3.5 border border-[#333333] bg-[#000000]/50 backdrop-blur-sm text-[#FFFFF0] text-[0.7rem] font-semibold uppercase tracking-[0.15em] hover:border-[#FFFFF0] hover:bg-white/5 transition-all flex items-center gap-3 rounded-[2px]">
                THE STANDARD <ArrowRight className="w-4 h-4 text-[#FFFFF0]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECOGNISED WOMEN HORIZONTAL BANDS */}
      <div className="flex flex-col w-full relative z-10 bg-[#000000] pt-8">
        {[
          {
            num: "01",
            title: "WOMEN LEADERS™ 2027",
            subtitle: "THE PRINCIPAL RECORD",
            link: "VIEW COMPLETE RECORD",
            lawyers: [
              { name: "ANJALI MALHOTRA", type: "Senior Advocate", firmName: "Supreme Court of India", loc: "New Delhi", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" },
              { name: "NEHA MEHTA", type: "Managing Partner", firmName: "Shardul Amarchand\nMangaldas", loc: "New Delhi", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" },
              { name: "PRIYA SHAH", type: "Partner", firmName: "AZB & Partners", loc: "Mumbai", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" },
              { name: "RITU GUPTA", type: "General Counsel", firmName: "Reliance Industries\nLimited", loc: "Mumbai", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" },
              { name: "VIDHI KASLIWAL", type: "Partner", firmName: "Khaitan & Co", loc: "Mumbai", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" },
              { name: "NANDINI SETHI", type: "Partner", firmName: "Trilegal", loc: "Bengaluru", badge: "WOMEN LEADERS™\n2027 • RECOGNISED" }
            ]
          },
          {
            num: "02",
            title: "DISTINGUISHED WOMEN™",
            subtitle: "THE ESTABLISHED RECORD",
            link: "VIEW RECORD",
            lawyers: [
              { name: "INDIRA JAISING", type: "Senior Advocate", firmName: "", loc: "New Delhi", badge: "DISTINGUISHED WOMEN™" },
              { name: "CHANDHIOK NIDHI", type: "Partner", firmName: "Dua Associates", loc: "New Delhi", badge: "DISTINGUISHED WOMEN™" },
              { name: "SANGEETA KAPUR", type: "Senior Advocate", firmName: "", loc: "New Delhi", badge: "DISTINGUISHED WOMEN™" },
              { name: "SAVITHA KUMAR", type: "Managing Partner", firmName: "Shardul Amarchand\nMangaldas", loc: "Chennai", badge: "DISTINGUISHED WOMEN™" },
              { name: "ANURADHA CHOUDRY", type: "Senior Advocate", firmName: "", loc: "New Delhi", badge: "DISTINGUISHED WOMEN™" },
              { name: "ROOPA PURUSHOTHAMAN", type: "Partner", firmName: "JSA", loc: "Bengaluru", badge: "DISTINGUISHED WOMEN™" }
            ]
          },
          {
            num: "03",
            title: "NEXT GENERATION™",
            subtitle: "THE FUTURE OF LEGAL LEADERSHIP",
            link: "VIEW RECORD",
            lawyers: [
              { name: "ISHITA JAIN", type: "Partner", firmName: "Link Legal", loc: "Mumbai", badge: "NEXT GENERATION™" },
              { name: "APOORVA MANDAVIA", type: "Partner", firmName: "Cyril Amarchand\nMangaldas", loc: "Mumbai", badge: "NEXT GENERATION™" },
              { name: "MEGHNA JAIN", type: "Counsel", firmName: "AZB & Partners", loc: "Mumbai", badge: "NEXT GENERATION™" },
              { name: "AISHWARYA BHAT", type: "Partner", firmName: "Shardul Amarchand\nMangaldas", loc: "New Delhi", badge: "NEXT GENERATION™" },
              { name: "PRIYANKA SACHDEV", type: "Counsel", firmName: "Trilegal", loc: "Bengaluru", badge: "NEXT GENERATION™" },
              { name: "KANIKA MOHAN", type: "Associate Partner", firmName: "Dentons Link Legal", loc: "Mumbai", badge: "NEXT GENERATION™" }
            ]
          }
        ].map((band, idx) => (
          <div key={idx} className="w-full mb-12 relative">
            <div className={`${containerClasses} flex flex-col`}>
              
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#333] pb-4 mb-6">
                <div className="flex gap-4 items-end">
                  <div className="font-serif text-3xl md:text-5xl text-[#CBAA69] font-light leading-none">{band.num}</div>
                  <div className="flex flex-col border-l border-[#333] pl-4">
                    <h2 className="font-serif text-[1.1rem] md:text-[1.3rem] text-white uppercase tracking-[0.1em] leading-tight mb-1">{band.title}</h2>
                    <span className="text-[0.6rem] font-medium text-[#CBAA69] uppercase tracking-[0.2em]">{band.subtitle}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 text-[0.55rem] font-bold text-white/50 uppercase tracking-[0.2em] hover:text-[#CBAA69] transition-colors flex items-center gap-2">
                  {band.link} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Grid of Lawyer Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
                {band.lawyers.map((lawyer, fIdx) => (
                  <div key={fIdx} className="w-full flex flex-col border border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#CBAA69]/60 transition-colors duration-200 relative cursor-pointer group/card rounded-[2px] overflow-hidden">
                    
                    {/* Photo Placeholder */}
                    <div className="w-full h-[150px] bg-[#111] relative overflow-hidden flex items-end justify-center">
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                       <User className="w-[5rem] h-[5rem] text-[#333] mb-[-10px] relative z-0" strokeWidth={1} />
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1 relative z-10">
                      <h3 className="font-serif text-[0.7rem] leading-tight tracking-[0.05em] text-white mb-2 group-hover/card:text-[#CBAA69] transition-colors">
                        {lawyer.name}
                      </h3>
                      <span className="text-[0.5rem] text-[#CBAA69] leading-tight mb-1">{lawyer.type}</span>
                      {lawyer.firmName && <span className="text-[0.5rem] text-white/50 leading-tight mb-1 whitespace-pre-line">{lawyer.firmName}</span>}
                      <span className="text-[0.5rem] text-white/50 leading-tight">{lawyer.loc}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-[#2a2a2a] py-3 px-4 relative z-10">
                      <div className="text-[0.4rem] font-medium tracking-[0.1em] text-[#CBAA69] whitespace-pre-line leading-snug">{lawyer.badge}</div>
                      <ArrowRightCircle className="w-3.5 h-3.5 text-[#CBAA69]/50 group-hover/card:text-[#CBAA69] transition-colors shrink-0" strokeWidth={1.5} />
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* 3. UNIFIED EXPLORE & RECOGNITION FOOTER PANEL */}
      <section className={`${containerClasses} py-16`}>
        <div className="w-full border border-[#CBAA69]/30 rounded-[2px] relative bg-[#050505] flex flex-col">
          
          {/* ROW 1: EXPLORE THE RECORD */}
          <div className="flex flex-col lg:flex-row w-full pt-10 pb-10 border-b border-[#CBAA69]/20 px-4 lg:px-6">
            <div className="flex items-center justify-center mb-6 lg:hidden">
              <h2 className="text-[0.75rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase">EXPLORE THE RECORD</h2>
            </div>
            {/* 3 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 flex-1 border-r-0 lg:border-r border-[#CBAA69]/20 gap-y-10 lg:gap-y-0 relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden lg:block">
                <h2 className="text-[0.75rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">EXPLORE THE RECORD</h2>
              </div>
              
              {/* Col 1 — By Professional Field */}
              <div className="flex flex-col px-4 lg:px-6 pt-4">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] text-[#CBAA69] uppercase">BY PROFESSIONAL FIELD</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[0.55rem] text-white/50">
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Corporate</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">IP</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Litigation</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Tax</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Arbitration</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">In-House</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Public Law</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Other</span>
                </div>
              </div>

              {/* Col 2 — By Professional Setting */}
              <div className="flex flex-col px-4 lg:px-6 pt-4">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] text-[#CBAA69] uppercase">BY PROFESSIONAL SETTING</span>
                </div>
                <div className="flex flex-col gap-3 text-[0.55rem] text-white/50">
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Law Firm</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Chambers</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Independent</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Academia</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Institution</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">In-House</span>
                </div>
              </div>

              {/* Col 3 — By Jurisdiction */}
              <div className="flex flex-col px-4 lg:px-6 pt-4">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
                  <span className="text-[0.6rem] font-bold tracking-[0.15em] text-[#CBAA69] uppercase">BY JURISDICTION</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[0.55rem] text-white/50">
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">India</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Bengaluru</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Mumbai</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Chennai</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Delhi</span>
                  <span className="hover:text-[#CBAA69] cursor-pointer transition-colors">Other</span>
                </div>
              </div>
            </div>

            {/* Button Column */}
            <div className="flex flex-col justify-center px-10 shrink-0 mt-10 lg:mt-0">
               <button className="px-10 py-5 border border-[#CBAA69]/30 hover:border-[#CBAA69] bg-transparent text-[#CBAA69] text-[0.6rem] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-3 rounded-[2px] leading-tight whitespace-nowrap">
                 EXPLORE COMPLETE INDEX <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* ROW 2: THE JURIS STANDARD RECORD + OFFICIAL DIGITAL RECOGNITION */}
          <div className="flex flex-col lg:flex-row w-full pt-8 pb-8 px-4 lg:px-6">
            
            {/* Left: The Juris Standard Record */}
            <div className="flex flex-col flex-1 lg:border-r border-[#CBAA69]/20 px-4 lg:px-6 mb-8 lg:mb-0">
              <h2 className="text-[0.6rem] font-bold tracking-[0.15em] text-white/50 uppercase mb-6">THE JURIS STANDARD RECORD™</h2>
              <div className="flex items-center justify-between w-full pr-8">
                 {[
                   { icon: Award, label: "Legal\nExcellence" },
                   { icon: Star, label: "Leadership" },
                   { icon: Users, label: "Professional\nContribution" },
                   { icon: Globe, label: "Influence" },
                   { icon: Scale, label: "Mentorship" },
                   { icon: ShieldCheck, label: "Professional\nStanding" },
                 ].map((item, idx) => (
                   <div key={idx} className="flex flex-col items-center gap-3 cursor-pointer group">
                     <item.icon className="w-5 h-5 text-[#CBAA69] group-hover:text-[#E8D099] transition-colors" strokeWidth={1} />
                     <span className="text-[0.4rem] text-white/40 tracking-[0.1em] uppercase group-hover:text-white transition-colors text-center whitespace-pre-line">{item.label}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* Right: Digital Recognition */}
            <div className="flex flex-col flex-1 px-4 lg:px-10">
              <h2 className="text-[0.6rem] font-bold tracking-[0.15em] text-[#CBAA69] uppercase mb-6">OFFICIAL DIGITAL RECOGNITION</h2>
              <div className="flex items-center justify-between w-full">
                 {[
                   { icon: ShieldCheck, label: "VERIFY" },
                   { icon: Share2, label: "SHARE" },
                   { icon: FileText, label: "CERTIFICATE" },
                   { icon: Code2, label: "EMBED" },
                   { icon: QrCode, label: "QR" },
                 ].map((item, idx) => (
                   <div key={idx} className={`flex flex-col items-center gap-3 cursor-pointer group px-4 lg:px-6 ${idx < 4 ? 'border-r border-[#333]' : ''}`}>
                     <item.icon className="w-5 h-5 text-[#CBAA69] group-hover:text-[#E8D099] transition-colors" strokeWidth={1} />
                     <span className="text-[0.45rem] text-white/40 tracking-[0.1em] uppercase group-hover:text-white transition-colors">{item.label}</span>
                   </div>
                 ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
