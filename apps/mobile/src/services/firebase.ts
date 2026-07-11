import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirebaseConfig } from '../../../../packages/core/firebase.config';

// In a production app, these would be in an .env file.
// For now, using placeholders for the user to fill.
const firebaseConfig = getFirebaseConfig({
  FIREBASE_API_KEY: 'YOUR_API_KEY',
  FIREBASE_AUTH_DOMAIN: 'YOUR_AUTH_DOMAIN',
  FIREBASE_PROJECT_ID: 'YOUR_PROJECT_ID',
  FIREBASE_STORAGE_BUCKET: 'YOUR_STORAGE_BUCKET',
  FIREBASE_MESSAGING_SENDER_ID: 'YOUR_MESSAGING_SENDER_ID',
  FIREBASE_APP_ID: 'YOUR_APP_ID',
});

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export default app;
