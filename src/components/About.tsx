"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { STORAGE_URL } from "@/lib/storage";

const values = [
    {
        video: `${STORAGE_URL}/values/fast.mp4`,
        title: "Focused",
        description: "One niche, done right. We go deep instead of wide.",
    },
    {
        video: `${STORAGE_URL}/values/focused.mp4`,
        title: "Fast",
        description: "Ship, learn, iterate. Ideas don't age well.",
    },
    {
        video: `${STORAGE_URL}/values/transparent.mp4`,
        title: "Transparent",
        description: "Honest data always. No inflated metrics, no vaporware.",
    },
    {
        video: `${STORAGE_URL}/values/crafted.mp4`,
        title: "Crafted",
        description: "Every pixel matters. If it's worth building, it's worth polishing.",
    },
];

function ValueCard({
    video,
    title,
    description,
    index,
}: {
    video: string;
    title: string;
    description: string;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const inView = useInView(cardRef, { once: true, margin: "-50px" });

    // 3D tilt on hover
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), {
        stiffness: 300,
        damping: 30,
    });

    const handleMouse = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width);
        y.set((e.clientY - rect.top) / rect.height);
    };

    const handleLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{
                rotateX: inView ? rotateX : 90,
                rotateY: inView ? rotateY : 0,
                transformPerspective: 800,
                transformOrigin: "bottom center",
            }}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={
                inView
                    ? { rotateX: 0, opacity: 1 }
                    : { rotateX: 90, opacity: 0 }
            }
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 15,
            }}
            onAnimationComplete={() => {
                // Start video playback after card unfolds
                if (videoRef.current) {
                    videoRef.current.play().catch(() => { });
                }
            }}
            className="flex flex-col items-center rounded-[16px] border border-border-dark bg-surface-dark p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:shadow-[0_8px_30px_rgba(245,166,35,0.08)]"
        >
            <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                className="mb-4 h-[80px] w-[80px] rounded-[12px] object-cover"
            >
                <source src={video} type="video/mp4" />
            </video>
            <h3
                className="text-[18px] font-bold text-text-cream"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
                {title}
            </h3>
            <p
                className="mt-2 text-[14px] leading-[1.6] text-text-muted-blue"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
                {description}
            </p>
        </motion.div>
    );
}

export default function About() {
    return (
        <section
            id="about"
            className="relative overflow-hidden px-6 py-[120px] md:py-[120px]"
        >
            {/* Kanji watermark */}
            <div
                className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 select-none"
                style={{
                    fontFamily: '"Noto Serif JP", serif',
                    fontSize: "250px",
                    fontWeight: 700,
                    color: "rgba(245, 166, 35, 0.05)",
                }}
            >
                灯り
            </div>

            <div className="relative mx-auto max-w-[800px]">
                {/* Title */}
                <ScrollReveal>
                    <h2
                        className="text-[42px] font-bold text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        About Akari Labs
                    </h2>
                </ScrollReveal>

                {/* Paragraphs */}
                <ScrollReveal delay={0.1} className="mt-5 space-y-5">
                    <p
                        className="text-[17px] leading-[1.7] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Akari (
                        <span
                            className="text-amber"
                            style={{ fontFamily: '"Noto Serif JP", serif' }}
                        >
                            灯り
                        </span>
                        ) means &lsquo;light&rsquo; in Japanese.
                    </p>
                    <p
                        className="text-[17px] leading-[1.7] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        We&apos;re a Wyoming-based software company founded in December 2025. We
                        believe the best software comes from deep focus on a single problem,
                        not from trying to solve everything at once.
                    </p>
                    <p
                        className="text-[17px] leading-[1.7] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        We find gaps where specialized software makes a real difference — then
                        we build, ship, and iterate. No bloat. No feature creep. Just focused
                        tools that work.
                    </p>
                </ScrollReveal>

                {/* Value cards — origami unfold */}
                <div className="mt-[60px] grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {values.map((v, i) => (
                        <ValueCard
                            key={v.title}
                            video={v.video}
                            title={v.title}
                            description={v.description}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
