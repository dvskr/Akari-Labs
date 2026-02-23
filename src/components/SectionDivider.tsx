"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type DividerVariant = "beam" | "brushstroke" | "sunrise" | "thin" | "darken";

interface SectionDividerProps {
    variant: DividerVariant;
}

function BeamDivider() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="relative h-[40px] w-full overflow-hidden">
            {inView && (
                <motion.div
                    className="absolute top-1/2 h-[2px] w-[120px] -translate-y-1/2"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent, #F5A623, transparent)",
                        boxShadow: "0 0 40px #F5A623, 0 0 20px rgba(245,166,35,0.5)",
                    }}
                    initial={{ left: "-120px" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            )}
        </div>
    );
}

function BrushstrokeDivider() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="flex items-center justify-center py-4">
            <svg width="400" height="20" viewBox="0 0 400 20" className="max-w-full">
                <motion.path
                    d="M 200 10 Q 150 5 80 10 Q 30 14 0 10"
                    stroke="rgba(245,166,35,0.2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <motion.path
                    d="M 200 10 Q 250 5 320 10 Q 370 14 400 10"
                    stroke="rgba(245,166,35,0.2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </svg>
        </div>
    );
}

function SunriseDivider() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="relative h-[60px] w-full overflow-hidden">
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={
                    inView
                        ? { width: "120%", height: 120, opacity: 1 }
                        : {}
                }
                transition={{ duration: 1, ease: "easeOut" }}
            />
        </div>
    );
}

function ThinDivider() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="flex justify-center py-2">
            <motion.div
                className="h-px w-[60%]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(245,166,35,0.3), transparent)",
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
        </div>
    );
}

function DarkenDivider() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <div ref={ref} className="relative h-[60px] w-full overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle, transparent 0%, rgba(26,31,46,0.3) 100%)",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
            />
        </div>
    );
}

export default function SectionDivider({ variant }: SectionDividerProps) {
    switch (variant) {
        case "beam":
            return <BeamDivider />;
        case "brushstroke":
            return <BrushstrokeDivider />;
        case "sunrise":
            return <SunriseDivider />;
        case "thin":
            return <ThinDivider />;
        case "darken":
            return <DarkenDivider />;
        default:
            return null;
    }
}
