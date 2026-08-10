import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const env = import.meta.env || {};

const rawApiKey = env.VITE_FIREBASE_API_KEY;
const isConfigured = Boolean(rawApiKey && !rawApiKey.startsWith('dummy-'));

if (!isConfigured) {
  const isDev = env.DEV || env.MODE === 'development';
  if (isDev) {
    console.warn(
      '[Firebase] Warning: VITE_FIREBASE_API_KEY is missing or set to a dummy fallback value. Firebase Auth will operate in demo mode.'
    );
  } else {
    console.error(
      '[Firebase] Critical Error: VITE_FIREBASE_API_KEY is not configured for this environment. Authentication requests may fail.'
    );
  }
}

const firebaseConfig = {
  apiKey: rawApiKey || 'dummy-key',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'dummy-domain',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'dummy-bucket',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'dummy-sender',
  appId: env.VITE_FIREBASE_APP_ID || 'dummy-app',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'dummy-measurement',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const isFirebaseConfigured = () => isConfigured;

export default app;
