/* ==========================================================================
   EMMANUEL DRAH — CORE APPLICATION SCRIPT
   High-performance, clean interactions without gimmicks or tacky custom cursors.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Gallery Lightbox (if present) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.photo-essay-card, .gallery-item').forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (!img) return;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || 'Gallery Exhibition Image';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
