document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".faq-question");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      btn.classList.toggle("open");
      answer.style.maxHeight = answer.style.maxHeight
        ? null
        : answer.scrollHeight + "px";
    });
  });
});
