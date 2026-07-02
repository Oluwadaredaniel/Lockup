import { calculateDisciplineScore, getLevelFromXP } from './index';

describe('Discipline Logic', () => {
  test('calculateDisciplineScore returns 0 for new users', () => {
    expect(calculateDisciplineScore(0, 0, 0)).toBe(0);
  });

  test('calculateDisciplineScore caps at 1000', () => {
    // 100 sessions, 0 failed, 30 day streak
    // Score = (100/100 * 800) + (30 * 10 = 300) = 1100 -> should cap or be handled
    const score = calculateDisciplineScore(100, 0, 30);
    expect(score).toBeLessThanOrEqual(1000);
  });

  test('calculateDisciplineScore penalizes failures', () => {
    const perfectScore = calculateDisciplineScore(10, 0, 0);
    const flawedScore = calculateDisciplineScore(8, 2, 0);
    expect(flawedScore).toBeLessThan(perfectScore);
  });

  test('getLevelFromXP calculates levels correctly', () => {
    expect(getLevelFromXP(0)).toBe(1);
    expect(getLevelFromXP(500)).toBe(2);
    expect(getLevelFromXP(1200)).toBe(3);
  });
});
