import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { GuardianBear } from '../mascot/GuardianBear';

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  mascotState?: 'idle' | 'focus' | 'alert';
}

export const EmptyState: React.FC<Props> = ({
  title,
  description,
  actionLabel,
  onAction,
  mascotState = 'idle'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const secondaryTextColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <View style={styles.container}>
      <GuardianBear state={mascotState} size={180} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: secondaryTextColor }]}>{description}</Text>

      {actionLabel && onAction && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 32,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  }
});
