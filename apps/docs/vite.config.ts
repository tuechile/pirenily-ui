import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// The docs read the component source directly, so edits show up without a package build
export default defineConfig({
    plugins: [react()],
    base: "./",
    resolve: {
        alias: {
            "@pirenily-ui/react": fileURLToPath(new URL("../../packages/react/src/index.ts", import.meta.url)),
        },
    },
});
