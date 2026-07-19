import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MethodologyJourney } from "@/components/methodology/MethodologyJourney";

export const metadata = {
  title: "Methodology | Juris Standard Index",
  description: "The Juris Standard Index is founded upon a structured editorial methodology designed to recognise professional excellence through independent research, consistent standards and institutional integrity.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-gold-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background Elements (Ultra Matte Obsidian Black with Gold Particles) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base matte finish */}
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Subtle moving light beams (CSS animated gradients) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold-500/5 blur-[120px] rounded-full animate-[spin_30s_linear_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-600/5 blur-[150px] rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Static noise texture for ultra-matte feel */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <Navbar />
      
      <div className="flex-grow w-full relative z-10">
        <MethodologyJourney />
      </div>
      
      
      {/* Newsletter Section */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden z-10 w-full">
         <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-black pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(197,160,89,0.1)_0%,_transparent_60%)] pointer-events-none" />
         
         <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col lg:flex-row items-center justify-between">
           <div className="max-w-2xl mb-12 lg:mb-0 text-center lg:text-left">
             <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-wide mb-4 drop-shadow-sm font-light">
               Stay Ahead.<br />Stay Influential.
             </h2>
             <p className="text-neutral-400 font-light text-base max-w-md mx-auto lg:mx-0">
               Subscribe to our exclusive intelligence updates and gain the competitive edge.
             </p>
           </div>
           
           <div className="w-full lg:w-auto flex-1 max-w-lg flex flex-col sm:flex-row gap-0 rounded-[1px] bg-transparent border border-white/10 overflow-hidden transition-all duration-200 hover:border-gold-500/30 focus-within:border-gold-500/50">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 bg-transparent border-none px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all"
               suppressHydrationWarning
             />
             <button 
               className="bg-gold-500/10 text-gold-300 font-normal text-[13px] px-8 py-3 hover:bg-gold-500/20 hover:text-gold-200 transition-colors border-l border-white/10"
               suppressHydrationWarning
             >
               Subscribe
             </button>
           </div>
         </div>
      </section>
      
      <Footer />

    </main>
  );
}
