import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignupScreen } from './src/screens/SignupScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';

type AppState = 'onboarding' | 'login' | 'signup' | 'dashboard';

const Main = () => {
  const { theme } = useTheme();
  const [appState, setAppState] = useState<AppState>('onboarding');

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
        return <DashboardScreen />;
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
