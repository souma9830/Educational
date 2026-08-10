import { create } from 'zustand';

/**
 * Global Interview Session & Real-Time Event State Store
 */
export const useInterviewStore = create((set) => ({
  interviewId: null,
  candidateName: 'Alex Mercer',
  stage: 'lobby', // 'lobby' | 'in_progress' | 'completed'
  proctorAlertsCount: 0,
  wpm: 135,
  confidenceScore: 92,

  setStage: (stage) => set({ stage }),
  addProctorAlert: () => set((state) => ({ proctorAlertsCount: state.proctorAlertsCount + 1 })),
  updateSpeechMetrics: (wpm, confidenceScore) => set({ wpm, confidenceScore }),
  resetSession: () => set({ stage: 'lobby', proctorAlertsCount: 0 })
}));

export default useInterviewStore;
