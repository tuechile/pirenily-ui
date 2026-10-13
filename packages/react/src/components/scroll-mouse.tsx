import type { AnchorHTMLAttributes } from "react";
import { cx } from "./utils";
import "./scroll-mouse.css";

/** A mouse outline whose teal wheel slides down, then snaps back. Point href at what's below. */
export function ScrollMouse({ className, "aria-label": label = "Scroll down", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <a className={cx("pui-scroll-mouse", className)} aria-label={label} {...props} />;
}
