import type { ReactNode } from "react";
import { cx } from "./utils";
import "./callout.css";

export interface CalloutProps {
    title: ReactNode;
    /** Becomes a numbered list: 01, 02, 03 */
    points?: ReactNode[];
    children?: ReactNode;
    className?: string;
}

/** A labelled glass panel */
export function Callout({ title, points, children, className }: CalloutProps) {
    return (
        <div className={cx("pui-callout", className)}>
            <h3 className="pui-callout-label">{title}</h3>
            {children && <div className="pui-callout-body">{children}</div>}
            {points && points.length > 0 && (
                <ol className="pui-points">
                    {points.map((p, i) => <li key={i}>{p}</li>)}
                </ol>
            )}
        </div>
    );
}

export interface StatsProps {
    items: { value: ReactNode; label: ReactNode }[];
    title?: ReactNode;
    className?: string;
}

/** Big numbers over hairlines */
export function Stats({ items, title, className }: StatsProps) {
    return (
        <div className={className}>
            {title && <h3 className="pui-callout-label">{title}</h3>}
            <dl className="pui-stats">
                {items.map((s, i) => (
                    <div key={i}>
                        <dt>{s.value}</dt>
                        <dd>{s.label}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
