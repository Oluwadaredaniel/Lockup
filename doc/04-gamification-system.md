# Gamification System — LockUp

Version: 1.0  
Status: Core Behavioral Engine  
Dependency: Product Vision + PRD + Design System

---

## 1. Purpose

The gamification system exists to:

- Reinforce discipline behavior
- Create emotional attachment to consistency
- Turn focus into measurable progress
- Penalize inconsistency in a structured way
- Reward long-term commitment over short bursts

It is NOT for entertainment.

It is for behavior shaping.

---

## 2. Core Principle

> “Every action must have consequence or reward.”

If an action has no consequence, it does not influence behavior.

---

## 3. Core Systems Overview

LockUp gamification consists of:

1. XP System
2. Streak System
3. Discipline Score
4. Level System
5. Lock Level System (behavior enforcement layer)
6. Achievements System

All systems are interconnected.

---

## 4. XP SYSTEM

### 4.1 Purpose

XP measures **effort and consistency over time**.

---

### 4.2 XP Rewards

| Action | XP |
|--------|----|
| Session Completed | +20 XP |
| Perfect Day (all sessions completed) | +50 XP |
| 7-Day Streak | +150 XP |
| 30-Day Streak | +500 XP |
| Weekly Consistency Bonus | +100 XP |

---

### 4.3 XP Penalties

| Action | Penalty |
|--------|--------|
| Session Abandoned (Level 2) | -10 XP |
| Session Abandoned (Level 3) | -30 XP |
| Breaking Streak | -100 XP |
| Repeated Failure Pattern | Scaling penalty |

---

### 4.4 XP Philosophy

XP is NOT:

- A reward for trying

XP IS:

- A reflection of discipline consistency

---

## 5. STREAK SYSTEM

---

### 5.1 Definition

A streak represents consecutive days of completed focus behavior.

---

### 5.2 Rules

- At least 1 completed session per day = streak maintained
- No completion = streak breaks (unless protected)

---

### 5.3 Streak Protection

Users may earn:

- 1 “Streak Shield” per week of consistency

Used to protect streak during failure days.

---

### 5.4 Psychological Purpose

Streaks create:

- Identity attachment (“I don’t break my streak”)
- Loss aversion
- Consistency reinforcement

---

## 6. DISCIPLINE SCORE (CORE METRIC)

---

### 6.1 Range

0 → 1000

---

### 6.2 Meaning

- 0–200 → Highly inconsistent
- 200–500 → Developing discipline
- 500–750 → Strong discipline
- 750–900 → High performer
- 900–1000 → Elite discipline level

---

### 6.3 Calculation Factors

Discipline Score is calculated from:

- Session completion rate (40%)
- Streak consistency (25%)
- Focus hours (15%)
- XP accumulation rate (10%)
- Failure rate (10%)

---

### 6.4 Decay Rule

Discipline score slowly decreases if:

- User becomes inactive
- No sessions are completed over time

This prevents “fake high scores”.

---

## 7. LEVEL SYSTEM

---

### 7.1 Purpose

Levels represent long-term progression.

---

### 7.2 Level Formula

Level increases based on XP thresholds:

- Level 1 → 0 XP
- Level 2 → 200 XP
- Level 3 → 500 XP
- Level 4 → 1000 XP
- Level 5+ → exponential scaling

---

### 7.3 Meaning of Levels

Levels unlock:

- Stronger lock modes
- More strict discipline enforcement
- Visual progression identity

---

## 8. LOCK LEVEL SYSTEM (BEHAVIOR ENGINE)

This is the most important system in LockUp.

---

### 8.1 Level 1 — Flexible Mode

- User can exit anytime
- No penalty
- Used for onboarding

Purpose:
Build habit initiation

---

### 8.2 Level 2 — Commitment Mode

- Exit allowed
- XP penalty applied
- Streak risk introduced

Purpose:
Introduce consequence awareness

---

### 8.3 Level 3 — Strict Mode

- Cannot exit session
- Emergency override required
- Strong behavioral commitment

Purpose:
Force discipline execution

---

## 9. ACHIEVEMENT SYSTEM

---

### 9.1 Purpose

Achievements reinforce identity-based discipline.

---

### 9.2 Examples

- First Session Completed
- 7-Day Streak
- 30-Day Streak
- 100 Focus Hours
- Distraction Slayer (blocked app usage milestones)
- Discipline Master (high score threshold)

---

### 9.3 Design Rule

Achievements are NOT cosmetic.

They represent:

- Behavioral transformation milestones

---

## 10. BEHAVIOR DESIGN PRINCIPLES

---

### 10.1 Loss Aversion

Loss is more impactful than gain.

System prioritizes:

- Protecting streaks
- Avoiding penalties
- Maintaining discipline identity

---

### 10.2 Identity Formation

Users should think:

> “I am a disciplined person”

Not:

> “I am trying to be disciplined”

---

### 10.3 Consistency > Intensity

Small daily wins > occasional long sessions

---

## 11. ANTI-GAMIFICATION RULES

Do NOT:

- Add meaningless badges
- Reward random actions
- Create spammy XP loops
- Over-reward engagement

Everything must reinforce discipline behavior.

---

## 12. FINAL PRINCIPLE

Gamification is not decoration.

It is behavioral control logic.

In LockUp:

> If it does not change behavior, it does not exist.