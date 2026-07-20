import os

content = """import { useSubmissionStore, ProfileData, Track } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, UploadCloud, Edit2, ChevronLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SectionKey = keyof ProfileData;

const allCountries = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Japan", "Singapore", "United Arab Emirates"
];

const getCityOptions = (country: string) => {
  const cities: Record<string, string[]> = {
    "United States": ["New York", "Los Angeles", "Chicago", "Washington D.C."],
    "United Kingdom": ["London", "Manchester", "Edinburgh", "Birmingham"],
    "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary"],
    "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth"],
    "Germany": ["Berlin", "Frankfurt", "Munich", "Hamburg"],
    "France": ["Paris", "Lyon", "Marseille"],
    "Japan": ["Tokyo", "Osaka", "Kyoto"],
    "Singapore": ["Singapore"],
    "United Arab Emirates": ["Dubai", "Abu Dhabi"]
  };
  return cities[country] || [];
};

export function EditorialProfile() {
  const { profileData, updateProfileData, setStage, selectedTrack } = useSubmissionStore();
  const [activeSection, setActiveSection] = useState<SectionKey>('identity');
  const [completedSections, setCompletedSections] = useState<SectionKey[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getSections = (track: Track) => {
    switch (track) {
      case 'firm':
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Firm Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Practice Areas' },
          { id: 'biography', title: 'Section C', subtitle: 'Firm Profile' },
          { id: 'presence', title: 'Section D', subtitle: 'Firm Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
      case 'media':
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Organisation Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Editorial Coverage' },
          { id: 'biography', title: 'Section C', subtitle: 'Editorial Profile' },
          { id: 'presence', title: 'Section D', subtitle: 'Editorial Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
      case 'innovation':
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Organisation Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Innovation Profile' },
          { id: 'biography', title: 'Section C', subtitle: 'Company Profile' },
          { id: 'presence', title: 'Section D', subtitle: 'Market Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
      default:
        return [
          { id: 'identity', title: 'Section A', subtitle: 'Professional Identity' },
          { id: 'practice', title: 'Section B', subtitle: 'Professional Practice' },
          { id: 'biography', title: 'Section C', subtitle: 'Editorial Biography' },
          { id: 'presence', title: 'Section D', subtitle: 'Professional Presence' },
          { id: 'documents', title: 'Section E', subtitle: 'Supporting Information' }
        ];
    }
  };

  const sections = getSections(selectedTrack);

  const validateSection = (section: SectionKey): boolean => {
    switch (section) {
      case 'identity':
        if (selectedTrack === 'firm') {
          return !!(profileData.identity.firmName && profileData.identity.managingPartner && profileData.identity.yearEstablished && profileData.identity.country && profileData.identity.city);
        }
        if (selectedTrack === 'media') {
          return !!(profileData.identity.orgName && profileData.identity.editorInChief && profileData.identity.country && profileData.identity.city);
        }
        if (selectedTrack === 'innovation') {
          return !!(profileData.identity.orgName && profileData.identity.founderCeo && profileData.identity.country && profileData.identity.city);
        }
        // Professional
        return !!(profileData.identity.fullName && profileData.identity.designation && profileData.identity.country && profileData.identity.city);
      
      case 'practice':
        if (selectedTrack === 'firm') {
          return !!(profileData.practice.primaryPracticeAreas && profileData.practice.officeLocations && profileData.practice.firmSize);
        }
        if (selectedTrack === 'media') {
          return !!(profileData.practice.primaryCoverageAreas && profileData.practice.publicationFormats && profileData.practice.teamSize);
        }
        if (selectedTrack === 'innovation') {
          return !!(profileData.practice.primaryInnovationArea && profileData.practice.productCategory && profileData.practice.practiceAreasServed && profileData.practice.marketsServed && profileData.practice.orgSize);
        }
        // Professional
        return !!(profileData.practice.primaryPracticeAreas && profileData.practice.yearsOfPractice);
      
      case 'biography':
        return true; // entirely optional
      
      case 'presence':
        return true; // entirely optional
      
      case 'documents':
        return !!(profileData.documents.photoUploaded && profileData.documents.cvUploaded);
        
      default:
        return true;
    }
  };

  const handleContinue = (current: SectionKey, next: SectionKey | 'review') => {
    setError(null);
    if (!validateSection(current)) {
      setError("Please fill in all mandatory fields before continuing.");
      return;
    }

    if (!completedSections.includes(current)) {
      setCompletedSections([...completedSections, current]);
    }
    if (next === 'review') {
      setStage('review');
    } else {
      setActiveSection(next);
    }
  };

  const ContinueButton = ({ onClick, text = "Continue Editorial Journey" }: { onClick: () => void, text?: string }) => (
    <div className="flex flex-col items-end mt-12 w-full">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex items-center space-x-2 text-red-500/90 text-sm mb-4"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
      <button 
        onClick={onClick}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-transparent border border-gold-500/30 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.25em] rounded-sm overflow-hidden transition-colors duration-300 hover:border-gold-400 hover:bg-gold-500/5 shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]"
      >
        <span className="relative z-10 flex items-center">
          {text}
          <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>
    </div>
  );

  const renderSectionContent = (section: SectionKey) => {
    switch (section) {
      case 'identity':
        if (selectedTrack === 'firm') {
          const hqCities = getCityOptions(profileData.identity.country);
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-sm font-light mb-8">Tell us about your law firm.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Firm Name" value={profileData.identity.firmName} onChange={(val) => updateProfileData('identity', { firmName: val })} required />
                <Input label="Managing Partner" value={profileData.identity.managingPartner} onChange={(val) => updateProfileData('identity', { managingPartner: val })} required />
                <Input label="Year Established" value={profileData.identity.yearEstablished} onChange={(val) => updateProfileData('identity', { yearEstablished: val })} required />
                <div className="hidden md:block"></div>
                <SelectInput 
                  label="Headquarters Country" 
                  value={profileData.identity.country} 
                  onChange={(val) => updateProfileData('identity', { country: val, hqCity: '' })} 
                  options={allCountries}
                  required
                />
                <SelectInput 
                  label="Headquarters City" 
                  value={profileData.identity.hqCity} 
                  onChange={(val) => updateProfileData('identity', { hqCity: val })} 
                  options={hqCities.length > 0 ? hqCities : ['Please select a country first']}
                  required
                />
              </div>
              <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
            </div>
          );
        }

        if (selectedTrack === 'media' || selectedTrack === 'innovation') {
          const cities = getCityOptions(profileData.identity.country);
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-sm font-light mb-8">Tell us about your organisation.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Organisation Name" value={profileData.identity.orgName} onChange={(val) => updateProfileData('identity', { orgName: val })} required />
                <Input label={selectedTrack === 'media' ? "Editor-in-Chief / Primary Contact" : "Founder / CEO"} value={selectedTrack === 'media' ? profileData.identity.editorInChief : profileData.identity.founderCeo} onChange={(val) => selectedTrack === 'media' ? updateProfileData('identity', { editorInChief: val }) : updateProfileData('identity', { founderCeo: val })} required />
                <SelectInput 
                  label="Country" 
                  value={profileData.identity.country} 
                  onChange={(val) => updateProfileData('identity', { country: val, city: '' })} 
                  options={allCountries}
                  required
                />
                <SelectInput 
                  label="City" 
                  value={profileData.identity.city} 
                  onChange={(val) => updateProfileData('identity', { city: val })} 
                  options={cities.length > 0 ? cities : ['Please select a country first']}
                  required
                />
              </div>
              <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
            </div>
          );
        }

        // Default Professional
        const cities = getCityOptions(profileData.identity.country);
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Tell us how you are professionally known.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={profileData.identity.fullName} onChange={(val) => updateProfileData('identity', { fullName: val })} required />
              <Input label="Preferred Professional Name" value={profileData.identity.preferredName} onChange={(val) => updateProfileData('identity', { preferredName: val })} />
              <Input label="Current Designation" value={profileData.identity.designation} onChange={(val) => updateProfileData('identity', { designation: val })} required />
              <Input label="Organisation / Chamber / Firm" value={profileData.identity.organization} onChange={(val) => updateProfileData('identity', { organization: val })} />
              <SelectInput 
                label="Country" 
                value={profileData.identity.country} 
                onChange={(val) => updateProfileData('identity', { country: val, city: '' })} 
                options={allCountries}
                required
              />
              <SelectInput 
                label="City" 
                value={profileData.identity.city} 
                onChange={(val) => updateProfileData('identity', { city: val })} 
                options={cities.length > 0 ? cities : ['Please select a country first']}
                required
              />
            </div>
            <ContinueButton onClick={() => handleContinue('identity', 'practice')} />
          </div>
        );

      case 'practice':
        if (selectedTrack === 'firm') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-sm font-light mb-8">Help us understand the nature of your firm's practice.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Primary Practice Areas" value={profileData.practice.primaryPracticeAreas} onChange={(val) => updateProfileData('practice', { primaryPracticeAreas: val })} required />
                <Input label="Secondary Practice Areas" value={profileData.practice.secondaryPracticeAreas} onChange={(val) => updateProfileData('practice', { secondaryPracticeAreas: val })} />
                <Input label="Office Locations" value={profileData.practice.officeLocations} onChange={(val) => updateProfileData('practice', { officeLocations: val })} required />
                <SelectInput 
                  label="Firm Size" 
                  value={profileData.practice.firmSize} 
                  onChange={(val) => updateProfileData('practice', { firmSize: val })} 
                  options={["1 member", "2 - 5 members", "6 - 10 members", "11 - 50 members", "51 - 150 members", "150+ members"]}
                  required
                />
                <Input label="Industries Served" value={profileData.practice.industriesServed} onChange={(val) => updateProfileData('practice', { industriesServed: val })} />
              </div>
              <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
            </div>
          );
        }

        if (selectedTrack === 'media') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-sm font-light mb-8">Detail your organisation's editorial coverage.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Primary Coverage Areas" value={profileData.practice.primaryCoverageAreas} onChange={(val) => updateProfileData('practice', { primaryCoverageAreas: val })} required />
                <Input label="Secondary Coverage Areas" value={profileData.practice.secondaryCoverageAreas} onChange={(val) => updateProfileData('practice', { secondaryCoverageAreas: val })} />
                <Input label="Publication Formats" value={profileData.practice.publicationFormats} onChange={(val) => updateProfileData('practice', { publicationFormats: val })} required />
                <Input label="Geographic Coverage" value={profileData.practice.geographicCoverage} onChange={(val) => updateProfileData('practice', { geographicCoverage: val })} />
                <SelectInput 
                  label="Team Size" 
                  value={profileData.practice.teamSize} 
                  onChange={(val) => updateProfileData('practice', { teamSize: val })} 
                  options={["1 member", "2 - 5 members", "6 - 10 members", "11 - 50 members", "51 - 150 members", "150+ members"]}
                  required
                />
              </div>
              <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
            </div>
          );
        }

        if (selectedTrack === 'innovation') {
          return (
            <div className="space-y-6">
              <p className="text-white/40 text-sm font-light mb-8">Detail your organisation's innovation profile.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Primary Innovation Area" value={profileData.practice.primaryInnovationArea} onChange={(val) => updateProfileData('practice', { primaryInnovationArea: val })} required />
                <Input label="Product / Service Category" value={profileData.practice.productCategory} onChange={(val) => updateProfileData('practice', { productCategory: val })} required />
                <Input label="Practice Areas Served" value={profileData.practice.practiceAreasServed} onChange={(val) => updateProfileData('practice', { practiceAreasServed: val })} required />
                <Input label="Markets Served" value={profileData.practice.marketsServed} onChange={(val) => updateProfileData('practice', { marketsServed: val })} required />
                <SelectInput 
                  label="Organisation Size" 
                  value={profileData.practice.orgSize} 
                  onChange={(val) => updateProfileData('practice', { orgSize: val })} 
                  options={["1 member", "2 - 5 members", "6 - 10 members", "11 - 50 members", "51 - 150 members", "150+ members"]}
                  required
                />
                <Input label="Industry Focus" value={profileData.practice.industryFocus} onChange={(val) => updateProfileData('practice', { industryFocus: val })} />
              </div>
              <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Help us understand the nature of your professional practice.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Primary Practice Area" value={profileData.practice.primaryPracticeAreas} onChange={(val) => updateProfileData('practice', { primaryPracticeAreas: val })} required />
              <Input label="Secondary Practice Areas" value={profileData.practice.secondaryPracticeAreas} onChange={(val) => updateProfileData('practice', { secondaryPracticeAreas: val })} />
              <Input label="Years of Practice" value={profileData.practice.yearsOfPractice} onChange={(val) => updateProfileData('practice', { yearsOfPractice: val })} required />
            </div>
            <ContinueButton onClick={() => handleContinue('practice', 'biography')} />
          </div>
        );

      case 'biography':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Describe your professional journey, areas of expertise and significant contributions to the legal profession.</p>
            <TextArea 
              label="Biography" 
              value={profileData.biography} 
              onChange={(val) => updateProfileData('biography', val)} 
            />
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
              <Input label="Publications" value={profileData.presence.publications} onChange={(val) => updateProfileData('presence', { publications: val })} />
            </div>
            <ContinueButton onClick={() => handleContinue('presence', 'documents')} />
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <p className="text-white/40 text-sm font-light mb-8">Upload supporting documentation for your submission.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload label="Professional Photograph" onUpload={() => updateProfileData('documents', { photoUploaded: true })} uploaded={profileData.documents.photoUploaded} required />
              <FileUpload label="Curriculum Vitae" onUpload={() => updateProfileData('documents', { cvUploaded: true })} uploaded={profileData.documents.cvUploaded} required />
              <FileUpload label="Representative Work" onUpload={() => updateProfileData('documents', { workUploaded: true })} uploaded={profileData.documents.workUploaded} />
              <FileUpload label="Supporting Documents" onUpload={() => updateProfileData('documents', { suppUploaded: true })} uploaded={profileData.documents.suppUploaded} />
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
                  onClick={() => (isCompleted || isPast) && setActiveSection(section.id as SectionKey)}
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
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-t-white/10 border-x-white/[0.03] border-b-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-8 lg:p-10 relative">
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

        {/* Right Side Progress Panel - Made perfectly aligned and styled */}
        <div className="hidden lg:flex w-80 flex-col space-y-6 pt-1">
          <div className="sticky top-32">
            <h4 className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.25em] mb-6 drop-shadow-sm">
              Submission Progress
            </h4>
            <div className="bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full" />
              <div className="space-y-5 relative z-10">
                {sections.map((section, idx) => {
                  const isCompleted = completedSections.includes(section.id) || sections.findIndex(s => s.id === activeSection) > idx;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <div key={section.id} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 ${
                        isActive ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 
                        isCompleted ? 'border-gold-500/40 bg-gold-500/5' : 
                        'border-white/10 bg-transparent'
                      }`}>
                        {isCompleted && !isActive ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                        ) : (
                          <span className={`text-[0.6rem] font-bold ${isActive ? 'text-gold-400' : 'text-white/30'}`}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <span className={`ml-4 text-xs tracking-wider transition-colors duration-500 ${
                        isActive ? 'text-white font-semibold' : 
                        isCompleted ? 'text-white/60' : 
                        'text-white/30'
                      }`}>
                        {section.subtitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Label({ label, required }: { label: string, required?: boolean }) {
  return (
    <label className="text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-gold-500/70 mb-2 pl-1 drop-shadow-sm flex items-center">
      {label}
      {required ? (
        <span className="text-red-500/90 ml-1.5 text-sm leading-none">*</span>
      ) : (
        <span className="text-white/30 ml-2 tracking-[0.1em] font-medium">(OPTIONAL)</span>
      )}
    </label>
  );
}

function Input({ label, value, onChange, required }: { label: string, value: string, onChange: (val: string) => void, required?: boolean }) {
  return (
    <div className="flex flex-col">
      <Label label={label} required={required} />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 shadow-inner"
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options, required }: { label: string, value: string, onChange: (val: string) => void, options: string[], required?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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
      <Label label={label} required={required} />
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
            className="absolute top-[100%] left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 max-h-96 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
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

function TextArea({ label, value, onChange, required }: { label: string, value: string, onChange: (val: string) => void, required?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setIsSaved(false);
    
    // Simulate auto-save
    setTimeout(() => {
      setIsSaved(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col">
      <Label label={label} required={required} />
      <div className="relative">
        <textarea 
          value={value}
          onChange={handleChange}
          rows={10}
          className="w-full bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-lg p-6 text-white text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 resize-none shadow-inner"
        />
        <div className="absolute bottom-4 left-6 flex items-center text-[0.65rem] text-white/30">
          {isSaved ? (
            <span className="flex items-center text-gold-500/70">
              <CheckCircle2 className="w-3 h-3 mr-1.5" /> Auto-saved just now
            </span>
          ) : value ? (
            <span className="flex items-center">
              <Edit2 className="w-3 h-3 mr-1.5 animate-pulse" /> Saving...
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-4 right-6 text-[0.65rem] text-white/30">
          {value.length} characters
        </div>
      </div>
    </div>
  );
}

function FileUpload({ label, onUpload, uploaded, required }: { label: string, onUpload: () => void, uploaded: boolean, required?: boolean }) {
  return (
    <div className="flex flex-col relative">
      <Label label={label} required={required} />
      <div 
        onClick={onUpload}
        className={`mt-1 border border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          uploaded 
            ? 'border-gold-500/40 bg-gold-500/5 hover:bg-gold-500/10' 
            : 'border-white/10 bg-[#111]/40 hover:border-white/30 hover:bg-[#111]/80'
        }`}
      >
        {uploaded ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-gold-400 mb-3" />
            <span className="text-white text-sm font-medium">Document uploaded</span>
            <span className="text-white/40 text-[0.65rem] mt-1">Click to replace</span>
          </>
        ) : (
          <>
            <UploadCloud className="w-6 h-6 text-white/30 mb-3" />
            <span className="text-white/50 text-sm">Click to upload document</span>
          </>
        )}
      </div>
    </div>
  );
}
"""

with open("d:/jurisstandard/src/components/submission/stages/EditorialProfile.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated EditorialProfile.tsx")
