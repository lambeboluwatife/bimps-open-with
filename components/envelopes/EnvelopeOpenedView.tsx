"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Letter } from "@/data/letters";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Bookmark,
  Mail,
  Heart,
  Sparkles,
} from "lucide-react";

interface EnvelopeOpenedViewProps {
  letter: Letter;
  currentIndex: number;
  totalLetters: number;
  onBack: () => void;
  onNext: () => void;
}

export default function EnvelopeOpenedView({
  letter,
  currentIndex,
  totalLetters,
  onBack,
  onNext,
}: EnvelopeOpenedViewProps) {
  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Voice note player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(37);
  const totalSeconds = 105; // 1:45

  // Scroll to top when letter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [letter.id]);

  // Voice player simulated playback interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSeconds]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleTogglePlay = () => {
    if (seconds >= totalSeconds) {
      setSeconds(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay10 = () => {
    setSeconds((prev) => Math.max(0, prev - 10));
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    setSeconds(Math.floor(fraction * totalSeconds));
  };

  // 25 waveform heights
  const baseWaveformHeights = [
    12, 18, 26, 16, 22, 30, 20, 26, 12, 22, 30, 18, 26, 16, 22, 30, 12, 18, 26, 16, 22, 18, 12, 26, 16,
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action Ribbon */}
      <div className="w-full max-w-[840px] flex items-center justify-between mb-space-lg">
        <button
          onClick={onBack}
          type="button"
          className="group inline-flex items-center gap-space-xs text-secondary hover:text-primary transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-headline-sm text-headline-sm italic">
            Back to envelopes
          </span>
        </button>

        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Letter {currentIndex + 1} of {totalLetters}
          </span>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer ${
              isBookmarked
                ? "bg-primary text-surface-container-lowest"
                : "bg-surface-container-low hover:bg-surface-container-high text-primary"
            }`}
            title={isBookmarked ? "Keepsake preserved" : "Preserve letter state"}
            type="button"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Center Stage Envelope & Parchment Composition */}
      <div className="relative w-full max-w-[840px] flex flex-col items-center">
        {/* Folded Envelope Back Flap Backdrop (Tucked below the letter) */}
        <div className="relative w-full max-w-[760px] h-20 -mb-12 rounded-t-[1.5rem] bg-gradient-to-b from-surface-variant to-surface-container-high shadow-[0_12px_28px_-6px_rgba(73,52,59,0.14)] flex items-start justify-center pt-2">
          <div className="w-24 h-1.5 rounded-full bg-primary-container/40" />
        </div>

        {/* Main Parchment Letter Sheet */}
        <article
          className="relative z-20 w-full bg-[#FFFDF9] rounded-xl shadow-[0_16px_40px_-8px_rgba(73,52,59,0.12),0_2px_8px_rgba(73,52,59,0.04)] px-5 py-8 sm:px-14 sm:py-16 md:px-20 md:py-20 transition-all duration-300 border border-[#edd3d8]/40"
          id="letterSheet"
        >
          {/* Subtle Parchment Corner Accents */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 text-outline-variant/30 select-none pointer-events-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 32 32"
            >
              <path d="M4 28V4H28" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 text-outline-variant/30 select-none pointer-events-none">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 32 32"
            >
              <path d="M4 4H28V28" />
            </svg>
          </div>

          {/* Letter Header */}
          <header className="mb-space-lg flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-space-xs border-b border-primary-fixed/20 pb-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary block mb-1">
                {letter.sealedOn}
              </span>
              <h1 className="font-headline-lg text-2xl sm:text-headline-lg italic text-on-surface">
                To my love,
              </h1>
            </div>
            <div className="font-label-md text-label-md text-secondary/80 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-tertiary" />
              <span>{letter.date}</span>
            </div>
          </header>

          {/* Letter Body Part 1 */}
          <section className="space-y-space-md text-on-surface/90">
            {letter.quote && (
              <p className="font-headline-sm text-lg sm:text-headline-sm leading-relaxed text-secondary/90 italic font-serif">
                &ldquo;{letter.quote}&rdquo;
              </p>
            )}
            {letter.contentPart1.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-body-lg text-base sm:text-body-lg text-on-surface leading-loose"
              >
                {paragraph}
              </p>
            ))}
          </section>

          {/* Embedded Polaroid Photograph */}
          {letter.hasPolaroid && letter.polaroidImg && (
            <div className="my-space-xl flex flex-col items-center">
              <div className="relative group transform -rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] w-full bg-[#FFFFFF] p-3 sm:p-4 pb-5 sm:pb-6 rounded-sm shadow-[0_12px_28px_rgba(73,52,59,0.18),0_2px_4px_rgba(73,52,59,0.06)] border border-[#edd3d8]/30">
                {/* Floral Washi Tape Strip */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 z-30 opacity-90 backdrop-blur-[1px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] -rotate-1 overflow-hidden rounded-[1px] bg-gradient-to-r from-[#edd3d8] via-[#f7e4df] to-[#edd3d8] flex items-center justify-center">
                  <svg
                    className="w-full h-full opacity-45"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 24"
                  >
                    <circle cx="15" cy="12" fill="#80515e" r="4" />
                    <circle cx="13" cy="9" fill="#dda4b2" r="3" />
                    <circle cx="17" cy="15" fill="#dda4b2" r="3" />
                    <circle cx="50" cy="12" fill="#854e60" r="5" />
                    <circle cx="46" cy="8" fill="#f2b7c5" r="3" />
                    <circle cx="54" cy="16" fill="#f2b7c5" r="3" />
                    <circle cx="85" cy="12" fill="#80515e" r="4" />
                  </svg>
                </div>

                {/* Polaroid Image Frame */}
                <div className="w-full aspect-square overflow-hidden bg-surface-container-high rounded-[2px] relative shadow-inner">
                  <Image
                    src={letter.polaroidImg}
                    alt={letter.polaroidCaption || "Our memory"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#28161d]/15 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handwritten Pen Caption */}
                {letter.polaroidCaption && (
                  <div className="mt-4 px-1 text-center">
                    <p className="font-headline-sm text-headline-sm italic text-secondary tracking-normal select-none">
                      {letter.polaroidCaption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Letter Body Part 2 */}
          {letter.contentPart2 && letter.contentPart2.length > 0 && (
            <section className="space-y-space-md text-on-surface/90 mb-space-xl">
              {letter.contentPart2.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-body-lg text-body-lg text-on-surface leading-loose"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          {/* Bespoke Voice Message Player */}
          {(letter.hasVoiceNote || letter.type === "voice") && (
            <div className="my-space-xl bg-surface-container-low/70 rounded-xl p-space-md sm:p-space-lg flex flex-col gap-space-sm shadow-sm border border-primary-fixed/20">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm italic text-secondary flex items-center gap-space-xs">
                  <Mic className="w-5 h-5 text-primary" />
                  There&apos;s something I want you to hear…
                </span>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
                  Voice Note
                </span>
              </div>

              <div className="bg-surface-container-lowest rounded-lg p-3 sm:p-4 flex items-center gap-space-md shadow-[inset_0_1px_3px_rgba(73,52,59,0.04)]">
                {/* Play/Pause Button */}
                <button
                  onClick={handleTogglePlay}
                  className="w-11 h-11 shrink-0 rounded-full bg-primary hover:bg-secondary text-on-primary flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-[0_3px_8px_rgba(128,81,94,0.35)] cursor-pointer"
                  type="button"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                {/* Waveform Visualizer & Timestamp */}
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  {/* Burgundy Waveform Visualizer */}
                  <div
                    onClick={handleWaveformClick}
                    className="h-8 flex items-center gap-[3px] sm:gap-[4px] w-full px-1 overflow-hidden select-none cursor-pointer"
                    title="Click to seek"
                  >
                    {baseWaveformHeights.map((h, i) => {
                      const progressFrac = seconds / totalSeconds;
                      const isPast = i / baseWaveformHeights.length <= progressFrac;
                      // Dynamic wave fluctuation when playing
                      const dynamicHeight = isPlaying
                        ? Math.max(8, Math.min(32, Math.floor(Math.sin((seconds + i) * 0.7) * 8 + h)))
                        : h;

                      return (
                        <span
                          key={i}
                          style={{ height: `${dynamicHeight}px` }}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isPast
                              ? "bg-secondary"
                              : "bg-secondary/25"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Time display */}
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="text-primary font-medium">
                      {formatTime(seconds)}
                    </span>
                    <span>{letter.audioDuration || "1:45"}</span>
                  </div>
                </div>

                {/* Soft Replay Button */}
                <button
                  onClick={handleReplay10}
                  className="w-9 h-9 shrink-0 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  title="Rewind 10s"
                  type="button"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Letter Closing */}
          <footer className="mt-space-xl pt-space-lg flex flex-col items-start sm:items-end border-t border-primary-fixed/20">
            <div className="text-left sm:text-right space-y-1">
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                Forever and always,
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant italic">
                With all my love,
              </p>
              <p className="font-headline-md text-headline-md italic text-primary pt-1 flex items-center gap-1.5 justify-start sm:justify-end">
                <span>{letter.senderName || "Bolu"}</span>
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </p>
            </div>
          </footer>
        </article>

        {/* Bottom Envelope Pocket Rim (Simulating letter emerging from pocket) */}
        <div className="w-full max-w-[800px] h-12 -mt-6 bg-gradient-to-t from-surface-variant via-surface-container to-transparent rounded-b-2xl shadow-[0_18px_32px_-8px_rgba(73,52,59,0.18)] z-30 pointer-events-none" />

        {/* Action Buttons Below Envelope */}
        <div className="w-full max-w-[820px] mt-space-lg mb-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md z-30">
          {/* Fold & Return CTA */}
          <button
            onClick={onBack}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-6 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-secondary-container font-label-md text-label-md transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>Fold &amp; return to box</span>
          </button>

          {/* Next Letter with Subtle Gold Accent */}
          <button
            onClick={onNext}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-7 py-3 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-md text-label-md shadow-[0_4px_16px_rgba(128,81,94,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(208,175,112,0.35)] cursor-pointer"
          >
            <span>Next letter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
