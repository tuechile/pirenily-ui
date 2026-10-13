import { useState } from "react";
import {
    Accordion, Button, Callout, Card, CardGrid, ContactLinks, Footer, Kicker, LightboxImage,
    Loader, Masonry, Navbar, PageNote, PageTitle, ReadingProgress, SideTabs, Stats, Tag, TagRow, ViewToggle,
} from "@pirenily-ui/react";
import { Demo, img, photos } from "./parts";

function ButtonDemo() {
    return (
        <Demo id="button" name="Button" description="An italic serif capsule. Hover turns it teal, a press shrinks it a touch. Pill, glass and ghost variants in three sizes."
            usage={`
import { Button } from "@/components/pirenily/button";

<Button>Pill</Button>
<Button variant="glass" size="lg">Glass</Button>
<Button variant="ghost" size="sm">Ghost</Button>`}>
            <div className="d-row">
                <Button>Pill</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="ghost">Ghost</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
            </div>
        </Demo>
    );
}

function TagDemo() {
    return (
        <Demo id="tag" name="Tag" description="The one chip style used for every tag on the site."
            usage={`
import { Tag, TagRow } from "@/components/pirenily/tag";

<TagRow>
    <Tag>Python</Tag>
    <Tag>Flask</Tag>
</TagRow>`}>
            <TagRow>
                {["Python", "Flask", "Jinja2", "Figma", "three.js", "Arduino"].map((t) => <Tag key={t}>{t}</Tag>)}
            </TagRow>
        </Demo>
    );
}

function TypographyDemo() {
    return (
        <Demo id="typography" name="Typography" description="BHN Cinema only for big page titles. Crimson Text for everything else: an italic note under the title, small uppercase kickers for labels."
            usage={`
import { Kicker, PageNote, PageTitle } from "@/components/pirenily/typography";

<PageTitle>Graphic Design</PageTitle>
<PageNote>Selected work, newest first.</PageNote>
<Kicker>Case study</Kicker>`}>
            <PageTitle style={{ margin: "0 0 2rem" }}>Graphic Design</PageTitle>
            <PageNote style={{ margin: "0 auto 1.5rem" }}>Selected work, newest first. <a href="#typography">See everything</a></PageNote>
            <div className="d-row" style={{ justifyContent: "center" }}>
                <Kicker>Case study</Kicker>
                <Kicker accent>01 · Accent</Kicker>
            </div>
        </Demo>
    );
}

const work = [
    { name: "HackHarvard", views: ["selected", "brand"] },
    { name: "Merch", views: ["selected"] },
    { name: "Highlander", views: ["brand"] },
    { name: "Recit", views: ["brand"] },
    { name: "Olympics", views: [] },
    { name: "Portal", views: ["selected"] },
];

function ViewToggleDemo() {
    const [view, setView] = useState("selected");
    return (
        <Demo id="view-toggle" name="View toggle" description="A segmented control. The frosted pill slides behind whichever option is on. It's the switch at the top of this page, too."
            usage={`
import { ViewToggle } from "@/components/pirenily/view-toggle";

const [view, setView] = useState("selected");

<ViewToggle
    value={view}
    onValueChange={setView}
    options={[
        { value: "selected", label: "Selected" },
        { value: "brand", label: "Brand" },
        { value: "all", label: "All" },
    ]}
/>`}>
            <ViewToggle
                className="d-center"
                value={view}
                onValueChange={setView}
                options={[{ value: "selected", label: "Selected" }, { value: "brand", label: "Brand" }, { value: "all", label: "All" }]}
            />
            <div className="d-tiles">
                {work.filter((w) => view === "all" || w.views.includes(view)).map((w) => <div key={w.name}>{w.name}</div>)}
            </div>
        </Demo>
    );
}

function SideTabsDemo() {
    const [tab, setTab] = useState("code");
    const [fixed, setFixed] = useState(false);
    return (
        <Demo id="side-tabs" name="Side tabs" description="Capsules attached to the left edge of the screen. They slide in when show turns on and never fade. Here inline; switch on the fixed version to see it on the edge."
            usage={`
import { SideTabs } from "@/components/pirenily/side-tabs";

<SideTabs
    show={reachedProjects}
    value={tab}
    onValueChange={setTab}
    tabs={[{ value: "code", label: "Code" }, { value: "uiux", label: "UI/UX" }]}
/>`}>
            <div className="d-row" style={{ alignItems: "flex-start" }}>
                <SideTabs position="inline" value={tab} onValueChange={setTab} tabs={[{ value: "code", label: "Code" }, { value: "uiux", label: "UI/UX" }]} />
                <p className="d-note" style={{ margin: 0 }}>Showing {tab === "code" ? "code" : "UI/UX"} projects.</p>
                <Button size="sm" onClick={() => setFixed((f) => !f)} style={{ marginLeft: "auto" }}>{fixed ? "Hide" : "Show"} on the edge</Button>
            </div>
            <SideTabs show={fixed} value={tab} onValueChange={setTab} tabs={[{ value: "code", label: "Code" }, { value: "uiux", label: "UI/UX" }]} />
        </Demo>
    );
}

