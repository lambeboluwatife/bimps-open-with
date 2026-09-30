"use client";

import { Heart, ArrowRight } from "lucide-react";

interface ActionCtaProps {
  onOpen: () => void;
}

export default function ActionCta({ onOpen }: ActionCtaProps) {
  return (
    <div className="mt-8 flex flex-col items-center gap-3.5 w-full">
      <p className="font-headline-sm text-headline-sm italic text-secondary tracking-normal">
        Your gift is waiting.
      </p>

      {/* Interactive Love CTA */}
      <button
        id="open-gift-btn"
        onClick={onOpen}
        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-primary-container text-on-primary-container shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 overflow-hidden cursor-pointer"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
          aria-hidden="true"
        />

        {/* Wax Stamp Coin Symbol */}
        <span className="w-6 h-6 rounded-full bg-secondary text-primary-fixed flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </span>

        <span className="font-headline-sm text-headline-sm tracking-wide">
          Open your gift
        </span>

        <ArrowRight className="w-4 h-4 text-on-primary-container group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
