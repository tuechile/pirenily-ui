import type { Meta, StoryObj } from "@storybook/react";
import { FeatherImage, Shimmer } from "@pirenily-ui/react";

const meta: Meta<typeof Shimmer> = {
    title: "Signature/Shimmer & feather",
    component: Shimmer,
    args: { children: "Commission me on Instagram!" },
    render: (args) => <span style={{ fontSize: "1.4rem", fontStyle: "italic", fontFamily: "var(--font-serif)", color: "var(--text)" }}><Shimmer {...args} /></span>,
    parameters: { docs: { description: { component: "Effects: **shimmer** (text, on hover) and **feathered edges** (images). Use the shimmer once per page at most.\n\n`npx pirenily-ui add shimmer`" } } },
};
export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Playground: Story = {};
export const Feathered: Story = { name: "FeatherImage", render: () => <FeatherImage src="./assets/demo/salzburg.jpg" style={{ width: 360 }} /> };
