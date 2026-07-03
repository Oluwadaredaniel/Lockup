import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onBack: () => void;
}

const TRANSACTIONS = [
  { id: '1', reason: 'Deep Work Session', amount: 40, date: 'Today, 2:30 PM', type: 'gain' },
  { id: '2', reason: 'Daily Streak Bonus', amount: 50, date: 'Today, 8:00 AM', type: 'gain' },
  { id: '3', reason: 'Focus Commitment', amount: 20, date: 'Yesterday, 5:45 PM', type: 'gain' },
  { id: '4', reason: 'Abandoned Session (Lvl 2)', amount: -10, date: 'Yesterday, 11:20 AM', type: 'loss' },
  { id: '5', reason: 'Morning Reading', amount: 20, date: 'Oct 22, 7:15 AM', type: 'gain' },
  { id: '6', reason: 'Coding Session', amount: 60, date: 'Oct 21, 9:00 PM', type: 'gain' },
];

export const XPHistoryScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={[styles.backText, { color: '#7C3AED' }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>XP History</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL LIFETIME XP</Text>
          <Text style={styles.totalValue}>2,450</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>Recent Transactions</Text>

        {TRANSACTIONS.map(item => (
          <View key={item.id} style={[styles.transactionCard, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.type === 'gain' ? '✨' : '⚠️'}</Text>
            </View>
            <View style={styles.details}>
              <Text style={[styles.reason, { color: textColor }]}>{item.reason}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={[
              styles.amount,
              { color: item.type === 'gain' ? '#10B981' : '#EF4444' }
            ]}>
              {item.type === 'gain' ? '+' : ''}{item.amount}
            </Text>
          </View>
        ))}
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
  },
  totalCard: {
    backgroundColor: '#7C3AED',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 40,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  details: {
    flex: 1,
  },
  reason: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
  }
});
