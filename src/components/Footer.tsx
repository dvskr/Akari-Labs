"use client";
import { useState } from "react";

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-3 text-[12px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}>
        ✓ You&apos;re on the list. First issue drops next quarter.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="mt-3 flex"
    >
      <input
        type="email"
        placeholder="you@domain.com"
        required
        className="flex-1 border bg-transparent px-3 py-2 text-[12px] outline-none"
        style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--ink-soft)", borderColor: "var(--hairline-strong)" }}
      />
      <button type="submit" className="border border-l-0 px-3 text-[12px] tracking-[0.14em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)", borderColor: "var(--hairline-strong)" }}>→</button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t px-8 py-16" style={{ borderColor: "var(--hairline)" }}>
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[24px] font-light" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>
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
              <li><a href="https://pmhnphiring.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-mute)" }}>PMHNP Hiring ↗</a></li>
              <li><a href="#work" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-mute)" }}>Gym Tracker</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h4 className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Studio</h4>
            <ul className="mt-4 space-y-2.5 text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif" }}>
              <li><a href="#studio" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-mute)" }}>About</a></li>
              <li><a href="#team" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-mute)" }}>Team</a></li>
              <li><a href="#contact" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--ink-mute)" }}>Contact</a></li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <h4 className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>Newsletter</h4>
            <p className="mt-4 text-[13px] leading-[1.6]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Quarterly. What we built. What we shipped. What we learned.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-baseline justify-between gap-4 border-t pt-6 md:flex-row" style={{ borderColor: "var(--hairline)" }}>
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>
            © 2026 Akari Labs LLC · Sheridan, Wyoming
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--faint)" }}>
            Made with <span style={{ color: "var(--accent)" }}>♥</span> in WY
          </p>
        </div>
      </div>
    </footer>
  );
}
