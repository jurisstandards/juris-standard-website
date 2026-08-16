import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ChevronDown, 
  MapPin, Award, Scale, Globe, Building2, CheckCircle2,
  ShieldCheck, Share2, FileText, Code2, QrCode, Briefcase,
  Users, Landmark, Star
} from "lucide-react";
import Link from "next/link";

export default function LawFirmExcellenceTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION WITH SEARCH SIDEBAR */}
      <section className="relative w-full min-h-[100vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-[#222222]">
        
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
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]">
                ENTER THE INDEX <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3.5 border border-[#333333] bg-[#000000]/50 backdrop-blur-sm text-[#FFFFF0] text-[0.7rem] font-semibold uppercase tracking-[0.15em] hover:border-[#FFFFF0] hover:bg-white/5 transition-all flex items-center gap-3 rounded-[2px]">
                THE STANDARD <ArrowRight className="w-4 h-4 text-[#FFFFF0]" />
              </button>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#FFFFF0]/50 font-medium">
                TRUSTED BY LEGAL LEADERS IN 150+ COUNTRIES
              </span>
            </div>
            
            {/* Stats Bar */}
            <div className="w-full max-w-2xl bg-gradient-to-b from-[#161616]/90 to-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 border-t-white/10 rounded-xl flex flex-col md:flex-row items-center justify-between p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CBAA69]/5 via-transparent to-[#CBAA69]/5 pointer-events-none opacity-50" />
              
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

              {[
                { icon: Landmark, value: "5K+", label: "FIRMS RANKED" },
                { icon: Globe, value: "150+", label: "JURISDICTIONS" },
                { icon: Scale, value: "100+", label: "PRACTICE AREAS" },
                { icon: Star, value: "50M+", label: "DATA POINTS" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-4 py-3 md:py-2 px-4 flex-1 border-b md:border-b-0 md:border-r border-white/5 last:border-0 relative z-10 transition-colors duration-300 hover:bg-white/[0.02] rounded-lg cursor-default">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#CBAA69]/20 blur-md rounded-full" />
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-[#CBAA69] relative z-10 stroke-[1.5px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-[1.1rem] md:text-[1.25rem] bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent leading-none mb-1.5 tracking-tight drop-shadow-sm">{stat.value}</span>
                    <span className="text-[0.45rem] md:text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 font-semibold leading-none">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Search & Explore Panel */}
          <div className="w-full lg:w-[380px] shrink-0 border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[2px] p-7 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-20">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white/95 uppercase mb-6">SEARCH & EXPLORE</h3>
            
            <div className="flex items-center border-b border-white/10 pb-3 mb-6 group focus-within:border-[#CBAA69]/60 transition-colors">
              <input 
                type="text" 
                placeholder="Search law firm by name..."
                className="w-full bg-transparent border-none text-xs text-white placeholder:text-white/30 focus:outline-none"
              />
              <Search className="w-4 h-4 text-white/30 group-focus-within:text-[#CBAA69]" />
            </div>
            
            <div className="flex flex-col gap-5 mb-8">
              {[
                { label: 'PRACTICE AREAS', val: 'All Practice Areas' },
                { label: 'LOCATION', val: 'All Cities' },
                { label: 'TIER / RECOGNITION', val: 'All' },
                { label: 'FIRM SIZE', val: 'All' },
                { label: 'YEAR OF RECOGNITION', val: 'All' }
              ].map((dropdown, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-white/40">{dropdown.label}</span>
                  <div className="relative group">
                    <select className="w-full appearance-none px-4 py-3 border border-white/5 bg-[#000000] text-xs text-white/80 focus:outline-none cursor-pointer rounded-[2px] hover:border-white/20 focus:border-[#CBAA69]/50 transition-colors">
                      <option value="">{dropdown.val}</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#CBAA69] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-gold-300 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center justify-center gap-3 rounded-[2px] shadow-[0_0_15px_rgba(203,170,105,0.15)]">
                SEARCH FIRMS <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button className="w-full py-3 border border-white/5 bg-black/40 text-white/50 text-[0.65rem] font-medium uppercase tracking-[0.15em] hover:border-white/20 hover:bg-white/5 hover:text-white/90 transition-all flex items-center justify-center rounded-[2px]">
                RESET FILTERS
              </button>
            </div>
            
            <div className="flex items-start justify-between border-t border-white/10 pt-6 px-1">
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <Search className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Advanced<br/>Search</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <Scale className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Compare<br/>Firms</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <ShieldCheck className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Saved<br/>Firms</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors rotate-90" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Download<br/>Directory</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. RECOGNISED FIRMS HORIZONTAL BANDS */}
      <div className="flex flex-col w-full relative z-10 bg-[#000000]">
        {[
          {
            num: "01",
            title: "LAW FIRM EXCELLENCE™\nTHE PRINCIPAL RECORD",
            subtitle: "THE GLOBAL GOLD STANDARD",
            desc: "Recognising law firms that set the benchmark for legal excellence, client service and professional leadership.",
            firms: [
              { name: "AZB &\nPARTNERS", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "SHARDUL\nAMARCHAND\nMANGALDAS", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'icon_text' },
              { name: "KHAITAN\n& CO", type: "Advocates since 1911", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "J. SAGAR\nASSOCIATES", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "III TRILEGAL", type: "Advocates", loc: "Bengaluru", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "CYRIL\nAMARCHAND\nMANGALDAS", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text' }
            ]
          },
          {
            num: "02",
            title: "DISTINGUISHED\nLAW FIRMS™\nTHE ESTABLISHED RECORD",
            subtitle: "THE GLOBAL GOLD STANDARD",
            desc: "Recognising firms with a proven track record of excellence, capability and significant contribution to the profession.",
            firms: [
              { name: "LUTHRA AND\nLUTHRA LAW\nOFFICES", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "DUA\nASSOCIATES", type: "Advocates & Solicitors", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "SAMVĀD:\nPARTNERS", type: "Mumbai", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "S&R\nASSOCIATES", type: "Advocates", loc: "New Delhi", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "INDUSLAW", type: "Advocates", loc: "Bengaluru", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "KOCHHAR\n& CO.", type: "Advocates & Solicitors", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'text' }
            ]
          },
          {
            num: "03",
            title: "RISING LAW FIRMS™\nTHE NEXT GENERATION",
            subtitle: "THE GLOBAL GOLD STANDARD",
            desc: "Recognising emerging firms demonstrating exceptional potential, innovation and future leadership.",
            firms: [
              { name: "PSL\nADVOCATES\n& SOLICITORS", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "FOX\nMANDAL", type: "Bengaluru", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "THINK\nLEGAL", type: "Advocates", loc: "Mumbai", badge: "RECOGNISED - 2027", logoType: 'colored_text' },
              { name: "ag\nlaw", type: "New Delhi", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "P&A\nLAW OFFICES", type: "Mumbai", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' },
              { name: "LEX\nORBIS", type: "Bengaluru", loc: "", badge: "RECOGNISED - 2027", logoType: 'text' }
            ]
          },
        ].map((band, idx) => (
          <div key={idx} className="w-full border-b border-white/5 last:border-0 relative">
            <div className={`${containerClasses} py-14 flex flex-col xl:flex-row gap-12`}>
              
              {/* Left Column: Number and Description */}
              <div className="w-full xl:w-[420px] shrink-0 flex gap-6 md:gap-8">
                <div className="font-serif text-[5rem] md:text-[7rem] text-[#CBAA69] font-light leading-[0.75] tracking-tight">{band.num}</div>
                <div className="flex flex-col pt-2">
                  <h2 className="font-serif text-xl md:text-[1.35rem] text-white uppercase tracking-[0.15em] leading-[1.3] mb-4 whitespace-pre-line">{band.title}</h2>
                  <span className="text-[0.6rem] font-bold text-[#CBAA69] uppercase tracking-[0.25em] mb-6">{band.subtitle}</span>
                  <p className="text-[0.75rem] text-white/70 leading-[1.8] mb-10 max-w-[280px] font-light">{band.desc}</p>
                  
                  <button className="self-start px-8 py-4 border border-[#444] bg-transparent text-[#CBAA69] text-[0.55rem] font-bold uppercase tracking-[0.25em] hover:border-[#CBAA69] hover:bg-[#CBAA69]/5 transition-all flex items-center gap-3 rounded-[2px]">
                    VIEW ALL RECOGNISED FIRMS <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Firm Cards (Horizontal Scroll or Flex Wrap) */}
              <div className="flex-1 overflow-x-auto pb-4 relative group [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-stretch gap-5 min-w-max pr-12 h-full py-2">
                  {band.firms.map((firm, fIdx) => (
                    <div key={fIdx} className="w-[195px] h-[270px] flex flex-col p-6 border border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#CBAA69]/60 transition-colors duration-200 relative cursor-pointer shadow-xl group/card">
                      
                      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 px-2">
                        {firm.logoType === 'icon_text' && <Globe className="w-6 h-6 text-[#CBAA69] mb-4 stroke-[1px]" />}
                        <h3 className={`font-serif text-[0.9rem] leading-[1.35] whitespace-pre-line tracking-[0.15em] uppercase ${firm.logoType === 'colored_text' ? 'text-[#CBAA69]' : 'text-white'}`}>
                          {firm.name.includes('INDUS') ? <><span className="text-[#E53935]">INDUS</span>LAW</> : 
                           firm.name.includes('THINK') ? <><span className="text-white">THINK</span><br/><span className="text-[#1E88E5]">LEGAL</span></> : 
                           firm.name}
                        </h3>
                      </div>
                      
                      <div className="mt-auto flex flex-col gap-1.5 border-t border-[#2a2a2a] pt-4 relative z-10">
                        {firm.type && <span className="text-[0.5rem] text-white/50 leading-tight">{firm.type}</span>}
                        {firm.loc && <span className="text-[0.5rem] text-white/50 leading-tight">{firm.loc}</span>}
                        <div className="text-[0.45rem] font-bold tracking-[0.15em] text-[#CBAA69] mt-2">{firm.badge}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* 3, 4, 5. UNIFIED EXPLORE & RECOGNITION FOOTER PANEL */}
      <section className={`${containerClasses} py-20`}>
        <div className="w-full border border-[#CBAA69]/30 rounded-[2px] relative bg-[#050505] flex flex-col shadow-2xl">
          
          {/* ROW 1: EXPLORE THE COMPLETE INDEX */}
          <div className="relative pt-14 pb-12 border-b border-[#CBAA69]/20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.85rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">EXPLORE THE COMPLETE INDEX</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row w-full px-4 lg:px-6">
              {/* 4 Columns Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 flex-1 border-r border-[#CBAA69]/20">
                
                {/* Col 1 */}
                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Briefcase className="w-4 h-4" strokeWidth={1.5}/> BY PRACTICE AREA
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      <span className="hover:text-[#CBAA69] transition-colors">Corporate & M&A</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Banking & Finance</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Dispute Resolution</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Tax</span>
                    </div>
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      <span className="hover:text-[#CBAA69] transition-colors">Real Estate</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Employment</span>
                      <span className="hover:text-[#CBAA69] transition-colors">IP & TMT</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Other Areas</span>
                    </div>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <MapPin className="w-4 h-4" strokeWidth={1.5}/> BY LOCATION
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      <span className="hover:text-[#CBAA69] transition-colors">Mumbai</span>
                      <span className="hover:text-[#CBAA69] transition-colors">New Delhi</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Bengaluru</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Hyderabad</span>
                    </div>
                    <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                      <span className="hover:text-[#CBAA69] transition-colors">Chennai</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Kolkata</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Pune</span>
                      <span className="hover:text-[#CBAA69] transition-colors">Other Cities</span>
                    </div>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="flex flex-col border-r border-[#CBAA69]/20 px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Building2 className="w-4 h-4" strokeWidth={1.5}/> BY FIRM SIZE
                  </div>
                  <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="hover:text-[#CBAA69] transition-colors">Full Service</span>
                    <span className="hover:text-[#CBAA69] transition-colors">Specialist</span>
                    <span className="hover:text-[#CBAA69] transition-colors">Boutique</span>
                    <span className="hover:text-[#CBAA69] transition-colors">Mid Size</span>
                  </div>
                </div>

                {/* Col 4 */}
                <div className="flex flex-col px-6 lg:px-8">
                  <div className="flex items-center gap-3 text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-widest mb-6">
                     <Award className="w-4 h-4" strokeWidth={1.5}/> BY RECOGNITION
                  </div>
                  <div className="flex flex-col gap-4 text-[0.65rem] text-white/60 cursor-pointer tracking-wide">
                    <span className="hover:text-[#CBAA69] transition-colors">Principal Record</span>
                    <span className="hover:text-[#CBAA69] transition-colors">Distinguished</span>
                    <span className="hover:text-[#CBAA69] transition-colors">Rising</span>
                    <span className="hover:text-[#CBAA69] transition-colors">All Recognised Firms</span>
                  </div>
                </div>
              </div>

              {/* Button Column */}
              <div className="flex items-center justify-center px-10 shrink-0">
                 <button className="px-8 py-5 border border-[#CBAA69]/30 hover:border-[#CBAA69] bg-transparent text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-4 rounded-[2px] text-left leading-tight">
                   EXPLORE<br/>COMPLETE INDEX <ArrowRight className="w-4 h-4" />
                 </button>
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
                 <div key={i} className={`flex items-start gap-4 px-6 lg:px-8 ${i < 4 ? 'border-r border-[#CBAA69]/20' : ''}`}>
                   <item.icon className="w-8 h-8 text-[#CBAA69] shrink-0" strokeWidth={1} />
                   <p className="text-[0.65rem] text-white/60 leading-relaxed">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* ROW 3: OFFICIAL DIGITAL RECOGNITION */}
          <div className="relative pt-10 pb-10">
            <div className="absolute top-0 left-1/2 lg:left-auto lg:right-[20%] -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6">
              <h2 className="text-[0.65rem] font-bold tracking-[0.2em] text-[#CBAA69] uppercase whitespace-nowrap">OFFICIAL DIGITAL RECOGNITION</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 lg:px-6 gap-10 lg:gap-0">
              
              {/* Left side text */}
              <div className="flex flex-col flex-1 px-6 lg:px-8">
                <h2 className="text-[1.1rem] font-serif tracking-wide text-white/95 uppercase mb-2">THE JURIS STANDARD INDEX™</h2>
                <p className="text-[0.65rem] text-white/50 tracking-wide mb-5">A mark of trust. A standard of distinction.</p>
                <div className="w-12 h-[1px] bg-[#CBAA69]" />
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
                   <div key={idx} className={`flex flex-col items-center gap-3 px-8 lg:px-12 cursor-pointer group ${idx < 4 ? 'border-r border-[#CBAA69]/20' : ''}`}>
                     <item.icon className="w-6 h-6 text-[#CBAA69] group-hover:text-[#E8D099] transition-colors" strokeWidth={1} />
                     <span className="text-[0.55rem] text-white/50 tracking-[0.15em] uppercase group-hover:text-white transition-colors">{item.label}</span>
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
