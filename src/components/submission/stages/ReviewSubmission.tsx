import { useSubmissionStore } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { Folder, CheckCircle, ChevronDown, Edit2, ShieldCheck, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

export function ReviewSubmission() {
  const { profileData, selectedTrack, selectedProgramme, setStage, updateProfileData, isNavigatingBack } = useSubmissionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const handleSubmit = () => {
    if (!declarationAccepted) return;
    setIsSubmitting(true);
    // Mock API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setStage('confirmation');
    }, 2000);
  };

  const getTrackName = () => {
    switch(selectedTrack) {
      case 'professional': return "Legal Professional";
      case 'firm': return "Law Firm";
      case 'media': return "Legal Media";
      case 'innovation': return "Legal Innovation";
      default: return "Not Selected";
    }
  };

  const folders = [
    {
      title: "Recognition Track & Programme",
      icon: Folder,
      content: (
        <div className="space-y-4">
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Track</span>
            <span className="text-white text-sm">{getTrackName()}</span>
          </div>
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Programme</span>
            <span className="text-white text-sm capitalize">{selectedProgramme?.replace('_', ' ')}</span>
          </div>
        </div>
      )
    },
    {
      title: "Professional Identity",
      icon: Folder,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Name</span>
            <span className="text-white text-sm">{profileData.identity.fullName || "—"}</span>
          </div>
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Organisation</span>
            <span className="text-white text-sm">{profileData.identity.organization || "—"}</span>
          </div>
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Designation</span>
            <span className="text-white text-sm">{profileData.identity.designation || "—"}</span>
          </div>
        </div>
      )
    },
    {
      title: "Professional Practice",
      icon: Folder,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Primary Area</span>
            <span className="text-white text-sm">{profileData.practice.primaryPractice || "—"}</span>
          </div>
          <div>
            <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Years</span>
            <span className="text-white text-sm">{profileData.practice.yearsOfPractice || "—"}</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 relative z-10 flex flex-col items-center max-w-5xl mx-auto w-full">
      <motion.div
        initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col md:flex-row md:items-end justify-between w-full mb-12 gap-6"
      >
        <div className="text-left">
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
            Step 4 of 4
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm mb-4">
            Review Submission
          </h2>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mb-2">
            Before submitting, please review your editorial profile. You may edit any section if required.
          </p>
        </div>
        
        <button
          onClick={() => setStage('editorial_profile')}
          className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1 whitespace-nowrap"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </motion.div>

      <div className="w-full space-y-6 mb-12">
        {folders.map((folder, i) => (
          <motion.div 
            key={i}
            initial={isNavigatingBack ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isNavigatingBack ? 0 : i * 0.1 }}
            className="bg-[#111]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:border-gold-500/30 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                  <folder.icon className="w-4 h-4 text-gold-400" />
                </div>
                <h3 className="text-sm font-serif text-white">{folder.title}</h3>
              </div>
              <button 
                onClick={() => setStage('editorial_profile')}
                className="text-[0.65rem] uppercase tracking-widest text-white/30 hover:text-white flex items-center space-x-2 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
            <div className="pl-11">
              {folder.content}
            </div>
          </motion.div>
        ))}

        {/* Declaration Folder */}
        <motion.div 
          initial={isNavigatingBack ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: isNavigatingBack ? 0 : 0.4 }}
          className={`backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 cursor-pointer ${declarationAccepted ? 'bg-gold-500/10 border-gold-500/40' : 'bg-[#111]/60 border-white/10 hover:border-gold-500/30'}`}
          onClick={() => setDeclarationAccepted(!declarationAccepted)}
        >
          <div className="flex items-start space-x-4">
            <div className={`mt-1 w-5 h-5 rounded flex items-center justify-center border transition-colors ${declarationAccepted ? 'bg-gold-500 border-gold-400' : 'bg-black border-white/20'}`}>
              {declarationAccepted && <CheckCircle className="w-3 h-3 text-black" />}
            </div>
            <div>
              <h3 className="text-sm font-serif text-white mb-2">Editorial Declaration</h3>
              <p className="text-[0.75rem] text-white/50 leading-relaxed max-w-2xl">
                I declare that the information provided is accurate and verifiable. I understand that submission does not guarantee recognition, and that all decisions made by the Juris Standard Editorial Office are final and independently assessed.
              </p>
              {declarationAccepted && (
                <p className="text-[0.6rem] text-gold-400 mt-2 uppercase tracking-widest font-semibold">
                  Accepted • {new Date().toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full flex justify-between items-center pt-8 border-t border-white/10">
        <button 
          onClick={() => setStage('editorial_profile')}
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Previous Section
        </button>
        
        <button 
          onClick={handleSubmit}
          disabled={!declarationAccepted || isSubmitting}
          className={`group relative inline-flex items-center justify-center px-10 py-4 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${declarationAccepted && !isSubmitting ? 'bg-gradient-to-r from-gold-600 to-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer' : 'bg-white/20 text-white/40 cursor-not-allowed'}`}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <span className="flex items-center">
              Submit Editorial Profile
              <ShieldCheck className="w-4 h-4 ml-2" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
