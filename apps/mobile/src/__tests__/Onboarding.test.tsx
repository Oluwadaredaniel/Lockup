import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ThemeProvider } from '../context/ThemeContext';

describe('Onboarding Flow', () => {
  it('displays the first slide on launch', () => {
    const { getByText } = render(
      <ThemeProvider>
        <OnboardingScreen onComplete={() => {}} />
      </ThemeProvider>
    );
    expect(getByText('Protect Your Focus')).toBeTruthy();
  });

  it('triggers onComplete when the final slide is finished', () => {
    const onCompleteMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <OnboardingScreen onComplete={onCompleteMock} />
      </ThemeProvider>
    );

    // We have 3 slides. Tap "Next" twice, then "Get Started" once.
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Get Started'));

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
