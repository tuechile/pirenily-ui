import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";
import "./footer.css";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
    /** The small line under everything, e.g. "Chi (Tue) Le | Pirenily | Updated Oct 2026" */
    meta?: ReactNode;
}

/** Hairline-topped italic footer. Links inside turn teal and blur on hover. */
export function Footer({ meta, children, className, ...props }: FooterProps) {
    return (
        <footer className={cx("pui-footer", className)} {...props}>
            {children}
            {meta && <span className="pui-footer-meta">{meta}</span>}
        </footer>
    );
}

export interface ContactLink {
    href: string;
    label: string;
    /** Image URL or your own icon element */
    icon: string | ReactNode;
}

/** Grey social icons that blur instead of lighting up */
export function ContactLinks({ links, className }: { links: ContactLink[]; className?: string }) {
    return (
        <div className={cx("pui-contacts", className)}>
            {links.map((l) => {
                const external = /^https?:/.test(l.href);
                return (
                    <a key={l.href} href={l.href} aria-label={l.label} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                        {typeof l.icon === "string" ? <img className="pui-contact-icon" src={l.icon} alt="" /> : <span className="pui-contact-icon">{l.icon}</span>}
                    </a>
                );
            })}
        </div>
    );
}
