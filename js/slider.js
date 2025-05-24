(() => {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");

  let current = 1;
  let isTransitioning = false;

  function updateSlider() {
    const slideWidth = window.innerWidth;
    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(-${current * slideWidth}px)`;
  }

  function jumpTo(index) {
    const slideWidth = window.innerWidth;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    current = index;
  }

  nextBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    current++;
    updateSlider();
    isTransitioning = true;
  });

  prevBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    current--;
    updateSlider();
    isTransitioning = true;
  });

  slidesContainer.addEventListener("transitionend", () => {
    isTransitioning = false;

    if (current === slides.length - 1) jumpTo(1);
    if (current === 0) jumpTo(slides.length - 2);
  });

  window.addEventListener("resize", () => jumpTo(current));

  jumpTo(current);
})();
