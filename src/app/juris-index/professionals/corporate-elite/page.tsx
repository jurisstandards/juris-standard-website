import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, ArrowRight, ShieldCheck, Globe, Building2, MapPin, 
  ChevronDown, User, Calendar, Briefcase, ChevronRight
} from "lucide-react";
import Link from "next/link";

const recognisedLawyers = [
  { name: "Amitabh Chaudhry", firm: "Khaitan & Co.", location: "Mumbai" },
  { name: "Anjali Bansal", firm: "AZB & Partners", location: "Delhi" },
  { name: "Cyril Shroff", firm: "Cyril Shroff", location: "Mumbai" },
  { name: "Rajiv Chaba", firm: "Shardul Amarchand Mangaldas", location: "Delhi" },
  { name: "Nishith Desai", firm: "Nishith Desai Associates", location: "Mumbai" },
  { name: "Vaishali Kasture", firm: "AZB & Partners", location: "Pune" },
  { name: "Rahul Matthan", firm: "Trilegal", location: "Mumbai" },
  { name: "Sanjeev Gemawat", firm: "Khaitan & Co.", location: "Delhi" },
  { name: "Supriya Agrawal", firm: "Shardul Amarchand Mangaldas", location: "Mumbai" },
  { name: "Dhruv Anand", firm: "Cyril Amarchand Mangaldas", location: "Mumbai" },
  { name: "Samant Batra", firm: "AZB & Partners", location: "Bengaluru" },
  { name: "Shuya Mandal", firm: "Trilegal", location: "New Delhi" },
  { name: "Kunal Bahl", firm: "Khaitan & Co.", location: "Mumbai" },
  { name: "Preeta Bharadwaj", firm: "Shardul Amarchand Mangaldas", location: "Mumbai" },
  { name: "Abhinav Sinha", firm: "Cyril Shroff", location: "Mumbai" },
  { name: "Manan Lahoty", firm: "Khaitan & Co.", location: "Mumbai" },
  { name: "Smita Jatia", firm: "J. Sagar Associates", location: "Delhi" },
  { name: "Sameer Rohatgi", firm: "Trilegal", location: "Gurugram" },
  { name: "Ruchi Goyal", firm: "AZB & Partners", location: "Mumbai" },
  { name: "Prateek Devaiah", firm: "Khaitan & Co.", location: "Bengaluru" }
];

