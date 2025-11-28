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
    "nav ul li a, .mobile-nav ul li a, .sticky-mobile-menu nav a"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      
      const targetIdClean = targetId.substring(1);
      const targetElement = document.getElementById(targetIdClean);
      
      if (targetElement) {
        // Calculate position accounting for any fixed headers
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;
        
        // Account for sticky menu height if visible (approximately 10% of viewport)
        const stickyMenuOffset = window.innerWidth <= 1000 ? window.innerHeight * 0.1 : 0;
        
        window.scrollTo({
          top: offsetPosition - stickyMenuOffset - 20, // 20px extra padding
          behavior: "smooth",
        });
      }
      
      // Close mobile nav if open
      const mobileNav = document.getElementById("mobile-nav");
      if (mobileNav) {
        mobileNav.style.display = "none";
      }
      const menuIcon = document.getElementById("menu-icon");
      if (menuIcon) {
        menuIcon.src = "./assets/icons/closed-book.svg";
      }
    });
  });

  // Mobile menu toggle
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobile-nav");
  const closeMenuButton = document.getElementById("close-menu");

  const headerContent = document.querySelector(".header-content");
  const stickyMobileMenu = document.getElementById("sticky-mobile-menu");
  const stickyMenuIcon = document.getElementById("sticky-icon");

  // Show/hide sticky menu based on scroll position
  // Always show when not at the top, regardless of scroll direction
  function updateStickyMenu() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show sticky menu whenever not at the top of the page (with small threshold)
    if (scrollTop > 50) {
      stickyMobileMenu.style.display = "flex";
    } else {
      stickyMobileMenu.style.display = "none";
    }
  }
  
  // Update on scroll
  window.addEventListener("scroll", updateStickyMenu, { passive: true });
  
  // Also update on resize to handle browser bar changes
  window.addEventListener("resize", updateStickyMenu, { passive: true });
  
  // Initial check
  updateStickyMenu();

  stickyMenuIcon.addEventListener("click", function () {
    if (mobileNav.style.display === "block") {
      mobileNav.style.display = "none";
      stickyMenuIcon.src = "./assets/icons/closed-book.png";
    } else {
      mobileNav.style.display = "block";
      stickyMenuIcon.src = "./assets/icons/open-book.png";
    }
  });

  menuIcon.addEventListener("click", function () {
    mobileNav.style.display = "block";
    menuIcon.src = "./assets/icons/open-book.png";
  });

  closeMenuButton.addEventListener("click", function () {
    mobileNav.style.display = "none";
    menuIcon.src = "./assets/icons/closed-book.png";
  });

  document.addEventListener("click", function (e) {
    if (
      !mobileNav.contains(e.target) &&
      e.target !== menuIcon &&
      !stickyMobileMenu.contains(e.target) &&
      e.target !== stickyMenuIcon
    ) {
      mobileNav.style.display = "none";
      menuIcon.src = "./assets/icons/closed-book.png";
      stickyMenuIcon.src = "./assets/icons/closed-book.png";
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
});

document.addEventListener("DOMContentLoaded", function () {
  // Modal functionality for Echos of Migration
  const modal = document.getElementById("echos-modal");
  const modalTrigger = document.getElementById("echos-modal-trigger");
  const modalClose = document.querySelector(".modal-close");

  if (modalTrigger) {
    modalTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "block";
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
