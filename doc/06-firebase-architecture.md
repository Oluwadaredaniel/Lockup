# Firebase Architecture — LockUp

Version: 1.0  
Status: Backend Source of Truth  
Stack: Firebase Auth + Firestore + Cloud Functions + FCM

---

## 1. Purpose

This document defines:

- Data structure
- Backend enforcement logic
- Security rules
- Data consistency model
- Server-side discipline validation

LockUp backend is not passive storage.

It is a **discipline enforcement system**.

---

## 2. Core Principle

> “If data can be modified by the client, it is not trustworthy.”

Therefore:

- Critical logic must be server-validated
- Client is only an interface, not authority

---

## 3. Firebase Services Used

### 3.1 Authentication

- Email/password
- Google OAuth
- Apple Sign-in

Purpose:
User identity layer

---

### 3.2 Firestore

Primary database for:

- Sessions
- XP logs
- Streaks
- User profile
- Analytics events

---

### 3.3 Cloud Functions

Used for:

- XP calculation
- Discipline score updates
- Streak validation
- Session finalization logic
- Anti-cheat enforcement

---

### 3.4 Cloud Messaging (FCM)

Used for:

- Focus reminders
- Streak warnings
- Session completion feedback
- Discipline alerts

---

## 4. Database Structure

---

### 4.1 users

```json
{
  userId: string,
  email: string,
  name: string,
  createdAt: timestamp,

  disciplineScore: number,
  level: number,
  xp: number,
  streak: number
}
4.2 sessions
{
  sessionId: string,
  userId: string,

  name: string,
  duration: number,
  lockLevel: number,

  status: "created | active | completed | failed | abandoned",

  startedAt: timestamp,
  endedAt: timestamp,

  blockedApps: string[]
}
4.3 xp_transactions

Immutable log of all XP changes.

{
  transactionId: string,
  userId: string,

  amount: number,
  reason: string,

  createdAt: timestamp
}
4.4 streaks
{
  userId: string,
  currentStreak: number,
  longestStreak: number,
  lastActiveDate: date
}
4.5 blocked_apps
{
  userId: string,
  appName: string,
  isActive: boolean
}
4.6 analytics_events
{
  eventId: string,
  userId: string,
  type: string,
  metadata: object,
  createdAt: timestamp
}
5. Cloud Functions Logic
5.1 session completion handler

Triggered when session ends.

Responsibilities:

Validate session duration
Determine success/failure
Award XP
Update streak
Update discipline score
5.2 XP calculation engine

Rules:

Never trust client XP
Always compute server-side
Append transaction logs only
5.3 streak engine

Rules:

Check daily completion
Update streak only once per day
Apply streak protection logic
5.4 discipline score engine

Calculates:

session completion rate
consistency history
XP accumulation
failure frequency
6. Security Rules
6.1 Firestore Rules
Users can only read/write their own data
XP cannot be directly modified
Discipline score is read-only from client
Sessions cannot be marked completed manually
6.2 Anti-Cheat Rules

Prevent:

XP spoofing
Fake session completion
Streak manipulation
Direct score editing
7. Data Integrity Principles
7.1 Append-Only Logs
XP transactions are immutable
Analytics events are immutable
7.2 Computed State

These are NEVER stored manually:

Discipline Score
Derived XP totals
Streak validation result

They are always computed.

8. Offline Behavior

If user is offline:

Sessions continue locally
Events are queued
Sync occurs on reconnect
Server always resolves final truth
9. Performance Strategy
Batch writes for events
Minimize real-time listeners
Cache user state locally
Use lightweight session updates
10. System Philosophy

Firebase is not storage.

It is the discipline authority layer.

11. Final Rule

If the backend can be tricked, the product fails.

LockUp must assume adversarial users and enforce discipline through server authority.