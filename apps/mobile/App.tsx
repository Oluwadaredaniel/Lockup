import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import { useAuth } from './src/hooks/useAuth';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { FocusSessionSetupScreen } from './src/screens/FocusSessionSetupScreen';
import { ActiveFocusScreen } from './src/screens/ActiveFocusScreen';
import { SessionCompletionScreen } from './src/screens/SessionCompletionScreen';
import { ShareProgressScreen } from './src/screens/ShareProgressScreen';
import { AchievementsGalleryScreen } from './src/screens/AchievementsGalleryScreen';
import { XPHistoryScreen } from './src/screens/XPHistoryScreen';
import { FocusActiveOverlayScreen } from './src/screens/FocusActiveOverlayScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { ErrorState } from './src/components/feedback/ErrorState';

type AppState = 'splash' | 'onboarding' | 'login' | 'signup' | 'dashboard' | 'focus_setup' | 'active_focus' | 'session_complete' | 'share' | 'achievements' | 'xp_history' | 'focus_overlay' | 'profile' | 'error';

const Main = () => {
  const { theme } = useTheme();
  const { user: authUser, loading: authLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>('splash');
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [lastError, setLastError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!authLoading) {
      if (authUser && (appState === 'login' || appState === 'signup')) {
        setAppState('dashboard');
      } else if (!authUser && appState === 'dashboard') {
        setAppState('login');
      }
    }
  }, [authUser, authLoading]);

  const renderScreen = () => {
    if (appState === 'error') {
      return (
        <ErrorState
          error={lastError}
          onRetry={() => setAppState('dashboard')}
          onBack={() => setAppState('login')}
        />
      );
    }

    switch (appState) {
      case 'splash':
        return <SplashScreen onFinish={() => setAppState('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setAppState('login')} />;
      case 'login':
        return (
          <LoginScreen
            onLogin={() => setAppState('dashboard')}
            onSignUp={() => setAppState('signup')}
          />
        );
      case 'signup':
        return (
          <SignupScreen
            onLogin={() => setAppState('login')}
            onSignUpComplete={() => setAppState('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen
            onStartSession={() => setAppState('focus_setup')}
            onShare={() => setAppState('share')}
            onViewAchievements={() => setAppState('achievements')}
            onViewXP={() => setAppState('xp_history')}
            onViewProfile={() => setAppState('profile')}
          />
        );
      case 'focus_setup':
        return (
          <FocusSessionSetupScreen
            onBack={() => setAppState('dashboard')}
            onStart={(data) => {
              setCurrentSession(data);
              setAppState('active_focus');
            }}
          />
        );
      case 'active_focus':
        return (
          <ActiveFocusScreen
            sessionData={currentSession}
            onComplete={() => setAppState('session_complete')}
            onAbandon={() => setAppState('dashboard')}
            onSimulateDistraction={() => setAppState('focus_overlay')}
          />
        );
      case 'session_complete':
        return (
          <SessionCompletionScreen
            sessionData={currentSession}
            onContinue={() => setAppState('dashboard')}
          />
        );
      case 'share':
        return <ShareProgressScreen onBack={() => setAppState('dashboard')} />;
      case 'achievements':
        return <AchievementsGalleryScreen onBack={() => setAppState('dashboard')} />;
      case 'xp_history':
        return <XPHistoryScreen onBack={() => setAppState('dashboard')} />;
      case 'focus_overlay':
        return <FocusActiveOverlayScreen onReturnToApp={() => setAppState('active_focus')} appName="Instagram" />;
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => setAppState('dashboard')}
            onLogout={() => setAppState('login')}
          />
        );
      default:
        return <OnboardingScreen onComplete={() => setAppState('login')} />;
    }
  };

  return (
    <>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {renderScreen()}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Main />
      </UserProvider>
    </ThemeProvider>
  );
}
