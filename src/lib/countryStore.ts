import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CountryState {
  selectedCountry: string;
  hasAutoDetected: boolean;
  setCountry: (country: string) => void;
  setAutoDetected: (val: boolean) => void;
}

export const useCountryStore = create<CountryState>()(
  persist(
    (set) => ({
      selectedCountry: 'Global', 
      hasAutoDetected: false,
      setCountry: (country) => set({ selectedCountry: country }),
      setAutoDetected: (val) => set({ hasAutoDetected: val }),
    }),
    {
      name: 'juris-country-storage',
    }
  )
);
