"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ViewedItem {
  id: string;
  record_id: string;
  record_name: string;
  record_div: string;
  record_year: string;
  viewed_at: string;
}

export default function RecentlyViewedPage() {
  const [items, setItems] = useState<ViewedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const res = await fetch("/api/my-juris/recently-viewed", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) setItems(await res.json());
      setLoading(false);
    };
    load();
  }, []);

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d} day${d > 1 ? "s" : ""} ago`;
    if (h > 0) return `${h} hour${h > 1 ? "s" : ""} ago`;
    if (m > 0) return `${m} min ago`;
    return "Just now";
  };

  return (
    <div className="p-10 flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1a1601]/40 pb-6 shrink-0">
        <div className="flex items-center gap-5">
          <Clock className="w-6 h-6 text-[#CBAA69]/50" strokeWidth={1.5} />
          <div>
            <h1 className="text-2xl font-serif text-white font-light tracking-wide">Recently Viewed</h1>
            <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 mt-1 font-medium">
              YOUR BROWSING HISTORY · LAST 20 UNIQUE RECORDS
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 py-10 text-white/30 text-sm">
          <div className="w-1.5 h-5 bg-[#CBAA69]/40 animate-pulse rounded-full" />
          Loading history...
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
          <div className="w-16 h-16 rounded-full border border-[#CBAA69]/20 bg-[#CBAA69]/[0.02] flex items-center justify-center shadow-[inset_0_0_20px_rgba(203,170,105,0.05)]">
            <Clock className="w-7 h-7 text-[#CBAA69]/40" strokeWidth={1} />
          </div>
          <div>
            <p className="text-base text-white/60 font-light mb-2">No browsing history yet.</p>
            <p className="text-xs text-white/30 tracking-wide max-w-sm mx-auto leading-relaxed">
              Records you view will appear here automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-6 px-8 py-6 border border-[#CBAA69]/15 bg-[#0a0805] hover:border-[#CBAA69]/40 hover:bg-[#0c0a06] transition-all duration-300 rounded-[2px] group"
            >
              <span className="text-xs text-[#CBAA69]/30 w-6 shrink-0 text-right font-mono tracking-widest font-normal">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0 ml-4">
                <p className="text-base text-white/90 font-medium tracking-wide truncate">{item.record_name || item.record_id}</p>
                <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/70 mt-1 font-medium">
                  {item.record_div} {item.record_year ? <><span className="text-white/20 mx-2">|</span>{item.record_year}</> : ""}
                </p>
              </div>
              <span className="flex items-center gap-2 text-[0.65rem] text-white/40 shrink-0 mx-4 font-light">
                <Clock className="w-3 h-3 opacity-60" />
                {timeAgo(item.viewed_at)}
              </span>
              <Link
                href={`/juris-index/law-firms/${item.record_id}`}
                className="p-2.5 text-[#CBAA69]/50 hover:text-white hover:bg-white/[0.02] rounded-full transition-all shrink-0"
                title="View again"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
