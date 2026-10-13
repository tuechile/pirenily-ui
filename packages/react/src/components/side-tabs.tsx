"use client";
import { useState, type ReactNode } from "react";
import { cx } from "./utils";
import "./side-tabs.css";

export interface SideTabsProps<T extends string = string> {
    tabs: { value: T; label: ReactNode }[];
    value?: T;
    defaultValue?: T;
    onValueChange?: (value: T) => void;
    /** Fixed to the left edge of the screen (default) or inline */
    position?: "fixed" | "inline";
    /** When fixed: slide in from the edge (true) or stay tucked away (false) */
    show?: boolean;
    className?: string;
}

/** Capsules attached to the screen edge; they slide in, never fade */
export function SideTabs<T extends string = string>({
    tabs, value, defaultValue, onValueChange, position = "fixed", show = true, className,
}: SideTabsProps<T>) {
    const [inner, setInner] = useState<T>(defaultValue ?? tabs[0]?.value);
    const current = value ?? inner;

    return (
        <div className={cx("pui-side-tabs", `pui-side-tabs--${position}`, show && "is-shown", className)}>
            {tabs.map((t) => (
                <button
                    key={t.value}
                    type="button"
                    className="pui-side-tab"
                    aria-pressed={t.value === current}
                    onClick={() => {
                        if (value === undefined) setInner(t.value);
                        onValueChange?.(t.value);
                    }}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}
