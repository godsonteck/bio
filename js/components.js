/*
   Emmanuel Drah Portfolio - Shared Web Components
   Theme: Technical & Systems-Inspired Shared Header Navigation and Footer.
*/

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav id="navbar">
                <a href="index.html" class="brand">
                    <img src="images/sad.jpg" alt="Success Above Dreams logo" class="logo-img">
                    <div class="brand-info">
                        <span class="brand-name">Emmanuel Drah</span>
                        <span class="brand-tag"><span class="live-pulse-dot"></span>Success Above Dreams</span>
                    </div>
                </a>

                <div class="nav-links" id="nav-menu">
                    <a href="index.html">Home</a>
                    <a href="the-brand.html">The Brand</a>
                    <a href="about.html">About</a>
                    <a href="projects.html">Work</a>
                    <a href="services.html">Services</a>
                    <a href="case-studies.html">Case Studies</a>
                    <a href="gallery.html">Gallery</a>
                    <a href="certifications.html">Certifications</a>
                    <a href="resume.html">Resume</a>
                    <a href="contact.html" class="btn btn-primary btn-nav-hire">Let's Talk</a>
                </div>

                <div class="mobile-nav-toggle-wrap" style="display: flex; gap: 1rem; align-items: center;">
                    <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="nav-menu">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </nav>

            <!-- Fullscreen Immersive Mobile Navigation Overlay -->
            <div class="mobile-menu-overlay" id="mobile-overlay">
                <div class="mobile-menu-content">
                    <a href="index.html" class="mobile-menu-link">Home</a>
                    <a href="the-brand.html" class="mobile-menu-link">The Brand</a>
                    <a href="about.html" class="mobile-menu-link">About</a>
                    <a href="projects.html" class="mobile-menu-link">Work</a>
                    <a href="services.html" class="mobile-menu-link">Services</a>
                    <a href="case-studies.html" class="mobile-menu-link">Case Studies</a>
                    <a href="gallery.html" class="mobile-menu-link">Gallery</a>
                    <a href="certifications.html" class="mobile-menu-link">Certifications</a>
                    <a href="resume.html" class="mobile-menu-link">Resume</a>
                    <a href="contact.html" class="mobile-menu-link">Talk</a>
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
                        <div class="footer-brand-block">
                            <div class="footer-logo">
                                <img src="images/sad.jpg" alt="Success Above Dreams logo">
                                <div class="brand-info">
                                    <span class="brand-name" style="font-size: 1.05rem;">Emmanuel Drah</span>
                                    <span class="brand-tag" style="font-size: 0.68rem; color: var(--accent); font-family: var(--font-mono); font-weight: 600;"><span class="live-pulse-dot"></span>Success Above Dreams</span>
                                </div>
                            </div>
                            <p class="footer-creed">"Dreams are the beginning, not the proof. Success is what quiet discipline builds when nobody is watching."</p>
                            <div class="footer-origin">
                                <span>🇬🇭 Ho, Volta Region, Ghana</span>
                                <span style="opacity: 0.35;">·</span>
                                <span>Built for reality, not applause</span>
                            </div>
                        </div>

                        <div class="footer-links-wrap">
                            <div class="footer-links-group">
                                <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 0.5rem; display: block;">Navigation</span>
                                <a href="index.html">Home</a>
                                <a href="the-brand.html">The Brand</a>
                                <a href="about.html">About</a>
                                <a href="services.html">Services</a>
                            </div>
                            <div class="footer-links-group">
                                <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-family: var(--font-mono); margin-bottom: 0.5rem; display: block;">Work &amp; Story</span>
                                <a href="projects.html">Live Projects</a>
                                <a href="case-studies.html">Case Studies</a>
                                <a href="gallery.html">Gallery</a>
                                <a href="resume.html">Resume</a>
                            </div>
                        </div>

                        <div class="footer-meta">
                            <a href="https://wa.me/233543671806?text=Hello%20Emmanuel%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20talk%20about%20a%20project." target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="margin-bottom: 0.85rem;">
                                <span>💬 Chat on WhatsApp</span>
                            </a>
                            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">&copy; ${new Date().getFullYear()} Success Above Dreams. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
