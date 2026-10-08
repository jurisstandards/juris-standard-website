'use client';

import { useSubmissionStore } from "@/lib/submissionStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WelcomeExperience } from "./stages/WelcomeExperience";
import { TrackSelection } from "./stages/TrackSelection";
import { ProgrammeSelection } from "./stages/ProgrammeSelection";
import { EditorialProfile } from "./stages/EditorialProfile";
import { ReviewSubmission } from "./stages/ReviewSubmission";
import { ConfirmationScreen } from "./stages/ConfirmationScreen";
import { SidebarStepper } from "./SidebarStepper";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export function EditorialJourney() {
  const { currentStage, reset } = useSubmissionStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth status on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
      setAuthChecked(true);
    });

    // Listen for auth changes (e.g., user logs in in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // If they come back and were previously on the confirmation screen, start fresh
    // Read the currentStage ONCE on mount so it doesn't trigger when transitioning to confirmation.
    if (isLoggedIn && useSubmissionStore.getState().currentStage === 'confirmation') {
      useSubmissionStore.persist.clearStorage();
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const showSidebar = currentStage !== 'welcome' && currentStage !== 'confirmation';

  // Loading state while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Auth Gate — shown to non-logged-in users
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_65%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-[2px] h-8 bg-gradient-to-b from-gold-400 to-gold-600" />
            <div>
              <p className="text-[0.5rem] uppercase tracking-[0.4em] text-gold-500/70 font-semibold">The Juris Standard</p>
              <h1 className="text-sm font-semibold tracking-wider text-white">Enter the Index</h1>
            </div>
          </div>

          {/* Gate Card */}
          <div className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/8 rounded-sm p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Gold top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

            {/* Icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-14 h-14 rounded-full bg-gold-500/8 border border-gold-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <Lock className="w-6 h-6 text-gold-400/80" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl text-white text-center mb-3 tracking-wide">
              Login Required
            </h2>
            <p className="text-white/40 text-sm text-center font-light leading-relaxed mb-10 max-w-xs mx-auto">
              You must be logged in to submit an application to The Juris Standard Index.
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500/50" strokeWidth={1.5} />
              <span className="text-[0.5rem] uppercase tracking-[0.25em] text-white/30 font-medium">
                Verified · Secure · Confidential
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/login?redirect=/enter-the-index`}
              className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-[#050505] text-[0.65rem] font-bold uppercase tracking-[0.25em] hover:from-gold-500 hover:to-gold-300 transition-all duration-300 rounded-[2px] shadow-[0_4px_20px_rgba(212,175,55,0.2)]"
            >
              Login to Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-4 text-center">
              <span className="text-white/25 text-[0.55rem] uppercase tracking-widest">Don't have an account? </span>
              <Link href="/login" className="text-gold-500/60 text-[0.55rem] uppercase tracking-widest hover:text-gold-400 transition-colors">
                Register
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col relative">
      {/* Sidebar Stepper - Left Column (Hidden on Welcome/Confirmation) */}
      <SidebarStepper />

      {/* Main Content Area - Right Column */}
      <div className={cn("flex-1 flex flex-col w-full relative", showSidebar ? "lg:pl-[280px] xl:pl-[320px]" : "")}>
        <AnimatePresence mode="wait">
          {currentStage === 'welcome' && (
            <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="w-full flex-1 flex flex-col"
          >
            <WelcomeExperience />
          </motion.div>
          )}

          {currentStage === 'track_selection' && (
            <motion.div
              key="track"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="w-full min-h-screen"
            >
              <TrackSelection />
            </motion.div>
          )}

          {currentStage === 'programme_selection' && (
            <motion.div
              key="programme"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="w-full min-h-screen"
            >
              <ProgrammeSelection />
            </motion.div>
          )}

          {currentStage === 'editorial_profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="w-full min-h-screen"
            >
              <EditorialProfile />
            </motion.div>
          )}

          {currentStage === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="w-full min-h-screen"
            >
              <ReviewSubmission />
            </motion.div>
          )}

          {currentStage === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="w-full min-h-screen"
            >
              <ConfirmationScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
