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
  const secondaryTextColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#020617' : '#7C3AED' }]}>
      <View style={styles.content}>
        <View style={styles.mascotContainer}>
          <GuardianBear state="alert" size={260} />
        </View>

        <View style={styles.textContainer}>
          <Typography variant="h1" weight="black" color="white" textAlign="center">RESTRICTED</Typography>
          <Typography variant="body" color="rgba(255,255,255,0.8)" weight="bold" textAlign="center" style={{ marginTop: 16, paddingHorizontal: 20 }}>
            The Guardian noticed you tried to access <Text style={styles.appName}>{appName}</Text>. Your focus session is still active.
          </Typography>
        </View>

        <View style={styles.timerPreview}>
          <Typography variant="label" color="rgba(255,255,255,0.6)" weight="black">SESSION ACTIVE</Typography>
          <Typography variant="h1" weight="black" color="white" style={{ fontSize: 48 }}>DISCIPLINE FIRST</Typography>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onReturnToApp}
            style={[styles.primaryButton, { backgroundColor: 'white' }]}
          >
            <Typography variant="h3" weight="black" color="#7C3AED">Return to Focus</Typography>
          </TouchableOpacity>
          <Typography variant="caption" color="rgba(255,255,255,0.6)" weight="black">
            "DISCIPLINE BEATS MOTIVATION"
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
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appName: {
    fontWeight: '900',
    color: '#FFF',
    textDecorationLine: 'underline',
  },
  timerPreview: {
    alignItems: 'center',
    marginBottom: 64,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  primaryButton: {
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
