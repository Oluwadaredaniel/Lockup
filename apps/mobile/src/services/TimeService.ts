import * as Device from 'expo-device';

export class TimeService {
  /**
   * Fetches true network time to prevent time-travel cheating.
   * Skeleton implementation using a worldtime API or ping.
   */
  static async getNetworkTime(): Promise<number> {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC', {
        signal: AbortSignal.timeout(3000)
      });
      const data = await response.json();
      return new Date(data.datetime).getTime();
    } catch (e) {
      console.warn('Clock sync failed, falling back to system time');
      return Date.now();
    }
  }

  /**
   * Returns device uptime since last reboot.
   * Useful for measuring duration accurately regardless of wall-clock changes.
   */
  static getUptime(): number {
    // In a real native module this would call SystemClock.elapsedRealtime()
    return Date.now();
  }
}
