import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "@pirenily-ui/react";

const meta: Meta<typeof Accordion> = {
    title: "Essentials/Accordion",
    component: Accordion,
    args: { title: "What's this made with?", children: "React and plain CSS custom properties. No Tailwind, no icon libraries.", defaultOpen: false },
    parameters: { docs: { description: { component: "A hairline panel that folds away. The panel slides open; the chevron flips.\n\n`npx pirenily-ui add accordion`" } } },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {};
export const Open: Story = { args: { defaultOpen: true } };
export const Stacked: Story = {
    render: () => (
        <>
            <Accordion title="First">One</Accordion>
            <Accordion title="Second">Two</Accordion>
            <Accordion title="Third">Three</Accordion>
        </>
    ),
};
