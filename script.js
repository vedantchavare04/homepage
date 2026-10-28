(function () {
  var I = "#12213a",
    S = 'stroke="' + I + '" stroke-width="2" stroke-linejoin="round"';
  function wheel(x, y, r) {
    return '<g class="wh"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + I + '"/><path d="M' + (x - r + 2) + " " + y + "h" + (2 * r - 4) + '" stroke="#fff" stroke-width="2"/></g>';
  }
  function win(x, y, w, h, c) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="' + c + '" stroke="' + I + '" stroke-width="1.5"/>';
  }
  var V = {};
  V.plane =
    '<svg viewBox="0 0 72 30" aria-hidden="true"><path d="M7 13 3 2h8l8 11z" fill="#ff6b3d" ' + S + '/><path d="M3 16c0-3 5-6 12-6h36c10 0 19 3 19 6s-9 6-19 6H15C8 22 3 19 3 16z" fill="#fff" ' + S + '/><path d="M30 17 21 29h10l15-12z" fill="#ffc93c" ' + S + '/><path d="M55 12h7c3 1 6 2 6 4H55z" fill="#7cc7e6"/>' +
    [24, 31, 38, 45].map(function (x) { return '<circle cx="' + x + '" cy="16" r="1.8" fill="' + I + '"/>'; }).join("") + "</svg>";
  V.ship =
    '<svg viewBox="0 0 130 64" aria-hidden="true"><path d="M44 18V6l12 4-12 4" fill="#14a3a0" ' + S + '/><rect x="62" y="6" width="14" height="14" fill="#ffc93c" ' + S + '/><rect x="40" y="18" width="52" height="14" rx="3" fill="#fff" ' + S + '/><rect x="22" y="30" width="88" height="14" rx="3" fill="#fff" ' + S + "/>" +
    [34, 47, 60, 73, 86, 99].map(function (x) { return '<circle cx="' + x + '" cy="37" r="2.6" fill="#14a3a0" stroke="' + I + '" stroke-width="1.2"/>'; }).join("") +
    '<path d="M6 44h118l-16 16H24z" fill="#ff6b3d" ' + S + "/></svg>";
  V.train =
    '<svg viewBox="0 0 230 52" aria-hidden="true"><rect x="4" y="8" width="66" height="30" rx="6" fill="#ff6b3d" ' + S + '/><rect x="76" y="8" width="66" height="30" rx="6" fill="#ffc93c" ' + S + '/><rect x="70" y="26" width="6" height="4" fill="' + I + '"/><rect x="142" y="26" width="8" height="4" fill="' + I + '"/>' +
    [0, 1, 2, 3].map(function (i) { return win(12 + i * 15, 15, 10, 11, "#c4e9f7") + win(84 + i * 15, 15, 10, 11, "#c4e9f7"); }).join("") +
    '<rect x="150" y="14" width="74" height="24" rx="5" fill="#14a3a0" ' + S + '/><rect x="152" y="4" width="34" height="14" rx="3" fill="#14a3a0" ' + S + '/><rect x="204" y="4" width="12" height="12" fill="' + I + '"/>' + win(158, 8, 20, 6, "#c4e9f7") +
    '<circle class="puff" cx="210" cy="2" r="5" fill="#fff"/><circle class="puff" style="animation-delay:-1s" cx="210" cy="2" r="5" fill="#fff"/>' +
    [20, 54, 92, 126, 166, 196, 214].map(function (x) { return wheel(x, 42, 6); }).join("") + "</svg>";
  V.bus =
    '<svg viewBox="0 0 120 56" aria-hidden="true"><rect x="4" y="6" width="108" height="36" rx="8" fill="#ffc93c" ' + S + '/><rect x="4" y="30" width="108" height="5" fill="#ff6b3d"/>' +
    [0, 1, 2, 3].map(function (i) { return win(14 + i * 18, 12, 13, 12, "#c4e9f7"); }).join("") + win(88, 12, 18, 18, "#c4e9f7") + '<rect x="108" y="30" width="7" height="5" rx="2" fill="#fff" ' + S + "/>" + wheel(28, 44, 8) + wheel(90, 44, 8) + "</svg>";
  function cloud(top, w, dur, delay, s) {
    return '<svg class="cloud" style="top:' + top + ";width:" + w + "px;animation-duration:" + dur + "s;animation-delay:-" + delay + "s;--s:" + s + '" viewBox="0 0 120 44" aria-hidden="true"><path d="M22 42a18 18 0 0 1 0-36 24 24 0 0 1 44-4 20 20 0 0 1 34 14 15 15 0 0 1 2 26z" fill="#fff"/></svg>';
  }
  var nav = document.getElementById("nav");
  if (nav)
    nav.insertAdjacentHTML("afterbegin", '<div class="sky" aria-hidden="true">' + cloud("30px", 70, 60, 10, "15%") + cloud("2px", 54, 90, 55, "70%") + '<div class="flyer"><i class="trail"></i>' + V.plane + "</div></div>");
  document.querySelectorAll("[data-clouds]").forEach(function (el) {
    el.insertAdjacentHTML("afterbegin", cloud("12%", 120, 110, 20, "8%") + cloud("46%", 90, 80, 60, "48%") + cloud("26%", 150, 140, 100, "30%"));
  });
  document.querySelectorAll("[data-lanes]").forEach(function (el) {
    var out = '<svg class="hills" viewBox="0 0 1200 56" preserveAspectRatio="none" aria-hidden="true"><path d="M0 56V30Q90 4 210 28T420 24 640 34 860 10 1060 30 1200 20V56z" fill="#a9ddb9" stroke="' + I + '" stroke-width="3"/></svg>';
    el.dataset.lanes.split(" ").forEach(function (l) {
      var v = { sea: ["ship", "-18s", "60%"], rail: ["train", "-5s", "40%"], road: ["bus", "-9s", "70%"] }[l];
      out += '<div class="lane ' + l + '"><div class="veh ' + v[0] + '" style="--o:' + v[1] + ";--s:" + v[2] + '"><div class="bob">' + V[v[0]] + "</div></div></div>";
    });
    el.innerHTML = out;
  });
  if (document.body.hasAttribute("data-ext"))
    document.querySelectorAll('a[href^="http"]').forEach(function (a) { a.target = "_blank"; a.rel = "noopener noreferrer"; });

  var btn = document.getElementById("burger");
  function set(o) { nav.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); }
  btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("nav a")) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });

  var els = document.querySelectorAll(".hl,.step");
  if (!("IntersectionObserver" in window)) return els.forEach(function (e) { e.classList.add("shown"); });
  var io = new IntersectionObserver(function (list) {
    list.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("shown"); io.unobserve(x.target); } });
  }, { threshold: 0.35 });
  els.forEach(function (e) { io.observe(e); });
})();

