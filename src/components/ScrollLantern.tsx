"use client";
import { useEffect, useState, useRef } from "react";

const sections = ["Hero", "Products", "About", "Team", "Contact", "Footer"];

export default function ScrollLantern() {
    const [progress, setProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState("Hero");
    const [hovered, setHovered] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) return;

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const p = Math.min(1, Math.max(0, scrollTop / docHeight));
                    setProgress(p);

                    // Determine current section
                    const sectionIds = ["hero", "products", "about", "team", "contact", "footer"];
                    for (let i = sectionIds.length - 1; i >= 0; i--) {
                        const el = document.getElementById(sectionIds[i]) ||
                            document.querySelector(`section:nth-of-type(${i + 1})`);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top <= window.innerHeight / 2) {
                                setCurrentSection(sections[i]);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleTrackClick = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clickY = (e.clientY - rect.top) / rect.height;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: clickY * docHeight, behavior: "smooth" });
    };

    // Don't render on mobile
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const lanternY = progress * 100;
    const brightness = 0.3 + progress * 0.7;

    return (
        <div
            ref={trackRef}
            className="fixed right-5 top-0 z-[100] hidden h-full w-6 md:flex"
            style={{ cursor: "pointer" }}
            onClick={handleTrackClick}
        >
            {/* Track line */}
            <div className="absolute left-1/2 top-[60px] h-[calc(100%-120px)] w-[2px] -translate-x-1/2">
                {/* Background line */}
                <div className="h-full w-full rounded-full bg-amber/10" />
                {/* Scrolled portion glow */}
                <div
                    className="absolute left-0 top-0 w-full rounded-full bg-amber/30"
                    style={{
                        height: `${progress * 100}%`,
                        transition: "height 0.1s linear",
                    }}
                />
            </div>

            {/* Lantern icon */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-150"
                style={{
                    top: `calc(60px + ${lanternY} * (100% - 120px) / 100)`,
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        filter: `drop-shadow(0 0 ${4 + brightness * 6}px rgba(245,166,35,${brightness * 0.6}))`,
                        transition: "filter 0.3s ease",
                    }}
                >
                    {/* Lantern glyph */}
                    <span
                        className="text-[20px] select-none"
                        style={{
                            fontFamily: '"Noto Serif JP", serif',
                            color: `rgba(245,166,35,${brightness})`,
                            transform: hovered ? "scale(1.3)" : "scale(1)",
                            transition: "transform 0.2s ease, color 0.3s ease",
                        }}
                    >
                        灯
                    </span>

                    {/* Tooltip */}
                    {hovered && (
                        <div
                            className="absolute right-8 whitespace-nowrap rounded-md bg-surface-dark px-3 py-1.5 text-[11px] font-medium text-text-cream shadow-lg"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                            {currentSection}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
