<script>
document.addEventListener("DOMContentLoaded", () => {
  // helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Smooth anchors with topbar offset
  const topbar = $(".topbar");
  const offset = () => (topbar ? topbar.getBoundingClientRect().height : 0) + 12;

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      const top = window.scrollY + target.getBoundingClientRect().top - offset();
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", href);
    });
  });

  // Background slideshow (two layers crossfade)
  const bgA = document.querySelector(".bg_layer--a");
  const bgB = document.querySelector(".bg_layer--b");

  const caseImgs = $$(".case[data-img]").map((c) => c.getAttribute("data-img")).filter(Boolean);
  const fallback = [
    "https://static.tildacdn.com/tild3532-3332-4637-b332-333733383339/bg01.jpg",
    "https://static.tildacdn.com/tild3532-3332-4637-b332-333733383339/bg02.jpg",
    "https://static.tildacdn.com/tild3532-3332-4637-b332-333733383339/bg03.jpg"
  ];
  const images = caseImgs.length ? caseImgs : fallback;

  const setBg = (el, url) => el && url && (el.style.backgroundImage = `url("${url}")`);

  let idx = 0;
  let front = bgA;
  let back = bgB;

  if (bgA && bgB && images.length) {
    setBg(front, images[0]);
    front.classList.add("is-on");

    setInterval(() => {
      idx = (idx + 1) % images.length;
      setBg(back, images[idx]);
      back.classList.add("is-on");
      front.classList.remove("is-on");
      [front, back] = [back, front];
    }, 7000);
  }

  // Badge flip (mobile tap)
  const badge = $(".badge");
  if (badge) {
    const supportsHover = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!supportsHover) {
      badge.addEventListener("click", () => badge.classList.toggle("is-flipped"));
    }
  }

  // "Смотреть кейсы" button
  const toCases = $("[data-scroll='cases']");
  if (toCases) {
    toCases.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $("#cases");
      if (!target) return;
      const top = window.scrollY + target.getBoundingClientRect().top - offset();
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", "#cases");
    });
  }
});
</script>
