import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./typography.css";

/** Small uppercase label for kickers, eyebrows and panel titles */
export function Kicker({ className, accent, ...props }: HTMLAttributes<HTMLParagraphElement> & { accent?: boolean }) {
    return <p className={cx("pui-kicker", accent && "pui-kicker--accent", className)} {...props} />;
}

/** Big BHN Cinema page heading */
export function PageTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return <h1 className={cx("pui-page-title", className)} {...props} />;
}

/** The italic line under a page title */
export function PageNote({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cx("pui-page-note", className)} {...props} />;
}
