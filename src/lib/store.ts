import { create } from 'zustand';

interface AppState {
  isGlobeLoaded: boolean;
  setGlobeLoaded: (loaded: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isGlobeLoaded: false,
  setGlobeLoaded: (loaded) => set({ isGlobeLoaded: loaded }),
}));
