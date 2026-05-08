"use client";

function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]">
      <div
        className="overflow-hidden rounded-[34px] border-[6px] p-3"
        style={{
          borderColor: "var(--ink-strong)",
          background: "linear-gradient(180deg,var(--tile) 0%,var(--bg-3) 100%)",
          aspectRatio: "9/19",
          boxShadow: "var(--clay-shadow)",
        }}
      >
        <div className="flex items-center justify-between px-3 py-1 text-[10px]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)" }}>
          <span>9:41</span>
          <span>●●●●</span>
        </div>
        <div className="mt-3">
          <div className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Push · day 24</div>
          <div className="mt-1 text-[26px] font-light leading-tight" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>Bench Press</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}>+ 2.5 lb · PR</span>
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
            <div key={i} className="flex items-center justify-between border px-3 py-2" style={{ borderColor: done ? "var(--accent-line)" : "var(--hairline)", background: done ? "var(--accent-soft)" : "transparent" }}>
              <span className="text-[10px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{n as string}</span>
              <span className="text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: done ? "var(--ink)" : (i === 4 ? "var(--faint)" : "var(--label)"), fontWeight: done ? 500 : 400 }}>{set as string}</span>
              <span className="text-[9px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: tag === "PR" ? "var(--accent)" : "var(--sub)" }}>{tag as string}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
          <div className="flex items-baseline justify-between text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
            <span>Volume</span><span style={{ color: "var(--accent)" }}>+12% vs last</span>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {[40, 55, 48, 62, 70, 58, 75, 82].map((h, i) => (
              <div key={i} className="flex-1" style={{ height: `${h}%`, background: i === 7 ? "var(--accent)" : "var(--hairline-strong)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GymTrackerCase() {
  return (
    <article className="mt-28 grid grid-cols-12 gap-x-8 gap-y-10 border-t pt-16" style={{ borderColor: "var(--hairline)" }}>
      <aside className="col-span-12 md:col-span-3 md:order-2">
        <div className="sticky top-24">
          <div className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>Case 02</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} /> Beta soon
          </div>
          <h3 className="mt-6 text-[40px] font-light leading-[1.0]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>Gym<br/>Tracker</h3>
          <dl className="mt-6 space-y-3 text-[12px]" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {[["Sector", "Fitness"], ["Platform", "iOS · Android"], ["Launching", "Q2 2026"], ["Pricing", "Free · $5.99/mo"]].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b pb-2" style={{ borderColor: "var(--hairline)" }}>
                <dt style={{ color: "var(--sub)" }} className="tracking-[0.14em] uppercase">{k}</dt>
                <dd style={{ color: "var(--ink-mute)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>

      <div className="col-span-12 md:col-span-9 md:order-1">
        <p className="max-w-[640px] text-[22px] font-light leading-[1.45]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink-soft)" }}>
          Workout tracking that learns you. One-tap logging, PR detection, and progressive-overload guidance — streamlined for serious lifters.
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <PhoneMock />
          </div>
          <div className="col-span-12 space-y-6 md:col-span-7">
            {[
              ["One-tap logging", "Last set's weight pre-fills. Tap, lift, tap again."],
              ["PR detection", "We notice when you hit a record before you do."],
              ["Progressive overload", "Suggested next-session weights, grounded in your last 8 sessions."],
              ["AI coach", "Plateau check-ins. Form notes. Honest feedback that keeps you accountable."],
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
            <span key={t} className="border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)", borderRadius: "var(--clay-radius-sm)", boxShadow: "var(--clay-shadow-sm)" }}>{t}</span>
          ))}
        </div>

        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="mt-10 inline-flex items-baseline gap-3 border-b pb-1 text-[14px] tracking-[0.14em] uppercase transition-all hover:gap-4"
          style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", borderColor: "var(--accent)" }}>
          Join the waitlist <span>→</span>
        </a>
      </div>
    </article>
  );
}
