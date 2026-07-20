import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MethodologyHero() {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-10 pb-20 px-8 md:px-16 lg:px-24 xl:px-32 z-10 overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="w-full relative z-20">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-gold-500 to-transparent shadow-[0_0_20px_rgba(212,175,55,1)]" />
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/70 font-medium whitespace-normal md:whitespace-nowrap">
              Editorial Principles • Recognition Framework • Institutional Standards
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[6rem] font-serif text-white tracking-tighter mb-6 leading-[1.1] drop-shadow-lg">
            Editorial<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold-200 via-gold-400 to-gold-700 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Methodology
            </span>
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl border-l-2 border-gold-500/50 pl-6 shadow-[inset_1px_0_0_0_rgba(212,175,55,0.2)]">
            The <span className="text-white font-normal">Juris Standard Index</span> is founded upon a structured editorial methodology designed to recognise professional excellence through independent research, consistent standards, and institutional integrity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => {
                document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gold-500/40 text-gold-300 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-[1px] overflow-hidden transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-200 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
            >
              <span className="relative z-10 flex items-center">
                Explore the Framework
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <Link
              href="/enter-the-index"
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-[1px] transition-all duration-300 hover:bg-white/5 hover:border-white/40"
            >
              Enter the Index
            </Link>
          </div>
        </div>

        {/* Right Side: Massive Animated Seal */}
        <div className="w-full flex justify-center lg:justify-end relative z-10">
          <div className="relative flex items-center justify-center w-full max-w-3xl">
            <div className="z-10 flex items-center justify-center w-full aspect-square relative group">
              <div className="absolute inset-0 bg-gold-500/10 blur-[80px] rounded-full mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
              <Image 
                src="/images/premium_seal_transparent.png" 
                alt="Institutional Seal 3D" 
                width={900} 
                height={900} 
                className="w-full h-full object-contain relative z-20 drop-shadow-[0_0_50px_rgba(212,175,55,0.15)] group-hover:scale-[1.05] transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
