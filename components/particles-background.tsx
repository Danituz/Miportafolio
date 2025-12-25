"use client";

export function ParticlesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        {/* Large gradient blobs - smaller on mobile, positioned at edges */}
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl sm:-left-20 sm:-top-20 sm:h-96 sm:w-96" />
        <div className="absolute -right-16 top-1/4 h-48 w-48 rounded-full bg-purple-500/25 blur-3xl sm:-right-20 sm:h-80 sm:w-80" />
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-indigo-600/25 blur-3xl sm:-bottom-20 sm:right-1/3 sm:h-96 sm:w-96" />
        {/* These only show on larger screens */}
        <div className="absolute left-1/4 top-1/2 hidden rounded-full bg-violet-500/20 blur-3xl sm:block sm:h-72 sm:w-72" />
        <div className="absolute bottom-1/4 -left-10 hidden rounded-full bg-purple-600/20 blur-3xl sm:block sm:h-64 sm:w-64" />
        <div className="absolute right-10 top-2/3 hidden rounded-full bg-indigo-400/25 blur-3xl sm:block sm:h-56 sm:w-56" />
      </div>
    </div>
  );
}
