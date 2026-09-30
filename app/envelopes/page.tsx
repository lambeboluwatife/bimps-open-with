"use client";

import { useState, useEffect } from "react";
import Petals from "@/components/Petals";
import EnvelopesHeader from "@/components/envelopes/EnvelopesHeader";
import EnvelopeCard from "@/components/envelopes/EnvelopeCard";
import EnvelopeOpenedView from "@/components/envelopes/EnvelopeOpenedView";
import PolaroidGallery from "@/components/envelopes/PolaroidGallery";
import FloatingMusicPlayer from "@/components/envelopes/FloatingMusicPlayer";
import { letters, Letter } from "@/data/letters";
import { Heart, Sparkles, Lock, RotateCcw } from "lucide-react";

export default function EnvelopesPage() {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [openedLetters, setOpenedLetters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "photos">("all");
  const [lockedToast, setLockedToast] = useState<string | null>(null);

  // Load saved opened letters from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bimps_opened_letters");
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOpenedLetters(parsed);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Check if all regular envelopes before the final one have been opened
  const regularLetters = letters.filter(
    (l) => l.type !== "final" && l.id !== "last",
  );
  const allOthersOpened = regularLetters.every((l) =>
    openedLetters.includes(l.id),
  );

  const handleOpenLetter = (letter: Letter) => {
    // If it's the final envelope and not all others are opened
    if ((letter.type === "final" || letter.id === "last") && !allOthersOpened) {
      setLockedToast("Come back after opening the others ❤️");
      setTimeout(() => setLockedToast(null), 3500);
      return;
    }

    setSelectedLetter(letter);

    // Save opened status
    setOpenedLetters((prev) => {
      if (prev.includes(letter.id)) return prev;
      const next = [...prev, letter.id];
      try {
        localStorage.setItem("bimps_opened_letters", JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const handleNextLetter = () => {
    if (!selectedLetter) return;
    const currentIndex = letters.findIndex((l) => l.id === selectedLetter.id);
    let nextIndex = (currentIndex + 1) % letters.length;
    let nextLetter = letters[nextIndex];

    // If next letter is locked, skip it or find an openable letter
    if (
      (nextLetter.type === "final" || nextLetter.id === "last") &&
      !allOthersOpened
    ) {
      // Find the first unopened letter, or loop to the beginning
      const firstUnopened = letters.find(
        (l) =>
          l.type !== "final" &&
          l.id !== "last" &&
          !openedLetters.includes(l.id),
      );
      nextLetter = firstUnopened || letters[0];
    }

    handleOpenLetter(nextLetter);
  };

  const handleResealLetters = () => {
    if (
      window.confirm(
        "Would you like to seal all letters back up in the keepsake box?",
      )
    ) {
      setOpenedLetters([]);
      setSelectedLetter(null);
      try {
        localStorage.removeItem("bimps_opened_letters");
      } catch {
        // Fallback
      }
    }
  };

  const filteredLetters =
    activeFilter === "photos" ? letters.filter((l) => l.hasPolaroid) : letters;

  const openedCount = openedLetters.length;
  const progressRatio = Math.round((openedCount / letters.length) * 100);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased paper-texture min-h-screen relative selection:bg-secondary-container selection:text-on-secondary-container flex flex-col overflow-x-hidden">
      {/* Floating Ambient Rose Petals */}
      <Petals />

      {/* Persistent Top Navigation Bar */}
      <EnvelopesHeader
        onGoToLetters={() => setSelectedLetter(null)}
        onGoToPolaroids={() => {
          setSelectedLetter(null);
          setActiveFilter("all");
        }}
      />

      {/* Locked Envelope Floating Toast */}
      {lockedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#3F2B32]/95 text-[#FFF0F3] px-5 py-3 rounded-full shadow-2xl text-sm font-semibold flex items-center gap-2 border border-[#FFDEA4]/50 animate-bounce">
          <Lock className="w-4 h-4 text-[#FFDEA4]" />
          <span>{lockedToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full pt-20 pb-20 bg-transparent relative z-10 flex-1">
        <div className="max-w-[1120px] mx-auto w-full px-4 sm:px-margin-mobile lg:px-margin py-space-md">
          {selectedLetter ? (
            /* VIEW 1: SELECTED LETTER OPENED VIEW (Reconstructed envelopeOpen.html) */
            <EnvelopeOpenedView
              letter={selectedLetter}
              currentIndex={letters.findIndex(
                (l) => l.id === selectedLetter.id,
              )}
              totalLetters={letters.length}
              onBack={() => setSelectedLetter(null)}
              onNext={handleNextLetter}
            />
          ) : (
            /* VIEW 2: ENVELOPE COLLECTION (Inside the Keepsake Gift Box) */
            <div className="flex flex-col w-full">
              {/* Top Scrapbook Header */}
              <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high text-secondary mb-space-sm shadow-sm">
                    <Heart className="w-4 h-4 text-primary fill-primary" />
                    <span className="font-label-sm text-label-sm tracking-widest uppercase font-semibold">
                      The Keepsake Box
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs">
                    A few things I want you to know…
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Open these whenever you need a little reminder of how much
                    you mean to me. Take them slowly, one sentiment at a time.
                  </p>
                </div>

                {/* Tactile Romantic Counter Ribbon */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md bg-surface-container-low p-space-sm px-space-md rounded-xl shadow-sm border border-primary-fixed/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="relative w-11 h-11 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                      <svg
                        className="w-11 h-11 -rotate-90 text-primary-container"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-surface-container-high"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="text-primary stroke-current transition-all duration-700 ease-out"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          strokeDasharray={`${progressRatio}, 100`}
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </svg>
                      <span className="absolute font-headline-sm text-headline-sm text-secondary italic">
                        {openedCount}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {openedCount} of {letters.length} Opened
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-tertiary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-label-sm text-label-sm text-outline">
                          {letters.length - openedCount} sealed treasures
                          remaining
                        </p>
                        {openedCount > 0 && (
                          <button
                            onClick={handleResealLetters}
                            className="inline-flex items-center gap-1 text-[11px] text-secondary/70 hover:text-secondary underline cursor-pointer"
                            title="Reseal all envelopes"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reseal all
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-outline-variant hidden sm:block" />

                  {/* Filter Toggle */}
                  <div
                    className="flex bg-surface-container p-0.5 rounded-full"
                    id="view-toggle"
                  >
                    <button
                      className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
                        activeFilter === "all"
                          ? "bg-surface-container-lowest text-on-surface shadow-xs"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                      onClick={() => setActiveFilter("all")}
                      type="button"
                    >
                      All Envelopes
                    </button>
                    <button
                      className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm font-semibold transition-all cursor-pointer ${
                        activeFilter === "photos"
                          ? "bg-surface-container-lowest text-on-surface shadow-xs"
                          : "text-on-surface-variant hover:text-on-surface"
                      }`}
                      onClick={() => setActiveFilter("photos")}
                      type="button"
                    >
                      Polaroids ({letters.filter((l) => l.hasPolaroid).length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Soft Decorative Ambient Ribbon */}
              <div className="w-full flex items-center justify-center gap-space-sm opacity-60 mb-space-lg">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-outline-variant" />
                <span className="font-headline-sm text-headline-sm italic text-secondary">
                  scattered with love
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-outline-variant" />
              </div>

              {/* Physical Scattered Envelopes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-space-xl pt-space-sm pb-space-xl">
                {filteredLetters.map((letter, index) => {
                  const isOpened = openedLetters.includes(letter.id);
                  const isLocked =
                    (letter.type === "final" || letter.id === "last") &&
                    !allOthersOpened;

                  return (
                    <EnvelopeCard
                      key={letter.id}
                      letter={letter}
                      index={index}
                      isOpened={isOpened}
                      isLocked={isLocked}
                      onOpen={handleOpenLetter}
                      onLockedClick={() => {
                        setLockedToast("Come back after opening the others ❤️");
                        setTimeout(() => setLockedToast(null), 3500);
                      }}
                    />
                  );
                })}
              </div>

              {/* Polaroid Gallery Section */}
              <PolaroidGallery />
            </div>
          )}
        </div>
      </main>

      {/* Floating Bespoke Music Player ("Until I Found You") */}
      <FloatingMusicPlayer />

      {/* Romantic Keepsake Box Footer */}
      <footer className="w-full bg-surface-container-low py-space-xl mt-space-xl relative z-10 border-t border-primary-fixed/20">
        <div className="max-w-[1120px] mx-auto px-margin-mobile lg:px-margin text-center">
          <div className="w-6 h-6 mx-auto mb-space-sm rounded-full bg-primary-container/40 flex items-center justify-center text-primary">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
          <p className="font-headline-sm text-headline-sm italic text-secondary mb-space-xs">
            A Keepsake Box for Us
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Open each letter only when you truly need its warmth. Lovingly
            sealed forever.
          </p>
        </div>
      </footer>
    </div>
  );
}
