import { useState, type ReactNode } from "react";
import { Kicker } from "@pirenily-ui/react";

/** A shell command with a copy button */
export function Command({ children }: { children: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="d-cmd">
            <code><span className="d-cmd-prompt">$</span> {children}</code>
            <button
                type="button"
                className="d-cmd-copy"
                onClick={() => {
                    navigator.clipboard?.writeText(children);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                }}
            >
                {copied ? "Copied" : "Copy"}
            </button>
        </div>
    );
}

export interface DemoProps {
    id: string;
    name: string;
    description: ReactNode;
    usage: string;
    children: ReactNode;
    /** Let the preview run full width with no frame (for page-level components) */
    bare?: boolean;
}

/** One component: name, install command, live preview, usage */
export function Demo({ id, name, description, usage, children, bare }: DemoProps) {
    return (
        <section className="d-demo" id={id}>
            <div className="d-demo-head">
                <Kicker accent>{id}</Kicker>
                <h2>{name}</h2>
            </div>
            <p className="d-note">{description}</p>
            <Command>{`npx pirenily-ui add ${id}`}</Command>
            <div className={bare ? "d-stage d-stage--bare" : "d-stage"}>{children}</div>
            <details className="d-usage">
                <summary>Usage</summary>
                <pre><code>{usage.trim()}</code></pre>
            </details>
        </section>
    );
}

export const img = (name: string) => `./assets/demo/${name}.jpg`;
export const photos = ["salzburg", "bridge", "cong", "beach", "pose", "blackswan"].map(img);
