import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget =
    env.VITE_API_URL ||
    env.VITE_API_TARGET ||
    process.env.VITE_API_URL ||
    process.env.VITE_API_TARGET ||
    'http://localhost:5000';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('@monaco-editor') || id.includes('monaco-editor')) {
                return 'monaco-vendor';
              }
              if (id.includes('recharts')) {
                return 'recharts-vendor';
              }
              if (id.includes('firebase')) {
                return 'firebase-vendor';
              }
              if (id.includes('jspdf')) {
                return 'jspdf-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      host: true,
      port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
