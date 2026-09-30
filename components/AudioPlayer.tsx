"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Play a soft, music-box romantic chime melody
  const playRomanticChimes = () => {
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

      // Romantic music box notes (frequencies in Hz)
      const melody = [
        659.25, 783.99, 987.77, 1046.5, 1174.66, 987.77, 783.99, 659.25,
        698.46, 880.0, 1046.5, 880.0, 698.46, 783.99, 987.77, 659.25,
      ];
      let noteIndex = 0;

      const playNextNote = () => {
        if (!audioContextRef.current || audioContextRef.current.state === "closed") {
          return;
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        const freq = melody[noteIndex % melody.length];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);

        noteIndex++;
        timerRef.current = window.setTimeout(playNextNote, 480);
      };

      playNextNote();
    } catch {
      // Audio fallback graceful ignore
    }
  };

  const stopRomanticChimes = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend();
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopRomanticChimes();
      setIsPlaying(false);
    } else {
      playRomanticChimes();
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
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 max-w-[calc(100vw-1.5rem)]">
      <div
        id="audio-pill"
        onClick={toggleAudio}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleAudio(e as unknown as React.MouseEvent);
          }
        }}
        aria-label="Toggle background romantic music"
        className="flex items-center gap-2 sm:gap-2.5 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer border border-primary-fixed/30"
      >
        <button
          id="toggle-audio-btn"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-on-secondary-container" />
          ) : (
            <Music className="w-3.5 h-3.5 text-on-secondary-container" />
          )}
        </button>

        <div id="audio-details" className="flex flex-col text-left pr-1.5">
          <span className="font-label-sm text-label-sm text-secondary font-semibold leading-tight">
            Our song
          </span>
          <span
            id="audio-status"
            className="font-body-sm text-[11px] leading-tight text-outline truncate max-w-[90px]"
          >
            {isPlaying ? "Playing..." : "Lover’s Waltz"}
          </span>
        </div>

        {/* Live Sound Waves Graphic */}
        <div
          id="music-bars"
          className={`flex items-end gap-0.5 h-3.5 pl-1 transition-opacity ${
            isPlaying ? "opacity-100" : "opacity-60"
          }`}
        >
          <span
            className={`w-0.5 bg-primary rounded-full transition-all ${
              isPlaying ? "h-2.5 animate-pulse" : "h-2"
            }`}
            style={{ animationDuration: isPlaying ? "0.6s" : undefined }}
          />
          <span
            className={`w-0.5 bg-primary rounded-full transition-all ${
              isPlaying ? "h-3.5 animate-pulse" : "h-3.5"
            }`}
            style={{ animationDuration: isPlaying ? "0.8s" : undefined }}
          />
          <span
            className={`w-0.5 bg-primary rounded-full transition-all ${
              isPlaying ? "h-2 animate-pulse" : "h-1.5"
            }`}
            style={{ animationDuration: isPlaying ? "1s" : undefined }}
          />
        </div>
      </div>
    </div>
  );
}
