import { UserProfile, Achievement } from '../../../../packages/core';
import { UserService } from './UserService';

export class AchievementService {
  static async checkAchievements(user: UserProfile): Promise<Achievement[]> {
    const updatedAchievements = [...user.achievements];
    let changed = false;

    for (const achievement of updatedAchievements) {
      if (achievement.unlocked) continue;

      const isMet = this.checkRequirement(user, achievement.requirement);
      if (isMet) {
        achievement.unlocked = true;
        achievement.date = new Date().toLocaleDateString();
        changed = true;
      }
    }

    if (changed) {
      await UserService.updateProfile(user.uid, {
        achievements: updatedAchievements,
        gems: user.gems + (updatedAchievements.filter(a => a.unlocked).length - user.achievements.filter(a => a.unlocked).length) * 50
      });
    }

    return updatedAchievements;
  }

  private static checkRequirement(user: UserProfile, requirement: string): boolean {
    switch (requirement) {
      case 'complete_1_session':
        return user.completedSessions >= 1;
      case 'streak_7':
        return user.streak >= 7;
      case 'streak_30':
        return user.streak >= 30;
      case 'score_900':
        return user.disciplineScore >= 900;
      // Add more cases as needed
      default:
        return false;
    }
  }
}
