/* ============================================================
   TECHNOVA IT SOLUTIONS - SLIDER / CAROUSEL
   ============================================================ */

   (function() {
    'use strict';

    function initCarousels() {
        if (typeof bootstrap === 'undefined') {
            console.warn('Bootstrap JS not loaded. Carousel features may not work.');
            return;
        }

        const carousels = document.querySelectorAll('.carousel');

        carousels.forEach(function(carousel) {
            const id = carousel.id || 'carousel-' + Math.random().toString(36).substr(2, 9);

            if (!carousel.id) {
                carousel.id = id;
            }

            const options = {
                interval: parseInt(carousel.dataset.interval) || 5000,
                ride: carousel.dataset.ride || 'carousel',
                pause: carousel.dataset.pause || 'hover',
                wrap: carousel.dataset.wrap !== 'false',
                keyboard: carousel.dataset.keyboard !== 'false',
                touch: carousel.dataset.touch !== 'false'
            };

            try {
                const bsCarousel = new bootstrap.Carousel(carousel, options);
                carousel._bsCarousel = bsCarousel;

                const indicators = carousel.querySelectorAll('[data-bs-slide-to]');
                indicators.forEach(function(indicator) {
                    indicator.addEventListener('click', function() {
                        console.log('Carousel slide: ' + this.dataset.bsSlideTo);
                    });
                });

            } catch (e) {
                console.warn('Error initializing carousel:', e);
            }
        });
    }

    function initCarouselVisibility() {
        const carousels = document.querySelectorAll('.carousel');

        carousels.forEach(function(carousel) {
            let isVisible = false;

            function checkVisibility() {
                const rect = carousel.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                const visible = rect.top < windowHeight - 100 && rect.bottom > 100;

                if (visible !== isVisible) {
                    isVisible = visible;

                    if (carousel._bsCarousel) {
                        if (isVisible) {
                            carousel._bsCarousel.cycle();
                        } else {
                            carousel._bsCarousel.pause();
                        }
                    }
                }
            }

            window.addEventListener('scroll', checkVisibility);
            window.addEventListener('resize', checkVisibility);

            setTimeout(checkVisibility, 500);
        });
    }

    function initCustomSliders() {
        const sliders = document.querySelectorAll('.custom-slider');

        sliders.forEach(function(slider) {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.slide-prev');
            const nextBtn = slider.querySelector('.slide-next');
            let currentIndex = 0;
            let autoPlay = slider.dataset.autoplay === 'true';
            let intervalId = null;

            function showSlide(index) {
                slides.forEach(function(slide, i) {
                    slide.classList.toggle('active', i === index);
                });

                const dots = slider.querySelectorAll('.slide-dot');
                dots.forEach(function(dot, i) {
                    dot.classList.toggle('active', i === index);
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            }

            function startAutoPlay() {
                if (autoPlay && slides.length > 1) {
                    intervalId = setInterval(nextSlide, parseInt(slider.dataset.interval) || 5000);
                }
            }

            function stopAutoPlay() {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    stopAutoPlay();
                    nextSlide();
                    startAutoPlay();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    stopAutoPlay();
                    prevSlide();
                    startAutoPlay();
                });
            }

            const dots = slider.querySelectorAll('.slide-dot');
            dots.forEach(function(dot, index) {
                dot.addEventListener('click', function() {
                    stopAutoPlay();
                    currentIndex = index;
                    showSlide(currentIndex);
                    startAutoPlay();
                });
            });

            if (autoPlay) {
                slider.addEventListener('mouseenter', stopAutoPlay);
                slider.addEventListener('mouseleave', startAutoPlay);
            }

            showSlide(0);
            startAutoPlay();

            slider._customSlider = {
                next: nextSlide,
                prev: prevSlide,
                goTo: function(index) {
                    stopAutoPlay();
                    currentIndex = index;
                    showSlide(currentIndex);
                    startAutoPlay();
                },
                destroy: function() {
                    stopAutoPlay();
                    slider._customSlider = null;
                }
            };
        });
    }

    function initTouchSupport() {
        const sliders = document.querySelectorAll('.carousel, .custom-slider');

        sliders.forEach(function(slider) {
            let startX = 0;
            let startY = 0;
            let isSwiping = false;

            slider.addEventListener('touchstart', function(e) {
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                isSwiping = true;
            }, { passive: true });

            slider.addEventListener('touchmove', function(e) {
                if (!isSwiping) return;

                const touch = e.touches[0];
                const diffX = startX - touch.clientX;
                const diffY = startY - touch.clientY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                    e.preventDefault();

                    if (slider._bsCarousel) {
                        if (diffX > 0) {
                            slider._bsCarousel.next();
                        } else {
                            slider._bsCarousel.prev();
                        }
                    } else if (slider._customSlider) {
                        if (diffX > 0) {
                            slider._customSlider.next();
                        } else {
                            slider._customSlider.prev();
                        }
                    }

                    isSwiping = false;
                }
            }, { passive: false });

            slider.addEventListener('touchend', function() {
                isSwiping = false;
            }, { passive: true });
        });
    }

    function initialize() {
        initCarousels();
        initCarouselVisibility();
        initCustomSliders();
        initTouchSupport();

        console.log('Technova IT Solutions - Slider initialized!');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initialize, 500);
    });

})();