/* Shared navigation and footer for the full portfolio. */

const getPageSlug = (url = window.location.pathname) => {
    const clean = url.split('#')[0].split('?')[0].split('/').pop() || '';
    return clean.replace(/\.html$/, '') || 'index';
};

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        const currentPage = getPageSlug();
        document.body.dataset.page = currentPage;

        this.innerHTML = `
            <a class="skip-link" href="#main-content">Skip to content</a>

            <!-- ── Top Bar: full nav on desktop, logo-only on mobile ── -->
            <nav id="navbar" aria-label="Main navigation">
                <div class="container">
                    <div class="nav-inner">
                        <a href="index.html" class="brand-badge" aria-label="Success Above Dreams, Home">
                            <span class="brand-avatar"><img src="images/sad.jpg" alt=""></span>
                            <span>
                                <strong class="brand-name">Emmanuel Drah</strong>
                                <small class="brand-tagline">Success Above Dreams</small>
                            </span>
                        </a>
                        <div class="nav-links">
                            <a href="index.html">Home</a>
                            <a href="projects.html">Projects</a>
                            <a href="services.html">Services</a>
                            <a href="about.html">My Story</a>
                            <a href="gallery.html">Gallery</a>
                            <a href="contact.html" class="btn-nav-talk">Let's Talk</a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- ── Bottom Dock: mobile only ── -->
            <nav id="bottom-navbar" aria-label="Mobile navigation">
                <div class="bottom-nav-shell">
                    <div class="bottom-nav-links">
                        <a href="index.html" class="bottom-nav-link">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9h13v-9"/><path d="M9.5 19v-5h5v5"/></svg></span>
                            <span>Home</span>
                        </a>
                        <a href="projects.html" class="bottom-nav-link">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17M8.5 4v5"/></svg></span>
                            <span>Projects</span>
                        </a>
                        <a href="services.html" class="bottom-nav-link">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14"/><circle cx="9" cy="7" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="11" cy="17" r="1.5"/></svg></span>
                            <span>Services</span>
                        </a>
                        <a href="about.html" class="bottom-nav-link">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6"/></svg></span>
                            <span>My Story</span>
                        </a>
                        <a href="gallery.html" class="bottom-nav-link">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="4" width="17" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5.5 17 4.2-4.2 3.1 3 2.2-2.2 3.5 3.4"/></svg></span>
                            <span>Gallery</span>
                        </a>
                        <a href="contact.html" class="bottom-nav-link bottom-nav-contact">
                            <span class="bottom-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5.5h16v11H9l-5 3v-14Z"/><path d="M8 10h8M8 13h5"/></svg></span>
                            <span>Let's Talk</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;

        document.querySelector('main')?.setAttribute('id', 'main-content');
        this.initNav(currentPage);
        this.initScrollEffect();
    }

    initNav(currentPage) {
        const sectionPage = {
            'case-studies': 'projects',
            'the-brand':    'about',
            resume:         'about',
            certifications: 'about'
        }[currentPage] || currentPage;

        // Desktop top nav active state
        this.querySelectorAll('.nav-links > a').forEach(link => {
            if (getPageSlug(link.getAttribute('href')) === sectionPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });

        // Mobile bottom dock active state
        this.querySelectorAll('.bottom-nav-link').forEach(link => {
            if (getPageSlug(link.getAttribute('href')) === sectionPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    initScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

class PortfolioFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-kicker">
                        <div>
                            <span>Have something in mind?</span>
                            <h2>Tell me what you need built.</h2>
                        </div>
                        <a href="contact.html" class="btn-warm-primary">Start a conversation &rarr;</a>
                    </div>

                    <div class="footer-content-clean">
                        <div class="footer-bio-col">
                            <div class="footer-brand-row">
                                <img src="images/sad.jpg" alt="Success Above Dreams logo">
                                <div class="footer-bio-name">Emmanuel Drah</div>
                            </div>
                        </div>

                        <div class="footer-nav-col">
                            <h5>Work</h5>
                            <ul>
                                <li><a href="projects.html">Projects</a></li>
                                <li><a href="case-studies.html">Project Stories</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="gallery.html">Gallery</a></li>
                            </ul>
                        </div>

                        <div class="footer-nav-col">
                            <h5>About</h5>
                            <ul>
                                <li><a href="about.html">My Story</a></li>
                                <li><a href="the-brand.html">The Brand</a></li>
                                <li><a href="resume.html">R&eacute;sum&eacute;</a></li>
                                <li><a href="certifications.html">Awards</a></li>
                            </ul>
                        </div>

                        <div class="footer-nav-col">
                            <h5>Contact</h5>
                            <ul>
                                <li><a href="contact.html">Send a Message</a></li>
                                <li><a href="https://wa.me/233543671806" target="_blank" rel="noopener noreferrer">WhatsApp &nearr;</a></li>
                                <li><a href="mailto:emmanueldrah10@gmail.com">Email</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="footer-bottom-clean">
                        <span>&copy; ${new Date().getFullYear()} Emmanuel Drah</span>
                        <span>Built under Success Above Dreams</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
