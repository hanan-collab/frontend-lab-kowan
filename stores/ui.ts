import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UIState = {
  theme: 'dark' | 'light' | 'system';
  setTheme: (t: UIState['theme']) => void;
};

export const useUI = create<UIState>()(
  persist(
    set => ({
      theme: 'dark',
      setTheme: t => set({ theme: t }),
    }),
    { name: 'ui-pref' }
  )
);
