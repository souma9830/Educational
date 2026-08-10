import { create } from 'zustand';

/**
 * Global Live Code Editor State Store
 */
export const useCodeEditorStore = create((set) => ({
  code: '// Technical Assessment Sandbox\nfunction solution() {\n  return true;\n}',
  language: 'javascript',
  version: 0,
  executionOutput: '',
  isRunning: false,
  isConnected: true,

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
  setExecutionOutput: (executionOutput) => set({ executionOutput, isRunning: false }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setIsConnected: (isConnected) => set({ isConnected })
}));

export default useCodeEditorStore;
