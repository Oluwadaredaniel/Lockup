# Mobile Architecture — LockUp

Version: 1.0  
Status: System Architecture Source of Truth  
Stack: React Native (Expo) + TypeScript + Firebase

---

## 1. Purpose

This document defines how LockUp is structured at the application level.

It ensures:

- Scalability
- Maintainability
- Clean separation of concerns
- Predictable data flow
- Strong discipline logic enforcement consistency

---

## 2. Core Architecture Philosophy

LockUp architecture is built on:

> “Behavior-first architecture”

Meaning:

The system is designed around user discipline flows, not technical convenience.

---

## 3. Tech Stack

### Frontend

- React Native (Expo)
- TypeScript
- NativeWind (styling)
- React Navigation
- React Query (server state)

---

### Backend

- Firebase Authentication
- Firestore (primary database)
- Firebase Functions (logic enforcement)
- Firebase Cloud Messaging (notifications)

---

## 4. Project Structure


/src
/app
/navigation
/screens
/flows
/components
/features
/services
/hooks
/store
/utils
/constants
/types
/assets


---

## 5. Architecture Layers

LockUp uses a **4-layer system**:

---

### 5.1 UI Layer

Responsible for:

- Screens
- Components
- Visual rendering
- User interaction

NO business logic allowed here.

---

### 5.2 Feature Layer

Each feature is self-contained:

Examples:

- focus-session
- streak-system
- xp-system
- discipline-score

Each feature contains:

- logic
- hooks
- state
- services

---

### 5.3 Service Layer

Handles:

- Firebase calls
- API interactions
- Data persistence
- **Ambient Audio Service:** Manages seamless looping of focus environment sounds.
- **Enforcement Service:** Accessibility and Overlay management (Android Shield).
- External integrations

---

### 5.4 Core Logic Layer

This is the **discipline engine layer**:

Responsible for:

- XP calculation
- streak validation
- session validation
- discipline score computation
- lock level enforcement rules

This layer MUST be isolated.

---

## 6. Data Flow Architecture

Flow:

UI → Feature → Service → Firebase  
Firebase → Service → Feature → UI

Rules:

- UI never calls Firebase directly
- All logic passes through feature layer
- All discipline rules enforced in core layer

---

## 7. Navigation Structure

### Main Navigation Tabs

- Dashboard
- Focus Session
- Progress
- Profile

---

### Navigation Rules

- Focus Session can interrupt any flow
- Active session has priority state
- Lock mode can override navigation behavior

---

## 8. State Management Strategy

### Local State

- UI-only state (inputs, toggles)

---

### Feature State

- session state
- timer state
- UI transitions

---

### Global State

Minimal global state only:

- user session
- auth state
- active focus session
- discipline score snapshot

---

## 9. Firebase Architecture

---

### Collections


users
sessions
focus_logs
xp_transactions
streaks
blocked_apps
achievements
analytics_events
notifications


---

### Data Rules

- All session data is immutable after completion
- XP transactions are append-only
- Streak history is fully traceable
- Discipline score is computed, not manually edited

---

## 10. Focus Session Engine

---

### Session Lifecycle

1. Created
2. Started
3. Running
4. Completed OR Failed OR Abandoned

---

### Enforcement Rules

- Session state is locked during active run
- Exit behavior depends on Lock Level
- All session exits are logged

---

## 11. App Blocking System

---

### Mechanism

During active session:

- Selected apps are locked
- System enforces focus mode

---

### Enforcement Layer

Handled via:

- Native OS restrictions (where possible)
- Overlay blocking fallback
- Session interruption detection

---

## 12. Analytics System

Tracked events:

- session_created
- session_started
- session_completed
- session_failed
- session_abandoned
- xp_earned
- streak_increased
- app_blocked

---

## 13. Performance Principles

- Minimize re-renders
- Cache session state
- Avoid heavy global state updates
- Optimize timer system for accuracy

---

## 14. Security Rules

- User session must be validated
- XP cannot be client-faked
- Discipline score always server-derived
- Critical logic verified via Firebase Functions

---

## 15. System Reliability Rules

- Sessions must survive app restart
- Timer state must persist
- Fail-safe recovery for active sessions
- Offline handling for logging events

---

## 16. Core Architecture Principle

> “If the system can be bypassed easily, it does not enforce discipline.”

LockUp must always assume:

- Users will try to break the system
- Therefore logic must be server-verified where possible

---

## 17. Final Rule

Architecture is not about structure.

It is about enforcing behavior reliably.

In LockUp:

> The system is the discipline.