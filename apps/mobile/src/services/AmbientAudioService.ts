import { Audio } from 'expo-av';
import { FocusEnvironment } from '../../../../packages/core';

class AmbientAudioService {
  private sound: Audio.Sound | null = null;
  private currentEnvironment: FocusEnvironment = 'none';

  private environmentMap: Record<FocusEnvironment, any> = {
    none: null,
    rain: require('../../assets/audio/rain.mp3'),
    lofi: require('../../assets/audio/lofi.mp3'),
    coffee: require('../../assets/audio/coffee.mp3'),
    library: require('../../assets/audio/library.mp3'),
    forest: require('../../assets/audio/forest.mp3'),
    space: require('../../assets/audio/space.mp3'),
  };

  async play(environment: FocusEnvironment) {
    if (environment === 'none') {
      await this.stop();
      return;
    }

    if (this.currentEnvironment === environment && this.sound) {
      return;
    }

    try {
      await this.stop();

      const { sound } = await Audio.Sound.createAsync(
        this.environmentMap[environment],
        { shouldPlay: true, isLooping: true, volume: 0.5 }
      );

      this.sound = sound;
      this.currentEnvironment = environment;
    } catch (error) {
      console.error('Error playing ambient audio:', error);
    }
  }

  async preload() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
    } catch (e) {}
  }

  async stop() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.sound = null;
      this.currentEnvironment = 'none';
    }
  }

  async setVolume(volume: number) {
    if (this.sound) {
      await this.sound.setVolumeAsync(volume);
    }
  }
}

export const ambientAudioService = new AmbientAudioService();
