import type { HTMLAttributes, ReactNode } from "react";
import { Tag } from "./tag";
import { cx } from "./utils";
import "./card.css";

export interface CardProps {
    title: ReactNode;
    /** Image URL. Leave out for a placeholder frame. */
    image?: string;
    imageAlt?: string;
    /** Text in the placeholder frame; an empty string gives a solid black frame */
    placeholder?: string;
    /** Crop the image to 16:9 so cards in a row line up */
    cover?: boolean;
    tags?: string[];
    subtitle?: ReactNode;
    date?: ReactNode;
    description?: ReactNode;
    /** Link cards blur on hover; cards without href stay still */
    href?: string;
    /** Opens in a new tab */
    external?: boolean;
    className?: string;
}

/** Screenshot on top, italic title with tag chips, subtitle + date, a one-line description */
export function Card({
    title, image, imageAlt = "", placeholder = "Coming soon", cover, tags = [],
    subtitle, date, description, href, external, className,
}: CardProps) {
    const body = (
        <>
            {image ? (
                <img className={cx("pui-card-img", cover && "pui-card-img--cover")} src={image} alt={imageAlt} loading="lazy" />
            ) : (
                <div className={cx("pui-card-img", "pui-card-placeholder", !placeholder && "pui-card-placeholder--blank")}>{placeholder}</div>
            )}
            <div className="pui-card-meta">
                <div className="pui-card-namebox">
                    <div className="pui-card-title">{title}</div>
                    <div className="pui-card-tags">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                </div>
                <div className="pui-card-subrow">
                    <div className="pui-card-sub">{subtitle}</div>
                    {date && <div className="pui-card-date">{date}</div>}
                </div>
                {description && <div className="pui-card-desc">{description}</div>}
            </div>
        </>
    );

    if (href) {
        return (
            <a className={cx("pui-card", className)} href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                {body}
            </a>
        );
    }
    return <div className={cx("pui-card", className)}>{body}</div>;
}

/** Two-up grid. Neighbouring cards share subgrid rows so they line up and end level. */
export function CardGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx("pui-card-grid", className)} {...props} />;
}
