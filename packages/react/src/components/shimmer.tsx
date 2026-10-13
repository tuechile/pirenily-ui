import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cx } from "./utils";
import "./shimmer.css";

/** Text that shimmers teal and white on hover. Use sparingly: one per page. */
export function Shimmer({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
    return <span className={cx("pui-shimmer", className)} {...props} />;
}

/** An unframed image whose edges dissolve into the black */
export function FeatherImage({ className, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return <img className={cx("pui-feather", className)} alt={alt} {...props} />;
}
