import type { Meta, StoryObj } from "@storybook/react";
import { Callout, Stats } from "@pirenily-ui/react";

const meta: Meta<typeof Callout> = {
    title: "Essentials/Callout & Stats",
    component: Callout,
    args: { title: "Goals", points: ["Find any resource in under ten seconds", "Work on unreliable connections", "Keep the existing data model"] },
    parameters: { docs: { description: { component: "A labelled glass panel; `points` become a numbered 01, 02, 03 list. Stats put big numbers over hairlines. No hover effects.\n\n`npx pirenily-ui add callout`" } } },
};
export default meta;
type Story = StoryObj<typeof Callout>;

export const Playground: Story = {};
export const WithText: Story = { name: "Text instead of points", args: { points: undefined, children: "A panel can hold a paragraph instead of a list." } };
export const StatsRow: Story = {
    name: "Stats",
    render: () => (
        <Stats title="Results" items={[
            { value: "12", label: "weeks, start to handoff" },
            { value: "3×", label: "faster to find a resource" },
            { value: "40+", label: "screens in Figma" },
        ]} />
    ),
};
