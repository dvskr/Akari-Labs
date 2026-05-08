"use client";
import { useMemo } from "react";


function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

export default function Hero() {
  const accentHex = "#E6B45A";
  const accentRgb = useMemo(() => hexToRgb(accentHex), []);

  return (
    <section className="relative min-h-[70svh] w-full overflow-hidden flex flex-col">
      {/* Background — asanoha pattern + warm wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 85% 60%, rgba(${accentRgb},0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 5% 20%, rgba(${accentRgb},0.06) 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 0L40 20L80 0M0 80L40 60L80 80M0 0L40 40L0 80M80 0L40 40L80 80M0 40L40 20L80 40M0 40L40 60L80 40' stroke='%23E6B45A' stroke-width='0.4' fill='none' opacity='0.55'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />
      </div>



      {/* ───── Full-bleed headline layer ───── */}
      <div className="relative z-10 flex flex-1 flex-col justify-between">

        {/* Giant headline — full-bleed, no max-width constraint */}
        <div className="flex-1 flex items-center">
          <div className="w-full px-[clamp(20px,3vw,48px)] pt-20 pb-0">
            <h1
              className="text-[clamp(48px,10vw,180px)] leading-[0.85] tracking-[-0.035em]"
              style={{ fontFamily: "'Fraunces','Shippori Mincho',serif", color: "var(--ink)", fontWeight: 300 }}
            >
              <span className="block">Software</span>
              <span className="block" style={{ paddingLeft: "clamp(20px,8vw,160px)" }}>
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>that lights</span>
              </span>
              <span className="block">the way<span style={{ color: "var(--accent)" }}>.</span></span>
            </h1>
          </div>
        </div>

        {/* ───── Lower asymmetric strip — lede left, spec grid right, no gap ───── */}
        <div className="w-full border-t" style={{ borderColor: "var(--hairline-strong)" }}>
          <div className="grid grid-cols-12 gap-0 min-h-[240px]">

            {/* Lede — left 7 cols, generous padding, drop-cap */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-center px-[clamp(20px,3vw,48px)] py-10 border-r" style={{ borderColor: "var(--hairline)" }}>
              <p
                className="text-[clamp(16px,1.3vw,20px)] leading-[1.55] max-w-[640px]"
                style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)", fontWeight: 400 }}
              >
                <span
                  className="float-left mr-3 mt-1 leading-none"
                  style={{ fontFamily: "'Fraunces',serif", color: "var(--accent)", fontSize: "clamp(56px,5vw,78px)", fontStyle: "italic", fontWeight: 400 }}
                  aria-hidden="true"
                >
                  A
                </span>
                <span className="sr-only">A</span>n independent studio in Sheridan, Wyoming, building deliberate software for narrow markets that deserve better. We build with precision, sharpen relentlessly, and answer our own email.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-baseline gap-3 px-5 py-3 text-[12px] tracking-[0.18em] uppercase transition-all hover:gap-4"
                  style={{ fontFamily: "'JetBrains Mono',monospace", background: "var(--accent)", color: "var(--tile)", fontWeight: 600 }}
                >
                  Read the work <span>→</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-baseline gap-3 px-5 py-3 text-[12px] tracking-[0.18em] uppercase transition-all hover:gap-4"
                  style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink)", border: "1px solid var(--ink)", fontWeight: 600 }}
                >
                  Send a letter <span>→</span>
                </a>
                <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                  One product live · One in beta
                </span>
              </div>
            </div>

            {/* Spec grid — right 5 cols, fills height, flush to edge */}
            <div className="col-span-12 md:col-span-5 flex flex-col">
              <div className="grid grid-cols-2 gap-px flex-1" style={{ background: "var(--tile-grid)" }}>
                {[
                  ["Founded", "Dec 2025"],
                  ["Region", "Sheridan, WY"],
                  ["Team", "Two"],
                  ["Focus", "Healthcare · Fitness"],
                  ["Cadence", "Relentless"],
                  ["Edition", "Vol. 01"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col justify-center gap-1.5 p-5" style={{ background: "var(--tile)" }}>
                    <span className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{k}</span>
                    <span className="text-[15px]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom marquee — flush, no gap */}
        <div
          className="w-full border-y overflow-hidden whitespace-nowrap"
          style={{ borderColor: "var(--hairline-strong)", background: "transparent" }}
        >
          <div
            className="inline-flex items-center gap-10 py-4 text-[12px] tracking-[0.22em] uppercase"
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              color: "var(--ink)",
              animation: "marquee 40s linear infinite",
              paddingLeft: "100%",
            }}
          >
            {Array.from({ length: 4 }).flatMap((_, i) => [
              <span key={`a${i}`} style={{ color: "var(--accent)" }}>✦</span>,
              <span key={`b${i}`}>Software that lights the way</span>,
              <span key={`c${i}`} style={{ color: "var(--sub)" }}>·</span>,
              <span key={`d${i}`}>PMHNP Hiring · Live</span>,
              <span key={`e${i}`} style={{ color: "var(--sub)" }}>·</span>,
              <span key={`f${i}`}>Gym Tracker · Beta soon</span>,
              <span key={`g${i}`} style={{ color: "var(--sub)" }}>·</span>,
              <span key={`h${i}`}>Sheridan, Wyoming</span>,
              <span key={`i${i}`} style={{ color: "var(--sub)" }}>·</span>,
              <span key={`j${i}`} style={{ color: "var(--accent)" }}>Open for work</span>,
              <span key={`k${i}`} style={{ color: "var(--sub)" }}>·</span>,
            ])}
          </div>
        </div>
      </div>
    </section>
  );
}
