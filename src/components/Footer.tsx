"use client";
import { Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    products: [
        { label: "PMHNP Hiring", href: "https://pmhnphiring.com", external: true },
        { label: "Gym Tracker", href: "#", external: false, suffix: "(Coming Soon)" },
    ],
    company: [
        { label: "About", href: "#about" },
        { label: "Team", href: "#team" },
        { label: "Contact", href: "#contact" },
    ],
    connect: [
        { label: "Twitter", href: "https://x.com/AkariLabs", external: true },
        { label: "LinkedIn", href: "https://linkedin.com/company/akari-labs", external: true },
        { label: "Email", href: "mailto:hello@akarilabs.io", external: false },
    ],
};

/* Inline SVG asanoha pattern */
const asanohaPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M0 0L40 20L80 0M0 80L40 60L80 80M0 0L40 40L0 80M80 0L40 40L80 80M0 40L40 20L80 40M0 40L40 60L80 40' stroke='%23F5A623' stroke-width='0.5' fill='none' opacity='0.04'/%3E%3C/svg%3E")`;

export default function Footer() {
    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <footer
            className="relative px-6 pb-10 pt-20"
            style={{
                backgroundImage: asanohaPattern,
                backgroundRepeat: "repeat",
            }}
        >
            <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-10 md:grid-cols-4">
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2">
                        <span
                            className="text-[28px] text-amber"
                            style={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 700 }}
                        >
                            灯
                        </span>
                        <span
                            className="text-[20px] font-bold text-text-cream"
                            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                        >
                            Akari Labs
                        </span>
                    </div>
                    <p
                        className="mt-3 text-[14px] text-text-dim"
                        style={{ fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Software that lights the way.
                    </p>
                    <div className="mt-4 flex gap-3">
                        <a
                            href="https://x.com/AkariLabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-dim transition-colors duration-200 hover:text-amber"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/company/akari-labs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-dim transition-colors duration-200 hover:text-amber"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Products */}
                <div>
                    <h4
                        className="text-[14px] font-bold uppercase tracking-[0.06em] text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        Products
                    </h4>
                    <div className="mt-4 flex flex-col gap-3">
                        {footerLinks.products.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="text-[14px] text-text-dim transition-colors duration-200 hover:text-text-cream"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {link.label}
                                {"suffix" in link && (
                                    <span className="ml-1 text-text-dim">{link.suffix}</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h4
                        className="text-[14px] font-bold uppercase tracking-[0.06em] text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        Company
                    </h4>
                    <div className="mt-4 flex flex-col gap-3">
                        {footerLinks.company.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                className="text-left text-[14px] text-text-dim transition-colors duration-200 hover:text-text-cream"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Connect */}
                <div>
                    <h4
                        className="text-[14px] font-bold uppercase tracking-[0.06em] text-text-cream"
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    >
                        Connect
                    </h4>
                    <div className="mt-4 flex flex-col gap-3">
                        {footerLinks.connect.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="text-[14px] text-text-dim transition-colors duration-200 hover:text-text-cream"
                                style={{ fontFamily: '"DM Sans", sans-serif' }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-auto mt-10 max-w-[1100px] border-t border-border-dark" />

            {/* Copyright */}
            <div className="mx-auto mt-5 flex max-w-[1100px] flex-col items-center justify-between gap-2 sm:flex-row">
                <p
                    className="text-[13px] text-text-dim"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    © 2026 Akari Labs LLC · Sheridan, Wyoming
                </p>
                <p
                    className="text-[13px] text-text-dim"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    Made with{" "}
                    <span
                        className="text-amber"
                        style={{ fontFamily: '"Noto Serif JP", serif' }}
                    >
                        灯り
                    </span>{" "}
                    in Wyoming
                </p>
            </div>
        </footer>
    );
}
