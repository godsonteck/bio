document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Management ---
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Active Link Tracking ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
