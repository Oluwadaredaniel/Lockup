import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export class ForegroundService {
  static async startFocusShield() {
    if (Platform.OS !== 'android') return;

    await Notifications.setNotificationChannelAsync('focus-shield', {
      name: 'Focus Shield',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#7C3AED',
    });

    await Notifications.presentNotificationAsync({
      title: "Guardian Shield Active 🛡️",
      body: "Selective blocking is currently enforced. Stay focused.",
      content: {
        sticky: true,
      },
    });
  }

  static async stopFocusShield() {
    await Notifications.dismissAllNotificationsAsync();
  }
}
