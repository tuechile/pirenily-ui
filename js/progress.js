// Reading progress: widens .progress-bar as the page scrolls
(function () {
    var bar = document.querySelector(".progress-bar");
    if (!bar) return;
    function onScroll() {
        var doc = document.documentElement;
        var max = doc.scrollHeight - doc.clientHeight;
        bar.style.width = (max > 0 ? doc.scrollTop / max * 100 : 0).toFixed(2) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
})();
