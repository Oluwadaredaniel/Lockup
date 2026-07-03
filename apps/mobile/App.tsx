import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { FocusSessionSetupScreen } from './src/screens/FocusSessionSetupScreen';
import { ActiveFocusScreen } from './src/screens/ActiveFocusScreen';
import { SessionCompletionScreen } from './src/screens/SessionCompletionScreen';

type AppState = 'onboarding' | 'login' | 'signup' | 'dashboard' | 'focus_setup' | 'active_focus' | 'session_complete';

const Main = () => {
  const { theme } = useTheme();
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [currentSession, setCurrentSession] = useState<any>(null);

  const renderScreen = () => {
    switch (appState) {
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
        return <DashboardScreen onStartSession={() => setAppState('focus_setup')} />;
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
          />
        );
      case 'session_complete':
        return (
          <SessionCompletionScreen
            sessionData={currentSession}
            onContinue={() => setAppState('dashboard')}
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
      <Main />
    </ThemeProvider>
  );
}
