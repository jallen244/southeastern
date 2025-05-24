function loadSection(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      const section = document.getElementById(id);
      section.innerHTML = data;
      section.style.display = "block";

      // Highlight nav if needed
      if (typeof callback === "function") callback();

      // After header is in place, wire up the search toggle
      if (id === "header-placeholder") setupSearchDropdown();
    })
    .catch((err) => console.error(`Error loading ${file}:`, err));
}

function setupHamburgerMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("active");
  });
}

function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href === currentPage) link.classList.add("active");
  });
  setupHamburgerMenu();
}

function setupSearchDropdown() {
  const searchLink = document.querySelector(".search-link");
  const searchDropdown = document.querySelector(".search-dropdown");
  if (!searchLink || !searchDropdown) return;

  // Toggle dropdown & icon color
  searchLink.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = searchDropdown.style.display === "block";

    if (isOpen) {
      searchDropdown.style.display = "none";
      searchLink.classList.remove("active");
    } else {
      searchDropdown.style.display = "block";
      searchLink.classList.add("active");
    }
  });

  // Clicking outside closes & resets icon
  document.addEventListener("click", (e) => {
    if (!searchLink.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.style.display = "none";
      searchLink.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSection("header-placeholder", "header.html", highlightActiveNav);
  loadSection("footer-placeholder", "footer.html");
});
