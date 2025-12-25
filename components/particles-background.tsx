"use client";

import { cn } from "@/lib/utils";

type ParticlesBackgroundProps = {
  isDark: boolean;
};

export function ParticlesBackground({ isDark }: ParticlesBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        {/* Large gradient blobs - smaller on mobile, positioned at edges */}
        <div
          className={cn(
            "absolute -left-10 -top-10 h-64 w-64 rounded-full blur-3xl sm:-left-20 sm:-top-20 sm:h-96 sm:w-96",
            isDark ? "bg-indigo-500/30" : "bg-indigo-400/25"
          )}
        />
        <div
          className={cn(
            "absolute -right-16 top-1/4 h-48 w-48 rounded-full blur-3xl sm:-right-20 sm:h-80 sm:w-80",
            isDark ? "bg-purple-500/25" : "bg-purple-400/20"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-10 -right-10 h-56 w-56 rounded-full blur-3xl sm:-bottom-20 sm:right-1/3 sm:h-96 sm:w-96",
            isDark ? "bg-indigo-600/25" : "bg-indigo-500/20"
          )}
        />
        {/* These only show on larger screens */}
        <div
          className={cn(
            "absolute left-1/4 top-1/2 hidden rounded-full blur-3xl sm:block sm:h-72 sm:w-72",
            isDark ? "bg-violet-500/20" : "bg-violet-400/15"
          )}
        />
        <div
          className={cn(
            "absolute bottom-1/4 -left-10 hidden rounded-full blur-3xl sm:block sm:h-64 sm:w-64",
            isDark ? "bg-purple-600/20" : "bg-purple-500/15"
          )}
        />
        <div
          className={cn(
            "absolute right-10 top-2/3 hidden rounded-full blur-3xl sm:block sm:h-56 sm:w-56",
            isDark ? "bg-indigo-400/25" : "bg-indigo-300/20"
          )}
        />
      </div>
    </div>
  );
}
