# Design System — LockUp (Obsidian Focus)

Version: 1.1  
Status: Source of Truth  
Theme: Obsidian Focus

---

## 1. Design Philosophy
LockUp is a **Discipline Environment**. Every interaction should feel intentional, steady, and high-stakes.

**Core Principles:**
- **Calm Authority:** The UI should never feel frantic.
- **Intentional Friction:** We use friction as a tool for behavior reinforcement.
- **Visual Gravity:** The "Discipline Score" is the center of the application's universe.

---

## 2. Color System (Obsidian Focus)

### 2.1 Core Palette
- **Obsidian (Base):** `#0F172A` (Surface / Bear Body)
- **Violet (Energy):** `#8B5CF6` (Actions / Glow / Focus)
- **Canvas:** `#F8FAFC` (Light Mode Background)
- **Ink:** `#020617` (Dark Mode Background)

---

## 3. Typography
- **Primary:** Inter (Tight tracking for headings, normal for body)
- **Weights:** 400 (Regular), 600 (Semi-Bold), 900 (Black - for Score numbers)

---

## 4. Components

### 4.1 The Discipline Gauge
A central, circular gauge that visualizes the 0-1000 score. 
- **Active State:** Glowing Violet path.
- **Idle State:** Muted Slate path.

### 4.2 The Guardian Bear (Interactive)
The Bear is the soul of the UI.
- **Focusing:** `visor-focus` active, chest core pulsing.
- **Idle:** `visor-idle` active, breathing animation.
- **Risk:** `visor-alert` (Red/Orange energy) when a streak is in danger.

---

## 5. Anti-Pattern Rules
- NO generic "Congratulations!" popups. Use "Commitment Fulfilled."
- NO bright, saturated primary colors other than Violet.
- NO rounded corners less than 12px (Premium cards should feel smooth).
