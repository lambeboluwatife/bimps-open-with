"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, Volume2 } from "lucide-react";

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Play romantic melody chords (Until I Found You motif)
  const playUntilIFoundYou = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Melody notes in Hz: A4, C#5, E5, F#5, E5, C#5, B4, A4...
      const melody = [
        440.0, 554.37, 659.25, 739.99, 659.25, 554.37, 493.88, 440.0,
        554.37, 659.25, 880.0, 739.99, 659.25, 554.37, 493.88, 440.0,
      ];
      let noteIndex = 0;

      const playNext = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "closed") {
          return;
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        const freq = melody[noteIndex % melody.length];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.45);

        noteIndex++;
        timerRef.current = window.setTimeout(playNext, 460);
      };

      playNext();
    } catch {
      // Audio fallback
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      playUntilIFoundYou();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <aside className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 group max-w-[calc(100vw-1.5rem)]">
      <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-full shadow-[0_4px_20px_-2px_rgba(73,52,59,0.14)] p-1.5 px-2.5 sm:px-3.5 flex items-center gap-2 sm:gap-3 transition-all duration-300 border border-primary-fixed/30 hover:shadow-xl">
        <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
          <Music className="w-3.5 h-3.5" />
        </div>

        <div className="flex flex-col text-left min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-label-sm text-[10px] sm:text-[11px] uppercase text-secondary font-semibold">
              Our Song
            </span>
            <span className="text-[10px] text-tertiary">♪</span>
          </div>
          <span className="font-body-sm text-[11px] sm:text-xs text-on-surface truncate max-w-[95px] xs:max-w-[130px] sm:max-w-[190px]">
            Until I Found You - Stephen Sanchez
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause song" : "Play song"}
            className="w-7 h-7 rounded-full hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors cursor-pointer"
            type="button"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-primary" />
            ) : (
              <Play className="w-4 h-4 fill-primary" />
            )}
          </button>

          <div className="hidden sm:flex items-center w-14 h-1 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className={`bg-primary h-full rounded-full transition-all duration-300 ${
                isPlaying ? "w-3/4" : "w-1/4"
              }`}
            />
          </div>

          <button
            className="hidden sm:flex w-6 h-6 rounded-full hover:bg-surface-container-high items-center justify-center text-on-surface-variant transition-colors"
            type="button"
            aria-label="Volume"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
