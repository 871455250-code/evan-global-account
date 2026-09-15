(function () {
  "use strict";
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();
  if (!toggle || !links) return;

  function setMenu(open, returnFocus) {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true", false);
  });
  links.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false, false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });
  document.addEventListener("click", function (event) {
    if (!links.contains(event.target) && !toggle.contains(event.target)) setMenu(false, false);
  });
  document.addEventListener("focusin", function (event) {
    if (!links.contains(event.target) && !toggle.contains(event.target)) setMenu(false, false);
  });
  window.matchMedia("(max-width: 1060px)").addEventListener("change", function () {
    setMenu(false, false);
  });
})();
