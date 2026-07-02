# Motion System — LockUp

Version: 1.0  
Status: Interaction & Behavioral Feedback Layer  
Scope: Animation, transitions, feedback loops, emotional reinforcement

---

## 1. Purpose

This document defines how LockUp moves.

It ensures:

- Every interaction has feedback
- Discipline actions feel meaningful
- Progress feels tangible
- System states are emotionally readable
- User attention is guided intentionally

---

## 2. Core Principle

> “Motion is not decoration. Motion is reinforcement.”

In LockUp:

- Motion teaches behavior
- Motion confirms discipline
- Motion signals consequence

If motion does not reinforce behavior:

> It does not exist.

---

## 3. Motion Philosophy

LockUp motion must feel:

- Calm
- Intentional
- Weighted
- Controlled
- Purposeful

Never:

- Chaotic
- Flashy
- Game-like in a childish way
- Distracting

---

## 4. Motion Language

---

### 4.1 Progress Motion

Used when:

- Session starts
- Timer runs
- Streak increases
- XP increases

Behavior:

- Smooth linear progression
- No abrupt jumps
- Subtle easing only

Meaning:

> “You are moving forward.”

---

### 4.2 Discipline Feedback Motion

Used when:

- Session completed
- Lock level enforced
- Behavior confirmed

Behavior:

- Slight pause before reveal
- Gentle scale-in for rewards
- Controlled fade transitions

Meaning:

> “Your discipline was real.”

---

### 4.3 Consequence Motion

Used when:

- Session failed
- Streak broken
- XP penalty applied

Behavior:

- Slight downward motion (not harsh)
- Soft desaturation
- Calm fade-out of success state

Meaning:

> “This action had impact.”

---

### 4.4 Focus Lock Motion

Used when:

- Session starts
- UI enters focus mode

Behavior:

- Screen simplifies progressively
- Elements fade out in layers
- Center focus tightens toward timer

Meaning:

> “Everything unnecessary disappears.”

---

## 5. Core Interaction Animations

---

### 5.1 Session Start Animation

Flow:

1. User presses “Start Session”
2. UI pauses briefly (200–400ms)
3. Session card expands into full focus mode
4. Background dims
5. Timer becomes central focus

Purpose:

- Signal transition into discipline mode

---

### 5.2 Timer Motion

Behavior:

- Smooth decrement animation
- No jitter or irregular updates
- Consistent rhythm

Optional subtle pulse every minute milestone

---

### 5.3 XP Gain Animation

Flow:

1. XP calculated server-side
2. UI receives update
3. Floating number appears (+XP)
4. Smooth rise and fade out

Meaning:

> Reward is earned, not instant gratification

---

### 5.4 Streak Increase Animation

Flow:

1. Streak increments
2. Number gently scales up
3. Soft glow pulse appears briefly
4. Returns to stable state

Meaning:

> Identity reinforcement (“you are consistent”)

---

### 5.5 Failure Transition

Flow:

1. Session ends unexpectedly
2. UI slightly dims
3. Content fades to neutral tone
4. Message appears calmly

No harsh animation allowed.

Meaning:

> “Result acknowledged, no emotional punishment.”

---

## 6. Timing System

---

### Duration Tokens

- Fast: 150ms
- Base: 300ms
- Slow: 550ms

---

### Rules

- Micro interactions use fast timing
- State transitions use base timing
- System-level changes use slow timing

---

## 7. Easing Strategy

---

- Standard transitions: smooth ease-in-out
- Emphasis transitions: slightly stronger ease (emphasized curve)
- No linear-only motion except timer progression

---

## 8. Layout Motion Rules

---

### 8.1 Enter Transitions

- Fade + slight upward motion
- Low amplitude movement only

---

### 8.2 Exit Transitions

- Fade out
- Slight scale down (subtle only)

---

### 8.3 Focus Mode Transition

- Progressive UI collapse
- Non-essential elements fade in sequence

---

## 9. Hierarchy of Motion

---

1. System-critical motion (session start/end)
2. Behavioral reinforcement motion (XP, streak)
3. UI feedback motion (buttons, cards)
4. Decorative motion (minimized as much as possible)

---

## 10. Anti-Patterns

DO NOT:

- Add bounce effects
- Use playful animations
- Overuse micro-interactions
- Animate everything at once
- Compete for attention with timer

---

## 11. Performance Constraints

- All animations must be 60fps capable
- Avoid layout thrashing
- Prefer transform + opacity over layout changes

---

## 12. Emotional Design Rule

Motion must always answer:

> “What behavior am I reinforcing right now?”

If no answer exists:

> Remove the animation.

---

## 13. System Integration Rule

Motion is tightly coupled with:

- Session lifecycle events
- XP system
- Streak system
- Discipline score updates

---

## 14. Core Insight

> “Stillness builds focus. Motion confirms progress.”

LockUp uses motion only to reinforce discipline, never to distract from it.

---

## 15. Final Principle

If the system feels like a game:

> It has failed.

If the system feels like discipline becoming visible:

> It is correct.