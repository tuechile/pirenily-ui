import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Button, FeatherImage, FlipCard, HoverPreview, LightboxImage, ScrollMouse, Shimmer, ViewToggle, crackle,
} from "@pirenily-ui/react";
import "./sb.css";

const photos = ["salzburg", "bridge", "cong", "beach", "pose", "blackswan"].map((n) => `./assets/demo/${n}.jpg`);

const meta: Meta = {
    title: "Foundations/Effects",
    parameters: {
        docs: {
            description: {
                component:
                    "Every motion and hover effect in the kit, one at a time, with its name and the components that use it. " +
                    "House rules: hover is a soft blur, not a color change (only controls turn teal); nothing fades in or out; one fast-out curve, no bounce. " +
                    "`prefers-reduced-motion` turns all of these off.",
            },
        },
    },
};
export default meta;
type Story = StoryObj;

const usedBy = (text: string) => ({ docs: { description: { story: text } } });

export const BlurHover: Story = {
    name: "Blur hover",
    parameters: usedBy("**The house hover.** The element goes soft (`filter: blur(1px)`) instead of changing color. Token: `--hover-blur`. Used by: Navbar links and logo, link Cards, Footer links, ContactLinks, CtaLink, CasePager, the case-study back link, ScrollMouse, HoverPreview tiles."),
    render: () => (
        <div className="sb-effect">
            <a className="sb-target sb-blur" href="#blur">Hover me</a>
            <span className="sb-hint">goes soft, stays the same color</span>
        </div>
    ),
};

export const TealHover: Story = {
    name: "Teal hover (controls only)",
    parameters: usedBy("**The one exception to blur.** Controls you press turn teal on hover so you know they're clickable. Token: `--accent`. Used by: Button (pill, glass), ViewToggle options, SideTabs."),
    render: () => (
        <div className="sb-effect">
            <Button>Hover me</Button>
            <span className="sb-hint">text turns teal</span>
        </div>
    ),
};

export const PressShrink: Story = {
    name: "Press shrink",
    parameters: usedBy("**Click feedback.** Pressing a control shrinks it to 97% for an instant. Token: `--press`. Used by: Button, ViewToggle options, SideTabs."),
    render: () => (
        <div className="sb-effect">
            <Button size="lg">Press and hold</Button>
            <span className="sb-hint">shrinks slightly while held</span>
        </div>
    ),
};

export const SlidingPill: Story = {
    name: "Sliding pill",
    parameters: usedBy("**A frosted pill slides behind the active option.** Duration `--dur-2`, curve `--ease-out`. Used by: ViewToggle only."),
    render: () => (
        <div className="sb-effect">
            <ViewToggle options={[{ value: "a", label: "Selected" }, { value: "b", label: "Brand" }, { value: "c", label: "All" }]} />
            <span className="sb-hint">click the options</span>
        </div>
    ),
};

function EdgeSlideDemo() {
    const [shown, setShown] = useState(false);
    return (
        <div className="sb-effect">
            <div className="sb-wipe-stage" style={{ height: 120 }}>
                <div
                    className="pui-side-tabs"
                    style={{
                        position: "absolute", left: 0, top: "50%",
                        transform: `translateY(-50%) translateX(${shown ? "0" : "-110%"})`,
                        transition: "transform var(--dur-3) var(--ease-out)",
                    }}
                >
                    <button type="button" className="pui-side-tab" aria-pressed="true">Code</button>
                    <button type="button" className="pui-side-tab" aria-pressed="false">UI/UX</button>
                </div>
            </div>
            <Button onClick={() => setShown((s) => !s)}>{shown ? "Slide out" : "Slide in"}</Button>
        </div>
    );
}

export const EdgeSlide: Story = {
    name: "Slide in from the edge",
    parameters: usedBy("**Tabs slide in from the screen's edge; they never fade.** Duration `--dur-3`. Used by: SideTabs (with `show`)."),
    render: () => <EdgeSlideDemo />,
};

function WipeDemo() {
    const [open, setOpen] = useState(false);
    return (
        <div className="sb-effect">
            <div className="sb-wipe-stage">
                <div className={open ? "sb-wipe is-open" : "sb-wipe"}>About<br />Design<br />Play</div>
            </div>
            <Button onClick={() => setOpen((o) => !o)}>{open ? "Close" : "Open"} the menu</Button>
        </div>
    );
}

