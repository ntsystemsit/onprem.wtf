// Page transition animations for Turbo navigation
// Uses only opacity to avoid visibility getting stuck

let isAnimatingOut = false;

document.addEventListener("turbo:visit", () => {
  let main = document.querySelector("main");
  if (!main || main.dataset.turboTransition == "false") return;

  let [movement, scale] = ["15px", "0.99"];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    [movement, scale] = ["7px", "1"]
  };

  isAnimatingOut = true;
  main.style.transformOrigin = "50% 0%";

  main.animate(
    [
      { opacity: 1, transform: "translateY(0px) scale(1)" },
      { opacity: 0, transform: `translateY(${movement}) scale(${scale})` }
    ],
    { duration: 200, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" }
  );
});

document.addEventListener("turbo:before-render", (event) => {
  // Ensure incoming content starts visible
  let newMain = event.detail.newBody?.querySelector("main");
  if (newMain) {
    newMain.style.opacity = "0";
  }
  isAnimatingOut = false;
});

document.addEventListener("turbo:render", () => {
  let main = document.querySelector("main");
  if (!main || main.dataset.turboTransition == "false") return;

  let [movement, scale] = ["-10px", "0.99"];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    [movement, scale] = ["-5px", "1"]
  };

  main.style.transformOrigin = "50% 0%";

  main.animate(
    [
      { opacity: 0, transform: `translateY(${movement}) scale(${scale})` },
      { opacity: 1, transform: "translateY(0px) scale(1)" }
    ],
    { duration: 150, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "forwards" }
  );
});

// Fallback: ensure main is always visible on page load
document.addEventListener("turbo:load", () => {
  let main = document.querySelector("main");
  if (main) {
    main.style.opacity = "1";
  }
});
