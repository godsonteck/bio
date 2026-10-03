/* ── SAD Animation Engine ─────────────────────────────────────
   Emmanuel Drah / Success Above Dreams
   Expert scroll-reveal, hero word-stagger, entrance animations
   ─────────────────────────────────────────────────────────── */
(function initAnimations() {
    'use strict';
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* 1 ── Hero headline: split words and stagger them in ────── */
    function splitHeroWords() {
        const h = document.querySelector('.hero-headline');
        if (!h || h.querySelector('.hw')) return;

        // Flatten text, split on whitespace
        const text = h.innerText.trim();
        const words = text.split(/\s+/);
        h.innerHTML = words
            .map(w => `<span class="hw" aria-hidden="false">${w}</span>`)
            .join(' ');

        h.querySelectorAll('.hw').forEach((w, i) => {
            w.style.transitionDelay = `${0.05 + i * 0.075}s`;
        });

        // Double rAF to guarantee paint before class add
        requestAnimationFrame(() => requestAnimationFrame(() => {
            h.classList.add('hero-words-ready');
        }));
    }

    /* 2 ── Hero subhead + CTA buttons: stagger entrance ─────── */
    function staggerHeroBottom() {
        const els = [
            ...document.querySelectorAll('.hero-greeting'),
            ...document.querySelectorAll('.hero-subhead'),
            ...document.querySelectorAll('.hero-ctas > *'),
        ];
        els.forEach((el, i) => {
            el.style.opacity       = '0';
            el.style.transform     = 'translateY(18px)';
            el.style.transition    = 'opacity .52s ease, transform .52s cubic-bezier(.2,.8,.2,1)';
            el.style.transitionDelay = `${0.38 + i * 0.1}s`;
            requestAnimationFrame(() => requestAnimationFrame(() => {
                el.style.opacity   = '1';
                el.style.transform = 'none';
            }));
        });

        // Hero photo entrance: slide in from right
        const photo = document.querySelector('.hero-photo-wrap');
        if (photo) {
            photo.style.opacity       = '0';
            photo.style.transform     = 'translateX(28px)';
            photo.style.transition    = 'opacity .75s ease, transform .75s cubic-bezier(.2,.8,.2,1)';
            photo.style.transitionDelay = '0.18s';
            requestAnimationFrame(() => requestAnimationFrame(() => {
                photo.style.opacity   = '1';
                photo.style.transform = 'none';
            }));
        }
    }

    /* 3 ── Tag scrollable elements with [data-reveal] ────────── */
    function markRevealTargets() {
        const map = [
            ['.section-head',        'left' ],
            ['.spotlight-card',      ''     ],
            ['.skill-card-clean',    'scale'],
            ['.principle-card',      'scale'],
            ['.memory-card',         'scale'],
            ['.timeline-row',        'left' ],
            ['.story-box',           ''     ],
            ['.creed-banner',        ''     ],
            ['.home-pillar-card',    'right'],
            ['.home-craft-card',     ''     ],
            ['.contact-channel',     'left' ],
            ['.contact-form-box',    'right'],
            ['.manifesto-screen',    ''     ],
            ['.manifesto-portrait-wrap', ''],
        ];
        map.forEach(([sel, dir]) => {
            document.querySelectorAll(sel).forEach(el => {
                if (!el.hasAttribute('data-reveal')) {
                    el.setAttribute('data-reveal', dir);
                }
            });
        });
    }

    /* 4 ── Intersection Observer: reveal + sibling stagger ───── */
    function initRevealObserver() {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                // Count how many siblings with [data-reveal] precede this element
                // to create a natural staggered cascade per group
                const siblings = [...(el.parentElement?.children || [])].filter(
                    c => c.hasAttribute('data-reveal')
                );
                const idx = siblings.indexOf(el);
                el.style.transitionDelay = `${Math.min(idx * 0.09, 0.45)}s`;
                el.classList.add('is-visible');
                io.unobserve(el);
            });
        }, {
            threshold:  0.1,
            rootMargin: '0px 0px -40px 0px',
        });

        document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    }

    /* 5 ── Spotlight card: subtle mouse-tracking tilt ────────── */
    function initCardTilt() {
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const r   = card.getBoundingClientRect();
                const cx  = r.left + r.width  / 2;
                const cy  = r.top  + r.height / 2;
                const dx  = (e.clientX - cx) / (r.width  / 2); // -1 to +1
                const dy  = (e.clientY - cy) / (r.height / 2);
                const rx  = dy * -3;   // max 3deg
                const ry  = dx *  3;
                card.style.transform = `translateY(-7px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                card.style.transition = 'transform .12s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform  = '';
                card.style.transition = 'transform .4s var(--ease, cubic-bezier(.2,.8,.2,1))';
            });
        });
    }

    /* ── Boot ─────────────────────────────────────────────────── */
    function run() {
        splitHeroWords();
        staggerHeroBottom();
        markRevealTargets();
        initRevealObserver();
        initCardTilt();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
