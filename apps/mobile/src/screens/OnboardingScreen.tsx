import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FocusIllustration, LockIllustration, RewardIllustration } from '../components/illustrations/OnboardingIllustrations';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Protect Your Focus',
    description: 'Commit to sessions and block distractions. Build an unshakeable identity of concentration.',
    Illustration: FocusIllustration,
  },
  {
    id: '2',
    title: 'Intentional Friction',
    description: 'Choose your lock level. The stricter the mode, the stronger the discipline built.',
    Illustration: LockIllustration,
  },
  {
    id: '3',
    title: 'Earn Your Progress',
    description: 'Track XP, maintain streaks, and watch your Discipline Score grow as you stay consistent.',
    Illustration: RewardIllustration,
  },
];

export const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { theme } = useTheme();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const isLastSlide = currentSlideIndex === SLIDES.length - 1;

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isLastSlide) {
      onComplete();
    } else {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    }
  };

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (index !== currentSlideIndex) {
      setCurrentSlideIndex(index);
      Haptics.selectionAsync();
    }
  };

  const bgColor = theme === 'light' ? '#FAF8FF' : '#0F172A';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.illustrationContainer}>
              <item.Illustration size={300} />
            </View>
            <View style={styles.textContainer}>
              <Typography variant="h2" weight="black" textAlign="center" style={{ marginBottom: 16 }}>
                {item.title}
              </Typography>
              <Typography variant="body" color="#64748B" textAlign="center" style={{ lineHeight: 24 }}>
                {item.description}
              </Typography>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === currentSlideIndex ? '#7C3AED' : '#E5E7EB' },
                index === currentSlideIndex && { width: 24 },
              ]}
            />
          ))}
        </View>

        <Button
          title={isLastSlide ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  illustrationContainer: {
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
