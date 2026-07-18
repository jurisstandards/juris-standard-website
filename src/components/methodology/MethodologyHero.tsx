import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function MethodologyHero() {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-8 md:px-16 lg:px-24 xl:px-32 z-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-[60%] mb-16 md:mb-0 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex items-center space-x-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-gold-500 to-transparent shadow-[0_0_20px_rgba(212,175,55,1)]" />
            <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70 font-medium">
              Editorial Principles • Recognition Framework • Institutional Standards
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tighter mb-6 leading-[1.1]"
          >
            Editorial<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-600 drop-shadow-sm">
              Methodology™
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl border-l border-gold-500/30 pl-6"
          >
            The Juris Standard Index is founded upon a structured editorial methodology designed to recognise professional excellence through independent research, consistent standards and institutional integrity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button
              onClick={() => {
                document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden hover:bg-gold-100 transition-colors duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center">
                Explore the Framework
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <Link
              href="/enter-the-index"
              className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 hover:border-gold-500/50 transition-all duration-500"
            >
              Enter the Index
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Massive Animated Seal */}
        <div className="w-full md:w-[40%] flex justify-center md:justify-end relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center"
          >
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border border-gold-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
            {/* Inner dashed ring */}
            <div className="absolute inset-4 border border-dashed border-gold-400/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            {/* Core glow */}
            <div className="absolute inset-0 bg-gold-500/5 blur-[80px] rounded-full" />
            
            {/* Floating particles */}
            <div className="absolute top-[20%] left-[20%] w-1.5 h-1.5 rounded-full bg-gold-300 animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute bottom-[25%] right-[20%] w-1 h-1 rounded-full bg-white/50 animate-[ping_4s_ease-in-out_infinite_reverse]" />
            
            <div className="z-10 text-center flex flex-col items-center justify-center bg-black/40 w-48 h-48 rounded-full border border-white/5 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(212,175,55,0.05)]">
              <span className="font-serif text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-gold-200 to-gold-600 block mb-2 drop-shadow-md">JS</span>
              <span className="text-[0.45rem] lg:text-[0.5rem] uppercase tracking-[0.4em] text-white/50">Institutional Seal</span>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
