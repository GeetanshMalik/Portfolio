import { useState, useEffect } from 'react';
import styles from './SoundToggle.module.css';

// Audio engine using Web Audio API to procedurally generate cosmic sounds
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.ambientOsc = null;
    this.ambientGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContextClass();
    this.startAmbientDrone();
  }

  setMute(isMuted) {
    this.muted = isMuted;
    if (!this.ctx) return;
    
    if (isMuted) {
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      }
    } else {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startAmbientDrone();
      if (this.ambientGain) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1);
      }
    }
  }

  // Procedure-generated low-frequency space drone
  startAmbientDrone() {
    if (!this.ctx || this.ambientOsc) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(this.muted ? 0.0001 : 0.08, this.ctx.currentTime);
    
    // Create base oscillator
    this.ambientOsc = this.ctx.createOscillator();
    this.ambientOsc.type = 'sine';
    this.ambientOsc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // Low C

    // Create filter to make it sound warm and deep
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);

    // Subtle modulation for "drifting in space" feel
    const modulator = this.ctx.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    
    const modulatorGain = this.ctx.createGain();
    modulatorGain.gain.setValueAtTime(30, this.ctx.currentTime);

    modulator.connect(modulatorGain);
    modulatorGain.connect(filter.frequency); // Modulate filter cutoff
    
    this.ambientOsc.connect(filter);
    filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    modulator.start();
    this.ambientOsc.start();
  }

  // Dynamic blip for button hover or interactions
  playBlip(freq = 880, duration = 0.1) {
    if (this.muted || !this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    // Decay frequency slightly
    osc.frequency.exponentialRampToValueAtTime(freq / 2, this.ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Sci-fi sweep when switching sections
  playSweep() {
    if (this.muted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.6);

    filter.type = 'peaking';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }
}

export const audioEngine = new CosmicAudioEngine();

const SoundToggle = () => {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    audioEngine.init();
    audioEngine.setMute(nextMute);
    if (!nextMute) {
      audioEngine.playBlip(1200, 0.15);
    }
  };

  return (
    <button 
      className={styles.soundButton} 
      onClick={toggleSound}
      onMouseEnter={() => audioEngine.playBlip(600, 0.05)}
      title={muted ? "Unmute cosmic audio" : "Mute cosmic audio"}
    >
      <div className={`${styles.icon} ${muted ? styles.muted : ''}`}>
        {muted ? (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </div>
    </button>
  );
};

export default SoundToggle;
