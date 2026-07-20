import os

content = """import { useSubmissionStore } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight, ShieldCheck, Milestone, Mail, Phone, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SubmissionPdfDocument } from "../PdfTemplate";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ConfirmationScreen() {
  const { profileData, selectedTrack, selectedProgramme } = useSubmissionStore();
  const [isClient, setIsClient] = useState(false);
  const [referenceNumber] = useState(`JS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getApplicantName = () => {
    switch (selectedTrack) {
      case 'firm': return profileData.identity.firmName;
      case 'media':
      case 'innovation': return profileData.identity.orgName;
      default: return profileData.identity.fullName;
    }
  };

  return (
    <div className="min-h-screen px-6 py-24 relative z-10 flex flex-col items-center max-w-6xl mx-auto w-full">
      
      {/* Top Banner & Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 border-b-black rounded-3xl p-10 md:p-16 mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="flex-1 pr-0 md:pr-12 text-center md:text-left mb-10 md:mb-0 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-4 py-1.5 mb-8">
            <CheckCircle className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 text-[0.65rem] uppercase tracking-[0.2em] font-bold">Submission Confirmed</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            Editorial Submission<br />Received
          </h2>
          
          <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Thank you, <strong className="text-white font-medium">{getApplicantName() || "Applicant"}</strong>. Your professional profile has been securely submitted for independent editorial review. Your submission will now undergo rigorous assessment for recognition within the Juris Standard Index.
          </p>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center justify-center p-8 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-2xl relative z-10 w-full md:w-auto shadow-2xl">
          <ShieldCheck className="w-12 h-12 text-gold-400 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
          <span className="text-[0.65rem] text-white/40 uppercase tracking-[0.25em] mb-2 font-semibold">Official Reference</span>
          <span className="text-xl md:text-2xl font-serif text-gold-500 tracking-wider font-medium">{referenceNumber}</span>
          
          {isClient && (
            <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-center">
              <PDFDownloadLink 
                document={<SubmissionPdfDocument profileData={profileData} track={selectedTrack} programme={selectedProgramme} referenceNumber={referenceNumber} />} 
                fileName={`Juris_Standard_${referenceNumber}.pdf`}
                className="group flex items-center space-x-3 bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/40 px-6 py-3 rounded-full transition-all duration-500 text-xs uppercase tracking-widest font-semibold text-white/70 hover:text-gold-300"
              >
                {({ loading }) => (
                  <>
                    <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{loading ? "Generating..." : "Download Receipt"}</span>
                  </>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </motion.div>

      {/* Grid Layout for Bottom Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Timeline (Takes up 2 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-2 bg-[#111]/40 border border-white/10 rounded-2xl p-8 lg:p-10"
        >
          <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-10 flex items-center">
            <Milestone className="w-4 h-4 mr-3" />
            Editorial Review Timeline
          </h3>
          
          <div className="relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-4 left-4 right-4 h-px bg-white/10" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <TimelineStep active step="01" title="Submission Received" desc="Your profile and supporting materials are securely stored." />
              <TimelineStep step="02" title="Editorial Screening" desc="Initial verification of eligibility and credentials." />
              <TimelineStep step="03" title="Research Phase" desc="Independent market assessment and peer review." />
              <TimelineStep step="04" title="Final Decision" desc="Outcome notification and recognition details." />
            </div>
          </div>
        </motion.div>

        {/* Contact & Support (Takes up 1 column) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="lg:col-span-1 bg-[#111]/40 border border-white/10 rounded-2xl p-8 lg:p-10 flex flex-col"
        >
          <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-8 flex items-center">
            <Mail className="w-4 h-4 mr-3" />
            Editorial Support
          </h3>
          
          <p className="text-white/50 text-sm font-light leading-relaxed mb-8 flex-1">
            Should you have any questions regarding your submission or the editorial process, our research team is available to assist you. Please quote your reference number in all correspondence.
          </p>
          
          <div className="space-y-4 border-t border-white/10 pt-6">
            <a href="mailto:submissions@jurisstandard.com" className="group flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-gold-500/10 hover:border-gold-500/30 transition-all">
              <Mail className="w-4 h-4 text-white/40 group-hover:text-gold-400 mr-4 transition-colors" />
              <div>
                <span className="block text-[0.6rem] uppercase tracking-widest text-white/40 mb-1">Email Support</span>
                <span className="text-sm font-medium text-white/80 group-hover:text-gold-100 transition-colors">submissions@jurisstandard.com</span>
              </div>
            </a>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
      >
        <Link 
          href="/"
          className="group flex items-center space-x-3 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
          <span>Return to Homepage</span>
        </Link>
        <div className="hidden sm:block w-px h-4 bg-white/20" />
        <Link 
          href="/index"
          className="group flex items-center space-x-3 text-xs uppercase tracking-widest text-gold-500/70 hover:text-gold-400 transition-colors"
        >
          <span>Explore The Index</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

function TimelineStep({ active, step, title, desc }: { active?: boolean, step: string, title: string, desc: string }) {
  return (
    <div className="flex flex-row md:flex-col items-start md:items-center relative z-10 group">
      {/* Mobile Vertical Line */}
      <div className="md:hidden absolute top-10 bottom-[-2rem] left-4 w-px bg-white/10" />
      
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-[0.6rem] font-bold bg-[#111] transition-all duration-500 mr-6 md:mr-0 md:mb-6",
        active 
          ? "border-gold-500 text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
          : "border-white/20 text-white/30 group-hover:border-gold-500/30 group-hover:text-gold-500/50"
      )}>
        {step}
      </div>
      
      <div className="flex flex-col md:items-center md:text-center pb-8 md:pb-0">
        <h4 className={cn(
          "text-sm font-medium mb-2 transition-colors duration-300",
          active ? "text-gold-300" : "text-white/80 group-hover:text-white"
        )}>
          {title}
        </h4>
        <p className="text-[0.65rem] text-white/40 leading-relaxed max-w-[180px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
"""

with open("d:/jurisstandard/src/components/submission/stages/ConfirmationScreen.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated ConfirmationScreen.tsx")
