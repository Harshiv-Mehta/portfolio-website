// ==================== SMOOTH SCROLLING & ACTIVE LINKS ==================== 
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.style.color = '');
            link.style.color = 'var(--primary-color)';
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary-color)';
            }
        });
    }
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and other elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .contact-item, .timeline-item'
    );
    
    elements.forEach(el => {
        observer.observe(el);
    });
});

// ==================== FORM HANDLING ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(formData.email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        
        // Log form data (in production, send to backend)
        console.log('Form submitted:', formData);
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== EMAIL VALIDATION ==================== 
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== NOTIFICATION SYSTEM ==================== 
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#00d4ff' : '#ff6b6b'};
        color: #0a0e27;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== PARALLAX EFFECT ==================== 
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ==================== HAMBURGER MENU ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--dark-bg)';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ==================== TYPING ANIMATION ==================== 
function typeAnimation(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== SCROLL TO TOP BUTTON ==================== 
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--dark-bg);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== PAGE LOAD ANIMATION ==================== 
function animateOnLoad() {
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-out';
    }, 100);
}

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== INTERSECTION OBSERVER FOR COUNTERS ==================== 
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                // Get the numeric value from the text
                const targetValue = parseInt(stat.textContent);
                if (!isNaN(targetValue)) {
                    animateCounter(stat, targetValue);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe stats section
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
});

// ==================== ADD STYLES FOR ANIMATIONS ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            translate: 400px 0;
            opacity: 0;
        }
        to {
            translate: 0 0;
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            translate: 0 0;
            opacity: 1;
        }
        to {
            translate: 400px 0;
            opacity: 0;
        }
    }

    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px rgba(0, 212, 255, 0.5) !important;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            width: 45px !important;
            height: 45px !important;
            bottom: 20px !important;
            right: 20px !important;
        }
    }
`;
document.head.appendChild(style);

// ==================== CURSOR FOLLOW EFFECT (Optional Light Effect) ==================== 
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Optional: Add cursor glow effect on hero section
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        const rect = hero.getBoundingClientRect();
        if (mouseY > rect.top && mouseY < rect.bottom) {
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;
            // Can add custom cursor styling here
        }
    }
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Debounce function for scroll events
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// ==================== EVENT LISTENERS FOR INTERACTIONS ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// ==================== SMOOTH PAGE TRANSITIONS ==================== 
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.5';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    animateOnLoad();
});

// ==================== LAZY LOADING EFFECT ==================== 
function setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    lazyElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease-out';
        lazyObserver.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', setupLazyLoading);

console.log('Portfolio website loaded successfully! 🚀');
