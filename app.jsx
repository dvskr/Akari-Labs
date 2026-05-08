/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ───────────────────────────── Tweaks ───────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "accent": "amber",
  "density": "airy",
  "heroVariant": "lantern",
  "motion": true
}/*EDITMODE-END*/;

const ACCENTS = {
  amber:   { hex: "#C97A1F", soft: "rgba(201,122,31,0.10)", line: "rgba(201,122,31,0.35)", bright: "#E89A3D" },
  sage:    { hex: "#3F8A5E", soft: "rgba(63,138,94,0.10)",  line: "rgba(63,138,94,0.35)",  bright: "#5BA078" },
  coral:   { hex: "#C44A2E", soft: "rgba(196,74,46,0.10)",  line: "rgba(196,74,46,0.35)",  bright: "#D8624A" },
  paper:   { hex: "#7A6B4F", soft: "rgba(122,107,79,0.10)", line: "rgba(122,107,79,0.35)", bright: "#8E7E5E" },
  // Theme signature accents
  claude:  { hex: "#D57757", soft: "rgba(213,119,87,0.12)", line: "rgba(213,119,87,0.40)", bright: "#E68F70" },
  ember:   { hex: "#E6B45A", soft: "rgba(230,180,90,0.14)", line: "rgba(230,180,90,0.40)", bright: "#F5CC7A" },
  meadow:  { hex: "#5B7A40", soft: "rgba(91,122,64,0.12)",  line: "rgba(91,122,64,0.38)",  bright: "#7A9658" },
  violet:  { hex: "#B282DC", soft: "rgba(178,130,220,0.14)", line: "rgba(178,130,220,0.40)", bright: "#C99BEC" },
  azure:   { hex: "#6E9CFF", soft: "rgba(110,156,255,0.14)", line: "rgba(110,156,255,0.40)", bright: "#8FB6FF" },
};

// Each theme picks its preferred accent + a label for the picker.
// `force: true` means selecting the theme also flips the accent to its signature.
const THEMES = {
  default:  { label: "Clay (default)",  accent: "amber",  selectionFg: "#FFF4E6" },
  paper:    { label: "Washi paper",   accent: "amber",  selectionFg: "#F5F0E4" },
  claude:   { label: "Claude",        accent: "claude", selectionFg: "#F4F1E7", force: true },
  midnight: { label: "Midnight",      accent: "ember",  selectionFg: "#000000", force: true },
  ghibli:   { label: "Ghibli meadow", accent: "meadow", selectionFg: "#F4F8E8", force: true },
  clay:     { label: "Claymorphism",  accent: "violet", selectionFg: "#F5EEFB", force: true },
  glass:    { label: "Glassmorphism", accent: "azure",  selectionFg: "#0E1A2E", force: true },
  neu:      { label: "Neumorphism",   accent: "azure",  selectionFg: "#E4E7EE", force: true },
};

/* ───────────────────────────── Layout primitives ───────────────────────────── */

function NavBar({ active, accent }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Index", "#index"],
    ["Work", "#work"],
    ["Studio", "#studio"],
    ["Team", "#team"],
    ["Contact", "#contact"],
  ];

  const go = (href) => (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1320px] items-baseline justify-between px-8 py-5">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-baseline gap-2.5 group">
          <span
            className="text-[26px] leading-none transition-colors"
            style={{ fontFamily: "'Shippori Mincho','Noto Serif JP',serif", color: accent.hex, fontWeight: 600 }}
          >
            灯
          </span>
          <span className="flex items-baseline gap-1.5 text-[13px] tracking-[0.18em] uppercase" style={{ color: "var(--ink-soft)", fontFamily: "'Inter Tight','DM Sans',sans-serif", fontWeight: 600 }}>
            Akari <span style={{ color: "var(--sub)" }}>Labs</span>
          </span>
        </a>

        <div className="hidden items-baseline gap-9 md:flex">
          {links.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              onClick={go(href)}
              className="group relative text-[12px] tracking-[0.16em] uppercase transition-colors"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                color: active === href.slice(1) ? accent.hex : "var(--label)",
                fontWeight: 500,
              }}
            >
              <span className="mr-2 tabular-nums" style={{ color: "var(--faint)" }}>0{i + 1}</span>
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={go("#contact")}
          className="hidden items-baseline gap-2 px-4 py-2 text-[12px] tracking-[0.14em] uppercase transition-all md:inline-flex"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            color: accent.hex,
            border: `1px solid ${accent.line}`,
            background: accent.soft,
            fontWeight: 500,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent.hex }} />
          Open for work
        </a>
      </div>
    </nav>
  );
}

/* ───────────────────────────── Lantern field hero ───────────────────────────── */

