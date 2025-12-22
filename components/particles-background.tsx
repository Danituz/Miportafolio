"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

type ParticlesBackgroundProps = {
  isDark: boolean;
};

export function ParticlesBackground({ isDark }: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 30,
      particles: {
        number: {
          value: 20,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: isDark
            ? ["#818cf8", "#a78bfa", "#c4b5fd", "#6366f1", "#e0e7ff"]
            : ["#6366f1", "#8b5cf6", "#a78bfa", "#4f46e5", "#c7d2fe"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 30, max: 120 },
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          bubble: {
            distance: 150,
            size: 140,
            duration: 2,
            opacity: 0.6,
          },
        },
      },
      detectRetina: true,
    }),
    [isDark]
  );

  if (!init) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 blur-3xl opacity-70">
        <Particles
          id="tsparticles"
          options={options}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
