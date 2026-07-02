# Screen Inventory — LockUp

Version: 1.0  
Status: UI System Map  
Scope: All app screens, states, and future expansions

---

## 1. Purpose

This document defines every screen in LockUp.

It ensures:

- No missing flows
- No random UI additions
- Clear MVP boundaries
- Scalable feature expansion
- Consistent user journey logic

---

## 2. Core Principle

> “Every screen must exist to support discipline behavior.”

If a screen does not:

- Help users focus
- Reinforce commitment
- Track discipline
- Provide feedback

It does not belong in the system.

---

## 3. Screen Categories

LockUp screens are divided into:

- Authentication
- Onboarding
- Core App
- Focus System
- Progress System
- Profile System
- System States
- Future Expansion

---

## 4. Authentication Screens

---

### 4.1 Splash Screen

Purpose:

- App loading
- Initial session validation

Behavior:

- Check auth state
- Redirect accordingly

---

### 4.2 Login Screen

Methods:

- Email
- Google
- Apple

Focus:

- Minimal friction
- Fast access to app

---

### 4.3 Sign Up Screen

Collect:

- Name
- Email
- Password

Behavior:

- Initialize user profile
- Create default discipline structure

---

## 5. Onboarding Flow

---

### 5.1 Welcome Screen

Purpose:

- Introduce discipline philosophy

Message:

> “Discipline is built, not given.”

---

### 5.2 Intro Slides

Explain:

- Focus sessions
- Lock levels
- XP system
- Streak system

---

### 5.3 Permission Setup Screen

Requests:

- Notifications
- App blocking permissions (Android focus access where applicable)

---

### 5.4 First Session Setup

User creates:

- First focus session
- Duration
- Blocked apps
- Lock level

---

## 6. Core App Screens

---

### 6.1 Dashboard Screen

Main hub of LockUp.

Displays:

- Discipline Score
- XP
- Current Streak
- Today’s Focus Status
- Quick Start Session button

---

### 6.2 Focus Session Setup Screen

User configures:

- Session name
- Duration
- Apps to block
- Lock level

Primary CTA:

> Start Session

---

### 6.3 Active Focus Session Screen

Most important screen in app.

Displays:

- Countdown timer
- Session status
- Lock level indicator
- Minimal UI mode
- Exit restrictions (based on level)

Behavior:

- Prevent distraction
- Maintain focus state
- Lock navigation if needed

---

### 6.4 Session Completion Screen

Shows:

- XP earned
- Streak update
- Discipline score impact
- Completion message

---

### 6.5 Session Failure Screen

Triggered when:

- Session interrupted
- Exit allowed (Level 1–2)
- System detects abandonment

Displays:

- Penalty summary
- Motivation-neutral feedback
- Retry option

---

## 7. Progress System Screens

---

### 7.1 Progress Dashboard

Shows:

- XP history
- Streak history
- Discipline score graph
- Focus hours trend

---

### 7.2 Achievements Screen

Displays:

- Badges
- Milestones
- Unlock conditions

Examples:

- First Session
- 7-Day Streak
- 30-Day Streak
- Focus Master

---

## 8. Profile Screens

---

### 8.1 Profile Overview

Displays:

- User identity
- Discipline score
- Level progression

---

### 8.2 Settings Screen

Includes:

- Notification preferences
- Blocked apps management
- Account settings
- Privacy settings

---

## 9. System States

---

### 9.1 Loading State

- Session validation loading
- Minimal UI
- No distractions

---

### 9.2 Offline State

- Cached session access
- Sync indicator
- Limited functionality

---

### 9.3 Locked State Overlay

Appears during:

- Active strict sessions
- Navigation blocking

---

### 9.4 Error State

Must be:

- Calm
- Non-blaming
- Actionable

---

## 10. Navigation Structure

---

### Primary Tabs

- Dashboard
- Focus
- Progress
- Profile

---

### Navigation Rule

> Active Focus Session overrides all navigation

---

## 11. MVP vs Future Expansion

---

### MVP Screens

- Login / Signup
- Onboarding
- Dashboard
- Focus Session Setup
- Active Session
- Session Result
- Progress
- Profile

---

### Future Screens

- Social accountability system
- Leaderboards
- Study groups
- AI discipline coach
- Deep analytics dashboard

---

## 12. UX Flow Principle

---

User journey must feel like:

1. Enter app
2. See discipline status
3. Start focus session
4. Stay locked in
5. Earn reward
6. Repeat cycle

---

## 13. Critical Screen Rule

> The Active Focus Session screen is the heart of the entire product.

Everything else exists to support it.

---

## 14. Final Principle

If a screen does not improve discipline behavior:

> It does not belong in LockUp.
