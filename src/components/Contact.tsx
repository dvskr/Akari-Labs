"use client";
import { useState, useRef } from "react";
import { Mail, HeartPulse, Twitter, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const contactInfo = [
    { icon: Mail, text: "hello@akarilabs.io", href: "mailto:hello@akarilabs.io" },
    {
        icon: HeartPulse,
        text: "support@pmhnphiring.com",
        href: "mailto:support@pmhnphiring.com",
    },
    { icon: Twitter, text: "@pmhnphiring", href: "https://x.com/pmhnphiring" },
    { icon: MapPin, text: "Sheridan, Wyoming, USA", href: null },
];

// Paper crane SVG path for the send animation
function PaperCrane({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" width="60" height="60" className={className} fill="none">
            <path
                d="M 50 10 L 85 50 L 50 45 L 15 50 Z"
                stroke="#F5A623"
                strokeWidth="2"
                fill="rgba(245,166,35,0.1)"
            />
            <path
                d="M 50 45 L 85 50 L 65 75 Z"
                stroke="#F5A623"
                strokeWidth="2"
                fill="rgba(245,166,35,0.05)"
            />
            <path
                d="M 50 45 L 15 50 L 35 75 Z"
                stroke="#F5A623"
                strokeWidth="2"
                fill="rgba(245,166,35,0.05)"
            />
            <path
                d="M 50 10 L 50 45"
                stroke="#F5A623"
                strokeWidth="1.5"
            />
            <path
                d="M 35 75 L 50 90 L 65 75"
                stroke="#F5A623"
                strokeWidth="2"
                fill="rgba(245,166,35,0.08)"
            />
        </svg>
    );
}

export default function Contact() {
    const [sendState, setSendState] = useState<"idle" | "folding" | "flying" | "success">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Start animation sequence
        setSendState("folding");

        // After fold, fly crane
        setTimeout(() => setSendState("flying"), 500);

        // After fly, show success
        setTimeout(() => {
            setSendState("success");
            // Actually submit form data via mailto
            if (formRef.current) {
                const formData = new FormData(formRef.current);
                const name = formData.get("name");
                const email = formData.get("email");
                const subject = formData.get("subject");
                const message = formData.get("message");
                const body = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0A%0A${message}`;
                window.location.href = `mailto:hello@akarilabs.io?subject=${subject}&body=${body}`;
            }
        }, 1500);
    };

    const resetForm = () => {
        setSendState("idle");
        if (formRef.current) formRef.current.reset();
    };

    return (
        <section id="contact" className="px-6 py-[120px] md:py-[120px]">
            <div className="mx-auto max-w-[1000px]">
                <ScrollReveal className="mb-[60px] text-center">
                    <h2
                        className="text-[42px] font-bold text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        Get in Touch
                    </h2>
                    <p
                        className="mt-3 text-[18px] text-text-muted-blue"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Have a question, partnership idea, or just want to say hi?
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr]">
                    {/* Contact Form with Paper Crane Animation */}
                    <ScrollReveal>
                        <div className="relative overflow-hidden rounded-[20px] border border-border-dark bg-surface-dark p-8 shadow-sm">
                            {/* Form */}
                            <AnimatePresence mode="wait">
                                {sendState === "idle" || sendState === "folding" ? (
                                    <motion.form
                                        ref={formRef}
                                        key="form"
                                        onSubmit={handleSubmit}
                                        animate={
                                            sendState === "folding"
                                                ? {
                                                    scaleY: 0,
                                                    rotateX: 90,
                                                    opacity: 0,
                                                }
                                                : { scaleY: 1, rotateX: 0, opacity: 1 }
                                        }
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        style={{ transformOrigin: "bottom center" }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label
                                                    className="mb-1.5 block text-[13px] font-medium text-text-muted-blue"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="w-full rounded-[12px] border border-border-dark bg-surface-dark-hover px-4 py-3 text-[15px] text-text-cream outline-none transition-all duration-200 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="mb-1.5 block text-[13px] font-medium text-text-muted-blue"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                >
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    className="w-full rounded-[12px] border border-border-dark bg-surface-dark-hover px-4 py-3 text-[15px] text-text-cream outline-none transition-all duration-200 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="mb-1.5 block text-[13px] font-medium text-text-muted-blue"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                >
                                                    Subject
                                                </label>
                                                <select
                                                    name="subject"
                                                    className="w-full rounded-[12px] border border-border-dark bg-surface-dark-hover px-4 py-3 text-[15px] text-text-cream outline-none transition-all duration-200 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                >
                                                    <option>General Inquiry</option>
                                                    <option>Partnership</option>
                                                    <option>Job Posting</option>
                                                    <option>Press</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    className="mb-1.5 block text-[13px] font-medium text-text-muted-blue"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                >
                                                    Message
                                                </label>
                                                <textarea
                                                    name="message"
                                                    rows={5}
                                                    required
                                                    className="w-full resize-none rounded-[12px] border border-border-dark bg-surface-dark-hover px-4 py-3 text-[15px] text-text-cream outline-none transition-all duration-200 focus:border-amber focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]"
                                                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="mt-2 w-full rounded-[12px] bg-amber py-3.5 text-[15px] font-semibold text-text-dark shadow-[0_4px_20px_rgba(245,166,35,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-bright hover:shadow-[0_6px_30px_rgba(245,166,35,0.35)]"
                                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                                            >
                                                Send Message →
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : sendState === "flying" ? (
                                    <motion.div
                                        key="crane"
                                        className="flex min-h-[380px] items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div
                                            initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
                                            animate={{
                                                y: -300,
                                                x: 200,
                                                opacity: 0,
                                                rotate: -15,
                                            }}
                                            transition={{ duration: 1, ease: "easeIn" }}
                                        >
                                            <PaperCrane />
                                            {/* Sparkle trail */}
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute h-1 w-1 rounded-full bg-amber"
                                                    initial={{ opacity: 0.8 }}
                                                    animate={{
                                                        opacity: 0,
                                                        y: 50 + i * 20,
                                                        x: -(30 + i * 10),
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: i * 0.1,
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        className="flex min-h-[380px] flex-col items-center justify-center gap-4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <span
                                            className="text-[60px] text-amber"
                                            style={{ fontFamily: '"Noto Serif JP", serif' }}
                                        >
                                            灯
                                        </span>
                                        <p
                                            className="text-[20px] font-bold text-text-cream"
                                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                                        >
                                            Message sent.
                                        </p>
                                        <p
                                            className="text-[14px] text-text-muted-blue"
                                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                                        >
                                            We&apos;ll get back to you soon.
                                        </p>
                                        <button
                                            onClick={resetForm}
                                            className="mt-4 text-[14px] font-medium text-amber underline underline-offset-4 transition-colors hover:text-amber-bright"
                                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ScrollReveal>

                    {/* Contact Info */}
                    <ScrollReveal delay={0.15}>
                        <div className="flex flex-col gap-5">
                            {contactInfo.map((item, i) => {
                                const Inner = (
                                    <div
                                        key={i}
                                        className="group flex items-center gap-3 transition-colors duration-200"
                                    >
                                        <item.icon
                                            size={20}
                                            className="shrink-0 text-amber transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(245,166,35,0.4)]"
                                        />
                                        <span
                                            className="text-[15px] text-text-muted-blue transition-colors duration-200 group-hover:text-text-cream"
                                            style={{ fontFamily: '"DM Sans", sans-serif' }}
                                        >
                                            {item.text}
                                        </span>
                                    </div>
                                );
                                if (item.href) {
                                    return (
                                        <a
                                            key={i}
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                            {Inner}
                                        </a>
                                    );
                                }
                                return <div key={i}>{Inner}</div>;
                            })}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
