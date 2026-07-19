import React from 'react';

export function CrystalIcon({ icon: Icon, className = '' }: { icon: any, className?: string }) {
  return (
    <div 
      className={`relative w-12 h-12 flex items-center justify-center shrink-0 ${className}`}
      >
      {/* 3D Black Crystal Body with Champagne Gold Edges */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-black border border-gold-500/30 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.8)] overflow-hidden group-hover:border-gold-400/60 group-hover:shadow-[inset_0_2px_10px_rgba(212,175,55,0.1),0_10px_30px_rgba(212,175,55,0.15)] transition-all duration-700">
        
        {/* Soft internal glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl" />
        
        {/* Ambient gold glow behind icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gold-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>

      {/* The Lucide Icon */}
      <Icon className="relative z-10 w-5 h-5 text-gold-500/80 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:text-gold-300 transition-colors duration-700" strokeWidth={1.5} />
    </div>
  );
}
