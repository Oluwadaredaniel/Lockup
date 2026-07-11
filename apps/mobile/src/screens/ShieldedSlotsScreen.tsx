import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SchedulingService } from '../services/SchedulingService';
import { ShieldedSlot, LockLevel } from '../../../../packages/core';
import * as Haptics from 'expo-haptics';

interface Props {
  onBack: () => void;
  onAddSlot: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ShieldedSlotsScreen: React.FC<Props> = ({ onBack, onAddSlot }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [slots, setSlots] = useState<ShieldedSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = SchedulingService.subscribeToSlots(user.uid, (data) => {
        setSlots(data);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [user]);

  const toggleSlot = (slot: ShieldedSlot) => {
    if (!user) return;
    Haptics.selectionAsync();
    SchedulingService.updateSlot(user.uid, slot.id, { enabled: !slot.enabled });
  };

  const renderItem = ({ item }: { item: ShieldedSlot }) => (
    <Card style={[styles.slotCard, !item.enabled && { opacity: 0.6 }]} padding={20}>
      <View style={styles.slotHeader}>
        <View>
          <Typography variant="body" weight="black">{item.name}</Typography>
          <Typography variant="caption" color="#7C3AED" weight="black">
            {DAYS[item.dayOfWeek - 1]} @ {item.startTime} • {item.duration}m
          </Typography>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleSlot(item)}
          trackColor={{ false: '#767577', true: '#C4B5FD' }}
          thumbColor={item.enabled ? '#7C3AED' : '#f4f3f4'}
        />
      </View>
      <View style={styles.slotFooter}>
        <View style={styles.badge}>
          <Typography variant="label" color="#64748B" weight="bold">🔒 Level {item.lockLevel}</Typography>
        </View>
        <View style={styles.badge}>
          <Typography variant="label" color="#64748B" weight="bold">🎧 {item.environment}</Typography>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" color="#7C3AED" weight="bold">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Shielded Slots</Typography>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.intro}>
        <Typography variant="body" color="#64748B" weight="semibold">
          Pre-commit to discipline. Shielded slots automatically start Strict Sessions.
        </Typography>
      </View>

      {loading ? (
        <ActivityIndicator color="#7C3AED" size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={slots}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Typography variant="body" color="#94A3B8" textAlign="center">
                No shielded slots scheduled yet.
              </Typography>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button title="+ Add Shielded Slot" onPress={onAddSlot} />
      </View>
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
  intro: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  listContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  slotCard: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  slotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  slotFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  footer: {
    padding: 24,
  },
  empty: {
    marginTop: 100,
    alignItems: 'center',
  }
});
