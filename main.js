/* Shared interactions for the full portfolio. */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll('.section-wrap .container > *, .spotlight-card');
    if (!reduceMotion && 'IntersectionObserver' in window) {
        document.body.classList.add('reveal-ready');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    let lastFocused = null;

    if (lightbox && lightboxImg) {
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('no-scroll');
            lastFocused?.focus();
        };

        lightbox.setAttribute('aria-hidden', 'true');
        document.querySelectorAll('.photo-essay-card, .gallery-item, .memory-card').forEach(item => {
            item.style.cursor = 'pointer';
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');

            const openLightbox = () => {
                const image = item.querySelector('img');
                if (!image) return;
                lastFocused = item;
                lightboxImg.src = image.src;
                lightboxImg.alt = image.alt || 'Expanded photo';
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('no-scroll');
                lightboxClose?.focus();
            };

            item.addEventListener('click', openLightbox);
            item.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox();
                }
            });
        });

        lightboxClose?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});
