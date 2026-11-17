/* Drawer, lightbox, and anchor scrolling. Content is visible without JS. */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const drawer = document.getElementById('drawer');
    const drawerClose = document.getElementById('drawer-close');

    const containFocus = (event, container) => {
        if (event.key !== 'Tab') return;
        const controls = [...container.querySelectorAll('a[href], button:not([disabled])')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
            event.preventDefault();
            first.focus();
        }
    };

    if (menuBtn && drawer) {
        const openDrawer = () => {
            drawer.inert = false;
            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Close menu');
            document.body.classList.add('no-scroll');
            drawerClose?.focus();
        };
        const closeDrawer = (restoreFocus = true) => {
            drawer.inert = true;
            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('no-scroll');
            if (restoreFocus) menuBtn.focus();
        };

        menuBtn.addEventListener('click', () => {
            drawer.classList.contains('open') ? closeDrawer() : openDrawer();
        });
        drawerClose?.addEventListener('click', closeDrawer);
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeDrawer(false));
        });
        document.addEventListener('keydown', event => {
            if (!drawer.classList.contains('open')) return;
            if (event.key === 'Escape') closeDrawer();
            else containFocus(event, drawer);
        });
        window.matchMedia('(min-width: 940px)').addEventListener('change', event => {
            if (event.matches && drawer.classList.contains('open')) closeDrawer(false);
        });
    }

    /* Ghana keeps UTC all year, so the time in Ho is the UTC clock. */
    const hoGreeting = document.querySelector('[data-ho-greeting]');
    const hoTime = document.querySelector('[data-ho-time]');
    if (hoGreeting && hoTime) {
        const showHoTime = () => {
            const now = new Date();
            const hour = now.getUTCHours();
            const minutes = String(now.getUTCMinutes()).padStart(2, '0');
            hoGreeting.textContent = hour < 5 || hour >= 22 ? 'Late night in Ho'
                : hour < 12 ? 'Good morning from Ho'
                : hour < 17 ? 'Good afternoon from Ho'
                : 'Good evening from Ho';
            hoTime.textContent = `${hour % 12 || 12}:${minutes} ${hour < 12 ? 'am' : 'pm'}`;
        };
        showHoTime();
        setInterval(showHoTime, 30000);
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
        document.querySelectorAll('.photo').forEach(item => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            const label = item.querySelector('.ti');
            const ev = item.querySelector('.ev');
            if (label) item.setAttribute('aria-label', `View photo: ${ev ? ev.textContent + ' ' : ''}${label.textContent}`);

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
            if (!lightbox.classList.contains('active')) return;
            if (event.key === 'Escape') closeLightbox();
            else containFocus(event, lightbox);
        });
    }
});