'use client';

import { useSubmissionStore } from "@/lib/submissionStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { WelcomeExperience } from "./stages/WelcomeExperience";
import { TrackSelection } from "./stages/TrackSelection";
import { ProgrammeSelection } from "./stages/ProgrammeSelection";
import { EditorialProfile } from "./stages/EditorialProfile";
import { ReviewSubmission } from "./stages/ReviewSubmission";
import { ConfirmationScreen } from "./stages/ConfirmationScreen";
import { SidebarStepper } from "./SidebarStepper";

export function EditorialJourney() {
  const { currentStage, reset } = useSubmissionStore();

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSidebar = currentStage !== 'welcome' && currentStage !== 'confirmation';

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
