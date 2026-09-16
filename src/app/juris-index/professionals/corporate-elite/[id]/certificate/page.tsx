"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, Share2, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CorporateEliteCertificatePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border border-[#CBAA69] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-2xl font-serif text-[#CBAA69] mb-4">Record Not Found</h1>
        <button onClick={() => router.back()} className="text-sm text-white/50 hover:text-white">Return to Vault</button>
      </div>
    );
  }

  const recognitionId = record.recognitionId || `JS-CE-${record.year || "2027"}-001`;
  const dateOfIssue = record.created_at ? new Date(record.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "12 September 2027";

  return (
    <main className="h-screen bg-[#050505] font-sans flex flex-col selection:bg-[#CBAA69]/30 text-white overflow-hidden relative">
      
      {/* Background with blend modes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/logo/certificate_bg.png" className="w-full h-full object-cover opacity-60 mix-blend-lighten sepia-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80" />
      </div>

      {/* Top Navbar */}
      <div className="flex items-center justify-between px-8 py-5 relative z-50 shrink-0">
        <div className="flex flex-col items-start">
          <h1 className="font-serif text-[0.8rem] text-white tracking-widest uppercase">The Juris Standard™</h1>
          <span className="text-[0.4rem] text-white/40 tracking-[0.2em] uppercase mt-1">People &nbsp;|&nbsp; Firms &nbsp;|&nbsp; Ideas &nbsp;|&nbsp; Impact</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[0.45rem] text-white/40 tracking-[0.2em] uppercase">A STRONGER LEGAL WORLD. ALWAYS.</span>
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-[#E8D099] flex items-center justify-center text-black font-serif text-xs">AB</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-8 pb-10">
        
        {/* Decorative Side Texts */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col text-[0.5rem] tracking-[0.3em] text-[#CBAA69]/40 uppercase leading-[2.5] z-0">
          <span>PEOPLE</span>
          <span>SHAPE</span>
          <span>POSSIBILITIES.</span>
          <span className="mt-4">A STRONGER</span>
          <span>LEGAL WORLD.</span>
          <span>ALWAYS.</span>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col text-[0.5rem] tracking-[0.3em] text-[#CBAA69]/40 uppercase leading-[2.5] text-right z-0">
          <span>EXCELLENCE</span>
          <span>RECOGNISED.</span>
          <span className="mt-4">A STRONGER</span>
          <span>LEGAL WORLD.</span>
          <span>ALWAYS.</span>
        </div>

        {/* Top Controls */}
        <div className="w-[1000px] flex justify-between items-end mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-3 text-[0.55rem] uppercase tracking-widest text-[#CBAA69]/80 hover:text-[#CBAA69] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Recognition Vault™
          </button>
          
          <div className="flex items-center gap-6 text-[0.55rem] tracking-widest uppercase text-white/60">
            <span>RECORD ID: {recognitionId}</span>
          </div>
        </div>

        {/* Certificate Wrapper (Thick Frame) */}
        <div className="w-[1000px] aspect-[1.5/1] bg-[#d4af37]/20 p-[2px] rounded-sm relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0">
          {/* Inner Gold Bevel effect */}
          <div className="absolute inset-0 border-[4px] border-[#9c7b2e] rounded-sm pointer-events-none z-30 opacity-80 mix-blend-overlay" />
          <div className="absolute inset-[4px] border-[2px] border-[#ffe8a1]/30 rounded-sm pointer-events-none z-30" />
          <div className="absolute inset-[6px] border border-[#2a2a2a] rounded-sm pointer-events-none z-30 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />

          {/* Certificate Content */}
          <div className="w-full h-full bg-[#f4ebd8] relative overflow-hidden flex shadow-inner">
            
            {/* Watermark/Texture for the paper */}
            <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-[0.08]">
              <img src="/logo/certificate_bg.png" className="w-full h-full object-cover filter grayscale" />
            </div>
            
            {/* Left Dark Panel */}
            <div className="w-[30%] h-full bg-[#080808] relative z-10 flex flex-col items-center py-16 px-8 text-center border-r-2 border-[#CBAA69]/40 shadow-[10px_0_20px_rgba(0,0,0,0.2)]">
               
               <div className="mb-auto">
                 <h4 className="font-serif text-[0.7rem] tracking-[0.2em] text-white uppercase mb-1">The Juris Standard</h4>
                 <div className="w-8 h-[1px] bg-[#CBAA69]/50 mx-auto"></div>
               </div>

               <div className="w-full aspect-square relative my-10 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border border-[#CBAA69]/20" />
                 <div className="absolute inset-2 rounded-full border border-[#CBAA69]/40" />
                 <img src="/logo/seal main.png" alt="Corporate Elite Seal" className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_15px_rgba(203,170,105,0.4)] mix-blend-luminosity brightness-150 contrast-125" />
               </div>

               <div className="mt-auto flex flex-col gap-10">
                 <div className="text-[0.45rem] tracking-[0.3em] text-white/70 uppercase leading-[2]">
                   INDEPENDENT.<br/>INSIGHTFUL.<br/>DEFINITIVE.
                 </div>
                 
                 <div className="text-[0.4rem] tracking-[0.25em] text-[#CBAA69]/60 uppercase leading-[2]">
                   A STRONGER<br/>LEGAL WORLD.<br/>ALWAYS.
                 </div>
               </div>
            </div>

            {/* Right Light Panel (Main Content) */}
            <div className="w-[70%] h-full relative z-10 flex flex-col items-center py-12 px-16 text-center">
              
              {/* Header */}
              <div className="flex flex-col items-center mb-10">
                <h2 className="font-serif text-sm tracking-[0.2em] text-[#111] uppercase mb-2 font-medium">The Juris Standard™</h2>
                <div className="flex items-center gap-3 text-[0.4rem] tracking-[0.3em] text-[#444] uppercase font-semibold">
                  <span>People</span><span>|</span><span>Firms</span><span>|</span><span>Ideas</span><span>|</span><span>Impact</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-[1.7rem] tracking-[0.3em] text-[#050505] uppercase mb-4 font-bold">
                Official Recognition
              </h1>
              <p className="font-serif italic text-[0.85rem] text-[#333] mb-6">
                This is to certify that
              </p>

              {/* Name */}
              <h2 className="font-serif text-[3rem] tracking-widest text-[#0a0a0a] uppercase mb-6 leading-none border-b border-[#a38743] pb-4 inline-block px-12 font-medium">
                {record.name}
              </h2>

              <p className="text-[0.55rem] tracking-[0.2em] text-[#333] uppercase mb-4 font-semibold">
                Has been recognised under
              </p>

              {/* Division */}
              <h3 className="font-serif text-[1.7rem] tracking-[0.25em] text-[#9c7b2e] uppercase font-bold mb-2">
                Corporate Elite™
              </h3>
              <h4 className="font-serif text-xl tracking-widest text-[#222] mb-3 font-semibold">
                {record.year || '2027'}
              </h4>
              <p className="text-[0.7rem] tracking-[0.1em] text-[#111] uppercase font-bold mb-8">
                Corporate & M&A Counsel™
              </p>

              {/* Citation */}
              <p className="font-serif italic text-[0.85rem] text-[#222] leading-relaxed max-w-[85%] mx-auto mb-auto">
                In recognition of exceptional corporate counsel, strategic judgement and outstanding contribution to complex M&A and corporate transactions.
              </p>

              {/* Footer row inside certificate */}
              <div className="w-full flex justify-between items-end mt-10 relative">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[0.75rem] text-[#111] font-medium">{dateOfIssue}</span>
                  <span className="w-16 h-[1px] bg-[#9c7b2e]"></span>
                  <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-semibold">Date of Issue</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-40 absolute left-1/2 -translate-x-1/2 bottom-0">
                  <span className="text-[0.4rem] tracking-[0.3em] text-[#111] uppercase font-bold">RECOGNISE. VERIFY. PRESERVE.</span>
                </div>

                <div className="flex items-end gap-6">
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-[Brush_Script_MT,cursive] text-[2.2rem] text-[#0a0a0a] opacity-90 -mb-2 pr-2">Gabriel Jane</div>
                    <span className="w-36 h-[1px] bg-[#9c7b2e]"></span>
                    <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase text-right leading-tight font-semibold">
                      Editorial Board<br/>The Juris Standard™
                    </span>
                  </div>
                  
                  {/* QR Code Next to Signature */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-12 h-12 bg-white p-1 border border-[#9c7b2e]/50 shadow-sm">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
                    </div>
                    <span className="text-[0.3rem] tracking-[0.1em] text-[#444] uppercase text-center w-14 leading-tight font-medium">
                      Verify this record
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Right Meta */}
              <div className="absolute top-10 right-10 flex flex-col items-end gap-3 text-right">
                <div className="flex flex-col">
                  <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-semibold">Record ID</span>
                  <span className="text-[0.65rem] tracking-wider text-[#111] font-bold">{recognitionId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-semibold">Status</span>
                  <span className="text-[0.65rem] tracking-wider text-[#111] font-bold">{record.status || 'Active'}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Actions Container */}
        <div className="w-[1000px] flex items-center justify-between mt-8">
          <div className="flex items-center text-[0.55rem] tracking-[0.3em] text-white/30 uppercase">
            <span>The Juris Standard™</span>
            <span className="mx-3">|</span>
            <span>A stronger legal world. Always.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 text-[0.55rem] uppercase tracking-widest text-white transition-all">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 text-[0.55rem] uppercase tracking-widest text-white transition-all">
              <Printer className="w-3.5 h-3.5" /> Print Certificate
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 text-[0.55rem] uppercase tracking-widest text-white transition-all">
              <Share2 className="w-3.5 h-3.5" /> Share Certificate
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#CBAA69]/50 hover:bg-[#CBAA69]/5 text-[0.55rem] uppercase tracking-widest text-white transition-all">
              <LinkIcon className="w-3.5 h-3.5" /> View Original Record
            </button>
          </div>
          
          <div className="flex items-center text-[0.45rem] tracking-[0.3em] text-white/30 uppercase gap-4">
            <span>People</span><span>Firms</span><span>Ideas</span><span>Impact</span>
          </div>
        </div>

      </div>
    </main>
  );
}
