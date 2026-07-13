import { useCallback, useEffect, useRef, useState } from "react";

// Original 8-bit platformer loop (C major, ~145bpm) — synthesized in-code,
// NOT a copyrighted theme. 0 = rest.
const LEAD = [
  783.99, 0, 659.25, 783.99, 880, 0, 783.99, 659.25, 1046.5, 0, 880, 783.99,
  659.25, 0, 587.33, 0, 698.46, 0, 880, 698.46, 783.99, 0, 659.25, 523.25,
  587.33, 659.25, 783.99, 880, 783.99, 0, 0, 0,
];
const BASS = [
  130.81, 0, 130.81, 0, 220, 0, 220, 0, 174.61, 0, 174.61, 0, 196, 0, 196, 0,
  174.61, 0, 174.61, 0, 130.81, 0, 130.81, 0, 196, 0, 196, 0, 130.81, 0, 0, 0,
];

type Ctx = AudioContext & { webkitAudioContext?: never };

export function useSound() {
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);
  const actxRef = useRef<Ctx | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepRef = useRef(0);
  const nextTimeRef = useRef(0);
  const eighthRef = useRef(60 / 145 / 2);

  const tone = useCallback(
    (freq: number, time: number, len: number, type: OscillatorType, vol: number) => {
      const ctx = actxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);
      g.gain.setValueAtTime(0.0001, time);
      g.gain.exponentialRampToValueAtTime(vol, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, time + len);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + len + 0.02);
    },
    []
  );

  const scheduler = useCallback(() => {
    const ctx = actxRef.current;
    if (!ctx) return;
    while (nextTimeRef.current < ctx.currentTime + 0.12) {
      const i = stepRef.current % LEAD.length;
      const e = eighthRef.current;
      if (LEAD[i]) tone(LEAD[i], nextTimeRef.current, e * 0.9, "square", 0.06);
      if (BASS[i]) tone(BASS[i], nextTimeRef.current, e * 0.95, "triangle", 0.1);
      nextTimeRef.current += e;
      stepRef.current += 1;
    }
  }, [tone]);

  const startMusic = useCallback(() => {
    const ctx = actxRef.current;
    if (!ctx || timerRef.current) return;
    stepRef.current = 0;
    nextTimeRef.current = ctx.currentTime + 0.06;
    timerRef.current = setInterval(scheduler, 25);
  }, [scheduler]);

  const stopMusic = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleSound = useCallback(() => {
    try {
      if (!actxRef.current) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        actxRef.current = new AC() as Ctx;
      }
      if (actxRef.current.state === "suspended") actxRef.current.resume();
    } catch (e) {
      /* autoplay policy — ignore */
    }
    setSoundOn((on) => {
      const next = !on;
      soundOnRef.current = next;
      if (next) startMusic();
      else stopMusic();
      return next;
    });
  }, [startMusic, stopMusic]);

  // Short triangle "boing" fired on each hop while sound is on.
  const playBlip = useCallback(() => {
    const ctx = actxRef.current;
    if (!soundOnRef.current || !ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(760, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.17);
  }, []);

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  return { soundOn, toggleSound, playBlip };
}
