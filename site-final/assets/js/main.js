/* Houilles Athletic Club, interactions légères (menu mobile, apparitions) */

(function () {
  "use strict";

  /* Menu mobile ---------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
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
