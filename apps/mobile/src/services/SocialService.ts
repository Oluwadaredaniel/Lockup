import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, Collections } from '../../../../packages/core';

export class SocialService {
  static async getTopUsers(count: number = 30): Promise<UserProfile[]> {
    const q = query(
      collection(db, Collections.Users),
      orderBy('xp', 'desc'),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as UserProfile);
  }
}
