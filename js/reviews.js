(() => {
  const reviewSlidesContainer = document.querySelector(".review-slides");
  const reviewSlides = document.querySelectorAll(
    ".review-slide, .review-slide-clone"
  );
  const dots = document.querySelectorAll(".dot");

  let reviewCurrent = 1;
  let reviewIsTransitioning = false;
  let autoSlideInterval = setInterval(nextReview, 10000); // Auto-slide every 10 seconds

  function updateReviewSlider() {
    reviewSlidesContainer.style.transition = "transform 0.5s ease-in-out";
    reviewSlidesContainer.style.transform = `translateX(-${
      reviewCurrent * 100
    }%)`;
  }

  function jumpToReview(index) {
    reviewSlidesContainer.style.transition = "none";
    reviewSlidesContainer.style.transform = `translateX(-${index * 100}%)`;
    reviewCurrent = index;
  }

  function updateDots() {
    dots.forEach((dot) => dot.classList.remove("active"));
    const visibleIndex = reviewCurrent - 1;
    if (dots[visibleIndex]) {
      dots[visibleIndex].classList.add("active");
    }
  }

  function nextReview() {
    if (reviewIsTransitioning) return;
    reviewCurrent++;
    updateReviewSlider();
    reviewIsTransitioning = true;
    updateDots();
  }

  reviewSlidesContainer.addEventListener("transitionend", () => {
    reviewIsTransitioning = false;

    if (reviewCurrent === reviewSlides.length - 1) {
      jumpToReview(1);
    } else if (reviewCurrent === 0) {
      jumpToReview(reviewSlides.length - 2);
    }

    updateDots();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      reviewCurrent = index + 1;
      updateReviewSlider();
      updateDots();
      autoSlideInterval = setInterval(nextReview, 10000);
    });
  });

  window.addEventListener("resize", () => {
    jumpToReview(reviewCurrent);
  });

  // Init
  jumpToReview(reviewCurrent);
  updateDots();
})();
