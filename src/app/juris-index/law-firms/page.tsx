import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ShieldCheck, Globe, Award, CheckCircle2, Circle,
  ChevronDown, Plane, Ship, Briefcase, Landmark, Lightbulb, Users, 
  Building, Leaf, Stethoscope, Beaker, FileText, Pickaxe, ShoppingCart,
  Camera, Shield, Gavel, Scale, TrendingUp, Monitor, BookmarkPlus, Share2,
  Clock, CheckSquare, QrCode, MapPin
} from "lucide-react";
import Link from "next/link";

export default function LawFirmExcellenceTerminal() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center bg-[#000000] overflow-hidden pt-20 border-b border-[#222222]">
        {/* Full Width Background Image (Pillars & Glass) */}
        <div className="absolute inset-0 z-0 flex justify-end">
          {/* Fallback to hero_hall.jpg if pillars image is not present, but using a high quality placeholder assuming it's available in public */}
          <img 
            src="/collections/firm_lobby_hero.jpg" 
            alt="Pillars of Excellence" 
            className="w-full lg:w-[65%] h-full object-cover object-right opacity-90"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }}
          />
          {/* Black gradient overlay fading from left (solid) to right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/95 md:via-[#000000]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000000] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-xl">
            <span className="block text-[0.6rem] font-medium tracking-[0.2em] text-[#C5A059] mb-3 uppercase">2027 EDITION</span>
            <h1 className="font-serif text-4xl md:text-5xl text-[#FFFFF0] leading-tight tracking-wider mb-2 font-light uppercase">
              LAW FIRM <br/>
              EXCELLENCE<sup className="text-[0.4em] ml-1">™</sup>
            </h1>
            <p className="text-[0.65rem] font-semibold tracking-widest text-[#C5A059] uppercase mb-4">
              RECOGNISING EXCELLENCE. DEFINING TRUST.
            </p>
            
            <p className="text-[0.7rem] text-[#FFFFF0]/70 font-light leading-relaxed mb-8 max-w-sm">
              The Juris Standard Index™ recognises the world's leading law firms for their unwavering commitment to excellence, integrity and impact.
            </p>

            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-[#C5A059] text-[#000000] text-[0.6rem] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors flex items-center gap-2">
                ENTER THE INDEX <ArrowRight className="w-3 h-3" />
              </button>
              <button className="px-5 py-2.5 border border-[#333333] text-[#FFFFF0]/80 text-[0.6rem] font-semibold uppercase tracking-widest hover:border-[#C5A059]/50 hover:text-[#C5A059] transition-colors flex items-center gap-2">
                VIEW METHODOLOGY <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH THE INDEX & LIVE TICKER */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 border-b border-[#222222]">
        <h2 className="text-[0.75rem] font-semibold tracking-[0.25em] text-[#FFFFF0] uppercase mb-5 text-center md:text-left">SEARCH THE INDEX</h2>
        
        <div className="flex flex-col gap-3">
          {/* Main Search Bar */}
          <div className="flex items-center border border-[#333333] rounded-[2px] bg-[#050505] overflow-hidden focus-within:border-[#C5A059]/50 transition-colors">
            <div className="pl-4 pr-2">
              <Search className="w-4 h-4 text-[#C5A059]" />
            </div>
            <input 
              type="text" 
              placeholder="Search law firm, practice, industry or lawyer"
              className="w-full bg-transparent border-none py-3 text-[0.7rem] text-[#FFFFF0] placeholder:text-[#FFFFF0]/40 focus:outline-none"
            />
          </div>
          
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2">
            {['PRACTICE AREA', 'INDUSTRY SECTOR', 'JURISDICTION', 'STANDING', 'RECOGNITION'].map((filter) => (
              <button key={filter} className="flex-1 min-w-[120px] flex items-center justify-between px-3 py-2 border border-[#333333] bg-[#050505] text-[0.6rem] text-[#FFFFF0]/70 uppercase tracking-widest hover:border-[#C5A059]/40 transition-colors rounded-[2px]">
                {filter} <ChevronDown className="w-3 h-3 text-[#C5A059]" />
              </button>
            ))}
            <button className="px-5 py-2 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[0.6rem] font-bold uppercase tracking-widest hover:bg-[#C5A059]/20 transition-colors flex items-center gap-2 rounded-[2px]">
              SEARCH <ArrowRight className="w-3 h-3" />
            </button>
            <button className="px-3 py-2 text-[0.55rem] text-[#FFFFF0]/40 uppercase tracking-widest hover:text-[#FFFFF0]/80 transition-colors">
              ADVANCED<br/>SEARCH
            </button>
          </div>
        </div>

        {/* Live Ticker */}
        <div className="mt-6 flex items-center gap-4 text-[0.55rem] uppercase tracking-widest border-t border-[#111111] pt-4 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-green-500 font-bold">
            <Circle className="w-1.5 h-1.5 fill-green-500 animate-pulse" /> INDEX LIVE
          </div>
          <span className="text-[#C5A059]">◆</span>
          <span className="text-[#FFFFF0]/60"><span className="text-[#FFFFF0]">New recognition published</span> 4m ago</span>
          <span className="text-[#C5A059]">◆</span>
          <span className="text-[#FFFFF0]/60"><span className="text-[#FFFFF0]">Recognition verified</span> 18m ago</span>
          <span className="text-[#C5A059]">◆</span>
          <span className="text-[#FFFFF0]/60"><span className="text-[#FFFFF0]">Institutional record updated</span> 1 hr ago</span>
          <span className="text-[#C5A059]">◆</span>
          <span className="text-[#FFFFF0]/60"><span className="text-[#FFFFF0]">New firm recognised</span> 2 hrs ago</span>
          <Link href="#" className="ml-auto text-[#C5A059] flex items-center gap-1 hover:text-[#D4AF37] border-b border-transparent hover:border-[#C5A059]">
            VIEW ALL ACTIVITY <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </section>

      {/* 3. RECOGNISED FIRMS GRIDS */}
      {[
        { title: "2027 RECOGNISED LAW FIRMS™", action: "VIEW ALL RECOGNISED FIRMS", firms: [
          { name: "Khaitan\n& Co.", standing: "1 - EXCEPTIONAL STANDING", badge: "1" },
          { name: "AZB &\nPARTNERS", standing: "1 - EXCEPTIONAL STANDING", badge: "1" },
          { name: "cyril amarchand\nmangaldas", standing: "1 - EXCEPTIONAL STANDING", badge: "1", font: "lowercase text-[#C5A059]" },
          { name: "||L TRILEGAL", standing: "1 - EXCEPTIONAL STANDING", badge: "1" },
          { name: "Shardul\nAmarchand\nMangaldas", standing: "1 - EXCEPTIONAL STANDING", badge: "1" },
          { name: "J. Sagar\nAssociates", standing: "1 - EXCEPTIONAL STANDING", badge: "1" },
        ]},
        { title: "2027 EMERGING LAW FIRMS™", action: "VIEW ALL EMERGING FIRMS", firms: [
          { name: "Cyril Shroff\n& Co.", standing: "EM - EMERGING STANDING", badge: "EM" },
          { name: "Saikrishna &\nAssociates", standing: "EM - EMERGING STANDING", badge: "EM" },
          { name: "LexOrbis", standing: "EM - EMERGING STANDING", badge: "EM" },
          { name: "Dua Associates", standing: "EM - EMERGING STANDING", badge: "EM" },
          { name: "Juris Corp", standing: "EM - EMERGING STANDING", badge: "EM" },
          { name: "Vaish\nAssociates", standing: "EM - EMERGING STANDING", badge: "EM" },
        ]},
        { title: "2027 BOUTIQUE LAW FIRMS™", action: "VIEW ALL BOUTIQUE FIRMS", firms: [
          { name: "Singhania &\nPartners LLP", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
          { name: "L&L\nPartners", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
          { name: "SPICE Legal", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
          { name: "Chandhiok\n& Mahajan", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
          { name: "Juris Advocates", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
          { name: "IndusLaw", standing: "BT - BOUTIQUE RECOGNITION", badge: "BT" },
        ]},
      ].map((section, idx) => (
        <section key={idx} className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 border-b border-[#222222]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">{section.title}</h2>
            <Link href="#" className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
              {section.action} <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {section.firms.map((firm, fIdx) => (
              <div key={fIdx} className="group flex flex-col p-4 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 hover:shadow-[0_0_15px_rgba(197,160,89,0.05)] transition-all cursor-pointer min-h-[140px] relative">
                <div className="absolute top-3 right-3 w-4 h-4 border border-[#C5A059]/30 flex items-center justify-center text-[0.45rem] font-bold text-[#C5A059]">{firm.badge}</div>
                <h3 className={`font-serif text-[0.95rem] text-[#FFFFF0] leading-tight whitespace-pre-line mb-4 pr-5 ${firm.font || ''}`}>
                  {firm.name}
                </h3>
                <div className="mt-auto flex flex-col gap-2">
                  <span className="text-[0.45rem] font-medium tracking-[0.15em] text-[#C5A059] uppercase">{firm.standing}</span>
                  <span className="text-[0.55rem] text-[#FFFFF0]/50 tracking-wider">Corporate & M&A <span className="text-[#333333]">|</span> India</span>
                  <div className="flex items-center gap-1.5 text-[0.55rem] text-[#FFFFF0]/40 tracking-wider">
                    <MapPin className="w-2 h-2 text-[#C5A059]/70" /> Mumbai
                  </div>
                  <div className="flex items-center gap-1 text-[0.5rem] uppercase tracking-widest text-[#FFFFF0]/20 group-hover:text-[#C5A059] transition-colors mt-1">
                    VIEW PROFILE <ArrowRight className="w-2 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#C5A059]' : 'bg-[#333333]'}`} />
            ))}
          </div>
        </section>
      ))}

      {/* 4. EXPLORE BY PRACTICE AREA & INDUSTRY */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-8 border-b border-[#222222]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">EXPLORE BY PRACTICE AREA</h2>
          <Link href="#" className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
            VIEW ALL PRACTICE AREAS <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3 mb-10">
          {[
            { icon: Briefcase, title: "Corporate & M&A", num: "128" },
            { icon: Landmark, title: "Banking & Finance", num: "96" },
            { icon: TrendingUp, title: "Capital Markets", num: "74" },
            { icon: Monitor, title: "Private Equity & Funds", num: "64" },
            { icon: Gavel, title: "Disputes", num: "112" },
            { icon: FileText, title: "Tax", num: "78" },
            { icon: Lightbulb, title: "Projects & Energy", num: "68" },
            { icon: Scale, title: "Technology, Media", num: "58" },
            { icon: Building, title: "Real Estate", num: "52" },
            { icon: ShieldCheck, title: "Restructuring", num: "46" },
            { icon: Users, title: "Regulatory", num: "42" },
            { icon: Briefcase, title: "Employment", num: "36" },
          ].map((item, idx) => (
            <div key={idx} className="group flex flex-col p-4 border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 transition-colors bg-[#030303]">
              <div className="flex items-start justify-between mb-3">
                <item.icon className="w-5 h-5 text-[#C5A059]/70" strokeWidth={1.5} />
                <span className="font-serif text-lg text-[#C5A059]">{item.num}</span>
              </div>
              <span className="text-[0.6rem] text-[#FFFFF0]/80 mb-1 tracking-wide uppercase">{item.title}</span>
              <span className="text-[0.5rem] text-[#FFFFF0]/40 tracking-widest uppercase mb-3">Recognised Firms</span>
              <div className="mt-auto flex items-center gap-1 text-[0.55rem] uppercase tracking-widest text-[#C5A059]/60 group-hover:text-[#C5A059] transition-colors">
                VIEW ALL <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">EXPLORE BY INDUSTRY SECTOR</h2>
          <Link href="#" className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
            VIEW ALL INDUSTRIES <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {[
            { icon: Landmark, name: "Financial" }, { icon: Monitor, name: "Technology" },
            { icon: Lightbulb, name: "Energy" }, { icon: Building, name: "Infrastructure" },
            { icon: Stethoscope, name: "Healthcare" }, { icon: ShoppingCart, name: "Manufacturing" },
            { icon: Leaf, name: "Materials" }, { icon: Leaf, name: "Agriculture" },
            { icon: Shield, name: "Government" }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 min-w-[100px] flex flex-col items-center justify-center p-4 border border-[#222222] rounded-[2px] bg-[#030303] hover:border-[#C5A059]/40 group cursor-pointer transition-colors">
              <item.icon className="w-5 h-5 text-[#C5A059]/70 mb-3 group-hover:scale-110 transition-transform" strokeWidth={1} />
              <span className="text-[0.55rem] text-[#FFFFF0]/60 text-center uppercase tracking-widest">{item.name}</span>
            </div>
          ))}
          <div className="flex-1 min-w-[100px] flex flex-col items-center justify-center p-4 border border-[#222222] rounded-[2px] bg-[#030303] hover:border-[#C5A059]/40 cursor-pointer text-[0.55rem] text-[#C5A059] uppercase tracking-widest text-center">
            + More<br/>Industries
          </div>
        </div>
      </section>

      {/* 5. RIGHT-SIDE EQUIVALENTS (Directories, Honours, Verification) */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-10 bg-[#000000]">
        
        {/* Directory & Programmes Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12 border-b border-[#222222] pb-12">
          
          {/* Left Col: Specialist Directory */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">SPECIALIST PRACTICE DIRECTORY</h2>
              <Link href="#" className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
                VIEW ALL <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {[
                { i: Plane, n: "Aviation" }, { i: Ship, n: "Shipping" }, { i: Globe, n: "Trade" },
                { i: Stethoscope, n: "Life Sci" }, { i: Beaker, n: "Pharma" }, { i: ShieldCheck, n: "Insurance" },
                { i: Landmark, n: "Financial" }, { i: Users, n: "Private Client" }, { i: Users, n: "Family" },
                { i: Leaf, n: "Environment" }, { i: Globe, n: "ESG" }, { i: Shield, n: "Data" },
                { i: Monitor, n: "AI & Tech" }, { i: Monitor, n: "Sports" }, { i: BookmarkPlus, n: "Education" },
                { i: Building, n: "Public" }, { i: Pickaxe, n: "Mining" }, { i: CheckSquare, n: "Procurement" },
                { i: ShoppingCart, n: "Consumer" }, { i: Leaf, n: "Food" }, { i: Camera, n: "Media" },
                { i: Shield, n: "Defence" }, { i: Search, n: "Others" }
              ].map((item, idx) => (
                <div key={idx} className="aspect-square flex flex-col items-center justify-center p-2 border border-[#C5A059]/20 rounded-[2px] hover:bg-[#C5A059]/5 hover:border-[#C5A059]/50 transition-all cursor-pointer group text-center gap-2">
                  <item.i className="w-5 h-5 text-[#C5A059]/80 group-hover:text-[#C5A059] stroke-[1px]" />
                  <span className="text-[0.45rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-tight">{item.n}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Institutional Programmes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">INSTITUTIONAL RECOGNITION PROGRAMMES</h2>
              <Link href="#" className="flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#C5A059] hover:text-[#FFFFF0] transition-colors">
                VIEW ALL <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-5 gap-3 h-full max-h-[300px]">
              {[
                { i: Award, t: "BOUTIQUE\nFIRM RECOGNITION" },
                { i: TrendingUp, t: "EMERGING\nFIRM RECOGNITION" },
                { i: Globe, t: "CROSS-BORDER\nEXCELLENCE" },
                { i: MapPin, t: "REGIONAL\nEXCELLENCE" },
                { i: Building, t: "SECTOR\nEXCELLENCE" }
              ].map((prog, idx) => (
                <div key={idx} className="flex flex-col p-4 border border-[#222222] bg-[#030303] rounded-[2px] hover:border-[#C5A059]/40 transition-colors group cursor-pointer">
                  <prog.i className="w-5 h-5 text-[#C5A059] mb-4 stroke-[1px]" />
                  <h3 className="text-[0.55rem] text-[#FFFFF0] uppercase tracking-widest leading-relaxed mb-4 whitespace-pre-line group-hover:text-[#C5A059] transition-colors">{prog.t}</h3>
                  <div className="mt-auto flex items-center gap-1 text-[0.5rem] uppercase tracking-widest text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors">
                    EXPLORE <ArrowRight className="w-2 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Institutional Honours */}
        <div className="mb-12 border-b border-[#222222] pb-12">
          <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase text-center mb-8">INSTITUTIONAL HONOURS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { i: ShieldCheck, t: "HALL OF DISTINCTION™", d: "Awarded for exceptional and sustained institutional contribution to the legal profession." },
              { i: Landmark, t: "LEGACY RECOGNITION™", d: "Reserved for institutions whose legacy has shaped the legal landscape." },
              { i: Award, t: "LIFETIME ACHIEVEMENT™", d: "Honouring individuals for extraordinary lifetime contribution to the profession." }
            ].map((honor, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 border border-[#222222] bg-gradient-to-b from-[#050505] to-[#020202] hover:border-[#C5A059]/40 transition-colors group cursor-pointer rounded-[2px]">
                <honor.i className="w-8 h-8 text-[#C5A059] mb-6 stroke-[1px]" />
                <h3 className="text-[0.7rem] text-[#FFFFF0] uppercase tracking-widest mb-3 group-hover:text-[#C5A059] transition-colors">{honor.t}</h3>
                <p className="text-[0.6rem] text-[#FFFFF0]/50 leading-relaxed mb-6 max-w-[80%]">{honor.d}</p>
                <div className="mt-auto flex items-center gap-1.5 text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors">
                  VIEW HONOUREES <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </div>
            ))}
          </div>

          {/* Utility Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { i: Scale, t: "COMPARE FIRMS" },
              { i: BookmarkPlus, t: "SAVE & SHORTLIST" },
              { i: Share2, t: "SHARE RECOGNITION" },
              { i: FileText, t: "RESEARCH BRIEF" },
              { i: Clock, t: "SEARCH HISTORY" }
            ].map((util, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-5 border border-[#1a1a1a] bg-[#030303] hover:border-[#C5A059]/30 transition-colors group cursor-pointer text-center rounded-[2px]">
                <util.i className="w-5 h-5 text-[#FFFFF0]/40 group-hover:text-[#C5A059] mb-3 stroke-[1px] transition-colors" />
                <span className="text-[0.55rem] text-[#FFFFF0]/70 uppercase tracking-widest">{util.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verify Recognition & Why JS */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          <div className="flex-1 relative rounded-[2px] overflow-hidden border border-[#222222] min-h-[250px] flex items-center p-10">
            <div className="absolute inset-0 bg-[url('/collections/firm_lobby_hero.jpg')] bg-cover bg-center opacity-20 brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-transparent" />
            <div className="relative z-10 flex items-center justify-between w-full">
               <div className="max-w-[200px]">
                 <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase mb-4">VERIFY A RECOGNITION</h2>
                 <p className="text-[0.6rem] text-[#FFFFF0]/60 leading-relaxed mb-6">Enter Recognition ID or scan QR code to verify any recognition issued by the Juris Standard Index™.</p>
                 <button className="px-5 py-2.5 border border-[#C5A059]/50 text-[#C5A059] text-[0.6rem] font-semibold uppercase tracking-widest hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2 rounded-[2px]">
                    VERIFY NOW <ArrowRight className="w-3 h-3" />
                 </button>
               </div>
               <div className="w-24 h-32 border border-[#C5A059] rounded-b-[40px] flex items-center justify-center bg-[#000000]/50 backdrop-blur-sm">
                 <QrCode className="w-10 h-10 text-[#C5A059]" />
               </div>
            </div>
          </div>

          <div className="flex-1 p-8 border border-[#222222] bg-[#030303] rounded-[2px]">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase text-center mb-8">WHY THE JURIS STANDARD INDEX™</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { i: ShieldCheck, t: "EDITORIALLY\nINDEPENDENT" },
                { i: CheckCircle2, t: "INSTITUTIONALLY\nRIGOROUS" },
                { i: Globe, t: "GLOBALLY\nRESPECTED" },
                { i: Award, t: "PERMANENT\nRECORD" },
                { i: Briefcase, t: "PRACTICAL &\nUSEFUL" },
                { i: Scale, t: "TRANSPARENT\n& TRUSTED" }
              ].map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <badge.i className="w-6 h-6 text-[#C5A059]/80 mb-3 stroke-[1px] group-hover:text-[#C5A059] transition-colors" />
                  <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/70 whitespace-pre-line leading-tight">{badge.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
