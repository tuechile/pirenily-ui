import "./pop-layer.css";

// One fixed layer shared by every pop-up picture on the page. A picture shows at a
// random spot, instantly, and is gone the moment it's hidden. No fades.
let layer: HTMLDivElement | null = null;
let wanted: string | null = null;

function getLayer() {
    if (!layer || !layer.isConnected) {
        layer = document.createElement("div");
        layer.className = "pui-pop-layer";
        document.body.appendChild(layer);
    }
    return layer;
}

/** Pop `src` up somewhere on screen. width defaults to a random 180–320px. */
export function showPop(src: string, width?: number) {
    wanted = src;
    const img = new Image();
    img.onload = () => {
        if (wanted !== src) return; // hidden again before it loaded
        const w = Math.min(width ?? Math.round(180 + Math.random() * 140), innerWidth - 32);
        const h = (img.naturalHeight * w) / img.naturalWidth;
        img.className = "pui-pop";
        img.alt = "";
        img.style.width = w + "px";
        img.style.left = Math.round(Math.random() * Math.max(0, innerWidth - w)) + "px";
        img.style.top = Math.round(Math.random() * Math.max(0, innerHeight - h)) + "px";
        const l = getLayer();
        l.replaceChildren(img);
    };
    img.src = src;
}

export function hidePop() {
    wanted = null;
    layer?.replaceChildren();
}

export function currentPop() {
    return wanted;
}
