// Minimal Web Audio API ambient drone and micro-interaction sound synthesizer
let audioCtx = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let gainNode = null;
let lfo = null;
let lfoGain = null;
let isPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playMicroClick(freq = 800, type = 'sine', duration = 0.04) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context may be restricted before user interaction
  }
}

export function playSqueegeeSound() {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
  } catch (e) {}
}

export function toggleAmbientAudio() {
  if (isPlaying) {
    stopAmbientAudio();
    return false;
  } else {
    startAmbientAudio();
    return true;
  }
}

export function startAmbientAudio() {
  try {
    const ctx = getAudioContext();

    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);
    gainNode.connect(ctx.destination);

    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, ctx.currentTime);
    filter.connect(gainNode);

    osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1
    osc1.connect(filter);

    osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55.3, ctx.currentTime);
    osc2.connect(filter);

    lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
    lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(35, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.start();
    osc2.start();
    lfo.start();

    isPlaying = true;
    return true;
  } catch (err) {
    return false;
  }
}

export function stopAmbientAudio() {
  if (gainNode && audioCtx) {
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      try {
        if (osc1) osc1.stop();
        if (osc2) osc2.stop();
        if (lfo) lfo.stop();
      } catch (e) {}
      isPlaying = false;
    }, 1200);
  }
}
