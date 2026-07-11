import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { GuardianBear } from '../components/mascot/GuardianBear';
import { Typography } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import * as Haptics from 'expo-haptics';
import { ActivityIndicator } from 'react-native';

interface Props {
  onLogin: () => void;
  onSignUp: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin, onSignUp }) => {
  const { theme } = useTheme();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mascotState, setMascotState] = useState<'idle' | 'focus' | 'disappointed'>('idle');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      setMascotState('disappointed');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setError(null);
    setMascotState('focus');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await login(email, password);
    } catch (e: any) {
      setError(e.message || 'Login failed. Check your credentials.');
      setMascotState('disappointed');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#FAF8FF';
  const cardColor = isDark ? '#0F172A' : '#FFFFFF';
  const textColor = isDark ? '#FAF8FF' : '#111827';
  const inputBg = isDark ? '#1E293B' : '#F1F5F9';
  const borderColor = isDark ? '#334155' : '#E2E8F0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <GuardianBear state={mascotState} size={120} />
            <Typography variant="h1" weight="black" style={{ marginTop: 16 }}>Welcome Back</Typography>
            <Typography variant="body" color="#64748B" style={{ marginTop: 4 }}>Sign in to continue your journey</Typography>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Typography variant="caption" color="white" weight="bold">{error}</Typography>
            </View>
          )}

          <Animated.View
            style={[
              styles.form,
              {
                backgroundColor: cardColor,
                borderColor,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Email Address</Text>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor }]}
                placeholder="Enter your email"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: textColor }]}>Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor }]}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={{ marginTop: 12 }}
            />

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: borderColor }]} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={[styles.divider, { backgroundColor: borderColor }]} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, { borderColor }]}>
                <Text style={[styles.socialText, { color: textColor }]}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { borderColor }]}>
                <Text style={[styles.socialText, { color: textColor }]}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.signUpText}> Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  errorContainer: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  form: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#7C3AED',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#64748B',
  },
  signUpText: {
    color: '#7C3AED',
    fontWeight: '700',
  },
});
