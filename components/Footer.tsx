import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 mb-2">
      <p className="font-body-sm text-body-sm text-outline flex items-center justify-center gap-1.5">
        <span>Made with love, just for you.</span>
        <Heart className="w-3.5 h-3.5 text-primary fill-primary" aria-hidden="true" />
      </p>
    </footer>
  );
}
