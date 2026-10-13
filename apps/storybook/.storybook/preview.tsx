import type { Preview } from "@storybook/react";
import "@pirenily-ui/tokens";
import "./preview.css";
import theme from "./theme";

const preview: Preview = {
    parameters: {
        layout: "padded",
        backgrounds: { disable: true },
        controls: { expanded: true, sort: "requiredFirst" },
        docs: { theme },
        options: {
            storySort: {
                order: ["Introduction", "Foundations", ["Tokens", "Effects"], "Essentials", "Signature"],
            },
        },
    },
    tags: ["autodocs"],
};

export default preview;
