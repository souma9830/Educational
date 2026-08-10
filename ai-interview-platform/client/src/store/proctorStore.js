import { create } from 'zustand';

/**
 * Global Proctoring & Anti-Spoofing State Store
 */
export const useProctorStore = create((set) => ({
  gazeStatus: 'Normal Gaze Center',
  livenessVerified: true,
  violations: [],
  totalFlags: 0,

  setGazeStatus: (gazeStatus) => set({ gazeStatus }),
  addViolation: (violation) => set((state) => ({
    violations: [violation, ...state.violations],
    totalFlags: state.totalFlags + 1
  })),
  clearViolations: () => set({ violations: [], totalFlags: 0 })
}));

export default useProctorStore;
