import { useState } from "react";
import {
    Button, CaseBlock, CaseFigure, CaseHero, CaseMedia, CasePager, CaseRow, CaseSection, CaseStudy,
    Callout, CtaLink, FeatherImage, Finder, FireCrackle, FlipCard, HoverPreview, Rollout, ScrollMouse, Shimmer, Stats, crackle,
} from "@pirenily-ui/react";
import { Demo, img, photos } from "./parts";

function FinderDemo() {
    const [last, setLast] = useState<string | null>(null);
    return (
        <Demo id="finder" name="Finder" description="The giant search field from the pirenily.com landing page. The placeholder cycles through names; on the site, Enter routes a keyword to a page, or a random one. Without onSearch the form posts normally."
            usage={`
import { Finder } from "@/components/pirenily/finder";

<Finder
    names={["Pirenily", "Chi Le", "Iron Pig", "Emily", "Chi Bell"]}
    onSearch={(q) => router.push(routeFor(q))}
/>`}>
            <Finder onSearch={setLast} />
            <p className="d-note d-center-text">{last ? `You searched: ${last}` : "Type something and press Enter."}</p>
        </Demo>
    );
}

function HoverPreviewDemo() {
    return (
        <Demo id="hover-preview" name="Hover preview" description="Hover (or tab onto) an element and one of its pictures pops up at a random spot on screen, a different one each time. Instant, no fade, gone when you leave. Mouse only; nothing happens on touch."
            usage={`
import { HoverPreview } from "@/components/pirenily/hover-preview";

<HoverPreview images={["/a.jpg", "/b.jpg", "/c.jpg"]}>
    <a href="/merch">Merch</a>
</HoverPreview>`}>
            <div className="d-two">
                <HoverPreview images={photos.slice(0, 3)}>
                    <a className="d-hover-tile" href="#hover-preview">Travel <span>hover me</span></a>
                </HoverPreview>
                <HoverPreview images={photos.slice(3)}>
                    <a className="d-hover-tile" href="#hover-preview">Portraits <span>hover me</span></a>
                </HoverPreview>
            </div>
        </Demo>
    );
}

function FlipCardDemo() {
    return (
        <Demo id="flip-card" name="Flip card" description="The About-page headshot. Hover the front for a random picture; click to flip to a feathered grid of small ones, each of which pops up when hovered (or tapped on a phone)."
            usage={`
import { FlipCard } from "@/components/pirenily/flip-card";

<FlipCard
    front="/headshot.jpg"
    pictures={["/a.jpg", "/b.jpg", "/c.jpg"]}
    note="Find the puzzles on here and you will know :)"
/>`}>
            <FlipCard className="d-center" front={img("pose")} frontAlt="Portrait" pictures={photos} note="Click again to flip back." />
        </Demo>
    );
}

function ScrollMouseDemo() {
    return (
        <Demo id="scroll-mouse" name="Scroll mouse" description="The scroll cue at the bottom of the landing page: the teal wheel slides down, then snaps back."
            usage={`
import { ScrollMouse } from "@/components/pirenily/scroll-mouse";

<ScrollMouse href="#portfolio" aria-label="Scroll down to see my portfolio" />`}>
            <ScrollMouse className="d-center" href="#case-study" />
        </Demo>
    );
}

function FireCrackleDemo() {
    const [on, setOn] = useState(false);
    return (
        <Demo id="fire-crackle" name="Fire crackle" description="A tiny fire crackle on every click of something interactive, synthesized with Web Audio, so there's no sound file. Off here until you turn it on."
            usage={`
import { FireCrackle } from "@/components/pirenily/fire-crackle";

// once, near the root of your app
<FireCrackle />

// or a single crackle
crackle();`}>
            <div className="d-row">
                <Button variant={on ? "glass" : "pill"} onClick={() => setOn((o) => !o)}>{on ? "Crackle on: click anything" : "Turn the crackle on"}</Button>
                <Button variant="ghost" onClick={() => crackle()}>Just once</Button>
            </div>
            <FireCrackle enabled={on} />
        </Demo>
    );
}

function ShimmerDemo() {
    return (
        <Demo id="shimmer" name="Shimmer & feather" description="Text that shimmers teal and white on hover (the “Commission me” link), and images whose edges dissolve into the black."
            usage={`
import { FeatherImage, Shimmer } from "@/components/pirenily/shimmer";

<a href="/about"><Shimmer>Commission me on Instagram!</Shimmer></a>
<FeatherImage src="/headshot.jpg" />`}>
            <div className="d-row" style={{ justifyContent: "space-around" }}>
                <a href="#shimmer" className="d-plain-link"><Shimmer>Commission me on Instagram!</Shimmer></a>
                <FeatherImage src={img("salzburg")} style={{ width: 240 }} />
            </div>
        </Demo>
    );
}

