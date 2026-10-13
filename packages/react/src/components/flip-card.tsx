"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { canHover, cx } from "./utils";
import { currentPop, hidePop, showPop } from "./pop-layer";
import "./flip-card.css";

export interface FlipCardProps {
    /** The headshot on the front */
    front: string;
    frontAlt?: string;
    /** Small pictures on the back, each pops up when hovered (or tapped) */
    pictures: string[];
    /** Italic line under the pictures on the back */
    note?: ReactNode;
    className?: string;
}

/** Hover the front for a random picture; click to flip to a feathered grid of small ones */
export function FlipCard({ front, frontAlt = "", pictures, note, className }: FlipCardProps) {
    const [flipped, setFlipped] = useState(false);
    const last = useRef(-1);
    const hover = useRef(false);

    useEffect(() => {
        hover.current = canHover();
        if (hover.current) return;
        // Touch: a tap anywhere else puts the picture away
        const off = () => hidePop();
        document.addEventListener("click", off);
        return () => document.removeEventListener("click", off);
    }, []);

    function randomPicture() {
        if (pictures.length < 2) return pictures[0];
        let i = Math.floor(Math.random() * (pictures.length - 1));
        if (i >= last.current) i++;
        last.current = i;
        return pictures[i];
    }

    function flip() {
        hidePop();
        setFlipped((f) => !f);
    }

    return (
        <div
            className={cx("pui-flip", flipped && "is-flipped", className)}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label="Flip to see more pictures"
            onClick={flip}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }}
        >
            <div
                className="pui-flip-front"
                onMouseEnter={() => { if (hover.current && pictures.length) showPop(randomPicture(), 300); }}
                onMouseLeave={hidePop}
            >
                <img src={front} alt={frontAlt} />
            </div>
            <div className="pui-flip-back">
                {pictures.map((src) => (
                    <img
                        key={src}
                        className="pui-flip-thumb"
                        src={src}
                        alt=""
                        loading="lazy"
                        onMouseEnter={() => { if (hover.current) showPop(src, 300); }}
                        onMouseLeave={() => { if (hover.current) hidePop(); }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!hover.current) currentPop() === src ? hidePop() : showPop(src, 300);
                        }}
                    />
                ))}
                {note && <p className="pui-flip-note">{note}</p>}
            </div>
        </div>
    );
}
