import type { Meta, StoryObj } from "@storybook/react";
import {
    Callout, CaseBlock, CaseFigure, CaseHero, CaseMedia, CasePager, CaseRow, CaseSection, CaseStudy, CtaLink, Rollout, Stats,
} from "@pirenily-ui/react";

const img = (n: string) => `./assets/demo/${n}.jpg`;

const meta: Meta<typeof CaseStudy> = {
    title: "Signature/Case study",
    component: CaseStudy,
    parameters: {
        layout: "fullscreen",
        docs: {
            story: { inline: false, iframeHeight: 700 },
            description: { component: "How every case study on pirenily.com reads. The left rail lists each CaseSection; as you scroll, the line fills and the current ring glows (effect: **rail glow**). The rail hides below 1000px wide. Scroll inside the frame.\n\n`npx pirenily-ui add case-study`" },
        },
    },
};
export default meta;
type Story = StoryObj<typeof CaseStudy>;

export const FullPage: Story = {
    name: "Full page",
    render: () => (
        <CaseStudy backHref="#back" railTop={40}>
            <CaseHero
                title="Redesigning how a team finds things"
                index="Example case study"
                meta="Feb – May 2026"
                subtitle="Every case-study block in one page."
                tags={["Figma", "User research"]}
                facts={[
                    { label: "Role", values: ["Product designer"] },
                    { label: "Team", values: ["4 designers", "3 engineers"] },
                    { label: "Timeline", values: ["12 weeks"] },
                ]}
            />
            <CaseFigure caption="Captions in a CaseFigure are numbered automatically.">
                <CaseMedia src={img("salzburg")} alt="" />
            </CaseFigure>
            <CaseSection heading="Overview" lead="The tool worked, but nobody could find anything in it">
                <p>Body copy in <strong>grey Crimson Text</strong>, with <a href="#x">hairline-underlined links</a>.</p>
                <CaseBlock><Callout title="Goals" points={["Find anything in ten seconds", "Work offline"]} /></CaseBlock>
            </CaseSection>
            <CaseSection heading="Research" lead="Twelve interviews, three patterns">
                <CaseFigure caption="A three-up row with a placeholder.">
                    <CaseRow layout="3">
                        <CaseMedia src={img("cong")} alt="" />
                        <CaseMedia src={img("beach")} alt="" />
                        <CaseMedia />
                    </CaseRow>
                </CaseFigure>
            </CaseSection>
            <CaseSection heading="Iteration" lead="From three menus to one search bar">
                <CaseBlock>
                    <Rollout phases={[
                        { label: "Phase 1", title: "Pilot", description: "One clinic." },
                        { label: "Phase 2", title: "Region", description: "Feedback loop." },
                        { label: "Phase 3", title: "Everywhere", description: "Default for all." },
                    ]} />
                </CaseBlock>
            </CaseSection>
            <CaseSection heading="Results" lead="Faster, and people use it">
                <CaseBlock><Stats items={[{ value: "3×", label: "faster" }, { value: "92%", label: "finished every task" }]} /></CaseBlock>
                <CtaLink href="https://github.com/tuechile/pirenily" label="See the site's source" />
            </CaseSection>
            <CasePager prev={{ href: "#p", label: "Merch" }} next={{ href: "#n", label: "HackHarvard" }} />
        </CaseStudy>
    ),
};

export const Hero: StoryObj<typeof CaseHero> = {
    parameters: { layout: "padded", docs: { story: { inline: true } } },
    render: () => (
        <CaseHero title="Redesigning how a team finds things" meta="Feb – May 2026" subtitle="The hero on its own." tags={["Figma"]}
            facts={[{ label: "Role", values: ["Designer"] }, { label: "Timeline", values: ["12 weeks"] }]} />
    ),
};

export const Cta: StoryObj<typeof CtaLink> = {
    name: "CtaLink",
    parameters: { layout: "padded", docs: { story: { inline: true } } },
    render: () => <CtaLink href="https://github.com/tuechile/pirenily" label="See the site's source" />,
};

export const Pager: StoryObj<typeof CasePager> = {
    name: "CasePager",
    parameters: { layout: "padded", docs: { story: { inline: true } } },
    render: () => <CasePager prev={{ href: "#p", label: "Merch" }} next={{ href: "#n", label: "HackHarvard" }} />,
};
