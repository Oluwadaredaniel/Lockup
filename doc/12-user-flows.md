# User Flows — LockUp

Version: 1.0  
Status: Behavioral System Design  
Scope: End-to-end user journeys, session logic, edge cases

---

## 1. Purpose

This document defines how users actually move through LockUp.

It ensures:

- Discipline logic is enforced consistently
- No broken journeys
- Predictable behavior outcomes
- Strong focus reinforcement loops

---

## 2. Core Principle

> “Every flow must reinforce discipline behavior.”

If a flow does not:

- Improve consistency
- Reduce distraction
- Strengthen commitment

It is invalid.

---

## 3. Primary User Loop (Core System Loop)

This is the heart of LockUp.

---

### Loop Steps

1. User opens app
2. Views discipline status (Dashboard)
3. Creates focus session
4. Selects:
   - Duration
   - Apps to block
   - Lock level
5. Starts session
6. Enters focus state
7. Completes or fails session
8. Receives outcome (XP, streak, discipline score)
9. Returns to dashboard
10. Repeats loop

---

### Loop Principle

> “LockUp is not used occasionally. It is used cyclically.”

---

## 4. Onboarding Flow

---

### Step 1 — Welcome

User is introduced to philosophy:

> “Discipline is built, not given.”

---

### Step 2 — Concept Introduction

Explain:

- Focus sessions
- Lock levels
- XP system
- Streak system

---

### Step 3 — Permission Setup

Request:

- Notifications
- App blocking access (Android focus mode permissions if applicable)

---

### Step 4 — First Session Creation

User creates first session:

- Name
- Duration
- Apps to block
- Lock level (recommended Level 1)

---

### Step 5 — First Execution

User immediately starts session.

Goal:

> First experience must be success-driven.

---

## 5. Focus Session Flow

---

### 5.1 Session Creation

User defines:

- Task name
- Duration
- Blocked apps
- Lock level

---

### 5.2 Pre-Start Confirmation

System shows:

- Session summary
- Lock level consequences
- Start confirmation CTA

---

### 5.3 Active Session State

System behavior:

- Timer starts
- Navigation restricted (depending on lock level)
- App blocking activated
- UI simplified to focus-only mode

---

### 5.4 Session Completion

If completed successfully:

- XP awarded
- Streak updated
- Discipline score recalculated
- Positive reinforcement screen shown

---

### 5.5 Session Failure

If interrupted:

- XP penalty applied (if Level 2+)
- Streak risk flagged
- Neutral feedback shown

---

### 5.6 Session Abandonment

If user exits:

- Logged as abandonment event
- Discipline score impacted
- Recovery prompt shown later

---

## 6. Lock Level Flow Behavior

---

### Level 1 — Flexible Flow

- User can exit anytime
- No penalties
- Used for onboarding

---

### Level 2 — Commitment Flow

- Exit allowed
- XP penalty applied
- Streak vulnerability introduced

Behavior purpose:

> Teach consequence-awareness

---

### Level 3 — Strict Flow

- Exit blocked
- Must complete session
- Emergency override available

Behavior purpose:

> Full discipline enforcement

---

## 7. Streak Flow

---

### Daily Cycle

1. User completes session in a day
2. Streak increases
3. UI reinforces streak identity

---

### Break Condition

If no session completed in a day:

- Streak resets OR decreases (depending on rules)
- User receives notification
- Recovery flow suggested

---

## 8. XP Flow

---

### XP Events

- Session completed → +20 XP
- Perfect week → +100 XP
- Streak milestones → bonus XP

---

### XP Rule

> XP is never manually assigned.

Only system-generated.

---

## 9. Discipline Score Flow

---

### Inputs

- Session completion rate
- Streak consistency
- XP accumulation
- Failure frequency

---

### Output

- Score from 0–1000

---

### Update Trigger

- After every session completion/failure

---

## 10. Recovery Flow (Critical)

---

Triggered when user:

- Fails session
- Breaks streak
- Abandons multiple sessions

---

### Flow Steps

1. Calm notification sent
2. User shown current state
3. Suggest “restart discipline cycle”
4. Encourage new session start

---

Tone rule:

> Never shame the user. Only reflect behavior.

---

## 11. Notification Flow System

---

### Types

- Pre-session reminder
- Streak warning
- Session completion feedback
- Recovery prompts

---

### Behavior Rule

Notifications must:

- Reinforce discipline identity
- Avoid noise or spam behavior

---

## 12. Edge Case Flows

---

### 12.1 App Crash During Session

- Session resumes on reopen
- Timer restored
- State recovered from local + server sync

---

### 12.2 Offline Mode

- Session continues locally
- Sync happens on reconnect

---

### 12.3 Forced Exit (Level 3 Override)

- Logged as override event
- XP penalty applied
- Streak risk flagged

---

## 13. Behavioral Loop Reinforcement

---

Each flow ends with:

- Feedback
- Reward or consequence
- Reinforcement of identity

---

## 14. Core System Insight

> “Behavior is shaped by repetition, not intention.”

LockUp flows are designed to force repetition of disciplined behavior.

---

## 15. Final Principle

If a flow does not change user behavior over time:

> It does not belong in LockUp.