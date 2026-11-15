/* Shared personal-site navigation and footer for Emmanuel Drah. */
const getPageSlug = (url = window.location.pathname) => {
    const clean = url.split('#')[0].split('?')[0].split('/').pop() || '';
    return clean.replace(/\.html$/, '') || 'index';
};

const WA_LINK = 'https://wa.me/233543671806?text=Hi%20Emmanuel%2C%20I%20found%20your%20personal%20site%20and%20would%20like%20to%20say%20hello.';

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        const currentPage = getPageSlug();
        document.body.dataset.page = currentPage;
        this.innerHTML = `
            <a class="skip-link" href="#main-content">Skip to content</a>
            <header class="topbar" id="topbar">
                <div class="container topbar-inner">
                    <a href="/" class="brand" aria-label="Emmanuel Drah home">
                        <span class="brand-mark" aria-hidden="true"></span>
                        <span>
                            <span class="brand-name">Emmanuel Drah</span>
                            <span class="brand-tag">Developer / builder / Ho, Ghana</span>
                        </span>
                    </a>
                    <nav class="nav-links" aria-label="Main">
                        <a href="/" data-nav="index">Home</a>
                        <a href="/about" data-nav="about">My story</a>
                        <a href="/projects" data-nav="projects">Work</a>
                        <a href="/services" data-nav="services">Now</a>
                        <a href="/proof" data-nav="proof">Archive</a>
                        <a href="/contact" class="btn btn-sm" data-nav="contact" data-track="say-hello" data-track-label="header">Say hello</a>
                    </nav>
                    <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
                        <span></span><span></span>
                    </button>
                </div>
            </header>
            <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true">
                <div class="drawer-top">
                    <span class="brand-name">Emmanuel Drah</span>
                    <button class="drawer-close" id="drawer-close" aria-label="Close menu">&times;</button>
                </div>
                <nav aria-label="Mobile">
                    <a href="/" data-nav="index">Home</a>
                    <a href="/about" data-nav="about">My story</a>
                    <a href="/projects" data-nav="projects">Work</a>
                    <a href="/services" data-nav="services">Now</a>
                    <a href="/proof" data-nav="proof">Archive</a>
                    <a href="/contact" data-nav="contact">Contact</a>
                </nav>
                <div class="drawer-sub">
                    <a href="/resume" data-nav="resume">R&eacute;sum&eacute;</a>
                    <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-track-label="drawer">WhatsApp</a>
                    <a href="mailto:emmanueldrah10@gmail.com" data-track="email" data-track-label="drawer">Email</a>
                </div>
                <p class="drawer-note">Ho, Ghana / I read every message myself.</p>
            </div>
        `;
        document.querySelector('main')?.setAttribute('id', 'main-content');
        this.setActive(currentPage);
        const topbar = document.getElementById('topbar');
        const onScroll = () => topbar?.classList.toggle('scrolled', window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    setActive(currentPage) {
        const alias = {
            'case-studies': 'projects',
            'the-brand': 'about',
            resume: 'about',
            gallery: 'proof',
            certifications: 'proof'
        }[currentPage] || currentPage;
        this.querySelectorAll('[data-nav]').forEach(link => {
            if (link.dataset.nav === currentPage || link.dataset.nav === alias) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

class PortfolioFooter extends HTMLElement {
    connectedCallback() {
        const cta = document.body.dataset.page === 'index' ? '' : `
            <section class="cta">
                <div class="container">
                    <div class="cta-panel">
                        <div class="cta-grid">
                            <div>
                                <p class="kicker">A personal note</p>
                                <h2>Have an idea, a question, or a <em>good link?</em></h2>
                            </div>
                            <div class="cta-actions">
                                <a href="/contact" class="btn" data-track="say-hello" data-track-label="footer">Say hello</a>
                                <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="btn-wa" data-track="whatsapp" data-track-label="footer">WhatsApp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.innerHTML = cta + `
            <footer class="site-foot">
                <div class="container">
                    <div class="foot-grid">
                        <div>
                            <div class="foot-brand-row">
                                <span class="brand-mark" aria-hidden="true"></span>
                                <strong>Emmanuel Drah</strong>
                            </div>
                            <p class="foot-bio">A personal site about the work I make, the things I am learning, and the people and places shaping how I think.</p>
                        </div>
                        <div class="foot-col">
                            <h2>Around here</h2>
                            <ul>
                                <li><a href="/projects">Work</a></li>
                                <li><a href="/about">My story</a></li>
                                <li><a href="/proof">Archive</a></li>
                            </ul>
                        </div>
                        <div class="foot-col">
                            <h2>Read</h2>
                            <ul>
                                <li><a href="/services">What I&rsquo;m into</a></li>
                                <li><a href="/resume">R&eacute;sum&eacute;</a></li>
                                <li><a href="https://successabovedreams.vercel.app/" target="_blank" rel="noopener noreferrer">Success Above Dreams &nearr;</a></li>
                            </ul>
                        </div>
                        <div class="foot-col">
                            <h2>Say hello</h2>
                            <ul>
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" data-track="whatsapp" data-track-label="footer-link">WhatsApp &nearr;</a></li>
                                <li><a href="mailto:emmanueldrah10@gmail.com" data-track="email" data-track-label="footer-link">Email</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="foot-bottom">
                        <span>&copy; ${new Date().getFullYear()} Emmanuel Drah</span>
                        <span class="personal-line">Still learning. Still building.</span>
                        <span>Ho, Ghana</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
