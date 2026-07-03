import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ShareableStreakCard } from '../components/social/ShareableStreakCard';

interface Props {
  onBack: () => void;
}

export const ShareProgressScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';

  // Mock data for the card
  const stats = {
    streak: 12,
    hoursFocused: 42.5,
    disciplineScore: 750,
    level: 12
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.backText, { color: '#7C3AED' }]}>Done</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Share Progress</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardPreview}>
          <ShareableStreakCard stats={stats} userName="Oluwadare" />
        </View>

        <View style={styles.optionsContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Select Platform</Text>

          <View style={styles.platformGrid}>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>📸</Text>
              <Text style={styles.platformLabel}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>🐦</Text>
              <Text style={styles.platformLabel}>X (Twitter)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>💬</Text>
              <Text style={styles.platformLabel}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>📥</Text>
              <Text style={styles.platformLabel}>Save Image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.mainShareButton} activeOpacity={0.9}>
          <Text style={styles.mainShareButtonText}>Share to Social Media</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  cardPreview: {
    marginBottom: 40,
    // Add subtle shadow for the preview
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  platformButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  platformEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  platformLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  mainShareButton: {
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
  mainShareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
});
