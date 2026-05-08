"use client";
import PMHNPCase from "./PMHNPCase";
import GymTrackerCase from "./GymTrackerCase";

export default function Work() {
  return (
    <section id="work" className="relative px-8 py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-7">
            <h2 className="text-[12px] tracking-[0.24em] uppercase" style={{ fontFamily: "'JetBrains Mono',monospace", color: "var(--sub)" }}>
              Work
            </h2>
            <p className="mt-4 text-[clamp(40px,5vw,72px)] font-light leading-[1.05]" style={{ fontFamily: "'Playfair Display',serif", color: "var(--ink)" }}>
              Two products. <span style={{ fontStyle: "italic", color: "var(--label)" }}>Both narrow on purpose.</span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-[15px] leading-[1.7] md:text-right" style={{ fontFamily: "'Inter Tight',sans-serif", color: "var(--label)" }}>
              Each one solves a real, specific problem we kept hearing about — then we commit fully. Deep execution, clear roadmaps, real results.
            </p>
          </div>
        </div>

        <PMHNPCase />
        <GymTrackerCase />
      </div>
    </section>
  );
}
