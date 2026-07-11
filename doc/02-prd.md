# Product Requirements Document — LockUp (Android Elite Edition)

---

## 1. Overview
LockUp is a high-integrity discipline system. Unlike productivity apps that organize tasks, LockUp **enforces behavior** by introducing structured friction, consequences, and un-bypassable focus sessions.

**North Star Metric:** Daily Discipline Score (DDS).

---

## 2. Core Features (MVP)

### 2.1 Authentication
- Google Login (Primary)
- Email/Password (Secondary)
- *Note: Device-bound sessions to prevent multi-device streak spoofing.*

### 2.2 The "Pulse" Dashboard
- **Discipline Score (0–1000):** Real-time weighted average of consistency.
- **XP & Leveling:** Progression system for long-term engagement.
- **Active Streak:** Visual representation of consecutive successful days.
- **Focus Heatmap:** Weekly visualization of "Discipline Volume" (hours focused).

### 2.3 Focus Sessions
- **Session Presets:** "Deep Work", "Study", "Meditation".
- **Focus Environments:** Integrated ambient audio (Lo-Fi, Rain, Coffee Shop) to replace distractions with productive noise.
- **Pre-Commitment Ritual:** A "Hold to Commit" interaction that triggers the psychological transition into a locked state.
- **Lock Levels:** The core friction-tiering system.

### 2.4 Scheduling & Routines
- **Shielded Slots:** Ability to schedule sessions in advance. Once a Shielded Slot begins, the device enters Level 3 (Strict) automatically.
- **Discipline Reminders:** Contextual notifications based on historical focus patterns.

---

## 3. The Lock Level Matrix

| Level | Name | Enforcement Mechanism | Penalty for Failure |
| :--- | :--- | :--- | :--- |
| **1** | **Flexible** | Simple notification reminders if apps are opened. | None. |
| **2** | **Commitment** | Accessibility Service "Soft-Block" (can be dismissed). | -20 XP, Streak Protection reduced. |
| **3** | **Strict** | **Accessibility Service "Hard-Block"**: Overlay prevents exit. | -100 XP, Streak Reset, 3-day "Discipline Probation". |

---

## 4. Android Enforcement Layer (The "Black Box")

To ensure LockUp cannot be bypassed by ambitious procrastinators, we implement:

1. **Accessibility Service:** Monitors `TYPE_WINDOW_STATE_CHANGED`. If a blacklisted package is in the foreground, we immediately launch the `LockOverlayActivity`.
2. **Usage Stats API:** Secondary verification to ensure the user isn't using "Split Screen" or "Picture-in-Picture" to bypass blocks.
3. **Overlay (System Alert Window):** A full-screen Plum-colored shield that appears over blocked apps.
4. **Anti-Force Stop (Battery Optimization):** Guide the user to disable battery optimization and "Lock" the app in the Recents menu to prevent the OS from killing the enforcement engine.

---

## 5. The Discipline Engine

### 5.1 Discipline Score (DS) Calculation
The DS is a rolling 30-day weighted score:
- **70% Weight:** Performance over the last 7 days.
- **30% Weight:** Performance over the previous 23 days.
- **Formula Components:** (Sessions Completed / Sessions Started) + (Streak Length / 30) + (Focus Hours / Target).

### 5.2 Emergency Override (The "Shame" Timer)
In **Strict Mode**, exiting is impossible *unless* the Emergency Override is triggered.
- **Friction:** A 180-second unskippable countdown. 
- **Behavioral Logic:** 3 minutes is usually enough time for a "distraction craving" to subside. If they still want to quit after 3 minutes, they can, but the penalty is severe.

---

## 6. XP & Progression System

### 6.1 Rewards
- **Session Success:** +20 XP.
- **Deep Focus (Level 3):** 1.5x XP Multiplier.
- **The "Perfect Week":** +100 XP.
- **Consistency Bonus:** 7, 14, 30-day streak milestones.

### 6.2 Penalties (The "Stick")
- **Session Abandonment (Lvl 2):** -20 XP.
- **Strict Break (Lvl 3):** -100 XP + Discipline Score Drop (-50 points).

---

## 7. Analytics & Anti-Cheat
- **Events:** `session_started`, `session_blocked_app_attempt`, `override_triggered`, `session_completed`.
- **Clock Sync:** App compares `System.currentTimeMillis()` against an external NTP server (e.g., `time.google.com`). If offset > 60s, session is invalidated to prevent "Time Travel" cheating.

---

## 8. Non-Goals (MVP)
- Social Feeds (Distraction risk).
- To-do lists (We enforce, we don't plan).
- Web Dashboard (Focus should be mobile-first for app blocking).

---

## 9. Success Metrics
- **Completion Rate:** % of sessions started that are successfully finished.
- **Level Migration:** % of users moving from Level 1 to Level 3 over 14 days.
- **Retention:** D7 and D30 retention of the Discipline Score.
