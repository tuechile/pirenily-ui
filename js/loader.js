// Loader GIF between pages. It only appears when a page is slow (over 200ms),
// except on the way to the landing page ("/" or data-loader-home), where it always plays.
document.addEventListener("DOMContentLoaded", function () {
    var loader = document.querySelector(".loader-container");
    if (!loader) return;
    var SLOW = 200;
    var HOME_HOLD = 400;
    var home = new URL(loader.dataset.loaderHome || "/", location.href).pathname;
    var timer = null;

    function showLoader() { loader.classList.remove("hidden"); }
    function showIfSlow() { clearTimeout(timer); timer = setTimeout(showLoader, SLOW); }
    function hideLoader() { clearTimeout(timer); loader.classList.add("hidden"); }

    if (document.readyState !== "complete") showIfSlow();
    window.addEventListener("load", hideLoader);
    // Coming back via the back button restores this page from cache
    window.addEventListener("pageshow", function (e) { if (e.persisted) hideLoader(); });

    document.querySelectorAll("a[href]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (link.classList.contains("lightbox")) return;
            // New tab, new window, or a download: this page stays, so no loader
            if (link.target === "_blank" || link.hasAttribute("download") ||
                e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            var url = new URL(link.href, location.href);
            if (url.origin !== location.origin) return;
            if (url.pathname === location.pathname && url.hash) return;

            if (url.pathname === home) {
                e.preventDefault();
                showLoader();
                setTimeout(function () { location.href = url.href; }, HOME_HOLD);
            } else {
                showIfSlow();
            }
        });
    });
});
