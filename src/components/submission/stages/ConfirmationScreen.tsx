import { useSubmissionStore } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight, ShieldCheck, Milestone } from "lucide-react";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SubmissionPdfDocument } from "../PdfTemplate";
import Link from "next/link";

export function ConfirmationScreen() {
  const { profileData, selectedTrack, selectedProgramme } = useSubmissionStore();
  const [isClient, setIsClient] = useState(false);
  const [referenceNumber] = useState(`JS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  useEffect(() => {
    setIsClient(true);
    // Optional: play subtle chime audio here if provided
  }, []);

  return (
    <div className="min-h-screen px-6 py-24 relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-24 h-24 mb-10 relative flex items-center justify-center"
      >
        <div className="absolute inset-0 border border-gold-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute inset-2 border border-gold-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="w-16 h-16 bg-gradient-to-br from-gold-600 to-gold-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
          <ShieldCheck className="w-8 h-8 text-black" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center mb-16 w-full"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Editorial Submission Received</h2>
        <p className="text-white/50 text-base font-light leading-relaxed mb-4 max-w-2xl mx-auto">
          Thank you, {profileData.identity.fullName || "Applicant"}. Your professional journey has now entered independent editorial review. Following editorial assessment, your submission will be considered for recognition within the Juris Standard Index.
        </p>
        <p className="text-gold-400 font-medium tracking-widest text-xs uppercase mt-6">
          Reference: {referenceNumber}
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-[#111]/40 border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-sm font-serif text-white mb-6 flex items-center">
            <Milestone className="w-4 h-4 text-gold-400 mr-3" />
            Review Timeline
          </h3>
          <div className="space-y-6">
            <TimelineStep active title="Submission Received" desc="Your profile is secured." />
            <TimelineStep title="Editorial Screening" desc="Initial verification process." />
            <TimelineStep title="Research & Evaluation" desc="Independent peer assessment." />
            <TimelineStep title="Editorial Decision" desc="Final recognition outcome." />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-[#111]/40 border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center"
        >
          <div className="w-16 h-20 bg-gradient-to-br from-black to-[#1a1a1a] border border-gold-500/30 rounded flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
            <div className="absolute top-0 w-full h-1 bg-gold-500" />
            <span className="text-[0.5rem] font-serif text-gold-300 uppercase tracking-widest text-center px-2">Official<br/>Acknowledgement</span>
          </div>
          <h3 className="text-sm font-serif text-white mb-3">Submission Acknowledgement</h3>
          <p className="text-xs text-white/40 mb-8 max-w-[200px]">
            Download your official editorial receipt for your records.
          </p>

          {isClient && (
            <PDFDownloadLink 
              document={<SubmissionPdfDocument profileData={profileData} track={selectedTrack} programme={selectedProgramme} referenceNumber={referenceNumber} />} 
              fileName={`Juris_Standard_${referenceNumber}.pdf`}
              className="group flex items-center space-x-3 bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/40 px-6 py-3 rounded-full transition-colors duration-500 text-xs uppercase tracking-widest font-semibold text-white/70 hover:text-gold-300"
            >
              {({ blob, url, loading, error }) => (
                <>
                  <Download className="w-4 h-4" />
                  <span>{loading ? "Generating PDF..." : "Download PDF"}</span>
                </>
              )}
            </PDFDownloadLink>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <Link 
          href="/"
          className="flex items-center space-x-2 text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors"
        >
          <span>Return to Home</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  );
}

function TimelineStep({ active, title, desc }: { active?: boolean, title: string, desc: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex flex-col items-center mt-1">
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-gold-400 shadow-[0_0_10px_#D4AF37]' : 'bg-white/10'}`} />
        <div className="w-[1px] h-10 bg-white/5 my-1" />
      </div>
      <div>
        <h4 className={`text-sm ${active ? 'text-gold-300' : 'text-white/60'} font-medium`}>{title}</h4>
        <p className="text-[0.65rem] text-white/30 mt-1">{desc}</p>
      </div>
    </div>
  );
}
