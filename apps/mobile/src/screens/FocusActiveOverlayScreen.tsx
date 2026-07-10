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
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

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
          <Typography variant="h1" weight="black" textAlign="center">Focus Session Active</Typography>
          <Typography variant="body" color={secondaryTextColor} textAlign="center" style={{ marginTop: 16, paddingHorizontal: 20 }}>
            The Sentinel is guarding your time. Access to <Text style={styles.appName}>{appName}</Text> is restricted until your session ends.
          </Typography>
        </View>

        <View style={styles.timerPreview}>
          <Typography variant="label" color="#94A3B8">TIME REMAINING</Typography>
          <Typography variant="h1" weight="black" style={{ fontSize: 48 }}>42:18</Typography>
        </View>

        <View style={styles.footer}>
          <Button
            title="Return to LockUp"
            onPress={onReturnToApp}
            size="large"
            style={{ width: '100%' }}
          />
          <Typography variant="caption" style={{ fontStyle: 'italic' }}>
            Discipline is built through resistance.
          </Typography>
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
