"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "./utils";
import "./view-toggle.css";

export interface ViewToggleOption<T extends string = string> {
    value: T;
    label: ReactNode;
}

export interface ViewToggleProps<T extends string = string> {
    options: ViewToggleOption<T>[];
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
    className?: string;
    "aria-label"?: string;
}

/** Segmented control: a frosted pill slides behind the active option */
export function ViewToggle<T extends string = string>({
    options, value, defaultValue, onValueChange, className, ...aria
}: ViewToggleProps<T>) {
    const [inner, setInner] = useState<T>(defaultValue ?? options[0]?.value);
    const current = value ?? inner;
    const root = useRef<HTMLDivElement>(null);
    const pill = useRef<HTMLSpanElement>(null);
    const animate = useRef(false);

    useLayoutEffect(() => {
        const el = root.current;
        const p = pill.current;
        if (!el || !p) return;
        const place = () => {
            const on = el.querySelector<HTMLElement>('[aria-pressed="true"]');
            if (!on) return;
            if (!animate.current) p.style.transition = "none";
            p.style.width = on.offsetWidth + "px";
            p.style.transform = `translateX(${on.offsetLeft}px)`;
            if (!animate.current) { void p.offsetWidth; p.style.transition = ""; }
        };
        place();
        animate.current = true;
        const ro = new ResizeObserver(() => { animate.current = false; place(); animate.current = true; });
        ro.observe(el);
        return () => ro.disconnect();
    }, [current, options.length]);

    function select(v: T) {
        if (value === undefined) setInner(v);
        onValueChange?.(v);
    }

    return (
        <div ref={root} role="group" className={cx("pui-view-toggle", className)} {...aria}>
            {options.map((o) => (
                <button
                    key={o.value}
                    type="button"
                    className="pui-view-btn"
                    aria-pressed={o.value === current}
                    onClick={() => select(o.value)}
                >
                    {o.label}
                </button>
            ))}
            <span ref={pill} className="pui-view-pill" aria-hidden="true" />
        </div>
    );
}
