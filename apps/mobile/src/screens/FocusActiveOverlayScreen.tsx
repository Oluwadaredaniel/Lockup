import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';

const { width } = Dimensions.get('window');

interface Props {
  onReturnToApp: () => void;
  appName?: string;
}

export const FocusActiveOverlayScreen: React.FC<Props> = ({ onReturnToApp, appName = "this app" }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const secondaryTextColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <GuardianBear state="alert" size={260} />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>Focus Session Active</Text>
          <Text style={[styles.subtitle, { color: secondaryTextColor }]}>
            The Sentinel is guarding your time. Access to <Text style={styles.appName}>{appName}</Text> is restricted until your session ends.
          </Text>
        </View>

        <View style={styles.timerPreview}>
          <Text style={styles.timerLabel}>TIME REMAINING</Text>
          <Text style={[styles.timerValue, { color: textColor }]}>42:18</Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={onReturnToApp}
          >
            <Text style={styles.primaryButtonText}>Return to LockUp</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Discipline is built through resistance.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  mascotContainer: {
    marginBottom: 40,
    // Add a subtle glow behind the alert state mascot
    shadowColor: '#7B80FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  appName: {
    fontWeight: '800',
    color: '#7C3AED',
  },
  timerPreview: {
    alignItems: 'center',
    marginBottom: 64,
  },
  timerLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 2,
    marginBottom: 8,
  },
  timerValue: {
    fontSize: 48,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  disclaimer: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
