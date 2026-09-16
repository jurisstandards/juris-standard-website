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
      if (selectedTrack === "firm") {
        applying_for_division = "Law Firm Excellence™";
      } else if (selectedTrack === "professional") {
        const cePractices = ["Corporate Advisory", "Corporate Governance", "Mergers & Acquisitions", "Joint Ventures", "Commercial Contracts", "Private Equity", "Venture Capital"];
        const hasCE = selectedPracticeAreas.some(area => cePractices.includes(area));
        applying_for_division = hasCE ? "Corporate Elite™" : "Litigation Masters™";
      } else if (selectedTrack === "media" || selectedTrack === "innovation") {
        applying_for_division = "Legal Innovation Excellence™";
      }

      // Build payload
      const payload = {
        // Firm identity
        firm_name: profileData.identity.firmName || profileData.identity.orgName || profileData.identity.fullName || "",
        firm_type: selectedTrack === "firm" ? "Law Firm" : selectedTrack === "media" ? "Legal Media" : selectedTrack === "innovation" ? "Legal Technology" : "Legal Professional",
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
        contact_designation: profileData.identity.designation || (selectedTrack === "firm" ? "Managing Partner" : ""),
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
      case 'professional': return "Legal Professional";
      case 'firm': return "Law Firm";
      case 'media': return "Legal Media";
      case 'innovation': return "Legal Technology & Innovation";
      default: return "Not Selected";
    }
  };

  const getDynamicFolders = (track: Track) => {
    const baseFolders = [
      {
        title: "Recognition Track & Programme",
        icon: Folder,
        content: (
          <div className="space-y-4">
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Track</span>
              <span className="text-white text-sm font-medium">{getTrackName()}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Programme</span>
              <span className="text-white text-sm capitalize font-medium">{selectedProgramme?.replace(/_/g, ' ') || 'None'}</span>
            </div>
          </div>
        )
      }
    ];

    if (track === 'firm') {
      return [
        ...baseFolders,
        {
          title: "Firm Identity",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Firm Name</span>
                <span className="text-white text-sm font-medium">{profileData.identity.firmName || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Managing Partner</span>
                <span className="text-white text-sm font-medium">{profileData.identity.managingPartner || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Year Established</span>
                <span className="text-white text-sm font-medium">{profileData.identity.yearEstablished || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Headquarters</span>
                <span className="text-white text-sm font-medium">{profileData.identity.hqCity ? `${profileData.identity.hqCity}, ${profileData.identity.country}` : "—"}</span>
              </div>
            </div>
          )
        },
        {
          title: "Practice Areas",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Primary Areas</span>
                <span className="text-white text-sm font-medium">{profileData.practice.primaryPracticeAreas || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Firm Size</span>
                <span className="text-white text-sm font-medium">{profileData.practice.firmSize || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Office Locations</span>
                <span className="text-white text-sm font-medium">{profileData.practice.officeLocations || "—"}</span>
              </div>
            </div>
          )
        }
      ];
    }

    if (track === 'media') {
      return [
        ...baseFolders,
        {
          title: "Organisation Identity",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Organisation Name</span>
                <span className="text-white text-sm font-medium">{profileData.identity.orgName || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Editor-in-Chief</span>
                <span className="text-white text-sm font-medium">{profileData.identity.editorInChief || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Location</span>
                <span className="text-white text-sm font-medium">{profileData.identity.city ? `${profileData.identity.city}, ${profileData.identity.country}` : "—"}</span>
              </div>
            </div>
          )
        },
        {
          title: "Editorial Coverage",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Primary Coverage</span>
                <span className="text-white text-sm font-medium">{profileData.practice.primaryCoverageAreas || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Team Size</span>
                <span className="text-white text-sm font-medium">{profileData.practice.teamSize || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Publication Formats</span>
                <span className="text-white text-sm font-medium">{profileData.practice.publicationFormats || "—"}</span>
              </div>
            </div>
          )
        }
      ];
    }

    if (track === 'innovation') {
      return [
        ...baseFolders,
        {
          title: "Organisation Identity",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Organisation Name</span>
                <span className="text-white text-sm font-medium">{profileData.identity.orgName || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Founder / CEO</span>
                <span className="text-white text-sm font-medium">{profileData.identity.founderCeo || "—"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Location</span>
                <span className="text-white text-sm font-medium">{profileData.identity.city ? `${profileData.identity.city}, ${profileData.identity.country}` : "—"}</span>
              </div>
            </div>
          )
        },
        {
          title: "Innovation Profile",
          icon: Folder,
          content: (
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-2">
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Primary Innovation Area</span>
                <span className="text-white text-sm font-medium">{profileData.practice.primaryInnovationArea || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Organisation Size</span>
                <span className="text-white text-sm font-medium">{profileData.practice.orgSize || "—"}</span>
              </div>
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Product Category</span>
                <span className="text-white text-sm font-medium">{profileData.practice.productCategory || "—"}</span>
              </div>
            </div>
          )
        }
      ];
    }

    // Default Professional
    return [
      ...baseFolders,
      {
        title: "Professional Identity",
        icon: Folder,
        content: (
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="col-span-2">
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Full Name</span>
              <span className="text-white text-sm font-medium">{profileData.identity.fullName || "—"}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Designation</span>
              <span className="text-white text-sm font-medium">{profileData.identity.designation || "—"}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Location</span>
              <span className="text-white text-sm font-medium">{profileData.identity.city ? `${profileData.identity.city}, ${profileData.identity.country}` : "—"}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Email</span>
              <span className="text-white text-sm font-medium">{profileData.identity.email || "—"}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Mobile</span>
              <span className="text-white text-sm font-medium">{profileData.identity.mobile || "—"}</span>
            </div>
          </div>
        )
      },
      {
        title: "Professional Practice",
        icon: Folder,
        content: (
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="col-span-2">
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Primary Practice Area</span>
              <span className="text-white text-sm font-medium">{profileData.practice.primaryPracticeAreas || "—"}</span>
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40 block mb-1">Years of Practice</span>
              <span className="text-white text-sm font-medium">{profileData.practice.yearsOfPractice || "—"}</span>
            </div>
          </div>
        )
      }
    ];
  };

  const folders = getDynamicFolders(selectedTrack);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 relative z-10 flex flex-col w-full max-w-7xl mx-auto">
      {/* Header spanning full width for perfect symmetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
            Step 4 of 4
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm">
            Review & Submit
          </h2>
        </div>
        
        <button
          onClick={() => setStage('editorial_profile')}
          className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <p className="text-white/40 text-sm font-light mb-6">
            Please review the details of your editorial submission before finalising. Ensure all information is accurate and reflects your professional standing.
          </p>
          
          <div className="bg-[#111]/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-8 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Submission Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {folders.map((folder, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center mb-6 border-b border-white/5 pb-4">
                    <folder.icon className="w-4 h-4 text-gold-400 mr-3 opacity-70" />
                    <h4 className="text-sm font-serif text-white/90">{folder.title}</h4>
                  </div>
                  {folder.content}
                </div>
              ))}
            </div>

            {/* Document Preview Section */}
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-gold-500 text-[0.65rem] uppercase tracking-[0.25em] font-bold mb-6 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DocStatus label="Professional Photograph" uploaded={profileData.documents.photoUploaded} required />
                <DocStatus label="Curriculum Vitae" uploaded={profileData.documents.cvUploaded} required />
                <DocStatus label="Representative Work" uploaded={profileData.documents.workUploaded} />
                <DocStatus label="Supporting Documents" uploaded={profileData.documents.suppUploaded} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-gold-500/20 rounded-2xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-serif text-white mb-6">Finalise Submission</h3>
            
            <label className="flex items-start space-x-3 cursor-pointer group mb-10">
              <div className="relative flex-shrink-0 mt-0.5">
                <input 
                  type="checkbox"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border border-white/20 rounded bg-[#111] peer-checked:bg-gold-500/20 peer-checked:border-gold-500 transition-colors flex items-center justify-center">
                  <CheckCircle className={`w-3.5 h-3.5 text-gold-400 transition-opacity ${declarationAccepted ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-[0.7rem] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                I declare that the information provided is accurate and I authorise its review for the Juris Standard Index. I accept the <a href="#" className="text-gold-500/70 hover:text-gold-400 underline decoration-gold-500/30 underline-offset-2">Terms of Submission</a>.
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={!declarationAccepted || isSubmitting}
              className={`w-full group relative flex items-center justify-center py-4 rounded-md overflow-hidden transition-all duration-500 ${
                declarationAccepted && !isSubmitting
                  ? "bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] border-none" 
                  : "bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className={cn(
                "relative z-10 flex items-center text-sm uppercase tracking-[0.25em] font-bold",
                declarationAccepted && !isSubmitting ? "text-black" : "text-white/40"
              )}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Editorial Profile
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

            {submitError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-xs leading-relaxed">{submitError}</p>
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
    <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
      uploaded 
        ? 'bg-gold-500/10 border-gold-500/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
        : 'bg-white/[0.02] border-white/10 opacity-60'
    }`}>
      {uploaded ? (
        <CheckCircle2 className="w-6 h-6 text-gold-400 mb-2" />
      ) : (
        <XCircle className="w-6 h-6 text-white/20 mb-2" />
      )}
      <span className={`text-[0.6rem] uppercase tracking-widest mb-1 ${uploaded ? 'text-gold-300 font-bold' : 'text-white/40'}`}>
        {uploaded ? 'Uploaded' : 'Pending'}
      </span>
      <span className="text-xs text-white/80 font-medium">{label}</span>
      {required && !uploaded && (
        <span className="text-[0.55rem] text-red-400/80 uppercase tracking-wider mt-2">* Required</span>
      )}
    </div>
  );
}
