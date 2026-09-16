"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, Share2, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CertificatePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [firm, setFirm] = useState<any>(null);
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
          setFirm({
            name: data.name,
            division: data.division,
            year: data.year,
            recognitionId: data.recognitionId || `JS-${data.division?.replace(/[^A-Z]/g, '')}-${data.year}-001`,
            status: data.status || "Active"
          });
        }
      } catch (e) {
        console.error("Failed to fetch records", e);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center h-screen overflow-hidden">
        <div className="w-8 h-8 border border-[#CBAA69] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans h-screen overflow-hidden">
        <h1 className="text-2xl font-serif text-[#CBAA69] mb-4">Record Not Found</h1>
        <button onClick={() => router.back()} className="text-sm text-white/50 hover:text-white">Return to Vault</button>
      </div>
    );
  }

  const currentDate = "13 September 2026";

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="h-screen w-full bg-[#050505] font-sans flex flex-col relative selection:bg-[#CBAA69]/30 overflow-hidden">
      
      {/* Outer Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src="/logo/certificate_bg.png" 
          alt="Premium Background" 
          className="w-full h-full object-cover opacity-40 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-[#050505]" />
      </div>

      {/* Top Navbar */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-[#CBAA69]/80 hover:text-[#CBAA69] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recognition Vault™
        </button>
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <span className="text-[0.45rem] text-white/40 tracking-[0.2em] uppercase mt-1">A STRONGER LEGAL WORLD. ALWAYS.</span>
        </div>
        <div className="text-[0.65rem] uppercase tracking-widest text-[#CBAA69]/80 flex items-center gap-4">
          RECORD ID: {firm.recognitionId}
        </div>
      </div>

      {/* Certificate Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full h-full pt-12 pb-24 print:p-0 print:bg-white print:h-screen print:w-screen">
        
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
                 <img src="/logo/seal main.png" alt="Seal" className="w-[85%] h-[85%] object-contain drop-shadow-[0_0_15px_rgba(203,170,105,0.4)] mix-blend-luminosity brightness-150 contrast-125" />
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
              <h2 className="font-serif text-[3rem] tracking-widest text-[#0a0a0a] uppercase mb-6 leading-none border-b border-[#a38743] pb-4 inline-block px-12 font-medium truncate max-w-[90%]">
                {firm.name}
              </h2>

              <p className="text-[0.55rem] tracking-[0.2em] text-[#333] uppercase mb-4 font-semibold">
                Has been recognised under
              </p>

              {/* Division */}
              <h3 className="font-serif text-[1.7rem] tracking-[0.25em] text-[#9c7b2e] uppercase font-bold mb-2">
                {firm.division?.replace('™', '')}™
              </h3>
              <h4 className="font-serif text-xl tracking-widest text-[#222] mb-3 font-semibold">
                {firm.year}
              </h4>
              <p className="text-[0.7rem] tracking-[0.1em] text-[#111] uppercase font-bold mb-8">
                {firm.division === 'Law Firm Excellence™' ? 'Principal Record' : ''}
              </p>

              {/* Citation */}
              <p className="font-serif italic text-[0.85rem] text-[#222] leading-relaxed max-w-[85%] mx-auto mb-auto">
                In acknowledgement of its exceptional legal capability, enduring professional excellence and distinguished contribution to the legal profession.
              </p>

              {/* Footer row inside certificate */}
              <div className="w-full flex justify-between items-end mt-10 relative">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[0.75rem] text-[#111] font-medium">{currentDate}</span>
                  <span className="w-16 h-[1px] bg-[#9c7b2e]"></span>
                  <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-semibold">Date of Issue</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-40 absolute left-1/2 -translate-x-1/2 bottom-0">
                  <span className="text-[0.4rem] tracking-[0.3em] text-[#111] uppercase font-bold">RECOGNISE. VERIFY. PRESERVE.</span>
                </div>

                <div className="flex items-end gap-6">
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-[Brush_Script_MT,cursive] text-[2.2rem] text-[#0a0a0a] opacity-90 -mb-2 pr-2">Gabriel Jones</div>
                    <span className="w-36 h-[1px] bg-[#9c7b2e]"></span>
                    <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase text-right leading-tight font-semibold">
                      Editorial Board<br/>The Juris Standard™
                    </span>
                  </div>
                  
                  {/* QR Code Next to Signature */}
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-12 h-12 bg-white p-1 border border-[#9c7b2e]/50 shadow-sm">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${firm.recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
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
                  <span className="text-[0.65rem] tracking-wider text-[#111] font-bold">{firm.recognitionId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-semibold">Status</span>
                  <span className="text-[0.65rem] tracking-wider text-[#111] font-bold">{firm.status || 'Active'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Bar at bottom fixed */}
      <div className="absolute bottom-6 left-0 right-0 z-50 flex items-center justify-center gap-4 print:hidden">
        <button className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg">
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg"
        >
          <Printer className="w-3.5 h-3.5" /> Print Certificate
        </button>
        <button className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg">
          <Share2 className="w-3.5 h-3.5" /> Share Certificate
        </button>
        <Link 
          href={`/juris-index/law-firms/${id}`}
          className="flex items-center gap-2 px-6 py-3 border border-white/20 bg-black/60 backdrop-blur-md hover:bg-white/10 hover:border-white/40 text-white/80 text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg ml-4"
        >
          <LinkIcon className="w-3.5 h-3.5" /> View Original Record
        </Link>
      </div>
      
    </main>
  );
}
