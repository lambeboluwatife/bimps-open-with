"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

interface EnvelopesHeaderProps {
  onGoToLetters?: () => void;
  onGoToPolaroids?: () => void;
  onWriteNew?: () => void;
}

export default function EnvelopesHeader({
  onGoToLetters,
  onGoToPolaroids,
  onWriteNew,
}: EnvelopesHeaderProps) {
  const handleLettersClick = () => {
    if (onGoToLetters) {
      onGoToLetters();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePolaroidsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGoToPolaroids) {
      onGoToPolaroids();
    }
    setTimeout(() => {
      const el = document.getElementById("scrapbook-polaroids");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-md shadow-[0_1px_8px_rgba(73,52,59,0.04)] border-b border-primary-fixed/20">
      <div className="h-16 max-w-[1120px] mx-auto px-4 sm:px-margin-mobile lg:px-margin flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-space-md">
          <Link
            href="/"
            className="text-primary hover:text-on-surface transition-colors flex items-center gap-1 sm:gap-space-xs font-label-md text-xs sm:text-label-md shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Keepsakes</span>
          </Link>
          <span className="text-outline-variant font-body-sm select-none">•</span>
          <span
            onClick={handleLettersClick}
            className="font-headline-sm text-sm sm:text-headline-sm italic text-secondary tracking-wide select-none cursor-pointer truncate"
          >
            Open When... <span className="text-primary not-italic font-normal">❤️</span>
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-space-sm bg-surface-container-low px-space-sm py-space-xs rounded-full shadow-[0_2px_8px_rgba(73,52,59,0.04)]">
          <button
            type="button"
            onClick={handleLettersClick}
            className="px-space-md py-space-xs bg-surface-container-high text-on-surface font-semibold rounded-full text-xs transition-colors cursor-pointer"
          >
            The Letters
          </button>
          <button
            type="button"
            onClick={handlePolaroidsClick}
            className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            Our Polaroids
          </button>
          {onWriteNew && (
            <button
              type="button"
              onClick={onWriteNew}
              className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            >
              Write New
            </button>
          )}
        </nav>

        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_6px_rgba(73,52,59,0.15)] text-on-primary">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
