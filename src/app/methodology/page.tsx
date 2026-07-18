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
      
      <Footer />
    </main>
  );
}