function LanternField({ accent, motion }) {
  const canvasRef = useRef(null);
  const lanternsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed lanterns
    const rect = canvas.getBoundingClientRect();
    const count = 28;
    lanternsRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.05 - Math.random() * 0.08,
      r: 1.2 + Math.random() * 2.4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.7,
    }));

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const accentRgb = hexToRgb(accent.hex);
    let t = 0;

    const tick = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      // soft warm wash on paper
      const grad = ctx.createRadialGradient(r.width * 0.5, r.height * 0.6, 0, r.width * 0.5, r.height * 0.6, r.width * 0.7);
      grad.addColorStop(0, `rgba(${accentRgb},0.10)`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, r.width, r.height);

      lanternsRef.current.forEach((l) => {
        // mouse repel (gentle)
        const dx = l.x - mouseRef.current.x;
        const dy = l.y - mouseRef.current.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          const f = (140 - d) / 140;
          l.vx += (dx / d) * f * 0.12;
          l.vy += (dy / d) * f * 0.12;
        }

        l.x += l.vx + Math.sin(t * 0.001 * l.speed + l.phase) * 0.2;
        l.y += l.vy;
        l.vx *= 0.96;
        l.vy = Math.max(l.vy * 0.985, -0.12);

        if (l.y < -20) { l.y = r.height + 20; l.x = Math.random() * r.width; }
        if (l.x < -20) l.x = r.width + 20;
        if (l.x > r.width + 20) l.x = -20;

        const flicker = 0.7 + 0.3 * Math.sin(t * 0.003 * l.speed + l.phase);

        // soft warm halo (subtle on cream paper)
        const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r * 14);
        g.addColorStop(0, `rgba(${accentRgb},${0.28 * flicker})`);
        g.addColorStop(0.4, `rgba(${accentRgb},${0.06 * flicker})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.r * 14, 0, Math.PI * 2);
        ctx.fill();

        // ink-warm core dot — visible on paper
        ctx.fillStyle = `rgba(${accentRgb},${0.85 * flicker})`;
        ctx.beginPath();
        ctx.arc(l.x, l.y, l.r * 0.9, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 16;
      if (motion) raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [accent, motion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function hexToRgb(hex) {
  const m = hex.replace("#", "");
  const r = parseInt(m.substring(0, 2), 16);
  const g = parseInt(m.substring(2, 4), 16);
  const b = parseInt(m.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

/* ───────────────────────────── Sky-lantern release ─────────────────────────────
   A vertical column on the right side of the hero. Paper sky-lanterns drift
   upward at varying rates, with depth (size + opacity), gentle horizontal
   drift, flickering cores, and rising embers. A faint moon disc anchors the
   scene at the top. */

function HangingLanterns({ accent, motion }) {
  // Full-bleed sky-lantern field. Lanterns drift up at varying speeds across
  // the WHOLE hero, with depth (size + opacity + blur) so they sit BEHIND the
  // typography as quiet atmosphere — not a sidebar column.
  const lanterns = [
    // foreground (large, sharp, more opaque) — sparingly placed in margins
    { size: 1.10, leftPct:  6, driftX:  14, dur: 28, delay:  0,  depth: 0.85 },
    { size: 1.20, leftPct: 92, driftX: -16, dur: 26, delay: -8,  depth: 0.85 },
    { size: 0.95, leftPct: 78, driftX:  10, dur: 30, delay: -16, depth: 0.75 },
    { size: 0.90, leftPct: 14, driftX: -10, dur: 32, delay: -22, depth: 0.70 },
    // mid-ground
    { size: 0.66, leftPct: 30, driftX:  10, dur: 34, delay: -4,  depth: 0.55 },
    { size: 0.62, leftPct: 70, driftX:  -8, dur: 30, delay: -18, depth: 0.55 },
    { size: 0.58, leftPct: 50, driftX:   8, dur: 36, delay: -10, depth: 0.50 },
    { size: 0.54, leftPct: 88, driftX:  -6, dur: 38, delay: -26, depth: 0.45 },
    { size: 0.52, leftPct:  3, driftX:   6, dur: 34, delay: -12, depth: 0.45 },
    // background (small, blurred, faint) — fills the field
    { size: 0.36, leftPct: 22, driftX:   4, dur: 40, delay: -6,  depth: 0.32 },
    { size: 0.34, leftPct: 42, driftX:  -4, dur: 42, delay: -20, depth: 0.30 },
    { size: 0.38, leftPct: 60, driftX:   4, dur: 38, delay: -2,  depth: 0.32 },
    { size: 0.30, leftPct: 82, driftX:  -3, dur: 44, delay: -30, depth: 0.26 },
    { size: 0.32, leftPct: 38, driftX:   3, dur: 46, delay: -14, depth: 0.28 },
    { size: 0.34, leftPct: 66, driftX:  -3, dur: 40, delay: -28, depth: 0.30 },
  ];

  // Embers — far more, tiny, scattered across the full width
  const embers = Array.from({ length: 28 }).map((_, i) => ({
    leftPct: (i * 7.31 + 3) % 99,
    size: 1.2 + ((i * 17) % 5) * 0.6,
    dur: 8 + ((i * 13) % 7) * 1.5,
    delay: -((i * 1.7) % 12),
    drift: ((i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2)),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Faint moon — top-right, a fixed atmosphere element */}
      <div
        className="absolute"
        style={{
          right: "8%",
          top: "12%",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #FFF7E2, #E8DAB2 60%, transparent 100%)",
          boxShadow: "0 0 36px rgba(255,240,200,0.35)",
          opacity: 0.5,
          animation: motion ? "moon-breathe 7s ease-in-out infinite" : "none",
        }}
      />

      {/* Embers — tiny rising specks across the field */}
      <div className="absolute inset-0">
        {embers.map((e, i) => (
          <span
            key={`e-${i}`}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${e.leftPct}%`,
              width: e.size,
              height: e.size,
              background: accent.hex,
              boxShadow: `0 0 ${e.size * 3}px ${accent.soft}`,
              ["--emberX"]: `${e.drift}px`,
              animation: motion ? `ember-rise ${e.dur}s linear infinite` : "none",
              animationDelay: `${e.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Lanterns — drifting up across the full hero */}
      <div className="absolute inset-0">
        {lanterns.map((l, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${l.leftPct}%`,
              bottom: 0,
              transform: "translateX(-50%)",
              ["--driftX"]: `${l.driftX}px`,
              animation: motion ? `lantern-rise ${l.dur}s linear infinite` : "none",
              animationDelay: `${l.delay}s`,
              opacity: l.depth,
              filter: l.depth < 0.6 ? `blur(${(0.6 - l.depth) * 4}px)` : "none",
            }}
          >
            <SkyLantern accent={accent} scale={l.size} flickerDelay={i * 0.4} motion={motion} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkyLantern({ accent, scale, flickerDelay, motion }) {
  // A taller paper-bag silhouette: small top crown, dome body, narrow base
  // with a glowing flame core visible through the paper.
  const w = 44 * scale;
  const h = 60 * scale;
  return (
    <div className="relative" style={{ width: w, height: h }}>
      {/* Glow halo behind the lantern */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: w * 2.4,
          height: h * 2.4,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent.soft} 0%, transparent 62%)`,
          opacity: 0.7,
          animation: motion ? `glow-flicker 3.2s ease-in-out infinite` : "none",
          animationDelay: `${flickerDelay}s`,
        }}
      />

      {/* Top crown — small dark cap */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 0,
          width: w * 0.42,
          height: h * 0.06,
          transform: "translateX(-50%)",
          background: "var(--ink-strong)",
          borderRadius: "2px 2px 0 0",
        }}
      />
      {/* Crown rim */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: h * 0.06,
          width: w * 0.6,
          height: 1.5,
          transform: "translateX(-50%)",
          background: "var(--ink-strong)",
        }}
      />

      {/* Paper body — dome shape (wider top, tapering bottom) */}
      <div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          top: h * 0.08,
          bottom: h * 0.12,
          background: `radial-gradient(ellipse at 50% 65%, ${accent.bright} 0%, ${accent.hex} 55%, ${accent.hex} 100%)`,
          borderRadius: "44% 44% 30% 30% / 38% 38% 22% 22%",
          boxShadow: `0 0 ${20 * scale}px ${accent.soft}, inset 0 -6px 10px rgba(0,0,0,0.22), inset 0 4px 8px rgba(255,240,210,0.55)`,
          animation: motion ? `glow-flicker 3.4s ease-in-out infinite` : "none",
          animationDelay: `${flickerDelay + 0.2}s`,
        }}
      />

      {/* Vertical paper seams */}
      {[0.28, 0.5, 0.72].map((p) => (
        <div
          key={p}
          className="absolute"
          style={{
            left: `${p * 100}%`,
            top: h * 0.10,
            bottom: h * 0.14,
            width: 1,
            background: "rgba(60,30,10,0.18)",
            opacity: 0.6,
          }}
        />
      ))}

      {/* Bright flame core — bottom-center, brightest spot */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: h * 0.55,
          width: w * 0.32,
          height: w * 0.32,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, #FFF4D2 0%, ${accent.bright} 45%, transparent 75%)`,
          filter: "blur(1.5px)",
          opacity: 0.95,
          animation: motion ? `glow-flicker 1.8s ease-in-out infinite` : "none",
          animationDelay: `${flickerDelay}s`,
        }}
      />

      {/* Base ring — narrower than body */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: h * 0.06,
          width: w * 0.7,
          height: 1.5,
          transform: "translateX(-50%)",
          background: "var(--ink-strong)",
        }}
      />
      {/* Base flame mount */}
      <div
        className="absolute"
        style={{
          left: "50%",
          bottom: h * 0.02,
          width: w * 0.18,
          height: h * 0.05,
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, #2A241A 0%, #2A241A 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ───────────────────────────── Hero (redesigned) ───────────────────────────── */

function Hero({ accent, variant, motion }) {
  const accentRgb = useMemo(() => hexToRgb(accent.hex), [accent.hex]);
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background — soft asanoha pattern + warm wash */}
      <div className="absolute inset-0 pointer-events-none">
        {/* warm corner glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 85% 60%, rgba(${accentRgb},0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 5% 20%, rgba(${accentRgb},0.06) 0%, transparent 60%)`,
          }}
        />
        {/* asanoha hemp-leaf pattern */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 0L40 20L80 0M0 80L40 60L80 80M0 0L40 40L0 80M80 0L40 40L80 80M0 40L40 20L80 40M0 40L40 60L80 40' stroke='%23C97A1F' stroke-width='0.4' fill='none' opacity='0.55'/%3E%3C/svg%3E")`,
          }}
        />
        {/* paper grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* hanging lanterns column */}
      {variant === "lantern" && <HangingLanterns accent={accent} motion={motion} />}

      {/* Paper wash — softens lantern field behind text without hiding motion */}
      {variant === "lantern" && (
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 30% 45%, rgba(248,241,223,0.78) 0%, rgba(248,241,223,0.4) 45%, transparent 75%)",
          }}
        />
      )}

      {/* Big editorial headline volume — content stack */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-8 pt-24 pb-10">
        {/* Headline — big editorial poster, full width */}
        <h1
          className="text-[clamp(56px,13vw,220px)] leading-[0.86] tracking-[-0.03em]"
          style={{ fontFamily: "'Fraunces','Shippori Mincho',serif", color: "var(--ink)", fontWeight: 300 }}
        >
          <span className="block">Software</span>
          <span className="block">
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>that lights</span>
          </span>
          <span className="block">
            <span>the way</span>
            <span style={{ color: accent.hex, fontFamily: "'Shippori Mincho','Noto Serif JP',serif", fontStyle: "normal", fontSize: "0.55em", verticalAlign: "0.18em", marginLeft: "0.12em" }}>灯</span>
          </span>
        </h1>

        {/* Lower row: deck, lede, edition */}
        <div className="mt-20 grid grid-cols-12 gap-8 border-t pt-8" style={{ borderColor: "var(--hairline-strong)" }}>
          {/* drop-cap lede */}
          <div className="col-span-12 md:col-span-7">
            <p
              className="text-[20px] leading-[1.55]"
              style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)", fontWeight: 400 }}
            >
              <span
                className="float-left mr-3 mt-1 leading-none"
                style={{ fontFamily: "'Fraunces',serif", color: accent.hex, fontSize: "78px", fontStyle: "italic", fontWeight: 400 }}
              >
                A
              </span>
              n independent studio in Sheridan, Wyoming, building deliberate software for narrow markets where care and clarity have gone missing. We ship slowly, sharpen forever, and answer our own email.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.querySelector("#work").scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-baseline gap-3 px-5 py-3 text-[12px] tracking-[0.18em] uppercase transition-all hover:gap-4"
                style={{ fontFamily: "'JetBrains Mono',monospace", background: accent.hex, color: "var(--tile)", fontWeight: 600 }}
              >
                Read the work <span>→</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-baseline gap-2 border-b pb-1 text-[12px] tracking-[0.18em] uppercase"
                style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink)", borderColor: "var(--ink)" }}
              >
                Send a letter
              </a>
              <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                Two products live · One in beta
              </span>
            </div>
          </div>

          {/* Edition / spec block */}
          <div className="col-span-12 md:col-span-5">
            <div className="grid grid-cols-2 gap-px" style={{ background: "var(--tile-grid)" }}>
              {[
                ["Founded", "Dec 2025"],
                ["Region", "Sheridan, WY"],
                ["Team", "Two"],
                ["Focus", "Healthcare · Fitness"],
                ["Cadence", "Slow + steady"],
                ["Edition", "Vol. 01"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1.5 p-4" style={{ background: "var(--tile)" }}>
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{k}</span>
                  <span className="text-[15px]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        className="relative z-10 border-y overflow-hidden whitespace-nowrap"
        style={{ borderColor: "var(--hairline-strong)", background: "transparent" }}
      >
        <div
          className="inline-flex items-center gap-10 py-4 text-[12px] tracking-[0.22em] uppercase"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            color: "var(--ink)",
            animation: motion ? "marquee 40s linear infinite" : "none",
            paddingLeft: "100%",
          }}
        >
          {Array.from({ length: 4 }).flatMap((_, i) => [
            <span key={`a${i}`} style={{ color: accent.hex, fontFamily: "'Shippori Mincho',serif", fontSize: 16 }}>灯</span>,
            <span key={`b${i}`}>Software that lights the way</span>,
            <span key={`c${i}`} style={{ color: "var(--sub)" }}>·</span>,
            <span key={`d${i}`}>PMHNP Hiring · Live</span>,
            <span key={`e${i}`} style={{ color: "var(--sub)" }}>·</span>,
            <span key={`f${i}`}>Gym Tracker · Beta soon</span>,
            <span key={`g${i}`} style={{ color: "var(--sub)" }}>·</span>,
            <span key={`h${i}`}>Sheridan, Wyoming</span>,
            <span key={`i${i}`} style={{ color: "var(--sub)" }}>·</span>,
            <span key={`j${i}`} style={{ color: accent.hex }}>Open for work</span>,
            <span key={`k${i}`} style={{ color: "var(--sub)" }}>·</span>,
          ])}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Index strip ───────────────────────────── */

function IndexStrip({ accent }) {
  const rows = [
    ["01", "PMHNP Hiring", "Healthcare · Job board", "Live", "2026"],
    ["02", "Gym Tracker", "Fitness · iOS / Android", "Beta soon", "2026"],
  ];
  return (
    <section id="index" className="relative px-8 py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
            Index
          </h2>
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>03 entries</span>
        </div>
        <div className="border-t" style={{ borderColor: "var(--hairline)" }}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-12 items-baseline gap-4 border-b px-2 py-6 transition-all hover:bg-black/[0.025] group"
              style={{ borderColor: "var(--hairline)" }}
            >
              <span className="col-span-1 text-[11px] tabular-nums tracking-[0.16em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{row[0]}</span>
              <span className="col-span-4 text-[28px] font-light" style={{ fontFamily: "'Fraunces',serif", color: row[1] === "—" ? "var(--faint)" : "var(--ink)" }}>
                {row[1]}
              </span>
              <span className="col-span-4 text-[14px]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", color: "var(--label)" }}>{row[2]}</span>
              <span className="col-span-2 text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: row[3] === "Live" ? accent.hex : "var(--sub)" }}>{row[3]}</span>
              <span className="col-span-1 text-right text-[11px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{row[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Work / Products ───────────────────────────── */

function ProductCaseA({ accent }) {
  return (
    <article className="grid grid-cols-12 gap-x-8 gap-y-10 border-t pt-16" style={{ borderColor: "var(--hairline)" }}>
      {/* Sidecar */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-24">
          <div className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>Case 01</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#3F8A5E" }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3F8A5E]" /> Live · pmhnphiring.com
          </div>

          <h3 className="mt-6 text-[40px] font-light leading-[1.0]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>PMHNP<br/>Hiring</h3>

          <dl className="mt-6 space-y-3 text-[12px]" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {[
              ["Sector", "Healthcare"],
              ["Audience", "Psychiatric NPs"],
              ["Launched", "Jan 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: "var(--hairline)" }}>
                <dt style={{ color: "var(--sub)" }} className="tracking-[0.14em] uppercase">{k}</dt>
                <dd style={{ color: "var(--ink-mute)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      {/* Main */}
      <div className="col-span-12 md:col-span-9">
        <p className="max-w-[640px] text-[22px] font-light leading-[1.45]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)" }}>
          The only job board built for Psychiatric Mental Health Nurse Practitioners. Ten thousand verified roles, refreshed daily, with the salary up front.
        </p>

        {/* Mock screenshot */}
        <div
          className="relative mt-10 overflow-hidden border"
          style={{
            borderColor: "var(--hairline)",
            background: "linear-gradient(180deg, var(--tile) 0%, var(--bg-3) 100%)",
            aspectRatio: "16/10",
          }}
        >
          <PMHNPMock accent={accent} />
        </div>

        {/* Stats — editorial big numbers */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
          {[
            ["10,000", "+", "Verified roles"],
            ["50", " ", "U.S. states"],
          ].map(([n, s, l]) => (
            <div key={l}>
              <div className="flex items-baseline">
                <span className="text-[64px] font-light leading-[1] tabular-nums" style={{ fontFamily: "'Fraunces',serif", color: accent.hex }}>{n}</span>
                <span className="text-[28px]" style={{ fontFamily: "'Fraunces',serif", color: accent.hex }}>{s.trim()}</span>
              </div>
              <div className="mt-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["Remote", "Telehealth", "New grad", "Travel", "Per diem"].map((t) => (
            <span key={t} className="border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)" }}>{t}</span>
          ))}
        </div>

        <a href="https://pmhnphiring.com" target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-flex items-baseline gap-3 border-b pb-1 text-[14px] tracking-[0.14em] uppercase transition-all hover:gap-4"
          style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex, borderColor: accent.hex }}>
          Visit pmhnphiring.com <span>↗</span>
        </a>
      </div>
    </article>
  );
}

function PMHNPMock({ accent }) {
  return (
    <div className="absolute inset-0 p-6">
      {/* fake browser dots */}
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--faint)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--faint)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--faint)" }} />
        <span className="ml-3 text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>pmhnphiring.com/jobs</span>
      </div>
      <div className="grid h-[calc(100%-32px)] grid-cols-12 gap-3">
        <aside className="col-span-3 space-y-2 border-r pr-3" style={{ borderColor: "var(--hairline)" }}>
          <div className="text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Filter</div>
          {["Remote", "Telehealth", "New grad", "$200k+", "Travel"].map((f, i) => (
            <div key={f} className="flex items-center justify-between text-[11px]" style={{ color: "var(--label)", fontFamily: "'Inter Tight',sans-serif" }}>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 border" style={{ borderColor: i < 2 ? accent.hex : "var(--faint)", background: i < 2 ? accent.hex : "transparent" }} />
                {f}
              </span>
              <span style={{ color: "var(--faint)", fontFamily: "'JetBrains Mono',monospace" }}>{[1480, 320, 980, 540, 220][i]}</span>
            </div>
          ))}
          <div className="mt-4 text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Salary</div>
          <div className="h-1 w-full" style={{ background: "var(--hairline)" }}>
            <div className="h-1 w-2/3" style={{ background: accent.hex }} />
          </div>
          <div className="flex justify-between text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
            <span>$120k</span><span>$280k</span>
          </div>
        </aside>
        <div className="col-span-9 space-y-2">
          {[
            ["Telehealth PMHNP", "Talkiatry · Remote, USA", "$155k–$185k", "New"],
            ["Outpatient Psychiatric NP", "Kaiser Permanente · Denver, CO", "$170k–$200k", ""],
            ["Travel PMHNP — 13wk", "Aya Healthcare · Phoenix, AZ", "$3,200/wk", ""],
            ["Lead PMHNP", "Brightside Health · Remote", "$190k–$220k", "Hot"],
            ["PMHNP — Inpatient", "Mass General Brigham · Boston", "$165k–$195k", ""],
            ["Per Diem PMHNP", "Cerebral · Remote", "$95/hr", ""],
          ].map(([t, o, s, b], i) => (
            <div key={i} className="flex items-center justify-between border px-3 py-2" style={{ borderColor: "var(--hairline)", background: i === 0 ? accent.soft : "transparent" }}>
              <div className="min-w-0">
                <div className="truncate text-[12px]" style={{ color: "var(--ink-soft)", fontFamily: "'Inter Tight',sans-serif", fontWeight: 500 }}>{t}</div>
                <div className="truncate text-[10px]" style={{ color: "#7A7466", fontFamily: "'Inter Tight',sans-serif" }}>{o}</div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {b && <span className="px-1.5 py-0.5 text-[9px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex, border: `1px solid ${accent.line}` }}>{b}</span>}
                <span className="text-[11px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink-mute)" }}>{s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCaseB({ accent }) {
  return (
    <article className="mt-28 grid grid-cols-12 gap-x-8 gap-y-10 border-t pt-16" style={{ borderColor: "var(--hairline)" }}>
      <aside className="col-span-12 md:col-span-3 md:order-2">
        <div className="sticky top-24">
          <div className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>Case 02</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.hex }} /> Beta soon
          </div>

          <h3 className="mt-6 text-[40px] font-light leading-[1.0]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>Gym<br/>Tracker</h3>

          <dl className="mt-6 space-y-3 text-[12px]" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {[
              ["Sector", "Fitness"],
              ["Platform", "iOS · Android"],
              ["Launching", "Q2 2026"],
              ["Pricing", "Free · $5.99/mo"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: "var(--hairline)" }}>
                <dt style={{ color: "var(--sub)" }} className="tracking-[0.14em] uppercase">{k}</dt>
                <dd style={{ color: "var(--ink-mute)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <div className="col-span-12 md:col-span-9 md:order-1">
        <p className="max-w-[640px] text-[22px] font-light leading-[1.45]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)" }}>
          Workout tracking that learns you. One-tap logging, PR detection, and progressive-overload guidance — without the bloat of every other gym app.
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <PhoneMock accent={accent} />
          </div>
          <div className="col-span-12 space-y-6 md:col-span-7">
            {[
              ["One-tap logging", "Last set's weight pre-fills. Tap, lift, tap again."],
              ["PR detection", "We notice when you hit a record before you do."],
              ["Progressive overload", "Suggested next-session weights, grounded in your last 8 sessions."],
              ["AI coach", "Plateau check-ins. Form notes. Honest feedback when you skip."],
            ].map(([t, d], i) => (
              <div key={t} className="grid grid-cols-12 gap-4 border-t pt-5" style={{ borderColor: "var(--hairline)" }}>
                <span className="col-span-1 text-[11px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>0{i + 1}</span>
                <div className="col-span-11">
                  <h4 className="text-[18px]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", fontWeight: 500, color: "var(--ink)" }}>{t}</h4>
                  <p className="mt-1 text-[14px] leading-[1.6]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", color: "var(--label)" }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2">
          {["400+ exercises", "4 set types", "AI coach", "PR detection"].map((t) => (
            <span key={t} className="border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)" }}>{t}</span>
          ))}
        </div>

        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); }}
          className="mt-10 inline-flex items-baseline gap-3 border-b pb-1 text-[14px] tracking-[0.14em] uppercase transition-all hover:gap-4"
          style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex, borderColor: accent.hex }}>
          Join the waitlist <span>→</span>
        </a>
      </div>
    </article>
  );
}

