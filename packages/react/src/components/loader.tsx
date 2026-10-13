"use client";
import { useEffect, useState } from "react";
import { cx } from "./utils";
import "./loader.css";

export interface LoaderProps {
    visible: boolean;
    /** Your loading GIF or image. Without one, a teal hairline ring spins instead. */
    src?: string;
    /** Only appear if still visible after this many ms, so fast loads never flash */
    delay?: number;
    className?: string;
}

/** Full-screen loading overlay. Appears and disappears instantly, no fade. */
export function Loader({ visible, src, delay = 200, className }: LoaderProps) {
    const [shown, setShown] = useState(visible && delay === 0);

    useEffect(() => {
        if (!visible) { setShown(false); return; }
        const t = setTimeout(() => setShown(true), delay);
        return () => clearTimeout(t);
    }, [visible, delay]);

    if (!shown) return null;
    return (
        <div className={cx("pui-loader", className)} role="status" aria-label="Loading">
            {src ? <img src={src} alt="" /> : <span className="pui-loader-ring" />}
        </div>
    );
}
