/* Houilles Athletic Club, interactions légères
   (menu mobile, header au scroll, apparitions) */

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  /* Menu mobile ---------------------------------------------------------- */

  function closeNav() {
    if (!nav || !toggle) { return; }
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    if (header) { header.classList.remove("nav-open"); }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (header) { header.classList.toggle("nav-open", open); }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeNav();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }

  /* Header transparent qui devient clair au scroll (homepage) ------------- */

  var overlay = header && header.classList.contains("header-overlay");

  function headerCheck() {
    if (!overlay) { return; }
    header.classList.toggle("scrolled", window.scrollY > 40);
  }

  if (overlay) {
    window.addEventListener("scroll", headerCheck, { passive: true });
    headerCheck();
  }

  /* Apparition au scroll -------------------------------------------------- */

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduced) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var ticking = false;

  function revealCheck() {
    ticking = false;
    var limit = window.innerHeight * 0.92;
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add("in");
        return false;
      }
      return true;
    });
  }

  function onScroll() {
    if (!ticking && items.length) {
      ticking = true;
      window.requestAnimationFrame(revealCheck);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { revealCheck(); }
  });
  window.addEventListener("pageshow", revealCheck);
  revealCheck();
})();
