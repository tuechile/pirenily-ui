import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Finder } from "@pirenily-ui/react";

const meta: Meta<typeof Finder> = {
    title: "Signature/Finder",
    component: Finder,
    args: { names: ["Pirenily", "Chi Le", "Iron Pig", "Emily", "Chi Bell"], interval: 400, onSearch: fn() },
    parameters: { docs: { description: { component: "The giant search field from the pirenily.com landing page. The placeholder cycles through `names` every `interval` ms. Press Enter and `onSearch` gets what you typed (see the Actions tab).\n\n`npx pirenily-ui add finder`" } } },
};
export default meta;
type Story = StoryObj<typeof Finder>;

export const Playground: Story = {};
export const Slow: Story = { name: "Slower cycle", args: { interval: 1200 } };
