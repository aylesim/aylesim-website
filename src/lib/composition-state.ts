import type {
  CompositionState,
  ShapeState,
  SoundState,
} from "@/types/composition";
import {
  EVOLUTION_STEPS,
  GLITCH_DURATIONS,
  INITIAL_SHAPE,
  INITIAL_SOUND,
} from "@/types/composition";

export function evolveShape(clickCount: number): ShapeState {
  const step = Math.min(clickCount, EVOLUTION_STEPS);
  return {
    ...INITIAL_SHAPE,
    vertexCount: INITIAL_SHAPE.vertexCount + step,
    hue: (INITIAL_SHAPE.hue + step * 25) % 360,
    driftSpeed: INITIAL_SHAPE.driftSpeed + step * 0.15,
    breathAmplitude: INITIAL_SHAPE.breathAmplitude + step * 0.02,
  };
}

export function evolveSound(clickCount: number): SoundState {
  return {
    ...INITIAL_SOUND,
    layers: Math.min(clickCount, EVOLUTION_STEPS),
    filterCutoff: INITIAL_SOUND.filterCutoff + clickCount * 100,
    reverbDecay: INITIAL_SOUND.reverbDecay + clickCount * 0.2,
  };
}

export function getGlitchDuration(clickCount: number): number {
  const index = Math.min(clickCount - 1, EVOLUTION_STEPS - 1);
  return GLITCH_DURATIONS[Math.max(0, index)] ?? 100;
}

export function createCompositionState(clickCount: number): CompositionState {
  return {
    shape: evolveShape(clickCount),
    sound: evolveSound(clickCount),
    clickCount,
  };
}

export function serializeComposition(state: CompositionState): string {
  return btoa(JSON.stringify(state));
}

export function deserializeComposition(
  encoded: string
): CompositionState | null {
  try {
    return JSON.parse(atob(encoded)) as CompositionState;
  } catch {
    return null;
  }
}
