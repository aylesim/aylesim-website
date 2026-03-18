"use client";

import { useCallback, useEffect, useRef } from "react";

export function useSoundscape(_layers: number) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    burst: (() => void) | null;
    loopLayers: { stop: () => void }[];
  }>({ burst: null, loopLayers: [] });

  const getContext = useCallback(async () => {
    if (typeof window === "undefined") {
      return null;
    }
    if (!ctxRef.current) {
      ctxRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      )();
    }
    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playBurst = useCallback(async () => {
    const ctx = await getContext();
    if (!ctx) {
      return;
    }

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;
    const gain = ctx.createGain();
    gain.gain.value = 0.3;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + 0.4);
  }, [getContext]);

  const addLayer = useCallback(
    async (layerIndex: number) => {
      const ctx = await getContext();
      if (!ctx || nodesRef.current.loopLayers[layerIndex]) {
        return;
      }

      const freqs = [55, 82.5, 110, 165, 220, 330];
      const baseFreq = freqs[layerIndex % freqs.length];

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = baseFreq;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400 + layerIndex * 150;
      const gain = ctx.createGain();
      gain.gain.value = 0.08 + layerIndex * 0.02;

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.5 + layerIndex * 0.2;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);
      osc.start();
      lfo.start();

      nodesRef.current.loopLayers[layerIndex] = {
        stop: () => {
          osc.stop();
          lfo.stop();
        },
      };
    },
    [getContext]
  );

  useEffect(
    () => () => {
      for (const l of nodesRef.current.loopLayers) {
        l?.stop();
      }
      nodesRef.current.loopLayers = [];
    },
    []
  );

  return { playBurst, addLayer };
}
