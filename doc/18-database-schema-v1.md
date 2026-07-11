# Database Schema V1 — LockUp

Version: 1.0  
Status: Source of Truth

---

## 1. users (Collection)
- `uid`: string (Primary Key)
- `name`: string
- `email`: string
- `xp`: number
- `level`: number
- `disciplineScore`: number (0-1000)
- `streak`: number
- `lastActive`: timestamp
- `completedSessions`: number
- `failedSessions`: number
- `weeklyActivity`: number[] (7 items)
- `dailyXPGoal`: number
- `probationUntil`: timestamp (Optional)
- `gems`: number
- `achievements`: Achievement[]

---

## 2. sessions (Collection)
- `id`: string (Auto-generated)
- `userId`: string (Index)
- `name`: string
- `duration`: number (Minutes)
- `lockLevel`: number (1-3)
- `status`: string ('active' | 'completed' | 'failed' | 'abandoned')
- `environment`: string
- `startedAt`: timestamp
- `endedAt`: timestamp (Optional)
- `blockedApps`: string[]

---

## 3. xp_transactions (Collection)
- `id`: string
- `userId`: string (Index)
- `amount`: number
- `reason`: string
- `createdAt`: timestamp

---

## 4. shielded_slots (Sub-collection of users)
- `id`: string
- `name`: string
- `dayOfWeek`: number (0-6)
- `startTime`: string ("HH:mm")
- `duration`: number
- `lockLevel`: number
- `environment`: string
- `enabled`: boolean
