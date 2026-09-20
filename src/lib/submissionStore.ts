import { create } from 'zustand';

export type Stage = 
  | 'welcome' 
  | 'track_selection' 
  | 'programme_selection' 
  | 'editorial_profile' 
  | 'review' 
  | 'confirmation';

export const STAGE_ORDER: Stage[] = [
  'welcome',
  'track_selection',
  'programme_selection',
  'editorial_profile',
  'review',
  'confirmation'
];

export type Track = 'law_firm_excellence' | 'corporate_elite' | 'litigation_masters' | 'women_leaders' | 'future_leaders' | 'legal_innovation' | null;

export interface ProfileData {
  identity: {
    fullName: string;
    email: string;
    mobile: string;
    designation: string;
    organization: string;
    city: string;
    state: string;
    country: string;
    firmName: string;
    managingPartner: string;
    yearEstablished: string;
    hqCountry: string;
    hqCity: string;
    orgName: string;
    editorInChief: string;
    founderCeo: string;
  };
  practice: {
    primaryPractice: string;
    secondaryPractices: string;
    yearsOfPractice: string;
    industries: string;
    jurisdiction: string;
    memberships: string;
    primaryPracticeAreas: string;
    secondaryPracticeAreas: string;
    officeLocations: string;
    firmSize: string;
    industriesServed: string;
    primaryCoverageAreas: string;
    secondaryCoverageAreas: string;
    publicationFormats: string;
    geographicCoverage: string;
    teamSize: string;
    productCategory: string;
    practiceAreasServed: string;
    marketsServed: string;
    orgSize: string;
    industryFocus: string;
    primaryInnovationArea: string;
  };
  biography: {
    bio: string;
    firmHistory: string;
    publicationPhilosophy: string;
    companyInnovation: string;
  };
  presence: {
    website: string;
    linkedin: string;
    profileUrl: string;
    publications: string;
    firmProfile: string;
    publicationsInsights: string;
    digitalPublication: string;
    newsletterPodcast: string;
    productPage: string;
    caseStudies: string;
  };
  documents: {
    photoUploaded: boolean;
    cvUploaded: boolean;
    workUploaded: boolean;
    pubsUploaded: boolean;
    suppUploaded: boolean;
    logoUploaded: boolean;
    brochureUploaded: boolean;
    mattersUploaded: boolean;
    mediaKitUploaded: boolean;
    samplePubsUploaded: boolean;
    companyProfileUploaded: boolean;
    productBrochureUploaded: boolean;
  };
}

interface SubmissionState {
  currentStage: Stage;
  isNavigatingBack: boolean;
  selectedTrack: Track;
  selectedPracticeAreas: string[];
  primaryPracticeArea: string | null;
  otherPracticeArea: string;
  selectedProgramme: string | null;
  profileData: ProfileData;
  completedSections: string[];
  setStage: (stage: Stage) => void;
  setTrack: (track: Track) => void;
  setPracticeAreas: (areas: string[]) => void;
  setPrimaryPracticeArea: (area: string | null) => void;
  setOtherPracticeArea: (value: string) => void;
  setSelectedProgramme: (programme: string | null) => void;
  updateProfileData: (section: keyof ProfileData, data: Partial<ProfileData[keyof ProfileData]>) => void;
  markSectionCompleted: (section: string) => void;
  reset: () => void;
}

const initialProfileData: ProfileData = {
  identity: { 
    fullName: '', email: '', mobile: '', designation: '', organization: '', city: '', state: '', country: '',
    firmName: '', managingPartner: '', yearEstablished: '', hqCountry: '', hqCity: '',
    orgName: '', editorInChief: '', founderCeo: ''
  },
  practice: { 
    primaryPractice: '', secondaryPractices: '', yearsOfPractice: '', industries: '', jurisdiction: '', memberships: '',
    primaryPracticeAreas: '', secondaryPracticeAreas: '', officeLocations: '', firmSize: '', industriesServed: '',
    primaryCoverageAreas: '', secondaryCoverageAreas: '', publicationFormats: '', geographicCoverage: '', teamSize: '',
    productCategory: '', practiceAreasServed: '', marketsServed: '', orgSize: '', industryFocus: '', primaryInnovationArea: ''
  },
  biography: { 
    bio: '', firmHistory: '', publicationPhilosophy: '', companyInnovation: '' 
  },
  presence: { 
    website: '', linkedin: '', profileUrl: '', publications: '',
    firmProfile: '', publicationsInsights: '',
    digitalPublication: '', newsletterPodcast: '',
    productPage: '', caseStudies: ''
  },
  documents: { 
    photoUploaded: false, cvUploaded: false, workUploaded: false, pubsUploaded: false, suppUploaded: false,
    logoUploaded: false, brochureUploaded: false, mattersUploaded: false,
    mediaKitUploaded: false, samplePubsUploaded: false,
    companyProfileUploaded: false, productBrochureUploaded: false
  },
};

export const useSubmissionStore = create<SubmissionState>((set) => ({
  currentStage: 'welcome',
  isNavigatingBack: false,
  selectedTrack: null,
  selectedPracticeAreas: [],
  primaryPracticeArea: null,
  otherPracticeArea: '',
  selectedProgramme: null,
  profileData: initialProfileData,
  completedSections: [],
  setStage: (stage) => set((state) => {
    const currentIndex = STAGE_ORDER.indexOf(state.currentStage);
    const nextIndex = STAGE_ORDER.indexOf(stage);
    return { 
      currentStage: stage,
      isNavigatingBack: nextIndex < currentIndex
    };
  }),
  setTrack: (track) => set({ selectedTrack: track }),
  setPracticeAreas: (areas) => set({ selectedPracticeAreas: areas }),
  setPrimaryPracticeArea: (area) => set({ primaryPracticeArea: area }),
  setOtherPracticeArea: (value) => set({ otherPracticeArea: value }),
  setSelectedProgramme: (programme) => set({ selectedProgramme: programme }),
  updateProfileData: (section, data) => 
    set((state) => ({
      profileData: {
        ...state.profileData,
        [section]: { ...state.profileData[section], ...data }
      }
    })),
  markSectionCompleted: (section) => 
    set((state) => ({
      completedSections: state.completedSections.includes(section) 
        ? state.completedSections 
        : [...state.completedSections, section]
    })),
  reset: () => set({
    currentStage: 'welcome',
    isNavigatingBack: false,
    selectedTrack: null,
    selectedProgramme: null,
    profileData: initialProfileData,
    completedSections: []
  })
}));
