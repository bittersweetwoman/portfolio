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

  // Smooth scrolling for nav links
  const navLinks = document.querySelectorAll(
    "nav ul li a, .mobile-nav ul li a"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
      document.getElementById("mobile-nav").style.display = "none";
      document.getElementById("menu-icon").src =
        "./assets/icons/closed-book.svg";
    });
  });

  // Mobile menu toggle
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobile-nav");
  const closeMenuButton = document.getElementById("close-menu");

  menuIcon.addEventListener("click", function () {
    mobileNav.style.display = "block";
    menuIcon.src = "./assets/icons/open-book.png";
  });

  closeMenuButton.addEventListener("click", function () {
    mobileNav.style.display = "none";
    menuIcon.src = "./assets/icons/closed-book.png";
  });

  document.addEventListener("click", function (e) {
    if (!mobileNav.contains(e.target) && e.target !== menuIcon) {
      mobileNav.style.display = "none";
      menuIcon.src = "./assets/icons/closed-book.png";
    }
  });

  // function adjustFeaturedHeight() {
  //   const aboutContainer = document.querySelector(".about-container");
  //   const featuredContainer = document.querySelector(".featured-container");

  //   if (window.innerWidth < 1000) {
  //     featuredContainer.style.height = `${aboutContainer.offsetHeight}px`;
  //     featuredContainer.style.overflowY = "scroll";
  //   } else {
  //     featuredContainer.style.height = "auto";
  //   }
  // }

  // window.addEventListener("resize", adjustFeaturedHeight);
  // adjustFeaturedHeight(); // Initial call

  function updateMediaSources() {
    const videoElements = document.querySelectorAll("video");

    videoElements.forEach((video) => {
      const isMobile = window.innerWidth <= 500;
      const videoSrc = video.getAttribute("src");

      if (isMobile) {
        if (videoSrc.includes("videoBanner")) {
          video.setAttribute("src", "./assets/videos/videoBanner.gif");
        } else if (videoSrc.includes("eyes")) {
          video.setAttribute("src", "./assets/videos/eyes.gif");
        }
      } else {
        if (videoSrc.includes("videoBanner")) {
          video.setAttribute("src", "./assets/videos/videoBanner.mp4");
        } else if (videoSrc.includes("eyes")) {
          video.setAttribute("src", "./assets/videos/eyes.mp4");
        }
      }
    });
  }

  window.addEventListener("resize", updateMediaSources);
  updateMediaSources(); // Initial call
});
