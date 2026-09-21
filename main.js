document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Progress Indicator ---
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        });
    };
    createScrollProgress();

    // --- Dynamic Custom Cursor (fine pointer / desktop only) ---
    if (window.matchMedia('(pointer: fine)').matches) {
        const dot = document.createElement('div');
        const ring = document.createElement('div');
        dot.className = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);
        document.body.classList.add('has-custom-cursor');

        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;
        let isVisible = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
            if (!isVisible) {
                dot.style.opacity = '1';
                ring.style.opacity = '1';
                isVisible = true;
            }
        });

        document.addEventListener('mouseleave', () => {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
            isVisible = false;
        });

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            requestAnimationFrame(animateRing);
        };
        requestAnimationFrame(animateRing);
    }

    // --- Project Filters ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('[data-filter]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardFilters = card.getAttribute('data-filter') || '';
                const matches = filter === 'all' || cardFilters.split(',').map(s => s.trim()).includes(filter);

                if (matches) {
                    card.style.display = '';
                    card.style.animation = 'slideInUp 0.4s ease-out both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Reveal Animations with Stagger ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Smooth Scroll for anchor links ---
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

    // --- Page Load Animation ---
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-out';
        document.body.style.opacity = '1';
    }, 50);

    // --- Parallax Effect on Hero Image ---
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxValue = scrolled * 0.5;
            if (window.innerHeight > 768) {
                heroVisual.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    }

    // --- Enhanced Button Interactions ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });

    // --- Keyboard Navigation ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('#nav-menu');
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.mobile-nav-toggle')?.classList.remove('active');
            }
        }
    });

    // --- Service Cards Spotlight Effect ---
    document.getElementById("services")?.addEventListener("mousemove", e => {
        for(const card of document.querySelectorAll(".service-card")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    });

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox) {
        // Attach click to the WHOLE gallery-item, not just img,
        // so the overlay div never blocks the event.
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (!img) return;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
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


