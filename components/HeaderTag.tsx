export default function HeaderTag() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low shadow-sm mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
      <p className="font-headline-sm text-headline-sm italic text-secondary tracking-wide">
        Made especially for you
      </p>
    </div>
  );
}
