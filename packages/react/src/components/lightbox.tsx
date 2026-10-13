"use client";
import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { cx } from "./utils";
import "./lightbox.css";

export interface LightboxProps {
    src: string | null;
    alt?: string;
    onClose: () => void;
}

/** Full-screen picture. Closes on the x, a click outside, or Esc. No fades. */
export function Lightbox({ src, alt = "", onClose }: LightboxProps) {
    useEffect(() => {
        if (!src) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [src, onClose]);

    if (!src || typeof document === "undefined") return null;
    return createPortal(
        <div className="pui-lightbox" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <button type="button" className="pui-lightbox-close" aria-label="Close" onClick={onClose}>&times;</button>
            <img src={src} alt={alt} />
        </div>,
        document.body
    );
}

/** An image that opens itself in the lightbox */
export function LightboxImage({ className, src, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <img className={cx("pui-lightboxable", className)} src={src} alt={alt} onClick={() => setOpen(true)} {...props} />
            <Lightbox src={open ? src : null} alt={alt} onClose={() => setOpen(false)} />
        </>
    );
}
