const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const navLinks = document.querySelectorAll(".nav-link");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contactForm");
const counters = document.querySelectorAll("[data-count]");
const root = document.documentElement;

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

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", updateActiveSection);

window.addEventListener("scroll", updateMotionScene, { passive: true });
window.addEventListener("load", updateMotionScene);

window.addEventListener("mousemove", (event) => {
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const tiltX = ((centerY - event.clientY) / centerY) * 4;
    const tiltY = ((event.clientX - centerX) / centerX) * 3;

    root.style.setProperty("--scene-tilt-x", `${tiltX.toFixed(2)}deg`);
    root.style.setProperty("--scene-tilt-y", `${tiltY.toFixed(2)}deg`);
});

function updateMotionScene() {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(window.scrollY / scrollable, 1);
    const rocketShift = -progress * (window.innerHeight * 1.9);

    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.style.setProperty("--rocket-shift", `${rocketShift.toFixed(2)}px`);
}

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
