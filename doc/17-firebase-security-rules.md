# Firebase Security Rules — LockUp

Version: 1.0  
Status: Production Blueprint

---

## 1. Overview
The principle is: **Users can only read and write their own data.** 
Sensitive metrics (Discipline Score, XP, Probation Status) should ideally be updated via Cloud Functions to prevent client-side spoofing, but for MVP, we use strict row-level security.

---

## 2. Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User Profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Focus Sessions
    match /sessions/{sessionId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Streaks
    match /streaks/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    
    // XP Transactions (Append Only)
    match /xp_transactions/{tid} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 3. Storage Rules

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
