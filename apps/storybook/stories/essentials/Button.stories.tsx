import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@pirenily-ui/react";

const meta: Meta<typeof Button> = {
    title: "Essentials/Button",
    component: Button,
    args: { children: "Button", variant: "pill", size: "md" },
    argTypes: { variant: { control: "inline-radio" }, size: { control: "inline-radio" }, disabled: { control: "boolean" } },
    parameters: { docs: { description: { component: "An italic serif capsule. Effects: **teal hover** and **press shrink** (see Foundations › Effects).\n\n`npx pirenily-ui add button`" } } },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};
export const Pill: Story = { args: { variant: "pill", children: "Pill" } };
export const Glass: Story = { args: { variant: "glass", children: "Glass" }, parameters: { docs: { description: { story: "Frosted and a little brighter. Use for the one action that matters most." } } } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" }, parameters: { docs: { description: { story: "Text only. Hover blurs instead of turning teal." } } } };
export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Button {...args} size="sm">Small</Button>
            <Button {...args} size="md">Medium</Button>
            <Button {...args} size="lg">Large</Button>
        </div>
    ),
};
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };
