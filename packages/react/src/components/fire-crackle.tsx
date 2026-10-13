"use client";
import { useEffect } from "react";

// A small fire crackle on every click of something interactive.
// Synthesized with Web Audio (filtered noise + a few pops), so there's no sound file.
const INTERACTIVE = 'a[href], button, input, select, textarea, label, summary, [role="button"], [onclick], [tabindex]:not([tabindex="-1"])';

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function burst(t: number, dur: number, freq: number, q: number, gain: number, type: BiquadFilterType) {
    const src = ctx!.createBufferSource();
    src.buffer = noise;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    const filter = ctx!.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const env = ctx!.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(gain, t + Math.min(0.01, dur / 4));
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter).connect(env).connect(ctx!.destination);
    src.start(t, Math.random() * 0.5, dur + 0.05);
}

/** Play one crackle now */
export function crackle(volume = 1) {
    if (!ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
        const data = noise.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime + 0.005;
    // Soft whoosh of the flame catching, then a few crackles scattered over it
    burst(t, 0.28, 600, 0.7, 0.12 * volume, "lowpass");
    const pops = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < pops; i++) {
        burst(t + Math.random() * 0.22, 0.015 + Math.random() * 0.02, 1800 + Math.random() * 2500, 3, (0.18 + Math.random() * 0.12) * volume, "bandpass");
    }
}

/** Crackle on every click of a link, button, field or anything with cursor: pointer */
export function useFireCrackle(enabled = true, volume = 1) {
    useEffect(() => {
        if (!enabled) return;
        const onDown = (e: PointerEvent) => {
            if (e.button !== 0 || !(e.target instanceof Element)) return;
            if (e.target.closest(INTERACTIVE) || getComputedStyle(e.target).cursor === "pointer") crackle(volume);
        };
        document.addEventListener("pointerdown", onDown, { capture: true, passive: true });
        return () => document.removeEventListener("pointerdown", onDown, { capture: true });
    }, [enabled, volume]);
}

/** Drop once anywhere in the app to turn the crackle on */
export function FireCrackle({ enabled = true, volume = 1 }: { enabled?: boolean; volume?: number }) {
    useFireCrackle(enabled, volume);
    return null;
}
