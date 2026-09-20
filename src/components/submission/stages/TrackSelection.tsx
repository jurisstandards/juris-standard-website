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
    <div className="flex flex-col justify-center min-h-screen pt-32 pb-16 px-6 lg:px-12 relative z-10 w-full">
      <div className="w-full flex flex-col max-w-[1600px] mx-auto">
        <motion.div
          initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
              Step 1 of 4
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm mb-4">
              Select Recognition Track
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
              Please select the editorial track that most accurately reflects your professional identity or institutional classification.
            </p>
          </div>
          
          <button
            onClick={() => setStage('welcome')}
            className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={isNavigatingBack ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: isNavigatingBack ? 0 : i * 0.05 }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#161616] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-6 lg:p-8 flex flex-col h-full cursor-pointer hover:border-t-gold-500/40 hover:border-x-gold-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
              onClick={() => handleSelectTrack(track.id)}
            >
              <div className="flex justify-between items-start w-full mb-6">
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-gold-500/30 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <track.icon className="w-6 h-6 text-gold-500/70 group-hover:text-gold-400 transition-colors duration-300 relative z-10" strokeWidth={1.2} />
                </div>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold-400 transition-all duration-300 transform group-hover:translate-x-1" />
              </div>

              <div className="flex flex-col flex-1 w-full">
                <h3 className="text-xl font-serif text-white group-hover:text-gold-100 transition-colors duration-300 mb-3 drop-shadow-sm">
                  {track.title}
                </h3>
                
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 flex-1">
                  {track.description}
                </p>
                
                <div className="flex items-center space-x-3 text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-white/30 group-hover:text-gold-500/70 transition-colors duration-300 pt-5 border-t border-white/5 group-hover:border-gold-500/20 w-full mt-auto">
                  <span className="w-1 h-1 flex-shrink-0 rounded-full bg-current" />
                  <span className="truncate">{track.footer}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
