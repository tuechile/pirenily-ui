"use client";
import { useId, useRef, useState, type ReactNode } from "react";
import { cx } from "./utils";
import "./accordion.css";

export interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

/** A receipt that folds away */
export function Accordion({ title, children, defaultOpen = false, className }: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen);
    const [height, setHeight] = useState<number | "none">(defaultOpen ? "none" : 0);
    const panel = useRef<HTMLDivElement>(null);
    const id = useId();

    return (
        <div className={cx("pui-accordion", className)}>
            <button
                type="button"
                className="pui-acc-btn"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => {
                    const next = !open;
                    setOpen(next);
                    setHeight(next ? panel.current?.scrollHeight ?? "none" : 0);
                }}
            >
                <span>{title}</span>
                <span className="pui-acc-chev" aria-hidden="true">⌄</span>
            </button>
            <div
                id={id}
                ref={panel}
                className="pui-acc-panel"
                style={{ maxHeight: height }}
            >
                <div className="pui-acc-inner">{children}</div>
            </div>
        </div>
    );
}
