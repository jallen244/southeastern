function loadSection(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      const section = document.getElementById(id);
      section.innerHTML = data;
      section.style.display = "block";

      // Call the callback if provided
      if (typeof callback === "function") callback();
    })
    .catch((err) => console.error(`Error loading ${file}:`, err));
}

// Highlight active link AFTER header is loaded
function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  console.log("Current page:", currentPage);

  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// Load header and footer (header first, with nav highlighting callback)
document.addEventListener("DOMContentLoaded", () => {
  loadSection("header-placeholder", "header.html", highlightActiveNav);
  loadSection("footer-placeholder", "footer.html");
});
