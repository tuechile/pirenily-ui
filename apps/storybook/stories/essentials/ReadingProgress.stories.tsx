import type { Meta, StoryObj } from "@storybook/react";
import { ReadingProgress } from "@pirenily-ui/react";

const meta: Meta<typeof ReadingProgress> = {
    title: "Essentials/Reading progress",
    component: ReadingProgress,
    parameters: {
        docs: { story: { inline: false, iframeHeight: 260 }, description: { component: "Fixed to the top of the page; fills as you scroll. Effect: **glowing progress bar**.\n\n`npx pirenily-ui add reading-progress`" } },
    },
};
export default meta;
type Story = StoryObj<typeof ReadingProgress>;

export const Playground: Story = {
    render: () => (
        <div style={{ height: "300vh", fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--text)" }}>
            <ReadingProgress />
            Scroll this frame and watch the very top.
        </div>
    ),
};
