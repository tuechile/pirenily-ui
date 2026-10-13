import type { Meta, StoryObj } from "@storybook/react";
import { ContactLinks, Footer } from "@pirenily-ui/react";

const contacts = [
    { href: "https://www.instagram.com/pju_irza/", label: "Instagram", icon: "./assets/icons/ig.png" },
    { href: "https://www.linkedin.com/in/chi-tue-le-214705320/", label: "LinkedIn", icon: "./assets/icons/linkedin.png" },
    { href: "https://github.com/tuechile", label: "GitHub", icon: "./assets/icons/github.webp" },
];

const meta: Meta<typeof Footer> = {
    title: "Essentials/Footer",
    component: Footer,
    args: { meta: "Chi (Tue) Le | Pirenily | Updated Oct 2026" },
    parameters: { docs: { description: { component: "Hairline on top, italic grey text, teal links. Effect: **blur hover** on links and ContactLinks icons.\n\n`npx pirenily-ui add footer`" } } },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Playground: Story = {
    render: (args) => (
        <Footer {...args} style={{ margin: 0 }}>
            Hate my website? Open an issue at <a href="#gh">github.com/tuechile/pirenily</a>
        </Footer>
    ),
};
export const WithContacts: Story = {
    name: "With contact icons",
    render: (args) => (
        <Footer {...args} style={{ margin: 0 }}>
            <ContactLinks links={contacts} />
        </Footer>
    ),
};
