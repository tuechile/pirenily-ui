// Builds registry.json: every CLI item with its files inlined, so `pirenily-ui add` works offline.
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { items } from "./registry.config.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "packages/react/package.json"), "utf8"));
const BINARY = new Set([".ttf", ".otf", ".woff", ".woff2", ".png", ".jpg", ".gif", ".webp"]);

const registry = {
    name: "pirenily-ui",
    version: pkg.version,
    homepage: "https://github.com/tuechile/pirenily-ui",
    items: items.map((item) => ({
        name: item.name,
        category: item.category,
        description: item.description,
        target: item.target ?? "components",
        dependencies: item.dependencies ?? [],
        files: item.files.map((path) => {
            const abs = join(root, item.root ?? "packages/react/src/components", path);
            const binary = BINARY.has(extname(path).toLowerCase());
            return binary
                ? { path, encoding: "base64", content: readFileSync(abs).toString("base64") }
                : { path, content: readFileSync(abs, "utf8") };
        }),
    })),
};

// Every dependency must exist
const names = new Set(registry.items.map((i) => i.name));
for (const i of registry.items) for (const d of i.dependencies) if (!names.has(d)) throw new Error(`${i.name} depends on missing item "${d}"`);

writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
copyFileSync(join(root, "registry.json"), join(root, "packages/cli/registry.json"));
console.log(`registry.json: ${registry.items.length} items`);