export const CircleWipe: Story = {
    name: "Circle wipe",
    parameters: usedBy("**The phone menu opens as a growing circle from the “=” button.** 700ms, curve `--ease-wipe`. Used by: Navbar, below 666px wide. See Essentials › Navbar › Phone for the real one."),
    render: () => <WipeDemo />,
};

export const RailGlow: Story = {
    name: "Rail glow",
    parameters: usedBy("**Rings on a line; passed sections get a white ring, the current one glows white with a teal halo.** Swells in over `--dur-glow`. Tokens: `--rail-*`. Used by: CaseStudy's left rail."),
    render: () => (
        <ul className="sb-rings">
            <li><span /><small>Upcoming</small></li>
            <li className="is-passed"><span /><small>Passed</small></li>
            <li className="is-current"><span /><small>Current</small></li>
        </ul>
    ),
};

export const GlowingBar: Story = {
    name: "Glowing progress bar",
    parameters: usedBy("**A teal-white gradient that drifts along a bar, with a soft glow.** Used by: ReadingProgress (fixed to the top of the page)."),
    render: () => <div className="sb-progress"><div className="pui-progress-bar" /></div>,
};

export const PopUp: Story = {
    name: "Pop-up at a random spot",
    parameters: usedBy("**A picture appears somewhere random on screen, instantly, and vanishes when you leave.** A different picture each time. Mouse only. Used by: HoverPreview, and the front and back of FlipCard."),
    render: () => (
        <div className="sb-effect">
            <HoverPreview images={photos}>
                <a className="sb-target sb-blur" href="#pop">Hover me</a>
            </HoverPreview>
            <span className="sb-hint">watch the whole screen</span>
        </div>
    ),
};

export const Flip: Story = {
    name: "3D flip",
    parameters: usedBy("**The card turns over in 3D to show its back.** 700ms, `--ease-out`. Used by: FlipCard only."),
    render: () => <FlipCard front={photos[4]} pictures={photos} note="Click to flip back." />,
};

export const GrayscaleToColor: Story = {
    name: "Grayscale to color",
    parameters: usedBy("**Zoomable images sit slightly gray and lift into full color on hover**, with a zoom-in cursor. Used by: LightboxImage, CaseMedia."),
    render: () => (
        <div style={{ width: 280 }}>
            <LightboxImage src={photos[0]} alt="" />
        </div>
    ),
};

export const ShimmerText: Story = {
    name: "Shimmer",
    parameters: usedBy("**Text fills with a moving teal-white gradient on hover.** Use sparingly, one per page. Used by: Shimmer."),
    render: () => <span style={{ fontSize: "1.4rem", fontStyle: "italic", color: "var(--text)" }}><Shimmer>Hover this line</Shimmer></span>,
};

export const Feather: Story = {
    name: "Feathered edges",
    parameters: usedBy("**The image dissolves into the black instead of ending on a hard edge.** Tokens: `--feather`, `--feather-mask`. Used by: FeatherImage, the FlipCard front and back."),
    render: () => <FeatherImage src={photos[0]} style={{ width: 320 }} />,
};

export const MouseWheel: Story = {
    name: "Scroll cue",
    parameters: usedBy("**A mouse outline whose teal wheel slides down and snaps back** (no fade on the return). Used by: ScrollMouse."),
    render: () => <ScrollMouse href="#cue" />,
};

export const Crackle: Story = {
    name: "Fire crackle (sound)",
    parameters: usedBy("**A tiny synthesized fire crackle.** Not visual: it's a sound, made with Web Audio. Used by: FireCrackle / useFireCrackle (on every click) or `crackle()` (once)."),
    render: () => (
        <div className="sb-effect">
            <Button onClick={() => crackle()}>Play one crackle</Button>
            <span className="sb-hint">turn your sound on</span>
        </div>
    ),
};

export const NoFade: Story = {
    name: "Instant, no fade",
    parameters: usedBy("**Overlays appear and disappear in a single frame.** This is deliberate, not a missing animation. Used by: Loader, Lightbox, HoverPreview pop-ups."),
    render: () => {
        function Demo() {
            const [on, setOn] = useState(false);
            return (
                <div className="sb-effect">
                    <Button onClick={() => setOn((o) => !o)}>Toggle</Button>
                    {on && <div className="sb-target">Here, instantly</div>}
                </div>
            );
        }
        return <Demo />;
    },
};
