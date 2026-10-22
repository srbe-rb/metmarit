(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Sluiten" : "Menu";
    });
  }

  // Rotating verb in "___ met Marit."
  var rot = document.querySelector("[data-rotate]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (rot && !reduce) {
    var words = rot.getAttribute("data-rotate").split("|");
    var el = rot.querySelector(".rotator__word");
    var i = 0;
    setInterval(function () {
      rot.classList.remove("is-in");
      rot.classList.add("is-out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        rot.classList.remove("is-out");
        rot.classList.add("is-in");
      }, 340);
    }, 2600);
  }

  // Forms: connected to a form service at launch. Until then, show what would happen.
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.hidden = false;
        status.textContent = "Dit is een voorbeeld: het formulier wordt bij livegang gekoppeld. Mail of bel Marit gerust direct.";
      }
    });
  });
})();

// Instagram slider on "Wie is Marit?": fills from the JSON feed in site.json (instagramFeed); placeholders until then.
(function () {
  var track = document.querySelector("[data-insta]");
  if (!track) return;
  var step = function (dir) { track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" }); };
  var prev = document.querySelector("[data-insta-prev]"), next = document.querySelector("[data-insta-next]");
  if (prev) prev.addEventListener("click", function () { step(-1); });
  if (next) next.addEventListener("click", function () { step(1); });

  var url = track.getAttribute("data-feed");
  if (!url) return;
  fetch(url).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
    var posts = data && data.posts;
    if (!posts || !posts.length) return;
    track.textContent = "";
    posts.forEach(function (p) {
      var src = (p.sizes && (p.sizes.medium || p.sizes.small) || {}).mediaUrl || p.thumbnailUrl || p.mediaUrl;
      if (!src) return;
      var a = document.createElement("a");
      a.className = "insta__item"; a.href = p.permalink;
      var img = document.createElement("img");
      img.src = src; img.loading = "lazy";
      img.alt = p.altText || p.prunedCaption || "Foto van Marit op Instagram";
      a.appendChild(img); track.appendChild(a);
    });
  }).catch(function () { /* keep the placeholders */ });
})();
