"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ChevronDown, 
  MapPin, Award, Scale, Globe, Building2, CheckCircle2,
  ShieldCheck, Share2, FileText, Code2, QrCode, Briefcase,
  Users, Landmark, Star, User
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function WomenLeadersTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [location, setLocation] = useState("");
  const [recognition, setRecognition] = useState("");
  const [setting, setSetting] = useState("");
  const lawyersRef = useRef<HTMLDivElement>(null);
  
  const [dynamicLawyers, setDynamicLawyers] = useState<any[]>([]);
  useEffect(() => {
    const fetchLawyers = async () => {
      const { data } = await supabase
        .from('juris_records')
        .select('*')
        .eq('division', 'Women Leaders™');
      if (data) {
        setDynamicLawyers(data);
      }
    };
    fetchLawyers();
  }, []);

  const handleSearch = () => lawyersRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleReset = () => { setSearchQuery(""); setPracticeArea(""); setLocation(""); setRecognition(""); setSetting(""); };


  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION WITH SEARCH SIDEBAR */}
      <section className="relative w-full min-h-[100vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-[#222222]">
        
        {/* Contained Background Image Layer */}
        <div className="absolute top-0 bottom-0 left-[5%] md:left-[15%] lg:left-[22%] xl:left-[25%] w-[95%] md:w-[85%] lg:w-[78%] xl:w-[75%] h-full z-0 pointer-events-none overflow-hidden">
          <img 
            src="/collections/corporate_elite_bg.png" 
            alt="Women Leaders Monument" 
            className="w-full h-full object-contain object-center opacity-95 transition-all duration-700 -translate-x-[10%] md:-translate-x-[15%] lg:-translate-x-[20%] xl:-translate-x-[22%] translate-y-[10%] scale-90"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 35%, black 70%, transparent 90%, transparent 100%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 35%, black 70%, transparent 90%, transparent 100%)' 
            }}
          />
        </div>
        
        {/* Overlay Gradients for Seamless Blending */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.95) 28%, rgba(5,5,5,0.3) 42%, rgba(5,5,5,0.02) 55%, rgba(5,5,5,0.05) 72%, rgba(5,5,5,0.8) 100%)'
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#050505] via-[#050505] to-transparent z-0 pointer-events-none" />

        {/* Hero Content container */}
        <div className={`${containerClasses} relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8`}>
          
          {/* Left: Titles & Buttons */}
          <div className="flex flex-col max-w-xl lg:max-w-2xl w-full mt-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-[1px] bg-[#CBAA69]" />
              <span className="text-[0.60rem] uppercase tracking-[0.2em] text-[#CBAA69] font-medium font-sans">
                THE INSTITUTIONAL RECORD OF CORPORATE LEGAL EXCELLENCE
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] font-light leading-[1.05] tracking-tight drop-shadow-2xl mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block mb-2">
                CORPORATE
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D3] to-[#CBAA69] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-2 pr-4 relative">
                ELITE<sup className="text-[0.35em] ml-1 absolute top-4 text-[#D4AF37]">™</sup>
              </span>
            </h1>
            
            <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-10 leading-[1.7] font-light tracking-wide shadow-sm">
              Recognising lawyers who set the benchmark in corporate legal practice through exceptional expertise, commercial acumen and leadership.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/enter-the-index" className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]">
                ENTER THE INDEX <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#FFFFF0]/50 font-medium">
                TRUSTED BY CORPORATE LEADERS IN 150+ COUNTRIES
              </span>
            </div>
            
            {/* Stats Bar */}
            <div className="w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/5 border-t-white/10 rounded-[4px] flex flex-col md:flex-row items-center justify-between p-3 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CBAA69]/5 via-transparent to-[#CBAA69]/5 pointer-events-none opacity-50" />
              
              {[
                { icon: Users, value: "1K+", label: "COUNSEL RANKED" },
                { icon: Globe, value: "150+", label: "JURISDICTIONS" },
                { icon: Scale, value: "50+", label: "PRACTICE AREAS" },
                { icon: Star, value: "10M+", label: "DATA POINTS" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-4 py-3 md:py-2 px-4 flex-1 border-b md:border-b-0 md:border-r border-white/5 last:border-0 relative z-10 hover:bg-white/[0.02] transition-colors rounded-[2px]">
                  <div className="relative flex-shrink-0">
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-[#CBAA69] relative z-10 stroke-[1px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-[1.1rem] md:text-[1.25rem] text-white leading-none mb-1.5 tracking-tight drop-shadow-sm">{stat.value}</span>
                    <span className="text-[0.45rem] md:text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 font-semibold leading-none">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Search & Explore Panel */}
          <div className="w-full lg:w-[380px] shrink-0 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[2px] p-7 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/95 uppercase mb-6">SEARCH CORPORATE COUNSEL</h3>
            
            <div className="flex items-center border-b border-white/10 pb-3 mb-6 group focus-within:border-[#CBAA69]/60 transition-colors">
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Search lawyer name, firm or company..."
                className="w-full bg-transparent border-none text-xs text-white placeholder:text-white/30 focus:outline-none"
              />
              <button onClick={handleSearch}><Search className="w-4 h-4 text-white/30 hover:text-[#CBAA69] transition-colors" /></button>
            </div>
            
            <div className="flex flex-col gap-5 mb-8">
              {[
                { label: 'PRACTICE AREA', val: 'All Practice Areas', icon: Briefcase, options: ["Corporate Governance", "M&A", "Corporate Finance", "Banking & Finance", "Capital Markets", "Taxation", "Competition/Antitrust", "Insolvency & Restructuring", "Regulatory & Compliance", "Employment & Labour", "Intellectual Property", "Technology & AI", "Data Protection & Privacy", "Real Estate", "Infrastructure & Projects", "Energy & Power", "International Trade", "Foreign Investment", "Environmental & ESG"], state: practiceArea, set: setPracticeArea },
                { label: 'PROFESSIONAL SETTING', val: 'All', icon: Building2, options: ['Law Firm','In-House','Chambers','Independent'], state: setting, set: setSetting },
                { label: 'LOCATION', val: 'All Cities', icon: MapPin, options: ['Mumbai','New Delhi','Bengaluru','Hyderabad','Chennai'], state: location, set: setLocation },
                { label: 'RECOGNITION', val: 'Women Leaders™ - 2027', icon: Award, options: ['2027','2026','2025'], state: recognition, set: setRecognition }
              ].map((dropdown, idx) => (
                <div key={idx} className="flex flex-col gap-2 relative">
                  <div className="flex items-center gap-2">
                    <dropdown.icon className="w-3.5 h-3.5 text-[#CBAA69]" />
                    <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-white/40">{dropdown.label}</span>
                  </div>
                  <div className="relative group">
                    <select value={dropdown.state} onChange={e => dropdown.set(e.target.value)} className="w-full appearance-none px-4 py-3 border border-white/5 bg-[#000000] text-xs text-white/80 focus:outline-none cursor-pointer rounded-[2px] hover:border-white/20 focus:border-[#CBAA69]/50 transition-colors">
                      <option value="">{dropdown.val}</option>
                      {dropdown.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#CBAA69] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-[#E8D099] transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button onClick={handleSearch} className="w-full py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center justify-center gap-3 rounded-[2px] shadow-[0_0_15px_rgba(203,170,105,0.15)]">
                SEARCH <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleReset} className="w-full py-3 border border-white/5 bg-black/40 text-white/50 text-[0.65rem] font-medium uppercase tracking-[0.15em] hover:border-white/20 hover:bg-white/5 hover:text-white/90 transition-all flex items-center justify-center rounded-[2px]">
                RESET FILTERS
              </button>
            </div>
            
            <div className="flex items-start justify-between border-t border-white/10 pt-6 px-1">
              <Link href="/juris-index/compare" className="flex flex-col items-center gap-2 cursor-pointer group">
                <Scale className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Compare<br/>Counsel</span>
              </Link>
              <Link href="/my-juris" className="flex flex-col items-center gap-2 cursor-pointer group">
                <ShieldCheck className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Saved<br/>Profiles</span>
              </Link>
              <Link href="/my-juris/history" className="flex flex-col items-center gap-2 cursor-pointer group">
                <Globe className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Recently<br/>Viewed</span>
              </Link>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => alert("Link copied!"))} className="flex flex-col items-center gap-2 cursor-pointer group">
                <Share2 className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Share<br/>Record</span>
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. RECOGNISED LAWYERS HORIZONTAL BANDS */}
      <div ref={lawyersRef} className="flex flex-col w-full relative z-10 bg-[#000000]">
        {[
          { tag: "THE PRINCIPAL RECORD", title: "Women Leaders 2027", desc: "", lawyers: [] as any[] },
          { tag: "DISTINGUISHED RECORD", title: "Distinguished Women", desc: "", lawyers: [] as any[] },
          { tag: "NEXT GENERATION", title: "Next Generation", desc: "", lawyers: [] as any[] }
        ].map((band, idx) => {
          let mergedLawyers = [...band.lawyers];
          const dbLawyersForBand = dynamicLawyers
            .filter(l => l.category === band.title || (idx === 0 && !l.category))
            .map(l => ({
               id: l.id,
               name: l.name,
               type: l.firmInfo?.designation || l.type || 'Partner',
               firmName: l.firmInfo?.firm_name || l.name,
               loc: l.location || l.headquarters_city || '',
               badge: `${l.year || '2027'} - RECOGNISED`
            }));
          mergedLawyers = [...dbLawyersForBand, ...mergedLawyers];

          return (
          <div key={idx} className="w-full border-b border-white/[0.06] last:border-0 relative">
            <div className={`${containerClasses} py-6 md:py-10 flex flex-col gap-6`}>
              
              {/* Band Header — inline, minimal, matching Law Firm Excellence */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.06] pb-5">
                <div className="flex items-center gap-5">
                  {/* thin gold line accent */}
                  <div className="w-[3px] h-10 bg-gradient-to-b from-[#CBAA69] to-[#7a6030] rounded-full shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[0.5rem] font-medium uppercase tracking-[0.3em] text-[#CBAA69]/70">{band.tag}</span>
                    <h2 className="font-serif text-2xl md:text-[1.75rem] text-white font-light tracking-wide leading-none">{band.title}</h2>
                    {band.desc && (
                      <p className="text-[0.55rem] uppercase tracking-[0.15em] text-white/40 mt-1">{band.desc}</p>
                    )}
                  </div>
                </div>
                {/* Recognition badge */}
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 border border-[#CBAA69]/20 rounded-[2px] shrink-0 self-start md:self-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CBAA69]" />
                  <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 font-medium">THE GLOBAL GOLD STANDARD</span>
                </div>
              </div>

              {/* Lawyer Cards row */}
              <div className="relative">
                <div className="overflow-x-auto pb-4 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex items-stretch gap-4 min-w-max pr-12">
                    {mergedLawyers.map((lawyer, fIdx) => (
                      <Link key={fIdx} href={`/juris-index/professionals/women-leaders/${(lawyer as any).id || lawyer.name.toLowerCase().replaceAll(' ', '-')}`} className="w-[200px] sm:w-[220px] h-[300px] flex flex-col border border-[#1a1a1a] bg-[#080808] hover:border-[#CBAA69]/40 transition-colors duration-200 relative cursor-pointer group/card overflow-hidden">
                        
                        {/* Permanent gold top accent */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#CBAA69]/60 via-[#CBAA69]/30 to-transparent flex-shrink-0" />

                        {/* Photo Placeholder */}
                        <div className="w-full h-[120px] bg-[#0c0c0c] border-b border-[#1a1a1a] relative overflow-hidden flex items-end justify-center">
                           <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10 opacity-80" />
                           <User className="w-16 h-16 text-[#222] mb-[-12px] relative z-0" strokeWidth={1} />
                        </div>

                        {/* Info */}
                        <div className="p-4 flex flex-col flex-1 relative z-10 text-center items-center justify-center">
                          <h3 className="font-serif text-lg leading-tight tracking-[0.05em] text-white/95 mb-2 group-hover/card:text-[#CBAA69] transition-colors">
                            {lawyer.name}
                          </h3>
                          <span className="text-[0.55rem] uppercase tracking-[0.1em] text-white/60 leading-tight mb-1">{lawyer.type}</span>
                          <span className="text-[0.55rem] uppercase tracking-[0.1em] text-[#CBAA69]/70 leading-tight mb-1">{lawyer.firmName}</span>
                          <span className="text-[0.55rem] uppercase tracking-[0.1em] text-white/40 leading-tight">{lawyer.loc}</span>
                        </div>
                        
                        {/* Footer Badge */}
                        <div className="border-t border-[#1a1a1a] px-4 py-3 flex items-center justify-center gap-1.5 relative z-10 bg-[#050505]">
                          <div className="w-1 h-1 rounded-full bg-[#CBAA69]/60 flex-shrink-0" />
                          <div className="text-[0.45rem] font-medium uppercase tracking-[0.2em] text-[#CBAA69]/70">{lawyer.badge}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Right fade — scroll hint */}
                <div className="absolute top-0 right-0 bottom-1 w-20 bg-gradient-to-l from-[#000000] to-transparent pointer-events-none" />
              </div>
              
              {/* View All button — below cards, right-aligned */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-3 px-6 py-2.5 border border-[#CBAA69]/20 text-[#CBAA69] text-[0.55rem] font-medium uppercase tracking-[0.2em] hover:border-[#CBAA69]/60 hover:bg-[#CBAA69]/5 transition-all duration-200 rounded-[2px]"
                >
                  VIEW ALL IN THIS CATEGORY <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
          );
        })}
      </div>

      {/* 3. UNIFIED EXPLORE & RECOGNITION FOOTER PANEL */}
      <section className={`${containerClasses} py-20`}>
        <div className="w-full border border-[#CBAA69]/30 rounded-[2px] relative bg-[#050505] flex flex-col shadow-2xl">
          
          {/* ROW 1: EXPLORE THE COMPLETE INDEX */}
          <div className="relative pt-14 pb-12 border-b border-[#CBAA69]/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.85rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">EXPLORE THE COMPLETE CORPORATE INDEX</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center w-full px-4 lg:px-6">
              {/* 4 Columns Grid (NO vertical borders between them!) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 border-r border-[#CBAA69]/20 gap-y-6">
                
                {/* Col 1 */}
                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex flex-col gap-6 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Briefcase className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Projects & Energy</span>
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Briefcase className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Data Protection & Privacy</span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex flex-col gap-6 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Building2 className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Competition & Antitrust</span>
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Building2 className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Employment</span>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex flex-col gap-6 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Award className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Regulatory & Governance</span>
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Award className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Insurance</span>
                  </div>
                </div>

                {/* Col 4 */}
                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex flex-col gap-6 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Landmark className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Restructuring & Insolvency</span>
                    <span className="flex items-center gap-4 hover:text-[#CBAA69] transition-colors"><Landmark className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} /> Life Sciences & Healthcare</span>
                  </div>
                </div>
              </div>

              {/* Button Column */}
              <div className="flex flex-col justify-center px-10 shrink-0 mt-8 lg:mt-0">
                 <Link href="/juris-index" className="w-[240px] py-4 border border-[#CBAA69]/30 hover:border-[#CBAA69] bg-transparent text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-4 rounded-[2px] leading-tight mb-4">
                   <Briefcase className="w-4 h-4" strokeWidth={1.5} /> 
                   <span className="text-left">EXPLORE<br/>COMPLETE INDEX</span> 
                   <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                 </Link>
                 <span className="text-[0.55rem] text-white/40 leading-relaxed text-center mx-auto w-[200px]">
                   Access the full record across all corporate legal practices.
                 </span>
              </div>
            </div>
          </div>

          {/* ROW 2: OFFICIAL DIGITAL RECOGNITION */}
          <div className="relative pt-12 pb-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.65rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">OFFICIAL DIGITAL RECOGNITION</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-6 gap-10 lg:gap-0">
              
              {/* Left side text */}
              <div className="flex flex-col flex-1 px-6 lg:px-8">
                <h2 className="text-[1.15rem] font-serif tracking-wide text-white/95 uppercase mb-2">THE JURIS STANDARD INDEX™</h2>
                <p className="text-[0.65rem] text-white/50 tracking-wide mb-6">A mark of trust. A standard of distinction.</p>
                <div className="w-10 h-[1px] bg-[#CBAA69]" />
              </div>

              {/* Right side icons */}
              <div className="flex items-center justify-center shrink-0">
                 {[
                   { icon: ShieldCheck, label: "VERIFY" },
                   { icon: Share2, label: "SHARE" },
                   { icon: FileText, label: "CERTIFICATE" },
                   { icon: Code2, label: "EMBED" },
                   { icon: QrCode, label: "QR CODE" }
                 ].map((item, idx) => (
                   <div key={idx} className={`flex flex-col items-center gap-4 px-8 lg:px-12 cursor-pointer group ${idx < 4 ? 'border-r border-[#CBAA69]/20' : ''}`}>
                     <item.icon className="w-5 h-5 text-[#CBAA69] group-hover:text-[#E8D099] transition-colors" strokeWidth={1.5} />
                     <span className="text-[0.55rem] text-white/50 tracking-[0.2em] uppercase group-hover:text-white transition-colors">{item.label}</span>
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
