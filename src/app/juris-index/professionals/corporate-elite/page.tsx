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
import { IndexSearchBar } from "@/components/ui/IndexSearchBar";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import ScrollRow from "@/components/ui/ScrollRow";
export default function CorporateEliteTerminal() {
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
        .eq('division', 'Corporate Elite™')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true, nullsFirst: false });
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
      
      {/* 1. HERO SECTION — FULL WIDTH */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-end bg-[#050505] overflow-hidden pt-24 pb-0 border-b border-[#222222]">
        
        {/* Full-width cinematic background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/collections/corporate_elite_bg.png" 
            alt="Corporate Elite Monument" 
            className="w-full h-full object-contain object-center opacity-90"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)'
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.2) 60%, rgba(5,5,5,0.4) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#000000] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
        </div>

        <div className={`${containerClasses} relative z-10 flex flex-col pb-16`}>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-[1px] bg-[#CBAA69]" />
            <span className="text-[0.60rem] uppercase tracking-[0.2em] text-[#CBAA69] font-medium font-sans">
              THE INSTITUTIONAL RECORD OF CORPORATE LEGAL EXCELLENCE
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-light leading-[1.02] tracking-tight drop-shadow-2xl mb-6 uppercase max-w-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm block mb-1">
              CORPORATE
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3D3] to-[#CBAA69] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-2 pr-4 relative">
              ELITE<sup className="text-[0.35em] ml-1 absolute top-4 text-[#D4AF37]">™</sup>
            </span>
          </h1>
          
          <p className="text-neutral-300 text-sm md:text-base max-w-lg mb-8 leading-[1.7] font-light tracking-wide">
            Recognising lawyers who set the benchmark in corporate legal practice through exceptional expertise, commercial acumen and leadership.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <Link href="/enter-the-index" className="px-8 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center gap-3 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]">
              ENTER THE INDEX <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#CBAA69]" strokeWidth={1.5} />
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#FFFFF0]/50 font-medium">TRUSTED BY CORPORATE LEADERS IN 150+ COUNTRIES</span>
            </div>
          </div>
          
          {/* Full-width horizontal search card */}
          <div className="w-full mt-2 relative z-10 shadow-2xl">
            <IndexSearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSearch={handleSearch} 
            />
          </div>
        </div>
      </section>

            {/* 2. RECOGNISED LAWYERS HORIZONTAL BANDS */}
      <div ref={lawyersRef} className="flex flex-col w-full relative z-10 bg-[#000000]">
        {[
          {
            tag: "THE PRINCIPAL RECORD",
            title: "CORPORATE & M&A COUNSEL™",
            desc: "M&A • Corporate Advisory • Joint Ventures • Strategic Transactions",
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
            tag: "FINANCIAL SPONSORS RECORD",
            title: "PRIVATE CAPITAL COUNSEL™",
            desc: "Private Equity • Venture Capital • Investments • Funds • Acquisitions",
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
            tag: "THE FINANCIAL TRANSACTIONS RECORD",
            title: "FINANCE & MARKETS COUNSEL™",
            desc: "Banking • Finance • Capital Markets • Securities • Structured Finance",
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
            tag: "DRIVING BUSINESS STRATEGY & GOVERNANCE",
            title: "IN-HOUSE CORPORATE COUNSEL™",
            desc: "General Counsel • Chief Legal Officers • Head of Legal",
            lawyers: [
              { name: "Neeraj Bhagat", type: "General Counsel", firmName: "Tata Sons", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Dimple Agarwal", type: "Chief Legal Officer", firmName: "Reliance Industries", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Manav Sethi", type: "General Counsel", firmName: "Adani Group", loc: "Ahmedabad", badge: "2027 - RECOGNISED" },
              { name: "Shweta Jalan", type: "General Counsel", firmName: "HDFC Bank", loc: "Mumbai", badge: "2027 - RECOGNISED" },
              { name: "Sameer Gandhi", type: "Chief Legal Officer", firmName: "Infosys", loc: "Bengaluru", badge: "2027 - RECOGNISED" },
              { name: "Pallavi Shroff", type: "Global General Counsel", firmName: "Mahindra Group", loc: "Mumbai", badge: "2027 - RECOGNISED" }
            ]
          },
        ].map((band, idx) => {
          let mergedLawyers = [...band.lawyers];
          const dbLawyersForBand = dynamicLawyers
            .filter(l => l.category === band.title || (band.title === "CORPORATE & M&A COUNSEL™" && !l.category))
            .map(l => ({
               id: l.id,
               name: l.name,
               type: l.firmInfo?.designation || l.type || 'Partner',
               firmName: l.firmInfo?.firm_name || l.name,
               loc: l.location || l.headquarters_city || '',
               badge: `${l.year || '2027'} - RECOGNISED`
            }));
          mergedLawyers = [...dbLawyersForBand, ...mergedLawyers];
          
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            mergedLawyers = mergedLawyers.filter(l =>
              l.name.toLowerCase().includes(q) ||
              ((l as any).id && String((l as any).id).toLowerCase().includes(q)) ||
              (l.firmName && l.firmName.toLowerCase().includes(q))
            );
          }

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
                <ScrollRow trackClassName="flex items-stretch gap-4 min-w-max pr-12">
                    {mergedLawyers.length === 0 && (
                      <div className="flex items-center justify-center text-white/20 text-xs py-8 px-6 italic w-full">
                        No records match your search.
                      </div>
                    )}
                    {mergedLawyers.map((lawyer, fIdx) => (
                      <Link key={fIdx} href={`/juris-index/professionals/corporate-elite/${(lawyer as any).id || lawyer.name.toLowerCase().replaceAll(' ', '-')}`} className="w-[200px] sm:w-[220px] h-[300px] flex flex-col border border-[#1a1a1a] bg-[#080808] hover:border-[#CBAA69]/40 transition-colors duration-200 relative cursor-pointer group/card overflow-hidden">
                        
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
                </ScrollRow>
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
