// Basic JS for sliders, nav toggle, and dynamic year

document.addEventListener("DOMContentLoaded", function () {
  setCurrentYear();
  setupNavToggle();
  setupSlider("heroSlider", 6000);       // hero image slider every 6s
  setupSlider("reviewsSlider", 7000);    // review slider every 7s
});

/* Dynamic footer year */
function setCurrentYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* Mobile nav toggle */
function setupNavToggle() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (!navToggle || !mainNav) return;

  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

/* Generic slider setup
   containerId: ID of the slider wrapper
   intervalMs: time between slides (ms)
*/
function setupSlider(containerId, intervalMs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slides = Array.from(container.querySelectorAll(".hero-slide, .review-slide"));
  const prevBtn = container.querySelector(".slider-btn.prev");
  const nextBtn = container.querySelector(".slider-btn.next");

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlideFn() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAuto();
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    prevSlideFn();
    restartAuto();
  });

  function startAuto() {
    if (intervalMs && intervalMs > 0) {
      autoTimer = setInterval(nextSlide, intervalMs);
    }
  }

  function restartAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      startAuto();
    }
  }

  showSlide(0);
  startAuto();
}
