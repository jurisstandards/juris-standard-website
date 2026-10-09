"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, Briefcase, AtSign, Camera, Phone, Search, Loader2, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const FORMATS = [
  { id: 'linkedin', label: 'LinkedIn Post', resolution: '1200 x 628', aspect: '1200/628', icon: Briefcase },
  { id: 'twitter', label: 'X (Twitter) Post', resolution: '1200 x 628', aspect: '1200/628', icon: AtSign },
  { id: 'ig_post', label: 'Instagram Post', resolution: '1080 x 1080', aspect: '1/1', icon: Camera },
  { id: 'ig_story', label: 'Instagram Story', resolution: '1080 x 1920', aspect: '9/16', icon: Camera },
  { id: 'whatsapp', label: 'WhatsApp / Email', resolution: '1080 x 1350', aspect: '4/5', icon: Phone },
];

const getTrophyImage = (division: string) => {
  if (!division) return "/images/trophy_law_firm.jpg";
  const lower = division.toLowerCase();
  if (lower.includes("corporate elite")) return "/images/trophy_corporate_elite.jpg";
  if (lower.includes("litigation")) return "/images/trophy_litigation_master.jpg";
  if (lower.includes("women")) return "/images/trophy_women_leaders.jpg";
  if (lower.includes("future")) return "/images/trophy_future_leaders.jpg";
  if (lower.includes("innovation")) return "/images/trophy_legal_innovators.jpg";
  return "/images/trophy_law_firm.jpg";
};

