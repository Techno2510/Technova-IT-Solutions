/* ============================================================
   TECHNOVA IT SOLUTIONS - MAIN JAVASCRIPT
   ============================================================ */

   (function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        // ---------- BACK TO TOP BUTTON ----------
        const topBtn = document.getElementById('topBtn');
        if (topBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 400) {
                    topBtn.classList.add('show');
                } else {
                    topBtn.classList.remove('show');
                }
            });

            topBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // ---------- ACTIVE NAV LINK ----------
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar .nav-link');

        navLinks.forEach(function(link) {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPath) {
                link.classList.add('active');
            }
        });

        // ---------- MOBILE MENU AUTO CLOSE ----------
        const navCollapse = document.getElementById('navbarNav') ||
                           document.getElementById('navbar') ||
                           document.getElementById('navbarMenu') ||
                           document.getElementById('menu');

        const toggler = document.querySelector('.navbar-toggler');

        if (navCollapse && toggler) {
            document.querySelectorAll('.navbar .nav-link').forEach(function(link) {
                link.addEventListener('click', function() {
                    if (navCollapse.classList.contains('show')) {
                        toggler.click();
                    }
                });
            });
        }

        // ---------- SCROLL REVEAL ----------
        const revealElements = document.querySelectorAll('.reveal');

        function checkReveal() {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            revealElements.forEach(function(element) {
                const elementTop = element.getBoundingClientRect().top;

                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('visible');
                }
            });
        }

        setTimeout(checkReveal, 200);
        window.addEventListener('scroll', checkReveal);

        // ---------- STAGGER CHILDREN ----------
        const staggerContainers = document.querySelectorAll('.stagger-children');

        staggerContainers.forEach(function(container) {
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.animationDelay = (i * 0.1) + 's';
            }
        });

        // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ---------- WHATSAPP CLICK ----------
        const whatsappBtn = document.querySelector('.whatsapp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                console.log('WhatsApp button clicked');
            });
        }

        // ---------- PREVENT EMPTY LINKS ----------
        document.querySelectorAll('a[href="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });

        // ---------- YEAR AUTO-UPDATE ----------
        const yearSpans = document.querySelectorAll('#year');
        yearSpans.forEach(function(span) {
            span.textContent = new Date().getFullYear();
        });

        // ---------- PREVENT DOUBLE SUBMIT ----------
        document.querySelectorAll('form').forEach(function(form) {
            form.addEventListener('submit', function(e) {
                const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                }
            });
        });

        // ---------- BACK TO TOP - KEYBOARD ----------
        if (topBtn) {
            topBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }

        // ---------- TOOLTIP ----------
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function(tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        console.log('Technova IT Solutions - Website loaded successfully!');
    });

})();

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const later = function() {
            clearTimeout(timeout);
            func();
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

function isInViewport(element, offset) {
    offset = offset || 0;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 - offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}