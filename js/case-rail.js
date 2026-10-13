// Case-study rail: numbers every [data-index] section inside .cs-shell, lists it in .cs-index,
// and lights the one being read. The line fills ring to ring as sections cross the reading line.
(function () {
    var shell = document.querySelector(".cs-shell");
    var list = shell && shell.querySelector(".cs-index");
    if (!list) return;

    // Stick at the spot the rail starts in, so it never scrolls first
    var railTop = shell.getBoundingClientRect().top + scrollY + parseFloat(getComputedStyle(shell).paddingTop);
    shell.style.setProperty("--rail-top", railTop + "px");

    var hero = shell.querySelector(".cs-hero");
    var title = shell.querySelector(".cs-rail-title");
    if (title && hero) title.textContent = hero.dataset.index || "";

    var sections = Array.prototype.filter.call(shell.querySelectorAll("[data-index]"), function (el) { return el !== hero; });
    var links = sections.map(function (sec, i) {
        var num = String(i + 1).padStart(2, "0");
        sec.id = sec.id || sec.dataset.index.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        var slot = sec.querySelector(".cs-num");
        if (slot) slot.textContent = num;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#" + sec.id;
        a.setAttribute("aria-label", num + " " + sec.dataset.index);
        a.innerHTML = '<span class="cs-index-label"></span>';
        a.firstChild.textContent = sec.dataset.index;
        li.appendChild(a);
        list.appendChild(li);
        return a;
    });

    var fill = document.createElement("span");
    fill.className = "cs-fill";
    list.prepend(fill);
    list.style.setProperty("--n", sections.length);

    function onScroll() {
        var line = scrollY + innerHeight * 0.35;
        var tops = sections.map(function (s) { return s.getBoundingClientRect().top + scrollY; });
        var centers = links.map(function (a) { return a.parentNode.offsetTop + a.offsetHeight / 2; });
        var current = -1;
        tops.forEach(function (top, i) { if (top <= line) current = i; });
        var y = centers[0] || 0;
        if (current >= 0 && current < sections.length - 1) {
            var t = Math.min(1, (line - tops[current]) / (tops[current + 1] - tops[current]));
            y = centers[current] + t * (centers[current + 1] - centers[current]);
        } else if (current >= 0) {
            y = centers[current];
        }
        fill.style.height = (y - (centers[0] || 0)) + "px";
        links.forEach(function (a, i) {
            a.classList.toggle("is-current", i === current);
            a.classList.toggle("is-passed", i < current);
        });
    }
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();
