"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const CONFIG = {
    email: "hello@avdeshjadon.com",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/avdeshjadon",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/avdeshjadon",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
      },
      {
        name: "Twitter",
        url: "https://twitter.com/avdeshjadon",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.627l-5.21-6.815-6.041 6.815h-3.308l7.73-8.805-8.335-10.69h6.785l4.61 6.131 5.435-6.131zm-1.716 19.49h2.686l-14.259-18.94h-2.925l14.5 18.94z"/></svg>',
      },
    ],
    projects: {
      neural: {
        title: "CodeManipulate",
        desc: "CodeManipulate is a comprehensive, AI-powered all-in-one developer platform designed to streamline coding workflows and enhance productivity for programmers of all levels. It automatically detects the programming language of any code snippet using advanced AI language detection, and allows seamless cross-language translation, supporting popular languages such as JavaScript, Python, Java, C#, C++, Go, Ruby, PHP, HTML, CSS, and more. Beyond language conversion, it provides powerful developer tools including a code formatter for clean and properly indented code, a minifier to optimize JavaScript and CSS for improved performance, a JSON formatter for better readability and debugging, and instant copy/download options for easy code management. With an intuitive and user-friendly interface, CodeManipulate enables developers to quickly paste, detect, translate, format, minify, and optimize code all in one place, saving time, reducing errors, and boosting efficiency. Whether you are a professional developer, student, or hobbyist, CodeManipulate simplifies complex coding tasks, accelerates development, and acts as a reliable assistant for all your coding needs.",
        tech: ["Html", "CSS", "Javascript", "API", "Node.js"],
        demo: "https://codemanipulate.onrender.com/",
        repo: "https://github.com/avdeshjadon/CodeManipulate",
      },

      crypto: {
        title: "ComixAll",
        desc: "Introducing a modern, fully responsive comic reader designed to offer an immersive and seamless experience for both readers and creators. The platform features a structured folder-based system, allowing easy organization and navigation of large comic collections, while the intuitive admin panel gives creators complete control to add, update, or manage content effortlessly. Powered by Firebase, it ensures real-time data synchronization, secure authentication, and fast, reliable backend performance. Cloudinary integration optimizes media storage and delivery, providing smooth image loading, automatic resizing, and high-quality visual rendering across all devices. Every aspect of the reader—from its responsive design to its robust backend architecture—is engineered to deliver a fast, engaging, and user-friendly experience, making it the perfect solution for managing and enjoying digital comics at scale.",
        tech: [
          "Html",
          "CSS",
          "Javascript",
          "API",
          "Node.js",
          "Cloudinary",
          "Firebase",
          "Admin Pannel",
        ],
        demo: "https://avdeshjadon.github.io/ComixAll/",
        repo: "https://github.com/avdeshjadon/ComixAll",
      },
      "interactive-art": {
        title: "TouchTyping",
        desc: "TouchTyping is a minimal, fully responsive web application designed to help users improve their typing speed and accuracy through structured practice. The app provides exercises for all key rows — Home Row, Top Row, Bottom Row, and the Full Keyboard — making it suitable for beginners learning proper finger placement as well as developers and professionals aiming to enhance their typing efficiency. With a clean and intuitive interface, real-time feedback, and responsive design across devices, TouchTyping offers an engaging and effective way to master touch typing skills. Its focus on simplicity and functionality ensures users can practice consistently and track their progress effortlessly, turning typing practice into a productive and enjoyable experience.",
        tech: ["Html", "CSS", "Javascript"],
        demo: "https://avdeshjadon.github.io/TouchTyping/",
        repo: "https://github.com/avdeshjadon/TouchTyping",
      },
      "3d-config": {
        title: "Panda Login Page",
        desc: "A charming and fully responsive login and signup page featuring an animated panda UI that adds a playful and engaging touch to user interactions. Built with HTML, CSS, and JavaScript, the page combines smooth animations, intuitive form design, and responsive layouts to ensure a delightful experience across all devices. The animated panda reacts to user actions, creating an interactive and memorable interface, while the clean code structure allows easy customization and seamless integration into any web project. Perfect for enhancing user engagement and bringing a fun, friendly personality to authentication flows.",
        tech: ["Html", "CSS", "Javascript"],
        demo: "https://avdeshjadon.github.io/PandaLogin-SignUpPage/",
        repo: "https://github.com/avdeshjadon/PandaLogin-SignUpPage",
      },
      "folio-v5": {
        title: "Spotify Clone (Home Page)",
        desc: "A pixel-perfect clone of the Spotify homepage, meticulously crafted using pure HTML and CSS to replicate the original design with high fidelity. Every element, from typography and color schemes to layout and spacing, has been carefully recreated to match Spotify’s sleek, modern aesthetic. The project showcases attention to detail, responsive design practices, and the ability to translate complex UIs into clean, maintainable code. Ideal for demonstrating front-end skills, this clone highlights proficiency in layout structuring, styling, and creating visually appealing interfaces without relying on JavaScript or external frameworks.",
        tech: ["Html", "CSS"],
        demo: "https://avdeshjadon.github.io/Spotify-Home/",
        repo: "https://github.com/avdeshjadon/Spotify-Home",
      },
      ecom: {
        title: "WebIn",
        desc: "WebIn is a lightweight, draggable browser extension that acts as a floating overlay, giving you instant access to all your most-used web tools without leaving the page. Designed for maximum convenience, it keeps coding platforms, research tools, AI chat interfaces, and even entertainment sites like YouTube just a click away. The intuitive draggable interface allows you to position the overlay anywhere on your screen, ensuring it never interrupts your workflow. By consolidating your favorite platforms into a single, accessible shortcut, WebIn streamlines productivity, enhances multitasking, and transforms the way you interact with the web, all while remaining fast, responsive, and unobtrusive.",
        tech: ["Html", "CSS", "Javascript"],
        repo: "https://github.com/avdeshjadon/WebIn",
      },
    },
    isReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    shapes: {
      count: 8,
      size: [60, 180],
      parallaxStrength: [0.02, 0.15],
      rotationSpeed: [0.01, 0.05],
    },
    tilt: {
      strength: 10,
      returnSpeed: 0.1,
    },
    throttleDelay: 16,
  };

  const UTILS = {
    lerp: (s, e, f) => s * (1 - f) + e * f,
    random: (min, max) => Math.random() * (max - min) + min,
    throttle: (func, delay) => {
      let last = 0;
      return (...a) => {
        const n = new Date().getTime();
        if (n - last < delay) return;
        last = n;
        return func(...a);
      };
    },
    validateEmail: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
    srOnly: () => {
      const s = document.createElement("style");
      s.textContent =
        ".sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}";
      document.head.appendChild(s);
    },
  };

  class App {
    constructor() {
      this.state = {
        mouse: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vX: 0,
          vY: 0,
          lX: 0,
          lY: 0,
        },
        scroll: {
          y: window.pageYOffset,
          lY: window.pageYOffset,
        },
      };
      this.systems = [];
      this.init();
    }

    init() {
      try {
        UTILS.srOnly();
        this.preloader = new PreloaderSystem();
        this.notificationSystem = new NotificationSystem();
        this.systems.push(new ThemeSystem());
        this.systems.push(new AnimationSystem());
        this.systems.push(
          new ScrollSystem(document.getElementById("siteHeader"))
        );
        this.systems.push(new ModalSystem());
        this.bindEvents();
        this.update();
        this.initUI();
        console.log("🚀 Avdesh Jadon Portfolio [v6.8.0] Initialized");
      } catch (error) {
        console.error("Initialization failed:", error);
        this.notificationSystem.show(
          "An error occurred during initialization.",
          5000,
          "error"
        );
      }
    }

    bindEvents() {
      const tScroll = UTILS.throttle(
        this.onScroll.bind(this),
        CONFIG.throttleDelay
      );
      const tResize = UTILS.throttle(this.onResize.bind(this), 250);
      window.addEventListener("mousemove", this.onMouseMove.bind(this));
      window.addEventListener("scroll", tScroll, {
        passive: true,
      });
      window.addEventListener("resize", tResize);
      window.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    update() {
      this.state.mouse.vX = this.state.mouse.x - this.state.mouse.lX;
      this.state.mouse.vY = this.state.mouse.y - this.state.mouse.lY;
      this.state.mouse.lX = this.state.mouse.x;
      this.state.mouse.lY = this.state.mouse.y;
      for (const s of this.systems) if (s.update) s.update();
      requestAnimationFrame(this.update.bind(this));
    }

    initUI() {
      document.getElementById("copyright-year").textContent =
        new Date().getFullYear();
      this.populateSocials();
      this.initMobileMenu();
      this.initContactForm();
      this.initBackToTop();
      this.initProjectModals();
      this.animateHeadline();
      this.initInteractiveGlow();
      this.initHeroPopups();
    }

    animateHeadline() {
      const headline = document.getElementById("heroName");
      if (!headline || headline.textContent.trim() === "") return;
      const text = headline.textContent;
      headline.innerHTML = "";
      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.setProperty("--char-delay", `${index * 50}ms`);
        headline.appendChild(span);
      });
      setTimeout(() => headline.classList.add("animated"), 800);
    }

    initInteractiveGlow() {
      const wrapper = document.querySelector(".hero-image-wrapper");
      const heroImage = document.querySelector(".hero-image");
      const popups = document.querySelectorAll(".hero-popup");
      if (!wrapper || !heroImage || CONFIG.isReducedMotion) return;

      const originalSrc = heroImage.src;
      let currentImage = "avdesh.png";
      let leaveTimeout;

      const hideAllPopups = () => {
        popups.forEach((popup) => {
          popup.classList.remove("active");
        });
      };

      const changeImageAndPopup = UTILS.throttle((e) => {
        clearTimeout(leaveTimeout);
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const isUp = e.clientY < centerY;
        const isDown = e.clientY > centerY;
        const isLeft = e.clientX < centerX;
        const isRight = e.clientX > centerX;

        let newImage = "avdesh.png";
        let popupClass = "";

        if (isUp && isLeft) {
          newImage = "avdesh-up-left.png";
          popupClass = "top-left";
        } else if (isUp && isRight) {
          newImage = "avdesh-up-right.png";
          popupClass = "top-right";
        } else if (isDown && isLeft) {
          newImage = "avdesh-down-left.png";
          popupClass = "bottom-left";
        } else if (isDown && isRight) {
          newImage = "avdesh-down-right.png";
          popupClass = "bottom-right";
        }

        if (currentImage !== newImage) {
          heroImage.src = `images/${newImage}`;
          currentImage = newImage;
        }

        hideAllPopups();

        if (popupClass) {
          const popupToShow = document.querySelector(
            `.hero-popup.${popupClass}`
          );
          if (popupToShow) {
            popupToShow.classList.add("active");
          }
        }
      }, 50);

      wrapper.addEventListener("mousemove", changeImageAndPopup);

      wrapper.addEventListener("mouseleave", () => {
        leaveTimeout = setTimeout(() => {
          heroImage.src = originalSrc;
          currentImage = originalSrc;
          hideAllPopups();
        }, 50);
      });

      popups.forEach((popup) => {
        popup.addEventListener("mouseenter", () => clearTimeout(leaveTimeout));
      });
    }

    populateSocials() {
      const h = CONFIG.socials
        .map(
          (s) =>
            `<a class="social" href="${s.url}" title="${s.name}" aria-label="Connect on ${s.name}" target="_blank" rel="noopener noreferrer">${s.icon}</a>`
        )
        .join("");
      if (document.getElementById("contact-socials-container")) {
        document.getElementById("contact-socials-container").innerHTML = h;
      }
    }

    initMobileMenu() {
      const btn = document.getElementById("mobile-menu-btn"),
        nav = document.getElementById("mobile-nav");
      const open = btn.querySelector(".icon-open"),
        close = btn.querySelector(".icon-close");
      const toggle = (isOpen) => {
        const o =
          typeof isOpen === "boolean"
            ? isOpen
            : !nav.classList.contains("open");
        nav.classList.toggle("open", o);
        btn.setAttribute("aria-expanded", o);
        open.style.display = o ? "none" : "block";
        close.style.display = o ? "block" : "none";
        document.body.style.overflow = o ? "hidden" : "";
      };
      btn.addEventListener("click", () => toggle());
      nav
        .querySelectorAll("a")
        .forEach((l) => l.addEventListener("click", () => toggle(false)));
    }

    initContactForm() {
      const form = document.getElementById("contactForm");
      if (!form) return;

      const copyEmailBtn = document.getElementById("copyEmailBtn");
      copyEmailBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(CONFIG.email);
          this.notificationSystem.show(
            "Email address copied!",
            3000,
            "success"
          );
        } catch (err) {
          this.notificationSystem.show("Failed to copy email.", 3000, "error");
        }
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
          object[key] = value;
        });
        const json = JSON.stringify(object);

        try {
          const response = await fetch(form.action, {
            method: form.method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: json,
          });

          if (response.ok) {
            this.notificationSystem.show(
              "Message sent successfully , we will contact back you soon",
              3000,
              "success"
            );
            form.reset();
          } else {
            this.notificationSystem.show(
              "Failed to send message. Please try again later.",
              3000,
              "error"
            );
          }
        } catch (error) {
          this.notificationSystem.show(
            "Failed to send message. Please check your internet connection.",
            3000,
            "error"
          );
        }
      });
    }

    initBackToTop() {
      const backToTopBtn = document.getElementById("back-to-top");
      if (!backToTopBtn) return;

      const showButton = () => {
        const scrolled =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolled > 300) {
          backToTopBtn.classList.add("active");
        } else {
          backToTopBtn.classList.remove("active");
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

      window.addEventListener(
        "scroll",
        UTILS.throttle(showButton, CONFIG.throttleDelay)
      );
      backToTopBtn.addEventListener("click", scrollToTop);
    }

    initProjectModals() {
      const modal = document.getElementById("project-modal");
      const modalTitle = document.getElementById("modal-title");
      const modalDesc = document.getElementById("modal-desc");
      const modalTech = document.getElementById("modal-tech");
      const modalDemo = document.getElementById("modal-demo");
      const modalRepo = document.getElementById("modal-repo");
      const openModalButtons = document.querySelectorAll(".project-card");
      const closeModalButton = modal.querySelector(".modal-close");
      const body = document.body;
      const projectData = CONFIG.projects;

      const openModal = (project) => {
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;
        modalDemo.href = project.demo;
        modalRepo.href = project.repo;
        modalTech.innerHTML = project.tech
          .map((t) => `<div class="skill">${t}</div>`)
          .join("");
        modal.classList.add("open");
        body.style.overflow = "hidden";
      };

      const closeModal = () => {
        modal.classList.remove("open");
        body.style.overflow = "";
      };

      openModalButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const projectCard = e.currentTarget.closest(".project-card");
          if (projectCard) {
            const projectKey = projectCard.dataset.project;
            if (projectData[projectKey]) {
              openModal(projectData[projectKey]);
            }
          }
        });
      });

      closeModalButton.addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
          closeModal();
        }
      });
    }

    onKeyDown(e) {}
    onMouseMove(e) {
      this.state.mouse.x = e.clientX;
      this.state.mouse.y = e.clientY;
    }
    onScroll() {
      this.state.scroll.y = window.pageYOffset;
    }
    onResize() {
      for (const s of this.systems) if (s.onResize) s.onResize();
    }

    initHeroPopups() {
      const popups = document.querySelectorAll(".hero-popup");
      popups.forEach((popup) => {
        popup.addEventListener("click", (e) => {
          const targetId = e.currentTarget.dataset.target;
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
    }
  }

  class NotificationSystem {
    constructor() {
      this.container = document.getElementById("notification-container");
    }
    show(m, d = 3000, t = "info") {
      const e = document.createElement("div");
      e.className = `toast ${t}`;
      e.textContent = m;
      this.container.appendChild(e);
      setTimeout(() => e.classList.add("show"), 10);
      setTimeout(() => {
        e.classList.remove("show");
        e.addEventListener("transitionend", () => e.remove(), {
          once: true,
        });
      }, d);
    }
  }

  class ThemeSystem {
    constructor() {
      this.btn = document.getElementById("theme-toggle");
      this.init();
    }
    init() {
      const t = localStorage.getItem("theme");
      if (t) {
        document.documentElement.className = t;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark-theme");
      }
      this.btn.addEventListener("click", this.toggle.bind(this));
      this.updateFavicon();
    }

    updateFavicon() {
      setTimeout(() => {
        try {
          const style = getComputedStyle(document.documentElement);
          const color1 = style.getPropertyValue("--accent-primary").trim();
          const color2 = style.getPropertyValue("--accent-secondary").trim();

          const svg = `
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                <defs>
                  <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' style='stop-color:${color1}' />
                    <stop offset='100%' style='stop-color:${color2}' />
                  </linearGradient>
                </defs>
                <text y='.9em' font-size='90' fill='url(#grad)'>AJ</text>
              </svg>
            `;

          const newFavicon = `data:image/svg+xml,${encodeURIComponent(
            svg.trim()
          )}`;
          const faviconLink = document.querySelector("link[rel='icon']");
          if (faviconLink) {
            faviconLink.href = newFavicon;
          }
        } catch (e) {
          console.error("Failed to update favicon:", e);
        }
      }, 100);
    }

    toggle() {
      const isDark = document.documentElement.classList.contains("dark-theme");
      const newTheme = isDark ? "light-theme" : "dark-theme";
      document.documentElement.className = newTheme;
      localStorage.setItem("theme", newTheme);
      this.updateFavicon();
    }
  }

  class PreloaderSystem {
    constructor() {
      this.el = document.getElementById("preloader");
      this.init();
    }
    init() {
      if (document.readyState === "complete")
        setTimeout(() => this.hide(), 500);
      else
        window.addEventListener(
          "load",
          () => setTimeout(() => this.hide(), 500),
          {
            once: true,
          }
        );
    }
    hide() {
      if (this.el) {
        this.el.classList.add("hidden");
        this.el.addEventListener(
          "transitionend",
          () => this.el.parentNode.removeChild(this.el),
          {
            once: true,
          }
        );
      }
    }
  }

  class AnimationSystem {
    constructor() {
      this.obs = new IntersectionObserver(this.handle.bind(this), {
        rootMargin: "-50px 0px -50px 0px",
        threshold: 0.1,
      });
      document
        .querySelectorAll(".card,.project-card,.testimonial")
        .forEach((e) => this.obs.observe(e));
    }
    handle(entries, obs) {
      const intersecting = entries.filter((e) => e.isIntersecting);
      intersecting.forEach((entry, i) => {
        const e = entry.target;
        e.style.setProperty("--stagger-delay", `${i * 80}ms`);
        e.classList.add("inview");
        obs.unobserve(e);
      });
    }
  }

  class ScrollSystem {
    constructor(h) {
      this.h = h;
      this.y = window.pageYOffset;
    }
    update() {
      const s = window.pageYOffset;
      this.h.classList.toggle("scrolled", s > 100);
      if (s > this.y && s > 200) this.h.classList.add("hidden");
      else if (s < this.y) this.h.classList.remove("hidden");
      this.y = s <= 0 ? 0 : s;
    }
  }

  class ModalSystem {
    update() {}
  }

  new App();
});