# Product Requirements Document — LockUp

---

## 1. Overview

LockUp is a mobile discipline system that helps users complete focus sessions by blocking distractions and rewarding consistency.

---

## 2. Core Features (MVP)

### 2.1 Authentication

- Email login
- Google login
- Apple login

---

### 2.2 Dashboard

Displays:

- Discipline Score (0–1000)
- XP
- Current streak
- Focus hours (weekly)
- Active session status

---

### 2.3 Focus Sessions

Users create sessions:

- Name (e.g. “Study Math”)
- Duration (15–180 mins)
- Apps to block
- Lock level

---

### 2.4 Lock Levels

#### Level 1 — Flexible Mode
- User can exit session
- No penalty

#### Level 2 — Commitment Mode
- Exit allowed
- XP penalty applied
- Streak protection reduced

#### Level 3 — Strict Mode
- Cannot exit
- Must complete session
- Emergency override exists

---

### 2.5 App Blocking

During session:

- Selected apps become inaccessible
- Examples:
  - Instagram
  - TikTok
  - YouTube
  - Games

---

### 2.6 XP System

Rewards:

- Session completed → +20 XP
- Perfect week → +100 XP
- 7-day streak → +150 XP
- 30-day streak → +500 XP

Penalties:

- Breaking commitment → XP loss + streak damage

---

### 2.7 Discipline Score

Range: 0–1000

Calculated from:

- Session completion rate
- Streak consistency
- Focus hours
- Missed sessions
- XP progression

---

### 2.8 Streak System

- Tracks daily completed sessions
- Missing a day breaks streak unless protected

---

## 3. Analytics Events

- session_created
- session_started
- session_completed
- session_failed
- session_abandoned
- xp_earned
- streak_increased
- app_blocked

---

## 4. Key UX Requirements

- Minimal friction to start session
- Strong visual feedback on completion
- Emotional reinforcement for streaks
- Clear consequences for failure

---

## 5. Non-Goals (MVP)

- Social features
- Chat system
- Complex productivity planning
- Task management system

---

## 6. Success Metrics

- Daily active sessions
- Session completion rate
- 7-day retention
- Streak continuation rate
- Average focus time per user
