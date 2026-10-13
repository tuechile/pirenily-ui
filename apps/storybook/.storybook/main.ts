import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "node:url";

const config: StorybookConfig = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
    addons: ["@storybook/addon-essentials"],
    framework: { name: "@storybook/react-vite", options: {} },
    staticDirs: ["../../docs/public"],
    docs: { defaultName: "Docs" },
    core: { disableTelemetry: true },
    typescript: { reactDocgen: "react-docgen-typescript" },
    viteFinal: async (cfg) => {
        // Read the component source directly, like the docs site
        cfg.resolve ??= {};
        cfg.resolve.alias = {
            ...(cfg.resolve.alias as Record<string, string>),
            "@pirenily-ui/react": fileURLToPath(new URL("../../../packages/react/src/index.ts", import.meta.url)),
        };
        // Served from pirenily.com/pirenily-ui/storybook/
        cfg.base = "./";
        // "use client" only matters to Next.js; Rollup's notice about dropping it is noise here
        cfg.build ??= {};
        cfg.build.rollupOptions ??= {};
        cfg.build.rollupOptions.onwarn = (warning, warn) => {
            if (warning.code === "MODULE_LEVEL_DIRECTIVE" || warning.code === "SOURCEMAP_ERROR") return;
            warn(warning);
        };
        return cfg;
    },
};

export default config;
