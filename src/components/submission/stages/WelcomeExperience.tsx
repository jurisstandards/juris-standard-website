import { useSubmissionStore } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { Scale, Milestone, BookOpen, ChevronRight } from "lucide-react";

export function WelcomeExperience() {
  const { setStage, isNavigatingBack } = useSubmissionStore();

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-16 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 justify-center">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* Left Side: Content & CTA */}
        <motion.div
          initial={isNavigatingBack ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-left"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.55rem] md:text-[0.60rem] uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-8">
            <span>Estimated Time: 5–7 Minutes</span>
            <span className="w-1 h-1 rounded-full bg-gold-500/40 hidden md:block" />
            <span>Auto Saved</span>
            <span className="w-1 h-1 rounded-full bg-gold-500/40 hidden md:block" />
            <span>Private & Confidential</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-wide mb-6 font-light drop-shadow-sm leading-[1.15]">
            <span className="text-white">Welcome to the</span> <br />
            <span className="text-gold-400 drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)] block mt-1">
              Juris Standard Index
            </span>
          </h2>
          
          <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed mb-12 max-w-xl">
            The Juris Standard Index is an editorial institution dedicated to recognising excellence across the legal profession. This experience has been carefully designed to understand your professional journey through a structured editorial process.
          </p>

          <motion.div
            initial={isNavigatingBack ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: isNavigatingBack ? 0 : 0.2 }}
            className="flex items-center space-x-4"
          >
            <a
              href="/"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-white/10 text-white/70 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-colors duration-200 hover:border-white/30 hover:text-white"
            >
              <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </a>

            <button
              onClick={() => setStage('track_selection')}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-gold-500/30 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-colors duration-200 hover:border-gold-400 hover:bg-gold-500/5"
            >
              Continue Journey
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Process Cards */}
        <div className="flex flex-col gap-4">
          {[
            {
              title: "Editorial Independence",
              icon: Scale,
              desc: "Every submission is independently assessed against published editorial standards."
            },
            {
              title: "Recognition Journey",
              icon: Milestone,
              desc: "Your submission progresses through structured editorial stages before any recognition decision."
            },
            {
              title: "Institutional Record",
              icon: BookOpen,
              desc: "Recognised professionals become part of the permanent Juris Standard institutional record."
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
              className="group relative bg-gradient-to-b from-[#161616] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.02] border-b border-b-black rounded-xl p-6 lg:p-8 flex items-start space-x-6 hover:border-t-gold-500/30 transition-colors duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0 rounded-lg bg-gradient-to-b from-[#222] to-[#0f0f0f] border border-white/5 flex items-center justify-center group-hover:border-gold-500/30 transition-colors duration-300 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                <card.icon className="w-5 h-5 lg:w-6 lg:h-6 text-gold-400/80 group-hover:text-gold-400 relative z-10 transition-colors duration-300" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-serif text-white mb-1.5 group-hover:text-gold-100 transition-colors duration-300 drop-shadow-sm">
                  {card.title}
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
