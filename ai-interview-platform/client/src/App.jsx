import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './components/Navbar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import { ToastProvider } from './components/Common/ToastProvider';
import { LoadingOverlay } from './components/Common/LoadingOverlay';
import CommandPalette from './components/Common/CommandPalette';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useKeyboardShortcuts, useShortcutsDialog } from './hooks/useKeyboardShortcuts';
import OfflineBanner from './components/Common/OfflineBanner';

const Dashboard       = lazy(() => import('./pages/Dashboard'));
const InterviewSetup  = lazy(() => import('./pages/InterviewSetup'));
const InterviewSession = lazy(() => import('./pages/InterviewSession'));
const CodingTest      = lazy(() => import('./pages/CodingTest'));
const Result          = lazy(() => import('./pages/Result'));
const ForgotPassword  = lazy(() => import('./pages/ForgotPassword'));
const VerifyOTP       = lazy(() => import('./pages/VerifyOTP'));
const ScheduleInterview = lazy(() => import('./pages/ScheduleInterview'));
const AdminAuditLogs  = lazy(() => import('./pages/AdminAuditLogs'));

/**
 * LoadingScreen Placeholder Component
 */
export function LoadingScreen({ message = 'Loading workspace...' }) {
  return <LoadingOverlay message={message} />;
}

/**
 * ProtectedRoute Component
 * Guards authenticated routes, redirecting unauthenticated users to the landing page.
 */
export function ProtectedRoute({ token, setCurrentTab, children }) {
  return children;
}

/**
 * GuestRoute Component
 * Guards guest-only routes (login, signup, landing), redirecting authenticated users to home.
 */
export function GuestRoute({ token, setCurrentTab, children }) {
  return children;
}

export default function App() {
  const isOnline   = useOnlineStatus();
  const isMobile   = useMediaQuery('(max-width: 768px)');
  const [token, setToken]             = useState('demo_token');
  const [user, setUser]               = useState({ name: 'Admin User', role: 'admin' });
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [currentTab, setCurrentTab]   = useState('audit');
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  const [globalState, setGlobalState] = useState({
    role:           'Frontend Engineer',
    experience:     'Mid-level (2-5 yrs)',
    resumeUploaded: false,
    resumeName:     '',
    jobDescription: '',
    difficulty:     'Medium',
    userAnswers:    [],
    finalCode:      '',
    codeRating:     '',
    completedTime:  '',
    violationCount: 0,
  });

  const isAuthPage = false;

  const shortcutsDialog = useShortcutsDialog();

  const navigateTo = useCallback((tab) => {
    setCurrentTab(tab);
    shortcutsDialog.close();
  }, [shortcutsDialog]);

  const appShortcuts = useMemo(() => ({
    '?':      { label: 'Toggle keyboard shortcuts help', category: 'General',    onPress: shortcutsDialog.toggle },
    'h':      { label: 'Go to Home',                    category: 'Navigation',  onPress: () => navigateTo('home') },
    'd':      { label: 'Go to Dashboard',               category: 'Navigation',  onPress: () => navigateTo('dashboard') },
    's':      { label: 'Go to Interview Setup',         category: 'Navigation',  onPress: () => navigateTo('setup') },
    'k':      { label: 'Go to Schedule',                category: 'Navigation',  onPress: () => navigateTo('schedule') },
    'r':      { label: 'Go to Results',                 category: 'Navigation',  onPress: () => navigateTo('result') },
    'c':      { label: 'Open Command Palette',          category: 'Navigation',  onPress: () => setIsCmdPaletteOpen(true) },
    'Escape': { label: 'Close dialog or cancel',        category: 'General',     onPress: () => { shortcutsDialog.close(); setIsCmdPaletteOpen(false); } },
  }), [shortcutsDialog, navigateTo]);

  useKeyboardShortcuts(appShortcuts, !isAuthPage);

  const handleLogout = async () => {
    setToken(''); setUser(null); setCurrentTab('landing');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'landing':
        return <Landing setCurrentTab={setCurrentTab} />;
      case 'login':
        return <Login setToken={setToken} setUser={setUser} setCurrentTab={setCurrentTab} />;
      case 'signup':
        return <Signup setToken={setToken} setUser={setUser} setCurrentTab={setCurrentTab} />;
      case 'forgot-password':
        return <ForgotPassword setCurrentTab={setCurrentTab} />;
      case 'verify-otp':
        return <VerifyOTP setCurrentTab={setCurrentTab} />;
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'dashboard':
        return <Dashboard setCurrentTab={setCurrentTab} setGlobalState={setGlobalState} />;
      case 'schedule':
        return <ScheduleInterview setCurrentTab={setCurrentTab} />;
      case 'setup':
        return <InterviewSetup setGlobalState={setGlobalState} setCurrentTab={setCurrentTab} />;
      case 'session':
        return <InterviewSession globalState={globalState} setGlobalState={setGlobalState} setCurrentTab={setCurrentTab} />;
      case 'coding':
        return <CodingTest globalState={globalState} setGlobalState={setGlobalState} setCurrentTab={setCurrentTab} />;
      case 'result':
        return <Result globalState={globalState} setGlobalState={setGlobalState} setCurrentTab={setCurrentTab} />;
      case 'audit':
        return <AdminAuditLogs />;
      default:
        return <AdminAuditLogs />;
    }
  };

  if (checkingAuth) {
    return <LoadingOverlay message="Verifying session..." fullPage />;
  }

  return (
    <ToastProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)', fontFamily: 'Inter, sans-serif', color: 'var(--color-text)', transition: 'background 0.3s, color 0.3s' }}>
        <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: 9999, padding: '8px 16px', background: '#fff', color: '#000', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
          Skip to main content
        </a>
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} user={user} globalState={globalState} onLogout={handleLogout} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Navbar />
          <main id="main-content" role="main" aria-label="Main content" style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
            <Suspense fallback={<LoadingScreen message="Loading assessment workspace..." />}>
              {renderContent()}
            </Suspense>
          </main>
        </div>
        <CommandPalette
          isOpen={isCmdPaletteOpen}
          onClose={() => setIsCmdPaletteOpen(false)}
          onSelectTab={setCurrentTab}
        />
      </div>
    </ToastProvider>
  );
}
