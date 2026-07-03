import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { GuardianBear } from './src/components/mascot/GuardianBear';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <GuardianBear state="focus" size={240} />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Discipline Beats Motivation</Text>
          <Text style={styles.subtitle}>Welcome to LockUp</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Obsidian Dark
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  textContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FAF8FF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#C4B5FD',
    marginTop: 8,
    fontWeight: '600',
  },
});
