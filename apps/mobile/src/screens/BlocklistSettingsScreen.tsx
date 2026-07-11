import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import * as Haptics from 'expo-haptics';

interface AppItem {
  id: string;
  name: string;
  packageName: string;
  blocked: boolean;
}

const MOCK_APPS: AppItem[] = [
  { id: '1', name: 'TikTok', packageName: 'com.zhiliaoapp.musically', blocked: true },
  { id: '2', name: 'Instagram', packageName: 'com.instagram.android', blocked: true },
  { id: '3', name: 'X (Twitter)', packageName: 'com.twitter.android', blocked: false },
  { id: '4', name: 'Facebook', packageName: 'com.facebook.katana', blocked: false },
  { id: '5', name: 'YouTube', packageName: 'com.google.android.youtube', blocked: false },
  { id: '6', name: 'Snapchat', packageName: 'com.snapchat.android', blocked: false },
];

interface Props {
  onBack: () => void;
}

export const BlocklistSettingsScreen: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const [apps, setApps] = useState<AppItem[]>(MOCK_APPS);
  const [search, setSearch] = useState('');

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  const toggleApp = (id: string) => {
    Haptics.selectionAsync();
    setApps(prev => prev.map(app =>
      app.id === id ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: AppItem }) => (
    <TouchableOpacity
      onPress={() => toggleApp(item.id)}
      activeOpacity={0.7}
    >
      <Card style={[styles.appCard, item.blocked && styles.blockedCard]} padding={16}>
        <View style={styles.appInfo}>
          <View style={[styles.iconPlaceholder, { backgroundColor: item.blocked ? '#7C3AED' : '#94A3B8' }]} />
          <View>
            <Typography variant="body" weight="black">{item.name}</Typography>
            <Typography variant="caption" color="#64748B">{item.packageName}</Typography>
          </View>
        </View>
        <View style={[styles.checkbox, item.blocked && styles.checkboxActive]}>
          {item.blocked && <Typography variant="label" color="white" weight="black">✓</Typography>}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" color="#7C3AED" weight="bold">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Blocked Apps</Typography>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { color: isDark ? 'white' : 'black', borderColor }]}
          placeholder="Search apps..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredApps}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <Typography variant="label" weight="black" color="#94A3B8" style={{ marginBottom: 16 }}>
            {apps.filter(a => a.blocked).length} APPS SELECTED FOR PROTECTION
          </Typography>
        )}
      />

      <View style={styles.footer}>
        <Button title="Save Blocklist" onPress={onBack} />
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  listContent: {
    padding: 24,
    paddingTop: 0,
    gap: 12,
  },
  appCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  blockedCard: {
    borderColor: 'rgba(124, 58, 237, 0.3)',
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    opacity: 0.2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  footer: {
    padding: 24,
  }
});
