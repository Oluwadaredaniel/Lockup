import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, Collections } from '../../../../packages/core';

export class UserService {
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, Collections.Users, uid));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  }

  static async createUserProfile(profile: UserProfile): Promise<void> {
    await setDoc(doc(db, Collections.Users, profile.uid), profile);
  }

  static async updateProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    await updateDoc(doc(db, Collections.Users, uid), updates);
  }

  static subscribeToProfile(uid: string, callback: (profile: UserProfile) => void) {
    return onSnapshot(doc(db, Collections.Users, uid), (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as UserProfile);
      }
    });
  }
}
