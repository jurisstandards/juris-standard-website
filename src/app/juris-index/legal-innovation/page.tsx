import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowRight, ShieldCheck, Share2, FileText, Code2, QrCode,
  Globe, Award, Landmark, Building2, Zap
} from "lucide-react";

export default function LegalInnovationExcellenceTerminal() {
  const containerClasses = "w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32";

  const bands = [
    {
      num: "01",
      title: "INNOVATION\nEXCELLENCE™",
      subtitle: "THE PRINCIPAL RECORD",
      desc: "Recognising organisations setting new standards through innovation that transforms the legal profession.",
      orgs: [
        { name: "Sarvam AI", type: "Legal AI Platform", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#6C63FF", logo: "sarvam°" },
        { name: "Lex Machina", type: "Legal Analytics", country: "USA", color: "#0a0a0a", textColor: "#ffffff", accent: "#2196F3", logo: "✕ LEX\nMACHINA" },
        { name: "Kira Systems", type: "Contract Intelligence", country: "USA", color: "#0a0a0a", textColor: "#ffffff", accent: "#E91E63", logo: "◀ kira" },
        { name: "LegitQuest", type: "Litigation Intelligence", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#FF9800", logo: "⬡ legitquest" },
        { name: "Lawgic", type: "Legal Automation", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#4CAF50", logo: "⬛ Lawgic" },
      ]
    },
    {
      num: "02",
      title: "LEGAL\nRESEARCH™",
      subtitle: "LEGAL KNOWLEDGE. ADVANCED.",
      desc: "Recognising organisations building exceptional legal knowledge, research platforms and information infrastructure.",
      orgs: [
        { name: "SCC Online", type: "Legal Research Platform", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#D32F2F", logo: "SCC°\nONLINE" },
        { name: "Manupatra", type: "Legal Research Platform", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#E53935", logo: "⊠ manupatra" },
        { name: "LiveLaw", type: "Legal News & Research", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#1565C0", logo: "Live\nLaw.in" },
        { name: "Taxmann", type: "Research & Publishing", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#D84315", logo: "TAXMANN" },
        { name: "vLex", type: "Global Legal Intelligence", country: "Spain", color: "#0a0a0a", textColor: "#ffffff", accent: "#6A1B9A", logo: "v|lex" },
      ]
    },
    {
      num: "03",
      title: "LEGAL\nTECHNOLOGY™",
      subtitle: "TECHNOLOGY THAT EMPOWERS LAW",
      desc: "Recognising technology companies improving the delivery, management and accessibility of legal services.",
      orgs: [
        { name: "SpotDraft", type: "Contract Lifecycle\nManagement", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#00ACC1", logo: "⬤ spotdraft" },
        { name: "CaseMine", type: "Litigation Management", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#37474F", logo: "⬛ CASE MINE" },
        { name: "Juris Horizon", type: "Compliance Automation", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#1A237E", logo: "Juris\nHorizon" },
        { name: "VakilSearch", type: "Legal Compliance\nPlatform", country: "India", color: "#0a0a0a", textColor: "#ffffff", accent: "#F57F17", logo: "Vakil search" },
        { name: "DocuSign", type: "Digital Agreements", country: "USA", color: "#0a0a0a", textColor: "#ffffff", accent: "#1565C0", logo: "DocuSign" },
      ]
    },
  ];

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#050505] overflow-hidden pt-24 pb-12 border-b border-[#222222]">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img 
            src="/collections/legal_innovation_bg.png" 
            alt="Legal Innovation" 
            className="w-full h-full object-cover opacity-100"
            style={{ objectPosition: '65% center' }}
          />
        </div>

        {/* Left gradient */}
        <div 
          className="absolute inset-0 z-1 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.97) 22%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.4) 58%, rgba(0,0,0,0.0) 78%)' }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-1 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[25%] bg-gradient-to-l from-black via-black/80 to-transparent z-1 pointer-events-none" />

        {/* Hero Content */}
        <div className={`${containerClasses} relative z-10`}>
          <div className="flex flex-col max-w-2xl w-full mt-8">

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-[1px] bg-[#CBAA69]" />
              <span className="text-[0.60rem] uppercase tracking-[0.2em] text-[#CBAA69] font-medium font-sans">
                THE INSTITUTIONAL RECORD OF INNOVATION IN LAW
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5rem] font-light leading-[1.0] tracking-tight drop-shadow-2xl mb-6 uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block">
                LEGAL
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block">
                INNOVATION
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D3] to-[#CBAA69] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-2 pr-4 relative">
                EXCELLENCE<sup className="text-[0.35em] ml-1 absolute top-4 text-[#D4AF37]">™</sup>
              </span>
            </h1>

            <p className="text-neutral-300 text-sm md:text-base max-w-md mb-10 leading-[1.7] font-light tracking-wide">
              Recognising organisations whose technology, research, and innovation are advancing the practice, knowledge and accessibility of law.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]">
                ENTER THE INDEX <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3.5 border border-[#333333] bg-[#000000]/50 backdrop-blur-sm text-[#FFFFF0] text-[0.7rem] font-semibold uppercase tracking-[0.15em] hover:border-[#FFFFF0] hover:bg-white/5 transition-all flex items-center gap-3 rounded-[2px]">
                THE STANDARD <ArrowRight className="w-4 h-4 text-[#FFFFF0]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANDS — ORGANISATION CARDS */}
      <div className="flex flex-col w-full relative z-10 bg-[#000000]">
        {bands.map((band, idx) => (
          <div key={idx} className="w-full border-b border-white/5 last:border-0">
            <div className={`${containerClasses} py-14 flex flex-col xl:flex-row gap-10`}>
              
              {/* Left: Description */}
              <div className="w-full xl:w-[320px] shrink-0 flex gap-5">
                <div className="font-serif text-[4rem] md:text-[6rem] text-[#CBAA69] font-light leading-[0.75] tracking-tight shrink-0">{band.num}</div>
                <div className="flex flex-col border-l border-[#333] pl-5 pt-1">
                  <h2 className="font-serif text-[1.1rem] text-white uppercase tracking-[0.12em] leading-[1.25] mb-2 whitespace-pre-line">{band.title}</h2>
                  <span className="text-[0.55rem] font-bold text-[#CBAA69] uppercase tracking-[0.2em] mb-5">{band.subtitle}</span>
                  <p className="text-[0.7rem] text-white/60 leading-[1.8] mb-8 font-light max-w-[240px]">{band.desc}</p>
                  <button className="self-start px-5 py-3 border border-[#444] text-[#CBAA69] text-[0.5rem] font-bold uppercase tracking-[0.2em] hover:border-[#CBAA69] hover:bg-[#CBAA69]/5 transition-all flex items-center gap-2 rounded-[2px]">
                    VIEW ALL RECOGNISED<br/>ORGANISATIONS <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right: Org Cards */}
              <div className="flex-1 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex items-stretch gap-4 min-w-max pr-8 py-2">
                  {band.orgs.map((org, oIdx) => (
                    <div key={oIdx} className="w-[185px] flex flex-col border border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#CBAA69]/60 transition-colors duration-200 cursor-pointer group/card rounded-[2px] overflow-hidden">
                      
                      {/* Logo Area */}
                      <div 
                        className="w-full h-[120px] flex items-center justify-center relative overflow-hidden border-b border-[#2a2a2a]"
                        style={{ background: `linear-gradient(135deg, #0d0d0d 0%, #181818 100%)` }}
                      >
                        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${org.accent} 0%, transparent 70%)` }} />
                        <span 
                          className="font-bold text-[0.85rem] text-center whitespace-pre-line leading-snug tracking-wide z-10 px-3"
                          style={{ color: org.accent }}
                        >
                          {org.logo}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-serif text-[0.8rem] text-white leading-tight mb-1.5 group-hover/card:text-[#CBAA69] transition-colors">
                          {org.name}
                        </h3>
                        <span className="text-[0.5rem] text-white/50 leading-snug mb-1 whitespace-pre-line">{org.type}</span>
                        <span className="text-[0.5rem] text-white/40 leading-tight">{org.country}</span>
                      </div>

                      <div className="border-t border-[#2a2a2a] px-4 py-3">
                        <span className="text-[0.45rem] font-bold tracking-[0.15em] text-[#CBAA69]">RECOGNISED • 2027</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. FOOTER PANEL */}
      <section className={`${containerClasses} py-16`}>
        <div className="w-full border border-[#CBAA69]/30 rounded-[2px] relative bg-[#050505] flex flex-col">

          {/* ROW 1: WHY RECOGNISED */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full pt-12 pb-10 border-b border-[#CBAA69]/20 px-4 lg:px-6 gap-8">
            {[
              { icon: Award, title: "INSTITUTIONAL RECOGNITION", desc: "Rigorous evaluation of innovation, impact, reliability and professional value." },
              { icon: Landmark, title: "RESEARCHED & VERIFIED", desc: "Editorially researched by Juris Standard's research council." },
              { icon: ShieldCheck, title: "TRUST & INTEGRITY", desc: "Recognising organisations that uphold the highest standards." },
              { icon: Globe, title: "SHAPING THE FUTURE", desc: "Honouring those who are building the future of law today." },
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col gap-4 px-4 lg:px-6 ${idx < 3 ? 'border-r border-[#CBAA69]/15' : ''}`}>
                <item.icon className="w-7 h-7 text-[#CBAA69]" strokeWidth={1} />
                <div>
                  <h3 className="text-[0.55rem] font-bold text-[#CBAA69] uppercase tracking-[0.15em] mb-2">{item.title}</h3>
                  <p className="text-[0.6rem] text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2: THE JURIS STANDARD INDEX + OFFICIAL DIGITAL RECOGNITION */}
          <div className="flex flex-col lg:flex-row w-full pt-8 pb-8 px-4 lg:px-6">
            
            {/* Left */}
            <div className="flex flex-col flex-1 lg:border-r border-[#CBAA69]/20 px-4 lg:px-8 mb-8 lg:mb-0 justify-center">
              <h2 className="text-[1rem] font-serif tracking-wide text-white/95 uppercase mb-1">THE JURIS STANDARD INDEX™</h2>
              <p className="text-[0.6rem] text-white/40 tracking-wide mb-5">A mark of trust. A standard of distinction.</p>
              <div className="w-10 h-[1px] bg-[#CBAA69]" />
            </div>

            {/* Right: Digital Recognition */}
            <div className="flex items-center justify-center flex-1 px-4 lg:px-10">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-[0.6rem] font-bold tracking-[0.15em] text-[#CBAA69] uppercase mr-10 whitespace-nowrap">OFFICIAL DIGITAL RECOGNITION</h2>
                {[
                  { icon: ShieldCheck, label: "VERIFY" },
                  { icon: Share2, label: "SHARE" },
                  { icon: FileText, label: "CERTIFICATE" },
                  { icon: Code2, label: "EMBED" },
                  { icon: QrCode, label: "QR CODE" },
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
