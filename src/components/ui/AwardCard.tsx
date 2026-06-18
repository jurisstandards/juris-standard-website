import { cn } from "@/lib/utils";
import Image from "next/image";

interface AwardCardProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export function AwardCard({ title, imageUrl, className }: AwardCardProps) {
  return (
    <div className={cn("group flex flex-col items-center justify-between p-6 rounded-sm bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)] hover:border-t-gold-500/40 hover:border-x-gold-500/20 transition-all duration-700 cursor-pointer h-[280px] relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* 3D Trophy Image */}
      <div className="w-full h-36 mt-4 relative z-10 flex items-center justify-center group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-700">
         <div className="absolute w-24 h-24 bg-gold-400 rounded-full blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
         <Image src={imageUrl} alt={title} fill className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]" />
      </div>

      <h4 className="font-serif text-[0.7rem] lg:text-[0.65rem] xl:text-[0.75rem] text-center text-white/80 uppercase tracking-[0.15em] leading-relaxed relative z-10 group-hover:text-gold-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 max-w-[150px] mb-2 mt-4">
         {title}
      </h4>
    </div>
  );
}
