import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { GuardianBear } from '../mascot/GuardianBear';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

interface Props {
  error?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export const ErrorState: React.FC<Props> = ({
  error = "Something went wrong with the connection.",
  onRetry,
  onBack
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <GuardianBear state="alert" size={200} />
        <Typography variant="h2" weight="black" textAlign="center" style={{ marginTop: 32 }}>
          Unforeseen Interruption
        </Typography>
        <Typography variant="body" color="#64748B" textAlign="center" style={{ marginTop: 12 }}>
          {error}
        </Typography>

        <View style={styles.buttonGroup}>
          {onRetry && (
            <Button title="Try Again" onPress={onRetry} />
          )}
          {onBack && (
            <Button title="Go Back" onPress={onBack} variant="secondary" />
          )}
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
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 32,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  buttonGroup: {
    marginTop: 48,
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '700',
  }
});