export default function CorporateElitePortalPage() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-[#000000] overflow-hidden pt-20 border-b border-[#222222]">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <img 
            src="/collections/corporate_elite_monument.jpg" 
            alt="Corporate Elite Monument" 
            className="w-full lg:w-[65%] h-full object-cover opacity-90"
            style={{ 
              objectPosition: 'right 35%',
              maskImage: 'linear-gradient(to right, transparent, black 25%)', 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)' 
            }}
          />
          {/* Black gradient overlay fading from left (solid) to right (transparent) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/95 md:via-[#000000]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className={`${containerClasses} relative z-10`}>
          <div className="max-w-xl">
            {/* Breadcrumb / Label */}
            <div className="flex items-center gap-2 text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/60 mb-6">
              <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
              <span>›</span>
              <span className="text-[#C5A059]">Corporate Elite™</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl text-[#FFFFF0] leading-tight tracking-wider mb-5 font-light uppercase">
              CORPORATE <br/>
              <span className="text-[#C5A059]">ELITE</span><sup className="text-[0.3em] ml-1">™</sup>
            </h1>
            
            <p className="text-[0.8rem] text-[#FFFFF0]/70 font-light leading-relaxed mb-8 max-w-sm">
              Recognising the world's leading corporate lawyers shaping business, investment and commercial law.
            </p>

            {/* Feature Icons */}
            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center gap-2 group cursor-pointer">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]/80 group-hover:text-[#C5A059] stroke-[1px] transition-colors" />
                <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/60 leading-tight">EDITORIALLY<br/>INDEPENDENT</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Building2 className="w-5 h-5 text-[#C5A059]/80 group-hover:text-[#C5A059] stroke-[1px] transition-colors" />
                <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/60 leading-tight">INSTITUTIONALLY<br/>VERIFIED</span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Globe className="w-5 h-5 text-[#C5A059]/80 group-hover:text-[#C5A059] stroke-[1px] transition-colors" />
                <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/60 leading-tight">GLOBAL<br/>PERSPECTIVE</span>
              </div>
            </div>

            <button className="px-6 py-3 border border-[#C5A059]/50 text-[#C5A059] text-[0.65rem] font-bold uppercase tracking-widest hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2 rounded-[2px]">
              EXPLORE 2027 EDITION <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section className={`${containerClasses} py-10 border-b border-[#222222]`}>
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/50">BROWSE BY SPECIALISATION</span>
              <button className="w-full flex items-center justify-between px-4 py-3 border border-[#222222] bg-[#050505] text-[0.7rem] text-[#FFFFF0]/80 transition-colors hover:border-[#C5A059]/40 rounded-[2px]">
                All Specialisations <ChevronDown className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/50">BROWSE BY JURISDICTION</span>
              <button className="w-full flex items-center justify-between px-4 py-3 border border-[#222222] bg-[#050505] text-[0.7rem] text-[#FFFFF0]/80 transition-colors hover:border-[#C5A059]/40 rounded-[2px]">
                All Jurisdictions <ChevronDown className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full lg:w-auto min-w-[200px]">
            <span className="text-[0.55rem] uppercase tracking-widest text-[#FFFFF0]/50">SORT BY</span>
            <button className="w-full flex items-center justify-between px-4 py-3 border border-[#222222] bg-[#050505] text-[0.7rem] text-[#FFFFF0]/80 transition-colors hover:border-[#C5A059]/40 rounded-[2px]">
              Name (A - Z) <ChevronDown className="w-4 h-4 text-[#C5A059]" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. 2027 RECOGNISED LAWYERS GRID */}
      <section className={`${containerClasses} py-12 border-b border-[#222222]`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-[#111111]">
          <h2 className="text-[0.8rem] font-semibold tracking-[0.2em] text-[#FFFFF0] uppercase">2027 RECOGNISED LAWYERS</h2>
          <span className="text-[0.7rem] text-[#C5A059] mt-2 md:mt-0 font-medium tracking-wide">
            182 <span className="text-[#FFFFF0]/60 font-normal">Recognised Lawyers</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recognisedLawyers.map((lawyer, idx) => (
            <div key={idx} className="group flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] overflow-hidden hover:border-[#C5A059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.05)] transition-all cursor-pointer relative h-[280px]">
              {/* Premium Placeholder Image Area */}
              <div className="w-full h-[55%] bg-[#030303] border-b border-[#1a1a1a] flex items-center justify-center relative overflow-hidden group-hover:bg-[#050505] transition-colors">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_80%)]" />
                 {/* Generic highly stylized avatar icon since we don't have real photos */}
                 <User className="w-16 h-16 text-[#222222] group-hover:text-[#333333] transition-colors stroke-[1px]" />
                 {/* Subtle gold accent at bottom of image area */}
                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
              
              {/* Card Content */}
              <div className="p-4 flex flex-col h-full">
                <h3 className="font-serif text-[1.05rem] text-[#FFFFF0] leading-tight mb-1 group-hover:text-[#C5A059] transition-colors">
                  {lawyer.name}
                </h3>
                <span className="text-[0.65rem] text-[#FFFFF0]/60 mb-2 truncate">{lawyer.firm}</span>
                <div className="flex items-center gap-1.5 text-[0.6rem] text-[#FFFFF0]/40 tracking-wider mb-auto">
                  <MapPin className="w-2.5 h-2.5 text-[#C5A059]/70" /> {lawyer.location}
                </div>
                
                <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center justify-between w-full text-[0.6rem] uppercase tracking-widest text-[#C5A059] font-medium">
                  RECOGNISED <ArrowRight className="w-3 h-3 text-[#FFFFF0]/30 group-hover:text-[#C5A059] transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <button className="px-8 py-3 border border-[#222222] text-[#FFFFF0]/60 text-[0.65rem] font-semibold uppercase tracking-widest hover:border-[#C5A059]/50 hover:text-[#C5A059] transition-colors flex items-center gap-2 rounded-[2px]">
            VIEW ALL RECOGNISED LAWYERS <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {/* Pagination dots mimicking screenshot */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-[#C5A059]' : 'bg-[#333333]'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INSTITUTIONAL COLLECTIONS (Preserved & Redesigned) */}
      <section className={`${containerClasses} py-16`}>
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-4 block">
            THE ARCHITECTURE OF EXCELLENCE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#FFFFF0]/95 tracking-wide">
            Institutional Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Collection 1: Recognised Lawyers (Self-Referential) */}
          <Link href="/juris-index/professionals/corporate-elite/lawyers" className="group flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.05)] transition-all h-[260px] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(197,160,89,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <Search className="w-8 h-8 text-[#C5A059]/60 mb-6 group-hover:text-[#C5A059] transition-colors stroke-[1px]" />
            <h3 className="font-serif text-xl text-[#FFFFF0]/90 mb-3 group-hover:text-[#C5A059] transition-colors">Recognised Lawyers</h3>
            <p className="text-[0.65rem] text-[#FFFFF0]/50 uppercase tracking-widest leading-relaxed mb-auto">
              The official annual record of all Corporate Elite™ recognised lawyers.
            </p>
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors mt-6">
              ACCESS RECORD <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Collection 2: Recognition Domains */}
          <div className="group flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#C5A059]/30 rounded-[2px] hover:border-[#C5A059]/60 transition-all h-[260px] relative overflow-hidden md:col-span-2 shadow-[0_0_20px_rgba(197,160,89,0.05)]">
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_left,_rgba(197,160,89,0.1)_0%,_transparent_70%)] pointer-events-none" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <Briefcase className="w-8 h-8 text-[#C5A059] stroke-[1px] group-hover:scale-110 transition-transform" />
              <Link href="#" className="text-[0.6rem] uppercase tracking-[0.2em] text-[#C5A059] hover:text-[#FFFFF0] transition-colors border border-[#C5A059]/30 px-4 py-2 rounded-[2px] hover:bg-[#C5A059]/10">
                EXPLORE DOMAINS
              </Link>
            </div>
            <h3 className="font-serif text-2xl text-[#FFFFF0]/95 mb-3 relative z-10 group-hover:text-[#C5A059] transition-colors">Recognition Domains</h3>
            <p className="text-[0.65rem] text-[#FFFFF0]/50 uppercase tracking-widest leading-relaxed mb-6 relative z-10">
              Discover recognised professionals across distinct domains of corporate excellence.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
              {["Mergers & Acquisitions", "Private Equity", "Banking & Finance", "Capital Markets"].map(domain => (
                <span key={domain} className="text-[0.6rem] text-[#FFFFF0]/70 px-3 py-1.5 border border-[#222222] bg-[#000000] hover:border-[#C5A059]/40 hover:text-[#C5A059] cursor-pointer transition-colors uppercase tracking-wider rounded-[2px]">
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Collection 3: Browse by Law Firm */}
          <Link href="/juris-index/professionals/corporate-elite/firms" className="group flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.05)] transition-all h-[260px] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(197,160,89,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <Building2 className="w-8 h-8 text-[#C5A059]/60 mb-6 group-hover:text-[#C5A059] transition-colors stroke-[1px]" />
            <h3 className="font-serif text-xl text-[#FFFFF0]/90 mb-3 group-hover:text-[#C5A059] transition-colors">Institutional Breakdown</h3>
            <p className="text-[0.65rem] text-[#FFFFF0]/50 uppercase tracking-widest leading-relaxed mb-auto">
              Explore the index structured by the leading law firms housing recognised excellence.
            </p>
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors mt-6">
              BROWSE BY FIRM <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Collection 4: Browse by Jurisdiction */}
          <Link href="/juris-index/professionals/corporate-elite/jurisdictions" className="group flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.05)] transition-all h-[260px] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(197,160,89,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <MapPin className="w-8 h-8 text-[#C5A059]/60 mb-6 group-hover:text-[#C5A059] transition-colors stroke-[1px]" />
            <h3 className="font-serif text-xl text-[#FFFFF0]/90 mb-3 group-hover:text-[#C5A059] transition-colors">Regional Discovery</h3>
            <p className="text-[0.65rem] text-[#FFFFF0]/50 uppercase tracking-widest leading-relaxed mb-auto">
              Filter the Corporate Elite™ index across specific global jurisdictions and cities.
            </p>
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors mt-6">
              BROWSE JURISDICTIONS <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Collection 5: Annual Editions */}
          <Link href="/juris-index/professionals/corporate-elite/archive" className="group flex flex-col p-8 bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-[#222222] rounded-[2px] hover:border-[#C5A059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.05)] transition-all h-[260px] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,_rgba(197,160,89,0.08)_0%,_transparent_70%)] pointer-events-none" />
            <Calendar className="w-8 h-8 text-[#C5A059]/60 mb-6 group-hover:text-[#C5A059] transition-colors stroke-[1px]" />
            <h3 className="font-serif text-xl text-[#FFFFF0]/90 mb-3 group-hover:text-[#C5A059] transition-colors">Annual Editions Archive</h3>
            <p className="text-[0.65rem] text-[#FFFFF0]/50 uppercase tracking-widest leading-relaxed mb-auto">
              The permanent institutional archive of all previous recognition editions.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              <span className="text-[0.6rem] text-[#C5A059] px-2.5 py-1 border border-[#C5A059]/30 bg-[#C5A059]/5 rounded-[2px]">2027</span>
              <span className="text-[0.6rem] text-[#FFFFF0]/30 px-2.5 py-1 border border-[#222222] bg-[#050505] line-through rounded-[2px]">2026</span>
            </div>
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#FFFFF0]/30 group-hover:text-[#C5A059] transition-colors mt-auto">
              VIEW ARCHIVE <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      <Footer />
    </main>
  );
}
