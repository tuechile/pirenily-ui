import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "@pirenily-ui/react";

const links = [
    { href: "#about", label: "About" },
    { href: "#design", label: "Design", current: true },
    { href: "#play", label: "Play" },
    { href: "#projects", label: "Projects" },
];

const meta: Meta<typeof Navbar> = {
    title: "Essentials/Navbar",
    component: Navbar,
    args: { brand: "Pirenily", brandHref: "#", links },
    parameters: {
        layout: "fullscreen",
        docs: { story: { inline: false, iframeHeight: 140 }, description: { component: "Sticky nav fading out of the black. Effects: **blur hover**; on phones, **circle wipe** for the menu. Pass `linkAs` to use your router's link.\n\n`npx pirenily-ui add navbar`" } },
    },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {};
export const Phone: Story = {
    parameters: {
        viewport: { defaultViewport: "mobile1" },
        docs: { story: { inline: false, iframeHeight: 560 }, description: { story: "Tap the “=” to see the circle wipe. (On this Docs page the frame is wide; open the story itself to get the phone size.)" } },
    },
};
