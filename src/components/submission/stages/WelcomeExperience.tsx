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
          <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-8">
            <span>Estimated Time: 5–7 Minutes</span>
            <span className="w-1 h-1 rounded-full bg-gold-500/40 hidden md:block" />
            <span>Auto Saved</span>
            <span className="w-1 h-1 rounded-full bg-gold-500/40 hidden md:block" />
            <span>Private & Confidential</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-wide mb-6 font-light drop-shadow-sm leading-[1.1]">
            Welcome to the <br />
            <span className="text-gold-400">
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
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border border-white/10 text-white/70 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-[1px] overflow-hidden transition-all duration-150 hover:border-white/30 hover:text-white"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              <span className="relative z-10 flex items-center drop-shadow-sm transition-colors">
                <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </span>
            </a>

            <button
              onClick={() => setStage('track_selection')}
              className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent border border-gold-500/30 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-[1px] overflow-hidden transition-all duration-150 hover:border-gold-400"
            >
              <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors duration-150" />
              <span className="relative z-10 flex items-center drop-shadow-sm group-hover:text-gold-100 transition-colors">
                Continue Journey
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
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
              className="relative bg-[#0a0a0a] border border-white/5 rounded-[1px] p-6 flex items-start space-x-6"
            >
              <div className="w-12 h-12 flex-shrink-0 rounded-[1px] bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 flex items-center justify-center relative overflow-hidden">
                <card.icon className="w-5 h-5 text-gold-500/70 relative z-10" strokeWidth={1.2} />
              </div>
              
              <div>
                <h3 className="text-base font-serif text-white mb-1.5">
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
