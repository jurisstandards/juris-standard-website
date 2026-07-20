import { EditorialJourney } from "@/components/submission/EditorialJourney";
import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
  title: "Enter the Index | Juris Standard",
  description: "Editorial Submission Experience for the Juris Standard Index.",
};

export default function EnterTheIndexPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden selection:bg-gold-500/30">
      <Navbar />
      {/* Absolute Dark Background with ultra subtle radial glow */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Slow moving particles container - handled within components if needed, or globally here */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-gold-400/20 blur-sm animate-[float_15s_ease-in-out_infinite]" />
        <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-gold-300/10 blur-md animate-[float_20s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-gold-500/20 blur-[1px] animate-[float_10s_ease-in-out_infinite]" />
      </div>

      {/* Main Experience Mount */}
      <div className="relative z-10 flex flex-col flex-1" style={{ minHeight: "100vh" }}>
        <EditorialJourney />
      </div>
    </main>
  );
}
