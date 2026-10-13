# Pirenily UI

Dark, serif, cinematic React components from [pirenily.com](https://pirenily.com), with a CLI that copies them into your project.

Components are split into two views:

- **Essentials** (14): general-purpose building blocks in the Pirenily look. Button, Tag, Typography, View toggle, Side tabs, Accordion, Card, Lightbox, Masonry, Navbar, Footer, Callout & Stats, Reading progress, Loader.
- **Signature** (7): the detailed, one-of-a-kind pieces that make pirenily.com feel like itself. Finder, Hover preview, Flip card, Scroll mouse, Fire crackle, Shimmer & feather, and the Case-study layout with its glowing progress rail.

The docs site, **[pirenily.com/pirenily-ui](https://pirenily.com/pirenily-ui/)**, shows every component live, with a switch between the two views. It deploys from `apps/docs` on every push to `main`.

## Packages

| Package | What |
|---|---|
| [`pirenily-ui`](packages/cli) | The CLI: `init`, `add`, `list` |
| [`@pirenily-ui/react`](packages/react) | All components as a package; also `/essentials` and `/signature` entry points |
| [`@pirenily-ui/tokens`](packages/tokens) | CSS custom properties and base styles |

## Quick start

### Copy the source (recommended)

Like shadcn/ui, the CLI copies each component's `.tsx` and `.css` into your app, so you own the code and can change anything.

```bash
npx pirenily-ui init                    # pirenily-ui.json and tokens
npx pirenily-ui add card view-toggle    # plus anything they depend on
npx pirenily-ui add --signature         # every Signature component
npx pirenily-ui list
```

Then import the tokens once at the root of your app, and load Crimson Text:

```tsx
import "./styles/pirenily/index.css";
```

```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
```

**Display font (optional).** Big titles (the logo, Finder, page titles) use `--font-display`, which looks for a font named "BHN Cinema". It isn't included, since its license doesn't allow redistribution. Add your own `@font-face` with that name, or set `--font-display` to any font; without one they fall back to Crimson Text.

Until the packages are on npm, run the CLI straight from GitHub:

```bash
npx github:tuechile/pirenily-ui add card
```

### Or install the package

```bash
npm i @pirenily-ui/react @pirenily-ui/tokens
```

```tsx
import "@pirenily-ui/tokens";
import "@pirenily-ui/react/styles.css";
import { Card, CardGrid, ViewToggle } from "@pirenily-ui/react";
// or only one view:
import { Finder, CaseStudy } from "@pirenily-ui/react/signature";
```

## Example

```tsx
import { Card, CardGrid } from "@/components/pirenily/card";
import { Finder } from "@/components/pirenily/finder";

<Finder names={["Pirenily", "Chi Le", "Iron Pig"]} onSearch={(q) => router.push(`/search?q=${q}`)} />

<CardGrid>
    <Card
        href="https://github.com/tuechile/ascii-simple-avatar"
        external
        image="/ascii.webp"
        title="ASCII Avatar"
        tags={["Python", "HTML", "Docker"]}
        subtitle="Inspired by my CS1710 project"
        date="May 2026"
        description="A cute little fashion app."
    />
</CardGrid>
```

## Theming

Every color, size and duration is a CSS custom property in `tokens.css`; components never hardcode colors. Override after importing:

```css
:root {
    --accent: #c2a15a;
}
```

| Group | Tokens |
|---|---|
| Color | `--bg` `--accent` `--highlight` `--title` `--lead` `--text` `--text-dim` `--text-primary/secondary/tertiary` |
| Glass | `--glass` `--glass-strong` `--hairline` `--hairline-strong` `--pill-text` `--pill-text-on` |
| Type | `--font-display` `--font-serif` `--fs-0`…`--fs-5` `--fs-display` `--fs-heading` `--fs-kicker` `--lh` |
| Space | `--s-1`…`--s-7` |
| Shape | `--r-sm` `--r-lg` `--r-pill` `--feather` `--feather-mask` |
| Motion | `--ease-out` `--ease-wipe` `--dur-1/2/3` `--press` `--hover-blur` |

Component classes are prefixed `pui-` so they don't collide with yours.

## The look

- Black background, grey serif text, near-white titles, one teal accent (`#1ca591`).
- A display font (BHN Cinema on pirenily.com) only for the logo and big titles; *Crimson Text* for everything else, often italic.
- Hover is a soft `blur(1px)`, not a color change. Frosted panels with hairline borders.
- Nothing fades: things appear and disappear instantly. One fast-out easing curve, no bounce.
- No CSS framework and no icon library. `prefers-reduced-motion` turns animations off.

## Development

```bash
npm install
npm run dev          # docs site at localhost:5173, reading component source directly
npm run typecheck
npm run build        # registry.json, the React package, and the docs site
npm run registry     # rebuild registry.json after changing a component
```

```
packages/
  tokens/            tokens.css, base.css
  react/src/components/
                     one .tsx + .css per component, flat, so the CLI can copy them as-is
  cli/bin.mjs        no dependencies; reads registry.json
apps/docs/           Vite + React docs with the Essentials / Signature switch
scripts/
  registry.config.mjs   which files make up each component, its view, and its dependencies
  build-registry.mjs    inlines them into registry.json
```

To add a component: put `name.tsx` and `name.css` in `packages/react/src/components`, export it from `essentials.ts` or `signature.ts`, list it in `scripts/registry.config.mjs`, add a demo in `apps/docs/src`, then run `npm run registry`.

## License

Code is [MIT](LICENSE). The docs site's assets aren't part of that: BHN Cinema (`apps/docs/src/assets`) is only used to render the docs, and the loader GIF, contact icons and photos in `apps/docs/public/assets` are Chi Le's own, there for the demos.
