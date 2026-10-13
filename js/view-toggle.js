// View toggle: a frosted pill slides behind the active .view-btn.
// Each button's data-view filters the [data-views~="<view>"] items in data-target;
// the view "all" shows everything. Fires a "viewchange" event on the toggle.
(function () {
    document.querySelectorAll(".view-toggle").forEach(function (toggle) {
        var btns = toggle.querySelectorAll(".view-btn");
        var scope = toggle.dataset.target ? document.querySelector(toggle.dataset.target) : null;
        var items = scope ? scope.querySelectorAll("[data-views]") : [];
        var pill = document.createElement("span");
        pill.className = "view-pill";
        toggle.appendChild(pill);
        toggle.classList.add("has-pill");

        function place(animate) {
            var on = toggle.querySelector(".view-btn.active");
            if (!on) return;
            if (!animate) pill.style.transition = "none";
            pill.style.width = on.offsetWidth + "px";
            pill.style.transform = "translateX(" + on.offsetLeft + "px)";
            if (!animate) { pill.offsetWidth; pill.style.transition = ""; }
        }

        function setView(view, animate) {
            items.forEach(function (el) {
                var show = view === "all" || el.dataset.views.split(/\s+/).indexOf(view) !== -1;
                el.style.display = show ? "" : "none";
            });
            btns.forEach(function (b) {
                var on = b.dataset.view === view;
                b.classList.toggle("active", on);
                b.setAttribute("aria-pressed", on);
            });
            place(animate);
            toggle.dispatchEvent(new CustomEvent("viewchange", { detail: view }));
        }

        btns.forEach(function (b) {
            b.addEventListener("click", function () { setView(b.dataset.view, true); });
        });

        var start = toggle.querySelector(".view-btn.active") || btns[0];
        setView(start.dataset.view, false);
        document.fonts && document.fonts.ready.then(function () { place(false); });
        window.addEventListener("resize", function () { place(false); });
    });
})();
