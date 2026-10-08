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
    <div className="flex flex-col justify-center min-h-[90vh] py-10 px-6 lg:px-12 relative z-10 w-full max-w-[1400px] mx-auto">
      <motion.div
        initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
      >
        <div>
          <span className="text-gold-500 text-[0.6rem] font-bold uppercase tracking-[0.3em] block mb-2">
            Step 1 of 4
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white/95 uppercase tracking-wide font-light drop-shadow-sm mb-2">
            Select Recognition Track
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-xl">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
        {tracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={isNavigatingBack ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: isNavigatingBack ? 0 : i * 0.05 }}
            className="group relative rounded-xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/5 hover:border-gold-500/40 hover:bg-[#0f0f0f] shadow-sm p-4 lg:p-5 flex flex-col h-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]"
            onClick={() => handleSelectTrack(track.id)}
          >
            <div className="flex justify-between items-start w-full mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex-shrink-0 rounded-md bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300">
                  <track.icon className="w-4 h-4 text-gold-500/60 group-hover:text-gold-400 transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-[0.95rem] font-serif text-white/90 group-hover:text-gold-300 transition-colors duration-300 drop-shadow-sm leading-tight">
                  {track.title}
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-gold-400 transition-all duration-300 transform group-hover:translate-x-1 mt-2.5 flex-shrink-0" />
            </div>

            <p className="text-neutral-500 text-[11px] font-light leading-relaxed mb-4 flex-1 line-clamp-2 group-hover:text-neutral-400 transition-colors">
              {track.description}
            </p>
            
            <div className="flex items-center space-x-2 text-[0.55rem] uppercase tracking-[0.2em] font-semibold text-white/20 group-hover:text-gold-500/60 transition-colors duration-300 pt-3 border-t border-white/5 group-hover:border-gold-500/20 w-full mt-auto">
              <span className="w-1 h-1 flex-shrink-0 rounded-full bg-current" />
              <span className="truncate">{track.footer}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
