"use client";
import { useEffect, useRef, useState } from "react";
import { STORAGE_URL } from "@/lib/storage";

export default function ScrollVideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    // Listen for toggle-audio events from navbar
    useEffect(() => {
        const onToggle = () => {
            const video = videoRef.current;
            if (!video) return;

            if (video.muted) {
                video.muted = false;
                video.volume = 0.4;
                video.play().catch(() => {
                    video.muted = true;
                    window.dispatchEvent(
                        new CustomEvent("audio-state", { detail: { playing: false } })
                    );
                });
                window.dispatchEvent(
                    new CustomEvent("audio-state", { detail: { playing: true } })
                );
            } else {
                video.muted = true;
                window.dispatchEvent(
                    new CustomEvent("audio-state", { detail: { playing: false } })
                );
            }
        };

        window.addEventListener("toggle-audio", onToggle);
        return () => window.removeEventListener("toggle-audio", onToggle);
    }, []);

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "#1A1F2E",
                overflow: "hidden",
            }}
        >
            {/* Hero-only video background */}
            {!reducedMotion && (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={`${STORAGE_URL}/og-image.jpg`}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.35,
                    }}
                >
                    <source src={`${STORAGE_URL}/hero-video.mp4`} type="video/mp4" />
                </video>
            )}

            {/* Reduced motion fallback */}
            {reducedMotion && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${STORAGE_URL}/og-image.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.35,
                    }}
                />
            )}

            {/* Dark overlay for text readability */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#000",
                    opacity: 0.4,
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
