import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardGrid } from "@pirenily-ui/react";

const img = (n: string) => `./assets/demo/${n}.jpg`;

const meta: Meta<typeof Card> = {
    title: "Essentials/Card",
    component: Card,
    args: {
        title: "ASCII Avatar",
        image: img("salzburg"),
        cover: true,
        tags: ["Python", "HTML", "Docker"],
        subtitle: "Inspired by my CS1710 project",
        date: "May 2026",
        description: "A cute little fashion app that dresses you up as a tiny ASCII avatar.",
        href: "#card",
    },
    decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
    parameters: { docs: { description: { component: "The project card. Effect: **blur hover**, only when it has an `href`. On phones the meta reorders: title, subtitle, tags, blurb, date.\n\n`npx pirenily-ui add card`" } } },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {};
export const NotALink: Story = { name: "Without a link (no hover)", args: { href: undefined } };
export const Placeholder: Story = { args: { image: undefined, placeholder: "Coming soon", tags: [] } };
export const BlankFrame: Story = { name: "Blank frame", args: { image: undefined, placeholder: "" } };
export const Grid: Story = {
    name: "Two-up grid",
    decorators: [(Story) => <div style={{ maxWidth: 960 }}><Story /></div>],
    parameters: { docs: { description: { story: "Neighbours share rows so titles, tags and blurbs line up and the cards end level." } } },
    render: () => (
        <CardGrid>
            <Card href="#a" image={img("salzburg")} title="ASCII Avatar" tags={["Python", "HTML", "Docker"]} subtitle="Short subtitle" date="May 2026" description="Short blurb." />
            <Card image={img("bridge")} title="AeroTone" tags={["Arduino", "C++", "Embedded Systems", "FSR Sensors"]} subtitle="A much longer subtitle that wraps onto a second line" date="Apr–May 2026" description="A wearable synth: a glove that maps finger pressure to pitch." />
        </CardGrid>
    ),
};
