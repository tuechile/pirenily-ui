"use client";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Tag, TagRow } from "./tag";
import { LightboxImage } from "./lightbox";
import { cx } from "./utils";
import "./case-study.css";

const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface CaseStudyProps {
    children: ReactNode;
    backHref?: string;
    backLabel?: ReactNode;
    /** Sticky offset of the rail in px. By default it sticks where it starts, up to 128px down. */
    railTop?: number;
    className?: string;
}

/**
 * Sticky progress rail on the left, reading column on the right. Every CaseSection
 * is numbered and listed on the rail; the line fills ring to ring as you read and
 * the current ring glows. Below 1000px the rail hides.
 */
export function CaseStudy({ children, backHref, backLabel = "← Back", railTop, className }: CaseStudyProps) {
    const shell = useRef<HTMLDivElement>(null);
    const list = useRef<HTMLOListElement>(null);
    const [title, setTitle] = useState("");
    const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
    const [current, setCurrent] = useState(-1);
    const [fill, setFill] = useState(0);

    // Collect the sections once they're in the DOM
    useIsoLayoutEffect(() => {
        const el = shell.current;
        if (!el) return;
        // Stick at the spot the rail starts in, so it never scrolls first; deep in a page, cap it
        const start = el.getBoundingClientRect().top + scrollY + parseFloat(getComputedStyle(el).paddingTop);
        el.style.setProperty("--rail-top", (railTop ?? Math.min(start, 128)) + "px");
        const hero = el.querySelector<HTMLElement>(".pui-cs-hero");
        setTitle(hero?.dataset.index ?? "");
        const found = Array.from(el.querySelectorAll<HTMLElement>("[data-index]"))
            .filter((s) => s !== hero)
            .map((s) => {
                s.id ||= slug(s.dataset.index!);
                return { id: s.id, label: s.dataset.index! };
            });
        setSections(found);
    }, [children, railTop]);

    useEffect(() => {
        if (!sections.length) return;
        const onScroll = () => {
            const line = scrollY + innerHeight * 0.35;
            const els = sections.map((s) => document.getElementById(s.id)!);
            const tops = els.map((s) => s.getBoundingClientRect().top + scrollY);
            const rings = Array.from(list.current?.querySelectorAll<HTMLLIElement>("li:not(.pui-cs-fill)") ?? []);
            const centers = rings.map((li) => li.offsetTop + li.offsetHeight / 2);
            let cur = -1;
            tops.forEach((t, i) => { if (t <= line) cur = i; });
            let y = centers[0] ?? 0;
            if (cur >= 0 && cur < tops.length - 1) {
                const t = Math.min(1, (line - tops[cur]) / (tops[cur + 1] - tops[cur]));
                y = centers[cur] + t * (centers[cur + 1] - centers[cur]);
            } else if (cur >= 0) {
                y = centers[cur];
            }
            setCurrent(cur);
            setFill(y - (centers[0] ?? 0));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sections]);

    return (
        <div ref={shell} className={cx("pui-cs", className)}>
            <aside className="pui-cs-rail">
                {backHref && <a className="pui-cs-back" href={backHref}>{backLabel}</a>}
                <p className="pui-cs-kicker">Reading</p>
                <p className="pui-cs-rail-title">{title}</p>
                <ol ref={list} className="pui-cs-index" style={{ "--n": sections.length } as CSSProperties} aria-label="Sections">
                    <li className="pui-cs-fill" style={{ height: fill }} aria-hidden="true" />
                    {sections.map((s, i) => (
                        <li key={s.id}>
                            <a
                                href={`#${s.id}`}
                                className={cx(i === current && "is-current", i < current && "is-passed")}
                                aria-label={`${String(i + 1).padStart(2, "0")} ${s.label}`}
                            >
                                <span className="pui-cs-index-label">{s.label}</span>
                            </a>
                        </li>
                    ))}
                </ol>
            </aside>
            <article className="pui-cs-main">{children}</article>
        </div>
    );
}

export interface CaseHeroProps {
    title: ReactNode;
    /** Rail label; defaults to the title when it's plain text */
    index?: string;
    eyebrow?: ReactNode;
    /** Right-hand line, usually the dates */
    meta?: ReactNode;
    subtitle?: ReactNode;
    tags?: string[];
    /** The tinted meta grid: Role, Team, Timeline... */
    facts?: { label: ReactNode; values: ReactNode[] }[];
    /** Makes the title a link */
    href?: string;
}

export function CaseHero({ title, index, eyebrow = "Case study", meta, subtitle, tags, facts, href }: CaseHeroProps) {
    return (
        <header className="pui-cs-hero" data-index={index ?? (typeof title === "string" ? title : "")}>
            <div className="pui-cs-hero-top">
                <p className="pui-cs-kicker">{eyebrow}</p>
                {meta && <p className="pui-cs-kicker">{meta}</p>}
            </div>
            <h1 className="pui-cs-title">{href ? <a href={href} target="_blank" rel="noopener noreferrer">{title}</a> : title}</h1>
            {subtitle && <p className="pui-cs-sub">{subtitle}</p>}
            {tags && tags.length > 0 && <TagRow className="pui-cs-tags">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagRow>}
            {facts && facts.length > 0 && (
                <dl className="pui-cs-facts">
                    {facts.map((f, i) => (
                        <div key={i}>
                            <dt className="pui-cs-kicker">{f.label}</dt>
                            {f.values.map((v, j) => <dd key={j}>{v}</dd>)}
                        </div>
                    ))}
                </dl>
            )}
        </header>
    );
}

export interface CaseSectionProps {
    /** Short name: the eyebrow and the rail label */
    heading: string;
    /** The big line under the eyebrow; defaults to the heading */
    lead?: ReactNode;
    /** Shorter rail label for long headings */
    index?: string;
    children?: ReactNode;
}

/** A numbered section. Numbers come from a CSS counter, in order. */
export function CaseSection({ heading, lead, index, children }: CaseSectionProps) {
    return (
        <section className="pui-cs-section" data-index={index ?? heading}>
            <p className="pui-cs-eyebrow"><span className="pui-cs-num" />{lead ? heading : null}</p>
            <h2 className="pui-cs-heading">{lead ?? heading}</h2>
            {children && <div className="pui-cs-prose">{children}</div>}
        </section>
    );
}

/** Media with an auto-numbered "Fig. 01" caption */
export function CaseFigure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
    return (
        <figure className="pui-cs-figure">
            {children}
            {caption && <figcaption className="pui-cs-caption">{caption}</figcaption>}
        </figure>
    );
}

