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

export type Track = 'professional' | 'firm' | 'media' | 'innovation' | null;

export interface ProfileData {
  identity: {
    fullName: string;
    preferredName: string;
    designation: string;
    organization: string;
    city: string;
    state: string;
    country: string;
  };
  practice: {
    primaryPractice: string;
    secondaryPractices: string;
    yearsOfPractice: string;
    industries: string;
    jurisdiction: string;
    memberships: string;
  };
  biography: {
    bio: string;
  };
  presence: {
    website: string;
    linkedin: string;
    profileUrl: string;
    publications: string;
  };
  documents: {
    photoUploaded: boolean;
    cvUploaded: boolean;
    workUploaded: boolean;
    pubsUploaded: boolean;
    suppUploaded: boolean;
  };
}

interface SubmissionState {
  currentStage: Stage;
  isNavigatingBack: boolean;
  selectedTrack: Track;
  selectedPracticeAreas: string[];
  primaryPracticeArea: string | null;
  otherPracticeArea: string;
  profileData: ProfileData;
  completedSections: string[];
  setStage: (stage: Stage) => void;
  setTrack: (track: Track) => void;
  setPracticeAreas: (areas: string[]) => void;
  setPrimaryPracticeArea: (area: string | null) => void;
  setOtherPracticeArea: (value: string) => void;
  updateProfileData: (section: keyof ProfileData, data: Partial<ProfileData[keyof ProfileData]>) => void;
  markSectionCompleted: (section: string) => void;
  reset: () => void;
}

const initialProfileData: ProfileData = {
  identity: { fullName: '', preferredName: '', designation: '', organization: '', city: '', state: '', country: '' },
  practice: { primaryPractice: '', secondaryPractices: '', yearsOfPractice: '', industries: '', jurisdiction: '', memberships: '' },
  biography: { bio: '' },
  presence: { website: '', linkedin: '', profileUrl: '', publications: '' },
  documents: { photoUploaded: false, cvUploaded: false, workUploaded: false, pubsUploaded: false, suppUploaded: false },
};

export const useSubmissionStore = create<SubmissionState>((set) => ({
  currentStage: 'welcome',
  isNavigatingBack: false,
  selectedTrack: null,
  selectedPracticeAreas: [],
  primaryPracticeArea: null,
  otherPracticeArea: '',
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
