import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { SessionService } from '../services/SessionService';
import { LockLevel, SessionStatus, FocusEnvironment, FocusSession } from '../../../../packages/core';

interface Props {
  onBack: () => void;
}

export const SessionHistoryScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [history, setHistory] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      SessionService.getUserHistory(user.uid)
        .then(setHistory)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  const renderItem = ({ item }: { item: FocusSession }) => (
    <Card style={styles.recordCard} padding={16}>
      <View style={styles.recordHeader}>
        <View>
          <Typography variant="body" weight="black">{item.name}</Typography>
          <Typography variant="caption" color="#94A3B8">
            {item.startedAt ? new Date((item.startedAt as any).seconds * 1000).toLocaleDateString() : 'N/A'}
          </Typography>
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

      {loading ? (
        <ActivityIndicator size="large" color="#7C3AED" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={styles.statsOverview}>
              <View style={styles.statItem}>
                <Typography variant="h2" weight="black">
                  {(history.reduce((acc, s) => acc + (s.status === SessionStatus.Completed ? s.duration : 0), 0) / 60).toFixed(1)}
                </Typography>
                <Typography variant="label" color="#94A3B8">TOTAL HOURS</Typography>
              </View>
              <View style={styles.statItem}>
                <Typography variant="h2" weight="black">
                  {history.length > 0 ? Math.round((history.filter(s => s.status === SessionStatus.Completed).length / history.length) * 100) : 0}%
                </Typography>
                <Typography variant="label" color="#94A3B8">SUCCESS RATE</Typography>
              </View>
            </View>
          )}
        />
      )}
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
