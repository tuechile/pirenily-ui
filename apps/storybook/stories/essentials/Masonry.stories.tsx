import type { Meta, StoryObj } from "@storybook/react";
import { LightboxImage, Masonry } from "@pirenily-ui/react";

const photos = ["salzburg", "bridge", "cong", "beach", "pose", "blackswan"].map((n) => `./assets/demo/${n}.jpg`);

const meta: Meta<typeof Masonry> = {
    title: "Essentials/Masonry",
    component: Masonry,
    args: { natural: false },
    render: (args) => <Masonry {...args}>{photos.map((src) => <LightboxImage key={src} src={src} alt="" />)}</Masonry>,
    parameters: { docs: { description: { component: "Three columns, two on tablets, one on phones. Crops to 4:3 unless `natural`.\n\n`npx pirenily-ui add masonry`" } } },
};
export default meta;
type Story = StoryObj<typeof Masonry>;

export const Playground: Story = {};
export const Natural: Story = { name: "Natural aspect ratios", args: { natural: true } };
