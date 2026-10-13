import type { Meta, StoryObj } from "@storybook/react";
import "./sb.css";

const meta: Meta = {
    title: "Foundations/Tokens",
    parameters: {
        docs: { description: { component: "Every token is a CSS custom property in `tokens.css`. Override any of them after importing the tokens to retheme." } },
    },
};
export default meta;
type Story = StoryObj;

const swatch = (name: string, note: string) => (
    <div className="sb-swatch" key={name}>
        <i style={{ ["--c" as string]: `var(${name})` }} />
        <b>{note}</b>
        <code>{name}</code>
    </div>
);

export const Colors: Story = {
    render: () => (
        <div className="sb-grid">
            {swatch("--bg", "Page background")}
            {swatch("--accent", "The one accent")}
            {swatch("--highlight", "Pure white")}
            {swatch("--title", "Titles")}
            {swatch("--text-primary", "Strong text")}
            {swatch("--lead", "Lead lines")}
            {swatch("--text-secondary", "Body (case studies)")}
            {swatch("--text", "Body")}
            {swatch("--text-tertiary", "Labels, captions")}
            {swatch("--text-dim", "Quiet text")}
        </div>
    ),
};

export const Glass: Story = {
    name: "Glass & hairlines",
    render: () => (
        <div className="sb-grid">
            {swatch("--glass", "Panel")}
            {swatch("--glass-strong", "Active pill")}
            {swatch("--hairline", "Hairline border")}
            {swatch("--hairline-strong", "Pill border")}
            {swatch("--accent-wash", "Teal wash")}
            {swatch("--accent-line", "Teal line")}
            {swatch("--scrim", "Overlay scrim")}
        </div>
    ),
};

export const Type: Story = {
    render: () => (
        <div className="sb-rows">
            <div className="sb-label"><code>--font-display</code><span style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem" }}>Pirenily</span></div>
            <div className="sb-label"><code>--fs-display</code><span style={{ fontSize: "var(--fs-display)", lineHeight: 1.1 }}>Case-study title</span></div>
            <div className="sb-label"><code>--fs-heading</code><span style={{ fontSize: "var(--fs-heading)" }}>Section heading</span></div>
            <div className="sb-label"><code>--fs-3</code><span style={{ fontSize: "var(--fs-3)", fontStyle: "italic" }}>Italic subtitle</span></div>
            <div className="sb-label"><code>--fs-2</code><span style={{ fontSize: "var(--fs-2)" }}>Body text in Crimson Text</span></div>
            <div className="sb-label"><code>--fs-1</code><span style={{ fontSize: "var(--fs-1)" }}>Small text</span></div>
            <div className="sb-label"><code>--fs-kicker</code><span style={{ fontSize: "var(--fs-kicker)", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--text-tertiary)" }}>Kicker label</span></div>
        </div>
    ),
};

export const Spacing: Story = {
    render: () => (
        <div className="sb-rows">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <div className="sb-label" key={n}><code>--s-{n}</code><div className="sb-bar" style={{ width: `var(--s-${n})` }} /></div>
            ))}
        </div>
    ),
};

export const Radii: Story = {
    render: () => (
        <div className="sb-rows">
            {["--r-sm", "--r-lg", "--r-pill"].map((r) => (
                <div className="sb-label" key={r}><code>{r}</code><div className="sb-box" style={{ borderRadius: `var(${r})` }} /></div>
            ))}
        </div>
    ),
};
