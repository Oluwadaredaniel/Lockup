import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { G, Circle, Path, Rect, Ellipse, Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  state?: 'focus' | 'idle' | 'alert' | 'disappointed';
  size?: number;
  animate?: boolean;
}

const AnimatedG = Animated.createAnimatedComponent(G);

export const GuardianBear: React.FC<Props> = ({ state = 'focus', size = 300, animate = true }) => {
  const { theme } = useTheme();
  const breatheAnim = useRef(new Animated.Value(0)).current;
  const stateFadeAnim = useRef(new Animated.Value(1)).current;
  const prevState = useRef(state);

  useEffect(() => {
    if (prevState.current !== state) {
      stateFadeAnim.setValue(0);
      Animated.timing(stateFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      prevState.current = state;
    }
  }, [state]);

  useEffect(() => {
    if (animate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(breatheAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      breatheAnim.setValue(0);
    }
  }, [animate]);

  const scale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  });

  const opacity = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // Theme-specific tokens
  const furColor = theme === 'light' ? '#211C17' : '#F4EEE2';
  const furDeepColor = theme === 'light' ? '#38312A' : '#DCD3BF';
  const contrastColor = theme === 'light' ? '#F4EEE2' : '#14131C';
  const visorColor = theme === 'light' ? '#5B5FEF' : '#7B80FF';
  const noseColor = theme === 'light' ? '#0F0D0B' : '#F4EEE2';

  return (
    <Svg
      width={size}
      height={(size * 440) / 400}
      viewBox="0 0 400 440"
      fill="none"
    >
      <Defs>
        <Filter id="visor-glow" x="-60%" y="-60%" width="220%" height="220%">
          <FeGaussianBlur stdDeviation="6" />
          <FeMerge>
            <FeMergeNode />
            <FeMergeNode in="SourceGraphic" />
          </FeMerge>
        </Filter>
      </Defs>

      <AnimatedG
        id="guardian-bear-mascot"
        style={{
          transform: [{ scale }],
        }}
      >
        <G id="bear-ears">
          <Circle cx="128" cy="80" r="40" fill={furColor} />
          <Circle cx="272" cy="80" r="40" fill={furColor} />
          <Circle cx="128" cy="86" r="19" fill={furDeepColor} />
          <Circle cx="272" cy="86" r="19" fill={furDeepColor} />
        </G>

        <G id="bear-body">
          <Path
            d="M120,300 C120,268 152,252 200,252 C248,252 280,268 280,300 L300,398 C300,424 272,440 200,440 C128,440 100,424 100,398 Z"
            fill={furColor}
          />
          <G id="chest-emblem">
            <Path d="M200,332 L224,343 L224,373 C224,395 212,408 200,414 C188,408 176,395 176,373 L176,343 Z" fill={contrastColor} />
            <Path d="M192,364 a8,8 0 0 1 16,0 v6 h-16 z" fill="none" stroke={noseColor} strokeWidth="3.5" />
            <Rect x="188" y="370" width="24" height="18" rx="3.5" fill={noseColor} />
          </G>
        </G>

        <G id="bear-head">
          <Rect x="90" y="60" width="220" height="220" rx="64" fill={furColor} />

          <AnimatedG
            id="bear-visor"
            filter="url(#visor-glow)"
            style={{
              opacity: state === 'focus'
                ? Animated.multiply(opacity, stateFadeAnim)
                : stateFadeAnim
            }}
          >
            {state === 'focus' && (
              <G id="visor-focus">
                <Rect x="112" y="150" width="66" height="42" rx="21" fill={visorColor} />
                <Rect x="222" y="150" width="66" height="42" rx="21" fill={visorColor} />
                <Rect x="178" y="163" width="44" height="14" rx="7" fill={visorColor} />
              </G>
            )}
            {state === 'idle' && (
              <G id="visor-idle">
                <Rect x="124" y="167" width="52" height="9" rx="4.5" fill={visorColor} opacity={0.65} />
                <Rect x="224" y="167" width="52" height="9" rx="4.5" fill={visorColor} opacity={0.65} />
                <Rect x="178" y="167" width="44" height="9" rx="4.5" fill={visorColor} opacity={0.35} />
              </G>
            )}
            {state === 'alert' && (
              <G id="visor-alert">
                <Rect x="108" y="146" width="74" height="50" rx="25" fill={visorColor} />
                <Rect x="218" y="146" width="74" height="50" rx="25" fill={visorColor} />
                <Rect x="176" y="163" width="48" height="16" rx="8" fill={visorColor} />
              </G>
            )}
            {state === 'disappointed' && (
              <G id="visor-disappointed">
                <Path d="M112,185 Q145,170 178,185" stroke={visorColor} strokeWidth="6" strokeLinecap="round" opacity={0.5} />
                <Path d="M222,185 Q255,170 288,185" stroke={visorColor} strokeWidth="6" strokeLinecap="round" opacity={0.5} />
              </G>
            )}
          </AnimatedG>

          <G id="bear-snout">
            <Ellipse cx="200" cy="252" rx="54" ry="40" fill={contrastColor} />
            <Rect x="186" y="216" width="28" height="18" rx="9" fill={noseColor} />
          </G>
        </G>
      </AnimatedG>
    </Svg>
  );
};