function CaseStudyDemo() {
    return (
        <Demo id="case-study" name="Case study" bare description="How every case study on pirenily.com reads: a sticky rail of rings on the left that fills as you scroll (the current section glows teal), then a hero with a tinted facts grid, numbered sections, auto-numbered figures, panels, and a pager. Below 1000px the rail hides. Scroll through the example below."
            usage={`
import { CaseHero, CaseSection, CaseStudy, CaseFigure, CaseMedia, CasePager } from "@/components/pirenily/case-study";

<CaseStudy backHref="/design">
    <CaseHero
        title="Redesigning how a team finds things"
        meta="Feb – May 2026"
        tags={["Figma", "Research"]}
        facts={[{ label: "Role", values: ["Product designer"] }]}
    />
    <CaseSection heading="Overview" lead="The tool worked, but nobody could find anything">
        <p>Prose goes here.</p>
    </CaseSection>
    <CaseFigure caption="Numbered automatically">
        <CaseMedia src="/cover.jpg" />
    </CaseFigure>
    <CasePager next={{ href: "/merch", label: "Merch" }} />
</CaseStudy>`}>
            <CaseStudy backHref="#signature" backLabel="← Signature" railTop={150}>
                <CaseHero
                    title="Redesigning how a team finds things"
                    index="Example case study"
                    meta="Feb – May 2026"
                    subtitle="A template showing every case-study block: rail, hero, facts, numbered sections, figures, panels and the pager."
                    tags={["Figma", "User research", "Design system"]}
                    facts={[
                        { label: "Role", values: ["Product designer"] },
                        { label: "Team", values: ["4 designers", "3 engineers"] },
                        { label: "Timeline", values: ["12 weeks"] },
                        { label: "Tools", values: ["Figma", "FigJam"] },
                    ]}
                />
                <CaseFigure caption="Captions in a CaseFigure are numbered automatically.">
                    <CaseMedia src={img("salzburg")} alt="Cover" />
                </CaseFigure>
                <CaseSection heading="Overview" lead="The tool worked, but nobody could find anything in it">
                    <p>Body copy sits in <strong>grey Crimson Text</strong> at a comfortable measure. Links inside prose get a <a href="#case-study">hairline underline</a>.</p>
                    <p>Watch the rail on the left as you scroll: the line fills ring to ring.</p>
                    <CaseBlock><Callout title="Goals" points={["Find any resource in under ten seconds", "Work on unreliable connections", "Keep the existing data model"]} /></CaseBlock>
                </CaseSection>
                <CaseSection heading="Research" lead="Twelve interviews, three patterns">
                    <CaseBlock>
                        <CaseRow layout="flow">
                            <CaseMedia src={img("bridge")} size="sm" alt="" />
                            <div>
                                <h3>Coordinators keep their own lists</h3>
                                <p>A flow row gives the text column more room than the picture.</p>
                            </div>
                        </CaseRow>
                    </CaseBlock>
                    <CaseFigure caption="A three-up row with a placeholder cell.">
                        <CaseRow layout="3">
                            <CaseMedia src={img("cong")} alt="" />
                            <CaseMedia src={img("beach")} alt="" />
                            <CaseMedia />
                        </CaseRow>
                    </CaseFigure>
                </CaseSection>
                <CaseSection heading="Iteration" lead="From three menus to one search bar">
                    <CaseBlock>
                        <CaseRow>
                            <Callout title="Before" points={["Nested menus", "Exact-title search"]} />
                            <Callout title="After" points={["One search bar", "Fuzzy matching"]} />
                        </CaseRow>
                    </CaseBlock>
                    <CaseBlock>
                        <Rollout phases={[
                            { label: "Phase 1", title: "Pilot", description: "One clinic." },
                            { label: "Phase 2", title: "Region", description: "Coordinator feedback." },
                            { label: "Phase 3", title: "Everywhere", description: "Default for all sites." },
                        ]} />
                    </CaseBlock>
                </CaseSection>
                <CaseSection heading="Results" lead="Faster, and people actually use it">
                    <CaseBlock>
                        <Stats items={[
                            { value: "3×", label: "faster to find a resource" },
                            { value: "92%", label: "of testers finished every task" },
                            { value: "40+", label: "screens handed off" },
                        ]} />
                    </CaseBlock>
                    <CtaLink href="https://github.com/tuechile/pirenily" label="See the site's source" />
                </CaseSection>
                <CasePager prev={{ href: "#signature", label: "Signature" }} next={{ href: "#essentials", label: "Essentials" }} />
            </CaseStudy>
        </Demo>
    );
}

export function Signature() {
    return (
        <>
            <FinderDemo />
            <HoverPreviewDemo />
            <FlipCardDemo />
            <ScrollMouseDemo />
            <FireCrackleDemo />
            <ShimmerDemo />
            <CaseStudyDemo />
        </>
    );
}

export const SIGNATURE_IDS = ["finder", "hover-preview", "flip-card", "scroll-mouse", "fire-crackle", "shimmer", "case-study"];
