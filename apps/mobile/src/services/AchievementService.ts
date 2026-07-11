import { UserProfile, Achievement } from '../../../../packages/core';
import { UserService } from './UserService';
import { NotificationService } from './NotificationService';

export class AchievementService {
  static async checkAchievements(user: UserProfile): Promise<Achievement[]> {
    const updatedAchievements = [...user.achievements];
    let changed = false;
    let newUnlocks: string[] = [];

    for (const achievement of updatedAchievements) {
      if (achievement.unlocked) continue;

      const isMet = this.checkRequirement(user, achievement.requirement);
      if (isMet) {
        achievement.unlocked = true;
        achievement.date = new Date().toLocaleDateString();
        newUnlocks.push(achievement.title);
        changed = true;
      }
    }

    if (changed) {
      await UserService.updateProfile(user.uid, {
        achievements: updatedAchievements,
        gems: user.gems + newUnlocks.length * 50
      });

      for (const title of newUnlocks) {
        NotificationService.sendInstantNotification(
          "Achievement Unlocked! 🏅",
          `Congratulations! You've earned: ${title}`
        );
      }
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
      case 'focus_100_hours':
        return user.completedSessions >= 100; // Mock volume requirement
      default:
        return false;
    }
  }
}
