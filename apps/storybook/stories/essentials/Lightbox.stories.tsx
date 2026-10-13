import type { Meta, StoryObj } from "@storybook/react";
import { LightboxImage } from "@pirenily-ui/react";

const meta: Meta<typeof LightboxImage> = {
    title: "Essentials/Lightbox",
    component: LightboxImage,
    args: { src: "./assets/demo/salzburg.jpg", alt: "Salzburg" },
    decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
    parameters: { docs: { description: { component: "Click to see the picture full size; the ×, a click outside, or Esc closes it. Effects: **grayscale to color** on hover, **instant, no fade**.\n\n`npx pirenily-ui add lightbox`" } } },
};
export default meta;
type Story = StoryObj<typeof LightboxImage>;

export const Playground: Story = {};
