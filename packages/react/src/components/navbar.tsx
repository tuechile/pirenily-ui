"use client";
import { useEffect, useState, type ElementType, type ReactNode } from "react";
import { cx } from "./utils";
import "./navbar.css";

export interface NavLink {
    href: string;
    label: ReactNode;
    current?: boolean;
}

export interface NavbarProps {
    brand?: ReactNode;
    brandHref?: string;
    links: NavLink[];
    /** Swap in your router's link, e.g. Next.js Link */
    linkAs?: ElementType;
    className?: string;
}

/** Sticky nav fading out of the black. On phones a "=" wipes open a full-screen list. */
export function Navbar({ brand = "Pirenily", brandHref = "/", links, linkAs: A = "a", className }: NavbarProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("pui-menu-open", open);
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const mq = window.matchMedia("(max-width: 666px)");
        const onWide = () => setOpen(false);
        document.addEventListener("keydown", onKey);
        mq.addEventListener("change", onWide);
        return () => {
            document.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onWide);
            document.documentElement.classList.remove("pui-menu-open");
        };
    }, [open]);

    return (
        <nav className={cx("pui-nav", open && "is-open", className)}>
            <A className="pui-nav-brand" href={brandHref}>{brand}</A>
            <button
                type="button"
                className="pui-nav-toggle"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
            >
                <span /><span />
            </button>
            <div className="pui-nav-links">
                {links.map((l) => (
                    <A
                        key={l.href}
                        className="pui-nav-item"
                        href={l.href}
                        aria-current={l.current ? "page" : undefined}
                        onClick={() => setOpen(false)}
                    >
                        {l.label}
                    </A>
                ))}
            </div>
        </nav>
    );
}
