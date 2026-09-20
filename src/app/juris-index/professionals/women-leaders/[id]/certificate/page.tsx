"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Printer, Share2, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function WomenLeadersCertificatePage() {
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

  const handleDownloadPDF = () => {
    // Browsers natively support Save to PDF via the print dialog
    window.print();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `The Juris Standard - ${firm?.name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Certificate link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <main className="h-screen w-full bg-[#050505] font-sans flex flex-col relative selection:bg-[#CBAA69]/30 overflow-hidden print:h-auto print:bg-white print:overflow-visible">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { size: 1000px 667px; margin: 0; }
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            margin: 0 !important; 
            padding: 0 !important;
          }
        }
      `}} />

      {/* Outer Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none print:hidden">
        <img 
          src="/logo/certificate_bg.png" 
          alt="Premium Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/90" />
      </div>

      {/* Top Navbar - Minimalist */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 print:hidden">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-white/50 hover:text-[#CBAA69] transition-colors bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-[2px] border border-white/5 hover:border-[#CBAA69]/40"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Certificate Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full h-full pt-12 pb-24 print:p-0 print:m-0 print:flex print:items-center print:justify-center">
        
        {/* Certificate Wrapper (Thick Frame) */}
        <div className="w-[1000px] aspect-[1.5/1] bg-[#d4af37]/20 p-[2px] rounded-sm relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex-shrink-0 print:shadow-none print:m-0 print:overflow-hidden">
          {/* Inner Gold Bevel effect */}
          <div className="absolute inset-0 border-[4px] border-[#9c7b2e] rounded-sm pointer-events-none z-30 opacity-80 mix-blend-overlay" />
          <div className="absolute inset-[4px] border-[2px] border-[#ffe8a1]/30 rounded-sm pointer-events-none z-30" />
          <div className="absolute inset-[6px] border border-[#2a2a2a] rounded-sm pointer-events-none z-30 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] print:border-[#222]" />

          {/* Certificate Content */}
          <div className="w-full h-full relative overflow-hidden rounded-sm shadow-inner">
            
            {/* The new background image for the certificate page */}
            <img src="/logo/certificate backgroud page.png" className="absolute inset-0 w-full h-full object-cover z-0" alt="Certificate Paper" />
            
            <div className="w-full h-full relative z-10 flex">
              {/* Left Dark Panel */}
              <div className="w-[22%] h-full relative z-10 flex flex-col items-center py-16 border-r-[2px] border-[#111] shadow-[15px_0_30px_rgba(0,0,0,0.3)] bg-[#050505] overflow-hidden shrink-0">
                
                {/* Background Image for Left Panel */}
                <img src="/logo/certificate_bg.png" className="absolute inset-0 w-full h-full object-cover object-left opacity-60" alt="Left Panel Background" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/90" />

                <div className="relative z-10 flex-1 flex flex-col justify-between w-full">
                  <div className="flex-1 flex items-center justify-center mt-10">
                     <p className="text-[#CBAA69]/60 tracking-[0.25em] text-[0.55rem] uppercase leading-[2.5] text-center font-medium w-full px-4 break-words">
                       EXCELLENCE RECOGNISED.<br/><br/>A STRONGER<br/>LEGAL WORLD.
                     </p>
                  </div>

                  <div className="mt-auto pb-4 text-center">
                    <h4 className="font-serif text-[0.75rem] tracking-[0.25em] text-[#CBAA69]/90 uppercase font-semibold">The Juris<br/>Standard™</h4>
                  </div>
                </div>
              </div>
              
              {/* Right Panel (Main Content Overlay) */}
              <div className="w-[78%] h-full relative flex flex-col items-center py-10 px-12 text-center text-[#111]">
                
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                  <h2 className="font-serif text-[0.8rem] tracking-[0.25em] uppercase mb-2 font-medium">The Juris Standard™</h2>
                  <div className="flex items-center gap-4 text-[0.45rem] tracking-[0.35em] text-[#444] uppercase font-semibold">
                    <span>People</span><span>|</span><span>Firms</span><span>|</span><span>Ideas</span><span>|</span><span>Impact</span>
                  </div>
                </div>

                <h1 className="font-serif text-[1.8rem] tracking-[0.35em] uppercase mb-4 font-bold text-[#050505]">
                  Official Recognition
                </h1>
                <p className="font-serif italic text-[0.95rem] text-[#333] mb-8">
                  This is to certify that
                </p>

                {/* Name */}
                <h2 className="font-serif text-[2.8rem] tracking-wider uppercase mb-8 leading-[1.1] border-b border-[#a38743]/40 pb-4 inline-block px-12 font-medium text-[#0a0a0a] max-w-[90%] break-words">
                  {firm.name}
                </h2>

                <p className="font-serif italic text-[0.95rem] text-[#333] mb-4">
                  is recognised under
                </p>

                {/* Division */}
                <h3 className="font-serif text-[1.8rem] tracking-[0.3em] text-[#8a6b22] uppercase font-bold mb-2">
                  {firm.division?.replace('™', '')}™
                </h3>
                <h4 className="font-serif text-xl tracking-widest text-[#222] mb-6 font-semibold">
                  {firm.year}
                </h4>

                {/* Citation */}
                <p className="font-serif italic text-[0.85rem] text-[#222] leading-relaxed max-w-[85%] mx-auto mb-auto">
                  In acknowledgement of its exceptional legal capability, enduring professional excellence and distinguished contribution to the legal profession.
                </p>

                {/* Footer Section (Signature, Seal, QR) */}
                <div className="w-full flex justify-between items-end mt-4 relative pt-12 px-4">
                  
                  {/* Left: Signature */}
                  <div className="flex flex-col items-start gap-2 pb-4">
                    <div className="font-[Brush_Script_MT,cursive] text-[2.4rem] text-[#0a0a0a] opacity-90 -mb-2 pl-2">Gabriel Jones</div>
                    <span className="w-40 h-[1px] bg-[#9c7b2e]"></span>
                    <span className="text-[0.5rem] tracking-[0.2em] text-[#444] uppercase text-left leading-tight font-bold">
                      Editorial Board<br/>The Juris Standard™
                    </span>
                  </div>

                  {/* Center: Golden Seal */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-3 pb-2">
                    <img src="/logo/seal main.png" alt="Seal" className="w-[110px] h-[110px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]" />
                    <span className="text-[0.45rem] tracking-[0.3em] text-[#111] uppercase font-bold">A STRONGER LEGAL WORLD. ALWAYS.</span>
                  </div>

                  {/* Right: QR Code & Verification (Symmetrical to Signature) */}
                  <div className="flex flex-col items-end gap-2 pb-4">
                    <div className="flex items-end justify-end w-full pr-4 pb-1">
                      <div className="w-[3.4rem] h-[3.4rem] bg-white p-[4px] border border-[#9c7b2e]/40 shadow-sm">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${firm.recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
                      </div>
                    </div>
                    <span className="w-40 h-[1px] bg-[#9c7b2e]"></span>
                    <span className="text-[0.5rem] tracking-[0.2em] text-[#444] uppercase text-right leading-tight font-bold">
                      Official Record<br/>Scan to verify
                    </span>
                  </div>
                </div>

                {/* Top Left Meta Overlay (Date) */}
                <div className="absolute top-10 left-10 flex flex-col items-start gap-3 text-left opacity-70">
                  <div className="flex flex-col">
                    <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-bold">Date of Issue</span>
                    <span className="text-[0.6rem] tracking-widest text-[#111] font-bold">{currentDate}</span>
                  </div>
                </div>

                {/* Top Right Meta Overlay */}
                <div className="absolute top-10 right-10 flex flex-col items-end gap-3 text-right opacity-70">
                  <div className="flex flex-col">
                    <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-bold">Record ID</span>
                    <span className="text-[0.6rem] tracking-widest text-[#111] font-bold">{firm.recognitionId}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.45rem] tracking-[0.2em] text-[#444] uppercase font-bold">Status</span>
                    <span className="text-[0.6rem] tracking-widest text-[#111] font-bold">{firm.status || 'Active'}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Bar at bottom fixed */}
      <div className="absolute bottom-6 left-0 right-0 z-50 flex items-center justify-center gap-4 print:hidden">
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg"
        >
          <Download className="w-3.5 h-3.5" /> Download PDF
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg"
        >
          <Printer className="w-3.5 h-3.5" /> Print Certificate
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 border border-[#CBAA69]/40 bg-black/60 backdrop-blur-md hover:bg-[#CBAA69]/10 hover:border-[#CBAA69] text-[#CBAA69] text-[0.65rem] uppercase tracking-widest font-medium transition-all rounded-[2px] shadow-lg"
        >
          <Share2 className="w-3.5 h-3.5" /> Share Certificate
        </button>
      </div>
      
    </main>
  );
}
