// Gentle Japanese Pentatonic (Yo scale: D4, E4, G4, A4, B4, D5, E5) Music Box Chimes
// Uses native Web Audio API — OFF by default, zero autoplay, zero external MP3 dependencies.

const CHIME_FREQUENCIES = [293.66, 329.63, 392.0, 440.0, 493.88, 587.33, 659.25];

export class PeacefulSkyChimes {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private isPlaying = false;

  public start() {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.playSoftNote();
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playSoftNote();
      }
    }, 2600);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private playSoftNote() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freq =
      CHIME_FREQUENCIES[Math.floor(Math.random() * CHIME_FREQUENCIES.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Very soft, dreamy envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.032, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);
  }
}
