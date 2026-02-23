"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG path data for 灯 kanji strokes (hand-traced, simplified)
const strokes = [
    // Left radical 火 (fire) — 4 strokes
    "M 28 38 Q 30 50 32 62 Q 33 70 30 78",                          // left dot
    "M 42 38 Q 40 50 38 62 Q 37 70 40 78",                          // right dot
    "M 25 58 Q 28 55 35 52 Q 42 55 45 58",                          // middle spread
    "M 35 32 L 35 80",                                                // center vertical

    // Right radical 丁 — 2 strokes
    "M 55 35 L 90 35",                                                // top horizontal
    "M 72 35 L 72 82",                                                // vertical drop
];

const strokeLengths = [60, 60, 40, 50, 40, 50];

export default function LoadingScreen() {
    const [show, setShow] = useState(false);
    const [glowing, setGlowing] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const visited = sessionStorage.getItem("akari-loaded");
        if (visited) {
            setShow(false);
            return;
        }
        setShow(true);

        // Start glow after strokes finish
        const glowTimer = setTimeout(() => setGlowing(true), strokes.length * 400 + 200);
        // Dismiss after glow
        const dismissTimer = setTimeout(() => {
            setShow(false);
            sessionStorage.setItem("akari-loaded", "1");
        }, strokes.length * 400 + 1200);

        return () => {
            clearTimeout(glowTimer);
            clearTimeout(dismissTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ background: "#1A1F2E" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative">
                        {/* Glow behind */}
                        <motion.div
                            className="absolute inset-0 -z-10"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(245,166,35,0.3) 0%, transparent 70%)",
                                filter: "blur(30px)",
                                transform: "scale(3)",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: glowing ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        />

                        <svg
                            viewBox="0 0 120 110"
                            width="180"
                            height="165"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {strokes.map((d, i) => (
                                <motion.path
                                    key={i}
                                    d={d}
                                    stroke="#F5A623"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    initial={{
                                        strokeDasharray: strokeLengths[i],
                                        strokeDashoffset: strokeLengths[i],
                                    }}
                                    animate={{
                                        strokeDashoffset: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.4,
                                        ease: "easeInOut",
                                    }}
                                    style={{
                                        filter: glowing
                                            ? "drop-shadow(0 0 8px rgba(245,166,35,0.8))"
                                            : "none",
                                        transition: "filter 0.3s ease",
                                    }}
                                />
                            ))}
                        </svg>

                        {/* Text below */}
                        <motion.p
                            className="mt-6 text-center text-[13px] tracking-[0.2em] text-text-dim"
                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: glowing ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            AKARI LABS
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
