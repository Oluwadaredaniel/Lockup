# Granular Development Milestones — LockUp

This roadmap is designed for a high-commit frequency (60+ commits) and covers Mobile, Chrome Extension, and the Mascot system.

---

## **Phase 1: Visual Identity & Shared Foundation**
*Goal: Setup the design system and shared logic core.*

### **1.1 Project Scaffolding (5-7 Commits)** [IN PROGRESS]
- [x] Setup Workspace directory structure (apps, packages, assets).
- [ ] Setup Expo (Mobile) with TypeScript.
- [ ] Setup Vite + React (Chrome Extension) workspace.
- [ ] Configure Shared `core/` directory for Firebase logic.
- [ ] Install and configure NativeWind (Mobile) and Tailwind (Web).
- [x] **Mascot Concept:** Finalized "The Golem" (Stone Guardian) concept.

### **1.2 Design System Implementation (8-10 Commits)**
- Define `theme.ts` (Colors, Spacing, Typography).
- Build `Button` component (Primary, Secondary, Ghost).
- Build `Typography` components (Heading, Subheading, Body).
- Build `Card` and `Badge` primitives.
- Implement Light/Dark mode foundation.

---

## **Phase 2: The Mascot & Animation Engine**
*Goal: Bring the app to life without performance lag.*

### **2.1 Mascot Integration (5 Commits)**
- Integrate `lottie-react-native` and `lottie-react`.
- **Commit:** "Idle" Sentinel animation on Dashboard.
- **Commit:** "Focusing" animation for active sessions.
- **Commit:** "Celebration" animation for XP gain.
- **Commit:** "Disappointed" animation for session failure.

---

## **Phase 3: Firebase & Identity (10-12 Commits)**
*Goal: Handle auth and the "Discipline Profile".*

- Setup Firebase Auth (Email/Google).
- Create Firestore `users` schema.
- Implement `useAuth` hook in the shared core.
- **Commit:** User profile initialization (Level 1, 0 XP).
- **Commit:** Auth state persistence across app restarts.

---

## **Phase 4: Core Focus Engine (Mobile)**
*Goal: The heart of the mobile application.*

### **4.1 Session Logic (8-10 Commits)**
- Build the `DurationPicker` and `TaskSelector`.
- Implement the `TimerEngine` (Background-safe).
- **Commit:** Level 1 (Flexible) session logic.
- **Commit:** Level 2 (Commitment) with XP penalty hooks.
- **Commit:** Level 3 (Strict) with overlay prevention logic.

### **4.2 Mobile Enforcement (5-7 Commits)**
- Android: Implement `UsageStats` permission flow.
- Android: Build the "Focus Active" System Overlay.
- iOS: Setup `FamilyControls` (Screen Time API) placeholders.

---

## **Phase 5: Chrome Extension (The "Web Guard")**
*Goal: Cross-platform discipline enforcement.*

### **5.1 Extension Core (6-8 Commits)**
- Build the Extension Popup UI (Sync with Mobile XP).
- Implement the `Manifest v3` background script.
- **Commit:** Domain blocking logic (Block YouTube/Twitter).
- **Commit:** "Focus Mode" sync between Phone and Browser.

---

## **Phase 6: Gamification (The Reward Loop)**
*Goal: XP, Streaks, and Discipline Score.*

### **6.1 The XP Engine (6-8 Commits)**
- Shared logic for XP calculation.
- **Commit:** Streak counter with "Daily Reset" logic.
- **Commit:** Discipline Score algorithm (0-1000).
- **Commit:** Achievement unlocker system.

---

## **Phase 7: Dashboard & Analytics**
*Goal: Visualizing growth.*

- Build the `DisciplineGauge` (Circular progress).
- Build the `WeeklyActivity` Bar Chart.
- **Commit:** Session history list.
- **Commit:** Mascot "Advice" bubble based on score.

---

## **Phase 8: Polish & Launch (5-10 Commits)**
- Haptic feedback integration.
- Shared Element Transitions for smooth screen swaps.
- Performance audit (Memory leak check for Lottie).
- Final 60th Commit: "V1.0.0 Ready for Launch".
