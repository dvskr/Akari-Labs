"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
    target: number;
    suffix?: string;
    className?: string;
    delay?: number;
}

export default function CountUp({ target, suffix = "", className = "", delay = 0 }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const duration = 1500;
        const startTime = performance.now() + delay * 1000;
        let raf: number;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            if (elapsed < 0) {
                raf = requestAnimationFrame(animate);
                return;
            }
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));

            if (progress < 1) {
                raf = requestAnimationFrame(animate);
            } else {
                setValue(target);
                setDone(true);
            }
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, delay]);

    return (
        <span ref={ref} className={`relative inline-block ${className}`}>
            {value.toLocaleString()}
            {suffix}

            {/* Shockwave ring */}
            {done && (
                <motion.span
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber/30"
                    initial={{ width: 0, height: 0, opacity: 0.4 }}
                    animate={{ width: 80, height: 80, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            )}
        </span>
    );
}
