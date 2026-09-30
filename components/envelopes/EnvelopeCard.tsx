"use client";

import { useState } from "react";
import Image from "next/image";
import { Letter } from "@/data/letters";
import {
  Heart,
  Smile,
  Flower2,
  Moon,
  Award,
  Camera,
  Lock,
  Mic,
  CheckCheck,
  Sparkles,
} from "lucide-react";

interface EnvelopeCardProps {
  letter: Letter;
  index: number;
  isOpened: boolean;
  isLocked: boolean;
  onOpen: (letter: Letter) => void;
  onLockedClick?: () => void;
}

const ROTATIONS = [-2.5, 2, -1.5, 3, -2, 1.5, -3, 0.5];

export default function EnvelopeCard({
  letter,
  index,
  isOpened,
  isLocked,
  onOpen,
  onLockedClick,
}: EnvelopeCardProps) {
  const [showLockedMessage, setShowLockedMessage] = useState(false);

  const rotationDeg =
    letter.rotation !== undefined ? letter.rotation : ROTATIONS[index % ROTATIONS.length];

  const handleClick = () => {
    if (isLocked) {
      setShowLockedMessage(true);
      if (onLockedClick) onLockedClick();
      setTimeout(() => setShowLockedMessage(false), 3200);
      return;
    }
    onOpen(letter);
  };

  // Render appropriate seal icon
  const renderSealIcon = () => {
    if (isLocked) {
      return <Lock className="w-5 h-5 text-[#360C1D]" />;
    }
    switch (letter.sealIcon) {
      case "smile":
        return <Smile className="w-5 h-5" />;
      case "flower":
        return <Flower2 className="w-5 h-5" />;
      case "moon":
        return <Moon className="w-5 h-5" />;
      case "award":
        return <Award className="w-5 h-5" />;
      case "camera":
        return <Camera className="w-5 h-5" />;
      case "mic":
        return <Mic className="w-5 h-5" />;
      case "lock":
        return <Lock className="w-5 h-5" />;
      case "heart":
      default:
        return <Heart className="w-5 h-5 fill-current" />;
    }
  };

  const isDark = letter.type === "final" || letter.id === "last";

  return (
    <div
      onClick={handleClick}
      style={{
        transform: `rotate(${rotationDeg}deg)`,
      }}
      className={`envelope-card group relative select-none cursor-pointer transition-all duration-300 ease-out hover:rotate-0 hover:-translate-y-2.5 hover:scale-[1.02] active:scale-[0.98] ${
        isDark ? "lg:col-span-2" : ""
      }`}
    >
      {/* Locked Tooltip Banner */}
      {showLockedMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 bg-on-background/95 text-surface-container-lowest px-4 py-2 rounded-full shadow-xl text-xs font-semibold whitespace-nowrap animate-bounce flex items-center gap-1.5 border border-primary-fixed/40">
          <Lock className="w-3.5 h-3.5 text-[#FFDEA4]" />
          <span>Come back after opening the others ❤️</span>
        </div>
      )}

      {/* Special Shimmering Halo for Final Envelope */}
      {isDark && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-tertiary-fixed-dim/40 via-secondary-container/30 to-tertiary-fixed-dim/40 blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
      )}

      {/* Peeking Stationery for Opened Envelope */}
      {isOpened && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-48 h-16 bg-[#FFFDF9] rounded-t-md shadow-md border-t border-x border-primary-fixed/30 z-10 px-3 pt-2.5 transform -rotate-1 group-hover:-translate-y-2 transition-transform duration-300">
          <div className="w-full h-1 bg-primary/20 rounded-full mb-1.5" />
          <div className="w-4/5 h-1 bg-primary/20 rounded-full mb-1.5" />
          <div className="w-3/5 h-1 bg-primary/20 rounded-full" />
        </div>
      )}

      {/* Peeking Polaroid for Photo Keepsake Envelopes */}
      {letter.hasPolaroid && !isOpened && letter.polaroidImg && (
        <div className="absolute -top-9 left-6 w-24 sm:w-28 bg-surface-container-lowest p-1.5 pb-3 shadow-lg rounded-xs transform -rotate-6 group-hover:-translate-y-2.5 transition-transform duration-300 z-10">
          <div className="absolute -top-2 left-4 w-9 h-2.5 bg-[#edd3d8]/90 rotate-3 shadow-xs" />
          <div className="w-full h-16 sm:h-18 relative rounded-xs overflow-hidden bg-surface-container">
            <Image
              src={letter.polaroidImg}
              alt={letter.polaroidCaption || "Polaroid keepsake"}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-label-sm text-[9px] text-center text-on-surface-variant mt-1 italic truncate">
            {letter.polaroidCaption || "Keepsake"}
          </p>
        </div>
      )}

      {/* Main Rectangular Envelope Body */}
      <div
        style={{ backgroundColor: letter.bg }}
        className={`relative w-full h-[220px] rounded-xl shadow-[0_8px_24px_-4px_rgba(73,52,59,0.14)] p-space-md sm:p-5 flex flex-col justify-between overflow-hidden z-20 border ${
          isDark
            ? "border-[#FFDEA4]/40 shadow-[0_12px_32px_-4px_rgba(73,52,59,0.35)]"
            : "border-black/5"
        }`}
      >
        {/* Gold Border Trims for Final Envelope */}
        {isDark && (
          <>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FFDEA4] via-[#E5C281] to-[#FFDEA4] opacity-90 z-30" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#FFDEA4] via-[#E5C281] to-[#FFDEA4] opacity-90 z-30" />
          </>
        )}

        {/* Triangular Envelope Flap */}
        {!isOpened ? (
          <div
            style={{ backgroundColor: letter.flapBg }}
            className={`absolute -top-1 left-0 right-0 h-32 [clip-path:polygon(0_0,100%_0,50%_76%)] shadow-[0_4px_12px_rgba(0,0,0,0.06)] z-10 transition-transform duration-300 ${
              isDark ? "opacity-95" : ""
            }`}
          >
            {isDark && (
              <div className="w-full h-full flex items-center justify-center pb-8 opacity-25">
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-[#FFDEA4] to-transparent" />
              </div>
            )}
          </div>
        ) : (
          /* Opened Flap Border Line */
          <div className="absolute top-0 inset-x-0 h-1.5 bg-primary/10 z-10" />
        )}

        {/* Top Header Row of Envelope */}
        <div className="relative z-20 flex items-center justify-between">
          {isLocked ? (
            <div className="flex items-center gap-1.5 bg-[#6a3748]/80 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              <Lock className="w-3.5 h-3.5 text-[#FFDEA4]" />
              <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#FFDEA4] font-semibold">
                Reserved for Last
              </span>
            </div>
          ) : isOpened ? (
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] uppercase tracking-wider text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded-full font-semibold">
              <CheckCheck className="w-3 h-3 text-primary" />
              Opened ✨
            </span>
          ) : (
            <span
              className={`font-label-sm text-[11px] uppercase tracking-wider ${
                isDark ? "text-[#FFD9E2]/80" : "text-secondary/75"
              }`}
            >
              {letter.envelopeNum}
            </span>
          )}

          {/* Right Badges: Media Indicator (Photo, Audio, or Date) */}
          <div className="flex items-center gap-1.5">
            {letter.hasVoiceNote && (
              <span
                className={`inline-flex items-center gap-1 font-label-sm text-[10px] px-1.5 py-0.5 rounded-full ${
                  isDark
                    ? "bg-[#6a3748] text-[#FFDEA4]"
                    : "bg-surface-container-high text-primary"
                }`}
                title="Includes Voice Note"
              >
                <Mic className="w-3 h-3" />
                <span>Audio</span>
              </span>
            )}
            {letter.hasPolaroid && (
              <span
                className={`inline-flex items-center gap-1 font-label-sm text-[10px] px-1.5 py-0.5 rounded-full ${
                  isDark
                    ? "bg-[#6a3748] text-[#FFDEA4]"
                    : "bg-tertiary-fixed/40 text-tertiary"
                }`}
                title="Includes Polaroid Keepsake"
              >
                <Camera className="w-3 h-3" />
                <span>+1</span>
              </span>
            )}
            {isOpened && (
              <span className="font-label-sm text-[10px] text-primary font-medium">
                Read again
              </span>
            )}
          </div>
        </div>

        {/* Center Wax Seal */}
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 z-20">
          {isDark ? (
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#755A24] via-[#D0AF70] to-[#FFDEA4] shadow-[0_4px_16px_rgba(117,90,36,0.55)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#D0AF70] flex items-center justify-center shadow-inner">
                {renderSealIcon()}
              </div>
            </div>
          ) : isOpened ? (
            <div
              style={{ backgroundColor: letter.sealBg, color: letter.sealColor }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-[0_3px_8px_rgba(73,52,59,0.18)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105 border-2 border-surface-container-lowest/80 opacity-90"
            >
              <Sparkles className="w-4 h-4" />
            </div>
          ) : (
            <div
              style={{ backgroundColor: letter.sealBg, color: letter.sealColor }}
              className="w-12 h-12 rounded-full shadow-[0_4px_12px_rgba(73,52,59,0.22)] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 border-2 border-white/20"
            >
              {renderSealIcon()}
            </div>
          )}
        </div>

        {/* Bottom Envelope Letter Title & Subtitle */}
        <div className="relative z-20 text-center mt-auto">
          <p
            className={`font-headline-sm text-headline-sm italic transition-colors leading-snug ${
              isDark
                ? "text-[#FFF0F3] group-hover:text-[#FFDEA4]"
                : "text-[#49343B] group-hover:text-primary"
            }`}
          >
            {letter.title}
          </p>
          <p
            className={`font-label-sm text-label-sm mt-0.5 tracking-normal ${
              isDark ? "text-[#FFD9E2]/80" : "text-secondary/75"
            }`}
          >
            {letter.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
