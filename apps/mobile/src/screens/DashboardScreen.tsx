import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GuardianBear } from '../components/mascot/GuardianBear';

export const DashboardScreen = () => {
  const { theme, toggleTheme } = useTheme();

  const bgColor = theme === 'light' ? '#FAF8FF' : '#0F172A';
  const textColor = theme === 'light' ? '#111827' : '#FAF8FF';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        <GuardianBear state="idle" size={200} />
        <Text style={[styles.title, { color: textColor }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: textColor }]}>Discipline is active.</Text>

        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    marginTop: 8,
  },
  button: {
    marginTop: 48,
    padding: 16,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  }
});
