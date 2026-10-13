import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "./utils";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** pill: hairline capsule. glass: frosted, a little brighter. ghost: text only. */
    variant?: "pill" | "glass" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "pill", size = "md", className, type = "button", ...props },
    ref
) {
    return <button ref={ref} type={type} className={cx("pui-btn", `pui-btn--${variant}`, `pui-btn--${size}`, className)} {...props} />;
});
