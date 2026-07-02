# Design System — LockUp

Version: 1.0  
Status: Source of Truth  
Scope: UI, UX, Visual Language, Interaction Rules

---

## 1. Design Philosophy

LockUp is not a productivity UI.

It is a discipline environment.

The design must:

- Reduce distraction
- Reinforce focus
- Create emotional weight for actions
- Make discipline feel tangible
- Feel premium and intentional

Every pixel must answer:

> Does this increase focus or reduce friction toward discipline?

If not → remove it.

---

## 2. Visual Identity

LockUp visual identity is defined by:

- Calm authority
- Minimal cognitive load
- Structured clarity
- Emotional reinforcement of discipline

It should feel closer to:

- Linear (clarity)
- Arc (polish + motion)
- Notion (structure)
- Duolingo (behavior loops)
- Forest (focus psychology)

But must NOT resemble any of them visually.

---

## 3. Color System

### 3.1 Core Palette

These are the ONLY allowed colors:

#### Primary
- `#7C3AED` → Plum (core action color)

#### Secondary
- `#C4B5FD` → Soft lavender (support UI elements)

#### Background
- `#FAF8FF` → Off-white base background

#### Neutrals
- #111827 → Primary text
- #6B7280 → Secondary text
- #E5E7EB → Borders / dividers

---

### 3.2 Color Rules

- Only ONE primary action color per screen
- Background must always be light and calm
- No saturated chaotic colors
- No gradients unless explicitly designed for reward moments

---

## 4. Typography

Font Family: System + Inter fallback (or equivalent modern sans-serif)

### Type Scale

| Role | Size | Weight | Usage |
|------|------|--------|------|
| H1 | 32–40px | 700 | Page titles |
| H2 | 24–28px | 600 | Section headers |
| H3 | 18–20px | 600 | Subsections |
| Body | 14–16px | 400 | Default text |
| Small | 12px | 400 | Metadata |

---

### Typography Rules

- No decorative fonts
- No mixed font families
- Maximum 3 font sizes per screen
- Line height must improve readability (1.4–1.6)

---

## 5. Layout System

### 5.1 Grid

- 4pt base system (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64)
- Mobile-first design
- Max width containers for large screens

---

### 5.2 Spacing Rules

- Use consistent vertical rhythm
- Avoid dense clustering
- Minimum spacing between sections: 24px
- Maximum breathing sections: 64px+

---

### 5.3 Structure Philosophy

Every screen must follow:

1. Focus State (what matters now)
2. Action (what user must do)
3. Feedback (progress or result)

No screen should be informational only.

---

## 6. Components

---

### 6.1 Primary Button

- Background: #7C3AED
- Text: white
- Radius: 12px
- Height: 48px
- Full width on mobile preferred

States:
- Hover: slight darkening
- Active: scale down (0.98)
- Disabled: opacity 0.5

---

### 6.2 Secondary Button

- Transparent background
- Border: #C4B5FD
- Text: #7C3AED

Used for:
- Cancel actions
- Secondary flows

---

### 6.3 Cards

Purpose:
Contain sessions, stats, achievements

Properties:
- White background
- Soft shadow
- Rounded corners (16px)
- Internal padding: 16–20px

Hover:
- Slight lift (2–4px)
- Shadow increase

---

### 6.4 Input Fields

- Minimal borders
- Focus state: purple outline (#7C3AED)
- No heavy boxes

---

### 6.5 Badges

Used for:
- Streaks
- XP
- Status indicators

Style:
- Pill shape
- Light purple background
- Compact text

---

## 7. Interaction Design

---

### 7.1 Motion Principles

Motion must communicate:

- Progress
- Discipline enforcement
- Completion satisfaction

Not decoration.

---

### 7.2 Timing

- Fast interactions: 150ms
- Standard: 250–300ms
- Reward animations: up to 600ms

---

### 7.3 Transitions

- Smooth easing (cubic-bezier preferred)
- No abrupt changes
- No instant state swaps

---

## 8. UX Behavior Rules

---

### 8.1 Discipline First Rule

Every interaction must reinforce:

- Commitment
- Consequence
- Consistency

---

### 8.2 Friction Rules

Friction is allowed ONLY when:

- It increases commitment
- It strengthens discipline behavior
- It reduces impulsive exits

Example:
- Confirming session exit at Level 2+

---

### 8.3 Feedback Rules

Every action must produce feedback:

- XP gain
- Progress animation
- Streak update
- Visual confirmation

No silent actions.

---

## 9. Screen Quality Standard

Every screen must pass:

- Is hierarchy instantly clear?
- Is action obvious?
- Is distraction minimized?
- Does it feel premium?
- Would a top-tier startup ship this?

If not → redesign.

---

## 10. Anti-Patterns (STRICTLY FORBIDDEN)

- Overloaded dashboards
- Multiple competing CTAs
- Excessive colors
- Decorative animations
- Dense text walls
- Inconsistent spacing
- Random shadows

---

## 11. Final Principle

Design is not decoration.

Design is behavioral engineering.

In LockUp:

> The UI is part of the discipline system.