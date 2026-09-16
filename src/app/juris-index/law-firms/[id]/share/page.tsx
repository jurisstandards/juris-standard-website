"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Link as LinkIcon, Image as ImageIcon, 
  Briefcase, AtSign, Camera, Phone, Mail, MoreHorizontal, Search
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const FORMATS = [
  { id: 'linkedin', label: 'LinkedIn Post', resolution: '1200 x 628', aspect: '1200/628', icon: Briefcase },
  { id: 'twitter', label: 'X (Twitter) Post', resolution: '1200 x 628', aspect: '1200/628', icon: AtSign },
  { id: 'ig_post', label: 'Instagram Post', resolution: '1080 x 1080', aspect: '1/1', icon: Camera },
  { id: 'ig_story', label: 'Instagram Story', resolution: '1080 x 1920', aspect: '9/16', icon: Camera },
  { id: 'whatsapp', label: 'WhatsApp / Email', resolution: '1080 x 1350', aspect: '4/5', icon: Phone },
  { id: 'custom', label: 'Custom Size', resolution: 'Generate your own', aspect: 'auto', icon: ImageIcon },
];

export default function ShareCardPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [firm, setFirm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState('linkedin');

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border border-[#CBAA69] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans">
        <h1 className="text-2xl font-serif text-[#CBAA69] mb-4">Record Not Found</h1>
        <button onClick={() => router.back()} className="text-sm text-white/50 hover:text-white">Return to Vault</button>
      </div>
    );
  }

  const activeFormatObj = FORMATS.find(f => f.id === selectedFormat) || FORMATS[0];

  return (
    <main className="h-screen bg-[#050505] font-sans flex flex-col selection:bg-[#CBAA69]/30 text-white overflow-hidden">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#222] bg-[#050505] z-50 shrink-0 h-[60px]">
        <div className="flex flex-col items-start">
          <h1 className="font-serif text-[0.7rem] text-white tracking-widest uppercase">The Juris Standard™</h1>
          <span className="text-[0.35rem] text-white/40 tracking-[0.2em] uppercase mt-0.5">People &nbsp;|&nbsp; Firms &nbsp;|&nbsp; Ideas &nbsp;|&nbsp; Impact</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[0.45rem] text-white/40 tracking-[0.2em] uppercase">A STRONGER LEGAL WORLD. ALWAYS.</span>
          <div className="flex items-center gap-4">
            <Search className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[0.5rem] uppercase tracking-widest text-white/80 border-l border-white/20 pl-4">MY JURIS™</span>
            <div className="w-6 h-6 rounded-full bg-[#E8D099] flex items-center justify-center text-black font-serif text-[0.6rem]">AB</div>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-60px)] overflow-hidden">
        
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[260px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#222] flex flex-col px-6 py-6 overflow-hidden bg-[#050505]">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[0.5rem] uppercase tracking-widest text-[#CBAA69]/80 hover:text-[#CBAA69] transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Recognition Vault™
          </button>

          <h2 className="text-[0.55rem] font-bold tracking-[0.2em] uppercase text-white/90 leading-[1.6] mb-6">
            RECOGNITION<br/>SHARE CARD™
          </h2>
          
          <div className="w-6 h-[1px] bg-white/20 mb-6" />

          <p className="text-[0.55rem] text-white/60 leading-[1.8] font-light mb-auto">
            Share your recognition<br/>with the world.<br/>
            Every share links back<br/>to the official Juris Standard™<br/>record for verification.
          </p>

          <div className="mt-8">
            <p className="font-serif italic text-white/80 text-lg leading-snug mb-4">
              "A stronger<br/>legal world.<br/>Always."
            </p>
            <span className="text-[0.45rem] tracking-[0.2em] uppercase text-white/40">
              THE JURIS STANDARD™
            </span>
          </div>
        </div>

        {/* CENTER COLUMN (Main Preview Area) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0a]">
          
          {/* Top Preview Canvas */}
          <div className="flex-1 flex flex-col p-6 lg:p-8 border-b border-[#222] relative min-h-0 items-center justify-center">
            <h3 className="text-[0.5rem] tracking-[0.2em] uppercase text-white/50 mb-4 w-full text-left shrink-0">
              PREVIEW — {activeFormatObj.label.toUpperCase()} ({activeFormatObj.resolution})
            </h3>
            
            <div className="flex-1 flex items-center justify-center w-full relative">
              {/* Dynamic Aspect Ratio Preview Box */}
              <div 
                className="w-full max-h-full flex relative overflow-hidden bg-[#111] shadow-2xl border border-white/5"
                style={{ aspectRatio: activeFormatObj.aspect === 'auto' ? '1200/628' : activeFormatObj.aspect }}
              >
                {/* Image Background */}
                <img 
                  src="/logo/certificate_bg.png" 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover sepia-[0.4] hue-rotate-[-10deg] opacity-70"
                  style={{ objectPosition: '70% center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-[80%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent w-[30%] right-0" />

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
                  
                  {/* Top Left */}
                  <div className="flex flex-col">
                    <h4 className="font-serif text-[1rem] lg:text-[1.2rem] text-white tracking-[0.25em] uppercase mb-1">
                      The Juris Standard™
                    </h4>
                    <span className="text-[0.35rem] lg:text-[0.45rem] text-white/40 tracking-[0.4em] uppercase">
                      People &nbsp;|&nbsp; Firms &nbsp;|&nbsp; Ideas &nbsp;|&nbsp; Impact
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    {/* Line */}
                    <div className="w-12 h-[1px] bg-[#CBAA69]/50 mb-6"></div>
                    
                    <h5 className="font-serif text-[0.8rem] lg:text-[1rem] text-white/90 tracking-[0.2em] uppercase mb-4 font-light">
                      {firm.division?.replace('™', '')}™ &nbsp;·&nbsp; {firm.year}
                    </h5>
                    
                    <h2 className="font-serif text-[2.5rem] lg:text-[4.5rem] text-white uppercase tracking-wider mb-8 font-medium leading-none drop-shadow-lg">
                      {firm.name}
                    </h2>

                    <p className="font-serif text-lg lg:text-2xl text-white/80 italic leading-snug">
                      Excellence recognised.<br/>
                      A stronger legal world. Always.
                    </p>
                  </div>

                  {/* Bottom Left */}
                  <div className="flex items-center gap-4 text-[0.4rem] lg:text-[0.5rem] tracking-[0.25em] uppercase text-white/40">
                    <span>RECORD ID: {firm.recognitionId}</span>
                    <span className="w-[1px] h-3 bg-white/20"></span>
                    <span>VERIFY AT THE JURIS STANDARD™</span>
                  </div>
                </div>

                {/* Right Elements (Seal, QR, Vertical Text) */}
                <div className="absolute top-0 right-0 bottom-0 w-[40%] flex flex-col items-end justify-between p-6 sm:p-10 md:p-16 z-20 pointer-events-none">
                  <div className="flex flex-col gap-2 opacity-50 mt-12 hidden md:flex">
                    {['TRUST.', 'CAPABILITY.', 'INTEGRITY.', 'IMPACT.'].map(word => (
                      <span key={word} className="text-[0.4rem] tracking-[0.3em] font-medium text-white/80 text-right">{word}</span>
                    ))}
                  </div>

                  {/* Big Seal */}
                  <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[35%] aspect-square max-w-[280px]">
                    <img 
                      src="/logo/seal main.png" 
                      alt="Juris Standard Seal" 
                      className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  {/* QR Code Block */}
                  <div className="flex flex-col items-center bg-black/40 backdrop-blur-md p-3 border border-white/10 rounded-sm">
                    <div className="w-16 h-16 bg-white p-1 mb-2">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${firm.recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
                    </div>
                    <span className="text-[0.35rem] tracking-[0.2em] uppercase text-white/80 text-center">
                      SCAN TO VERIFY
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Area */}
          <div className="h-[200px] shrink-0 p-6 flex flex-col relative z-20 bg-[#070707] border-t border-[#222]">
            <h3 className="text-[0.5rem] tracking-[0.2em] uppercase text-white/50 mb-4 shrink-0">
              OTHER FORMATS (SAME JURIS STANDARD™ THEME)
            </h3>
            
            <div className="flex-1 flex items-stretch gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {FORMATS.filter(f => f.id !== selectedFormat && f.id !== 'custom').map(format => (
                <div key={format.id} className="flex flex-col h-full shrink-0 group cursor-pointer" onClick={() => setSelectedFormat(format.id)}>
                  <span className="text-[0.45rem] tracking-wider text-white/60 mb-2 group-hover:text-white transition-colors">
                    {format.label} ({format.resolution})
                  </span>
                  <div 
                    className="flex-1 relative bg-[#111] border border-white/10 group-hover:border-[#CBAA69]/50 transition-colors max-h-full"
                    style={{ aspectRatio: format.aspect }}
                  >
                    {/* Tiny representation of the preview */}
                    <img 
                      src="/logo/certificate_bg.png" 
                      alt="Bg" 
                      className="absolute inset-0 w-full h-full object-cover sepia-[0.4] hue-rotate-[-10deg] opacity-70" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-[80%]" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-between z-10">
                      <div>
                        <h4 className="font-serif text-[0.35rem] text-white uppercase mb-0.5">The Juris Standard™</h4>
                        <div className="w-3 h-[1px] bg-[#CBAA69]/50 my-1"></div>
                        <h2 className="font-serif text-[0.65rem] text-white uppercase font-medium leading-none">{firm.name}</h2>
                      </div>
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8">
                        <img src="/logo/seal main.png" className="w-full h-full object-contain opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Format Selection) */}
        <div className="w-full lg:w-[280px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#222] bg-[#050505] flex flex-col p-6 overflow-hidden">
          
          <h3 className="text-[0.5rem] tracking-[0.2em] uppercase text-white/50 mb-4 font-bold shrink-0">
            SELECT FORMAT
          </h3>
          
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-2 mb-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#333] [&::-webkit-scrollbar-thumb]:rounded-full">
            {FORMATS.map(format => {
              const isSelected = format.id === selectedFormat;
              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`flex items-center gap-3 p-3 rounded-[2px] transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#2a1f11] to-[#0a0a0a] border border-[#CBAA69]/40' 
                      : 'bg-transparent border border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 bg-[#111] border ${isSelected ? 'border-[#CBAA69]/30 text-[#CBAA69]' : 'border-white/10 text-white/60'} rounded-[2px]`}>
                    <format.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[0.55rem] tracking-wider ${isSelected ? 'text-white' : 'text-white/80'}`}>{format.label}</span>
                    <span className="text-[0.45rem] text-white/40">{format.resolution}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 mt-4 shrink-0">
            <button className="w-full py-3 bg-gradient-to-r from-[#e6ce9a] to-[#CBAA69] hover:from-[#f0d8a5] hover:to-[#d8b877] text-black text-[0.6rem] uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-[2px] transition-all shadow-[0_0_20px_rgba(203,170,105,0.15)]">
              <Download className="w-3.5 h-3.5" /> Download Image
            </button>
            <button className="w-full py-3 bg-transparent border border-[#333] hover:border-white/40 text-white text-[0.6rem] uppercase tracking-widest font-medium flex items-center justify-center gap-2 rounded-[2px] transition-all">
              <LinkIcon className="w-3 h-3" /> Copy Share Link
            </button>
          </div>

          <div className="flex flex-col mt-6 shrink-0">
            <span className="text-[0.5rem] text-white/50 mb-3">Share Directly</span>
            <div className="flex items-center gap-2">
              {[Briefcase, AtSign, Phone, Mail, MoreHorizontal].map((Icon, idx) => (
                <button key={idx} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors group">
                  <Icon className="w-3.5 h-3.5 text-white/60 group-hover:text-white" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}
