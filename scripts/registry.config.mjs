// Every item the CLI can add. Files are relative to packages/react/src/components
// (or packages/tokens for "tokens"). dependencies are other items, added first.
export const items = [
    // ----- Foundation -----
    { name: "tokens", category: "foundation", description: "Colors, type, spacing and motion tokens and base styles", target: "styles",
      root: "packages/tokens", files: ["index.css", "tokens.css", "base.css"] },
    { name: "utils", category: "foundation", description: "cx() class joiner and a hover check", files: ["utils.ts"] },

    // ----- Essentials -----
    { name: "button", category: "essentials", description: "Italic serif pill, glass or ghost button with press feedback", files: ["button.tsx", "button.css"], dependencies: ["utils"] },
    { name: "tag", category: "essentials", description: "Frosted pill chips and a wrapping row for them", files: ["tag.tsx", "tag.css"], dependencies: ["utils"] },
    { name: "typography", category: "essentials", description: "Kicker label, BHN Cinema page title, italic page note", files: ["typography.tsx", "typography.css"], dependencies: ["utils"] },
    { name: "view-toggle", category: "essentials", description: "Segmented control with a frosted pill that slides behind the active option", files: ["view-toggle.tsx", "view-toggle.css"], dependencies: ["utils"] },
    { name: "side-tabs", category: "essentials", description: "Capsule tabs attached to the screen edge that slide in", files: ["side-tabs.tsx", "side-tabs.css"], dependencies: ["utils"] },
    { name: "accordion", category: "essentials", description: "A hairline panel that folds away", files: ["accordion.tsx", "accordion.css"], dependencies: ["utils"] },
    { name: "card", category: "essentials", description: "Project card with image, tags, subtitle, date and blurb, plus a two-up grid that lines up", files: ["card.tsx", "card.css"], dependencies: ["utils", "tag"] },
    { name: "lightbox", category: "essentials", description: "Full-screen image viewer and a self-opening LightboxImage", files: ["lightbox.tsx", "lightbox.css"], dependencies: ["utils"] },
    { name: "masonry", category: "essentials", description: "Responsive three-column image gallery", files: ["masonry.tsx", "masonry.css"], dependencies: ["utils"] },
    { name: "navbar", category: "essentials", description: "Sticky nav with a circle-wipe full-screen menu on phones", files: ["navbar.tsx", "navbar.css"], dependencies: ["utils"] },
    { name: "footer", category: "essentials", description: "Hairline-topped italic footer and grey contact icons", files: ["footer.tsx", "footer.css"], dependencies: ["utils"] },
    { name: "callout", category: "essentials", description: "Labelled glass panel with numbered points, and a big-number stats row", files: ["callout.tsx", "callout.css"], dependencies: ["utils"] },
    { name: "reading-progress", category: "essentials", description: "Teal glowing reading-progress bar across the top", files: ["reading-progress.tsx", "reading-progress.css"], dependencies: ["utils"] },
    { name: "loader", category: "essentials", description: "Full-screen loading overlay that only shows on slow loads", files: ["loader.tsx", "loader.css"], dependencies: ["utils"] },

    // ----- Signature -----
    { name: "finder", category: "signature", description: "The giant BHN Cinema search field with a placeholder that cycles through names", files: ["finder.tsx", "finder.css"], dependencies: ["utils"] },
    { name: "pop-layer", category: "signature", description: "Shared layer that pops a picture up at a random spot (used by hover-preview and flip-card)", files: ["pop-layer.ts", "pop-layer.css"] },
    { name: "hover-preview", category: "signature", description: "Hovering an element pops one of its pictures up somewhere on screen", files: ["hover-preview.tsx"], dependencies: ["utils", "pop-layer"] },
    { name: "flip-card", category: "signature", description: "Headshot that flips to a feathered grid of small pictures", files: ["flip-card.tsx", "flip-card.css"], dependencies: ["utils", "pop-layer"] },
    { name: "case-study", category: "signature", description: "Case-study layout: glowing progress rail, hero, facts, numbered sections, figures, pager", files: ["case-study.tsx", "case-study.css"], dependencies: ["utils", "tag", "lightbox"] },
    { name: "scroll-mouse", category: "signature", description: "Mouse outline whose teal wheel slides down and snaps back", files: ["scroll-mouse.tsx", "scroll-mouse.css"], dependencies: ["utils"] },
    { name: "fire-crackle", category: "signature", description: "A tiny synthesized fire crackle on every click", files: ["fire-crackle.tsx"] },
    { name: "shimmer", category: "signature", description: "Teal-white shimmer text on hover, and feathered images", files: ["shimmer.tsx", "shimmer.css"], dependencies: ["utils"] },
];
