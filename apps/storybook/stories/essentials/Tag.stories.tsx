import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagRow } from "@pirenily-ui/react";

const meta: Meta<typeof Tag> = {
    title: "Essentials/Tag",
    component: Tag,
    args: { children: "Python" },
    parameters: { docs: { description: { component: "The one chip style for every tag. No hover effect: tags aren't clickable.\n\n`npx pirenily-ui add tag`" } } },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};
export const Row: Story = {
    render: () => (
        <TagRow>{["Python", "Flask", "Jinja2", "Figma", "three.js", "Arduino"].map((t) => <Tag key={t}>{t}</Tag>)}</TagRow>
    ),
};
