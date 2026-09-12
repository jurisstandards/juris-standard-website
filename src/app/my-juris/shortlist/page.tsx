"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bookmark, ArrowRight, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ShortlistItem {
  id: string;
  record_id: string;
  record_name: string;
  record_div: string;
  record_year: string;
  saved_at: string;
}

export default function MyShortlistPage() {
  const [items, setItems] = useState<ShortlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const load = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const res = await fetch("/api/my-juris/shortlist", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleRemove = async (record_id: string) => {
    setRemoving(record_id);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    await fetch(`/api/my-juris/shortlist?record_id=${record_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    setItems((prev) => prev.filter((i) => i.record_id !== record_id));
    setRemoving(null);
  };

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return "Just now";
  };

  return (
    <div className="p-10 flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1a1601]/40 pb-6 shrink-0">
        <div className="flex items-center gap-5">
          <Bookmark className="w-6 h-6 text-[#CBAA69]/50" strokeWidth={1.5} />
          <div>
            <h1 className="text-2xl font-serif text-white font-light tracking-wide">My Shortlist</h1>
            <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 mt-1 font-medium">
              YOUR SAVED RECORDS · {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 py-10 text-white/30 text-sm">
          <div className="w-1.5 h-5 bg-[#CBAA69]/40 animate-pulse rounded-full" />
          Loading your shortlist...
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
          <div className="w-16 h-16 rounded-full border border-[#CBAA69]/20 bg-[#CBAA69]/[0.02] flex items-center justify-center shadow-[inset_0_0_20px_rgba(203,170,105,0.05)]">
            <Bookmark className="w-7 h-7 text-[#CBAA69]/40" strokeWidth={1} />
          </div>
          <div>
            <p className="text-base text-white/60 font-light mb-2">Your shortlist is empty.</p>
            <p className="text-xs text-white/30 tracking-wide max-w-sm mx-auto leading-relaxed">
              Use the &ldquo;Save to My Juris™&rdquo; button on any firm page to add it here.
            </p>
          </div>
          <Link
            href="/juris-index/law-firms"
            className="flex items-center gap-3 px-6 py-3 border border-[#CBAA69]/30 text-[#CBAA69] text-[0.65rem] font-semibold uppercase tracking-[0.2em] hover:bg-[#CBAA69]/10 transition-all rounded-sm mt-2"
          >
            Browse Law Firm Excellence™ <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 px-8 py-6 border border-[#CBAA69]/15 bg-[#0a0805] hover:border-[#CBAA69]/40 hover:bg-[#0c0a06] transition-all duration-300 rounded-[2px] group"
            >
              <div className="w-10 h-10 rounded-full border border-[#CBAA69]/20 bg-transparent flex items-center justify-center shrink-0">
                <Bookmark className="w-4 h-4 text-[#CBAA69]/80" strokeWidth={1.2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-white/90 font-medium tracking-wide truncate">{item.record_name || item.record_id}</p>
                <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/70 mt-1 font-medium">
                  {item.record_div} {item.record_year ? <><span className="text-white/20 mx-2">|</span>{item.record_year}</> : ""}
                </p>
              </div>
              <span className="text-[0.65rem] text-white/40 shrink-0 mx-4 font-light">{timeAgo(item.saved_at)}</span>
              <Link
                href={`/juris-index/law-firms/${item.record_id}`}
                className="p-2.5 text-[#CBAA69]/50 hover:text-white hover:bg-white/[0.02] rounded-full transition-all shrink-0"
                title="View record"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <button
                onClick={() => handleRemove(item.record_id)}
                disabled={removing === item.record_id}
                className="p-2.5 text-red-400/40 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all shrink-0 disabled:opacity-40"
                title="Remove from shortlist"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
