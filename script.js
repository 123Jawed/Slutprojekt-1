(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const dotsEl = document.getElementById("dots");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  if (!slides.length || !dotsEl) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Visa bild ${i + 1} av ${slides.length}`);
    btn.addEventListener("click", () => {
      show(i);
      restart();
    });
    li.append(btn);
    dotsEl.append(li);
    return btn;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
    dots.forEach((d, n) => d.setAttribute("aria-current", String(n === index)));
  }

  function start() {
    if (reduceMotion) return;
    timer = setInterval(() => show(index + 1), 5000);
  }
  function restart() {
    clearInterval(timer);
    start();
  }

  prev.addEventListener("click", () => {
    show(index - 1);
    restart();
  });
  next.addEventListener("click", () => {
    show(index + 1);
    restart();
  });

  const region = document.querySelector(".slideshow");
  region.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      show(index - 1);
      restart();
    }
    if (e.key === "ArrowRight") {
      show(index + 1);
      restart();
    }
  });
  region.addEventListener("mouseenter", () => clearInterval(timer));
  region.addEventListener("mouseleave", start);
  region.addEventListener("focusin", () => clearInterval(timer));

  show(2);
  start();
})();
