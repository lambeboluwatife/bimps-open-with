"use client";

import Image from "next/image";
import { LockOpen, Heart } from "lucide-react";

interface GiftCardProps {
  onOpen: () => void;
}

export default function GiftCard({ onOpen }: GiftCardProps) {
  return (
    <div className="relative w-full max-w-[340px] mx-auto my-2">
      {/* Glowing backing aura - strictly positioned behind the card */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-secondary-container/40 via-tertiary-fixed-dim/30 to-primary-fixed/50 rounded-2xl blur-xl scale-95 pointer-events-none -z-10"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        aria-hidden="true"
      />

      {/* Gift Box Container - Absolutely steady, no tilt, no hover translate, no rotate */}
      <div
        id="gift-card"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label="Open your special delivery gift box"
        className="relative z-10 bg-surface-container-lowest p-3 rounded-2xl shadow-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary w-full"
      >
        <div className="relative overflow-hidden rounded-xl aspect-square shadow-inner bg-surface-container">
          {/* Steady Gift Box Image - Absolutely no animation */}
          <Image
            src="/gift-box.jpg"
            alt="Handcrafted birthday gift box wrapped in textured ivory paper with an opulent blush pink silk ribbon and a tiny heart stamped tag"
            width={340}
            height={340}
            priority
            className="w-full h-full object-cover select-none block"
          />

          {/* Soft Light Sheen Sweep Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-60 mix-blend-overlay" />

          {/* Hanging Gold Tag Ornament Indicator */}
          <div className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
            <LockOpen className="w-3.5 h-3.5 text-tertiary" />
            <span className="font-label-sm text-label-sm text-tertiary tracking-wider uppercase font-semibold">
              Tap to unveil
            </span>
          </div>
        </div>

        {/* Tactile Paper Border Impression */}
        <div className="pt-3 pb-1 px-1 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant/70 italic flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-secondary fill-secondary" />
            Box No. 01
          </span>
          <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary-container font-semibold">
            Special Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
