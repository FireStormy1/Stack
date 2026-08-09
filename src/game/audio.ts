type ToneName = 'drop' | 'impact' | 'perfect' | 'milestone' | 'gameover' | 'ui';
type MusicMode = 'relaxed' | 'competitive';

class SoundManager {
  private context: AudioContext | null = null;
  private muted = false;
  private musicRequested = false;
  private musicGain: GainNode | null = null;
  private musicOscillators: OscillatorNode[] = [];

  setMuted(value: boolean) {
    this.muted = value;
    if (value) this.pauseMusic();
    else if (this.musicRequested) this.startMusic();
  }

  private getContext() {
    if (typeof window === 'undefined' || this.muted) return null;
    try {
      if (!this.context) {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return null;
        this.context = new AudioContextClass();
      }
      if (this.context.state === 'suspended') void this.context.resume();
      return this.context;
    } catch {
      return null;
    }
  }

  play(name: ToneName) {
    const context = this.getContext();
    if (!context) return;
    const settings: Record<ToneName, { frequency: number; duration: number; type: OscillatorType; gain: number; slide?: number }> = {
      drop: { frequency: 188, duration: 0.08, type: 'sine', gain: 0.035, slide: 142 },
      impact: { frequency: 116, duration: 0.11, type: 'triangle', gain: 0.05, slide: 78 },
      perfect: { frequency: 440, duration: 0.18, type: 'sine', gain: 0.045, slide: 660 },
      milestone: { frequency: 330, duration: 0.35, type: 'sine', gain: 0.05, slide: 660 },
      gameover: { frequency: 190, duration: 0.42, type: 'sine', gain: 0.045, slide: 72 },
      ui: { frequency: 300, duration: 0.06, type: 'sine', gain: 0.025, slide: 360 },
    };
    const tone = settings[name];
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = tone.type;
    oscillator.frequency.setValueAtTime(tone.frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(tone.slide ?? tone.frequency, now + tone.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(tone.gain, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + tone.duration + 0.025);
  }

  startMusic(mode: MusicMode = 'relaxed') {
    this.musicRequested = true;
    if (this.muted || this.musicOscillators.length > 0) return;
    const context = this.getContext();
    if (!context) return;
    const trackRoots = mode === 'relaxed' ? [146.83, 164.81, 174.61, 196] : [130.81, 146.83, 164.81, 184.99];
    const root = trackRoots[Math.floor(Math.random() * trackRoots.length)];
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.018, context.currentTime + 1.6);
    gain.connect(context.destination);
    this.musicGain = gain;

    [root, root * 1.5].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 0 ? -4 : 5;
      oscillator.connect(gain);
      oscillator.start();
      this.musicOscillators.push(oscillator);
    });
  }

  pauseMusic() {
    if (!this.musicGain || !this.context) return;
    const now = this.context.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(0.0001, now + 0.2);
  }

  resumeMusic() {
    if (!this.musicGain || !this.context || this.muted) return;
    const now = this.context.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(0.018, now + 0.5);
    if (this.context.state === 'suspended') void this.context.resume();
  }

  stopMusic() {
    this.musicRequested = false;
    if (!this.context) return;
    const now = this.context.currentTime;
    if (this.musicGain) {
      this.musicGain.gain.cancelScheduledValues(now);
      this.musicGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
    }
    for (const oscillator of this.musicOscillators) {
      try { oscillator.stop(now + 0.16); } catch { /* already stopped */ }
    }
    this.musicOscillators = [];
    this.musicGain = null;
  }
}

export const sound = new SoundManager();
