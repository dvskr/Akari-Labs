"use client";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { STORAGE_URL } from "@/lib/storage";
import CountUp from "./CountUp";

/* ──────────────── PMHNP Hiring ──────────────── */

function PMHNPHiring() {
    return (
        <div className="flex flex-col items-center">
            {/* Screenshot */}
            <ScrollReveal className="relative w-full max-w-[1000px]">
                <Image
                    src={`${STORAGE_URL}/pmhnp-screenshot.jpg`}
                    alt="PMHNP Hiring - The job board built for Psychiatric Mental Health Nurse Practitioners"
                    width={1000}
                    height={600}
                    className="w-full rounded-[12px]"
                />
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal delay={0.15} className="mt-10 flex max-w-[700px] flex-col items-center text-center">
                {/* Badge */}
                <div className="flex items-center gap-2 rounded-[8px] border border-sage/30 bg-sage/12 px-3 py-1">
                    <span className="h-[7px] w-[7px] rounded-full bg-sage animate-pulse-dot" />
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-sage"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Live
                    </span>
                </div>

                <h3
                    className="mt-2 text-[32px] font-bold text-text-cream"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                    PMHNP Hiring
                </h3>

                <p
                    className="mt-3 text-[17px] leading-[1.6] text-text-muted-blue"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    The only job board built specifically for Psychiatric Mental Health Nurse
                    Practitioners. 10,000+ verified jobs, updated daily.
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap justify-center gap-8">
                    {[
                        { value: 10000, suffix: "+", label: "Verified Jobs" },
                        { value: 500, suffix: "+", label: "Sources" },
                        { value: 73, suffix: "%", label: "Show Salary" },
                        { value: 50, suffix: "", label: "States" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <CountUp
                                target={stat.value}
                                suffix={stat.suffix}
                                className="text-[24px] font-bold text-sage"
                                delay={i * 0.2}
                            />
                            <span
                                className="mt-1 text-[11px] uppercase tracking-[0.06em] text-text-dim"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {["Remote", "Telehealth", "New Grad", "Travel", "Per Diem"].map(
                        (tag) => (
                            <span
                                key={tag}
                                className="rounded-[8px] border border-sage/25 bg-sage/10 px-3 py-1 text-[12px] font-medium text-sage"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {tag}
                            </span>
                        )
                    )}
                </div>

                {/* CTA */}
                <a
                    href="https://pmhnphiring.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 rounded-[12px] bg-amber px-6 py-3 text-[15px] font-semibold text-text-dark shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-bright hover:shadow-[0_6px_30px_rgba(245,166,35,0.35)]"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    Explore Jobs →
                </a>
            </ScrollReveal>
        </div>
    );
}

/* ──────────────── Gym Tracker ──────────────── */

function GymTracker() {
    return (
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">
            {/* Screenshot (phone) — left side */}
            <ScrollReveal className="relative w-full max-w-[280px] shrink-0">
                <Image
                    src={`${STORAGE_URL}/gym-tracker-screenshot.jpg`}
                    alt="Gym Tracker - Intelligent workout tracking with AI coaching"
                    width={280}
                    height={560}
                    className="w-full rounded-[24px]"
                />
            </ScrollReveal>

            {/* Content — right side */}
            <ScrollReveal delay={0.15} className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                {/* Badge */}
                <div className="rounded-[8px] border border-amber/30 bg-amber/12 px-3 py-1">
                    <span
                        className="text-[11px] font-semibold uppercase tracking-[0.08em] text-amber"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Coming Soon
                    </span>
                </div>

                <h3
                    className="mt-2 text-[32px] font-bold text-text-cream"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                >
                    Gym Tracker
                </h3>

                <p
                    className="mt-3 text-[17px] leading-[1.6] text-text-muted-blue"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    Intelligent workout tracking with AI coaching. One-tap logging, PR
                    detection, and progressive overload recommendations.
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap justify-center gap-8 md:justify-start">
                    {[
                        { value: 400, suffix: "+", label: "Exercises" },
                        { value: 4, suffix: "", label: "Set Types" },
                        { display: "AI", label: "Coach" },
                        { display: "PR", label: "Detection" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            {"value" in stat ? (
                                <CountUp
                                    target={stat.value!}
                                    suffix={stat.suffix}
                                    className="text-[24px] font-bold text-coral"
                                    delay={i * 0.2}
                                />
                            ) : (
                                <span
                                    className="text-[24px] font-bold text-coral"
                                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                                >
                                    {stat.display}
                                </span>
                            )}
                            <span
                                className="mt-1 text-[11px] uppercase tracking-[0.06em] text-text-dim"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                    {["iOS", "Android", "Free Tier", "Premium $9.99/mo"].map((tag) => (
                        <span
                            key={tag}
                            className="rounded-[8px] border border-coral/25 bg-coral/10 px-3 py-1 text-[12px] font-medium text-coral"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-7 rounded-[12px] border-[1.5px] border-amber/50 px-6 py-3 text-[15px] font-semibold text-amber transition-all duration-200 hover:border-amber hover:bg-amber/10"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    Join Waitlist →
                </a>
            </ScrollReveal>
        </div>
    );
}

/* ──────────────── Products Section ──────────────── */

export default function Products() {
    return (
        <section id="products" className="px-6 py-[120px]">
            <div className="mx-auto max-w-[1100px]">
                {/* Header */}
                <ScrollReveal className="mb-[60px] text-center">
                    <h2
                        className="text-[42px] font-bold text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        What We&apos;re Building
                    </h2>
                    <p
                        className="mt-3 text-[18px] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Focused products for real-world needs.
                    </p>
                </ScrollReveal>

                {/* PMHNP Hiring */}
                <PMHNPHiring />

                {/* Divider */}
                <div className="gradient-divider mx-auto my-[50px] w-[60%]" />

                {/* Gym Tracker */}
                <GymTracker />
            </div>
        </section>
    );
}
