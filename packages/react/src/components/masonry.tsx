import type { HTMLAttributes } from "react";
import { cx } from "./utils";
import "./masonry.css";

export interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
    /** Keep each image's own aspect ratio instead of cropping to 4:3 */
    natural?: boolean;
}

/** Three columns, two on tablets, one on phones. Put images (or LightboxImages) straight inside. */
export function Masonry({ natural, className, ...props }: MasonryProps) {
    return <div className={cx("pui-masonry", natural && "pui-masonry--natural", className)} {...props} />;
}
