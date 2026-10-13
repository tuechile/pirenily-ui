import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./tag.css";

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return <span className={cx("pui-tag", className)} {...props} />;
}

export function TagRow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx("pui-tag-row", className)} {...props} />;
}
