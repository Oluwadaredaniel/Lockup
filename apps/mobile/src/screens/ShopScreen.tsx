import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Props {
  onBack: () => void;
}

const SHOP_ITEMS = [
  {
    id: 'streak_shield',
    title: 'Streak Shield',
    description: 'Automatically protects your streak for one day of inactivity.',
    price: 200,
    emoji: '🛡️'
  },
  {
    id: 'double',
    title: 'Double or Nothing',
    description: 'Maintain a 7-day streak to double your 50 XP wager.',
    price: 50,
    emoji: '💎'
  },
  {
    id: 'golden_visor',
    title: 'Golden Visor',
    description: 'A legendary golden visor for your Guardian Bear.',
    price: 1000,
    emoji: '✨'
  },
];

export const ShopScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const { user, updateSettings } = useUser();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';

  const handlePurchase = (item: typeof SHOP_ITEMS[0]) => {
    if ((user?.gems || 0) >= item.price) {
      const updates: any = { gems: (user?.gems || 0) - item.price };

      if (item.id === 'streak_shield') {
        updates.streakShields = (user?.streakShields || 0) + 1;
      }

      if (item.id === 'golden_visor') {
        updates.activeSkin = 'GOLDEN';
      }

      updateSettings(updates);
      alert(`Purchased ${item.title}!`);
    } else {
      alert("Not enough gems!");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" weight="semibold" color="#7C3AED">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Guardian Shop</Typography>
        <View style={styles.gemDisplay}>
          <Typography variant="label" color="#10B981" weight="black">💎 {user?.gems}</Typography>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Typography variant="body" color="#64748B" style={{ marginBottom: 24 }}>
          Use your discipline gems to purchase power-ups and cosmetics.
        </Typography>

        {SHOP_ITEMS.map(item => (
          <Card key={item.id} style={styles.itemCard} padding={20}>
            <View style={styles.itemHeader}>
              <View style={styles.emojiContainer}>
                <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Typography variant="body" weight="black">{item.title}</Typography>
                <Typography variant="caption" color="#64748B">{item.description}</Typography>
              </View>
            </View>
            <View style={styles.footer}>
              <Button
                title={`${item.price} Gems`}
                onPress={() => handlePurchase(item)}
                size="small"
                variant={(user?.gems || 0) >= item.price ? 'primary' : 'ghost'}
              />
            </View>
          </Card>
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
  gemDisplay: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scrollContent: {
    padding: 24,
  },
  itemCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emojiContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 16,
    alignItems: 'flex-end',
  }
});
