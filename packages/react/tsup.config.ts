import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/essentials.ts", "src/signature.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    external: ["react", "react-dom"],
    // Every component is safe to render on the client; mark the bundle so Next.js app/ can import it
    banner: { js: '"use client";' },
});
