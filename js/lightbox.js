// Lightbox: click an img.lightboxable, or an a.lightbox (opens its href), to see it full size.
// Close with the x, a click outside the picture, or Esc. No fades.
(function () {
    var overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = '<button type="button" class="close-btn" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(overlay);
    var img = overlay.querySelector("img");

    function open(src, alt) {
        img.src = src;
        img.alt = alt || "Expanded image";
        overlay.classList.add("open");
    }

    function shut() {
        overlay.classList.remove("open");
        img.removeAttribute("src");
    }

    document.addEventListener("click", function (e) {
        var t = e.target instanceof Element ? e.target : null;
        if (!t) return;
        var link = t.closest("a.lightbox");
        if (link) { e.preventDefault(); open(link.href, link.title); return; }
        if (t.matches("img.lightboxable")) open(t.currentSrc || t.src, t.alt);
    });
    overlay.querySelector(".close-btn").addEventListener("click", shut);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) shut(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") shut(); });
})();
