// Example: Dynamic Navigation Highlight
window.addEventListener("scroll", function () {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("nav ul li a");

  sections.forEach((section, index) => {
    let rect = section.getBoundingClientRect();
    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const publicationItems = document.querySelectorAll(".publication-item");
  const hoverBox = document.getElementById("hover-box");

  publicationItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const excerpt = item.getAttribute("data-excerpt");
      hoverBox.innerHTML = `<p>${excerpt}</p>`;
      hoverBox.style.display = "block";
      const rect = item.getBoundingClientRect();
      hoverBox.style.top = `${rect.top + window.scrollY}px`;
      hoverBox.style.left = `${rect.right + 20}px`; // Adjust as needed
    });

    item.addEventListener("mouseleave", function () {
      hoverBox.style.display = "none";
    });
  });
});
