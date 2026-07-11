# Android Enforcement Strategy — LockUp

Version: 1.0  
Status: Technical Implementation Blueprint  
Target: Android API 24+ (7.0+)

---

## 1. Overview

To deliver on the "Strict Mode" promise, LockUp must prevent users from accessing distracting apps during a focus session. On Android, this is achieved through a multi-layered enforcement strategy.

---

## 2. Layer 1: The Accessibility Service (The Watchman)

The core of our enforcement is a custom `AccessibilityService`.

### 2.1 Responsibilities
- Listen for `TYPE_WINDOW_STATE_CHANGED` events.
- Extract the `packageName` of the foreground application.
- Compare the package name against the user's `blockedApps` list.
- If a match is found AND a session is active:
  - Immediately launch the `LockOverlayActivity` with `FLAG_ACTIVITY_NEW_TASK`.

### 2.2 Un-bypassable Logic
If the user tries to press "Back" or "Home" to exit the `LockOverlayActivity` while the distracting app is still the target, the Accessibility Service will simply re-trigger and relaunch the overlay.

---

## 3. Layer 2: System Alert Window (The Shield)

We use the `SYSTEM_ALERT_WINDOW` permission to draw the "Locked" UI over other apps.

### 3.1 Implementation
- Use a `ComposeView` or a native `FrameLayout` to render the "Stay Focused" message and the mascot.
- Set `WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY`.
- Ensure the overlay consumes all touch events so the user cannot interact with the app underneath.

---

## 4. Layer 3: Anti-Force Stop (The Anchor)

Users will try to kill LockUp from the "Recent Apps" or "App Info" screens.

### 4.1 Mitigation
1. **Persistent Notification:** Run a Foreground Service with a `sticky` notification. This makes the OS less likely to kill the app.
2. **Usage Stats Verification:** Use `UsageStatsManager` to detect if the user has navigated to the "Settings" app to force-stop LockUp. If they do, show a warning or trigger an immediate Level 3 penalty.
3. **Battery Optimization:** Guide users through the "Disable Battery Optimization" flow (White-listing) during onboarding.

---

## 5. Layer 4: Anti-Cheat (The Truth)

Users may try to change the system time to end a session early.

### 5.1 Mitigation
- **NTP Check:** On session start and end, ping `time.google.com` or `cloudflare.com` to get the true network time.
- **Uptime Clock:** Use `SystemClock.elapsedRealtime()` which is immune to system clock changes (it only resets on reboot). If the duration between two `elapsedRealtime` checks doesn't match the wall clock change, we know the user tampered with the time.

---

## 6. Expo Integration (The Bridge)

Since we are using Expo, we will implement this using a **Config Plugin** and **Custom Native Modules**.

### 6.1 Steps
1. Create `expo-module-lockup-enforcement`.
2. Implement `LockupAccessibilityService.kt`.
3. Implement `FocusForegroundService.kt`.
4. Create an `app.config.js` plugin to inject the `<service>` tags into `AndroidManifest.xml`.

---

## 7. UX of Enforcement

Enforcement shouldn't feel like a bug; it should feel like a **Guardian**.
- The overlay should feature the **Guardian Bear** mascot.
- The copy should be "Discipline beats motivation" rather than "App Blocked".
- Provide a clear path back to the LockUp app.

---

## 8. Failure Recovery

If the app is killed or the phone reboots:
- The Foreground Service should start on `BOOT_COMPLETED`.
- It should check Firestore for any "Active" sessions that haven't expired.
- If an active session is found, it immediately re-engages the blocking layer.
