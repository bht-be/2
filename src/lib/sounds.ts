let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export type SoundType = 'click' | 'success' | 'error' | 'relic' | 'unlockSequence' | 'whoosh' | 'ambient';

let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;

export const playSound = (type: SoundType) => {
  const ctx = initAudio();
  const now = ctx.currentTime;

  if (type === 'ambient') {
    if (ambientSource) return;
    
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    ambientSource = ctx.createBufferSource();
    ambientSource.buffer = buffer;
    ambientSource.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, now);
    
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0, now);
    ambientGain.gain.linearRampToValueAtTime(0.02, now + 2);
    
    ambientSource.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    
    ambientSource.start(now);
    return;
  }

  const createOsc = (oscType: OscillatorType, freq: number, gainVal: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = oscType;
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.start(now);
    osc.stop(now + duration);
    return { osc, gain };
  };

  if (type === 'click') {
    createOsc('sine', 800, 0.05, 0.1);
  } else if (type === 'success') {
    const { osc } = createOsc('triangle', 400, 0.05, 0.4);
    osc.frequency.setValueAtTime(800, now + 0.1);
  } else if (type === 'error') {
    const { osc, gain } = createOsc('sawtooth', 150, 0.1, 0.2);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
  } else if (type === 'relic') {
    // Grand chord
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(400, now);
    osc1.frequency.setValueAtTime(600, now + 0.2);
    osc1.frequency.setValueAtTime(800, now + 0.4);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.1, now + 0.5);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 2);
    osc1.start(now);
    osc1.stop(now + 2);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(600, now);
    osc2.frequency.setValueAtTime(900, now + 0.2);
    osc2.frequency.setValueAtTime(1200, now + 0.4);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.1, now + 0.5);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 2);
    osc2.start(now);
    osc2.stop(now + 2);
  } else if (type === 'unlockSequence') {
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(600, now + 2.5);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.1, now + 1);
    gain1.gain.linearRampToValueAtTime(0, now + 3);
    osc1.start(now);
    osc1.stop(now + 3);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(300, now);
    osc2.frequency.exponentialRampToValueAtTime(900, now + 2.5);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.05, now + 1);
    gain2.gain.linearRampToValueAtTime(0, now + 3);
    osc2.start(now);
    osc2.stop(now + 3);
  } else if (type === 'whoosh') {
    const noise = ctx.createBufferSource();
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(1000, now + 0.25);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.25);
    gain.gain.linearRampToValueAtTime(0, now + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.5);
  }
};