function AccordionDemo() {
    return (
        <Demo id="accordion" name="Accordion" description="A receipt that folds away."
            usage={`
import { Accordion } from "@/components/pirenily/accordion";

<Accordion title="What's this made with?">
    React and plain CSS. No Tailwind, no icon library.
</Accordion>`}>
            <Accordion title="What's this made with?">React and plain CSS custom properties. No Tailwind, no icon libraries, no animation library.</Accordion>
            <Accordion title="Can I change the accent?">Override <code>--accent</code> (and the <code>--accent-*</code> and <code>--rail-glow*</code> tokens) after importing the tokens.</Accordion>
        </Demo>
    );
}

function CardDemo() {
    return (
        <Demo id="card" name="Card" description="The project card. In a CardGrid, neighbours share rows so titles, tags and blurbs line up. Link cards blur on hover; cards without a link stay still. On phones the meta reorders: title, subtitle, tags, blurb, date."
            usage={`
import { Card, CardGrid } from "@/components/pirenily/card";

<CardGrid>
    <Card
        href="https://github.com/tuechile/ascii-simple-avatar"
        external
        image="/ascii.webp"
        title="ASCII Avatar"
        tags={["Python", "HTML", "Docker"]}
        subtitle="Inspired by my CS1710 project"
        date="May 2026"
        description="A cute little fashion app."
    />
    <Card title="Backtiming" placeholder="Coming soon" />
</CardGrid>`}>
            <CardGrid>
                <Card href="https://github.com/tuechile/ascii-simple-avatar" external image={img("salzburg")} title="ASCII Avatar" tags={["Python", "HTML", "Docker"]}
                    subtitle="Inspired by my CS1710 project" date="May 2026" description="A cute little fashion app that dresses you up as a tiny ASCII avatar." />
                <Card image={img("bridge")} title="AeroTone" tags={["Arduino", "C++", "Embedded Systems", "FSR Sensors"]}
                    subtitle="No link, so it doesn't blur" date="Apr–May 2026" description="A wearable synth: a glove that maps finger pressure to pitch." />
                <Card href="#card" title="Backtiming" subtitle="Placeholder frame" date="Coming soon" description="Works backwards from each calendar event." />
                <Card title="Pirenily" placeholder="" tags={["Flask", "CSS"]} subtitle="Blank frame until the image is ready" date="Dec 2024" description='placeholder=""' />
            </CardGrid>
        </Demo>
    );
}

function LightboxDemo() {
    return (
        <Demo id="lightbox" name="Lightbox" description="Click a picture to see it full size. The ×, a click outside, or Esc closes it. Use LightboxImage, or drive Lightbox yourself."
            usage={`
import { Lightbox, LightboxImage } from "@/components/pirenily/lightbox";

<LightboxImage src="/salzburg.jpg" alt="Salzburg" />

// or control it
<Lightbox src={open} alt="" onClose={() => setOpen(null)} />`}>
            <div className="d-trio">
                {photos.slice(0, 3).map((src) => <LightboxImage key={src} src={src} alt="" />)}
            </div>
        </Demo>
    );
}

function MasonryDemo() {
    return (
        <Demo id="masonry" name="Masonry" description="Three columns, two on tablets, one on phones. Images crop to 4:3 unless you pass natural."
            usage={`
import { Masonry } from "@/components/pirenily/masonry";

<Masonry>
    {photos.map((src) => <LightboxImage key={src} src={src} />)}
</Masonry>`}>
            <Masonry>
                {photos.map((src) => <LightboxImage key={src} src={src} alt="" />)}
            </Masonry>
        </Demo>
    );
}

function NavbarDemo() {
    return (
        <Demo id="navbar" name="Navbar" bare description="Sticky, fading out of the black, with the logo in BHN Cinema. On phones a “=” wipes open a full-screen list as a circle from the button (this page's own nav does it; try a narrow window). Pass linkAs to use your router's link."
            usage={`
import { Navbar } from "@/components/pirenily/navbar";
import Link from "next/link";

<Navbar
    brand="Pirenily"
    linkAs={Link}
    links={[
        { href: "/about", label: "About" },
        { href: "/design", label: "Design", current: true },
        { href: "/play", label: "Play" },
    ]}
/>`}>
            <div className="d-nav-frame">
                <Navbar brandHref="#navbar" links={[
                    { href: "#navbar-about", label: "About" },
                    { href: "#navbar-design", label: "Design", current: true },
                    { href: "#navbar-play", label: "Play" },
                    { href: "#navbar-projects", label: "Projects" },
                ]} />
            </div>
        </Demo>
    );
}

