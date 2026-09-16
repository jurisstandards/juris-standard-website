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
        
        {/* Certificate Outer Frame */}
        <div className="relative bg-[#0c0a08] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(203,170,105,0.15)] border border-[#2a2218] print:p-0 print:border-none print:shadow-none w-[90%] max-w-[1100px] max-h-[75vh] aspect-[1.414/1] flex flex-col">
          
          {/* Inner Golden Trim Frame */}
          <div className="flex-1 border-[1px] border-[#CBAA69]/40 relative bg-[#f4efdf] flex overflow-hidden shadow-inner print:border-none">
            
            {/* The Note / Watermark background */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage: `url('/logo/certificate_bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center right',
                filter: 'grayscale(100%) contrast(120%)'
              }}
            />
            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E")`
              }}
            />

            {/* Left Dark Panel */}
            <div className="w-[18%] relative z-10 bg-[#080808] border-r-[1px] border-[#1a1a1a]/50 flex flex-col items-center justify-center overflow-hidden h-full shadow-[10px_0_20px_rgba(0,0,0,0.08)]">
              <img 
                src="/logo/certificate_bg.png" 
                alt="Pillar Graphic" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten sepia-[0.3] hue-rotate-[-15deg]"
                style={{ objectPosition: '20% center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808] opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080808]/40 to-[#080808]/90" />
              
              <div className="relative z-20 flex flex-col h-full justify-between py-12 px-6">
                 <div></div>
                 <div className="text-[0.4rem] tracking-[0.25em] leading-[2.2] uppercase text-[#CBAA69]/90 font-serif text-center drop-shadow-md">
                   Excellence<br/>Recognised.<br/>A Stronger<br/>Legal World.
                 </div>
                 <div className="text-[0.45rem] tracking-[0.3em] uppercase text-[#CBAA69]/90 font-serif text-center drop-shadow-md pb-4 border-b border-[#CBAA69]/20">
                   The Juris<br/>Standard™
                 </div>
              </div>
            </div>

            {/* Right White Paper Panel */}
            <div className="flex-1 relative z-10 flex flex-col items-center text-center px-12 md:px-16 py-12 h-full justify-between">
              
              {/* Top Header Section */}
              <div className="w-full flex justify-between items-start mb-6">
                <div className="w-24"></div> {/* spacer */}
                <div className="flex flex-col items-center pt-2">
                  <h2 className="font-serif text-[1.1rem] md:text-[1.3rem] text-[#222222] tracking-[0.25em] mb-2 uppercase font-medium">
                    The Juris Standard™
                  </h2>
                  <span className="text-[0.4rem] md:text-[0.45rem] text-[#444444] tracking-[0.4em] uppercase font-light">
                    People &nbsp;&nbsp;|&nbsp;&nbsp; Firms &nbsp;&nbsp;|&nbsp;&nbsp; Ideas &nbsp;&nbsp;|&nbsp;&nbsp; Impact
                  </span>
                </div>
                {/* Mini details top right */}
                <div className="text-right flex flex-col gap-3 w-32 pt-2">
                  <div>
                    <span className="text-[0.35rem] tracking-[0.25em] uppercase text-[#666666] font-bold block mb-1">RECORD ID</span>
                    <span className="font-serif text-[#333333] text-[0.55rem] tracking-wider">{firm.recognitionId}</span>
                  </div>
                  <div>
                    <span className="text-[0.35rem] tracking-[0.25em] uppercase text-[#666666] font-bold block mb-1">STATUS</span>
                    <span className="font-serif text-[#333333] text-[0.55rem] tracking-wider flex items-center justify-end gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#333] inline-block" />
                      {firm.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Main Text Section */}
              <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[80%]">
                <h1 className="font-serif text-[1.35rem] md:text-[1.6rem] text-[#1a1a1a] tracking-[0.35em] uppercase mb-4 font-light">
                  Official Recognition
                </h1>
                <p className="font-serif text-[0.65rem] md:text-[0.7rem] text-[#555555] italic mb-6">
                  This is to certify that
                </p>

                {/* Firm Name */}
                <h2 className="font-serif text-[2.2rem] md:text-[2.6rem] text-[#1a1a1a] uppercase tracking-[0.15em] mb-6 font-normal leading-tight px-4 w-full truncate">
                  {firm.name}
                </h2>

                <p className="font-serif text-[0.65rem] md:text-[0.7rem] text-[#555555] italic mb-3">
                  is recognised under
                </p>
                {/* Division & Year */}
                <h3 className="font-serif text-[1rem] md:text-[1.2rem] text-[#B89552] tracking-[0.25em] uppercase mb-1.5 font-medium drop-shadow-sm">
                  {firm.division?.replace('™', '')}™
                </h3>
                <div className="text-[0.8rem] text-[#333] tracking-[0.25em] font-serif mb-6 font-medium">
                  {firm.year}
                </div>

                <p className="font-serif text-[0.6rem] md:text-[0.65rem] text-[#444444] italic max-w-[90%] leading-[1.8]">
                  In acknowledgement of its exceptional legal capability,<br />
                  enduring professional excellence and distinguished contribution<br />
                  to the legal profession.
                </p>
              </div>

              {/* Bottom Footer Section (Date, Seal, Signature) */}
              <div className="w-full flex items-end justify-between px-4 mt-6 relative pb-2">
                
                {/* Left: Date */}
                <div className="flex flex-col text-left pb-1 w-32">
                  <span className="font-serif text-[#333] text-[0.6rem] mb-2">{currentDate}</span>
                  <span className="text-[0.35rem] tracking-[0.25em] uppercase text-[#666] font-bold border-t border-[#333]/20 pt-2">
                    Date of Issue
                  </span>
                  <div className="mt-5">
                    <h4 className="font-serif text-[0.7rem] text-[#333] tracking-[0.2em] uppercase leading-tight font-medium">
                      The Juris<br />Standard™
                    </h4>
                  </div>
                </div>

                {/* Center: Seal - Smaller and nicely placed */}
                <div className="flex flex-col items-center justify-center -mt-6 relative z-20">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <img 
                      src="/logo/seal main.png" 
                      alt="Juris Standard Seal" 
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[0.35rem] tracking-[0.25em] uppercase text-[#666] font-bold mt-3">
                    A STRONGER LEGAL WORLD. ALWAYS.
                  </span>
                </div>

                {/* Right: Signature & QR */}
                <div className="flex flex-col text-right items-end pb-1 w-44">
                  {/* Signature */}
                  <div className="font-serif italic text-xl text-[#333] mb-1.5 signature-font pr-4" style={{ fontFamily: "'Cedarville Cursive', 'Brush Script MT', cursive" }}>
                    Gabriel Jones
                  </div>
                  <span className="text-[0.35rem] tracking-[0.25em] uppercase text-[#666] font-bold border-t border-[#333]/20 pt-2 w-full text-left">
                    EDITORIAL BOARD<br />
                    THE JURIS STANDARD™
                  </span>
                  
                  {/* QR Code Layout matching the reference exactly */}
                  <div className="mt-5 flex items-center justify-start w-full gap-3">
                    <span className="text-[0.35rem] tracking-[0.2em] uppercase text-[#666] font-bold text-right leading-[1.6]">
                      SCAN TO VERIFY<br/>THIS RECORD
                    </span>
                    <div className="w-10 h-10 bg-white border border-[#1a1a1a]/15 p-0.5">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://jurisstandard.com/record/${firm.recognitionId}`} alt="QR Code" className="w-full h-full opacity-85" />
                    </div>
                  </div>
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
