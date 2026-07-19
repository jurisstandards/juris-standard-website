import { Scale, Award, Shield, BookOpen } from "lucide-react";
import { CrystalIcon } from "./CrystalIcon";

const principles = [
  {
    title: "Independence",
    icon: Scale,
    content: "Editorial decisions are made independently and remain free from commercial influence, advertising relationships, sponsorships or external pressure. Every submission is assessed according to the same published editorial framework."
  },
  {
    title: "Merit",
    icon: Award,
    content: "Recognition reflects demonstrated professional achievement, legal expertise, leadership, innovation and meaningful contribution to the legal profession. No single factor determines recognition."
  },
  {
    title: "Integrity",
    icon: Shield,
    content: "Every editorial decision is approached with consistency, fairness and institutional responsibility. Information is reviewed objectively using established editorial standards."
  },
  {
    title: "Transparency",
    icon: BookOpen,
    content: "Juris Standard publishes its editorial principles, methodology and recognition framework to encourage transparency and confidence in its editorial process."
  }
];

export function EditorialPrinciples() {
  return (
    <section id="principles" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">2</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 2</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Editorial Principles</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {principles.map((principle, i) => (
            <div
              key={i}
              className="group relative bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-400/50 transition-all duration-700" />
              
              <div className="flex flex-row items-center space-x-4 mb-4">
                <CrystalIcon icon={principle.icon} className="w-10 h-10 flex-shrink-0" />
                <h3 className="text-xl md:text-2xl font-serif font-light text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold-200 transition-all duration-500 drop-shadow-sm">
                {principle.title}
              </h3>
              </div>
              
              <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed group-hover:text-white/70 transition-colors duration-700">
                {principle.content}
              </p>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
