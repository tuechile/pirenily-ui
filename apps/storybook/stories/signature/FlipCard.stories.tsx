import type { Meta, StoryObj } from "@storybook/react";
import { FlipCard } from "@pirenily-ui/react";

const photos = ["salzburg", "bridge", "cong", "beach", "pose", "blackswan"].map((n) => `./assets/demo/${n}.jpg`);

const meta: Meta<typeof FlipCard> = {
    title: "Signature/Flip card",
    component: FlipCard,
    args: { front: photos[4], frontAlt: "Portrait", pictures: photos, note: "Find the puzzles on here and you will know :)" },
    parameters: { docs: { description: { component: "The About-page headshot. Effects: **3D flip** on click, **pop-up at a random spot** when hovering the front or any small picture, **feathered edges**.\n\n`npx pirenily-ui add flip-card`" } } },
};
export default meta;
type Story = StoryObj<typeof FlipCard>;

export const Playground: Story = {};
export const NoNote: Story = { name: "Without a note", args: { note: undefined } };
