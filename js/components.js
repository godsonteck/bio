/* ==========================================================================
   EMMANUEL DRAH — WARM PERSONAL WEB COMPONENTS (NAV & FOOTER)
   ========================================================================== */

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav id="navbar">
                <div class="container nav-inner">
                    <a href="index.html" class="brand-badge">
                        <div class="brand-avatar">
                            <img src="images/sad.jpg" alt="Emmanuel Drah &middot; S.A.D.">
                        </div>
                        <div>
                            <span class="brand-name">Emmanuel Drah</span>
                            <span class="brand-tagline">Full-Stack Developer &middot; Ho, Ghana</span>
                        </div>
                    </a>

                    <div class="nav-links" id="nav-menu">
                        <a href="index.html">Home</a>
                        <a href="projects.html">Projects</a>
                        <a href="case-studies.html">Case Studies</a>
                        <a href="about.html">My Story</a>
                        <a href="the-brand.html">The Brand</a>
                        <a href="contact.html" class="btn-nav-talk">Get in Touch</a>
                    </div>

                    <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </nav>

            <!-- Mobile Navigation Overlay -->
            <div class="mobile-menu-overlay" id="mobile-overlay">
                <a href="index.html" class="mobile-menu-link">Home</a>
                <a href="projects.html" class="mobile-menu-link">Projects</a>
                <a href="case-studies.html" class="mobile-menu-link">Case Studies</a>
                <a href="about.html" class="mobile-menu-link">My Story</a>
                <a href="the-brand.html" class="mobile-menu-link">The Brand</a>
                <a href="contact.html" class="mobile-menu-link">Get in Touch</a>
            </div>
        `;

        this.initNav();
    }

    initNav() {
        const mobileToggle = this.querySelector('#mobile-toggle');
        const mobileOverlay = this.querySelector('#mobile-overlay');
        const overlayLinks = this.querySelectorAll('.mobile-menu-link');
        const navLinks = this.querySelectorAll('.nav-links a');

        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Ensure favicon exists
        if (!document.querySelector("link[rel*='icon']")) {
            const fav = document.createElement('link');
            fav.rel = 'icon';
            fav.type = 'image/jpeg';
            fav.href = 'images/sad.jpg';
            document.head.appendChild(fav);
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
                <div class="container">
                    <div class="footer-content-clean">
                        <div class="footer-bio-col">
                            <div class="footer-bio-name">Emmanuel Drah</div>
                            <p class="footer-bio-text">
                                Full-stack developer and founder of Success Above Dreams. Based in Ho, Volta Region, Ghana. Building practical software for real people and local operations.
                            </p>
                            <div style="margin-top: 1.25rem;">
                                <a href="https://wa.me/233543671806" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="padding: 0.6rem 1.15rem; font-size: 0.85rem;">
                                    <span>💬 Chat on WhatsApp</span>
                                </a>
                            </div>
                        </div>

                        <div class="footer-nav-col">
                            <h5>Pages</h5>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="projects.html">Projects</a></li>
                                <li><a href="case-studies.html">Case Studies</a></li>
                                <li><a href="about.html">My Story</a></li>
                                <li><a href="the-brand.html">The Brand</a></li>
                            </ul>
                        </div>

                        <div class="footer-nav-col">
                            <h5>Featured Live</h5>
                            <ul>
                                <li><a href="https://nsvilla.com" target="_blank" rel="noopener noreferrer">NS Luxury Villa &nearr;</a></li>
                                <li><a href="https://crcosmeticsgh.com" target="_blank" rel="noopener noreferrer">CR Cosmetics Store &nearr;</a></li>
                                <li><a href="Emmanuel_Drah_CV.docx" download>Download CV (.docx)</a></li>
                                <li><a href="contact.html">Contact Me</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom-clean">
                        <span>&copy; ${new Date().getFullYear()} Emmanuel Drah &middot; Success Above Dreams</span>
                        <span>Built with care in Ho, Ghana &middot; Discipline over dreams.</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
