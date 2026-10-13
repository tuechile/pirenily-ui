// Flip card: click (or Enter/Space) flips to the back. Hovering the front, or a .flip-thumb
// on the back, pops that picture up at a random spot; on touch, tap a thumb to pop it.
(function () {
    var canHover = window.matchMedia("(hover: hover)").matches;
    var layer = document.querySelector(".pop-layer");
    if (!layer) {
        layer = document.createElement("div");
        layer.className = "pop-layer";
        document.body.appendChild(layer);
    }
    var shownSrc = null;

    function show(src) {
        var img = new Image();
        shownSrc = src;
        img.onload = function () {
            if (shownSrc !== src) return; // already hidden again
            var w = Math.min(300, innerWidth - 32);
            var h = img.naturalHeight * w / img.naturalWidth;
            img.className = "pop";
            img.alt = "";
            img.style.width = w + "px";
            img.style.left = Math.random() * (innerWidth - w) + "px";
            img.style.top = Math.random() * Math.max(0, innerHeight - h) + "px";
            layer.innerHTML = "";
            layer.appendChild(img);
        };
        img.src = src;
    }

    function hide() {
        shownSrc = null;
        layer.innerHTML = "";
    }

    document.querySelectorAll(".flip-card").forEach(function (card) {
        var thumbs = Array.prototype.slice.call(card.querySelectorAll(".flip-thumb"));
        var front = card.querySelector(".flip-card-front");
        var last = -1;

        function randomSrc() {
            if (thumbs.length < 2) return thumbs[0] && thumbs[0].src;
            var i = Math.floor(Math.random() * (thumbs.length - 1));
            if (i >= last) i++;
            last = i;
            return thumbs[i].src;
        }

        function flip() {
            hide();
            card.classList.toggle("flipped");
            card.setAttribute("aria-pressed", card.classList.contains("flipped"));
        }

        card.addEventListener("click", flip);
        card.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
        });

        if (canHover && front && thumbs.length) {
            front.addEventListener("mouseenter", function () { show(randomSrc()); });
            front.addEventListener("mouseleave", hide);
        }

        thumbs.forEach(function (t) {
            t.addEventListener("click", function (e) {
                e.stopPropagation();
                if (!canHover) shownSrc === t.src ? hide() : show(t.src);
            });
            if (canHover) {
                t.addEventListener("mouseenter", function () { show(t.src); });
                t.addEventListener("mouseleave", hide);
            }
        });
    });

    if (!canHover) document.addEventListener("click", hide);
})();
