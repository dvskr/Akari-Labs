"use client";

function PMHNPMock() {
  return (
    <div className="absolute inset-0 p-6">
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
                <span className="h-3 w-3 border" style={{ borderColor: i < 2 ? "var(--accent)" : "var(--faint)", background: i < 2 ? "var(--accent)" : "transparent" }} />
                {f}
              </span>
              <span style={{ color: "var(--faint)", fontFamily: "'JetBrains Mono',monospace" }}>{[1480, 320, 980, 540, 220][i]}</span>
            </div>
          ))}
          <div className="mt-4 text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Salary</div>
          <div className="h-1 w-full" style={{ background: "var(--hairline)" }}>
            <div className="h-1 w-2/3" style={{ background: "var(--accent)" }} />
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
            <div key={i} className="flex items-center justify-between border px-3 py-2" style={{ borderColor: "var(--hairline)", background: i === 0 ? "var(--accent-soft)" : "transparent" }}>
              <div className="min-w-0">
                <div className="truncate text-[12px]" style={{ color: "var(--ink-soft)", fontFamily: "'Inter Tight',sans-serif", fontWeight: 500 }}>{t}</div>
                <div className="truncate text-[10px]" style={{ color: "var(--sub)", fontFamily: "'Inter Tight',sans-serif" }}>{o}</div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {b && <span className="px-1.5 py-0.5 text-[9px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", border: "1px solid var(--accent-line)" }}>{b}</span>}
                <span className="text-[11px] tabular-nums" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink-mute)" }}>{s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PMHNPCase() {
  return (
    <article className="grid grid-cols-12 gap-x-8 gap-y-10 border-t pt-16" style={{ borderColor: "var(--hairline)" }}>
      {/* Sidecar */}
      <aside className="col-span-12 md:col-span-3">
        <div className="sticky top-24">
          <div className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>Case 01</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#3F8A5E" }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3F8A5E]" /> Live · pmhnphiring.com
          </div>
          <h3 className="mt-6 text-[40px] font-light leading-[1.0]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>PMHNP<br/>Hiring</h3>
          <dl className="mt-6 space-y-3 text-[12px]" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {[["Sector", "Healthcare"], ["Audience", "Psychiatric NPs"], ["Launched", "Jan 2026"]].map(([k, v]) => (
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
        <p className="max-w-[640px] text-[22px] font-light leading-[1.45]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink-soft)" }}>
          The only job board built for Psychiatric Mental Health Nurse Practitioners. Five thousand verified roles, refreshed daily, with the salary up front.
        </p>

        {/* Mock screenshot */}
        <div
          className="relative mt-10 overflow-hidden border"
          style={{
            borderColor: "var(--hairline)",
            background: "linear-gradient(180deg, var(--tile) 0%, var(--bg-3) 100%)",
            aspectRatio: "16/10",
            borderRadius: "var(--clay-radius)",
            boxShadow: "var(--clay-shadow)",
          }}
        >
          <PMHNPMock />
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
          {[["5,000", "+", "Verified roles"], ["50", " ", "U.S. states"]].map(([n, s, l]) => (
            <div key={l as string}>
              <div className="flex items-baseline">
                <span className="text-[64px] font-light leading-[1] tabular-nums" style={{ fontFamily: "'Playfair Display',serif", color: "var(--accent)" }}>{n}</span>
                <span className="text-[28px]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--accent)" }}>{(s as string).trim()}</span>
              </div>
              <div className="mt-2 text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["Remote", "Telehealth", "New grad", "Travel", "Per diem"].map((t) => (
            <span key={t} className="border px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)", borderRadius: "var(--clay-radius-sm)", boxShadow: "var(--clay-shadow-sm)" }}>{t}</span>
          ))}
        </div>

        <a href="https://pmhnphiring.com" target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-flex items-baseline gap-3 border-b pb-1 text-[14px] tracking-[0.14em] uppercase transition-all hover:gap-4"
          style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", borderColor: "var(--accent)" }}>
          Visit pmhnphiring.com <span>↗</span>
        </a>
      </div>
    </article>
  );
}
