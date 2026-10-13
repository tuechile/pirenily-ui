#!/usr/bin/env node
// pirenily-ui: copy Pirenily components into your project, shadcn-style.
// No dependencies; reads registry.json (bundled, from the repo, or from GitHub).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

const here = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const CONFIG = "pirenily-ui.json";
const REMOTE = process.env.PIRENILY_UI_REGISTRY || "https://raw.githubusercontent.com/tuechile/pirenily-ui/main/registry.json";

const c = {
    dim: (s) => `\x1b[2m${s}\x1b[0m`,
    teal: (s) => `\x1b[38;2;28;165;145m${s}\x1b[0m`,
    italic: (s) => `\x1b[3m${s}\x1b[0m`,
    red: (s) => `\x1b[31m${s}\x1b[0m`,
};

const HELP = `
${c.italic("pirenily-ui")} ${c.dim("· dark, serif components from pirenily.com")}

  ${c.teal("init")}                    set up ${CONFIG} and add the tokens
  ${c.teal("add")} <name...>           copy components (and what they need) into your project
      --essentials          add every Essentials component
      --signature           add every Signature component
      --all                 add everything
      --overwrite           replace files that already exist
  ${c.teal("list")}                    show every component, by view
  ${c.teal("help")}                    this

  Options for init:
      --components <dir>    default src/components/pirenily
      --styles <dir>        default src/styles/pirenily
      -y, --yes             accept the defaults
`;

async function loadRegistry() {
    for (const p of [join(here, "registry.json"), join(here, "../../registry.json")]) {
        if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8"));
    }
    const res = await fetch(REMOTE);
    if (!res.ok) throw new Error(`Couldn't fetch the registry from ${REMOTE} (${res.status})`);
    return res.json();
}

function parseArgs(argv) {
    const flags = {};
    const rest = [];
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "-y") flags.yes = true;
        else if (a.startsWith("--")) {
            const key = a.slice(2);
            if (["components", "styles"].includes(key)) flags[key] = argv[++i];
            else flags[key] = true;
        } else rest.push(a);
    }
    return { flags, rest };
}

function readConfig() {
    const p = join(cwd, CONFIG);
    return existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : null;
}

function writeItem(item, config, overwrite) {
    const base = resolve(cwd, item.target === "styles" ? config.styles : config.components);
    const written = [];
    const skipped = [];
    for (const f of item.files) {
        const dest = join(base, f.path);
        if (existsSync(dest) && !overwrite) { skipped.push(dest); continue; }
        mkdirSync(dirname(dest), { recursive: true });
        writeFileSync(dest, f.encoding === "base64" ? Buffer.from(f.content, "base64") : f.content);
        written.push(dest);
    }
    return { written, skipped };
}

// Dependencies first, each once
function resolveOrder(registry, names) {
    const byName = new Map(registry.items.map((i) => [i.name, i]));
    const order = [];
    const seen = new Set();
    const visit = (name) => {
        if (seen.has(name)) return;
        const item = byName.get(name);
        if (!item) throw new Error(`No component called "${name}". Run ${c.teal("pirenily-ui list")} to see them all.`);
        seen.add(name);
        item.dependencies.forEach(visit);
        order.push(item);
    };
    names.forEach(visit);
    return order;
}

function checkReact() {
    const p = join(cwd, "package.json");
    if (!existsSync(p)) return;
    const pkg = JSON.parse(readFileSync(p, "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
    if (!deps.react) console.log(c.dim("  note: react isn't in package.json; these are React components."));
}

async function init(flags, registry) {
    let components = flags.components || "src/components/pirenily";
    let styles = flags.styles || "src/styles/pirenily";
    if (!flags.yes && !flags.components && !flags.styles && process.stdin.isTTY) {
        const rl = createInterface({ input: process.stdin, output: process.stdout });
        components = (await rl.question(`Components folder ${c.dim(`(${components})`)} `)).trim() || components;
        styles = (await rl.question(`Styles folder ${c.dim(`(${styles})`)} `)).trim() || styles;
        rl.close();
    }
    const config = { components, styles };
    writeFileSync(join(cwd, CONFIG), JSON.stringify(config, null, 2) + "\n");
    console.log(`${c.teal("✓")} wrote ${CONFIG}`);
    install(registry, ["tokens", "utils"], config, flags.overwrite);
    console.log(`\nImport the tokens once, at the root of your app:\n\n  ${c.teal(`import "./${relative("src", styles) || styles}/index.css";`)}\n`);
    console.log(`And load Crimson Text, e.g. from Google Fonts:\n  ${c.dim("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&display=swap")}\n`);
    console.log(c.dim(`Optional: big titles use a display font. Add an @font-face named "BHN Cinema" if you have it,\nor set --font-display to any font. Without one they fall back to Crimson Text.\n`));
}

function install(registry, names, config, overwrite) {
    const order = resolveOrder(registry, names);
    const asked = new Set(names);
    let any = false;
    for (const item of order) {
        const { written, skipped } = writeItem(item, config, overwrite);
        if (written.length) {
            any = true;
            console.log(`${c.teal("✓")} ${item.name} ${c.dim(written.map((p) => relative(cwd, p)).join(", "))}`);
        } else if (skipped.length && asked.has(item.name)) {
            console.log(`${c.dim("·")} ${item.name} ${c.dim("already there (use --overwrite to replace)")}`);
        }
    }
    return any;
}

function list(registry) {
    const groups = [
        ["foundation", "Foundation"],
        ["essentials", "Essentials", "general-purpose, in the Pirenily look"],
        ["signature", "Signature", "the pieces that make pirenily.com feel like itself"],
    ];
    for (const [key, title, note] of groups) {
        console.log(`\n${c.italic(title)}${note ? c.dim("  " + note) : ""}`);
        for (const i of registry.items.filter((i) => i.category === key)) {
            console.log(`  ${c.teal(i.name.padEnd(18))} ${c.dim(i.description)}`);
        }
    }
    console.log();
}

async function main() {
    const [cmd = "help", ...argv] = process.argv.slice(2);
    const { flags, rest } = parseArgs(argv);
    if (cmd === "help" || cmd === "--help" || cmd === "-h") return console.log(HELP);
    if (cmd === "--version" || cmd === "-v") return console.log((await loadRegistry()).version);

    const registry = await loadRegistry();
    if (cmd === "list") return list(registry);
    if (cmd === "init") return init(flags, registry);

    if (cmd === "add") {
        const config = readConfig();
        if (!config) {
            console.log(`${c.red("No " + CONFIG + " here.")} Run ${c.teal("pirenily-ui init")} first.`);
            process.exitCode = 1;
            return;
        }
        let names = rest;
        if (flags.all) names = registry.items.map((i) => i.name);
        else {
            if (flags.essentials) names = names.concat(registry.items.filter((i) => i.category === "essentials").map((i) => i.name));
            if (flags.signature) names = names.concat(registry.items.filter((i) => i.category === "signature").map((i) => i.name));
        }
        if (!names.length) {
            console.log(`Which ones? e.g. ${c.teal("pirenily-ui add card view-toggle")}, or ${c.teal("pirenily-ui list")}`);
            process.exitCode = 1;
            return;
        }
        checkReact();
        install(registry, names, config, flags.overwrite);
        return;
    }

    console.log(`${c.red(`Unknown command "${cmd}".`)}${HELP}`);
    process.exitCode = 1;
}

main().catch((e) => {
    console.error(c.red(e.message));
    process.exitCode = 1;
});