/* Destinations carousel: snap scrolling, centre-focus, drag, plane progress */
(function () {
  var track = document.getElementById("dtrack");
  if (!track) return;
  var cards = Array.prototype.slice.call(track.querySelectorAll(".pc")),
    prev = document.getElementById("dprev"),
    next = document.getElementById("dnext"),
    count = document.getElementById("dcount"),
    plane = document.getElementById("dplane"),
    line = document.querySelector(".droute .dline"),
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ticking = false,
    active = 0;

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function update() {
    ticking = false;
    var box = track.getBoundingClientRect(),
      mid = box.left + box.width / 2,
      best = 1e9;
    cards.forEach(function (c, i) {
      var r = c.getBoundingClientRect(),
        d = Math.abs(r.left + r.width / 2 - mid),
        f = Math.min(1, d / (r.width * 1.1));
      c.style.setProperty("--f", f.toFixed(3));
      if (d < best) { best = d; active = i; }
    });
    cards.forEach(function (c, i) {
      var on = i === active;
      c.classList.toggle("on", on);
      if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current");
    });
    count.textContent = pad(active + 1) + " / " + pad(cards.length);
    var max = track.scrollWidth - track.clientWidth,
      p = max > 0 ? track.scrollLeft / max : 0;
    if (line && plane) {
      var lr = line.getBoundingClientRect(), pr = plane.parentNode.getBoundingClientRect();
      plane.style.left = (lr.left - pr.left + lr.width * p) + "px";
    }
    setDisabled(prev, track.scrollLeft < 4);
    setDisabled(next, track.scrollLeft > max - 4);
  }
  function setDisabled(b, off) { b.setAttribute("aria-disabled", off ? "true" : "false"); }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

  function go(dir) {
    var to = Math.max(0, Math.min(cards.length - 1, active + dir)),
      c = cards[to];
    track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }
  prev.addEventListener("click", function () { go(-1); });
  next.addEventListener("click", function () { go(1); });
  track.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  });

  /* mouse drag (touch and trackpads already scroll natively) */
  var down = false, moved = false, sx = 0, sl = 0;
  track.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true; moved = false; sx = e.clientX; sl = track.scrollLeft;
  });
  window.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 5) { moved = true; track.classList.add("drag"); }
    if (moved) track.scrollLeft = sl - dx;
  });
  function end() {
    if (!down) return;
    down = false;
    if (moved) { track.classList.remove("drag"); }
  }
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
  track.addEventListener("click", function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  update();
  window.addEventListener("load", update);
})();
