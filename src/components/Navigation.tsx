"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";

const navLinks = [
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
];

// Easter egg colors
const easterEggColors = ["#F5A623", "#7BC67E", "#FF6B6B", "#F5A623"];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [audioPlaying, setAudioPlaying] = useState(false);

    // Listen for audio state changes from the video component
    useEffect(() => {
        const onAudioState = (e: Event) => {
            setAudioPlaying((e as CustomEvent).detail.playing);
        };
        window.addEventListener("audio-state", onAudioState);
        return () => window.removeEventListener("audio-state", onAudioState);
    }, []);

    const toggleAudio = useCallback(() => {
        window.dispatchEvent(new CustomEvent("toggle-audio"));
    }, []);

    // Easter egg state
    const clickTimestamps = useRef<number[]>([]);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [colorIndex, setColorIndex] = useState(0);
    const [lanterns, setLanterns] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.8);

            const sections = ["products", "about", "team", "contact"];
            for (const id of sections.reverse()) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top < 200) {
                    setActiveSection(id);
                    return;
                }
            }
            setActiveSection("");
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    // Easter egg: triple click on 灯
    const handleLogoClick = useCallback(
        (e: React.MouseEvent) => {
            const now = Date.now();
            clickTimestamps.current.push(now);
            // Keep only last 3 clicks
            if (clickTimestamps.current.length > 3) {
                clickTimestamps.current = clickTimestamps.current.slice(-3);
            }

            if (clickTimestamps.current.length >= 3) {
                const timeDiff =
                    clickTimestamps.current[2] - clickTimestamps.current[0];
                if (timeDiff < 1000 && !easterEggActive) {
                    // Trigger!
                    setEasterEggActive(true);
                    clickTimestamps.current = [];

                    // Spawn lanterns
                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const newLanterns = Array.from({ length: 35 }, (_, i) => ({
                        id: Date.now() + i,
                        x: cx,
                        y: cy,
                        angle: (i / 35) * 360 + Math.random() * 30,
                    }));
                    setLanterns(newLanterns);

                    // Color cycling
                    let ci = 0;
                    const colorInterval = setInterval(() => {
                        ci = (ci + 1) % easterEggColors.length;
                        setColorIndex(ci);
                    }, 250);

                    // Clean up after 3s
                    setTimeout(() => {
                        setEasterEggActive(false);
                        setLanterns([]);
                        setColorIndex(0);
                        clearInterval(colorInterval);
                    }, 3000);
                }
            }
        },
        [easterEggActive]
    );

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    backgroundColor: scrolled
                        ? "rgba(26, 31, 46, 0.8)"
                        : "transparent",
                    backdropFilter: scrolled ? "blur(12px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
                    borderBottom: scrolled
                        ? "1px solid rgba(46, 52, 70, 0.5)"
                        : "1px solid transparent",
                }}
            >
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="text-[28px] animate-pulse-glow select-none"
                            style={{
                                fontFamily: '"Noto Serif JP", serif',
                                color: easterEggActive
                                    ? easterEggColors[colorIndex]
                                    : "#F5A623",
                                transition: "color 0.15s ease",
                            }}
                            onClick={handleLogoClick}
                        >
                            灯
                        </span>
                        <span
                            className="text-[20px] font-bold text-text-cream"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                            Akari Labs
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollTo(link.href)}
                                className="group relative text-[15px] font-medium transition-colors duration-200"
                                style={{
                                    fontFamily: '"DM Sans", sans-serif',
                                    color:
                                        activeSection === link.href.slice(1)
                                            ? "#F5A623"
                                            : "#9BA4B8",
                                }}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-amber transition-all duration-200 group-hover:w-full" />
                            </button>
                        ))}
                        <button
                            onClick={toggleAudio}
                            aria-label={audioPlaying ? "Mute audio" : "Enable audio"}
                            title={audioPlaying ? "Mute audio" : "Enable audio"}
                            className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:bg-amber/10"
                            style={{
                                color: audioPlaying ? "#F5A623" : "#6B7280",
                            }}
                        >
                            {audioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>
                        <button
                            onClick={() => scrollTo("#contact")}
                            className="rounded-[12px] bg-amber px-5 py-2 text-[14px] font-semibold text-text-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(245,166,35,0.3)]"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                        >
                            Get in Touch
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="text-text-cream md:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Easter egg: amber flash */}
            <AnimatePresence>
                {easterEggActive && (
                    <motion.div
                        className="pointer-events-none fixed inset-0 z-[200]"
                        style={{ background: "rgba(245,166,35,0.1)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                )}
            </AnimatePresence>

            {/* Easter egg: floating lanterns */}
            <AnimatePresence>
                {lanterns.map((l) => {
                    const rad = (l.angle * Math.PI) / 180;
                    const dist = 200 + Math.random() * 200;
                    return (
                        <motion.span
                            key={l.id}
                            className="pointer-events-none fixed z-[201] text-[18px]"
                            style={{
                                fontFamily: '"Noto Serif JP", serif',
                                color: "#F5A623",
                                left: l.x,
                                top: l.y,
                            }}
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{
                                x: Math.cos(rad) * dist,
                                y: Math.sin(rad) * dist - 100,
                                opacity: 0,
                                scale: 0.3,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        >
                            灯
                        </motion.span>
                    );
                })}
            </AnimatePresence>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg-dark/95 backdrop-blur-xl"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <button
                            className="absolute right-6 top-6 text-text-cream"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={28} />
                        </button>
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    className="text-[24px] font-medium text-text-cream transition-colors hover:text-amber"
                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollTo("#contact")}
                                className="mt-4 rounded-[12px] bg-amber px-8 py-3 text-[16px] font-semibold text-text-dark"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                Get in Touch
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
