/* ================== Particle Background Effect ================== */
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? '#6942d5' : '#00eaff';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${Math.random() * 20 + 10}s infinite linear`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

/* ================== Tab Navigation ================== */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const heroSection = document.getElementById('hero-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabContent = document.getElementById(tabName);
            if (tabContent) {
                tabContent.classList.add('active');
            }

            // Show/hide HERO section - only visible on summary tab
            if (heroSection) {
                if (tabName === 'summary') {
                    heroSection.style.display = 'block';
                } else {
                    heroSection.style.display = 'none';
                }
            }

            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

/* ================== Smooth Scroll ================== */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ================== Scroll to Top Button ================== */
function initializeScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTop';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ================== Counter Animation ================== */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const highlightNumbers = document.querySelectorAll('.highlight-number');
    const allNumbers = [...statNumbers, ...highlightNumbers];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                target.classList.add('counted');

                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/\d/g, '').trim();
                let currentValue = 0;
                const increment = numericValue / 50;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        target.textContent = numericValue + suffix;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + suffix;
                    }
                }, 30);
            }
        });
    }, { threshold: 0.5 });

    allNumbers.forEach(number => observer.observe(number));
}

/* ================== Scroll Animation for Elements ================== */
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animateElements = document.querySelectorAll('.feature-card, .tech-card, .stat-card, .mission-card, .value-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ================== Keyboard Navigation ================== */
function initializeKeyboardNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabs = ['summary', 'technologies', 'motivation'];
    let currentTabIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            document.querySelector(`[data-tab="${tabs[currentTabIndex]}"]`).click();
        } else if (e.key === 'ArrowLeft') {
            currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
            document.querySelector(`[data-tab="${tabs[currentTabIndex]}"]`).click();
        }
    });
}

/* ================== Lazy Loading Images ================== */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ================== Navbar Background on Scroll ================== */
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

/* ================== Mobile Menu Toggle ================== */
function initializeMobileMenu() {
    const navTabs = document.querySelector('.nav-tabs');
    if (!navTabs) return;

    // Add mobile menu functionality if needed
    // This is a foundation for future mobile menu implementation
}

/* ================== Form Validation (for future use) ================== */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ================== Throttle Function ================== */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/* ================== Initialize on Load ================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AlgoRhythm GitHub Pages loaded successfully!');
    
    // Initialize all features
    initializeParticles();
    initializeTabs();
    initializeSmoothScroll();
    initializeScrollToTop();
    initializeScrollAnimations();
    initializeKeyboardNavigation();
    initializeLazyLoading();
    initializeNavbarScroll();
    initializeMobileMenu();
    
    // Animation for counters
    setTimeout(() => animateCounters(), 500);
});

/* ================== Window Resize Handler ================== */
window.addEventListener('resize', throttle(() => {
    // Handle responsive adjustments
}, 250));

/* ================== Custom CSS Animations ================== */
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }

    @keyframes pulse {
        0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
        }
        50% { 
            opacity: 1;
            transform: scale(1.05);
        }
    }

    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(105, 66, 213, 0.5); }
        50% { box-shadow: 0 0 20px rgba(105, 66, 213, 1); }
    }

    .glow {
        animation: glow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

/* ================== Development Helpers ================== */
window.AlgoRhythm = {
    version: '1.0.0',
    environment: 'production',
    log: (message) => console.log('🎵 AlgoRhythm:', message),
    getCurrentTab: () => {
        const active = document.querySelector('.tab-button.active');
        return active ? active.getAttribute('data-tab') : 'summary';
    },
    switchTab: (tabName) => {
        const button = document.querySelector(`[data-tab="${tabName}"]`);
        if (button) button.click();
    }
};
