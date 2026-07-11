import { collection, doc, addDoc, updateDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { FocusSession, Collections, SessionStatus } from '../../../../packages/core';

export class SessionService {
  static async startSession(session: Omit<FocusSession, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, Collections.Sessions), {
      ...session,
      startedAt: Timestamp.now(),
    });
    return docRef.id;
  }

  static async updateSessionStatus(sessionId: string, status: SessionStatus): Promise<void> {
    await updateDoc(doc(db, Collections.Sessions, sessionId), {
      status,
      endedAt: Timestamp.now(),
    });
  }

  static async getUserHistory(uid: string, limitCount: number = 20): Promise<FocusSession[]> {
    const q = query(
      collection(db, Collections.Sessions),
      where('userId', '==', uid),
      orderBy('startedAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FocusSession));
  }
}
