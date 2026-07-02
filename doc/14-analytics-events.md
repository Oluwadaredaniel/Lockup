# Analytics Events — LockUp

Version: 1.0  
Status: Behavioral Telemetry System  
Scope: All tracked events for discipline measurement

---

## 1. Purpose

This document defines all analytics events in LockUp.

It ensures:

- Behavioral tracking consistency
- Discipline score accuracy
- Retention analysis
- Feature effectiveness measurement
- Anti-cheat visibility

---

## 2. Core Principle

> “If it is not measurable, it is not real in the system.”

LockUp does not track vanity metrics.

It tracks:

- Behavior
- Consistency
- Discipline outcomes

---

## 3. Event Philosophy

Events are not logs.

They are **behavior signals**.

Each event represents:

- A decision
- A failure
- A completion
- A discipline moment

---

## 4. Event Categories

---

### 4.1 Session Lifecycle Events

Core system behavior tracking.

---

#### session_created

Triggered when:

- User creates a focus session

Payload:

- duration
- lockLevel
- blockedApps

---

#### session_started

Triggered when:

- Session begins countdown

---

#### session_completed

Triggered when:

- User finishes session successfully

---

#### session_failed

Triggered when:

- Session ends due to interruption

---

#### session_abandoned

Triggered when:

- User exits session without proper completion

---

## 5. XP System Events

---

#### xp_earned

Triggered when:

- Session completed
- Bonus conditions met

Payload:

- amount
- reason

---

#### xp_penalty_applied

Triggered when:

- Session failure occurs (Level 2+)

---

## 6. Streak Events

---

#### streak_increased

Triggered when:

- User completes a session on consecutive day

---

#### streak_broken

Triggered when:

- User misses required daily discipline action

---

#### streak_at_risk

Triggered when:

- User is close to breaking streak (warning state)

---

## 7. Achievement Events

---

#### achievement_unlocked

Triggered when:

- User reaches milestone

Examples:

- First Session
- 7 Day Streak
- 30 Day Streak

---

## 8. App Blocking Events

---

#### app_blocked

Triggered when:

- User attempts to access blocked app during session

Payload:

- appName
- sessionId

---

#### block_override_attempted

Triggered when:

- User attempts to bypass restriction system

---

## 9. Notification Events

---

#### notification_sent

Triggered when:

- System sends notification

---

#### notification_clicked

Triggered when:

- User interacts with notification

---

## 10. Discipline Score Events

---

#### discipline_score_updated

Triggered when:

- Any session ends (success/failure)

Payload:

- previousScore
- newScore
- delta

---

## 11. User Behavior Events

---

#### user_app_opened

Triggered when:

- User opens LockUp

---

#### user_session_inactive

Triggered when:

- User remains idle in app too long

---

## 12. Onboarding Events

---

#### onboarding_started

Triggered when:

- User first enters onboarding

---

#### onboarding_completed

Triggered when:

- User finishes onboarding flow

---

## 13. Recovery Events

---

#### recovery_flow_triggered

Triggered when:

- User breaks streak or fails multiple sessions

---

#### recovery_session_started

Triggered when:

- User accepts recovery prompt and starts new session

---

## 14. Anti-Cheat Events

---

#### suspicious_activity_detected

Triggered when:

- Unusual session manipulation detected

---

#### session_state_mismatch

Triggered when:

- Client state does not match server state

---

## 15. Event Storage Rules

---

- All events are immutable
- Events are append-only
- No event is deleted
- All events are timestamped

---

## 16. Event Processing Strategy

---

### Real-time events

- Session updates
- XP updates
- Streak updates

---

### Batch events

- Analytics aggregation
- Weekly reports
- Long-term behavioral analysis

---

## 17. Discipline Score Calculation Inputs

Events feed into:

- session_completed
- session_failed
- streak_increased
- session_abandoned
- xp_earned

---

## 18. Core Insight

> “Discipline is measurable behavior over time.”

Events are how LockUp understands that behavior.

---

## 19. System Integrity Rule

If events are missing or inconsistent:

> Discipline score becomes invalid.

---

## 20. Final Principle

LockUp does not guess user behavior.

It records it.

> Every action is a signal. Every signal shapes discipline.