# @pirenily-ui/tokens

The design tokens behind [Pirenily UI](https://pirenily.com/pirenily-ui/): black, grey serif text, one teal accent, frosted panels, one fast-out motion curve. Plain CSS custom properties.

```bash
npm i @pirenily-ui/tokens
```

```js
import "@pirenily-ui/tokens";            // tokens + base styles
import "@pirenily-ui/tokens/tokens.css"; // tokens only
```

Retheme by overriding any token after the import, e.g. `:root { --accent: #c2a15a; }`.

Big titles use `--font-display`, which looks for a font named "BHN Cinema" and falls back to Crimson Text. The font isn't included; add your own `@font-face`, or point `--font-display` at any font. MIT.
