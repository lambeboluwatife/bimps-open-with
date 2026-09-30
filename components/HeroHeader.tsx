export default function HeroHeader() {
  return (
    <div className="relative w-full flex flex-col items-center text-center">
      {/* Subtle Decorative Ambient Light - Properly contained and centered */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Headline */}
      <h1 className="font-headline-lg text-headline-lg text-primary mb-2 max-w-md mx-auto leading-tight">
        Happy Birthday, My Love{" "}
        <span className="text-secondary inline-block text-headline-md">
          ❤️
        </span>
      </h1>

      {/* Supporting Intimate Note */}
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto mb-6">
        I made you a little something…
      </p>
    </div>
  );
}
