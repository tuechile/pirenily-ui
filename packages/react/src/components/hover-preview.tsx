"use client";
import { cloneElement, useRef, type FocusEvent, type MouseEvent, type ReactElement } from "react";
import { canHover } from "./utils";
import { hidePop, showPop } from "./pop-layer";

type Handlers = {
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
};

export interface HoverPreviewProps {
    /** Picture URLs; each new hover shows a different one */
    images: string[];
    /** One element; it receives the hover and focus handlers */
    children: ReactElement<Handlers>;
}

const GRACE = 400;

/** Hovering (or tabbing onto) the child pops one of its pictures up at a random spot on screen */
export function HoverPreview({ images, children }: HoverPreviewProps) {
    const last = useRef(-1);
    const shown = useRef<string | null>(null);
    const leftAt = useRef(0);

    function enter() {
        if (!images.length || !canHover()) return;
        // brushing off the edge and straight back isn't a new hover: keep the same picture
        if (shown.current && Date.now() - leftAt.current < GRACE) return showPop(shown.current);
        let n = Math.floor(Math.random() * images.length);
        if (images.length > 1 && n === last.current) n = (n + 1) % images.length;
        last.current = n;
        shown.current = images[n];
        showPop(images[n]);
    }

    function leave() {
        leftAt.current = Date.now();
        hidePop();
    }

    const p = children.props;
    return cloneElement(children, {
        onMouseEnter: (e: MouseEvent) => { p.onMouseEnter?.(e); enter(); },
        onMouseLeave: (e: MouseEvent) => { p.onMouseLeave?.(e); leave(); },
        onFocus: (e: FocusEvent) => { p.onFocus?.(e); if ((e.target as HTMLElement).matches(":focus-visible")) enter(); },
        onBlur: (e: FocusEvent) => { p.onBlur?.(e); leave(); },
    });
}
