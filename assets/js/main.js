/**
 * Evan Global Account - High-Dynamic Interactive Engine
 * Features:
 * 1. Ambient Dynamic Particle Network (Canvas)
 * 2. 3D Gyroscopic Card Tilt & Holographic Reflection
 * 3. Spotlight Border & Glow Tracking on Cards
 * 4. Staggered Scroll Reveal Observer
 * 5. Interactive Route Steps Switcher
 * 6. Responsive Mobile Drawer & Accessible Navigation
 * 7. Header Scroll Blur & Back-To-Top Controller
 */

(function () {
  "use strict";

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ==========================================================================
     Shared Theme Enhancements for Existing Inner Pages
     ========================================================================== */
  const sharedHeader = document.querySelector(".site-header");
  if (sharedHeader && !sharedHeader.id) sharedHeader.id = "site-header";

  document.querySelectorAll(".brand").forEach((brand) => {
    const mark = brand.querySelector(":scope > .brand-mark");
    if (mark && mark.children.length === 0) {
      const markText = mark.textContent.trim();
      const markInner = document.createElement("span");
      markInner.textContent = markText;
      mark.replaceChildren(markInner);
    }

    if (!brand.querySelector(":scope > .brand-title")) {
      const label = Array.from(brand.children).find((child) => child !== mark);
      if (label) {
        const title = document.createElement("span");
        title.className = "brand-title";

        const titleText = document.createElement("span");
        titleText.textContent = label.textContent.trim();

        const subtitle = document.createElement("span");
        subtitle.className = "brand-sub";
        subtitle.textContent = "GLOBAL ACCOUNT";

        title.append(titleText, subtitle);
        label.replaceWith(title);
      }
    }
  });

  const sharedToggle = document.querySelector(".nav-toggle");
  if (sharedToggle) {
    Array.from(sharedToggle.children).forEach((bar, index) => {
      bar.classList.add("bar", `bar-${index + 1}`);
    });
  }

  const sharedNavCta = document.querySelector(".nav-cta");
  if (sharedNavCta && !sharedNavCta.querySelector("svg")) {
    sharedNavCta.insertAdjacentHTML(
      "beforeend",
      '<svg class="cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
    );
  }

  if (!document.getElementById("cursor-glow")) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.id = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.prepend(glow);
  }

  const sharedFooter = document.querySelector(".site-footer");
  if (sharedFooter && !sharedFooter.querySelector(":scope > .footer-ambient-glow")) {
    const footerGlow = document.createElement("div");
    footerGlow.className = "footer-ambient-glow";
    footerGlow.setAttribute("aria-hidden", "true");
    sharedFooter.prepend(footerGlow);
  }

  if (!document.getElementById("back-to-top")) {
    const backButton = document.createElement("button");
    backButton.className = "back-to-top";
    backButton.id = "back-to-top";
    backButton.type = "button";
    backButton.setAttribute("aria-label", "返回顶部");
    backButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.append(backButton);
  }

  /* ==========================================================================
     1. Ambient Cursor Glow
     ========================================================================== */
  const cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow && !prefersReducedMotion && window.innerWidth > 900) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderCursorGlow() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(renderCursorGlow);
    }
    requestAnimationFrame(renderCursorGlow);
  }

  /* ==========================================================================
     2. Interactive Particle Network Canvas (Hero Background)
     ========================================================================== */
  const canvas = document.getElementById("hero-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 24), 55);
    const connectionDistance = 140;
    let mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 1;
        // Warm gold and icy blue mix
        this.color = Math.random() > 0.4 ? "rgba(216, 180, 106," : "rgba(56, 189, 248,";
        this.baseAlpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.baseAlpha})`;
        ctx.shadowColor = "rgba(216, 180, 106, 0.4)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(216, 180, 106, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw individual particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);

    // Mouse tracking on hero section
    const heroSection = canvas.closest(".hero");
    if (heroSection) {
      heroSection.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });

      heroSection.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
      });
    }

    // Resize handling
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (canvas.parentElement) {
          width = canvas.width = canvas.parentElement.offsetWidth;
          height = canvas.height = canvas.parentElement.offsetHeight;
        }
      }, 150);
    });
  }

  /* ==========================================================================
     3. 3D Gyroscopic Card Tilt & Holographic Foil Reflection
     ========================================================================== */
  const tiltCard = document.getElementById("hero-tilt-card");
  if (tiltCard && !prefersReducedMotion && window.innerWidth > 768) {
    let bounds;

    function onMouseEnter() {
      bounds = tiltCard.getBoundingClientRect();
    }

    function onMouseMove(e) {
      if (!bounds) bounds = tiltCard.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const yPct = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      // 3D rotation angles
      const rotateX = -yPct * 12; // deg
      const rotateY = xPct * 14;  // deg

      tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Dynamic Shimmer position
      const shimmer = tiltCard.querySelector(".card-shimmer");
      if (shimmer) {
        shimmer.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      }
    }

    function onMouseLeave() {
      tiltCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      const shimmer = tiltCard.querySelector(".card-shimmer");
      if (shimmer) {
        shimmer.style.background = "none";
      }
    }

    tiltCard.addEventListener("mouseenter", onMouseEnter);
    tiltCard.addEventListener("mousemove", onMouseMove);
    tiltCard.addEventListener("mouseleave", onMouseLeave);
  }

  /* ==========================================================================
     4. Spotlight Follower for Cards
     ========================================================================== */
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* ==========================================================================
     5. Interactive Route Line Switcher
     ========================================================================== */
  const routeSteps = document.querySelectorAll(".route-step");
  routeSteps.forEach((step) => {
    step.addEventListener("click", () => {
      routeSteps.forEach((s) => s.classList.remove("active"));
      step.classList.add("active");
    });
  });

  /* ==========================================================================
     6. Scroll Reveal with IntersectionObserver
     ========================================================================== */
  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute("data-reveal-delay");
            if (delay) {
              setTimeout(() => {
                entry.target.classList.add("is-revealed");
              }, parseInt(delay, 10));
            } else {
              entry.target.classList.add("is-revealed");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported or reduced motion
    revealElements.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ==========================================================================
     7. Header Scroll Blur & Sticky Behavior
     ========================================================================== */
  const siteHeader = document.querySelector(".site-header");
  const backToTopBtn = document.getElementById("back-to-top");

  function handleScroll() {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     8. Horizontal Articles Carousel (Left-to-Right Scrolling & Dragging)
     ========================================================================== */
  const track = document.getElementById("articles-track");
  const prevBtn = document.getElementById("article-prev");
  const nextBtn = document.getElementById("article-next");
  const progressBar = document.getElementById("articles-progress");
  const carouselContainer = document.querySelector(".articles-carousel-container");

  if (track) {
    const cardWidth = 362; // 340px width + 22px gap
    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollTimer = null;
    let isHovered = false;

    // Update progress bar
    function updateProgress() {
      if (!progressBar) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) {
        progressBar.style.width = "100%";
        return;
      }
      const percent = Math.min(100, Math.max(12, (track.scrollLeft / maxScroll) * 100));
      progressBar.style.width = `${percent}%`;
    }

    track.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Prev / Next button actions
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
      });
    }

    // Mouse Drag to scroll
    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("is-dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      if (isDown) {
        isDown = false;
        track.classList.remove("is-dragging");
      }
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });

    // Gentle Auto-Scroll from Left to Right
    function startAutoScroll() {
      if (prefersReducedMotion) return;
      stopAutoScroll();
      autoScrollTimer = setInterval(() => {
        if (isHovered || isDown) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 4) {
          // Smoothly loop back to start
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: 1.2, behavior: "auto" });
        }
      }, 30);
    }

    function stopAutoScroll() {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }

    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () => {
        isHovered = true;
      });
      carouselContainer.addEventListener("mouseleave", () => {
        isHovered = false;
      });
      carouselContainer.addEventListener("touchstart", () => {
        isHovered = true;
      }, { passive: true });
      carouselContainer.addEventListener("touchend", () => {
        isHovered = false;
      }, { passive: true });
    }

    startAutoScroll();
  }

  /* ==========================================================================
     9. Accessible Mobile Navigation Menu
     ========================================================================== */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const yearEl = document.querySelector("#year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (toggle && links) {
    function setMenu(open, returnFocus) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenu(!isOpen, false);
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    document.addEventListener("click", function (event) {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false, false);
      }
    });

    document.addEventListener("focusin", function (event) {
      if (!links.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false, false);
      }
    });

    window.matchMedia("(max-width: 1060px)").addEventListener("change", function () {
      setMenu(false, false);
    });
  }
})();
