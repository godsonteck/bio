/*
   Emmanuel Drah Portfolio - Shared Web Components
   Designed proudly by Kofi Mensah to offer custom, hand-crafted aesthetic and zero template feel.
*/

class PortfolioNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="kente-bar"></div>
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
                    <a href="contact.html" class="btn btn-primary btn-nav-hire">Hire Him</a>
                    <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="nav-menu">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </nav>
        `;

        this.initNav();
    }

    initNav() {
        const navbar = this.querySelector('#navbar');
        const mobileToggle = this.querySelector('#mobile-toggle');
        const navMenu = this.querySelector('#nav-menu');
        const navLinks = this.querySelectorAll('.nav-links a');

        // Mobile Menu Drawer Toggling
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile drawer when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Background transition on Scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Track active page route
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
    }
}

class PortfolioFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="footer-logo">
                        <img src="images/sad.jpg" alt="Success Above Dreams Logo">
                        <div class="brand-info">
                            <span class="brand-name" style="font-size: 1.1rem; color: #FFF;">Emmanuel Drah</span>
                            <span class="brand-tag" style="font-size: 0.6rem; color: var(--ghgold-light);">Success Above Dreams</span>
                        </div>
                    </div>
                    <p style="text-align: center; font-size: 0.8rem; color: var(--text-muted);">&copy; ${new Date().getFullYear()} Emmanuel Drah. Designed with pride in Ghana.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
