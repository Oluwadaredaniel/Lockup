import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';

type AppState = 'onboarding' | 'auth' | 'dashboard';

const Main = () => {
  const { theme } = useTheme();
  const [appState, setAppState] = useState<AppState>('onboarding');

  const renderScreen = () => {
    switch (appState) {
      case 'onboarding':
        return <OnboardingScreen onComplete={() => setAppState('auth')} />;
      case 'auth':
        return <LoginScreen onLogin={() => setAppState('dashboard')} onSignUp={() => {}} />;
      case 'dashboard':
        return <DashboardScreen />;
      default:
        return <OnboardingScreen onComplete={() => setAppState('auth')} />;
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
