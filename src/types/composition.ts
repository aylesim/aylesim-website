export type ShapeState = {
  vertexCount: number;
  baseRadius: number;
  hue: number;
  saturation: number;
  lightness: number;
  driftSpeed: number;
  breathAmplitude: number;
};

export type SoundState = {
  layers: number;
  baseFreq: number;
  filterCutoff: number;
  reverbDecay: number;
};

export type CompositionState = {
  shape: ShapeState;
  sound: SoundState;
  clickCount: number;
};

export const INITIAL_SHAPE: ShapeState = {
  vertexCount: 6,
  baseRadius: 120,
  hue: 140,
  saturation: 80,
  lightness: 55,
  driftSpeed: 0.3,
  breathAmplitude: 0.08,
};

export const INITIAL_SOUND: SoundState = {
  layers: 0,
  baseFreq: 110,
  filterCutoff: 800,
  reverbDecay: 1.5,
};

export const EVOLUTION_STEPS = 6;
export const GLITCH_DURATIONS = [1500, 800, 400, 300, 200, 100];
