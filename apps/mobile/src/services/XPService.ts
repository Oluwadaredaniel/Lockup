import { collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { XPTransaction, Collections } from '../../../../packages/core';

export class XPService {
  static async logTransaction(transaction: Omit<XPTransaction, 'id'>): Promise<void> {
    await addDoc(collection(db, Collections.XPTransactions), {
      ...transaction,
      createdAt: Timestamp.now(),
    });
  }

  static async getTransactionHistory(uid: string, limitCount: number = 30): Promise<XPTransaction[]> {
    const q = query(
      collection(db, Collections.XPTransactions),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as XPTransaction));
  }
}
