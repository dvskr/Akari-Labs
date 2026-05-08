"use client";
import { useState, useEffect } from "react";

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-4 border-b pb-4" style={{ borderColor: "var(--hairline)" }}>
      <label className="col-span-12 text-[11px] tracking-[0.22em] uppercase md:col-span-2" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
        {label}
      </label>
      <div className="col-span-12 md:col-span-10">{children}</div>
    </div>
  );
}

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "General", message: "" });
  const [letterNum, setLetterNum] = useState("0000");

  useEffect(() => {
    setLetterNum(String(Math.floor(Math.random() * 8000) + 1000));
  }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setState("sent");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message.");
      setState("error");
    }
  };

  const resetForm = () => {
    setState("idle");
    setErrorMessage("");
    setForm({ name: "", email: "", subject: "General", message: "" });
  };

  return (
    <section id="contact" className="relative px-8 py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Contact
            </h2>
            <p className="mt-6 text-[clamp(44px,5vw,80px)] font-light leading-[1.0]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>
              Send a <span style={{ fontStyle: "italic" }}>letter</span><span style={{ color: "var(--accent)" }}>.</span>
            </p>
            <p className="mt-6 max-w-[400px] text-[16px] leading-[1.7]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Partnership, press, or just hello — write something real and we&apos;ll write back. We read everything.
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
                borderRadius: "var(--clay-radius)",
                boxShadow: "var(--clay-shadow)",
              }}
            >
              {/* Letter header */}
              <div className="mb-8 flex items-baseline justify-between border-b pb-4" style={{ borderColor: "var(--hairline)" }}>
                <span className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                  Letter № <span style={{ color: "var(--accent)" }} className="tabular-nums">{letterNum}</span>
                </span>
                <span className="text-[11px] tracking-[0.22em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
                  To: Akari Labs
                </span>
              </div>

              {state === "sent" ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center py-12 text-center">
                  <span className="text-[80px]" style={{ color: "var(--accent)" }}>✓</span>
                  <p className="mt-6 text-[28px] font-light" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>Sent.</p>
                  <p className="mt-2 text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>We&apos;ll write back within two business days.</p>
                  <button
                    onClick={resetForm}
                    className="mt-8 text-[12px] tracking-[0.18em] uppercase"
                    style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--accent)" }}
                  >
                    Write another →
                  </button>
                </div>
              ) : state === "error" ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center py-12 text-center">
                  <span className="text-[48px]">⚠️</span>
                  <p className="mt-6 text-[28px] font-light" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>Something went wrong.</p>
                  <p className="mt-2 max-w-[400px] text-[14px]" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
                    {errorMessage || "We couldn\u0027t send your message. Please try again."}
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-8 px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition-all"
                    style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--selection-fg)", background: "var(--accent)", fontWeight: 600 }}
                  >
                    Try Again →
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
                            color: form.subject === s ? "var(--selection-fg)" : "var(--label)",
                            background: form.subject === s ? "var(--accent)" : "transparent",
                            border: `1px solid ${form.subject === s ? "var(--accent)" : "var(--hairline-strong)"}`,
                            borderRadius: "var(--clay-radius-sm)",
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
                      We read everything
                    </span>
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="inline-flex items-center gap-3 px-6 py-3 text-[12px] tracking-[0.18em] uppercase transition-all hover:gap-4"
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        color: "var(--selection-fg)",
                        background: "var(--accent)",
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
