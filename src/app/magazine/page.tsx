"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Printer, Share2, Link as LinkIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type MagazinePage = {
  id: string;
  page_number: number;
  heading: string;
  content: string;
};

export default function MagazineViewer() {
  const [pages, setPages] = useState<MagazinePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/magazine");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPages(data);
        } else {
          console.error("API returned non-array data:", data);
          setPages([]); // Default to empty array to prevent crashing
        }
      } catch (e) {
        console.error("Failed to load magazine pages", e);
        setPages([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Ensure pages are sorted
  const sortedPages = Array.isArray(pages) ? [...pages].sort((a, b) => a.page_number - b.page_number) : [];

  // Group pages into spreads (2 pages per spread)
  const spreads: MagazinePage[][] = [];
  for (let i = 0; i < sortedPages.length; i += 2) {
    spreads.push(sortedPages.slice(i, i + 2));
  }

  const handleNext = () => {
    if (currentPageIndex < spreads.length - 1) setCurrentPageIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) setCurrentPageIndex(prev => prev - 1);
  };

  // Convert markdown-like content to simple HTML (bolding and newlines)
  const formatContent = (text: string) => {
    if (!text) return null;
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n')
      .map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#CBAA69] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Left Sidebar Actions */}
      <aside className="w-full md:w-[320px] bg-[#050505] border-r border-white/5 flex flex-col relative z-20 shrink-0 h-auto md:h-screen overflow-y-auto">
        <div className="p-6 md:p-8 flex flex-col h-full">
          
          <Link href="/juris-index" className="flex items-center text-[0.65rem] uppercase tracking-widest text-neutral-400 hover:text-[#CBAA69] transition-colors mb-12">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            Back to Recognition Vault™
          </Link>

          <div className="mb-12">
            <h1 className="text-xl md:text-2xl font-serif text-white mb-4 tracking-wide leading-tight">
              OFFICIAL<br/>RECORD DOCUMENT
            </h1>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-[240px]">
              A formal record of recognition issued by The Juris Standard™. This document reflects the official status, scope and validation details of the recognition.
            </p>
          </div>

          <div className="space-y-2 mb-12">
            <button className="w-full flex items-center px-4 py-3 bg-[#111] border border-[#CBAA69]/30 text-[#CBAA69] text-xs uppercase tracking-widest rounded-sm hover:bg-[#CBAA69]/10 transition-colors">
              <FileText className="w-4 h-4 mr-4" /> View Document
            </button>
            <button className="w-full flex items-center px-4 py-3 border border-white/5 text-neutral-400 text-xs uppercase tracking-widest rounded-sm hover:bg-white/5 hover:text-white transition-colors">
              <Download className="w-4 h-4 mr-4" /> Download PDF
            </button>
            <button className="w-full flex items-center px-4 py-3 border border-white/5 text-neutral-400 text-xs uppercase tracking-widest rounded-sm hover:bg-white/5 hover:text-white transition-colors">
              <Printer className="w-4 h-4 mr-4" /> Print
            </button>
            <button className="w-full flex items-center px-4 py-3 border border-white/5 text-neutral-400 text-xs uppercase tracking-widest rounded-sm hover:bg-white/5 hover:text-white transition-colors">
              <Share2 className="w-4 h-4 mr-4" /> Share
            </button>
            <button className="w-full flex items-center px-4 py-3 border border-white/5 text-neutral-400 text-xs uppercase tracking-widest rounded-sm hover:bg-white/5 hover:text-white transition-colors">
              <LinkIcon className="w-4 h-4 mr-4" /> Copy Link
            </button>
          </div>

          <div className="mt-auto">
            <p className="text-[0.65rem] text-neutral-500 uppercase tracking-widest mb-1">Format</p>
            <p className="text-xs text-neutral-300">PDF (A4) | {sortedPages.length} Pages</p>
          </div>
        </div>
      </aside>

      {/* Main Document Viewer */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden bg-[url('/textures/noise.png')] bg-repeat opacity-100">
        
        {/* Navigation Controls */}
        <div className="absolute top-6 right-6 md:top-8 md:right-12 z-30 flex items-center gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 border border-white/20 text-xs uppercase tracking-widest text-white disabled:opacity-30 hover:bg-white/10 transition-colors rounded-sm backdrop-blur-sm"
          >
            Previous
          </button>
          <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
            Spread {currentPageIndex + 1} of {spreads.length || 1}
          </span>
          <button 
            onClick={handleNext}
            disabled={currentPageIndex >= spreads.length - 1}
            className="px-4 py-2 border border-white/20 text-xs uppercase tracking-widest text-white disabled:opacity-30 hover:bg-white/10 transition-colors rounded-sm backdrop-blur-sm"
          >
            Next
          </button>
        </div>

        {/* Spread Container */}
        <div className="relative w-full max-w-[1100px] aspect-[1.414/1] flex shadow-2xl">
          <AnimatePresence mode="wait">
            {spreads.length > 0 ? (
              <motion.div
                key={currentPageIndex}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full flex"
              >
                {spreads[currentPageIndex]?.map((page, idx) => (
                  <div 
                    key={page.id} 
                    className={cn(
                      "w-1/2 h-full bg-[#f2ecdf] text-[#1a1a1a] p-8 md:p-16 relative overflow-hidden flex flex-col",
                      idx === 0 ? "border-r border-black/10" : ""
                    )}
                    style={{
                      boxShadow: idx === 0 
                        ? "inset -15px 0 30px -15px rgba(0,0,0,0.15)" // Binding shadow right
                        : "inset 15px 0 30px -15px rgba(0,0,0,0.15)", // Binding shadow left
                      backgroundImage: "url('/textures/paper-grain.png')",
                      backgroundBlendMode: "multiply",
                    }}
                  >
                    {/* Top Header */}
                    <div className="flex justify-between items-start mb-16 border-b border-black/10 pb-6">
                      <div className="flex flex-col">
                        <h3 className="text-[0.65rem] font-medium tracking-[0.2em] text-[#1a1a1a] mb-1">
                          THE JURIS STANDARD™
                        </h3>
                        <p className="text-[0.45rem] tracking-[0.3em] text-[#555] uppercase">
                          PEOPLE | FIRMS | IDEAS | IMPACT
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.45rem] tracking-[0.2em] text-[#555] uppercase mb-1">RECORD ID</p>
                        <p className="text-[0.6rem] font-medium tracking-widest text-[#1a1a1a]">JS-MAG-2026</p>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-serif text-[#111] mb-6 tracking-wide leading-snug">
                        {page.heading}
                      </h2>
                      <div className="text-[0.7rem] md:text-[0.8rem] text-[#333] leading-[1.8] font-serif space-y-4">
                        {formatContent(page.content)}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 flex justify-between items-end border-t border-black/10 pt-6">
                      <p className="text-[0.45rem] tracking-[0.2em] text-[#555] uppercase">
                        A STRONGER LEGAL WORLD. ALWAYS.
                      </p>
                      <p className="text-[0.55rem] tracking-widest text-[#555]">
                        PAGE {page.page_number}
                      </p>
                    </div>
                  </div>
                ))}

                {/* If spread has only 1 page (odd total pages), add a blank page to complete the spread */}
                {spreads[currentPageIndex]?.length === 1 && (
                  <div 
                    className="w-1/2 h-full bg-[#f2ecdf] relative"
                    style={{
                      boxShadow: "inset 15px 0 30px -15px rgba(0,0,0,0.15)"
                    }}
                  />
                )}
              </motion.div>
            ) : (
              <div className="w-full h-full bg-[#f2ecdf] flex items-center justify-center text-[#1a1a1a]">
                <p className="font-serif">No pages found in this document.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
