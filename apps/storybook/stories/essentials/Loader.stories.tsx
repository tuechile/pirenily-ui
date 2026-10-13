import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Loader } from "@pirenily-ui/react";

const meta: Meta<typeof Loader> = {
    title: "Essentials/Loader",
    component: Loader,
    args: { visible: true, src: "./assets/loader.gif", delay: 0 },
    parameters: {
        docs: { story: { inline: false, iframeHeight: 320 }, description: { component: "Full-screen loading overlay. Only appears if loading lasts longer than `delay` (200ms by default), so fast loads never flash. Effect: **instant, no fade**. Leave out `src` for a hairline teal ring.\n\n`npx pirenily-ui add loader`" } },
    },
};
export default meta;
type Story = StoryObj<typeof Loader>;

export const Playground: Story = {};
export const DefaultRing: Story = { name: "Without a GIF", args: { src: undefined } };

function Simulated() {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>Load for 1.5s</Button>
            <Loader visible={loading} src="./assets/loader.gif" />
        </>
    );
}
export const Simulate: Story = { name: "Try it", render: () => <Simulated /> };
