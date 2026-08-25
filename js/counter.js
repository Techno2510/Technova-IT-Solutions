/* ============================================================
   TECHNOVA IT SOLUTIONS - COUNTER ANIMATION
   ============================================================ */

   (function() {
    'use strict';

    function animateCounter(counter) {
        const text = counter.textContent;
        let target = parseInt(text);

        if (isNaN(target)) {
            const match = text.match(/(\d+)×?(\d+)?/);
            if (match) {
                target = parseInt(match[1]);
                if (match[2]) {
                    target = parseInt(match[1] + match[2]);
                }
            } else {
                return;
            }
        }

        let current = 0;
        const duration = 2000;
        const steps = 80;
        const increment = Math.ceil(target / steps);
        const stepTime = Math.floor(duration / steps);

        const originalText = counter.textContent;
        let suffix = '';
        if (text.includes('+')) suffix = '+';
        else if (text.includes('%')) suffix = '%';
        else if (text.includes('×')) {
            const parts = text.split('×');
            if (parts[1]) {
                suffix = '×' + parts[1];
            }
        }

        counter.textContent = '0';

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = current + suffix;
            }
        }, stepTime);
    }

    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        if (counters.length === 0) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.dataset.animated) {
                        animateCounter(counter);
                        counter.dataset.animated = 'true';
                    }
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initCounters, 500);
    });

})();