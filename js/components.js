class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav id="navbar">
                <a href="index.html" class="brand">
                    <img src="images/sad.jpg" alt="SAD Logo" class="logo-img">
                    <div class="brand-info">
                        <span class="brand-name">Emmanuel Drah</span>
                        <span class="brand-tag">Success Above Dreams</span>
                    </div>
                </a>
                <div class="nav-links" id="nav-menu">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="projects.html">My Projects</a>
                    <a href="gallery.html">Gallery</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <button class="btn-theme" id="theme-btn" aria-label="Toggle Theme">🌙</button>
                    <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Open Menu" aria-expanded="false" aria-controls="nav-menu">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </nav>
        `;

        // Initialize Navigation Logic
        this.initNav();
    }

    initNav() {
        const navbar = this.querySelector('#navbar');
        const mobileToggle = this.querySelector('#mobile-toggle');
        const navMenu = this.querySelector('#nav-menu');
        const navLinks = this.querySelectorAll('.nav-links a');
        const themeBtn = this.querySelector('#theme-btn');

        // Mobile Menu Toggle
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active Link Tracking
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        // Theme Management
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Switch to light theme');
        }

        themeBtn.addEventListener('click', () => {
            let theme = document.body.getAttribute('data-theme');
            if (theme === 'dark') {
                document.body.removeAttribute('data-theme');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Switch to dark theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                themeBtn.textContent = '☀️';
                themeBtn.setAttribute('aria-label', 'Switch to light theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

class PortfolioFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-content container">
                    <div class="footer-logo">
                        <img src="images/sad.jpg" alt="SAD Logo">
                        <div class="brand-info">
                            <span style="font-weight: 800; font-size: 1.2rem;">Emmanuel Drah</span>
                            <span style="font-size: 0.7rem; opacity: 0.7; letter-spacing: 1px;">SUCCESS ABOVE DREAMS</span>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="https://github.com/godsonteck" target="_blank" aria-label="Visit Emmanuel's GitHub Profile">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="" aria-hidden="true" style="width: 32px; height: 32px; filter: brightness(0) invert(1);">
                        </a>
                        <a href="mailto:emmanueldrah10@gmail.com" aria-label="Send an email to Emmanuel">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="" aria-hidden="true" style="width: 32px; height: 32px;">
                        </a>
                        <a href="tel:+233543671806" aria-label="Call Emmanuel Drah" style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: white; font-size: 0.8rem; text-decoration: none; font-weight: 800;">
                            <span aria-hidden="true" style="transform: rotate(90deg);">📞</span>
                        </a>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 4rem; font-size: 0.8rem; opacity: 0.5;">&copy; ${new Date().getFullYear()} Emmanuel Drah. Digital Architect & Visionary.</p>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
