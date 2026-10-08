import { useSubmissionStore, Track } from "@/lib/submissionStore";
import { motion } from "framer-motion";
import { Folder, CheckCircle, ChevronDown, Edit2, ShieldCheck, ChevronRight, ChevronLeft, FileText, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function ReviewSubmission() {
  const { profileData, selectedTrack, selectedProgramme, selectedPracticeAreas, setStage, updateProfileData, isNavigatingBack } = useSubmissionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!declarationAccepted) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?redirect=/enter-the-index");
        return;
      }

      let applying_for_division = "Law Firm Excellence™";
      if (selectedTrack === "law_firm_excellence") {
        applying_for_division = "Law Firm Excellence™";
      } else if (selectedTrack === "corporate_elite") {
        applying_for_division = "Corporate Elite™";
      } else if (selectedTrack === "litigation_masters") {
        applying_for_division = "Litigation Masters™";
      } else if (selectedTrack === "women_leaders") {
        applying_for_division = "Women Leaders™";
      } else if (selectedTrack === "future_leaders") {
        applying_for_division = "Future Leaders™";
      } else if (selectedTrack === "legal_innovation") {
        applying_for_division = "Legal Innovation Excellence™";
      }

      // Build payload
      const payload = {
        // Firm identity
        firm_name: profileData.identity.firmName || profileData.identity.orgName || profileData.identity.fullName || "",
        firm_type: selectedTrack === "law_firm_excellence" ? "Law Firm" : selectedTrack === "legal_innovation" ? "Legal Technology" : "Legal Professional",
        year_established: profileData.identity.yearEstablished || "",
        headquarters_city: profileData.identity.hqCity || profileData.identity.city || "",
        country: profileData.identity.hqCountry || profileData.identity.country || "India",
        website_url: profileData.presence.website || profileData.presence.firmProfile || "",
        // Practice — use the checked areas from ProgrammeSelection step
        practice_areas: selectedPracticeAreas.length > 0
          ? selectedPracticeAreas
          : (profileData.practice.primaryPracticeAreas || profileData.practice.primaryPractice || "")
              .split(",").map((s: string) => s.trim()).filter(Boolean),
        firm_size: profileData.practice.firmSize || profileData.practice.orgSize || "",
        num_partners: "",
        num_lawyers: "",
        offices: profileData.practice.officeLocations || "",
        // About
        about_firm: profileData.biography.firmHistory || profileData.biography.bio || profileData.biography.companyInnovation || "",
        achievements: profileData.presence.publications || profileData.presence.publicationsInsights || "",
        key_areas_for_recognition: selectedPracticeAreas.join(", ") || profileData.practice.primaryPracticeAreas || profileData.practice.primaryInnovationArea || "",
        applying_for_division,
        // Contact
        contact_name: profileData.identity.managingPartner || profileData.identity.fullName || profileData.identity.editorInChief || profileData.identity.founderCeo || "",
        contact_email: profileData.identity.email || "",
        contact_phone: profileData.identity.mobile || "",
        contact_designation: profileData.identity.designation || (selectedTrack === "law_firm_excellence" ? "Managing Partner" : ""),
      };

      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStage("confirmation");
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const getTrackName = () => {
    switch(selectedTrack) {
      case 'law_firm_excellence': return "Law Firm Excellence™";
      case 'corporate_elite': return "Corporate Elite™";
      case 'litigation_masters': return "Litigation Masters™";
      case 'women_leaders': return "Women Leaders™";
      case 'future_leaders': return "Future Leaders™";
      case 'legal_innovation': return "Legal Innovation Excellence™";
      default: return "Not Selected";
    }
  };

  const getDynamicFolders = (track: Track) => {
    const baseFolders = [
      {
        title: "Recognition Track & Programme",
        icon: Folder,
        content: (
          <div className="space-y-3">
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Track</span>
              <span className="text-white text-xs font-medium">{getTrackName()}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Programme</span>
              <span className="text-white text-xs capitalize font-medium">{selectedProgramme?.replace(/_/g, ' ') || 'None'}</span>
            </div>
          </div>
        )
      }
    ];

    if (track === 'law_firm_excellence') {
      return [
        ...baseFolders,
        {
          title: "Firm Identity",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Firm Name</span>
                <span className="text-white text-xs font-medium">{profileData.identity.firmName || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Managing Partner</span>
                <span className="text-white text-xs font-medium">{profileData.identity.managingPartner || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Year Established</span>
                <span className="text-white text-xs font-medium">{profileData.identity.yearEstablished || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Headquarters</span>
                <span className="text-white text-xs font-medium">{profileData.identity.hqCity ? `${profileData.identity.hqCity}, ${profileData.identity.country}` : "—"}</span>
              </div>
            </div>
          )
        },
        {
          title: "Practice Areas",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="col-span-2">
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Primary Areas</span>
                <span className="text-white text-xs font-medium">{profileData.practice.primaryPracticeAreas || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Firm Size</span>
                <span className="text-white text-xs font-medium">{profileData.practice.firmSize || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Office Locations</span>
                <span className="text-white text-xs font-medium">{profileData.practice.officeLocations || "—"}</span>
              </div>
            </div>
          )
        }
      ];
    }

    if (track === 'legal_innovation') {
      return [
        ...baseFolders,
        {
          title: "Organisation Identity",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Organisation Name</span>
                <span className="text-white text-xs font-medium">{profileData.identity.orgName || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Founder / CEO</span>
                <span className="text-white text-xs font-medium">{profileData.identity.founderCeo || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Location</span>
                <span className="text-white text-xs font-medium">{profileData.identity.city ? `${profileData.identity.city}, ${profileData.identity.country}` : "—"}</span>
              </div>
            </div>
          )
        },
        {
          title: "Innovation Profile",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="col-span-2">
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Primary Innovation Area</span>
                <span className="text-white text-xs font-medium">{profileData.practice.primaryInnovationArea || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Organisation Size</span>
                <span className="text-white text-xs font-medium">{profileData.practice.orgSize || "—"}</span>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Product Category</span>
                <span className="text-white text-xs font-medium">{profileData.practice.productCategory || "—"}</span>
              </div>
            </div>
          )
        }
      ];
    }

    // Default Professional (Corporate Elite, Litigation Masters, Women Leaders, Future Leaders)
    return [
      ...baseFolders,
      {
        title: "Professional Identity",
        icon: Folder,
        content: (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="col-span-2">
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Full Name</span>
              <span className="text-white text-xs font-medium">{profileData.identity.fullName || "—"}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Designation</span>
              <span className="text-white text-xs font-medium">{profileData.identity.designation || "—"}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Location</span>
              <span className="text-white text-xs font-medium">{profileData.identity.city ? `${profileData.identity.city}, ${profileData.identity.country}` : "—"}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Email</span>
              <span className="text-white text-xs font-medium">{profileData.identity.email || "—"}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Mobile</span>
              <span className="text-white text-xs font-medium">{profileData.identity.mobile || "—"}</span>
            </div>
          </div>
        )
      },
      {
        title: "Professional Practice",
        icon: Folder,
        content: (
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="col-span-2">
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Primary Practice Area</span>
              <span className="text-white text-xs font-medium">{profileData.practice.primaryPracticeAreas || "—"}</span>
            </div>
            <div>
              <span className="text-[0.55rem] uppercase tracking-widest text-white/40 block mb-1">Years of Practice</span>
              <span className="text-white text-xs font-medium">{profileData.practice.yearsOfPractice || "—"}</span>
            </div>
          </div>
        )
      }
    ];
  };

  const folders = getDynamicFolders(selectedTrack);

  return (
    <div className="min-h-screen pt-32 pb-8 px-6 lg:px-12 relative z-10 flex flex-col w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-[1px] bg-gold-500/60" />
            <span className="text-gold-500 text-[0.6rem] font-semibold uppercase tracking-[0.3em]">Step 4 of 4</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white uppercase tracking-wide font-light drop-shadow-md mb-2">Review & Submit</h2>
          <p className="text-neutral-400 text-xs md:text-[0.8rem] max-w-2xl leading-relaxed">
            Please review the details of your editorial submission before finalising. Ensure all information is accurate and reflects your professional standing.
          </p>
        </div>
        
        <button
          onClick={() => setStage('editorial_profile')}
          className="group inline-flex items-center text-neutral-500 hover:text-gold-400 transition-colors text-[0.65rem] uppercase tracking-widest font-semibold pb-1"
        >
          <ChevronLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl w-full">
        
        {/* Submission Details Panel */}
        <div className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/[0.06] rounded-xl p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.03)] transition-all">
          <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-6 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Submission Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {folders.map((folder, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center mb-4 border-b border-white/5 pb-3">
                  <folder.icon className="w-3.5 h-3.5 text-gold-400 mr-2 opacity-70" />
                  <h4 className="text-[0.8rem] font-serif text-white/90">{folder.title}</h4>
                </div>
                {folder.content}
              </div>
            ))}
          </div>

          {/* Document Preview Section */}
          <div className="mt-8 border-t border-white/10 pt-8">
            <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-5 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Uploaded Documents
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <DocStatus label="Professional Photograph" uploaded={profileData.documents.photoUploaded} required />
              <DocStatus label="Curriculum Vitae" uploaded={profileData.documents.cvUploaded} required />
              <DocStatus label="Representative Work" uploaded={profileData.documents.workUploaded} />
              <DocStatus label="Supporting Documents" uploaded={profileData.documents.suppUploaded} />
            </div>
          </div>
        </div>

        {/* Action Panel (Moved to Bottom) */}
        <div className="bg-gradient-to-b from-[#141414] to-[#0a0a0a] border border-white/[0.06] rounded-xl p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.03)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex-1">
            <h3 className="text-xl font-serif text-white mb-3">Finalise Submission</h3>
            <label className="flex items-start space-x-3 cursor-pointer group max-w-lg">
              <div className="relative flex-shrink-0 mt-0.5">
                <input 
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-4 h-4 border border-white/20 rounded bg-[#111] peer-checked:bg-gold-500/20 peer-checked:border-gold-500 transition-colors flex items-center justify-center">
                  <CheckCircle className={`w-3 h-3 text-gold-400 transition-opacity ${declarationAccepted ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-[0.65rem] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                I declare that the information provided is accurate and I authorise its review for the Juris Standard Index. I accept the <a href="#" className="text-gold-500/70 hover:text-gold-400 underline decoration-gold-500/30 underline-offset-2">Terms of Submission</a>.
              </span>
            </label>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-end">
            <button
              onClick={handleSubmit}
              disabled={!declarationAccepted || isSubmitting}
              className={`w-full md:w-64 group relative flex items-center justify-center py-3.5 rounded-md overflow-hidden transition-all duration-500 ${
                declarationAccepted && !isSubmitting
                  ? "bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] border-none" 
                  : "bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className={cn(
                "relative z-10 flex items-center text-[0.7rem] uppercase tracking-[0.25em] font-bold",
                declarationAccepted && !isSubmitting ? "text-black" : "text-white/40"
              )}>
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Profile
                    <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
            {submitError && (
              <div className="mt-3 p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg w-full md:w-64 text-center">
                <p className="text-red-400 text-[0.65rem] leading-relaxed">{submitError}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function DocStatus({ label, uploaded, required }: { label: string, uploaded: boolean, required?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
      uploaded 
        ? 'bg-gold-500/10 border-gold-500/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
        : 'bg-white/[0.02] border-white/10 opacity-60'
    }`}>
      {uploaded ? (
        <CheckCircle2 className="w-5 h-5 text-gold-400 mb-1.5" />
      ) : (
        <XCircle className="w-5 h-5 text-white/20 mb-1.5" />
      )}
      <span className={`text-[0.55rem] uppercase tracking-widest mb-1 ${uploaded ? 'text-gold-300 font-bold' : 'text-white/40'}`}>
        {uploaded ? 'Uploaded' : 'Pending'}
      </span>
      <span className="text-[0.65rem] text-white/80 font-medium">{label}</span>
      {required && !uploaded && (
        <span className="text-[0.5rem] text-red-400/80 uppercase tracking-wider mt-1.5">* Required</span>
      )}
    </div>
  );
}
