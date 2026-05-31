const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contactForm");
const counters = document.querySelectorAll("[data-count]");
const storySteps = document.querySelectorAll(".story-step");
const timeline = document.querySelector(".timeline");
const timelineCards = document.querySelectorAll(".timeline-card");
const motionSafeQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const cinematicBlocks = document.querySelectorAll(".cinematic-block");
const heroSection = document.querySelector(".hero");

setRevealDelays();
setNestedAnimationIndexes();

if (menuToggle && navPanel) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navPanel.classList.toggle("open", !isOpen);
        body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            navPanel.classList.remove("open");
            body.classList.remove("menu-open");
        });
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

const storyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            storySteps.forEach((card) => card.classList.remove("current"));
            entry.target.classList.add("current");
        });
    },
    {
        threshold: 0.55,
        rootMargin: "-10% 0px -20% 0px"
    }
);

storySteps.forEach((step) => storyObserver.observe(step));

const timelineObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            timelineCards.forEach((card) => card.classList.remove("current"));
            entry.target.classList.add("current");
        });
    },
    {
        threshold: 0.45,
        rootMargin: "-14% 0px -24% 0px"
    }
);

timelineCards.forEach((card) => timelineObserver.observe(card));

const countObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const element = entry.target;
            const rawValue = element.dataset.count;
            const target = Number(rawValue);

            if (!Number.isFinite(target)) {
                countObserver.unobserve(element);
                return;
            }

            if (rawValue === "824") {
                animateValue(element, 0, target, 1200, (value) => (value / 100).toFixed(2));
            } else if (rawValue === "7") {
                animateValue(element, 0, target, 1200, (value) => `${Math.round(value)}`);
            } else if (target >= 1000) {
                animateValue(element, 0, target, 1200, (value) => `${Math.round(value)}`);
            } else {
                animateValue(element, 0, target, 1200, (value) => `${Math.round(value)}+`);
            }

            countObserver.unobserve(element);
        });
    },
    { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

function animateValue(element, start, end, duration, formatter) {
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;
        element.textContent = formatter(current);

        if (progress < 1) {
            window.requestAnimationFrame(update);
        }
    }

    window.requestAnimationFrame(update);
}

function updateActiveSection() {
    let currentId = "";

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isActive);
    });
}

function setRevealDelays() {
    const staggerGroups = [
        ".highlight-strip .highlight-card",
        ".story-rail .story-card",
        ".stats-grid .stat-card",
        ".skills-grid .skill-card",
        ".projects-grid .project-card",
        ".timeline .timeline-card",
        ".contact-list .contact-item"
    ];

    staggerGroups.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.setProperty("--reveal-delay", `${index * 90}ms`);
        });
    });
}

function setNestedAnimationIndexes() {
    document.querySelectorAll(".skill-tags, .info-pills").forEach((group) => {
        group.querySelectorAll("span").forEach((tag, index) => {
            tag.style.setProperty("--tag-index", index);
        });
    });

    document.querySelectorAll(".clean-list").forEach((list) => {
        list.querySelectorAll("li").forEach((item, index) => {
            item.style.setProperty("--item-index", index);
        });
    });
}

function updateCinematicMotion() {
    if (motionSafeQuery.matches) {
        return;
    }

    const viewportHeight = window.innerHeight;

    cinematicBlocks.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const center = rect.top + (rect.height / 2);
        const normalized = (center - (viewportHeight * 0.52)) / viewportHeight;
        const clamped = Math.max(Math.min(normalized, 1.2), -1.2);
        const depth = Math.min(Math.abs(clamped), 1);

        block.style.setProperty("--cinematic-shift", `${clamped.toFixed(3)}`);
        block.style.setProperty("--cinematic-depth", `${depth.toFixed(3)}`);
        block.style.setProperty("--cinematic-opacity", `${(1 - Math.min(Math.abs(clamped) * 0.24, 0.22)).toFixed(3)}`);
    });

    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const heroProgress = Math.min(Math.max((-rect.top) / Math.max(rect.height, 1), 0), 1);
        heroSection.style.setProperty("--hero-progress", heroProgress.toFixed(3));
        heroSection.style.setProperty("--hero-ease", (1 - heroProgress * 0.08).toFixed(3));
    }

    timelineCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const midpoint = rect.top + (rect.height / 2);
        const distance = Math.abs((viewportHeight * 0.5) - midpoint) / viewportHeight;
        const emphasis = Math.max(0, 1 - (distance * 2.2));

        card.style.setProperty("--timeline-emphasis", emphasis.toFixed(3));
    });
}

function updateTimelineProgress() {
    if (!timeline) {
        return;
    }

    const rect = timeline.getBoundingClientRect();
    const viewportOffset = window.innerHeight * 0.72;
    const distance = rect.height + viewportOffset;
    const progress = Math.min(Math.max((viewportOffset - rect.top) / distance, 0), 1);

    timeline.style.setProperty("--timeline-progress", progress.toFixed(3));
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", updateActiveSection);
window.addEventListener("scroll", updateTimelineProgress, { passive: true });
window.addEventListener("resize", updateTimelineProgress);
window.addEventListener("load", updateTimelineProgress);
window.addEventListener("scroll", updateCinematicMotion, { passive: true });
window.addEventListener("resize", updateCinematicMotion);
window.addEventListener("load", updateCinematicMotion);


if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            showToast("Please complete all fields before sending.", true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast("Please enter a valid email address.", true);
            return;
        }

        const bodyText = [
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            message
        ].join("\n");

        const mailto = `mailto:Harshivmehta@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailto;
        showToast("Your email draft is ready.");
        contactForm.reset();
    });
}

function showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        right: 16px;
        bottom: 16px;
        max-width: 320px;
        padding: 0.95rem 1rem;
        border-radius: 16px;
        border: 1px solid rgba(151, 172, 210, 0.18);
        background: ${isError ? "rgba(255, 122, 122, 0.14)" : "rgba(124, 245, 200, 0.14)"};
        color: #f5f7fb;
        backdrop-filter: blur(16px);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
        z-index: 1200;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 220ms ease, transform 220ms ease;
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    window.setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        window.setTimeout(() => toast.remove(), 250);
    }, 2600);
}

