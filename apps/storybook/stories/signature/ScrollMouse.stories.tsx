import type { Meta, StoryObj } from "@storybook/react";
import { ScrollMouse } from "@pirenily-ui/react";

const meta: Meta<typeof ScrollMouse> = {
    title: "Signature/Scroll mouse",
    component: ScrollMouse,
    args: { href: "#below", "aria-label": "Scroll down" },
    parameters: { docs: { description: { component: "Effect: **scroll cue**, plus **blur hover**. Point `href` at what's below.\n\n`npx pirenily-ui add scroll-mouse`" } } },
};
export default meta;
type Story = StoryObj<typeof ScrollMouse>;

export const Playground: Story = {};
