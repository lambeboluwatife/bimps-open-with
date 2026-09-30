"use client";

import { useEffect } from "react";
import { X, Heart } from "lucide-react";

export interface LetterData {
  id: number;
  title: string;
  subtitle: string;
  envelopeNum: string;
  tag?: string;
  date: string;
  dateTag?: string;
  bg: string;
  flapBg: string;
  sealBg: string;
  sealColor: string;
  rotation: string;
  isOpened?: boolean;
  hasPolaroid?: boolean;
  mediaType?: "image" | "video";
  polaroidImg?: string;
  polaroidVideo?: string;
  polaroidCaption?: string;
  isFinal?: boolean;
  audioSrc?: string;
  content: string;
}

interface LetterModalProps {
  letter: LetterData | null;
  onClose: () => void;
}

export default function LetterModal({ letter, onClose }: LetterModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && letter) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [letter, onClose]);

  if (!letter) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-space-md transition-opacity duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-2xl p-space-lg sm:p-space-xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
        id="modal-card"
      >
        <button
          className="absolute top-space-md right-space-md w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container flex items-center justify-center text-primary transition-colors cursor-pointer"
          onClick={onClose}
          type="button"
          aria-label="Close letter"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-space-sm mb-space-md">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary bg-tertiary-fixed/30 px-space-sm py-0.5 rounded-full font-semibold">
            Keepsake Letter
          </span>
          <span className="text-outline-variant font-body-sm">•</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant" id="modal-date">
            {letter.date}
          </span>
        </div>

        <h2
          className="font-headline-lg text-headline-lg text-secondary mb-space-sm italic"
          id="modal-title"
        >
          {letter.title}
        </h2>

        <div className="w-16 h-0.5 bg-primary-container mb-space-lg" />

        <div
          className="font-body-lg text-body-lg text-on-surface space-y-space-md leading-relaxed"
          id="modal-content"
        >
          <p>{letter.content}</p>
        </div>

        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface font-semibold">
                Forever Yours
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Letter {letter.id} of 8 • Preserved
              </p>
            </div>
          </div>
          <button
            className="w-full sm:w-auto px-space-md py-space-xs bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:translate-y-[-2px] transition-all cursor-pointer"
            onClick={onClose}
          >
            Fold Back Carefully
          </button>
        </div>
      </div>
    </div>
  );
}
