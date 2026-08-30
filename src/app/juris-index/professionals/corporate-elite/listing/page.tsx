import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ChevronDown, 
  MapPin, Award, Scale, Globe, Building2, CheckCircle2,
  ShieldCheck, Share2, FileText, Code2, QrCode, Briefcase,
  Users, Landmark, Star, User
} from "lucide-react";
import Link from "next/link";

export default function CorporateEliteTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION WITH SEARCH SIDEBAR */}
      <section className="relative w-full min-h-[100vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-[#222222]">
        
        {/* Contained Background Image Layer */}
        <div className="absolute top-0 bottom-0 left-[5%] md:left-[15%] lg:left-[22%] xl:left-[25%] w-[95%] md:w-[85%] lg:w-[78%] xl:w-[75%] h-full z-0 pointer-events-none overflow-hidden">
          <img 
            src="/collections/corporate_elite_bg.png" 
            alt="Corporate Elite Monument" 
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
                placeholder="Search lawyer name, firm or company..."
                className="w-full bg-transparent border-none text-xs text-white placeholder:text-white/30 focus:outline-none"
              />
              <Search className="w-4 h-4 text-white/30 group-focus-within:text-[#CBAA69]" />
            </div>
            
            <div className="flex flex-col gap-5 mb-8">
              {[
                { label: 'PRACTICE AREA', val: 'All Practice Areas', icon: Briefcase },
                { label: 'PROFESSIONAL SETTING', val: 'All', icon: Building2 },
                { label: 'LOCATION', val: 'All Cities', icon: MapPin },
                { label: 'RECOGNITION', val: 'Corporate Elite™ - 2027', icon: Award }
              ].map((dropdown, idx) => (
                <div key={idx} className="flex flex-col gap-2 relative">
                  <div className="flex items-center gap-2">
                    <dropdown.icon className="w-3.5 h-3.5 text-[#CBAA69]" />
                    <span className="text-[0.55rem] font-medium uppercase tracking-[0.15em] text-white/40">{dropdown.label}</span>
                  </div>
                  <div className="relative group">
                    <select className="w-full appearance-none px-4 py-3 border border-white/5 bg-[#000000] text-xs text-white/80 focus:outline-none cursor-pointer rounded-[2px] hover:border-white/20 focus:border-[#CBAA69]/50 transition-colors">
                      <option value="">{dropdown.val}</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#CBAA69] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-[#E8D099] transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center justify-center gap-3 rounded-[2px] shadow-[0_0_15px_rgba(203,170,105,0.15)]">
                SEARCH <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex items-start justify-between border-t border-white/10 pt-6 px-1">
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <Scale className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Compare<br/>Counsel</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <ShieldCheck className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Saved<br/>Profiles</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <Globe className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Recently<br/>Viewed</span>
              </div>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <Share2 className="w-4 h-4 text-white/30 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1} />
                <span className="text-[0.45rem] uppercase tracking-wider text-white/40 text-center leading-[1.3] group-hover:text-white/90 transition-colors">Share<br/>Record</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. RECOGNISED LAWYERS HORIZONTAL BANDS */}
      <div className="flex flex-col w-full relative z-10 bg-[#000000]">
        {[
          {
            num: "01",
            title: "CORPORATE &\nM&A COUNSEL™",
            subtitle: "The principal corporate record",
            desc: "M&A • Corporate Advisory\nJoint Ventures\nStrategic Transactions",
            extraInfo: "12 PROFILES • 6 + 6",
            lawyers: [
              { name: "Rahul Khanna", type: "Partner", firmName: "Khaitan & Co", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Vaibhav Parikh", type: "Partner", firmName: "Shardul Amarchand", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Shivanshu Tiwary", type: "Partner", firmName: "Cyril Amarchand", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Anish Mashruwala", type: "Partner", firmName: "AZB & Partners", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Priya Nair", type: "Partner", firmName: "Trilegal", loc: "Bengaluru", badge: "2027 - RECOGNISED" },
              { name: "Rohit Singhania", type: "Partner", firmName: "Khaitan & Co", loc: "Mumbai", badge: "2027 - RECOGNISED" }
            ]
          },
          {
            num: "02",
            title: "PRIVATE CAPITAL\nCOUNSEL™",
            subtitle: "The investment and\nfinancial sponsors record",
            desc: "Private Equity • Venture Capital\nInvestments • Funds\nAcquisitions",
            extraInfo: "12 PROFILES • 6 + 6",
            lawyers: [
              { name: "Vivek Prasad", type: "Partner", firmName: "Khaitan & Co", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Mukul Rohatgi", type: "Partner", firmName: "Shardul Amarchand", loc: "New Delhi", badge: "2027 - RECOGNISED" },
              { name: "Karan Mitra", type: "Partner", firmName: "AZB & Partners", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Aakriti Mehra", type: "Partner", firmName: "Trilegal", loc: "Bengaluru", badge: "2027 - RECOGNISED" },
              { name: "Gaurav Bhatia", type: "Partner", firmName: "Cyril Amarchand", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Nandini Pathak", type: "Partner", firmName: "J. Sagar Associates", loc: "New Delhi", badge: "2027 - RECOGNISED" }
            ]
          },
          {
            num: "03",
            title: "FINANCE &\nMARKETS COUNSEL™",
            subtitle: "The financial\ntransactions record",
            desc: "Banking • Finance\nCapital Markets • Securities\nStructured Finance",
            extraInfo: "12 PROFILES • 6 + 6",
            lawyers: [
              { name: "Harsh Avni", type: "Partner", firmName: "Khaitan & Co", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Ritesh Jain", type: "Partner", firmName: "AZB & Partners", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Sanjay Kumar", type: "Partner", firmName: "Trilegal", loc: "Bengaluru", badge: "2027 - RECOGNISED" },
              { name: "Manish Mishra", type: "Partner", firmName: "Cyril Amarchand", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Divya Venkatesan", type: "Partner", firmName: "J. Sagar Associates", loc: "New Delhi", badge: "2027 - RECOGNISED" },
              { name: "Varun Sharma", type: "Partner", firmName: "Shardul Amarchand", loc: "New Delhi", badge: "2027 - RECOGNISED" }
            ]
          },
          {
            icon: Landmark,
            title: "IN-HOUSE\nCORPORATE COUNSEL™",
            subtitle: "Recognising legal leaders driving\nbusiness, strategy and governance\nfrom within leading organisations.",
            desc: "",
            extraInfo: "12 PROFILES • 6 + 6",
            lawyers: [
              { name: "Neeraj Bhagat", type: "General Counsel", firmName: "Tata Sons", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Dimple Agarwal", type: "Chief Legal Officer", firmName: "Reliance Industries", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Manav Sethi", type: "General Counsel", firmName: "Adani Group", loc: "Ahmedabad", badge: "2027 - RECOGNISED" },
              { name: "Shweta Jalan", type: "General Counsel", firmName: "HDFC Bank", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Sameer Gandhi", type: "Chief Legal Officer", firmName: "Infosys", loc: "Bengaluru", badge: "2027 - RECOGNISED" },
              { name: "Pallavi Shroff", type: "Global General Counsel", firmName: "Mahindra Group", loc: "Mumbai", badge: "2027 - RECOGNISED" }
            ]
          },
        ].map((band, idx) => (
          <div key={idx} className="w-full border-b border-white/5 last:border-0 relative">
            <div className={`${containerClasses} py-14 flex flex-col xl:flex-row gap-12`}>
              
              {/* Left Column: Number and Description */}
              <div className="w-full xl:w-[420px] shrink-0 flex gap-6 md:gap-8">
                {band.num ? (
                  <div className="font-serif text-[5rem] md:text-[7rem] text-[#CBAA69] font-light leading-[0.75] tracking-tight">{band.num}</div>
                ) : band.icon ? (
                  <div className="mt-2"><band.icon className="w-16 h-16 text-[#CBAA69] stroke-[1px]" /></div>
                ) : null}
                
                <div className="flex flex-col pt-2">
                  <h2 className="font-serif text-xl md:text-[1.35rem] text-white uppercase tracking-[0.15em] leading-[1.3] mb-4 whitespace-pre-line">{band.title}</h2>
                  <span className="text-[0.6rem] font-bold text-[#CBAA69] uppercase tracking-[0.15em] mb-4 whitespace-pre-line leading-[1.6]">{band.subtitle}</span>
                  {band.desc && (
                    <p className="text-[0.75rem] text-white/70 leading-[1.8] mb-6 max-w-[280px] font-light whitespace-pre-line">{band.desc}</p>
                  )}
                  <span className="text-[0.55rem] font-bold text-[#CBAA69] uppercase tracking-[0.25em] mb-10">{band.extraInfo}</span>
                  
                  <button className="self-start px-6 py-3 border border-[#444] bg-transparent text-[#CBAA69] text-[0.55rem] font-bold uppercase tracking-[0.25em] hover:border-[#CBAA69] hover:bg-[#CBAA69]/5 transition-all flex items-center gap-3 rounded-[2px]">
                    VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Lawyer Cards */}
              <div className="flex-1 overflow-x-auto pb-4 relative group [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-stretch gap-5 min-w-max pr-12 h-full py-2">
                  {band.lawyers.map((lawyer, fIdx) => (
                    <div key={fIdx} className="w-[195px] h-[300px] flex flex-col border border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#CBAA69]/60 transition-colors duration-200 relative cursor-pointer shadow-xl group/card">
                      
                      {/* Photo Placeholder */}
                      <div className="w-full h-[130px] bg-[#111] border-b border-[#2a2a2a] relative overflow-hidden flex items-end justify-center">
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
                         <User className="w-[4.5rem] h-[4.5rem] text-[#333] mb-[-10px] relative z-0" strokeWidth={1} />
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1 relative z-10">
                        <h3 className="font-serif text-[0.95rem] leading-tight tracking-[0.05em] text-white mb-2 group-hover:text-[#CBAA69] transition-colors">
                          {lawyer.name}
                        </h3>
                        <span className="text-[0.6rem] text-white/50 leading-tight mb-1">{lawyer.type}</span>
                        <span className="text-[0.6rem] text-white/50 leading-tight mb-1">{lawyer.firmName}</span>
                        <span className="text-[0.6rem] text-white/50 leading-tight">{lawyer.loc}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 border-t border-[#2a2a2a] pt-3 pb-3 px-4 relative z-10">
                        <div className="text-[0.45rem] font-bold tracking-[0.15em] text-[#CBAA69]">{lawyer.badge}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
                 <button className="w-[240px] py-4 border border-[#CBAA69]/30 hover:border-[#CBAA69] bg-transparent text-[#CBAA69] text-[0.65rem] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-4 rounded-[2px] leading-tight mb-4">
                   <Briefcase className="w-4 h-4" strokeWidth={1.5} /> 
                   <span className="text-left">EXPLORE<br/>COMPLETE INDEX</span> 
                   <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                 </button>
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
