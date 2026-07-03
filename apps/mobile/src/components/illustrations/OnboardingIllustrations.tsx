import React from 'react';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

interface IllustrationProps {
  size?: number;
}

export const FocusIllustration: React.FC<IllustrationProps> = ({ size = 300 }) => {
  const { theme } = useTheme();
  const bearColor = theme === 'light' ? '#211C17' : '#F4EEE2';
  const accentColor = '#8B5CF6';

  return (
    <Svg width={size} height={size} viewBox="0 0 400 400" fill="none">
      <Circle cx="200" cy="200" r="160" stroke={accentColor} strokeWidth="1" strokeDasharray="10 10" opacity="0.2" />
      <Circle cx="200" cy="120" r="40" stroke={accentColor} strokeWidth="4" />
      <Path d="M200 100V120L215 130" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
      <Path d="M140 220C140 197.909 157.909 180 180 180H220C242.091 180 260 197.909 260 220V320C260 336.569 246.569 350 230 350H170C153.431 350 140 336.569 140 320V220Z" fill={bearColor} />
      <Rect x="160" y="215" width="80" height="15" rx="4" fill="#5B5FEF" />
    </Svg>
  );
};

export const LockIllustration: React.FC<IllustrationProps> = ({ size = 300 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 400 400" fill="none">
      <Path d="M100 200L125 180L150 200V230L125 250L100 230V200Z" fill="#C4B5FD" opacity="0.4" />
      <Path d="M175 180L210 155L245 180V225L210 255L175 225V180Z" fill="#8B5CF6" opacity="0.7" />
      <Path d="M270 160L320 125L370 160V220L320 260L270 220V160Z" fill="#5B5FEF" />
      <Path d="M310 185 a10,10 0 0 1 20,0 v10 h-20 z" fill="none" stroke="white" strokeWidth="3" />
      <Rect x="305" y="195" width="30" height="20" rx="4" fill="white" />
    </Svg>
  );
};

export const RewardIllustration: React.FC<IllustrationProps> = ({ size = 300 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 400 400" fill="none">
      <Path d="M200 100C200 100 260 180 260 250C260 283.137 233.137 310 200 310C166.863 310 140 283.137 140 250C140 180 200 100 200 100Z" fill="#F59E0B" />
      <Path d="M200 160C200 160 230 210 230 250C230 266.569 216.569 280 200 280C183.431 280 170 266.569 170 250C170 210 200 160 200 160Z" fill="#FBBF24" />
      <Path d="M100 150L105 165L120 170L105 175L100 190L95 175L80 170L95 165L100 150Z" fill="#8B5CF6" />
      <Path d="M300 200L308 222L330 230L308 238L300 260L292 238L270 230L292 222L300 200Z" fill="#8B5CF6" />
    </Svg>
  );
};
