"use client";

import { ArrowUpRight, ArrowDownRight, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

const TICKER_ITEMS = [
  { label: "M&A Advisory Index", value: "+2.4%", up: true },
  { label: "Cross-Border Deals (APAC)", value: "+1.1%", up: true },
  { label: "Litigation Costs", value: "-0.8%", up: false },
  { label: "Global Law Firm Revenue", value: "+4.2%", up: true },
  { label: "AI Adoption in Legal", value: "+12.5%", up: true },
  { label: "Corporate Restructuring", value: "+3.7%", up: true },
  { label: "Regulatory Compliance", value: "-1.2%", up: false },
  { label: "Private Equity Exits", value: "+5.1%", up: true },
];

export function LiveTicker() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[38px] bg-[#020202]/95 backdrop-blur-md border-t border-white/[0.08] overflow-hidden flex items-center z-[100] shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
      {/* Edge Gradients for smooth fade in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      
      {/* Ticker Container - Must be wide enough to loop seamlessly */}
      <div className="flex animate-ticker whitespace-nowrap w-max hover:[animation-play-state:paused] cursor-default">
        {/* Render the list twice to create a seamless infinite loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <div key={i} className="flex items-center mx-10 group">
            <Diamond className="w-2.5 h-2.5 text-gold-500/30 mr-5 group-hover:text-gold-400 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-300" />
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/70 font-semibold mr-4 group-hover:text-white transition-colors duration-300">
              {item.label}
            </span>
            <span className={cn(
              "flex items-center text-[0.7rem] font-bold tracking-wider",
              item.up ? "text-emerald-400 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "text-rose-500 group-hover:text-rose-400 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]",
              "transition-all duration-300"
            )}>
              {item.up ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
