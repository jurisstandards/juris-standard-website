import { useSubmissionStore, ProfileData } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, UploadCloud, Edit2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Country, City } from "country-state-city";

type SectionKey = 'identity' | 'practice' | 'biography' | 'presence' | 'documents';

const sections: { id: SectionKey; title: string; subtitle: string }[] = [
  { id: 'identity', title: "Section A", subtitle: "Professional Identity" },
  { id: 'practice', title: "Section B", subtitle: "Professional Practice" },
  { id: 'biography', title: "Section C", subtitle: "Editorial Biography" },
  { id: 'presence', title: "Section D", subtitle: "Professional Presence" },
  { id: 'documents', title: "Section E", subtitle: "Supporting Information" },
];

export function EditorialProfile() {
  const { profileData, updateProfileData, completedSections, markSectionCompleted, setStage, isNavigatingBack, selectedTrack, selectedPracticeAreas } = useSubmissionStore();
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
      case 'identity': {
        const allCountries = Country.getAllCountries().map(c => c.name);
        const selectedCountryObj = Country.getAllCountries().find(c => c.name === profileData.identity.country);
        const cityOptions = selectedCountryObj ? City.getCitiesOfCountry(selectedCountryObj.isoCode)?.map(c => c.name) || [] : [];
        let uniqueCityOptions = Array.from(new Set(cityOptions)).sort();

        // Cleanup for common Indian city sub-districts
        if (profileData.identity.country === 'India') {
            uniqueCityOptions = uniqueCityOptions.filter(city => {
               if (city.includes('Delhi') && city !== 'Delhi') return false;
               if (city.includes('Mumbai') && city !== 'Mumbai' && city !== 'Navi Mumbai') return false;
               return true;
            });
            // Ensure Delhi and Mumbai are present
            if (!uniqueCityOptions.includes('Delhi')) uniqueCityOptions.push('Delhi');
            if (!uniqueCityOptions.includes('Mumbai')) uniqueCityOptions.push('Mumbai');
            uniqueCityOptions.sort();
        }

        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Tell us how you are professionally known.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={profileData.identity.fullName} onChange={(val) => updateProfileData('identity', { fullName: val })} />
              <Input label="Preferred Professional Name (Optional)" value={profileData.identity.preferredName} onChange={(val) => updateProfileData('identity', { preferredName: val })} />
              <Input label="Current Designation" value={profileData.identity.designation} onChange={(val) => updateProfileData('identity', { designation: val })} />
              <Input label="Organisation / Chamber / Firm" value={profileData.identity.organization} onChange={(val) => updateProfileData('identity', { organization: val })} />
              <SelectInput 
                label="Country" 
                value={profileData.identity.country} 
                onChange={(val) => {
                  updateProfileData('identity', { country: val, city: '' }); // Reset city when country changes
                }} 
                options={allCountries}
              />
              <SelectInput 
                label="City" 
                value={profileData.identity.city} 
                onChange={(val) => updateProfileData('identity', { city: val })} 
                options={uniqueCityOptions.length > 0 ? uniqueCityOptions : ['Please select a country first']}
              />
            </div>
            <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
          </div>
        );
      }
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
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 relative z-10 flex flex-col w-full">
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
        <div className="flex-1 max-w-4xl">
          {/* Stepper / Progress Tabs */}
          <div className="flex space-x-3 mb-12">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              const isCompleted = completedSections.includes(section.id);
              const isPast = sections.findIndex(s => s.id === activeSection) > idx;
              
              return (
                <div 
                  key={section.id} 
                  className={`flex-1 flex flex-col gap-3 ${isCompleted || isPast ? 'cursor-pointer group' : ''}`}
                  onClick={() => (isCompleted || isPast) && setActiveSection(section.id)}
                >
                  <div className="relative h-[6px] w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <div className={`absolute inset-0 h-full rounded-full transition-all duration-700 ease-out ${
                      isActive ? 'bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.8)]' : 
                      isCompleted || isPast ? 'bg-gold-500/40 group-hover:bg-gold-500/60' : 
                      'bg-transparent'
                    }`} />
                  </div>
                  <div className="flex flex-col pr-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[0.55rem] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${
                        isActive ? 'text-gold-500' : 
                        isCompleted || isPast ? 'text-gold-500/60' : 
                        'text-white/20'
                      }`}>
                        {section.title}
                      </span>
                      {(isCompleted || isPast) && !isActive && (
                        <CheckCircle2 className="w-3 h-3 text-gold-500/50 group-hover:text-gold-500/80 transition-colors duration-300" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium tracking-wide transition-colors duration-500 ${
                      isActive ? 'text-white drop-shadow-md' : 
                      isCompleted || isPast ? 'text-white/70 group-hover:text-white' : 
                      'text-white/30'
                    }`}>
                      {section.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Active Section Box */}
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-t-white/10 border-x-white/[0.03] border-b-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 border-b border-white/5 pb-6">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-500/70 block mb-2">
                    {sections.find(s => s.id === activeSection)?.title}
                  </span>
                  <h3 className="text-3xl font-serif text-white drop-shadow-sm">
                    {sections.find(s => s.id === activeSection)?.subtitle}
                  </h3>
                </div>
                {renderSectionContent(activeSection)}
              </motion.div>
            </AnimatePresence>
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
                <span className="text-white font-medium capitalize">{selectedTrack || 'Not Selected'}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/40 font-light mr-4">Practice Areas</span>
                <span className="text-white font-medium text-right max-w-[150px] truncate" title={selectedPracticeAreas?.join(', ')}>
                  {selectedPracticeAreas?.length ? selectedPracticeAreas.join(', ') : 'None'}
                </span>
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
      <label className="text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-gold-500/70 mb-2 pl-1 drop-shadow-sm">
        {label}
      </label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Filter options if the user is typing, otherwise show all options
  const filteredOptions = (isTyping && value) 
    ? options.filter(opt => opt.toLowerCase().includes(value.toLowerCase())) 
    : options;

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsTyping(false);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col relative">
      <label className="text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-gold-500/70 mb-2 pl-1 drop-shadow-sm">
        {label}
      </label>
      <div className="relative">
        <input 
          type="text"
          autoComplete="new-password"
          name={`custom-select-${label.toLowerCase()}`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsTyping(true);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsTyping(false);
            setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => setIsOpen(false), 200);
          }}
          placeholder={`Search or type ${label}...`}
          className="w-full bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md px-4 py-3 pr-10 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <ChevronRight className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-60 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
          >
            {filteredOptions.map((opt, idx) => (
              <div 
                key={idx}
                className="px-4 py-3 text-sm text-white/80 hover:bg-gold-500/20 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-none"
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContinueButton({ onClick, text = "Continue Editorial Journey" }: { onClick: () => void, text?: string }) {
  return (
    <div className="flex justify-end pt-8 mt-6 border-t border-white/5">
      <button 
        onClick={onClick}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-gold-500/30 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-colors duration-300 hover:border-gold-400 hover:bg-gold-500/5 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
      >
        <span className="relative z-10 flex items-center">
          {text}
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
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
      <label className="text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-gold-500/70 mb-2 pl-1 drop-shadow-sm">
        {label}
      </label>
      <div 
        onClick={handleUpload}
        className={`border border-dashed rounded-md p-6 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
          uploaded ? 'bg-gold-500/10 border-gold-500/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'bg-[#111]/80 backdrop-blur-md border-white/20 hover:border-gold-500/40 hover:bg-[#161616]'
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
