// main.js - Modern Portfolio JavaScript

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION FUNCTION =====
function initializeApp() {
    // Initialize all components
    initializeLoader();
    initializeNavigation();
    initializeCustomCursor();
    initializeThemeSystem();
    initializeAnimations();
    initializeTypewriter();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeScrollEffects();
    initializeParticles();
     initializeAchievementsAnimations();
     initializeMobileHomeSection();
    
    // Set initial theme
    setTheme('blue');
}

// ===== LOADER =====
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // Simulate loading time (you can replace this with actual asset loading)
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation completes
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
                
                // Smooth scroll to section
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                setActiveNavLink(targetId);
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            setActiveNavLink(`#${current}`);
        }
    });
}

function setActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== CUSTOM CURSOR =====
function initializeCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .social-link, .theme-icon, .nav-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Cursor click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// ===== THEME SYSTEM =====
function initializeThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeColors = document.querySelectorAll('.theme-color');
    let isThemeSelectorVisible = false;
    
    // Toggle theme selector visibility
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            isThemeSelectorVisible = !isThemeSelectorVisible;
            updateThemeSelectorVisibility();
        });
    }
    
    // Handle theme color selection
    themeColors.forEach(color => {
        color.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const theme = this.getAttribute('data-color');
            setTheme(theme);
            
            // Update active state
            themeColors.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Hide theme selector after selection
            isThemeSelectorVisible = false;
            updateThemeSelectorVisibility();
        });
    });
    
    // Close theme selector when clicking outside
    document.addEventListener('click', function() {
        isThemeSelectorVisible = false;
        updateThemeSelectorVisibility();
    });
    
    function updateThemeSelectorVisibility() {
        const themeSelector = document.querySelector('.theme-selector');
        if (themeSelector) {
            themeSelector.style.opacity = isThemeSelectorVisible ? '1' : '0';
            themeSelector.style.visibility = isThemeSelectorVisible ? 'visible' : 'hidden';
            themeSelector.style.transform = isThemeSelectorVisible ? 'translateY(0)' : 'translateY(-10px)';
        }
    }
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'blue';
    setTheme(savedTheme);
    
    // Set active theme color
    themeColors.forEach(color => {
        if (color.getAttribute('data-color') === savedTheme) {
            color.classList.add('active');
        }
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    
    // Update particles color based on theme
    updateParticlesColor(theme);
}

function updateParticlesColor(theme) {
    const colorMap = {
        'red': '#ef4444',
        'purple': '#8b5cf6',
        'blue': '#0ea5e9',
        'green': '#10b981',
        'orange': '#f59e0b',
        'teal': '#14b8a6'
    };
    
    const particles = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
    
    if (particles && colorMap[theme]) {
        particles.particles.color.value = colorMap[theme];
        particles.fn.particlesRefresh();
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate sections on scroll
            gsap.utils.toArray('section').forEach(section => {
                gsap.fromTo(section, 
                    { 
                        opacity: 0, 
                        y: 50 
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
            
            // Animate skill bars on scroll
            gsap.utils.toArray('.skill-progress').forEach(progress => {
                const percentage = progress.getAttribute('data-percentage');
                
                gsap.fromTo(progress,
                    { width: '0%' },
                    {
                        width: `${percentage}%`,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: progress,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }
        
        // Home section animations
        const homeElements = gsap.utils.toArray('.home-title, .home-subtitle, .home-cta');
        homeElements.forEach((element, index) => {
            gsap.fromTo(element,
                { 
                    opacity: 0, 
                    y: 30 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    delay: 0.5 + (index * 0.3),
                    ease: 'power2.out'
                }
            );
        });
    }
}

// ===== TYPEWRITER EFFECT =====
function initializeTypewriter() {
    const elements = document.querySelectorAll('.txt-rotate');
    
    elements.forEach(element => {
        const dataRotate = element.getAttribute('data-rotate');
        const dataPeriod = element.getAttribute('data-period');
        
        if (dataRotate) {
            const items = JSON.parse(dataRotate.replace(/'/g, '"'));
            const period = parseInt(dataPeriod, 10) || 2000;
            
            new Typewriter(element, items, period);
        }
    });
}

class Typewriter {
    constructor(element, items, period) {
        this.element = element;
        this.items = items;
        this.period = period;
        this.loopNum = 0;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }
    
    tick() {
        const i = this.loopNum % this.items.length;
        const fullTxt = this.items[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) {
            delta /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

// ===== SKILLS ANIMATION =====
function initializeSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const percentage = progress.getAttribute('data-percentage');
                
                // Animate progress bar
                progress.style.width = `${percentage}%`;
                
                // Animate percentage counter
                animateCounter(progress.previousElementSibling.querySelector('.skill-percentage'), 0, parseInt(percentage), 1500);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '%';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
        
        // Add floating label functionality
        const formInputs = contactForm.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            // Check initial value
            if (input.value) {
                input.parentElement.classList.add('has-value');
            }
            
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
            
            // Handle dynamic value changes
            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('has-value');
                } else {
                    this.parentElement.classList.remove('has-value');
                }
            });
        });
    }
}

async function handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;

    try {
        // Convert FormData to plain object
        const data = Object.fromEntries(formData.entries());

        // Send to Netlify Function
        const response = await fetch("/.netlify/functions/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            showNotification("Message sent successfully!", "success");
            form.reset();
        } else {
            showNotification(`Error: ${result.error}`, "error");
        }
    } catch (error) {
        showNotification("Something went wrong. Please try again.", "error");
        console.error(error);
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Remove has-value classes
        const formGroups = form.querySelectorAll(".form-group");
        formGroups.forEach(group => group.classList.remove("has-value"));
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#0ea5e9'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Parallax effect for home section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home-section');
        
        if (homeSection) {
            const parallaxSpeed = 0.5;
            homeSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===== PARTICLES.JS INITIALIZATION =====
function initializeParticles() {
    // Particles.js is initialized in the HTML
    // This function can be used for additional particle customization
    
    // Refresh particles on theme change
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                const theme = document.documentElement.getAttribute('data-theme');
                updateParticlesColor(theme);
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== EXPORTS FOR MODULAR USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setTheme,
        Typewriter
    };
}

// ===== ACHIEVEMENTS ANIMATIONS =====
function initializeAchievementsAnimations() {
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                animateCounter(statNumber, 0, target, 2000);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Add plus sign for large numbers
        if (end >= 100) {
            element.textContent = value + '+';
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}



// ===== PARTICLES.JS INITIALIZATION =====
function initializeParticles() {
    // Wait for particlesJS to be available
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('particlesJS not loaded yet, retrying...');
        // Retry after a short delay
        setTimeout(initializeParticles, 100);
    }
}

// Update your initializeApp function
// function initializeApp() {
//     initializeLoader();
//     initializeNavigation();
//     initializeCustomCursor();
//     initializeThemeSystem();
//     initializeAnimations();
//     initializeTypewriter();
//     initializeSkillsAnimation();
//     initializeContactForm();
//     initializeScrollEffects();
//     initializeLogoAnimations();
//     initializeAchievementsAnimations();
//     initializeParticles(); // Add this line
    
//     setTheme('blue');
// }

// Enhanced mobile handling for home section
function initializeMobileHomeSection() {
    const homeSection = document.querySelector('.home-section');
    const socialLinks = document.querySelector('.social-links');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Handle viewport changes
    function handleViewportChange() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile-specific optimizations
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
    
    // Initial check
    handleViewportChange();
    
    // Listen for resize events
    window.addEventListener('resize', handleViewportChange);
    
    // Touch optimizations for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Increase touch targets for mobile
        socialLinks?.classList.add('touch-optimized');
        themeToggle?.classList.add('touch-optimized');
    }
}

