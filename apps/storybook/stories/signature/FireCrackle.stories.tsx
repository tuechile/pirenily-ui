import type { Meta, StoryObj } from "@storybook/react";
import { Button, FireCrackle, crackle } from "@pirenily-ui/react";

const meta: Meta<typeof FireCrackle> = {
    title: "Signature/Fire crackle",
    component: FireCrackle,
    args: { enabled: false, volume: 1 },
    argTypes: { volume: { control: { type: "range", min: 0, max: 1.5, step: 0.1 } } },
    render: (args) => (
        <div style={{ display: "flex", gap: "1rem" }}>
            <FireCrackle {...args} />
            <Button>Click me</Button>
            <Button variant="ghost" onClick={() => crackle(args.volume)}>Play once</Button>
        </div>
    ),
    parameters: { docs: { description: { component: "A sound, not a visual: a tiny synthesized crackle on every click of something interactive. Turn on `enabled` in Controls, then click the buttons. Effect: **fire crackle**.\n\n`npx pirenily-ui add fire-crackle`" } } },
};
export default meta;
type Story = StoryObj<typeof FireCrackle>;

export const Playground: Story = {};
