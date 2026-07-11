import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { ShieldedSlot, Collections } from '../../../../packages/core';

export class SchedulingService {
  static async addSlot(uid: string, slot: Omit<ShieldedSlot, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, Collections.Users, uid, 'shielded_slots'), slot);
    return docRef.id;
  }

  static async updateSlot(uid: string, slotId: string, updates: Partial<ShieldedSlot>): Promise<void> {
    await updateDoc(doc(db, Collections.Users, uid, 'shielded_slots', slotId), updates);
  }

  static async deleteSlot(uid: string, slotId: string): Promise<void> {
    await deleteDoc(doc(db, Collections.Users, uid, 'shielded_slots', slotId));
  }

  static subscribeToSlots(uid: string, callback: (slots: ShieldedSlot[]) => void) {
    return onSnapshot(collection(db, Collections.Users, uid, 'shielded_slots'), (snapshot) => {
      const slots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ShieldedSlot));
      callback(slots);
    });
  }
}
