"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ChevronDown, 
  MapPin, Award, Scale, Globe, Building2,
  ShieldCheck, Share2, FileText, Code2, QrCode, Briefcase,
  Users, Landmark, Star
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LawFirmExcellenceTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [practiceArea, setPracticeArea] = useState("");
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [tier, setTier] = useState("");
  const [firmSize, setFirmSize] = useState("");
  const [yearRecognition, setYearRecognition] = useState("");

  const firmsRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    firmsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setSearchQuery("");
    setPracticeArea("");
    setLocation("");
    setCustomLocation("");
    setTier("");
    setFirmSize("");
    setYearRecognition("");
  };

  const handleEnterIndex = () => {
    firmsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadDirectory = () => {
    alert("Directory download will be available soon.");
  };

  
  const [allFirms, setAllFirms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch("/api/admin/records");
        const data = await res.json();
        
        // Filter out inactive records and only keep Law Firm Excellence division
        const relevant = data.filter((d: any) => d.status === "active" && d.division.startsWith("Law Firm Excellence"));
        
        const mapped = relevant.map((f: any) => ({
          id: f.id,
          name: f.name.replace(" ", "\n"), // add a break for styling
          type: f.firmInfo?.description || f.type || "Advocates & Solicitors",
          loc: f.location || "",
          badge: f.badge || "RECOGNISED - " + (f.year || "2027"),
          logoType: f.logoType || "text",
          tier: f.tier || "01",
          originalName: f.name
        }));
        
        setAllFirms(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);


  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#FFFFF0] flex flex-col items-center justify-center font-sans">
        <div className="w-8 h-8 border border-[#CBAA69] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[0.6rem] uppercase tracking-widest text-[#CBAA69]/60">Loading Directory...</p>
      </div>
    );
  }

  const filteredFirms = allFirms.filter(firm => {
    const q = searchQuery.toLowerCase();
    const nameMatch = !q || (firm.originalName || firm.name).toLowerCase().includes(q) || firm.type.toLowerCase().includes(q) || firm.loc.toLowerCase().includes(q);
    const locMatch = !location || firm.loc.toLowerCase().includes(location.toLowerCase()) || firm.type.toLowerCase().includes(location.toLowerCase());
    return nameMatch && locMatch;
  });

  const bands = [
    {
      title: "Principal Record",
      tag: "LAW FIRM EXCELLENCE™",
      firms: filteredFirms.filter(f => f.tier === "01"),
    },
    {
      title: "Distinguished Law Firms",
      tag: "DISTINGUISHED RECORD™",
      firms: filteredFirms.filter(f => f.tier === "02"),
    },
    {
      title: "Rising Law Firms",
      tag: "NEXT GENERATION™",
      firms: filteredFirms.filter(f => f.tier === "03"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION WITH SEARCH SIDEBAR */}
      <section className="relative w-full flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-8 border-b border-[#222222]">
        
        {/* Contained Background Image Layer */}
        <div className="absolute top-0 bottom-0 left-[5%] md:left-[15%] lg:left-[22%] xl:left-[25%] w-[95%] md:w-[85%] lg:w-[78%] xl:w-[75%] h-full z-0 pointer-events-none overflow-hidden">
          <img 
            src="/collections/law_firm_excellence_bg.png" 
            alt="Pillars of Excellence" 
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
                THE INSTITUTIONAL RECORD OF EXCELLENCE
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] font-light leading-[1.05] tracking-tight drop-shadow-2xl mb-8 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block mb-2">
                LAW FIRM
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D3] to-[#CBAA69] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-2 pr-4 relative">
                EXCELLENCE<sup className="text-[0.35em] ml-1 absolute top-4 text-[#D4AF37]">™</sup>
              </span>
            </h1>
            
            <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-10 leading-[1.7] font-light tracking-wide shadow-sm">
              Recognising law firms that demonstrate exceptional legal capability, professional excellence, client impact and leadership in the practice of law.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button 
                onClick={handleEnterIndex}
                className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]"
              >
                ENTER THE INDEX <ArrowRight className="w-4 h-4" />
              </button>
              <Link 
                href="/about"
                className="px-8 py-3.5 border border-[#333333] bg-[#000000]/50 backdrop-blur-sm text-[#FFFFF0] text-[0.7rem] font-semibold uppercase tracking-[0.15em] hover:border-[#FFFFF0] hover:bg-white/5 transition-all flex items-center gap-3 rounded-[2px]"
              >
                THE STANDARD <ArrowRight className="w-4 h-4 text-[#FFFFF0]" />
              </Link>
              <Link 
                href="/register"
                className="px-8 py-3.5 border border-[#CBAA69]/30 bg-transparent text-[#CBAA69] text-[0.7rem] font-medium uppercase tracking-[0.15em] hover:border-[#CBAA69]/60 hover:bg-[#CBAA69]/5 transition-all flex items-center gap-3 rounded-[2px]"
              >
                APPLY FOR RECOGNITION <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Floating Search & Explore Panel */}
          <div className="w-full lg:w-[380px] shrink-0 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[2px] p-7 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/95 uppercase mb-6">SEARCH & EXPLORE</h3>
            
            <div className="flex items-center border-b border-white/10 pb-3 mb-6 group focus-within:border-[#CBAA69]/60 transition-colors">
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Search law firm by name..."
                className="w-full bg-transparent border-none text-xs text-white placeholder:text-white/30 focus:outline-none"
              />
              <button onClick={handleSearch}>
                <Search className="w-4 h-4 text-white/30 hover:text-[#CBAA69] transition-colors" />
              </button>
            </div>
            
            <div className="flex flex-col gap-5 mb-8">
              {[
                { label: 'PRACTICE AREAS', val: 'All Practice Areas', options: ['Arbitration & ADR', 'Artificial Intelligence', 'Aviation', 'Banking & Finance', 'Capital Markets', 'Competition & Antitrust', 'Constitutional & Public Law', 'Construction', 'Corporate & Commercial', 'Customs & International Trade', 'Data Privacy & Cybersecurity', 'Direct Tax', 'Employment & Labour', 'Energy & Natural Resources', 'Environmental & Climate', 'Family & Private Client', 'Government & Public Sector Advisory', 'Healthcare & Life Sciences', 'Indirect Tax (GST)', 'Infrastructure & Projects', 'Insolvency & Restructuring', 'Insurance', 'Intellectual Property', 'Litigation', 'Maritime & Shipping', 'Media & Entertainment', 'Private Equity & Venture Capital', 'Real Estate', 'Regulatory & Compliance', 'Sports Law', 'Technology, Media & Telecommunications', 'White Collar Crime & Investigations', 'Other (Specify)'], state: practiceArea, set: setPracticeArea },
                { label: 'TIER / RECOGNITION', val: 'All', options: ['Principal Record', 'Distinguished', 'Rising'], state: tier, set: setTier },
                { label: 'FIRM SIZE', val: 'All', options: ['Full Service', 'Specialist', 'Boutique', 'Mid Size'], state: firmSize, set: setFirmSize },
                { label: 'YEAR OF RECOGNITION', val: 'All', options: ['2027', '2026', '2025'], state: yearRecognition, set: setYearRecognition },
              ].map((dropdown, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-white/40">{dropdown.label}</span>
                  <div className="relative group">
                    <select 
                      value={dropdown.state}
                      onChange={e => dropdown.set(e.target.value)}
                      className="w-full appearance-none px-4 py-3 border border-white/5 bg-[#000000] text-xs text-white/80 focus:outline-none cursor-pointer rounded-[2px] hover:border-white/20 focus:border-[#CBAA69]/50 transition-colors"
                    >
                      <option value="">{dropdown.val}</option>
                      {dropdown.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#CBAA69] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                  </div>
                </div>
              ))}

              {/* LOCATION — separate block with custom Other input */}
              <div className="flex flex-col gap-2">
                <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-white/40">LOCATION</span>
                <div className="relative group">
                  <select
                    value={location}
                    onChange={e => { setLocation(e.target.value); if (e.target.value !== 'Other') setCustomLocation(''); }}
                    className="w-full appearance-none px-4 py-3 border border-white/5 bg-[#000000] text-xs text-white/80 focus:outline-none cursor-pointer rounded-[2px] hover:border-white/20 focus:border-[#CBAA69]/50 transition-colors"
                  >
                    <option value="">All Cities</option>
                    <option>Ahmedabad</option>
                    <option>Bengaluru</option>
                    <option>Chandigarh</option>
                    <option>Chennai</option>
                    <option>Gurugram</option>
                    <option>Hyderabad</option>
                    <option>Jaipur</option>
                    <option>Kochi</option>
                    <option>Kolkata</option>
                    <option>Mumbai</option>
                    <option>New Delhi</option>
                    <option>Noida</option>
                    <option>Pune</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#CBAA69] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                </div>
                {location === 'Other' && (
                  <input
                    type="text"
                    value={customLocation}
                    onChange={e => setCustomLocation(e.target.value)}
                    placeholder="Type city name..."
                    className="w-full px-4 py-3 border border-[#CBAA69]/30 bg-[#000000] text-xs text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#CBAA69]/60 rounded-[2px] transition-colors"
                  />
                )}
              </div>

            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={handleSearch}
                className="w-full py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center justify-center gap-3 rounded-[2px] shadow-[0_0_15px_rgba(203,170,105,0.15)]"
              >
                SEARCH FIRMS <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleReset}
                className="w-full py-3 border border-white/5 bg-black/40 text-white/50 text-[0.65rem] font-medium uppercase tracking-[0.15em] hover:border-white/20 hover:bg-white/5 hover:text-white/90 transition-all flex items-center justify-center rounded-[2px]"
              >
                RESET FILTERS
              </button>
            </div>
            
            <div className="flex items-start justify-between border-t border-white/10 pt-6 px-1">
              <button onClick={handleSearch} className="flex flex-col items-center gap-2 cursor-pointer group">
                <Search className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Advanced<br/>Search</span>
              </button>
              <Link href="/juris-index/compare" className="flex flex-col items-center gap-2 cursor-pointer group">
                <Scale className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Compare<br/>Firms</span>
              </Link>
              <Link href="/my-juris" className="flex flex-col items-center gap-2 cursor-pointer group">
                <ShieldCheck className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Saved<br/>Firms</span>
              </Link>
              <button onClick={handleDownloadDirectory} className="flex flex-col items-center gap-2 cursor-pointer group">
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors rotate-90" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Download<br/>Directory</span>
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. RECOGNISED FIRMS HORIZONTAL BANDS */}
      <div ref={firmsRef} className="flex flex-col w-full relative z-10 bg-[#000000]">
        {bands.map((band, idx) => (
          <div key={idx} className="w-full border-b border-white/[0.06] last:border-0 relative">
            <div className={`${containerClasses} py-6 md:py-8 flex flex-col gap-4`}>

              {/* Band Header — inline, minimal */}
              <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-5">
                  {/* thin gold line accent */}
                  <div className="w-[3px] h-8 bg-gradient-to-b from-[#CBAA69] to-[#7a6030] rounded-full shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-[#CBAA69]/70">{band.tag}</span>
                    <h2 className="font-serif text-2xl md:text-[1.75rem] text-white font-light tracking-wide leading-none">{band.title}</h2>
                  </div>
                </div>
                {/* Recognition badge */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#CBAA69]/20 rounded-[2px] shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#CBAA69]" />
                  <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 font-medium">THE GLOBAL GOLD STANDARD</span>
                </div>
              </div>

              {/* Firm Cards row */}
              <div className="relative">
                <div className="overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex items-stretch gap-3 min-w-max">
                    {band.firms.length > 0 ? band.firms.map((firm, fIdx) => (
                      <div
                        key={fIdx}
                        onClick={() => {
                          router.push(`/juris-index/law-firms/${firm.id}`);
                        }}
                        className="w-[210px] sm:w-[230px] h-[260px] sm:h-[280px] flex flex-col cursor-pointer group/card border border-[#1a1a1a] hover:border-[#CBAA69]/40 transition-colors duration-200 bg-[#080808] relative overflow-hidden"
                      >
                        {/* Permanent gold top accent */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-[#CBAA69]/60 via-[#CBAA69]/30 to-transparent flex-shrink-0" />

                        {/* Firm name — centred */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-3">
                          {firm.logoType === 'icon_text' && (
                            <div className="w-6 h-6 border border-[#CBAA69]/30 rounded-full flex items-center justify-center mb-3 flex-shrink-0">
                              <Globe className="w-3 h-3 text-[#CBAA69]/70 stroke-[1px]" />
                            </div>
                          )}
                          <h3 className={`font-serif text-[0.95rem] leading-[1.5] whitespace-pre-line tracking-[0.08em] uppercase ${
                            firm.logoType === 'colored_text' ? 'text-[#CBAA69]' : 'text-white/85 group-hover/card:text-white'
                          } transition-colors duration-150`}>
                            {firm.name.includes('INDUS') ? <><span className="text-[#E53935]">INDUS</span>LAW</> :
                             firm.name.includes('THINK') ? <><span className="text-white">THINK</span><br/><span className="text-[#1E88E5]">LEGAL</span></> :
                             firm.name}
                          </h3>
                        </div>

                        {/* Footer info */}
                        <div className="border-t border-[#1a1a1a] px-4 py-3 flex flex-col gap-1.5">
                          {(firm.type || firm.loc) && (
                            <p className="text-[0.45rem] text-white/30 uppercase tracking-[0.1em] leading-[1.6]">
                              {[firm.type, firm.loc].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-[#CBAA69]/60 flex-shrink-0" />
                            <span className="text-[0.42rem] font-semibold tracking-[0.15em] text-[#CBAA69]/70 uppercase">{firm.badge}</span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="flex items-center justify-center text-white/20 text-xs py-8 px-6 italic">No firms match your search.</div>
                    )}
                  </div>
                </div>
                {/* Right fade — scroll hint */}
                <div className="absolute top-0 right-0 bottom-1 w-20 bg-gradient-to-l from-[#000000] to-transparent pointer-events-none" />
              </div>

              {/* View All button — below cards, right-aligned */}
              <div className="flex justify-end">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-3 px-6 py-2.5 border border-[#CBAA69]/25 text-[#CBAA69] text-[0.55rem] font-semibold uppercase tracking-[0.2em] hover:border-[#CBAA69]/60 hover:bg-[#CBAA69]/5 transition-all duration-200 rounded-[2px]"
                >
                  VIEW ALL RECOGNISED FIRMS <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. UNIFIED EXPLORE & RECOGNITION FOOTER PANEL */}
      <section className={`${containerClasses} py-20`}>
        <div className="w-full border border-[#CBAA69]/30 rounded-[2px] relative bg-[#050505] flex flex-col shadow-2xl">
          
          {/* ROW 1: EXPLORE THE COMPLETE INDEX */}
          <div className="relative pt-14 pb-12 border-b border-[#CBAA69]/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.85rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">EXPLORE THE COMPLETE INDEX</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row w-full px-4 lg:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 border-r border-[#CBAA69]/20">
                
                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Briefcase className="w-4 h-4" strokeWidth={1.5}/> BY PRACTICE AREA
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      {['Corporate & M&A','Banking & Finance','Dispute Resolution','Tax'].map(t => (
                        <span key={t} className="hover:text-[#CBAA69] transition-colors">{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      {['Real Estate','Employment','IP & TMT','Other Areas'].map(t => (
                        <span key={t} className="hover:text-[#CBAA69] transition-colors">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <MapPin className="w-4 h-4" strokeWidth={1.5}/> BY LOCATION
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      {['Mumbai','New Delhi','Bengaluru','Hyderabad'].map(t => (
                        <span key={t} onClick={() => { setLocation(t); handleSearch(); }} className="hover:text-[#CBAA69] transition-colors cursor-pointer">{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      {['Chennai','Kolkata','Pune','Other Cities'].map(t => (
                        <span key={t} onClick={() => { setLocation(t); handleSearch(); }} className="hover:text-[#CBAA69] transition-colors cursor-pointer">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Building2 className="w-4 h-4" strokeWidth={1.5}/> BY FIRM SIZE
                  </div>
                  <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    {['Full Service','Specialist','Boutique','Mid Size'].map(t => (
                      <span key={t} className="hover:text-[#CBAA69] transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Award className="w-4 h-4" strokeWidth={1.5}/> BY RECOGNITION
                  </div>
                  <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    {['Principal Record','Distinguished','Rising','All Recognised Firms'].map(t => (
                      <span key={t} className="hover:text-[#CBAA69] transition-colors">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center px-10 shrink-0 mt-8 lg:mt-0">
                 <Link 
                   href="/juris-index"
                   className="px-8 py-5 border border-[#CBAA69]/30 hover:border-[#CBAA69] bg-transparent text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-4 rounded-[2px] text-left leading-tight"
                 >
                   EXPLORE<br/>COMPLETE INDEX <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>
          </div>

          {/* ROW 2: WHY RECOGNISED */}
          <div className="relative pt-12 pb-10 border-b border-[#CBAA69]/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.7rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">WHY RECOGNISED BY THE JURIS STANDARD</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 w-full px-4 lg:px-6">
               {[
                 { icon: Award, text: "Rigorous evaluation of capability, impact and professional excellence." },
                 { icon: Landmark, text: "Research driven assessment by our institutional council." },
                 { icon: ShieldCheck, text: "Independent, objective and merit based recognition." },
                 { icon: Award, text: "Recognising leadership that shapes the future of the profession." },
                 { icon: Globe, text: "Building a trusted institutional record for the legal industry." }
               ].map((item, i) => (
                 <div key={i} className={`flex items-start gap-4 px-6 lg:px-8 py-4 md:py-0 ${i < 4 ? 'border-b md:border-b-0 md:border-r border-[#CBAA69]/20' : ''}`}>
                   <item.icon className="w-8 h-8 text-[#CBAA69] shrink-0" strokeWidth={1} />
                   <p className="text-[0.65rem] text-white/60 leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* ROW 3: OFFICIAL DIGITAL RECOGNITION */}
          <div className="relative pt-10 pb-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.65rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">OFFICIAL DIGITAL RECOGNITION</h2>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-6 gap-10 lg:gap-0">
              <div className="flex flex-col flex-1 px-6 lg:px-8">
                <h2 className="text-[1.1rem] font-serif tracking-wide text-white/95 uppercase mb-2">THE JURIS STANDARD INDEX™</h2>
                <p className="text-[0.65rem] text-white/50 tracking-wide mb-5">A mark of trust. A standard of distinction.</p>
                <div className="w-12 h-[1px] bg-[#CBAA69]" />
              </div>
              <div className="flex items-center justify-center shrink-0">
                 {[
                   { icon: ShieldCheck, label: "VERIFY", action: () => alert("Verify a recognised firm's status.") },
                   { icon: Share2, label: "SHARE", action: () => navigator.clipboard?.writeText(window.location.href).then(() => alert("Link copied!")) },
                   { icon: FileText, label: "CERTIFICATE", action: () => alert("Download recognition certificate.") },
                   { icon: Code2, label: "EMBED", action: () => alert("Get embed code for your website.") },
                   { icon: QrCode, label: "QR CODE", action: () => alert("Generate QR code for recognition.") }
                 ].map((item, idx) => (
                   <button key={idx} onClick={item.action} className={`flex flex-col items-center gap-3 px-8 lg:px-12 cursor-pointer group ${idx < 4 ? 'border-r border-[#CBAA69]/20' : ''}`}>
                     <item.icon className="w-6 h-6 text-[#CBAA69] group-hover:text-[#E8D099] transition-colors" strokeWidth={1} />
                     <span className="text-[0.55rem] text-white/50 tracking-[0.15em] uppercase group-hover:text-white transition-colors">{item.label}</span>
                   </button>
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
