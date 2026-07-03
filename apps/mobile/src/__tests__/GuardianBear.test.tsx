import React from 'react';
import render from 'react-test-renderer';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { ThemeProvider } from '../context/ThemeContext';

describe('GuardianBear Mascot', () => {
  it('renders correctly in focus state', () => {
    const tree = render.create(
      <ThemeProvider>
        <GuardianBear state="focus" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly in alert state', () => {
    const tree = render.create(
      <ThemeProvider>
        <GuardianBear state="alert" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