function PhoneMock({ accent }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div
        className="overflow-hidden rounded-[34px] border-[6px] p-3"
        style={{
          borderColor: "var(--ink-strong)",
          background: "linear-gradient(180deg,var(--tile) 0%,var(--bg-3) 100%)",
          aspectRatio: "9/19",
          boxShadow: "0 30px 80px rgba(60,45,20,0.18), 0 0 0 1px rgba(26,26,26,0.06)",
        }}
      >
        <div className="flex items-center justify-between px-3 py-1 text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)" }}>
          <span>9:41</span>
          <span>●●●●</span>
        </div>
        <div className="mt-3">
          <div className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Push · day 24</div>
          <div className="mt-1 text-[26px] font-light leading-tight" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>Bench Press</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex }}>+ 2.5 lb · PR</span>
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          {[
            ["1", "135 × 8", "warmup", false],
            ["2", "185 × 5", "working", false],
            ["3", "205 × 5", "working", true],
            ["4", "215 × 3", "PR", true],
            ["5", "—", "next", false],
          ].map(([n, set, tag, done], i) => (
            <div key={i} className="flex items-center justify-between border px-3 py-2" style={{ borderColor: done ? accent.line : "var(--hairline)", background: done ? accent.soft : "transparent" }}>
              <span className="text-[10px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{n}</span>
              <span className="text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: done ? "var(--ink)" : (i === 4 ? "var(--faint)" : "var(--label)"), fontWeight: done ? 500 : 400 }}>{set}</span>
              <span className="text-[9px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: tag === "PR" ? accent.hex : "var(--sub)" }}>{tag}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
          <div className="flex items-baseline justify-between text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
            <span>Volume</span><span style={{ color: accent.hex }}>+12% vs last</span>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {[40, 55, 48, 62, 70, 58, 75, 82].map((h, i) => (
              <div key={i} className="flex-1" style={{ height: `${h}%`, background: i === 7 ? accent.hex : "var(--hairline-strong)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Work({ accent }) {
  return (
    <section id="work" className="relative px-8 py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Work
            </h2>
            <p className="mt-4 text-[clamp(40px,5vw,72px)] font-light leading-[1.05]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
              Two products. <span style={{ fontStyle: "italic", color: "var(--label)" }}>Both narrow on purpose.</span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.7] md:text-right" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Each one solves a small, specific problem we kept hearing about — then we sit with it. No platform play. No roadmap theater.
            </p>
          </div>
        </div>

        <ProductCaseA accent={accent} />
        <ProductCaseB accent={accent} />
      </div>
    </section>
  );
}

/* ───────────────────────────── Studio / Manifesto ───────────────────────────── */

function Studio({ accent, density }) {
  const principles = [
    ["01", "Focused", "One niche, done right. We choose depth over breadth and live with the consequences."],
    ["02", "Fast", "Ship, learn, iterate. Ideas don't age well; neither does software written for permission."],
    ["03", "Transparent", "Honest data, always. No inflated metrics, no vaporware, no roadmap fiction."],
    ["04", "Crafted", "Every pixel earns its place. If it's worth building, it's worth polishing twice."],
  ];
  return (
    <section id="studio" className="relative overflow-hidden px-8 py-32">
      {/* watermark */}
      <div
        className="pointer-events-none absolute -right-12 top-1/2 select-none -translate-y-1/2"
        style={{ fontFamily: "'Shippori Mincho','Noto Serif JP',serif", fontSize: "clamp(280px, 40vw, 560px)", lineHeight: "0.8", color: "rgba(201,122,31,0.06)" }}
      >
        灯
      </div>

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Studio
            </h2>
            <p className="mt-6 text-[44px] font-light leading-[1.05]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
              <span style={{ fontStyle: "italic" }}>Akari</span><span style={{ color: accent.hex }}>.</span>
            </p>
            <p className="mt-2 text-[14px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              <span style={{ fontFamily: "'Shippori Mincho',serif", color: accent.hex, marginRight: 8 }}>灯り</span>
              n. — light, lamplight (Japanese)
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="text-[24px] font-light leading-[1.5]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)" }}>
              An independent software studio in Sheridan, Wyoming. We started Akari in late 2025 because the best software comes from deep focus on a single problem — and most companies are no longer in the business of focus.
            </p>
            <p className="mt-6 text-[16px] leading-[1.7]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", color: "var(--label)" }}>
              We find places where specialized software still makes a difference, then we build, ship, and tend to it. Fewer features, longer time horizons. The kind of product that gets quietly better the year you don't notice.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className={`mt-20 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4`} style={{ background: "var(--hairline)" }}>
          {principles.map(([n, t, d]) => (
            <div key={n} className={density === "airy" ? "p-8" : "p-6"} style={{ background: "var(--tile)" }}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] tabular-nums tracking-[0.22em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{n}</span>
                <span className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex }}>—</span>
              </div>
              <h3 className="mt-6 text-[28px] font-light" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>{t}</h3>
              <p className="mt-3 text-[13px] leading-[1.6]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Team ───────────────────────────── */

function Team({ accent }) {
  const members = [
    {
      name: "Sathish",
      role: "Creator",
      bio: "Designs, codes, and ships every product. Data engineer by day, builder by night. Believes good software is a long letter, not a press release.",
      stack: "Next · TypeScript · Supabase · Cursor · Claude",
      links: [["GH", "https://github.com/dvskr"], ["LI", "https://linkedin.com/in/dvskr"], ["X", "https://twitter.com/Sathish_Daggula"]],
    },
    {
      name: "Pavan",
      role: "Operations",
      bio: "Banking, payments, partnerships, growth. Runs every social account. Keeps the lanterns lit while the studio builds.",
      stack: "Operations · Brand · Partnerships",
      links: [],
    },
  ];

  return (
    <section id="team" className="relative px-8 py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Team
            </h2>
            <p className="mt-4 text-[clamp(40px,5vw,72px)] font-light leading-[1.05]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
              Two people. <span style={{ fontStyle: "italic", color: "var(--label)" }}>By design.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {members.map((m, i) => (
            <article key={m.name} className="grid grid-cols-12 gap-6 border-t pt-10" style={{ borderColor: "var(--hairline)" }}>
              <div className="col-span-12">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] tabular-nums tracking-[0.22em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>0{i + 1}</span>
                  <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex }}>{m.role}</span>
                </div>
              </div>

              {/* Portrait placeholder — initial in a paper square */}
              <div className="col-span-4">
                <div
                  className="relative aspect-square w-full overflow-hidden border"
                  style={{
                    borderColor: "var(--hairline)",
                    background: `radial-gradient(circle at 50% 60%, ${accent.soft}, transparent 70%), linear-gradient(180deg,var(--bg-3) 0%,var(--bg-3) 100%)`,
                  }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[140px] font-light"
                    style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)", opacity: 0.95 }}
                  >
                    {m.name[0]}
                  </span>
                  <span
                    className="absolute bottom-3 right-3 text-[36px]"
                    style={{ fontFamily: "'Shippori Mincho','Noto Serif JP',serif", color: accent.hex, opacity: 0.5 }}
                  >
                    {i === 0 ? "創" : "運"}
                  </span>
                </div>
              </div>

              <div className="col-span-8">
                <h3 className="text-[40px] font-light leading-[1]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>{m.name}</h3>
                <p className="mt-4 text-[15px] leading-[1.65]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>{m.bio}</p>
                <p className="mt-4 text-[11px] tracking-[0.14em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{m.stack}</p>
                {m.links.length > 0 && (
                  <div className="mt-5 flex gap-2">
                    {m.links.map(([k, href]) => (
                      <a key={k} href={href} target="_blank" rel="noopener noreferrer"
                        className="border px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase transition-colors"
                        style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = accent.hex; e.currentTarget.style.borderColor = accent.line; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--label)"; e.currentTarget.style.borderColor = "var(--hairline-strong)"; }}
                      >
                        {k}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Contact ───────────────────────────── */

function Contact({ accent }) {
  const [state, setState] = useState("idle"); // idle | sending | sent
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });

  const send = (e) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => setState("sent"), 1200);
  };

  return (
    <section id="contact" className="relative px-8 py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Contact
            </h2>
            <p className="mt-6 text-[clamp(44px,5vw,80px)] font-light leading-[1.0]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
              Send a <span style={{ fontStyle: "italic" }}>letter</span><span style={{ color: accent.hex }}>.</span>
            </p>
            <p className="mt-6 max-w-[400px] text-[16px] leading-[1.7]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Partnership, press, or just hello — write something real and we'll write back. We read everything.
            </p>

            <div className="mt-12 space-y-4 border-t pt-8" style={{ borderColor: "var(--hairline)" }}>
              {[
                ["Email", "hello@akarilabs.io"],
                ["Office", "Sheridan, Wyoming"],
                ["Hours", "Mon–Fri · async-first"],
                ["Founded", "December 2025"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: "var(--hairline)" }}>
                  <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{k}</span>
                  <span className="text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--ink-soft)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div
              className="relative border p-10"
              style={{
                borderColor: "var(--hairline)",
                background: "linear-gradient(180deg, var(--card-fade-1) 0%, var(--card-fade-2) 100%)",
              }}
            >
              {/* Letter header decoration */}
              <div className="mb-8 flex items-baseline justify-between border-b pb-4" style={{ borderColor: "var(--hairline)" }}>
                <span className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                  Letter № <span style={{ color: accent.hex }} className="tabular-nums">{String(Math.floor(Math.random() * 8000) + 1000)}</span>
                </span>
                <span className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                  To: Akari Labs
                </span>
              </div>

              {state === "sent" ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center py-12 text-center">
                  <span className="text-[80px]" style={{ fontFamily: "'Shippori Mincho','Noto Serif JP',serif", color: accent.hex }}>灯</span>
                  <p className="mt-6 text-[28px] font-light" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>Sent.</p>
                  <p className="mt-2 text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>We'll write back within two business days.</p>
                  <button
                    onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "General", message: "" }); }}
                    className="mt-8 text-[12px] tracking-[0.18em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex }}
                  >
                    Write another →
                  </button>
                </div>
              ) : (
                <form onSubmit={send} className="space-y-6" style={{ opacity: state === "sending" ? 0.5 : 1, transition: "opacity 0.3s" }}>
                  <FieldLabel label="From">
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="contact-input"
                    />
                  </FieldLabel>

                  <FieldLabel label="Reply to">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@domain.com"
                      required
                      className="contact-input"
                    />
                  </FieldLabel>

                  <FieldLabel label="Regarding">
                    <div className="flex flex-wrap gap-2">
                      {["General", "Partnership", "Press", "Job posting", "Other"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, subject: s })}
                          className="px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase transition-all"
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            color: form.subject === s ? "#F5F0E4" : "var(--label)",
                            background: form.subject === s ? accent.hex : "transparent",
                            border: `1px solid ${form.subject === s ? accent.hex : "var(--hairline-strong)"}`,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </FieldLabel>

                  <FieldLabel label="Message">
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write something real."
                      rows={6}
                      required
                      className="contact-input resize-none"
                    />
                  </FieldLabel>

                  <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
                    <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                      <span style={{ color: accent.hex, fontFamily: "'Shippori Mincho',serif" }}>灯り</span> · we read everything
                    </span>
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="inline-flex items-center gap-3 px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition-all hover:gap-4"
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        color: "var(--selection-fg)",
                        background: accent.hex,
                        fontWeight: 600,
                      }}
                    >
                      {state === "sending" ? "Sending…" : "Send letter"} <span>→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ label, children }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-4 border-b pb-4" style={{ borderColor: "var(--hairline)" }}>
      <label className="col-span-12 text-[11px] tracking-[0.22em] uppercase md:col-span-2" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
        {label}
      </label>
      <div className="col-span-12 md:col-span-10">{children}</div>
    </div>
  );
}

/* ───────────────────────────── Footer ───────────────────────────── */

function Footer({ accent }) {
  return (
    <footer className="relative border-t px-8 py-16" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[42px]" style={{ fontFamily: "'Shippori Mincho','Noto Serif JP',serif", color: accent.hex }}>灯</span>
              <span className="text-[24px] font-light" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
                Akari <span style={{ color: "var(--sub)", fontStyle: "italic" }}>Labs</span>
              </span>
            </div>
            <p className="mt-4 max-w-[360px] text-[14px] leading-[1.65]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              An independent software studio. Sheridan, Wyoming. Lighting up small corners of the internet, one focused product at a time.
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h4 className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Work</h4>
            <ul className="mt-4 space-y-2.5 text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif" }}>
              <li><a href="https://pmhnphiring.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-mute)" }} className="hover:text-[var(--accent)]">PMHNP Hiring ↗</a></li>
              <li><a href="#" style={{ color: "var(--label)" }}>Gym Tracker</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h4 className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Studio</h4>
            <ul className="mt-4 space-y-2.5 text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif" }}>
              <li><a href="#studio" style={{ color: "var(--ink-mute)" }}>About</a></li>
              <li><a href="#team" style={{ color: "var(--ink-mute)" }}>Team</a></li>
              <li><a href="#contact" style={{ color: "var(--ink-mute)" }}>Contact</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <h4 className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Newsletter</h4>
            <p className="mt-4 text-[13px] leading-[1.6]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Quarterly. What we built. What we killed. What we learned.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex">
              <input
                type="email"
                placeholder="you@domain.com"
                className="flex-1 border bg-transparent px-3 py-2 text-[12px] outline-none"
                style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink-soft)", borderColor: "var(--hairline-strong)" }}
              />
              <button type="submit" className="border border-l-0 px-3 text-[12px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: accent.hex, borderColor: "var(--hairline-strong)" }}>→</button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-baseline justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: "var(--hairline)" }}>
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>
            © 2026 Akari Labs LLC · Sheridan, Wyoming
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>
            Made with <span style={{ fontFamily: "'Shippori Mincho',serif", color: accent.hex, letterSpacing: 0 }}>灯り</span> in WY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────── App ───────────────────────────── */

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const themeKey = THEMES[tweaks.theme] ? tweaks.theme : "default";
  const theme = THEMES[themeKey];
  // If a theme forces an accent, use it. Otherwise honor the user's accent pick.
  const effectiveAccent = theme.force ? theme.accent : tweaks.accent;
  const accent = ACCENTS[effectiveAccent] || ACCENTS.amber;
  const [active, setActive] = useState("");

  // Sync theme + accent CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", themeKey);
    root.style.setProperty("--accent", accent.hex);
    root.style.setProperty("--accent-soft", accent.soft);
    root.style.setProperty("--accent-line", accent.line);
    root.style.setProperty("--accent-bright", accent.bright);
  }, [themeKey, accent]);

  // Active section
  useEffect(() => {
    const onScroll = () => {
      const ids = ["index", "work", "studio", "team", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(ids[i]);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <NavBar active={active} accent={accent} />
      <Hero accent={accent} variant={tweaks.heroVariant} motion={tweaks.motion} />
      <IndexStrip accent={accent} />
      <Work accent={accent} />
      <Studio accent={accent} density={tweaks.density} />
      <Team accent={accent} />
      <Contact accent={accent} />
      <Footer accent={accent} />

      {/* Tweaks panel */}
      <window.TweaksPanel title="Tweaks" defaultOpen={false}>
        <window.TweakSection title="Theme">
          <window.TweakSelect
            label="Mood"
            value={themeKey}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "default", label: "Clay (default)" },
              { value: "paper", label: "Washi paper" },
              { value: "claude", label: "Claude" },
              { value: "midnight", label: "Midnight" },
              { value: "ghibli", label: "Ghibli meadow" },
              { value: "clay", label: "Clay (violet)" },
              { value: "glass", label: "Glassmorphism" },
              { value: "neu", label: "Neumorphism" },
            ]}
          />
        </window.TweakSection>
        {!theme.force && (
          <window.TweakSection title="Accent">
            <window.TweakRadio
              label="Color"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={[
                { value: "amber", label: "Amber" },
                { value: "sage", label: "Sage" },
                { value: "coral", label: "Coral" },
                { value: "paper", label: "Paper" },
              ]}
            />
          </window.TweakSection>
        )}
        <window.TweakSection title="Layout">
          <window.TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "airy", label: "Airy" },
              { value: "compact", label: "Compact" },
            ]}
          />
          <window.TweakRadio
            label="Hero"
            value={tweaks.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "lantern", label: "Lantern field" },
              { value: "type", label: "Pure type" },
            ]}
          />
        </window.TweakSection>
        <window.TweakSection title="Motion">
          <window.TweakToggle
            label="Animations"
            value={tweaks.motion}
            onChange={(v) => setTweak("motion", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
