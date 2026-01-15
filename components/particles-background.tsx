export function ParticlesBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `
          radial-gradient(ellipse 80% 80% at -10% -10%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse 60% 60% at 110% 25%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse 70% 70% at 80% 110%, rgba(79, 70, 229, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 25% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 45% 45% at -5% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 40% 40% at 90% 70%, rgba(129, 140, 248, 0.18) 0%, transparent 50%)
        `,
      }}
      aria-hidden="true"
    />
  );
}
