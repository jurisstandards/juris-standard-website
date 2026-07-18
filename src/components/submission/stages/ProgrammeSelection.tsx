import { useSubmissionStore } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { Briefcase, Landmark, Lightbulb, Users, Gavel, FileText, ChevronRight, ChevronLeft, Cpu } from "lucide-react";

// Mock programmes based on the selected track. In a real app, this would be more extensive.
const getProgrammesForTrack = (track: string | null) => {
  if (track === 'professional') {
    return [
      { id: 'corp_elite', title: "Corporate Elite", icon: Briefcase, desc: "Recognising corporate lawyers and in-house legal leaders advising businesses." },
      { id: 'litigation', title: "Litigation Masters", icon: Landmark, desc: "Recognising advocates distinguished in dispute resolution and civil litigation." },
      { id: 'arbitration', title: "Arbitration Leaders", icon: Users, desc: "For professionals excelling in domestic and international arbitration." }
    ];
  }
  if (track === 'firm') {
    return [
      { id: 'firm_excellence', title: "Institutional Excellence", icon: Landmark, desc: "Top law firms demonstrating exceptional practice and leadership." },
      { id: 'boutique', title: "Boutique Firm of the Year", icon: Briefcase, desc: "Recognising highly specialized boutique practices." }
    ];
  }
  if (track === 'media') {
    return [
      { id: 'legal_journalism', title: "Legal Journalism", icon: FileText, desc: "Advancing legal knowledge through exceptional publishing and commentary." }
    ];
  }
  if (track === 'innovation') {
    return [
      { id: 'ai_law', title: "Artificial Intelligence", icon: Lightbulb, desc: "Transforming legal services through AI and machine learning." },
      { id: 'legal_tech', title: "LegalTech Pioneer", icon: Cpu, desc: "Innovative platforms enhancing access to justice and practice management." }
    ];
  }
  return [];
};

export function ProgrammeSelection() {
  const { selectedTrack, setProgramme, setStage, isNavigatingBack } = useSubmissionStore();
  const programmes = getProgrammesForTrack(selectedTrack);

  const handleSelect = (progId: string) => {
    setProgramme(progId);
    setTimeout(() => {
      setStage('editorial_profile');
    }, 150); // fast transition
  };

  return (
    <div className="flex flex-col justify-center min-h-screen pt-32 pb-16 px-6 lg:px-24 relative z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        <motion.div
          initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
              Step 2 of 4
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm mb-4">
              Select Recognition Programme
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mb-2">
              Please select the specific recognition programme you wish to be considered for during this editorial cycle.
            </p>
            <p className="text-gold-400/60 text-xs italic">
              Additional programmes may be submitted separately after completion of this editorial submission.
            </p>
          </div>
          
          <button
            onClick={() => setStage('track_selection')}
            className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {programmes.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={isNavigatingBack ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: isNavigatingBack ? 0 : i * 0.05 }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-6 lg:p-8 flex items-start gap-6 cursor-pointer hover:border-t-gold-500/40 hover:border-x-gold-500/20 transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
              onClick={() => handleSelect(prog.id)}
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-gold-500/30 transition-colors duration-150 mt-1">
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                <prog.icon className="w-6 h-6 text-gold-500/70 group-hover:text-gold-400 transition-colors duration-150 relative z-10" strokeWidth={1.2} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-white group-hover:text-gold-200 transition-colors duration-150">
                    {prog.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold-400 transition-colors duration-150 transform group-hover:translate-x-1 mt-1 hidden sm:block" />
                </div>
                
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6 pr-4">
                  {prog.desc}
                </p>
                
                <div className="flex items-center space-x-3 text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-white/30 group-hover:text-gold-500/70 transition-colors duration-150 pt-5 border-t border-white/5 group-hover:border-gold-500/20">
                  <span>Select Programme</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
