import type { Meta, StoryObj } from "@storybook/react";
import { SideTabs } from "@pirenily-ui/react";

const tabs = [{ value: "code", label: "Code" }, { value: "uiux", label: "UI/UX" }];

const meta: Meta<typeof SideTabs> = {
    title: "Essentials/Side tabs",
    component: SideTabs,
    args: { tabs, position: "inline", show: true },
    argTypes: { position: { control: "inline-radio", options: ["fixed", "inline"] } },
    parameters: { docs: { description: { component: "Capsules attached to the screen edge. Effects: **slide in from the edge** (when fixed), **teal hover**, **press shrink**.\n\n`npx pirenily-ui add side-tabs`" } } },
};
export default meta;
type Story = StoryObj<typeof SideTabs>;

export const Playground: Story = {};
export const Fixed: Story = {
    name: "Fixed to the edge",
    args: { position: "fixed", show: true },
    parameters: { docs: { story: { inline: false, iframeHeight: 220 }, description: { story: "Toggle `show` in Controls to watch them slide in and out." } } },
};
