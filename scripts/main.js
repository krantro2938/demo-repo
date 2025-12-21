// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerToggle = document.querySelector('.hamburger-nav__toggle');
    const hamburgerMenu = document.querySelector('.hamburger-nav__menu');
    const hamburgerLinks = document.querySelectorAll('.hamburger-nav__link');

    // Toggle menu
    hamburgerToggle.addEventListener('click', function() {
        hamburgerToggle.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (hamburgerMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on a link
    hamburgerLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerToggle.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburgerToggle.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            hamburgerToggle.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hamburgerToggle.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});