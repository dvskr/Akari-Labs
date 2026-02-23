"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    // Parallax motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Text parallax (same direction as mouse, half intensity — gives depth)
    const textX = useMotionValue(0);
    const textY = useMotionValue(0);
    const textSpringX = useSpring(textX, { stiffness: 80, damping: 25 });
    const textSpringY = useSpring(textY, { stiffness: 80, damping: 25 });

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Normalize to -1..1
            const nx = (e.clientX - cx) / (rect.width / 2);
            const ny = (e.clientY - cy) / (rect.height / 2);

            // Text moves same direction (max 10px)
            textX.set(nx * 10);
            textY.set(ny * 10);
        },
        [mouseX, mouseY, textX, textY]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || reducedMotion) return;

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
        >
            {/* Dark gradient overlay for text readability (left-aligned content) */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
                }}
            />

            {/* Content — left-aligned with text parallax */}
            <motion.div
                className="relative z-[2] flex w-full max-w-[1200px] flex-col items-start px-10 text-left md:px-16 lg:px-24"
                style={{ x: textSpringX, y: textSpringY }}
            >
                {/* Kanji */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative mb-5"
                >
                    <span
                        className="text-[80px] text-amber animate-pulse-glow"
                        style={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 700 }}
                    >
                        灯
                    </span>
                    <div
                        className="absolute inset-0 -z-10 animate-pulse-glow"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(245,166,35,0.2) 0%, transparent 70%)",
                            filter: "blur(20px)",
                            transform: "scale(2)",
                        }}
                    />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="max-w-[600px] text-[52px] font-black leading-[1.05] text-text-cream md:text-[60px]"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                >
                    {"Software that lights the way.".split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            className="mr-[0.3em] inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="mt-4 max-w-[450px] text-[18px] text-text-muted-blue"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                >
                    We build focused software that solves real problems.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-7 flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                >
                    <a
                        href="#products"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="rounded-[12px] bg-amber px-6 py-3 text-[15px] font-semibold text-text-dark shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-bright hover:shadow-[0_6px_30px_rgba(245,166,35,0.35)]"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Explore Products
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="rounded-[12px] border-[1.5px] border-amber/50 px-6 py-3 text-[15px] font-semibold text-amber transition-all duration-200 hover:border-amber hover:bg-amber/10"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
