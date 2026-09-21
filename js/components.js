/* ==========================================================================
   EMMANUEL DRAH — BESPOKE WEB COMPONENTS (NAV & FOOTER)
   Theme: Editorial Luxury Monograph & Creative Engineering Studio
   ========================================================================== */

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav id="navbar">
                <a href="index.html" class="brand">
                    <div class="brand-monogram">
                        <img src="images/sad.jpg" alt="Emmanuel Drah &middot; S.A.D.">
                    </div>
                    <div class="brand-meta">
                        <span class="brand-title">Emmanuel Drah</span>
                        <span class="brand-creed">Success Above Dreams</span>
                    </div>
                </a>

                <div class="nav-links" id="nav-menu">
                    <a href="index.html">Index</a>
                    <a href="projects.html">Selected Work</a>
                    <a href="case-studies.html">Case Studies</a>
                    <a href="about.html">About</a>
                    <a href="the-brand.html">The Brand</a>
                    <a href="contact.html" class="btn-nav-touch">Contact &nearr;</a>
                </div>

                <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
                    <span class="hamburger"></span>
                </button>
            </nav>

            <!-- Fullscreen Immersive Mobile Navigation Overlay -->
            <div class="mobile-menu-overlay" id="mobile-overlay">
                <div class="mobile-menu-content">
                    <a href="index.html" class="mobile-menu-link">Index</a>
                    <a href="projects.html" class="mobile-menu-link">Selected Work</a>
                    <a href="case-studies.html" class="mobile-menu-link">Case Studies</a>
                    <a href="about.html" class="mobile-menu-link">About</a>
                    <a href="the-brand.html" class="mobile-menu-link">The Brand</a>
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
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Ensure favicon is present on every page
        if (!document.querySelector("link[rel*='icon']")) {
            const fav = document.createElement('link');
            fav.rel = 'icon';
            fav.type = 'image/jpeg';
            fav.href = 'images/sad.jpg';
            document.head.appendChild(fav);

            const apple = document.createElement('link');
            apple.rel = 'apple-touch-icon';
            apple.href = 'images/sad.jpg';
            document.head.appendChild(apple);
        }

        const getSlug = (url) => {
            if (!url) return 'index';
            const clean = url.split('#')[0].split('?')[0].split('/').pop() || '';
            return clean.replace(/\.html$/, '') || 'index';
        };

        const currentSlug = getSlug(window.location.pathname);

        navLinks.forEach(link => {
            const linkSlug = getSlug(link.getAttribute('href'));
            if (linkSlug === currentSlug) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        overlayLinks.forEach(link => {
            const linkSlug = getSlug(link.getAttribute('href'));
            if (linkSlug === currentSlug) {
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
                <div class="monograph-container">
                    <div class="footer-inner">
                        <div class="footer-brand-side">
                            <p class="footer-quote">
                                &ldquo;Dreams are the beginning, not the proof. Success is what quiet discipline builds when nobody is watching.&rdquo;
                            </p>
                            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-top: 0.5rem;">
                                Emmanuel Drah &middot; Engineer &amp; Founder of Success Above Dreams.
                            </p>
                            <p style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-warm); margin-top: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">
                                Ho, Volta Region, Ghana
                            </p>
                        </div>

                        <div class="footer-nav-groups">
                            <div class="footer-col">
                                <span class="footer-col-title">Navigation</span>
                                <a href="index.html">Index</a>
                                <a href="projects.html">Selected Work</a>
                                <a href="case-studies.html">Case Studies</a>
                                <a href="about.html">About</a>
                                <a href="the-brand.html">The Brand</a>
                            </div>
                            <div class="footer-col">
                                <span class="footer-col-title">Selected Live</span>
                                <a href="https://nsvilla.com" target="_blank" rel="noopener noreferrer">NS Luxury Villa &nearr;</a>
                                <a href="https://crcosmeticsgh.com" target="_blank" rel="noopener noreferrer">CR Cosmetics Store &nearr;</a>
                                <a href="services.html">Commissions</a>
                                <a href="resume.html">Curriculum Vitae</a>
                            </div>
                            <div class="footer-col">
                                <span class="footer-col-title">Direct Inquiries</span>
                                <a href="https://wa.me/233543671806" target="_blank" rel="noopener noreferrer">WhatsApp Direct &nearr;</a>
                                <a href="mailto:emmanueldrah10@gmail.com">emmanueldrah10@gmail.com</a>
                                <a href="tel:+233543671806">+233 543 671 806</a>
                                <a href="contact.html">Project Salon &rarr;</a>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <span>&copy; ${new Date().getFullYear()} Emmanuel Drah &middot; Success Above Dreams.</span>
                        <span>Crafted in Ho, Ghana &middot; Built for reality, not applause.</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
