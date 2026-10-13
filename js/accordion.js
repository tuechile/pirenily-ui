// Accordion: .acc-btn toggles the .acc-panel right after it, animating max-height
(function () {
    document.querySelectorAll(".acc-btn").forEach(function (btn) {
        var panel = btn.nextElementSibling;
        if (!panel || !panel.classList.contains("acc-panel")) return;
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", function () {
            var open = btn.getAttribute("aria-expanded") !== "true";
            btn.setAttribute("aria-expanded", String(open));
            panel.style.maxHeight = open ? panel.scrollHeight + "px" : "";
        });
    });
})();