export interface CaseMediaProps {
    src?: string;
    alt?: string;
    /** Open in the lightbox on click (default true) */
    zoom?: boolean;
    size?: "sm" | "md" | "lg";
    /** No src: a dashed frame with this text */
    placeholder?: string;
}

export function CaseMedia({ src, alt = "", zoom = true, size, placeholder = "Coming soon" }: CaseMediaProps) {
    if (!src) return <div className="pui-cs-media pui-cs-media--placeholder">{placeholder}</div>;
    return (
        <div className={cx("pui-cs-media", size && `pui-cs-media--${size}`)}>
            {zoom ? <LightboxImage src={src} alt={alt} loading="lazy" /> : <img src={src} alt={alt} loading="lazy" />}
        </div>
    );
}

/** Media side by side. flow: text column wider. pair: stays two-up on phones. */
export function CaseRow({ layout = "equal", children }: { layout?: "equal" | "pair" | "flow" | "3" | "quad"; children: ReactNode }) {
    return <div className={cx("pui-cs-row", `pui-cs-row--${layout}`)}>{children}</div>;
}

export function CaseBlock({ children }: { children: ReactNode }) {
    return <div className="pui-cs-block">{children}</div>;
}

/** A panel link; the small label shows where it goes */
export function CtaLink({ href, label, kicker }: { href: string; label: ReactNode; kicker?: ReactNode }) {
    const internal = href.startsWith("/") || href.startsWith("#");
    const host = internal ? "" : new URL(href).host.replace(/^www\./, "");
    return (
        <a className="pui-cs-cta" href={href} {...(internal ? {} : { target: "_blank", rel: "noopener" })}>
            <span>
                <span className="pui-cs-kicker">{kicker ?? host}</span>
                <span className="pui-cs-cta-title">{label}</span>
            </span>
        </a>
    );
}

export function Rollout({ phases }: { phases: { label: ReactNode; title: ReactNode; description: ReactNode }[] }) {
    return (
        <div className="pui-cs-rollout">
            {phases.map((p, i) => (
                <div key={i} className="pui-cs-rollout-card">
                    <p className="pui-cs-rollout-phase">{p.label}</p>
                    <p><strong>{p.title}</strong><br />{p.description}</p>
                </div>
            ))}
        </div>
    );
}

type PagerLink = { href: string; label: ReactNode; kicker?: ReactNode };

export function CasePager({ prev, next }: { prev?: PagerLink; next?: PagerLink }) {
    return (
        <nav className="pui-cs-pager" aria-label="More case studies">
            {prev && (
                <a className="pui-cs-next" href={prev.href}>
                    <span className="pui-cs-kicker">{prev.kicker ?? "Previous"}</span>
                    <span className="pui-cs-next-title">{prev.label}</span>
                </a>
            )}
            {next && (
                <a className="pui-cs-next pui-cs-next--next" href={next.href}>
                    <span className="pui-cs-kicker">{next.kicker ?? "Next"}</span>
                    <span className="pui-cs-next-title">{next.label}</span>
                </a>
            )}
        </nav>
    );
}
