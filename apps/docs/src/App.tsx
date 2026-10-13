import { useEffect, useState } from "react";
import { Finder, Footer, Kicker, Navbar, ScrollMouse, ViewToggle } from "@pirenily-ui/react";
import { Command } from "./parts";
import { Essentials, ESSENTIAL_IDS } from "./essentials";
import { Signature, SIGNATURE_IDS } from "./signature";

type Mode = "essentials" | "signature";

const modeFromHash = (): Mode => (location.hash === "#signature" ? "signature" : "essentials");

export function App() {
    const [mode, setMode] = useState<Mode>(modeFromHash);

    // The nav links and back/forward switch views through the hash
    useEffect(() => {
        const onHash = () => {
            if (location.hash === "#essentials" || location.hash === "#signature") {
                setMode(modeFromHash());
                document.getElementById("components")?.scrollIntoView();
            }
        };
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    // The finder jumps to a component by name, switching views if it has to
    function find(query: string) {
        const q = query.toLowerCase().trim().replace(/\s+/g, "-");
        const all = [...ESSENTIAL_IDS, ...SIGNATURE_IDS];
        const id = all.find((i) => i === q) ?? all.find((i) => i.includes(q) || q.includes(i));
        if (!id) return;
        choose(SIGNATURE_IDS.includes(id) ? "signature" : "essentials");
        setTimeout(() => document.getElementById(id)?.scrollIntoView());
    }

    function choose(m: Mode) {
        setMode(m);
        history.replaceState(null, "", `#${m}`);
    }

    return (
        <>
            <div className="d-landing">
                <Navbar
                    brand="Pirenily"
                    brandHref="#"
                    links={[
                        { href: "#start", label: "Start" },
                        { href: "#essentials", label: "Essentials", current: mode === "essentials" },
                        { href: "#signature", label: "Signature", current: mode === "signature" },
                        { href: "https://github.com/tuechile/pirenily-ui", label: "GitHub" },
                    ]}
                />
                <Finder names={["Pirenily UI", "Chi Le", "Iron Pig", "Emily", "Chi Bell"]} onSearch={find} />
                <div className="d-landing-foot">
                    <p>Dark, serif React components from <a href="https://pirenily.com" target="_blank" rel="noopener">pirenily.com</a>, with a CLI.</p>
                    <ScrollMouse href="#start" aria-label="Scroll down to get started" />
                </div>
            </div>

            <main className="d-main">
                <section className="d-start" id="start">
                    <Kicker accent>Get started</Kicker>
                    <h2>Copy the components into your project</h2>
                    <p className="d-note">Like shadcn/ui: the CLI copies each component's source and its CSS into your app, so you own it and can change anything. Run init once for the tokens and the font, then add what you need.</p>
                    <Command>npx pirenily-ui init</Command>
                    <Command>npx pirenily-ui add card view-toggle</Command>
                    <Command>npx pirenily-ui add --signature</Command>
                    <p className="d-note">Or install the package and import everything:</p>
                    <Command>npm i @pirenily-ui/react @pirenily-ui/tokens</Command>
                    <pre className="d-code"><code>{`import "@pirenily-ui/tokens";
import "@pirenily-ui/react/styles.css";
import { Card, ViewToggle } from "@pirenily-ui/react";`}</code></pre>
                </section>

                <div className="d-switch" id="components">
                    <ViewToggle<Mode>
                        aria-label="Which components"
                        value={mode}
                        onValueChange={choose}
                        options={[
                            { value: "essentials", label: `Essentials · ${ESSENTIAL_IDS.length}` },
                            { value: "signature", label: `Signature · ${SIGNATURE_IDS.length}` },
                        ]}
                    />
                    <p className="d-note d-center-text">
                        {mode === "essentials"
                            ? "General-purpose building blocks, in the Pirenily look."
                            : "The detailed, one-of-a-kind pieces that make pirenily.com feel like itself."}
                    </p>
                </div>

                <div data-mode={mode} key={mode}>
                    {mode === "essentials" ? <Essentials /> : <Signature />}
                </div>
            </main>

            <Footer meta="Chi (Tue) Le | Pirenily UI">
                Components from <a href="https://pirenily.com" target="_blank" rel="noopener">pirenily.com</a> · source on <a href="https://github.com/tuechile/pirenily-ui" target="_blank" rel="noopener">GitHub</a>
            </Footer>
        </>
    );
}
