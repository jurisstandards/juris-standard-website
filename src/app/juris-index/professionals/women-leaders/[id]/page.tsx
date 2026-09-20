"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowLeft, FileText, Share2, Code2, Award, User,
  
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WomenLeadersProfilePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const { data, error } = await supabase
          .from("juris_records")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setRecord(data);
        }
      } catch (e) {
        console.error("Failed to fetch record", e);
      }
      setLoading(false);
    };
    fetchRecord();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border border-[#CBAA69] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-2xl font-serif text-[#CBAA69] mb-4">Professional Not Found</h1>
        <button onClick={() => router.back()} className="text-sm text-white/50 hover:text-white">Return to Women Leaders</button>
      </div>
    );
  }

  const recognitionId = record.recognitionId || `JS-CE-${record.year || "2027"}-001`;
  const practiceDisplay = record.practiceAreas?.length 
    ? record.practiceAreas.slice(0,3).join(" | ").toUpperCase()
    : "M&A | CORPORATE GOVERNANCE | STRATEGIC TRANSACTIONS";
    
  const roleName = "Corporate & M&A Counsel™";
  
  const handleCopyCitation = () => {
    const citationText = `The Juris Standard. (${record.year || '2027'}). ${record.name} - Women Leaders™ (${roleName}). ${recognitionId}.`;
    navigator.clipboard.writeText(citationText);
    alert("Citation copied to clipboard");
  };

  return (
    <main className="min-h-screen bg-[#020202] relative selection:bg-[#CBAA69]/30 flex flex-col font-sans text-neutral-300">
      
      {/* Global Premium Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_top_right,rgba(203,170,105,0.08),transparent_60%)] -translate-y-1/4 translate-x-1/4 blur-3xl mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        
        {/* HERO SECTION */}
        <section className="relative w-full pt-32 pb-16 lg:pt-36 lg:pb-16 border-b border-white/[0.02]">
          {/* Background Image / Gradients */}
          <div className="absolute inset-0 z-0 bg-[#020202]">
             <img src="/collections/corporate_elite_bg.png" alt="Background" className="w-full h-full object-cover object-center opacity-[0.08] mix-blend-screen" />
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_90%)]" />
             <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/30 via-transparent to-[#020202]" />
          </div>

        <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative z-10">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-16 border-b border-white/[0.05] pb-6">
            <button onClick={() => router.push('/juris-index/professionals/women-leaders')} className="flex items-center gap-3 text-[0.6rem] uppercase tracking-widest text-white/50 hover:text-[#CBAA69] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Women Leaders™
            </button>
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/30 hidden md:block">RECOGNISE. VERIFY. PRESERVE.</span>
          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start mt-8">
            
            {/* Left Column: Photo Frame */}
            <div className="w-[180px] md:w-[220px] shrink-0">
              <div className="aspect-[3/4] bg-[#050505] border border-white/[0.05] relative overflow-hidden group p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                 <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center relative">
                    {/* Noise overlay */}
                    <div className="absolute inset-0 opacity-[0.2] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
                    <User className="w-12 h-12 text-white/10 group-hover:scale-105 transition-transform duration-700" strokeWidth={1} />
                 </div>
              </div>
            </div>

            {/* Right Column: Precise Information */}
            <div className="flex flex-col flex-1 pt-0 min-w-0">
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[0.55rem] tracking-[0.4em] text-[#CBAA69] uppercase font-semibold">The Juris Standard</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="text-[0.55rem] tracking-[0.4em] text-white/50 uppercase">Women Leaders™</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-white tracking-wide mb-3 leading-none drop-shadow-sm">
                {record.name}
              </h1>
              
              <h2 className="text-[0.7rem] md:text-sm text-[#CBAA69] font-light tracking-[0.2em] uppercase mb-6">
                {record.firmInfo?.designation || record.type || 'Partner'} <span className="mx-3 text-white/20">|</span> {record.firmInfo?.firm_name || record.name}
              </h2>

              <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-6" />

              {/* Precise Grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-6">
                 <div>
                    <span className="block text-[0.55rem] tracking-[0.2em] text-white/60 uppercase mb-1.5">Location</span>
                    <span className="text-[0.75rem] text-white tracking-wide uppercase">{record.location}, {record.jurisdiction || 'India'}</span>
                 </div>
                 <div>
                    <span className="block text-[0.55rem] tracking-[0.2em] text-white/60 uppercase mb-1.5">Practice Coverage</span>
                    <span className="text-[0.75rem] text-white tracking-widest uppercase">{practiceDisplay}</span>
                 </div>
                 <div>
                    <span className="block text-[0.55rem] tracking-[0.2em] text-white/60 uppercase mb-1.5">Record Status</span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBAA69]" />
                      <span className="text-[0.75rem] text-white tracking-wide uppercase">{record.status || 'Active'} ({record.year || '2027'})</span>
                    </div>
                 </div>
                 <div>
                    <span className="block text-[0.55rem] tracking-[0.2em] text-white/60 uppercase mb-1.5">Record ID</span>
                    <span className="text-[0.75rem] text-white font-mono tracking-widest">{recognitionId}</span>
                 </div>
              </div>

              {/* Official Seal and Verification Badge */}
              <div className="flex items-center gap-5 p-4 border border-white/5 bg-white/[0.02] w-full max-w-2xl rounded-sm">
                 <img src="/logo/seal main.png" alt="Seal" className="w-12 h-12 object-contain drop-shadow-lg shrink-0 grayscale hover:grayscale-0 transition-all duration-500" />
                 <div className="flex flex-col gap-1">
                    <span className="text-[0.6rem] tracking-[0.25em] text-[#CBAA69] uppercase font-bold">Official Recognition</span>
                    <span className="text-[0.55rem] tracking-[0.1em] text-white/60 uppercase leading-relaxed">
                      Verified independently by the Juris Standard editorial board in accordance with the definitive recognition methodology.
                    </span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY SECTIONS */}
      <section className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-16 flex flex-col gap-12">
        
        {/* PREMIUM VAULT SECTION */}
        <div className="w-full border border-[#CBAA69]/30 bg-gradient-to-br from-[#111] to-[#050505] p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center justify-between shadow-[0_15px_40px_rgba(203,170,105,0.06)] rounded-sm">
           <div className="flex flex-col gap-4 lg:max-w-md">
             <div className="inline-flex items-center gap-4 mb-2">
               <span className="w-8 h-[1px] bg-[#CBAA69]" />
               <h3 className="text-[0.7rem] tracking-[0.4em] text-[#CBAA69] uppercase font-bold">The Recognition Vault™</h3>
             </div>
             <p className="text-sm text-white/70 font-serif leading-relaxed">
               Official assets for institutional and professional use. Access your verified recognition materials, certificates, and digital presence tools directly from the Juris Standard secure vault.
             </p>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto flex-1">
             <Link href={`/juris-index/professionals/women-leaders/${id}/certificate`} className="group flex flex-col items-center justify-center text-center gap-4 p-6 border border-white/10 bg-[#0a0a0a] hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 transition-all">
                <FileText className="w-6 h-6 text-[#CBAA69]/70 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.5} />
                <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white">Official<br/>Certificate</span>
             </Link>
             <Link href={`/juris-index/professionals/women-leaders/${id}/share`} className="group flex flex-col items-center justify-center text-center gap-4 p-6 border border-white/10 bg-[#0a0a0a] hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 transition-all">
                <Share2 className="w-6 h-6 text-[#CBAA69]/70 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.5} />
                <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white">Recognition<br/>Share Card</span>
             </Link>
             <button className="group flex flex-col items-center justify-center text-center gap-4 p-6 border border-white/10 bg-[#0a0a0a] hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 transition-all">
                <Code2 className="w-6 h-6 text-[#CBAA69]/70 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.5} />
                <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white">Website<br/>Seal</span>
             </button>
             <button className="group flex flex-col items-center justify-center text-center gap-4 p-6 border border-white/10 bg-[#0a0a0a] hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 transition-all">
                <Award className="w-6 h-6 text-[#CBAA69]/70 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.5} />
                <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white">Record<br/>Document</span>
             </button>
           </div>
        </div>

        {/* CONSOLIDATED METADATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Verification & QR */}
           <div className="border border-white/[0.05] bg-[#0a0a0a] p-8 flex gap-6 items-center group hover:border-[#CBAA69]/30 transition-colors">
              <div className="w-20 h-20 bg-white p-1.5 shrink-0">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
              </div>
              <div className="flex flex-col">
                 <h3 className="text-[0.6rem] tracking-[0.2em] text-[#CBAA69] uppercase mb-2">Official Verification</h3>
                 <p className="text-[0.65rem] text-white/50 mb-4 font-serif">Scan to verify this record directly on The Juris Standard.</p>
                 <Link href="#" className="text-[0.55rem] uppercase tracking-widest text-white/80 hover:text-[#CBAA69]">Verify Record →</Link>
              </div>
           </div>

           {/* The Standard & Methodology */}
           <div className="border border-white/[0.05] bg-[#0a0a0a] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
              <h3 className="text-[0.6rem] tracking-[0.2em] text-[#CBAA69] uppercase mb-3">The Standard & Methodology</h3>
              <p className="text-[0.7rem] text-white/60 mb-6 leading-relaxed font-serif flex-1">
                 Women Leaders™ recognises exceptional counsel and strategic judgement through a rigorous, independent editorial process.
              </p>
              <Link href="#" className="text-[0.55rem] uppercase tracking-widest text-white/80 hover:text-[#CBAA69]">View Methodology →</Link>
           </div>

           {/* Citation */}
           <div className="border border-white/[0.05] bg-[#0a0a0a] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
              <h3 className="text-[0.6rem] tracking-[0.2em] text-[#CBAA69] uppercase mb-4">Cite This Record™</h3>
              <div className="border border-white/10 bg-[#050505] p-4 mb-4">
                 <p className="text-[0.55rem] leading-relaxed text-white/60 font-serif">
                   The Juris Standard. ({record.year || '2027'}). {record.name} – Women Leaders™. {recognitionId}.
                 </p>
              </div>
              <button onClick={handleCopyCitation} className="text-[0.55rem] uppercase tracking-widest text-white/80 hover:text-[#CBAA69] mt-auto w-max text-left flex items-center gap-2">
                 <FileText className="w-3.5 h-3.5" /> Copy Citation
              </button>
           </div>

        </div>

      </section>

      <Footer />
      </div>
    </main>
  );
}
