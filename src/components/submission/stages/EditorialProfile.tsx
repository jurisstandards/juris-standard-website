import { useSubmissionStore, ProfileData } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, UploadCloud, Edit2, ChevronLeft } from "lucide-react";
import { useState } from "react";

type SectionKey = 'identity' | 'practice' | 'biography' | 'presence' | 'documents';

const sections: { id: SectionKey; title: string; subtitle: string }[] = [
  { id: 'identity', title: "Section A", subtitle: "Professional Identity" },
  { id: 'practice', title: "Section B", subtitle: "Professional Practice" },
  { id: 'biography', title: "Section C", subtitle: "Editorial Biography" },
  { id: 'presence', title: "Section D", subtitle: "Professional Presence" },
  { id: 'documents', title: "Section E", subtitle: "Supporting Information" },
];

export function EditorialProfile() {
  const { profileData, updateProfileData, completedSections, markSectionCompleted, setStage, isNavigatingBack } = useSubmissionStore();
  const [activeSection, setActiveSection] = useState<SectionKey>('identity');

  const handleContinue = (currentId: SectionKey, nextId: SectionKey | 'review') => {
    markSectionCompleted(currentId);
    if (nextId === 'review') {
      setStage('review');
    } else {
      setActiveSection(nextId);
    }
  };

  const renderSectionContent = (id: SectionKey) => {
    switch (id) {
      case 'identity':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Tell us how you are professionally known.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={profileData.identity.fullName} onChange={(val) => updateProfileData('identity', { fullName: val })} />
              <Input label="Preferred Professional Name (Optional)" value={profileData.identity.preferredName} onChange={(val) => updateProfileData('identity', { preferredName: val })} />
              <Input label="Current Designation" value={profileData.identity.designation} onChange={(val) => updateProfileData('identity', { designation: val })} />
              <Input label="Organisation / Chamber / Firm" value={profileData.identity.organization} onChange={(val) => updateProfileData('identity', { organization: val })} />
              <Input label="City" value={profileData.identity.city} onChange={(val) => updateProfileData('identity', { city: val })} />
              <Input label="Country" value={profileData.identity.country} onChange={(val) => updateProfileData('identity', { country: val })} />
            </div>
            <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
          </div>
        );
      case 'practice':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Help us understand the nature of your professional practice.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Primary Practice Area" value={profileData.practice.primaryPractice} onChange={(val) => updateProfileData('practice', { primaryPractice: val })} />
              <Input label="Secondary Practice Areas" value={profileData.practice.secondaryPractices} onChange={(val) => updateProfileData('practice', { secondaryPractices: val })} />
              <Input label="Years of Practice" value={profileData.practice.yearsOfPractice} onChange={(val) => updateProfileData('practice', { yearsOfPractice: val })} />
              <Input label="Industries Served" value={profileData.practice.industries} onChange={(val) => updateProfileData('practice', { industries: val })} />
            </div>
            <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
          </div>
        );
      case 'biography':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Describe your professional journey, areas of expertise and significant contributions to the legal profession.</p>
            <textarea 
              className="w-full h-48 bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
              placeholder="Begin writing..."
              value={profileData.biography.bio}
              onChange={(e) => updateProfileData('biography', { bio: e.target.value })}
            />
            <div className="flex justify-between items-center text-xs text-white/30">
              <span>Auto-saved just now</span>
              <span>{profileData.biography.bio.length} characters</span>
            </div>
            <ContinueButton onClick={() => handleContinue('biography', 'presence')} />
          </div>
        );
      case 'presence':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Provide links to your official professional presence.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Official Website" value={profileData.presence.website} onChange={(val) => updateProfileData('presence', { website: val })} />
              <Input label="LinkedIn" value={profileData.presence.linkedin} onChange={(val) => updateProfileData('presence', { linkedin: val })} />
              <Input label="Professional Profile (Optional)" value={profileData.presence.profileUrl} onChange={(val) => updateProfileData('presence', { profileUrl: val })} />
              <Input label="Publications (Optional)" value={profileData.presence.publications} onChange={(val) => updateProfileData('presence', { publications: val })} />
            </div>
            <ContinueButton onClick={() => handleContinue('presence', 'documents')} />
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Upload supporting documentation for your submission.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload label="Professional Photograph" onUpload={() => updateProfileData('documents', { photoUploaded: true })} uploaded={profileData.documents.photoUploaded} />
              <FileUpload label="Curriculum Vitae" onUpload={() => updateProfileData('documents', { cvUploaded: true })} uploaded={profileData.documents.cvUploaded} />
              <FileUpload label="Representative Work (Optional)" onUpload={() => updateProfileData('documents', { workUploaded: true })} uploaded={profileData.documents.workUploaded} />
              <FileUpload label="Supporting Documents (Optional)" onUpload={() => updateProfileData('documents', { suppUploaded: true })} uploaded={profileData.documents.suppUploaded} />
            </div>
            <ContinueButton onClick={() => handleContinue('documents', 'review')} text="Review Editorial Submission" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-24 relative z-10 flex flex-col max-w-7xl mx-auto w-full">
      {/* Header spanning full width for perfect symmetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
            Step 3 of 4
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm">
            Editorial Profile
          </h2>
        </div>
        
        <button
          onClick={() => setStage('programme_selection')}
          className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Main Content Area */}
        <div className="flex-1 max-w-3xl">
          <div className="space-y-6">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isCompleted = completedSections.includes(section.id) && !isActive;

            return (
              <div 
                key={section.id} 
                className={`border rounded-2xl overflow-hidden transition-all duration-700 ${
                  isActive ? 'bg-[#111]/80 border-gold-500/30 shadow-[0_10px_40px_rgba(212,175,55,0.05)]' : 
                  isCompleted ? 'bg-black/40 border-white/5 hover:border-white/10' : 
                  'bg-black/20 border-white/5 opacity-50'
                }`}
              >
                {/* Header */}
                <div 
                  className={`px-8 py-6 flex items-center justify-between ${isCompleted ? 'cursor-pointer' : ''}`}
                  onClick={() => isCompleted && setActiveSection(section.id)}
                >
                  <div>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/70 block mb-1">
                      {section.title}
                    </span>
                    <h3 className={`text-xl font-serif ${isActive ? 'text-white' : 'text-white/60'}`}>
                      {section.subtitle}
                    </h3>
                  </div>
                  {isCompleted && (
                    <button className="flex items-center space-x-2 text-[0.65rem] uppercase tracking-widest text-white/30 hover:text-white/80 transition-colors">
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Section</span>
                    </button>
                  )}
                </div>

                {/* Body */}
                <AnimatePresence initial={!isNavigatingBack}>
                  {isActive && (
                    <motion.div
                      initial={isNavigatingBack ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 border-t border-white/5 pt-6">
                        {renderSectionContent(section.id)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar - Institutional Panel */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="sticky top-32">
          <div className="bg-[#111]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50 mb-6 border-b border-white/5 pb-4">
              Your Editorial Submission
            </h4>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40 font-light">Track</span>
                <span className="text-white font-medium capitalize">Legal Professional</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40 font-light">Programme</span>
                <span className="text-white font-medium">Corporate Elite</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40 font-light">Sections</span>
                <span className="text-gold-400 font-medium">{completedSections.length} / 5 Completed</span>
              </div>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-500/80" />
                <span className="text-xs text-white/70">Progress Saved Automatically</span>
              </div>
              <p className="text-[0.65rem] text-white/30 leading-relaxed">
                All information is handled in accordance with Juris Standard's privacy standards and used solely for editorial evaluation.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Input({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex flex-col">
      <label className="text-[0.65rem] uppercase tracking-widest text-white/50 mb-2 pl-2">
        {label}
      </label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
      />
    </div>
  );
}

function ContinueButton({ onClick, text = "Continue Editorial Journey" }: { onClick: () => void, text?: string }) {
  return (
    <div className="flex justify-end pt-6 mt-6 border-t border-white/5">
      <button 
        onClick={onClick}
        className="group flex items-center space-x-3 bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/30 px-6 py-3 rounded-full transition-all duration-500 text-xs uppercase tracking-widest font-semibold text-white/70 hover:text-gold-200"
      >
        <span>{text}</span>
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

function FileUpload({ label, onUpload, uploaded }: { label: string, onUpload: () => void, uploaded: boolean }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    if (uploaded) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onUpload();
    }, 1500); // Mock upload delay
  };

  return (
    <div className="flex flex-col">
      <label className="text-[0.65rem] uppercase tracking-widest text-white/50 mb-2 pl-2">
        {label}
      </label>
      <div 
        onClick={handleUpload}
        className={`border border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors duration-500 cursor-pointer ${
          uploaded ? 'bg-gold-500/10 border-gold-500/30' : 'bg-black/20 border-white/20 hover:border-gold-500/40 hover:bg-black/40'
        }`}
      >
        {isUploading ? (
          <div className="w-5 h-5 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        ) : uploaded ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-gold-400 mb-2" />
            <span className="text-xs text-gold-300">Document Uploaded</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-6 h-6 text-white/30 mb-2" />
            <span className="text-xs text-white/50">Click to upload document</span>
          </>
        )}
      </div>
    </div>
  );
}
