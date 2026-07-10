import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { ShareableStreakCard } from '../components/social/ShareableStreakCard';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';

interface Props {
  onBack: () => void;
}

export const ShareProgressScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const { user } = useUser();

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  // Stats for the card
  const stats = {
    streak: user?.streak || 0,
    hoursFocused: 42.5, // Mocked for now
    disciplineScore: user?.disciplineScore || 0,
    level: user?.level || 1
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" weight="semibold" color="#7C3AED">Done</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Share Progress</Typography>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardPreview}>
          <ShareableStreakCard stats={stats} userName={user?.name || "Guardian"} />
        </View>

        <View style={styles.optionsContainer}>
          <Typography variant="h3" weight="black" style={{ marginBottom: 20 }}>Select Platform</Typography>

          <View style={styles.platformGrid}>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>📸</Text>
              <Typography variant="label" weight="bold" color="#64748B">Instagram</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>🐦</Text>
              <Typography variant="label" weight="bold" color="#64748B">X (Twitter)</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>💬</Text>
              <Typography variant="label" weight="bold" color="#64748B">WhatsApp</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.platformButton}>
              <Text style={styles.platformEmoji}>📥</Text>
              <Typography variant="label" weight="bold" color="#64748B">Save Image</Typography>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Share to Social Media"
          onPress={() => {}}
          size="large"
          style={{ width: '100%' }}
        />
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
