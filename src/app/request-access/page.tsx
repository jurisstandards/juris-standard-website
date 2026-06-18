import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function requestaccessPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionHeader title="Request Access" subtitle="Apply for membership, nominate for awards, or request intelligence access." />
        <div className="h-96 border border-white/5 bg-charcoal-900/50 flex items-center justify-center">
           <span className="text-white/30 uppercase tracking-[0.2em] text-sm">Content coming soon</span>
        </div>
      </div>
      <Footer />
    </main>
  );
}
