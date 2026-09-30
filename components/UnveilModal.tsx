"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, BookOpen, X } from "lucide-react";

interface UnveilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnveilModal({ isOpen, onClose }: UnveilModalProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleReadLetters = () => {
    onClose();
    router.push("/envelopes");
  };

  return (
    <div
      id="unveil-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-sm bg-surface-container-lowest rounded-2xl p-6 shadow-2xl text-center transform transition-all duration-500 ease-out flex flex-col ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close "X" Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Initial Unwrapping Preview */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm">
            <Mail className="w-6 h-6 text-secondary" />
          </div>

          <h3
            id="modal-title"
            className="font-headline-md text-headline-md text-primary mb-1"
          >
            Unwrapping your letter...
          </h3>

          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            Every ribbon, word, and note is prepared with all my heart.
          </p>

          <button
            id="close-modal-btn"
            onClick={handleReadLetters}
            className="w-full py-2.5 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md tracking-wider uppercase hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>Read Letters</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
