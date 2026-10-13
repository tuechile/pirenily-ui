import type { Meta, StoryObj } from "@storybook/react";
import { HoverPreview } from "@pirenily-ui/react";

const photos = ["salzburg", "bridge", "cong", "beach", "pose", "blackswan"].map((n) => `./assets/demo/${n}.jpg`);

const meta: Meta<typeof HoverPreview> = {
    title: "Signature/Hover preview",
    component: HoverPreview,
    args: { images: photos },
    render: (args) => (
        <HoverPreview {...args}>
            <a href="#hp" style={{ display: "inline-block", padding: "1.5rem 2rem", fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--title)", textDecoration: "none", background: "var(--glass)", border: "1px solid var(--hairline)" }}>
                Hover me
            </a>
        </HoverPreview>
    ),
    parameters: { docs: { description: { component: "Wrap any one element. Hovering it (or tabbing onto it) pops one of `images` up somewhere random on screen. Effects: **pop-up at a random spot**, **instant, no fade**. Mouse only.\n\n`npx pirenily-ui add hover-preview`" } } },
};
export default meta;
type Story = StoryObj<typeof HoverPreview>;

export const Playground: Story = {};
export const OnePicture: Story = { args: { images: [photos[0]] } };
