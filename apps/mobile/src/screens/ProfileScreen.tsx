import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import * as LockupEnforcement from '../../modules/expo-module-lockup-enforcement';

interface Props {
  onBack: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<Props> = ({ onBack, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateSettings } = useUser();
  const [isAccessibilityEnabled, setIsAccessibilityEnabled] = React.useState(false);
  const [canDrawOverlays, setCanDrawOverlays] = React.useState(false);

  React.useEffect(() => {
    // Check native permissions on mount
    try {
      setIsAccessibilityEnabled(LockupEnforcement.isAccessibilityServiceEnabled());
      setCanDrawOverlays(LockupEnforcement.canDrawOverlays());
    } catch (e) {
      console.log('Native enforcement module not available in this environment');
    }
  }, []);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';
  const borderColor = isDark ? '#1E293B' : '#E2E8F0';

  const handleToggleNotifications = () => {
    updateSettings({ notificationsEnabled: !user?.notificationsEnabled });
  };

  const handleOpenAccessibility = () => {
    try {
      LockupEnforcement.openAccessibilitySettings();
    } catch (e) {
      alert('Accessibility settings only available on Android');
    }
  };

  const handleOpenOverlay = () => {
    try {
      LockupEnforcement.openOverlaySettings();
    } catch (e) {
      alert('Overlay settings only available on Android');
    }
  };

  const SettingItem = ({ icon, title, value, type = 'chevron', onPress, subtitle }: any) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: borderColor }]}
      onPress={onPress}
      disabled={type === 'switch'}
    >
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Typography variant="body" weight="semibold">{title}</Typography>
          {subtitle && <Typography variant="caption" color="#64748B">{subtitle}</Typography>}
        </View>
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: '#767577', true: '#C4B5FD' }}
          thumbColor={value ? '#7C3AED' : '#f4f3f4'}
        />
      ) : (
        <Typography variant="h3" color={value ? '#10B981' : '#94A3B8'} style={{ fontWeight: 'black' }}>
          {type === 'status' ? (value ? '✓' : '!') : '›'}
        </Typography>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Typography variant="body" weight="semibold" color="#7C3AED">Back</Typography>
        </TouchableOpacity>
        <Typography variant="h3" weight="black">Profile</Typography>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <GuardianBear state="idle" size={120} />
          </View>
          <Typography variant="h2" weight="black">{user?.name || 'Guardian'}</Typography>
          <Typography variant="caption" color="#64748B" style={{ marginTop: 4 }}>
            {user?.name.toLowerCase().replace(' ', '.')}@lockup.app
          </Typography>

          <View style={[styles.levelBadge, { backgroundColor: '#7C3AED' }]}>
            <Typography variant="label" color="white" weight="bold">
              Level {user?.level || 1} Discipline Guardian
            </Typography>
          </View>
        </View>

        {/* Progress Overview */}
        <Card style={styles.statsCard} padding={24}>
          <View style={styles.statItem}>
            <Typography variant="h3" weight="black">{user?.xp ? (user.xp > 1000 ? `${(user.xp / 1000).toFixed(1)}k` : user.xp) : 0}</Typography>
            <Typography variant="label" weight="semibold" color="#64748B" style={{ fontSize: 10, marginTop: 4 }}>Total XP</Typography>
          </View>
          <View style={[styles.statDivider, { backgroundColor: borderColor }]} />
          <View style={styles.statItem}>
            <Typography variant="h3" weight="black">{user?.streak || 0}</Typography>
            <Typography variant="label" weight="semibold" color="#64748B" style={{ fontSize: 10, marginTop: 4 }}>Day Streak</Typography>
          </View>
          <View style={[styles.statDivider, { backgroundColor: borderColor }]} />
          <View style={styles.statItem}>
            <Typography variant="h3" weight="black">{user?.disciplineScore || 0}</Typography>
            <Typography variant="label" weight="semibold" color="#64748B" style={{ fontSize: 10, marginTop: 4 }}>Score</Typography>
          </View>
        </Card>

        <View style={styles.settingsGroup}>
          <Typography variant="label" color="#94A3B8" weight="black" style={{ letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>
            ANDROID SHIELD (STRICT MODE)
          </Typography>
          <SettingItem
            icon="🛡️"
            title="Accessibility Service"
            subtitle={isAccessibilityEnabled ? "Guardian is active" : "Required for app blocking"}
            type="status"
            value={isAccessibilityEnabled}
            onPress={handleOpenAccessibility}
          />
          <SettingItem
            icon="🪟"
            title="Overlay Permission"
            subtitle={canDrawOverlays ? "Shield is active" : "Required for lock screen"}
            type="status"
            value={canDrawOverlays}
            onPress={handleOpenOverlay}
          />
        </View>

        {/* Settings Groups */}
        <View style={styles.settingsGroup}>
          <Typography variant="label" color="#94A3B8" weight="black" style={{ letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>
            EXPERIENCE
          </Typography>
          <SettingItem
            icon="🌓"
            title="Dark Mode"
            type="switch"
            value={isDark}
            onPress={toggleTheme}
          />
          <SettingItem
            icon="🔔"
            title="Guardian Reminders"
            type="switch"
            value={user?.notificationsEnabled}
            onPress={handleToggleNotifications}
          />
          <SettingItem icon="🚫" title="Blocked Apps" />
        </View>

        <View style={styles.settingsGroup}>
          <Typography variant="label" color="#94A3B8" weight="black" style={{ letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>
            DISCIPLINE GOALS
          </Typography>
          <View style={styles.goalSelector}>
            {[20, 50, 100, 200].map(goal => (
              <TouchableOpacity
                key={goal}
                onPress={() => updateSettings({ dailyXPGoal: goal })}
                style={[
                  styles.goalChip,
                  user?.dailyXPGoal === goal && { backgroundColor: '#7C3AED' }
                ]}
              >
                <Typography
                  variant="label"
                  weight="bold"
                  color={user?.dailyXPGoal === goal ? 'white' : '#64748B'}
                >
                  {goal} XP
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.settingsGroup}>
          <Typography variant="label" color="#94A3B8" weight="black" style={{ letterSpacing: 1.5, marginBottom: 16, marginLeft: 4 }}>
            ACCOUNT
          </Typography>
          <SettingItem icon="👤" title="Personal Information" />
          <SettingItem icon="🛡️" title="Privacy & Security" />
          <SettingItem icon="❓" title="Help & Support" />
        </View>

        <Button
          title="Sign Out"
          onPress={onLogout}
          variant="danger"
        />

        <Typography variant="caption" textAlign="center" color="#94A3B8" style={{ marginTop: 32 }}>
          LockUp v1.0.0 (Alpha)
        </Typography>
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
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  levelBadge: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  statsCard: {
    flexDirection: 'row',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 24,
    color: '#94A3B8',
    fontWeight: '300',
  },
  goalSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  goalChip: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.05)',
  },
  logoutButton: {
    marginTop: 16,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 32,
  }
});
