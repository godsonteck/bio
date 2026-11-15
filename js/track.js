/* Lightweight event tracking. Vercel Web Analytics when enabled, dataLayer always. */
window.trackEvent = (name, props = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...props });
    if (typeof window.va === 'function') {
        window.va('event', { name, data: props });
    }
};

document.addEventListener('click', (event) => {
    const el = event.target.closest('[data-track]');
    if (!el) return;
    window.trackEvent(el.dataset.track, {
        label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60),
        href: el.getAttribute('href') || undefined
    });
});