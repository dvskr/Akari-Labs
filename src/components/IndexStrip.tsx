export default function IndexStrip() {
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
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>02 entries</span>
        </div>
        <div className="border-t" style={{ borderColor: "var(--hairline)" }}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-12 items-baseline gap-4 border-b px-2 py-6 transition-all hover:bg-white/[0.025] group"
              style={{ borderColor: "var(--hairline)" }}
            >
              <span className="col-span-1 text-[11px] tabular-nums tracking-[0.16em]" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{row[0]}</span>
              <span className="col-span-4 text-[28px] font-light" style={{ fontFamily: "'Fraunces',serif", color: "var(--ink)" }}>
                {row[1]}
              </span>
              <span className="col-span-4 text-[14px]" style={{ fontFamily: "'Inter Tight','DM Sans',sans-serif", color: "var(--label)" }}>{row[2]}</span>
              <span className="col-span-2 text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: row[3] === "Live" ? "var(--accent)" : "var(--sub)" }}>{row[3]}</span>
              <span className="col-span-1 text-right text-[11px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>{row[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
