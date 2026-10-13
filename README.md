# Pirenily UI

The components behind [pirenily.com](https://pirenily.com), pulled out into a small kit you can drop into any page. It's plain HTML, CSS and vanilla JS: no frameworks, no build step, no icon libraries.

Open `index.html` to see every component live. `examples/case-study.html` is a full case-study page.

## The look

Dark, cinematic personal archive: quiet, serif, a little dreamy.

- **Palette:** black background, grey body text, near-white titles, one teal accent (`--accent: #1ca591`). Frosted translucent panels with hairline borders.
- **Type:** *BHN Cinema* for the logo and big page titles only; *Crimson Text* for everything else, often italic.
- **Motion:** hover is a soft `blur(1px)`, not a color change. Things appear and disappear instantly, with no fades. One fast-out easing curve, no bounce.

## Use it

```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
<link href="pirenily-ui/css/pirenily.css" rel="stylesheet">

<!-- only the scripts for the components you use -->
<script src="pirenily-ui/js/lightbox.js"></script>
```

`css/pirenily.css` imports everything. To load less, link `css/tokens.css` and `css/base.css` first, then only the files in `css/components/` you need.

Scripts find their elements on load, so put them at the end of `<body>`.

## Tokens

Every color, size and duration is a `:root` variable in `css/tokens.css`. Components never hardcode colors, so retheming means overriding tokens:

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

## Components

| Component | CSS | JS | Markup hook |
|---|---|---|---|
| Nav + phone menu (circle wipe) | `nav.css` | `nav.js` | `.navigator` › `.nav-header`, `.nav-toggle`, `.nav-links` › `.nav-item` |
| Finder (rotating placeholder search) | `finder.css` | `finder.js` | `input.finder-input[data-names="A\|B\|C"]` |
| Footers, contact icons, scroll mouse | `footer.css` | none | `.site-footer`, `.home-footer`, `.contacts` › `.contact-logo`, `a.scroll-mouse` |
| Shimmer link | `footer.css` | none | `.shimmer` |
| Tag chips | `pills.css` | none | `.tag-row` › `.tag-chip` |
| Side tabs (slide in from the edge) | `pills.css` | `side-tabs.js` | `.side-tabs[data-target][data-reveal]` › `.side-tab[data-tab]`; items `[data-category]` |
| View toggle (sliding frosted pill) | `pills.css` | `view-toggle.js` | `.view-toggle[data-target]` › `.view-btn[data-view]`; items `[data-views="a b"]`; view `all` shows everything |
| Project card + two-up grid | `project-card.css` | none | `.project-grid` › `a.project-thumb` / `div.project-thumb` |
| Page title + note | `content.css` | none | `.page-title`, `.page-note` |
| Accordion | `content.css` | `accordion.js` | `.accordion` › `.acc-btn` + `.acc-panel` › `.acc-inner` |
| Flip card (photo grid on the back) | `content.css` | `flip-card.js` | `.flip-card` › `.flip-card-front`, `.flip-card-back` › `.flip-thumb` |
| Masonry gallery | `content.css` | none | `.masonry` (`--natural` keeps aspect ratios) › `.item` › `img` |
| List thumbnails | `content.css` | none | `.thumbnail-container` › `.thumbnail` (› `a`) › `img` + `.thumbnail-content` |
| Media cards + rows | `content.css` | none | `.media-card(--sm/md/lg/embed/placeholder)`, `.split(-flow/equal/pair/3/quad/fit)` |
| Lightbox | `overlays.css` | `lightbox.js` | `img.lightboxable` or `a.lightbox[href]` |
| Hover previews | `overlays.css` | `popups.js` | any element with `data-previews="a.jpg\|b.jpg"` |
| Loader GIF | `overlays.css` | `loader.js` | `.loader-container.hidden` › `img` (`data-loader-home` sets the home path) |
| Reading progress bar | `overlays.css` | `progress.js` | `.progress-wrap` › `.progress-bar` |
| Case-study system | `case-study.css` | `case-rail.js` | `.cs-shell` › `.cs-rail` + `.cs-main`; sections with `data-index` |
| Click crackle | none | `fire.js` | automatic on anything interactive |
| Feathered image, blur hover | `base.css` | none | `.feather`, `.blur-hover` |

### Case-study system

`.cs-shell` holds a sticky rail and the reading column. `case-rail.js` numbers every `[data-index]` section, writes its number into `.cs-num`, builds the rail, and lights the current ring as you scroll. Blocks inside the column:

- `.cs-hero` with `.cs-kicker`, `.case-title`, `.cs-hero-sub`, `.tag-row`, `.cs-facts` (a `<dl>`)
- `.cs-section` › `.cs-eyebrow` › `.cs-num`, `.cs-heading`, `.cs-prose`
- `.cs-figure` › `.media-card` + `.img-caption--fig` (auto "Fig. 01")
- `.callout` › `.cs-label` + `ol.cs-points` (auto "01")
- `dl.cs-stats`, `.rollout-grid` › `.rollout-card`, `a.cta-button`, `.case-pager` › `.next-case`

Below 1000px the rail hides and `.progress-wrap.with-rail` takes over as the progress indicator.

## Rules of the house

- No light backgrounds or light themes.
- No second accent color, no saturated colors.
- No new font families.
- No heavy drop shadows, gradients everywhere, or bouncy animations.
- No fades or crossfades. Things appear and disappear instantly.
- `prefers-reduced-motion` turns off every animation and transition.

## Assets

`fonts/BHN_CINEMA.TTF` is the display font used on pirenily.com. The loader GIF and contact icons in `assets/` were drawn by Chi Le. The photos in `assets/demo/` are only there for the demo page.
