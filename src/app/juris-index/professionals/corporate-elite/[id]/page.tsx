"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowLeft, CheckCircle2, QrCode, FileText, Share2, Code2, Award, User
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CorporateEliteProfilePage() {
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
        <button onClick={() => router.back()} className="text-sm text-white/50 hover:text-white">Return to Corporate Elite</button>
      </div>
    );
  }

  const recognitionId = record.recognitionId || `JS-CE-${record.year || "2027"}-001`;
  const practiceDisplay = record.practiceAreas?.length 
    ? record.practiceAreas.slice(0,3).join(" | ").toUpperCase()
    : "M&A | CORPORATE GOVERNANCE | STRATEGIC TRANSACTIONS";
    
  const roleName = "Corporate & M&A Counsel™";
  
  const handleCopyCitation = () => {
    const citationText = `The Juris Standard. (${record.year || '2027'}). ${record.name} - Corporate Elite™ (${roleName}). ${recognitionId}.`;
    navigator.clipboard.writeText(citationText);
    alert("Citation copied to clipboard");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-neutral-300">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 lg:pt-36 lg:pb-16 border-b border-[#1a1a1a]">
        {/* Background Image / Gradients */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
           <img src="/collections/corporate_elite_bg.png" alt="Background" className="w-full h-full object-cover object-center opacity-[0.07] mix-blend-screen" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative z-10">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-16 border-b border-white/[0.05] pb-6">
            <button onClick={() => router.push('/juris-index/professionals/corporate-elite')} className="flex items-center gap-3 text-[0.6rem] uppercase tracking-widest text-white/50 hover:text-[#CBAA69] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Corporate Elite™
            </button>
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/30 hidden md:block">RECOGNISE. VERIFY. PRESERVE.</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 items-center lg:items-stretch">
            
            {/* Left Col: Photo & Moto */}
            <div className="flex gap-8 lg:gap-12 shrink-0 h-full items-center lg:items-start">
              <div className="flex flex-col justify-center text-[0.5rem] uppercase tracking-[0.3em] text-white/20 leading-[2.5] hidden md:flex">
                <span>PEOPLE</span>
                <span>SHAPE</span>
                <span>POSSIBILITIES.</span>
                <span className="mt-6 text-[#CBAA69]/40">A STRONGER</span>
                <span className="text-[#CBAA69]/40">LEGAL WORLD.</span>
                <span className="text-[#CBAA69]/40">ALWAYS.</span>
              </div>
              
              <div className="w-[280px] lg:w-[320px] aspect-[3/4] bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center group shrink-0">
                 {/* Premium Placeholder for Photo */}
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
                 <div className="w-[90%] h-[92%] border border-white/5 absolute rounded-sm" />
                 <User className="w-24 h-24 text-white/10 relative z-10" strokeWidth={0.5} />
                 
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                   <div className="w-1 h-1 rounded-full bg-[#CBAA69]/50 mb-2" />
                   <span className="text-[0.45rem] tracking-[0.3em] uppercase text-[#CBAA69]/50">Official Record</span>
                 </div>
              </div>
            </div>

            {/* Center Col: Details */}
            <div className="flex flex-col flex-1 py-2 justify-center min-w-0">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50" />
                <h4 className="text-[0.65rem] tracking-[0.3em] text-[#CBAA69] uppercase font-medium">The Juris Standard™</h4>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-white/90 font-light tracking-wide uppercase mb-3 drop-shadow-sm">
                Corporate Elite<sup className="text-[0.4em] ml-1 text-[#CBAA69]">™</sup>
              </h2>
              
              <p className="text-[0.6rem] tracking-[0.25em] text-white/40 uppercase mb-10 pb-6 border-b border-white/5 inline-block w-max">
                Recognised for exceptional corporate legal leadership
              </p>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-[4rem] text-white tracking-wider uppercase mb-6 leading-[1.1] break-words">
                {record.name}
              </h1>
              
              <div className="flex items-center gap-4 text-[0.6rem] tracking-[0.25em] uppercase mb-3">
                <span className="px-3 py-1 bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/20 rounded-sm font-semibold">RECOGNISED · {record.year || '2027'}</span>
              </div>
              
              <h3 className="font-serif text-xl md:text-[1.7rem] text-white/80 tracking-wide mb-10 text-[#CBAA69]">
                {roleName}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[0.8rem] text-white/60 font-serif mb-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Role</span>
                  <span className="text-white/80">{record.firmInfo?.designation || record.type || 'Partner'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Organisation</span>
                  <span className="text-white/80">{record.firmInfo?.firm_name || record.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Location</span>
                  <span className="text-white/80">{record.location}, {record.jurisdiction || 'India'}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5 text-[0.55rem] tracking-[0.2em] text-white/30 uppercase">
                {practiceDisplay}
              </div>
            </div>

            {/* Right Col: Seal & Meta */}
            <div className="flex flex-col items-center lg:items-end justify-between shrink-0 lg:w-[240px] py-2 border-l-0 lg:border-l lg:border-white/5 lg:pl-10">
              <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full">
                <div className="w-[160px] h-[160px] mb-8 relative">
                  <div className="absolute inset-0 bg-[#CBAA69]/5 rounded-full blur-2xl" />
                  <img src="/logo/seal main.png" alt="Seal" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
                </div>
                
                <div className="flex flex-col gap-1 mb-10">
                  <span className="text-[0.5rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">INDEPENDENT.</span>
                  <span className="text-[0.5rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">INSIGHTFUL.</span>
                  <span className="text-[0.5rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">DEFINITIVE.</span>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full bg-[#111] p-5 border border-white/5 rounded-sm">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-[0.5rem] tracking-[0.2em] text-white/40 uppercase">Record ID</span>
                  <span className="text-[0.6rem] tracking-wider text-white/80">{recognitionId}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-[0.5rem] tracking-[0.2em] text-white/40 uppercase">Status</span>
                  <span className="flex items-center gap-1.5 text-[0.55rem] tracking-widest text-[#CBAA69] uppercase font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#CBAA69]" /> {record.status || 'active'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[0.5rem] tracking-[0.2em] text-white/40 uppercase">Year</span>
                  <span className="text-[0.65rem] tracking-wider text-white/90">{record.year || '2027'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GRID SECTIONS */}
      <section className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto py-16 flex flex-col gap-6">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">01</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">The Recognition</h3>
              </div>
            </div>
            <p className="text-[0.7rem] leading-relaxed text-white/60 mb-8 font-serif">
              Recognised for exceptional corporate counsel, strategic judgement and outstanding contribution to complex M&A and corporate transactions.
            </p>
            <Link href="#" className="mt-auto text-[0.6rem] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Read the recognition →</Link>
          </div>

          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">02</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">The Standard</h3>
              </div>
            </div>
            <p className="text-[0.7rem] leading-relaxed text-white/60 mb-8 font-serif">
              Corporate Elite™ recognises corporate legal professionals who demonstrate exceptional legal expertise, commercial acumen, strategic judgement and leadership.
            </p>
            <Link href="#" className="mt-auto text-[0.6rem] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">View methodology →</Link>
          </div>

          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">03</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">Recognition Provenance™</h3>
              </div>
            </div>
            <p className="text-[0.6rem] tracking-wider text-white/70 mb-5">A rigorous and independent process.</p>
            <ul className="flex flex-col gap-3 text-[0.65rem] text-white/50 font-serif mb-6">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-3.5 h-3.5 text-[#CBAA69]/50" /> Research & Shortlisting</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-3.5 h-3.5 text-[#CBAA69]/50" /> Assessment & Analysis</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-3.5 h-3.5 text-[#CBAA69]/50" /> Editorial Review</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-3.5 h-3.5 text-[#CBAA69]/50" /> Recognition Decision</li>
            </ul>
            <Link href="#" className="mt-auto text-[0.6rem] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">View details →</Link>
          </div>
        </div>

        {/* Row 2: Verification */}
        <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col md:flex-row md:items-center justify-between gap-12 group hover:border-[#CBAA69]/30 transition-colors">
          <div className="flex items-start gap-4">
            <span className="font-serif text-3xl text-white/20">04</span>
            <div className="flex flex-col">
              <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
              <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase mb-6">Official Verification</h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white p-1 shrink-0">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
                </div>
                <div className="flex flex-col items-start gap-3">
                  <p className="text-[0.65rem] text-white/60 font-serif max-w-[200px]">Scan the QR code to verify this record directly on The Juris Standard™.</p>
                  <Link href="#" className="text-[0.6rem] uppercase tracking-widest text-[#CBAA69] hover:text-[#e8d099] transition-colors">Verify now →</Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-sm flex flex-col gap-4 text-[0.65rem] border-l border-[#222] pl-8">
            <div className="flex justify-between items-center text-white/50"><span>Record ID</span><span className="text-white tracking-wider">{recognitionId}</span></div>
            <div className="flex justify-between items-center text-white/50"><span>Status</span><span className="text-white">Active</span></div>
            <div className="flex justify-between items-center text-white/50"><span>Issued By</span><span className="text-white">The Juris Standard™</span></div>
            <div className="flex justify-between items-center text-white/50"><span>Verification Link</span><span className="text-white underline decoration-white/20 underline-offset-4">jurisstandard.com/verify/...</span></div>
          </div>
        </div>

        {/* Row 3: Vault, Cite, Presence */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6">
          
          {/* Vault */}
          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">05</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">The Recognition Vault™</h3>
              </div>
            </div>
            <p className="text-[0.65rem] text-white/60 font-serif mb-6">Official assets for institutional and professional use.</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-auto">
              <Link href={`/juris-index/professionals/corporate-elite/${id}/certificate`} className="border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-[#CBAA69]/40 hover:bg-white/[0.02] transition-colors">
                <FileText className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.5} />
                <span className="text-[0.5rem] uppercase tracking-widest text-white/80">Official<br/>Certificate</span>
                <span className="text-[0.45rem] text-white/40 mt-1">Download →</span>
              </Link>
              <Link href={`/juris-index/professionals/corporate-elite/${id}/share`} className="border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-[#CBAA69]/40 hover:bg-white/[0.02] transition-colors">
                <Share2 className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.5} />
                <span className="text-[0.5rem] uppercase tracking-widest text-white/80">Recognition<br/>Share Card™</span>
                <span className="text-[0.45rem] text-white/40 mt-1">Download →</span>
              </Link>
              <button className="border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-[#CBAA69]/40 hover:bg-white/[0.02] transition-colors">
                <Code2 className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.5} />
                <span className="text-[0.5rem] uppercase tracking-widest text-white/80">Website Seal™</span>
                <span className="text-[0.45rem] text-white/40 mt-1">Download →</span>
              </button>
              <button className="border border-[#222] p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-[#CBAA69]/40 hover:bg-white/[0.02] transition-colors">
                <Award className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.5} />
                <span className="text-[0.5rem] uppercase tracking-widest text-white/80">Official Record<br/>Document™</span>
                <span className="text-[0.45rem] text-white/40 mt-1">Download →</span>
              </button>
            </div>
          </div>

          {/* Cite */}
          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">06</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">Cite This Record™</h3>
              </div>
            </div>
            <p className="text-[0.65rem] text-white/60 font-serif mb-6">Use the following citation in your research, publications or references.</p>
            
            <div className="border border-white/10 p-4 mb-4 bg-black">
              <p className="text-[0.55rem] leading-[1.6] text-white/70 font-serif">
                The Juris Standard. ({record.year || '2027'}). {record.name} – Corporate Elite™ ({roleName}). {recognitionId}.
              </p>
            </div>
            <button onClick={handleCopyCitation} className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-white/40 hover:text-white transition-colors mt-auto w-max">
               <FileText className="w-3.5 h-3.5" /> Copy Citation →
            </button>
          </div>

          {/* Presence */}
          <div className="border border-[#222] bg-[#0c0c0c] p-8 flex flex-col group hover:border-[#CBAA69]/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <span className="font-serif text-3xl text-white/20">07</span>
              <div className="flex flex-col">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50 mb-3" />
                <h3 className="text-[0.65rem] tracking-[0.2em] text-[#CBAA69] uppercase">Professional Presence</h3>
              </div>
            </div>
            <p className="text-[0.65rem] text-white/60 font-serif mb-8 leading-relaxed">
              Explore the full professional profile on The Juris Standard Network™.
            </p>
            <Link href="#" className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-[#CBAA69] hover:text-[#e8d099] transition-colors mt-auto border border-[#CBAA69]/30 py-4 px-6 w-max rounded-sm">
              <User className="w-3.5 h-3.5" /> View Professional →
            </Link>
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}
