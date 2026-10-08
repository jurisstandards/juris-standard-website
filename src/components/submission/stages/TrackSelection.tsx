import { useSubmissionStore, Track } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { Building2, Diamond, Gavel, Sparkles, Star, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";

const tracks = [
  {
    id: 'law_firm_excellence' as Track,
    title: "Law Firm Excellence™",
    icon: Building2,
    description: "Recognition for law firms demonstrating institutional excellence across legal practice, leadership and professional standards.",
    footer: "Firm Registration"
  },
  {
    id: 'corporate_elite' as Track,
    title: "Corporate Elite™",
    icon: Diamond,
    description: "Recognition for distinguished legal practitioners demonstrating excellence within their respective fields of practice.",
    footer: "Individual Registration"
  },
  {
    id: 'litigation_masters' as Track,
    title: "Litigation Masters™",
    icon: Gavel,
    description: "Recognition for exceptional dispute resolution and litigation experts shaping major legal outcomes.",
    footer: "Individual Registration"
  },
  {
    id: 'women_leaders' as Track,
    title: "Women Leaders™",
    icon: Sparkles,
    description: "Celebrating outstanding female practitioners breaking barriers and leading the legal profession globally.",
    footer: "Individual Registration"
  },
  {
    id: 'future_leaders' as Track,
    title: "Future Leaders™",
    icon: Star,
    description: "Recognising the most promising young legal minds and rising stars across jurisdictions.",
    footer: "Individual Registration"
  },
  {
    id: 'legal_innovation' as Track,
    title: "Legal Innovation Excellence™",
    icon: Lightbulb,
    description: "Recognition for organisations transforming legal services through innovation, artificial intelligence and technology.",
    footer: "Organisation Registration"
  }
];

export function TrackSelection() {
  const { setTrack, setStage, isNavigatingBack } = useSubmissionStore();

  const handleSelectTrack = (track: Track) => {
    setTrack(track);
    setStage('programme_selection');
  };

  return (
    <div className="flex flex-col justify-center min-h-[85vh] py-8 px-6 lg:px-12 relative z-10 w-full max-w-[1400px] mx-auto">
      <motion.div
        initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-[1px] bg-gold-500/60" />
            <span className="text-gold-500 text-[0.6rem] font-semibold uppercase tracking-[0.3em]">
              Step 1 of 4
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide font-light drop-shadow-md mb-2">
            Select Recognition Track
          </h2>
          <p className="text-neutral-400 text-xs md:text-[0.8rem] font-light leading-relaxed max-w-xl">
            Select the editorial track that most accurately reflects your professional identity or institutional classification.
          </p>
        </div>
        
        <button
          onClick={() => setStage('welcome')}
          className="group inline-flex items-center text-neutral-500 hover:text-gold-400 transition-colors text-[0.65rem] uppercase tracking-widest font-semibold pb-1"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5 w-full">
        {tracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={isNavigatingBack ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: isNavigatingBack ? 0 : i * 0.05 }}
            className="group relative rounded-xl bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/[0.06] shadow-sm p-5 xl:p-6 flex flex-col h-full cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)] overflow-hidden"
            onClick={() => handleSelectTrack(track.id)}
          >
            {/* Elegant Top Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 group-hover:via-gold-500/50 to-transparent transition-colors duration-500" />
            
            {/* Hover Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex justify-between items-start w-full mb-4 relative z-10">
              <div className="relative">
                {/* Naked Icon with Soft Glow */}
                <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <track.icon className="w-6 h-6 text-gold-500/60 group-hover:text-gold-400 transition-colors duration-500 relative z-10" strokeWidth={1.2} />
              </div>
              
              {/* Premium Circular Action Button */}
              <div className="w-7 h-7 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-500">
                <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-gold-400 transition-transform duration-500 group-hover:translate-x-0.5" />
              </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <h3 className="text-[1.05rem] xl:text-[1.1rem] font-serif text-white/90 group-hover:text-white transition-colors duration-300 mb-2 drop-shadow-sm">
                {track.title}
              </h3>
              
              <p className="text-neutral-400 text-[0.65rem] xl:text-[0.7rem] leading-relaxed mb-4 line-clamp-2 group-hover:text-neutral-300 transition-colors duration-300 flex-1 font-light">
                {track.description}
              </p>
              
              <div className="flex items-center gap-2.5 text-[0.55rem] uppercase tracking-[0.2em] font-medium text-white/30 group-hover:text-gold-400/80 transition-colors duration-500 pt-3.5 border-t border-white/[0.04] group-hover:border-gold-500/20 w-full mt-auto">
                <div className="w-1 h-1 rounded-full bg-current shadow-[0_0_5px_currentColor] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <span>{track.footer}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
