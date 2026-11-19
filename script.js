document.addEventListener("DOMContentLoaded", function () {

  // =================================
  // 1. MOBILE HAMBURGER MENU
  // =================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  // =================================
  // 2. HERO SLIDER - 3 SLIDES
  // =================================

  const slides = document.querySelectorAll(".hero .slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const hero = document.querySelector(".hero");

  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === currentSlide);
      slide.setAttribute("aria-hidden", i !== currentSlide);
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function stopAutoSlide() {
    clearInterval(slideTimer);
  }

  function startAutoSlide() {
    stopAutoSlide();

    if (slides.length > 1) {
      slideTimer = setInterval(function () {
        showSlide(currentSlide + 1);
      }, 4000);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      showSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      showSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      showSlide(index);
      startAutoSlide();
    });
  });

  if (hero) {
    hero.addEventListener("mouseenter", stopAutoSlide);
    hero.addEventListener("mouseleave", startAutoSlide);
  }

  showSlide(0);
  startAutoSlide();

  // =================================
  // 3. GALLERY SLIDER
  // =================================

  const galleryTrack = document.querySelector(".gallery-track");
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");

  function getGalleryDistance() {
    const image = galleryTrack
      ? galleryTrack.querySelector("img")
      : null;

    return image ? image.getBoundingClientRect().width + 16 : 250;
  }

  if (galleryPrev && galleryTrack) {
    galleryPrev.addEventListener("click", function () {
      galleryTrack.scrollBy({
        left: -getGalleryDistance(),
        behavior: "smooth"
      });
    });
  }

  if (galleryNext && galleryTrack) {
    galleryNext.addEventListener("click", function () {
      galleryTrack.scrollBy({
        left: getGalleryDistance(),
        behavior: "smooth"
      });
    });
  }

  // =================================
  // 4. CONTACT FORM TO WHATSAPP
  // =================================

  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  // Business WhatsApp number: country code + mobile number
  const businessWhatsApp = "919560594831";

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      if (!name || !phone || !service || !message) {
        if (formNote) {
          formNote.textContent = "कृपया सभी जानकारी भरें।";
        }
        return;
      }

      const whatsappMessage =
        "Hello Anuraj Fleet!\n\n" +
        "Name: " + name + "\n" +
        "Customer Mobile: " + phone + "\n" +
        "Service: " + service + "\n" +
        "Message: " + message;

      const whatsappURL =
        "https://wa.me/" + businessWhatsApp +
        "?text=" + encodeURIComponent(whatsappMessage);

      if (formNote) {
        formNote.textContent =
          "WhatsApp खुल रहा है। संदेश जाँचकर Send दबाएँ।";
      }

      window.open(whatsappURL, "_blank");
    });
  }

  // =================================
  // 5. CURRENT COPYRIGHT YEAR
  // =================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =================================
  // 6. SOCIAL MEDIA PLACEHOLDER LINKS
  // =================================

  document.querySelectorAll(".social-link").forEach(function (link) {
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        alert(
          "index.html में इस आइकन का href बदलकर अपना असली सोशल मीडिया लिंक डालें।"
        );
      });
    }
  });

});