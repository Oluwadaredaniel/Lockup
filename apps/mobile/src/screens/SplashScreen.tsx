import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from '../components/ui/Typography';

const { width } = Dimensions.get('window');

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../../assets/guardian_bear_3d.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Typography variant="h1" weight="black" style={{ letterSpacing: 8 }}>
          LOCKUP
        </Typography>
        <Typography variant="label" weight="black" color="#7C3AED" style={{ letterSpacing: 4, marginTop: 8 }}>
          DISCIPLINE BEATS MOTIVATION
        </Typography>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 8,
  },
});
