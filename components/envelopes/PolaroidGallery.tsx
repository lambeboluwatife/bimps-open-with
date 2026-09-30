"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";

interface PolaroidItem {
  id: number;
  image: string;
  caption: string;
  washiColor: string;
  washiRotate: string;
  rotation: string;
  date: string;
}

const POLAROIDS: PolaroidItem[] = [
  {
    id: 1,
    image: "/polaroids/polaroid-espresso.jpg",
    caption: "Sunday morning espresso",
    washiColor: "bg-secondary-container/80",
    washiRotate: "-rotate-3",
    rotation: "-rotate-2",
    date: "A quiet Parisian morning",
  },
  {
    id: 2,
    image: "/polaroids/polaroid-beach.jpg",
    caption: "The golden hour beach walk",
    washiColor: "bg-tertiary-fixed/70",
    washiRotate: "rotate-2",
    rotation: "rotate-3",
    date: "Lavender sky at dusk",
  },
  {
    id: 3,
    image: "/polaroids/polaroid-flowers.jpg",
    caption: "Pressed wildflowers from June",
    washiColor: "bg-primary-fixed/80",
    washiRotate: "rotate-1",
    rotation: "-rotate-1",
    date: "Handpicked with a love note",
  },
  {
    id: 4,
    image: "/polaroids/polaroid-city.jpg",
    caption: "Laughing in the drizzle",
    washiColor: "bg-secondary-fixed/80",
    washiRotate: "-rotate-2",
    rotation: "rotate-2",
    date: "Warm golden city lights",
  },
];

export default function PolaroidGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  return (
    <div className="mt-space-xl pt-space-lg" id="scrapbook-polaroids">
      <div className="flex items-center justify-between mb-space-md">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Tokens Tucked in the Box
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Photos fastened with washi tape between the letters
          </p>
        </div>
        <div className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1 cursor-default">
          <span>Our favorite memories</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        {POLAROIDS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className={`bg-surface-container-lowest p-2 pb-5 rounded-xs shadow-md transform ${item.rotation} hover:rotate-0 hover:-translate-y-1 transition-all duration-300 relative group cursor-pointer border border-primary-fixed/30`}
          >
            {/* Washi Tape Strip */}
            <div
              className={`absolute -top-2 left-1/3 w-12 h-3.5 ${item.washiColor} backdrop-blur-[1px] ${item.washiRotate} shadow-xs z-10`}
            />

            <div className="aspect-square w-full relative rounded-xs mb-2 overflow-hidden bg-surface-container shadow-inner">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <p className="font-body-sm text-body-sm text-center text-on-surface italic">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-surface-container-lowest p-4 pb-8 rounded-sm shadow-2xl max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-square w-full rounded-xs overflow-hidden mb-3">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-headline-sm text-headline-sm italic text-secondary">
              {selectedPhoto.caption}
            </p>
            <p className="font-body-sm text-xs text-outline mt-1">
              {selectedPhoto.date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
