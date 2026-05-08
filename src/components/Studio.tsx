export default function Studio() {
  const principles = [
    ["01", "Focused", "One niche, done right. We choose depth over breadth and live with the consequences."],
    ["02", "Fast", "Ship, learn, iterate. Ideas compound with speed; so does great software built with conviction."],
    ["03", "Transparent", "Honest data, always. Real metrics, real roadmaps, real accountability."],
    ["04", "Crafted", "Every pixel earns its place. If it's worth building, it's worth polishing twice."],
  ];

  return (
    <section id="studio" className="relative overflow-hidden px-8 py-32">


      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Studio
            </h2>
            <p className="mt-6 text-[44px] font-light leading-[1.05]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
              <span style={{ fontStyle: "italic" }}>Akari</span><span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p className="mt-2 text-[14px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              n. — light, lamplight (Japanese)
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="text-[24px] font-light leading-[1.5]" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)" }}>
              An independent software studio in Sheridan, Wyoming. We started Akari in late 2025 because the best software comes from deep focus on a single problem — and we are fully committed to that focus.
            </p>
            <p className="mt-6 text-[16px] leading-[1.7]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", color: "var(--label)" }}>
              We find places where specialized software makes the biggest difference, then we build, ship, and perfect it. Purposeful features, long-term commitment. The kind of product that gets measurably better every quarter.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-20 grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--hairline)", borderRadius: "var(--clay-radius)", overflow: "hidden", boxShadow: "var(--clay-shadow)" }}>
          {principles.map(([n, t, d]) => (
            <div key={n} className="p-8" style={{ background: "var(--tile)" }}>
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] tabular-nums tracking-[0.22em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{n}</span>
                <span className="text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}>—</span>
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
