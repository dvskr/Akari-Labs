"use client";

function SkyLantern({ scale, flickerDelay }: { scale: number; flickerDelay: number }) {
  const w = 44 * scale;
  const h = 60 * scale;
  return (
    <div className="relative" style={{ width: w, height: h }}>
      {/* Glow halo */}
      <div
        className="absolute"
        style={{
          left: "50%", top: "50%",
          width: w * 2.4, height: h * 2.4,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-soft) 0%, transparent 62%)",
          opacity: 0.7,
          animation: "glow-flicker 3.2s ease-in-out infinite",
          animationDelay: `${flickerDelay}s`,
        }}
      />
      {/* Top crown */}
      <div className="absolute" style={{ left: "50%", top: 0, width: w * 0.42, height: h * 0.06, transform: "translateX(-50%)", background: "var(--ink-strong)", borderRadius: "2px 2px 0 0" }} />
      {/* Crown rim */}
      <div className="absolute" style={{ left: "50%", top: h * 0.06, width: w * 0.6, height: 1.5, transform: "translateX(-50%)", background: "var(--ink-strong)" }} />
      {/* Paper body */}
      <div className="absolute" style={{
        left: 0, right: 0, top: h * 0.08, bottom: h * 0.12,
        background: `radial-gradient(ellipse at 50% 65%, var(--accent-bright) 0%, var(--accent) 55%, var(--accent) 100%)`,
        borderRadius: "44% 44% 30% 30% / 38% 38% 22% 22%",
        boxShadow: `0 0 ${20 * scale}px var(--accent-soft), inset 0 -6px 10px rgba(0,0,0,0.22), inset 0 4px 8px rgba(255,240,210,0.55)`,
        animation: "glow-flicker 3.4s ease-in-out infinite",
        animationDelay: `${flickerDelay + 0.2}s`,
      }} />
      {/* Vertical seams */}
      {[0.28, 0.5, 0.72].map((p) => (
        <div key={p} className="absolute" style={{ left: `${p * 100}%`, top: h * 0.10, bottom: h * 0.14, width: 1, background: "rgba(60,30,10,0.18)", opacity: 0.6 }} />
      ))}
      {/* Flame core */}
      <div className="absolute" style={{
        left: "50%", top: h * 0.55, width: w * 0.32, height: w * 0.32,
        transform: "translateX(-50%)", borderRadius: "50%",
        background: "radial-gradient(circle, #FFF4D2 0%, var(--accent-bright) 45%, transparent 75%)",
        filter: "blur(1.5px)", opacity: 0.95,
        animation: "glow-flicker 1.8s ease-in-out infinite",
        animationDelay: `${flickerDelay}s`,
      }} />
      {/* Base ring */}
      <div className="absolute" style={{ left: "50%", bottom: h * 0.06, width: w * 0.7, height: 1.5, transform: "translateX(-50%)", background: "var(--ink-strong)" }} />
      {/* Base flame mount */}
      <div className="absolute" style={{ left: "50%", bottom: h * 0.02, width: w * 0.18, height: h * 0.05, transform: "translateX(-50%)", background: "linear-gradient(180deg, #2A241A 0%, #2A241A 50%, transparent 100%)" }} />
    </div>
  );
}

const lanterns = [
  { size: 1.10, leftPct: 6, driftX: 14, dur: 28, delay: 0, depth: 0.85 },
  { size: 1.20, leftPct: 92, driftX: -16, dur: 26, delay: -8, depth: 0.85 },
  { size: 0.95, leftPct: 78, driftX: 10, dur: 30, delay: -16, depth: 0.75 },
  { size: 0.90, leftPct: 14, driftX: -10, dur: 32, delay: -22, depth: 0.70 },
  { size: 0.66, leftPct: 30, driftX: 10, dur: 34, delay: -4, depth: 0.55 },
  { size: 0.62, leftPct: 70, driftX: -8, dur: 30, delay: -18, depth: 0.55 },
  { size: 0.58, leftPct: 50, driftX: 8, dur: 36, delay: -10, depth: 0.50 },
  { size: 0.54, leftPct: 88, driftX: -6, dur: 38, delay: -26, depth: 0.45 },
  { size: 0.52, leftPct: 3, driftX: 6, dur: 34, delay: -12, depth: 0.45 },
  { size: 0.36, leftPct: 22, driftX: 4, dur: 40, delay: -6, depth: 0.32 },
  { size: 0.34, leftPct: 42, driftX: -4, dur: 42, delay: -20, depth: 0.30 },
  { size: 0.38, leftPct: 60, driftX: 4, dur: 38, delay: -2, depth: 0.32 },
  { size: 0.30, leftPct: 82, driftX: -3, dur: 44, delay: -30, depth: 0.26 },
  { size: 0.32, leftPct: 38, driftX: 3, dur: 46, delay: -14, depth: 0.28 },
  { size: 0.34, leftPct: 66, driftX: -3, dur: 40, delay: -28, depth: 0.30 },
];

const embers = Array.from({ length: 28 }).map((_, i) => ({
  leftPct: (i * 7.31 + 3) % 99,
  size: 1.2 + ((i * 17) % 5) * 0.6,
  dur: 8 + ((i * 13) % 7) * 1.5,
  delay: -((i * 1.7) % 12),
  drift: ((i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2)),
}));

export default function HangingLanterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Moon */}
      <div
        className="absolute"
        style={{
          right: "8%", top: "12%", width: 64, height: 64,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #FFF7E2, #E8DAB2 60%, transparent 100%)",
          boxShadow: "0 0 36px rgba(255,240,200,0.35)",
          opacity: 0.5,
          animation: "moon-breathe 7s ease-in-out infinite",
        }}
      />

      {/* Embers */}
      <div className="absolute inset-0">
        {embers.map((e, i) => (
          <span
            key={`e-${i}`}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${e.leftPct}%`,
              width: e.size, height: e.size,
              background: "var(--accent)",
              boxShadow: `0 0 ${e.size * 3}px var(--accent-soft)`,
              ["--emberX" as string]: `${e.drift}px`,
              animation: `ember-rise ${e.dur}s linear infinite`,
              animationDelay: `${e.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Lanterns */}
      <div className="absolute inset-0">
        {lanterns.map((l, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${l.leftPct}%`,
              bottom: 0,
              transform: "translateX(-50%)",
              ["--driftX" as string]: `${l.driftX}px`,
              animation: `lantern-rise ${l.dur}s linear infinite`,
              animationDelay: `${l.delay}s`,
              opacity: l.depth,
              filter: l.depth < 0.6 ? `blur(${(0.6 - l.depth) * 4}px)` : "none",
            }}
          >
            <SkyLantern scale={l.size} flickerDelay={i * 0.4} />
          </div>
        ))}
      </div>
    </div>
  );
}
