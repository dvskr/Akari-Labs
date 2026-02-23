"use client";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { STORAGE_URL } from "@/lib/storage";

const team = [
    {
        video: `${STORAGE_URL}/team/sathish.mp4`,
        name: "Sathish",
        role: "Creator",
        bio: "Designs, codes, and ships all products. Data Engineer by day, product builder by night.",
        stack: "Next.js · TypeScript · Supabase · Cursor · Claude AI",
        socials: [
            { icon: Github, href: "https://github.com/dvskr" },
            { icon: Linkedin, href: "https://linkedin.com/in/dvskr" },
            { icon: Twitter, href: "https://twitter.com/Sathish_Daggula" },
        ],
    },
    {
        video: `${STORAGE_URL}/team/pavan.mp4`,
        name: "Pavan",
        role: "Business Operations",
        bio: "Manages banking, payments, partnerships, and growth. Runs all company and product social accounts. Keeps the lights on.",
        stack: "",
        socials: [
            { icon: Twitter, href: "https://x.com/AkariLabs" },
            { icon: Linkedin, href: "https://linkedin.com/company/akari-labs" },
        ],
    },
];

function LivingPortrait({ video }: { video: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);

    // Only load/play video when scrolled into view
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenVisible) {
                    setHasBeenVisible(true);
                    if (videoRef.current) {
                        videoRef.current.load();
                        videoRef.current.play().catch(() => { });
                    }
                }
            },
            { rootMargin: "200px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [hasBeenVisible]);

    const handleHover = () => {
        if (videoRef.current) videoRef.current.playbackRate = 1;
    };

    const handleLeave = () => {
        if (videoRef.current) videoRef.current.playbackRate = 0.5;
    };

    const handleLoaded = () => {
        if (videoRef.current) videoRef.current.playbackRate = 0.5;
    };

    return (
        <div
            ref={containerRef}
            className="group relative shrink-0"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            {/* Amber glow behind */}
            <div
                className="absolute inset-0 -z-10 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(245,166,35,0.15) 0%, transparent 70%)",
                    filter: "blur(30px)",
                    transform: "scale(1.3)",
                }}
            />
            <div className="h-[280px] w-[280px] overflow-hidden rounded-[24px] border border-border-dark shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-amber/30 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(245,166,35,0.08)]">
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    preload="none"
                    onLoadedData={handleLoaded}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export default function Team() {
    return (
        <section id="team" className="px-6 py-[120px] md:py-[120px]">
            <div className="mx-auto max-w-[900px]">
                <ScrollReveal className="mb-[60px] text-center">
                    <h2
                        className="text-[42px] font-bold text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        The Team
                    </h2>
                    <p
                        className="mt-3 text-[18px] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Small team. Big focus.
                    </p>
                </ScrollReveal>

                <div className="flex flex-col gap-16">
                    {team.map((member, i) => (
                        <ScrollReveal key={member.name} delay={i * 0.15}>
                            <div
                                className={`flex flex-col items-center gap-8 md:flex-row md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Living Portrait */}
                                <LivingPortrait video={member.video} />

                                {/* Info */}
                                <div className={`flex flex-col ${i % 2 === 1 ? "md:items-end md:text-right" : "md:items-start md:text-left"} items-center text-center`}>
                                    <span
                                        className="text-[12px] font-semibold uppercase tracking-[0.1em] text-amber"
                                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                                    >
                                        {member.role}
                                    </span>

                                    <h3
                                        className="mt-2 text-[32px] font-bold text-text-cream"
                                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                                    >
                                        {member.name}
                                    </h3>

                                    <p
                                        className="mt-3 max-w-[380px] text-[15px] leading-[1.7] text-text-muted-blue"
                                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                                    >
                                        {member.bio}
                                    </p>

                                    {member.stack && (
                                        <p
                                            className="mt-4 text-[11px] tracking-wide text-text-dim"
                                            style={{ fontFamily: '"JetBrains Mono", monospace' }}
                                        >
                                            {member.stack}
                                        </p>
                                    )}

                                    <div className={`mt-5 flex gap-3 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                                        {member.socials.map((social, j) => (
                                            <a
                                                key={j}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-dark bg-surface-dark text-text-dim transition-all duration-200 hover:border-amber/40 hover:text-amber hover:shadow-[0_0_12px_rgba(245,166,35,0.15)]"
                                            >
                                                <social.icon size={16} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