export default function PremiumShareCardPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [firm, setFirm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState('linkedin');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from("juris_records")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setFirm({
            name: data.name,
            division: data.division,
            year: data.year || new Date().getFullYear().toString(),
            recognitionId: data.recognitionId || `JS-${data.division?.replace(/[^A-Z]/g, '')}-${data.year || '2026'}-001`,
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
        <Loader2 className="w-8 h-8 text-[#CBAA69] animate-spin" />
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
  const trophySrc = getTrophyImage(firm.division);

  return (
    <main className="min-h-screen bg-[#0a0a0a] font-sans flex flex-col text-white overflow-hidden">
      
      {/* Premium Navbar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#050505] z-50 shrink-0">
        <div className="flex flex-col items-start">
          <h1 className="font-serif text-[0.7rem] text-white tracking-widest uppercase">The Juris Standard™</h1>
          <span className="text-[0.35rem] text-white/40 tracking-[0.2em] uppercase mt-1">People &nbsp;|&nbsp; Firms &nbsp;|&nbsp; Ideas &nbsp;|&nbsp; Impact</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="hidden md:inline-block text-[0.45rem] text-white/40 tracking-[0.2em] uppercase">A STRONGER LEGAL WORLD. ALWAYS.</span>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <Search className="w-4 h-4 text-white/50" />
            <span className="text-[0.5rem] uppercase tracking-widest text-white/80">MY JURIS™</span>
            <div className="w-6 h-6 rounded-full bg-[#E8D099] flex items-center justify-center text-black font-serif text-[0.6rem]">AB</div>
          </div>
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-[calc(100vh-73px)]">
        
        {/* LEFT COLUMN: Navigation & Details */}
        <div className="w-full lg:w-[280px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col px-8 py-8 bg-[#050505]">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[0.55rem] uppercase tracking-widest text-[#CBAA69]/80 hover:text-[#CBAA69] transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Vault
          </button>

          <div className="mb-12">
            <h2 className="text-[0.55rem] tracking-[0.3em] uppercase text-white/40 mb-2">Configure</h2>
            <h1 className="font-serif text-xl text-white tracking-wide leading-tight">
              Recognition<br/>Share Card
            </h1>
          </div>
          
          <p className="text-xs text-white/40 leading-relaxed font-light mt-auto">
            Share your official recognition directly to your professional network. This minimalist premium format is optimized for social platforms.
          </p>
        </div>

        {/* MIDDLE COLUMN: Canvas Preview */}
        <div className="flex-1 bg-[#0a0a0a] relative flex flex-col items-center justify-center p-4 lg:p-12 overflow-y-auto">
          
          {/* Subtle background glow behind the card */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,170,105,0.05)_0%,transparent_60%)] pointer-events-none" />

          {/* THE CARD ITSELF */}
          <div 
            id="share-card-preview"
            className="relative bg-[#050505] flex flex-col justify-center items-center text-center overflow-hidden border border-white/10 shadow-2xl transition-all duration-500"
            style={{ 
              aspectRatio: activeFormatObj.aspect, 
              width: '100%', 
              maxWidth: activeFormatObj.id === 'ig_story' ? '400px' : '800px',
              maxHeight: '100%' 
            }}
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#CBAA69]/40 to-transparent" />
            
            <img 
              src={trophySrc} 
              alt="Trophy" 
              className={cn(
                "object-contain mix-blend-screen filter drop-shadow-[0_0_30px_rgba(203,170,105,0.15)]",
                activeFormatObj.id === 'linkedin' || activeFormatObj.id === 'twitter' ? 'w-32 h-32 mb-6' : 'w-48 h-48 mb-10'
              )}
            />

            <h2 className={cn(
              "uppercase tracking-[0.4em] text-[#CBAA69] font-medium mb-3",
              activeFormatObj.id === 'linkedin' || activeFormatObj.id === 'twitter' ? 'text-[0.55rem]' : 'text-[0.7rem]'
            )}>
              {firm.division}
            </h2>
            
            <h1 className={cn(
              "font-serif text-white tracking-wide px-12 leading-tight",
              activeFormatObj.id === 'linkedin' || activeFormatObj.id === 'twitter' ? 'text-3xl mb-5' : 'text-5xl mb-8'
            )}>
              {firm.name}
            </h1>

            <div className="w-12 h-[1px] bg-[#CBAA69]/40 mb-5" />

            <p className={cn(
              "text-white/40 uppercase tracking-widest font-light",
              activeFormatObj.id === 'linkedin' || activeFormatObj.id === 'twitter' ? 'text-[0.55rem]' : 'text-xs'
            )}>
              Official Recognition • {firm.year}
            </p>
            
            {/* Bottom Footer on Card */}
            <div className="absolute bottom-6 inset-x-0 px-8 lg:px-12 flex justify-between items-end opacity-40">
              <div className="text-left">
                <p className="text-[0.4rem] tracking-[0.3em] uppercase text-white mb-1">THE JURIS STANDARD™</p>
                <p className="text-[0.35rem] tracking-[0.2em] text-white/60">A STRONGER LEGAL WORLD. ALWAYS.</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[0.35rem] tracking-[0.2em] text-white/60 mb-1">RECORD ID</p>
                <p className="text-[0.4rem] tracking-[0.2em] text-white">{firm.recognitionId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Controls & Download */}
        <div className="w-full lg:w-[320px] shrink-0 bg-[#050505] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col h-full overflow-y-auto">
          
          <div className="p-8 border-b border-white/5">
            <h3 className="text-[0.65rem] uppercase tracking-widest text-white/50 font-medium mb-6">Select Format</h3>
            <div className="flex flex-col gap-2">
              {FORMATS.map(fmt => (
                <button 
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 border rounded-sm transition-all duration-300 text-left",
                    selectedFormat === fmt.id 
                      ? "border-[#CBAA69]/40 bg-[#CBAA69]/5" 
                      : "border-white/5 hover:bg-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-sm flex items-center justify-center border transition-colors",
                    selectedFormat === fmt.id ? "bg-[#CBAA69]/10 border-[#CBAA69]/30 text-[#CBAA69]" : "bg-white/5 border-white/5 text-white/40"
                  )}>
                    <fmt.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className={cn(
                      "text-xs font-medium mb-0.5 transition-colors",
                      selectedFormat === fmt.id ? "text-white" : "text-white/60"
                    )}>{fmt.label}</div>
                    <div className="text-[0.55rem] text-white/30 tracking-widest uppercase">{fmt.resolution}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 mt-auto flex flex-col gap-3">
            <button 
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#CBAA69] to-[#E8D099] hover:from-[#e0c484] hover:to-[#f0e0b0] text-black font-bold text-[0.65rem] uppercase tracking-[0.2em] rounded-sm transition-all"
            >
              <Download className="w-4 h-4" /> Download Image
            </button>
            <button 
              className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 text-white font-medium text-[0.65rem] uppercase tracking-[0.2em] rounded-sm transition-all border border-white/5"
            >
              <LinkIcon className="w-3.5 h-3.5" /> Copy Share Link
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
