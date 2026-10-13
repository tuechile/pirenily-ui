import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ViewToggle } from "@pirenily-ui/react";

const options = [{ value: "selected", label: "Selected" }, { value: "brand", label: "Brand" }, { value: "all", label: "All" }];

const meta: Meta<typeof ViewToggle> = {
    title: "Essentials/View toggle",
    component: ViewToggle,
    args: { options, defaultValue: "selected" },
    parameters: { docs: { description: { component: "Segmented control. Effects: **sliding pill**, **teal hover**, **press shrink**.\n\n`npx pirenily-ui add view-toggle`" } } },
};
export default meta;
type Story = StoryObj<typeof ViewToggle>;

export const Playground: Story = {};
export const TwoOptions: Story = { args: { options: [{ value: "essentials", label: "Essentials" }, { value: "signature", label: "Signature" }], defaultValue: "essentials" } };

function Filtering() {
    const [view, setView] = useState("selected");
    const work = [["HackHarvard", "selected brand"], ["Merch", "selected"], ["Highlander", "brand"], ["Recit", "brand"], ["Portal", "selected"]];
    return (
        <div>
            <ViewToggle options={options} value={view} onValueChange={setView} />
            <ul style={{ fontFamily: "var(--font-serif)", color: "var(--lead)", fontStyle: "italic" }}>
                {work.filter(([, v]) => view === "all" || v.includes(view)).map(([n]) => <li key={n}>{n}</li>)}
            </ul>
        </div>
    );
}
export const ControlledFiltering: Story = { name: "Filtering a list", render: () => <Filtering /> };
