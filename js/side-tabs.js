// Side tabs: each .side-tab[data-tab] shows the [data-category] items that match it.
// data-target on .side-tabs scopes the items (a selector); data-reveal makes the tabs
// slide in only once that element reaches 85% down the viewport.
(function () {
    document.querySelectorAll(".side-tabs").forEach(function (group) {
        var tabs = group.querySelectorAll(".side-tab");
        var scope = group.dataset.target ? document.querySelector(group.dataset.target) : document;
        var items = scope ? scope.querySelectorAll("[data-category]") : [];

        function show(tab) {
            items.forEach(function (el) {
                el.style.display = el.dataset.category === tab ? "" : "none";
            });
            tabs.forEach(function (b) {
                var on = b.dataset.tab === tab;
                b.classList.toggle("active", on);
                b.setAttribute("aria-pressed", on);
            });
        }

        tabs.forEach(function (b) {
            b.addEventListener("click", function () { show(b.dataset.tab); });
        });
        var first = group.querySelector(".side-tab.active") || tabs[0];
        if (first) show(first.dataset.tab);

        var anchor = group.dataset.reveal && document.querySelector(group.dataset.reveal);
        if (!anchor) return;
        function update() {
            group.classList.toggle("show", anchor.getBoundingClientRect().top <= innerHeight * 0.85);
        }
        window.addEventListener("scroll", update, { passive: true });
        update();
    });
})();
