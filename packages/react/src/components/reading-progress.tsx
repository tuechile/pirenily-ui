"use client";
import { useEffect, useState } from "react";
import { cx } from "./utils";
import "./reading-progress.css";

/** Teal glowing bar across the top that fills as the page scrolls */
export function ReadingProgress({ className }: { className?: string }) {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            setPct(max > 0 ? (doc.scrollTop / max) * 100 : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div className={cx("pui-progress", className)} role="progressbar" aria-label="Reading progress" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="pui-progress-bar" style={{ width: pct.toFixed(2) + "%" }} />
        </div>
    );
}
