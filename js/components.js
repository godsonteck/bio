/*
   Emmanuel Drah Portfolio - Shared Web Components
   Theme: Technical & Systems-Inspired Shared Header Navigation and Footer.
*/

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
                    <a href="projects.html">Projects</a>
                    <a href="gallery.html">Gallery</a>
                    <a href="contact.html">Contact</a>
                </div>

                <div class="mobile-nav-toggle-wrap" style="display: flex; gap: 1rem; align-items: center;">
                    <a href="contact.html" class="btn btn-primary btn-nav-hire">Hire Me</a>
                    <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="nav-menu">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </nav>

            <!-- Fullscreen Immersive Mobile Navigation Overlay -->
            <div class="mobile-menu-overlay" id="mobile-overlay">
                <div class="mobile-menu-content">
                    <a href="index.html" class="mobile-menu-link">Home</a>
                    <a href="about.html" class="mobile-menu-link">About Me</a>
                    <a href="projects.html" class="mobile-menu-link">Selected Work</a>
                    <a href="gallery.html" class="mobile-menu-link">Visual Gallery</a>
                    <a href="contact.html" class="mobile-menu-link">Contact</a>
                </div>
            </div>
        `;

        this.initNav();
    }

    initNav() {
        const navbar = this.querySelector('#navbar');
        const mobileToggle = this.querySelector('#mobile-toggle');
        const mobileOverlay = this.querySelector('#mobile-overlay');
        const overlayLinks = this.querySelectorAll('.mobile-menu-link');
        const navLinks = this.querySelectorAll('.nav-links a');

        // Toggle Fullscreen Mobile Menu
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile overlay on links click
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Active page navigation styling on scroll and load
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // desktop links active check
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        // mobile overlay links active check
        overlayLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

class PortfolioFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-logo">
                            <img src="images/sad.jpg" alt="Success Above Dreams Logo">
                            <div class="brand-info">
                                <span class="brand-name" style="font-size: 1.1rem; color: var(--text-main);">Emmanuel Drah</span>
                                <span class="brand-tag" style="font-size: 0.65rem; color: var(--accent); font-family: var(--font-mono); font-weight: 600;">Success Above Dreams</span>
                            </div>
                        </div>
                        <div style="text-align: right; display: flex; flex-direction: column; gap: 0.25rem;">
                            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">&copy; ${new Date().getFullYear()} Emmanuel Drah. Built with pride in Ghana.</p>
                            <p style="font-size: 0.75rem; color: var(--accent); font-family: var(--font-mono); font-weight: 600; margin: 0; letter-spacing: 0.05em;">Proudly powered by Success Above Dreams</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
