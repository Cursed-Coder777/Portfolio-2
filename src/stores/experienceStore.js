// Global experience state (Zustand).
//
// Controls the loading → ready lifecycle:
//   isExperienceReady:  false → true when user clicks "Enter"
//   loadedChunks:       incremented by Scene's ChunkTracker as each
//                       Suspense group of models finishes loading
//   totalChunks:        4 (hardcoded to match the Suspense groups in Scene)

import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  loadedChunks: 0,
  totalChunks: 4,

  setIsExperienceReady: () => set({ isExperienceReady: true }),
  incrementLoadedChunks: () =>
    set((state) => ({ loadedChunks: state.loadedChunks + 1 })),
}));
