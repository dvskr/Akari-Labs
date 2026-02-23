"use client";
import { useRef, useState, useCallback, useEffect, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    target?: string;
    rel?: string;
    style?: React.CSSProperties;
}

export default function MagneticButton({
    children,
    className = "",
    href,
    onClick,
    target,
    rel,
    style,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsTouch(window.matchMedia("(pointer: coarse)").matches);
        }
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current || isTouch) return;
            const rect = ref.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 80;

            if (dist < radius) {
                const strength = (1 - dist / radius) * 8;
                const angle = Math.atan2(dy, dx);
                setOffset({
                    x: Math.cos(angle) * strength,
                    y: Math.sin(angle) * strength,
                });
            } else {
                setOffset({ x: 0, y: 0 });
            }
        },
        [isTouch]
    );

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        if (isTouch) return;
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove, isTouch]);

    const wrapperStyle: React.CSSProperties = {
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
        display: "inline-block",
    };

    if (href) {
        return (
            <div ref={ref} onMouseLeave={handleMouseLeave} style={wrapperStyle}>
                <a href={href} onClick={onClick} target={target} rel={rel} className={className}>
                    {children}
                </a>
            </div>
        );
    }

    return (
        <div ref={ref} onMouseLeave={handleMouseLeave} style={wrapperStyle}>
            <button onClick={onClick} className={className}>
                {children}
            </button>
        </div>
    );
}
