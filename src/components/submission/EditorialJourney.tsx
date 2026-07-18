'use client';

import { useSubmissionStore } from "@/lib/submissionStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { WelcomeExperience } from "./stages/WelcomeExperience";
import { TrackSelection } from "./stages/TrackSelection";
import { ProgrammeSelection } from "./stages/ProgrammeSelection";
import { EditorialProfile } from "./stages/EditorialProfile";
import { ReviewSubmission } from "./stages/ReviewSubmission";
import { ConfirmationScreen } from "./stages/ConfirmationScreen";

export function EditorialJourney() {
  const { currentStage, reset } = useSubmissionStore();

  useEffect(() => {
    // Reset to start from the beginning when the user arrives on this page fresh
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col relative">
      {/* Cross-dissolve Stage Renderer */}
      <div className="flex-1 w-full h-full relative">
        <AnimatePresence mode="wait">
          {currentStage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
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
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
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
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
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
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
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
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
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
              className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
            >
              <ConfirmationScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
