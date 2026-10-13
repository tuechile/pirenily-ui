import { create } from "@storybook/theming";

export default create({
    base: "dark",
    brandTitle: "Pirenily UI",
    brandUrl: "https://pirenily.com/pirenily-ui/",
    brandTarget: "_self",

    colorPrimary: "#1ca591",
    colorSecondary: "#1ca591",

    appBg: "#000000",
    appContentBg: "#000000",
    appPreviewBg: "#000000",
    appBorderColor: "rgba(255, 255, 255, 0.08)",
    appBorderRadius: 10,

    fontBase: '"Crimson Text", serif',
    fontCode: 'ui-monospace, "SF Mono", Menlo, monospace',

    textColor: "#bbbbbb",
    textInverseColor: "#000000",
    textMutedColor: "#7a7a7a",

    barTextColor: "#888888",
    barSelectedColor: "#1ca591",
    barHoverColor: "#1ca591",
    barBg: "#000000",

    inputBg: "rgba(255, 255, 255, 0.03)",
    inputBorder: "rgba(255, 255, 255, 0.22)",
    inputTextColor: "#eeeeee",
    inputBorderRadius: 999,
});
