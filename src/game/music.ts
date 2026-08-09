const MUSIC_TRACKS = Array.from(
  { length: 10 },
  (_, index) => `/assets/music/music${index + 1}.mp3`,
);

class MusicManager {
  private audios = MUSIC_TRACKS.map((src) => new Audio(src));
  private unavailable = new Set<number>();
  private current = 0;
  private playing = false;
  private requested = false;
  private muted = false;
  volume = 0.3;

  constructor() {
    this.audios.forEach((audio, index) => {
      audio.preload = 'auto';
      audio.loop = false;
      audio.volume = this.volume;
      audio.addEventListener('ended', () => this.nextTrack());
      audio.addEventListener('error', () => this.handleTrackFailure(index));
    });
  }

  // Called directly by the Play/Restart click handler so play() retains user activation.
  start() {
    this.requested = true;
    if (this.muted || this.playing) return;
    this.current = this.pickRandomTrack(undefined, false);
    this.playing = true;
    this.playCurrentTrack();
  }

  private playCurrentTrack() {
    const trackIndex = this.current;
    const audio = this.audios[trackIndex];
    audio.volume = this.volume;
    audio.muted = this.muted;
    void audio.play()
      .then(() => console.info('BACKGROUND MUSIC PLAYING', audio.src))
      .catch(() => this.handleTrackFailure(trackIndex));
  }

  private handleTrackFailure(index: number) {
    if (this.unavailable.has(index)) return;
    this.unavailable.add(index);
    if (index === this.current && this.playing) this.nextTrack();
  }

  private nextTrack() {
    const available = this.audios
      .map((_, index) => index)
      .filter((index) => !this.unavailable.has(index));
    if (available.length === 0) {
      this.playing = false;
      console.error('Background music failed: no playable tracks were found.');
      return;
    }
    this.current = this.pickRandomTrack(available);
    this.playCurrentTrack();
  }

  private pickRandomTrack(available = this.audios
    .map((_, index) => index)
    .filter((index) => !this.unavailable.has(index)), excludeCurrent = true) {
    const alternatives = excludeCurrent ? available.filter((index) => index !== this.current) : available;
    const candidates = alternatives.length > 0 ? alternatives : available;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  pause() {
    if (!this.playing) return;
    this.audios[this.current].pause();
    this.playing = false;
  }

  resume() {
    if (this.muted || this.playing || this.unavailable.has(this.current)) return;
    this.playing = true;
    this.playCurrentTrack();
  }

  stop() {
    this.audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.playing = false;
    this.requested = false;
    this.current = 0;
  }

  setMuted(value: boolean) {
    this.muted = value;
    this.audios.forEach((audio) => { audio.muted = value; });
    if (value) this.pause();
    else if (this.requested) this.resume();
  }
}

export const music = new MusicManager();
