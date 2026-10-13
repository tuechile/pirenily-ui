"use client";
import { useEffect, useState, type FormEvent } from "react";
import { cx } from "./utils";
import "./finder.css";

export interface FinderProps {
    /** The placeholder cycles through these */
    names?: string[];
    /** ms per name */
    interval?: number;
    /** Called on Enter with what was typed (or the name showing, if empty) */
    onSearch?: (query: string) => void;
    name?: string;
    className?: string;
    "aria-label"?: string;
}

/** The giant BHN Cinema search field from the landing page */
export function Finder({
    names = ["Pirenily", "Chi Le", "Iron Pig", "Emily", "Chi Bell"],
    interval = 400,
    onSearch,
    name = "finder",
    className,
    "aria-label": ariaLabel = "Search",
}: FinderProps) {
    const [i, setI] = useState(0);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const t = setInterval(() => setI((n) => (n + 1) % names.length), interval);
        return () => clearInterval(t);
    }, [names.length, interval]);

    function submit(e: FormEvent) {
        if (!onSearch) return; // no handler: let the form post normally
        e.preventDefault();
        onSearch(query.trim() || names[i]);
    }

    return (
        <form className={cx("pui-finder", className)} method="post" onSubmit={submit}>
            <input
                className="pui-finder-input"
                type="text"
                name={name}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={names[i]}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="go"
                aria-label={ariaLabel}
            />
        </form>
    );
}
