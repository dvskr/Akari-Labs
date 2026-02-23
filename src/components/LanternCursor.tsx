"use client";
import { useEffect, useRef, useState } from "react";

export default function LanternCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const trailRefs = useRef<HTMLDivElement[]>([]);
    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const trailPositions = useRef<{ x: number; y: number }[]>(
        Array.from({ length: 6 }, () => ({ x: -100, y: -100 }))
    );
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (typeof window === "undefined") return;
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) return;

        // Check reduced motion
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        document.body.style.cursor = "none";

        const onMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);

            // Check if hovering over clickable
            const el = document.elementFromPoint(e.clientX, e.clientY);
            if (el) {
                const clickable =
                    el.tagName === "A" ||
                    el.tagName === "BUTTON" ||
                    el.closest("a") ||
                    el.closest("button") ||
                    (el as HTMLElement).style?.cursor === "pointer" ||
                    window.getComputedStyle(el).cursor === "pointer";
                setHovering(!!clickable);
            }
        };

        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        let raf: number;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            // Update trail
            for (let i = trailPositions.current.length - 1; i > 0; i--) {
                trailPositions.current[i] = { ...trailPositions.current[i - 1] };
            }
            trailPositions.current[0] = { ...pos.current };

            trailRefs.current.forEach((ref, i) => {
                if (ref) {
                    const tp = trailPositions.current[i];
                    const scale = 1 - (i + 1) * 0.12;
                    const opacity = 0.4 - i * 0.06;
                    ref.style.transform = `translate(${tp.x - 3}px, ${tp.y - 3}px) scale(${scale})`;
                    ref.style.opacity = `${Math.max(0, opacity)}`;
                }
            });

            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf);
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    }, [visible]);

    // Don't render on server or touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const ringSize = clicking ? 60 : hovering ? 50 : 30;
    const ringOpacity = clicking ? 0.2 : hovering ? 0.15 : 0.08;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9998,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.2s",
            }}
        >
            {/* Trail dots */}
            {trailPositions.current.map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) trailRefs.current[i] = el;
                    }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#F5A623",
                        opacity: 0,
                        willChange: "transform, opacity",
                    }}
                />
            ))}

            {/* Main dot */}
            <div
                ref={dotRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#F5A623",
                    boxShadow: "0 0 15px #F5A623, 0 0 30px rgba(245,166,35,0.3)",
                    willChange: "transform",
                }}
            />

            {/* Outer ring */}
            <div
                ref={ringRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: ringSize,
                    height: ringSize,
                    borderRadius: "50%",
                    border: `1.5px solid rgba(245,166,35,${ringOpacity})`,
                    background: `radial-gradient(circle, rgba(245,166,35,${ringOpacity * 0.5}) 0%, transparent 70%)`,
                    transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                    willChange: "transform",
                }}
            />
        </div>
    );
}
