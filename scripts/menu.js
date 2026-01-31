/**
 * Mobile Menu and UI Interactions
 * Following HIG (Human Interface Guidelines) and Material Design principles
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // Mobile Navigation (Hamburger Menu)
    // ==========================================
    const hamburgerToggle = document.querySelector('.hamburger-nav__toggle');
    const hamburgerMenu = document.querySelector('.hamburger-nav__menu');
    const hamburgerLinks = document.querySelectorAll('.hamburger-nav__link');

    // Create overlay element for menu
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    /**
     * Toggle mobile menu open/closed state
     * Provides visual feedback and manages body scroll
     */
    function toggleMenu() {
        const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';

        // Toggle active states
        hamburgerToggle.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');

        // Update ARIA attributes for accessibility
        hamburgerToggle.setAttribute('aria-expanded', !isExpanded);

        // Prevent body scroll when menu is open
        if (hamburgerMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Focus trap - move focus to first menu item
            if (hamburgerLinks.length > 0) {
                setTimeout(() => hamburgerLinks[0].focus(), 100);
            }
        } else {
            document.body.style.overflow = '';
            // Return focus to toggle button
            hamburgerToggle.focus();
        }
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        hamburgerToggle.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburgerToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle menu on hamburger button click
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    hamburgerLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburgerMenu && hamburgerMenu.classList.contains('active')) {
            if (!hamburgerToggle.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                closeMenu();
            }
        }
    });

    // Close menu on escape key (Accessibility)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hamburgerMenu && hamburgerMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on window resize (if transitioning to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && hamburgerMenu && hamburgerMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ==========================================
    // Scroll to Top Button
    // ==========================================
    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.id = 'scrollTop';
    scrollTopButton.setAttribute('aria-label', 'Наверх');
    scrollTopButton.innerHTML = '↑';
    document.body.appendChild(scrollTopButton);

    /**
     * Show/hide scroll to top button based on scroll position
     * Button appears after scrolling 300px
     */
    function toggleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }

    // Throttled scroll listener for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(toggleScrollTopButton);
    });

    // Scroll to top with smooth behavior
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // Touch Feedback for Interactive Elements
    // ==========================================
    const touchElements = document.querySelectorAll('.button, .header__button, .product-card, .footer__link, .footer__social-link');

    touchElements.forEach(element => {
        // Add touch feedback class
        element.classList.add('touch-feedback');

        // Touch start - add active state
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        // Touch end - remove active state
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });

        // Touch cancel - remove active state
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // ==========================================
    // Active Navigation Link Highlighting
    // ==========================================
    const sectionNavLinks = document.querySelectorAll('.section-nav__link, .hamburger-nav__link');
    const sections = document.querySelectorAll('section[id]');

    /**
     * Highlight active section in navigation
     * Uses Intersection Observer for performance
     */
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    sectionNavLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Form Validation Feedback
    // ==========================================
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !emailInput.value.trim()) {
                e.preventDefault();
                emailInput.focus();
                // Haptic feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });
    }

    // ==========================================
    // Double-tap to Zoom Prevention on Buttons
    // ==========================================
    const buttons = document.querySelectorAll('button, .button');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            // Prevent double-tap zoom on iOS
            e.preventDefault();
            this.click();
        }, { passive: false });
    });

    console.log('Mobile menu initialized - HIG & Material Design compliant');
});
