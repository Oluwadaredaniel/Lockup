# Granular Development Milestones — LockUp

This roadmap is designed for a high-commit frequency (60+ commits) with a focus on Mobile Excellence and Behavioral Testing.

---

## **Phase 1: Visual Identity & Shared Foundation**
*Goal: Setup the design system and shared logic core.*

### **1.1 Project Scaffolding (5-7 Commits)** [IN PROGRESS]
- [x] Setup Workspace directory structure (apps, packages, assets).
- [ ] Setup Expo (Mobile) with TypeScript and NativeWind.
- [x] Configure Shared `core/` directory for Firebase logic and shared types.
- [x] **Mascot Concept:** Finalized "The Guardian Bear" (Grizzly with Lavender Visor).
- [x] **Commit:** High-fidelity Mascot SVG Asset generated and modularized.
- [x] **Commit:** Initial `jest` setup for unit testing core logic.

### **1.2 Design System Implementation (8-10 Commits)**
- Define `theme.ts` (Colors, Spacing, Typography).
- Build `Button` component (Primary, Secondary, Ghost).
- Build `Typography` components (Heading, Subheading, Body).
- Build `Card` and `Badge` primitives.
- **QA:** Snapshot tests for all base components.

---

## **Phase 2: The Mascot & Animation Engine**
*Goal: Bring "The Guardian Bear" to life.*

### **2.1 Mascot Integration (5 Commits)**
- Integrate `lottie-react-native`.
- **Commit:** "Idle" Bear animation (Slow breathing, visor pulse).
- **Commit:** "Focusing" Bear (Sitting upright, visor bright).
- **Commit:** "Disappointed" Bear (Looking down, visor dimmed).
- **QA:** Performance audit (Ensure Lottie doesn't drop frames).

---

## **Phase 3: Firebase & Identity (10-12 Commits)**
*Goal: Secure auth and data persistence.*

- Setup Firebase Auth & Firestore schema.
- Implement `useAuth` hook.
- **Commit:** User profile initialization logic.
- **QA:** Unit tests for Auth State transitions.

---

## **Phase 4: Core Focus Engine (Mobile)**
*Goal: Build the heart of the discipline system.*

### **4.1 Session Logic (8-10 Commits)**
- Build the `TimerEngine` (Background-safe).
- **Commit:** Level 1, 2, and 3 logic implementation.
- **QA:** Stress test timer accuracy during app backgrounding.

### **4.2 Enforcement (5-7 Commits)**
- Android: Implement `UsageStats` & `Overlay` flow.
- **QA:** Manual testing on multiple Android versions (API 24-34).

---

## **Phase 5: Gamification & Progress**
*Goal: The reward loop (XP, Streaks, Score).*

### **5.1 The Logic Engine (8-10 Commits)**
- **Commit:** Shared logic for XP and Discipline Score.
- **Commit:** Streak counter with daily reset logic.
- **QA:** Unit tests covering all XP/Penalty scenarios.

---

## **Phase 6: Dashboard & Analytics**
*Goal: Visualizing growth.*

- Build the `DisciplineGauge` and `WeeklyActivity` chart.
- **QA:** Verify data accuracy against Firestore logs.

---

## **Phase 7: Final Polish & Launch (5-10 Commits)**
- Haptic feedback & smooth transitions.
- Final 60th Commit: "V1.0.0 Production Ready".

---

## **Future Expansion (Backlog)**
- Chrome Extension (Web Guard).
- Social Leaderboards.
- AI Discipline Coach.