function FooterDemo() {
    return (
        <Demo id="footer" name="Footer" description="A hairline on top, italic grey text, teal links that blur. ContactLinks are grey icons that blur instead of lighting up."
            usage={`
import { ContactLinks, Footer } from "@/components/pirenily/footer";

<Footer meta="Chi (Tue) Le | Pirenily | Updated Oct 2026">
    <ContactLinks links={[
        { href: "https://instagram.com/…", label: "Instagram", icon: "/ig.png" },
        { href: "mailto:…", label: "Email", icon: "/mail.png" },
    ]} />
</Footer>`}>
            <Footer meta="Chi (Tue) Le | Pirenily | Updated Oct 2026" style={{ margin: 0 }}>
                Hate my website? Open an issue at <a href="https://github.com/tuechile/pirenily/issues" target="_blank" rel="noopener">github.com/tuechile/pirenily</a>
                <ContactLinks className="d-contacts" links={[
                    { href: "https://www.instagram.com/pju_irza/", label: "Instagram", icon: "./assets/icons/ig.png" },
                    { href: "https://www.linkedin.com/in/chi-tue-le-214705320/", label: "LinkedIn", icon: "./assets/icons/linkedin.png" },
                    { href: "https://github.com/tuechile", label: "GitHub", icon: "./assets/icons/github.webp" },
                ]} />
            </Footer>
        </Demo>
    );
}

function CalloutDemo() {
    return (
        <Demo id="callout" name="Callout & Stats" description="A labelled glass panel; points become a numbered 01, 02, 03 list. Stats sit big numbers over hairlines."
            usage={`
import { Callout, Stats } from "@/components/pirenily/callout";

<Callout title="Goals" points={["Find anything in ten seconds", "Work offline"]} />

<Stats items={[
    { value: "3×", label: "faster to find a resource" },
    { value: "12", label: "weeks" },
]} />`}>
            <div className="d-two">
                <Callout title="Before" points={["Resources buried three menus deep", "No offline mode", "Search matched exact titles only"]} />
                <Callout title="After" points={["One search bar, fuzzy matching", "Works on a bad connection", "Saved lists per coordinator"]} />
            </div>
            <Stats title="Results" className="d-gap" items={[
                { value: "12", label: "weeks, start to handoff" },
                { value: "3×", label: "faster to find a resource" },
                { value: "40+", label: "screens in Figma" },
            ]} />
        </Demo>
    );
}

function ProgressDemo() {
    const [on, setOn] = useState(false);
    return (
        <Demo id="reading-progress" name="Reading progress" description="A teal glowing bar across the very top that fills as the page scrolls."
            usage={`
import { ReadingProgress } from "@/components/pirenily/reading-progress";

<ReadingProgress />`}>
            <Button onClick={() => setOn((o) => !o)}>{on ? "Hide" : "Show"} it on this page</Button>
            {on && <ReadingProgress />}
        </Demo>
    );
}

function LoaderDemo() {
    const [loading, setLoading] = useState(false);
    const [gif, setGif] = useState(true);
    function run(withGif: boolean) {
        setGif(withGif);
        setLoading(true);
        setTimeout(() => setLoading(false), 1400);
    }
    return (
        <Demo id="loader" name="Loader" description="A full-screen loading overlay that only appears if loading takes longer than delay (200ms by default), so quick loads never flash. Bring your own GIF, or get a hairline teal ring."
            usage={`
import { Loader } from "@/components/pirenily/loader";

<Loader visible={isLoading} src="/loader.gif" />`}>
            <div className="d-row">
                <Button onClick={() => run(true)}>With the Pirenily GIF</Button>
                <Button variant="ghost" onClick={() => run(false)}>Default ring</Button>
            </div>
            <Loader visible={loading} src={gif ? "./assets/loader.gif" : undefined} />
        </Demo>
    );
}

export function Essentials() {
    return (
        <>
            <ButtonDemo />
            <TagDemo />
            <TypographyDemo />
            <ViewToggleDemo />
            <SideTabsDemo />
            <AccordionDemo />
            <CardDemo />
            <LightboxDemo />
            <MasonryDemo />
            <NavbarDemo />
            <FooterDemo />
            <CalloutDemo />
            <ProgressDemo />
            <LoaderDemo />
        </>
    );
}

export const ESSENTIAL_IDS = ["button", "tag", "typography", "view-toggle", "side-tabs", "accordion", "card", "lightbox", "masonry", "navbar", "footer", "callout", "reading-progress", "loader"];
