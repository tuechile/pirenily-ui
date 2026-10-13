// Finder: the placeholder cycles through data-names ("A|B|C") every data-interval ms (default 400).
// Enter submits the surrounding form.
(function () {
    document.querySelectorAll(".finder-input").forEach(function (input) {
        var names = (input.dataset.names || "Pirenily|Chi Le|Iron Pig|Emily|Chi Bell").split("|");
        var i = 0;
        setInterval(function () {
            input.placeholder = names[i];
            i = (i + 1) % names.length;
        }, Number(input.dataset.interval) || 400);

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && input.form) {
                e.preventDefault();
                input.form.requestSubmit ? input.form.requestSubmit() : input.form.submit();
            }
        });
    });
})();
