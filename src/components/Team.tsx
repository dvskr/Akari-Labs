export default function Team() {
  const members = [
    {
      name: "Sathish",
      role: "Creator",
      bio: "Designs, codes, and ships every product. Data engineer by day, builder by night. Believes good software is a long letter, not a press release.",
      stack: "Next · TypeScript · Supabase · Cursor · Claude",
      links: [] as string[][],
      kanji: "創",
    },
    {
      name: "Pavan",
      role: "Operations",
      bio: "Banking, payments, partnerships, growth. Runs every social account. Keeps the lanterns lit while the studio builds.",
      stack: "Operations · Brand · Partnerships",
      links: [] as string[][],
      kanji: "運",
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
                  <span className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}>{m.role}</span>
                </div>
              </div>

              {/* Portrait placeholder */}
              <div className="col-span-4">
                <div
                  className="relative aspect-square w-full overflow-hidden border"
                  style={{
                    borderColor: "var(--hairline)",
                    background: `radial-gradient(circle at 50% 60%, var(--accent-soft), transparent 70%), linear-gradient(180deg,var(--bg-3) 0%,var(--bg-3) 100%)`,
                    borderRadius: "var(--clay-radius)",
                    boxShadow: "var(--clay-shadow)",
                  }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[140px] font-light"
                    style={{ fontFamily: "'Fraunces',serif", color: "var(--ink-soft)", opacity: 0.95 }}
                  >
                    {m.name[0]}
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
                        className="border px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-[var(--accent)] hover:border-[var(--accent-line)]"
                        style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--label)", borderColor: "var(--hairline-strong)", borderRadius: "var(--clay-radius-sm)", boxShadow: "var(--clay-shadow-sm)" }}>
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
