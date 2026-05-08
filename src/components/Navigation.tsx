"use client";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Index", href: "#index", num: "01" },
  { label: "Work", href: "#work", num: "02" },
  { label: "Studio", href: "#studio", num: "03" },
  { label: "Team", href: "#team", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["index", "work", "studio", "team", "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(ids[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

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
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-baseline gap-2.5 group"
        >
          <span
            className="text-[26px] leading-none transition-colors"
            style={{ fontFamily: "'Fraunces',serif", color: "var(--accent)", fontWeight: 600, fontStyle: "italic" }}
          >
            A
          </span>
          <span
            className="flex items-baseline gap-1.5 text-[13px] tracking-[0.18em] uppercase"
            style={{ color: "var(--ink-soft)", fontFamily: "'Inter Tight','DM Sans',sans-serif", fontWeight: 600 }}
          >
            Akari <span style={{ color: "var(--sub)" }}>Labs</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-baseline gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="group relative text-[12px] tracking-[0.16em] uppercase transition-colors"
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                color: activeSection === link.href.slice(1) ? "var(--accent)" : "var(--label)",
                fontWeight: 500,
              }}
            >
              <span className="mr-2 tabular-nums" style={{ color: "var(--faint)" }}>{link.num}</span>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
          className="hidden items-baseline gap-2 px-4 py-2 text-[12px] tracking-[0.14em] uppercase transition-all md:inline-flex"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            color: "var(--accent)",
            border: "1px solid var(--accent-line)",
            background: "var(--accent-soft)",
            fontWeight: 500,
            borderRadius: "var(--clay-radius-sm)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          Open for work
        </a>
      </div>
    </nav>
  );
}
