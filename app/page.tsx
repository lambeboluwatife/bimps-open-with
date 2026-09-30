"use client";

import { useState } from "react";
import Petals from "@/components/Petals";
import HeaderTag from "@/components/HeaderTag";
import HeroHeader from "@/components/HeroHeader";
import GiftCard from "@/components/GiftCard";
import ActionCta from "@/components/ActionCta";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import UnveilModal from "@/components/UnveilModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative overflow-x-hidden bg-background">
      {/* Floating Ambient Rose Petals */}
      <Petals />

      <main className="w-full max-w-[500px] mx-auto flex flex-col items-center text-center relative z-10 my-auto">
        {/* Top Intro Ribbon / Tag */}
        <HeaderTag />

        {/* Main Headline & Intimate Note */}
        <HeroHeader />

        {/* Central Tabletop Keepsake Vignette - Centered & Steady */}
        <GiftCard onOpen={() => setIsModalOpen(true)} />

        {/* Action Subtitle & CTA Button */}
        <ActionCta onOpen={() => setIsModalOpen(true)} />

        {/* Handwritten Tone Footer */}
        <Footer />
      </main>

      {/* Floating Music Pill Token */}
      <AudioPlayer />

      {/* Surprise Ribbon Unveil Modal */}
      <UnveilModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
