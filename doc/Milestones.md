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

### **1.2 Design System Implementation (8-10 Commits)** [IN PROGRESS]
- [x] Define `theme.ts` (Colors, Spacing, Typography).
- [x] Build `Button` component (Primary, Secondary, Ghost).
- [x] Build `Typography` components (Heading, Subheading, Body).
- [x] Build `Card` and `Badge` primitives.
- [x] **QA:** Setup Jest and React Native Testing Library.
- [x] **QA:** Implement Snapshot tests for the Mascot and UI Primitives.
- [ ] **QA:** Automated integration tests for the primary User Loop.

---

## **Phase 2: The Mascot & Animation Engine**
*Goal: Bring "The Guardian Bear" to life using Duolingo-style reactive animations.*

- [x] Integrate `lottie-react-native`.
- [ ] **Commit:** Implement "Emotional State Matrix" for the Bear (Focus, Alert, Disappointed).
- [ ] **Commit:** Implement "Tactile Squish" and "Visor Pulse" sensory feedback.
- [ ] **QA:** Performance audit (Ensure Lottie doesn't drop frames).

---

## **Phase 3: Firebase & Identity (10-12 Commits)** [IN PROGRESS]
*Goal: Secure auth and data persistence.*

- [ ] Setup Firebase Auth & Firestore schema.
- [x] Implement `useAuth` hook.
- [x] **Commit:** Premium Login Screen UI implementation.
- [x] **Commit:** Premium Signup Screen UI implementation.
- [x] **Commit:** Authentication flow navigation state (Onboarding -> Login -> Signup -> Dashboard).
- [x] **Commit:** Premium User Profile and Settings UI implementation.
- [x] **Commit:** User profile initialization logic.
- [ ] **Commit:** "Guardian Reminders" Duolingo-style Behavioral Notifications (FCM).
- [ ] **QA:** Unit tests for Auth State transitions.

---

## **Phase 4: Core Focus Engine (Mobile)** [IN PROGRESS]
*Goal: Build the heart of the discipline system.*

### **4.1 Session Logic (8-10 Commits)** [COMPLETED]
- [x] **Commit:** High-stakes Focus Session Setup UI implementation.
- [x] **Commit:** World-class Active Focus Timer UI implementation with **Emergency Override logic**.
- [x] **Commit:** Premium Session Completion Reward UI implementation.
- [x] **Commit:** Authoritative Android Focus Active Overlay UI implementation (The Shield).
- [x] Build the `TimerEngine` (Background-safe).
- [x] **Commit:** Level 1, 2, and 3 logic implementation.
- [ ] **QA:** Stress test timer accuracy during app backgrounding.

### **4.2 Enforcement (The Android Shield)**
- [ ] Implement `AccessibilityService` native module for app blocking.
- [ ] Implement `SystemAlertWindow` overlay logic.
- [ ] Implement `NTP` Anti-cheat sync.
- [ ] **QA:** Manual testing on multiple Android versions (API 24-34).

---

## **Phase 5: Gamification & Progress** [IN PROGRESS]
*Goal: The reward loop (XP, Streaks, Score).*

- [x] The Logic Engine (8-10 Commits)
- [x] **Commit:** High-fidelity Achievements Gallery UI implementation.
- [x] **Commit:** XP History and Transaction Log UI implementation.
- [x] **Commit:** Interactive Dashboard statistics and growth visualization.
- [x] Shared logic for XP and Discipline Score.

---

## **Phase 6: Dashboard & Analytics** [COMPLETED]
*Goal: Visualizing growth.*

- [x] Build the `DisciplineGauge` and `WeeklyActivity` chart.
- [ ] **QA:** Verify data accuracy against Firestore logs.

---

## **Phase 7: Final Polish & Launch (5-10 Commits)** [IN PROGRESS]
- [x] **Commit:** Core motion system and mascot breathing animations implementation.
- [x] **Commit:** Interactive feedback animations (Lock Shake, Reward Pulse).
- [x] **Commit:** World-class Empty States and Error Handling UI implementation.
- [x] Haptic feedback & smooth transitions.
- [ ] Final 60th Commit: "V1.0.0 Production Ready".

---

## **Future Expansion (Backlog)**
- Chrome Extension (Web Guard).
- Social Leaderboards.
- AI Discipline Coach.
