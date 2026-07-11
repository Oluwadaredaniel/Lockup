import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { LockLevel, SessionStatus, FocusEnvironment } from '../../../../packages/core';

interface SessionRecord {
  id: string;
  name: string;
  duration: number;
  lockLevel: LockLevel;
  status: SessionStatus;
  date: string;
  environment: FocusEnvironment;
}

const MOCK_HISTORY: SessionRecord[] = [
  { id: '1', name: 'Deep Work', duration: 60, lockLevel: LockLevel.Strict, status: SessionStatus.Completed, date: 'Today, 10:30 AM', environment: 'lofi' },
  { id: '2', name: 'Study', duration: 30, lockLevel: LockLevel.Commitment, status: SessionStatus.Completed, date: 'Yesterday, 4:15 PM', environment: 'rain' },
  { id: '3', name: 'Coding', duration: 45, lockLevel: LockLevel.Strict, status: SessionStatus.Failed, date: '2 days ago, 9:00 AM', environment: 'none' },
  { id: '4', name: 'Reading', duration: 15, lockLevel: LockLevel.Flexible, status: SessionStatus.Completed, date: '3 days ago, 8:20 PM', environment: 'library' },
];

interface Props {
  onBack: () => void;
}

export const SessionHistoryScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  const renderItem = ({ item }: { item: SessionRecord }) => (
    <Card style={styles.recordCard} padding={16}>
      <View style={styles.recordHeader}>
        <View>
          <Typography variant="body" weight="black">{item.name}</Typography>
          <Typography variant="caption" color="#94A3B8">{item.date}</Typography>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === SessionStatus.Completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }
        ]}>
          <Typography variant="label" color={item.status === SessionStatus.Completed ? '#10B981' : '#EF4444'} weight="black">
            {item.status.toUpperCase()}
          </Typography>
        </View>
      </View>

      <View style={styles.recordFooter}>
        <Typography variant="caption" weight="bold">⏱️ {item.duration}m</Typography>
        <Typography variant="caption" weight="bold">🔒 Lvl {item.lockLevel}</Typography>
        <Typography variant="caption" weight="bold">🎧 {item.environment}</Typography>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" color="#7C3AED" weight="bold">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Session History</Typography>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={MOCK_HISTORY}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.statsOverview}>
            <View style={styles.statItem}>
              <Typography variant="h2" weight="black">12.5</Typography>
              <Typography variant="label" color="#94A3B8">TOTAL HOURS</Typography>
            </View>
            <View style={styles.statItem}>
              <Typography variant="h2" weight="black">85%</Typography>
              <Typography variant="label" color="#94A3B8">SUCCESS RATE</Typography>
            </View>
          </View>
        )}
      />
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
  listContent: {
    padding: 24,
    gap: 16,
  },
  statsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    padding: 24,
    borderRadius: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  recordCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recordFooter: {
    flexDirection: 'row',
    gap: 16,
    opacity: 0.8,
  }
});
