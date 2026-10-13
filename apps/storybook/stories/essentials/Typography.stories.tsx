import type { Meta, StoryObj } from "@storybook/react";
import { Kicker, PageNote, PageTitle } from "@pirenily-ui/react";

const meta: Meta<typeof PageTitle> = {
    title: "Essentials/Typography",
    component: PageTitle,
    parameters: { docs: { description: { component: "Page title in the display font, the italic note under it, and small uppercase kickers.\n\n`npx pirenily-ui add typography`" } } },
};
export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Title: Story = { args: { children: "Graphic Design" } };
export const Note: Story = { render: () => <PageNote style={{ margin: 0 }}>Selected work, newest first. <a href="#note">See everything</a></PageNote> };
export const Kickers: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "2rem" }}>
            <Kicker>Case study</Kicker>
            <Kicker accent>01 · Accent</Kicker>
        </div>
    ),
};
