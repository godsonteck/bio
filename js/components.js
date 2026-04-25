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
                    <a href="projects.html">Portfolio</a>
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

class CustomCursor extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="cursor-dot" data-cursor-dot></div>
            <div class="cursor-outline" data-cursor-outline></div>
        `;

        this.initCursor();
    }

    initCursor() {
        // Wait briefly for DOM to be fully ready if elements are added dynamically
        setTimeout(() => {
            const cursorDot = this.querySelector('[data-cursor-dot]');
            const cursorOutline = this.querySelector('[data-cursor-outline]');

            if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
                window.addEventListener('mousemove', function (e) {
                    const posX = e.clientX;
                    const posY = e.clientY;

                    cursorDot.style.left = \`\${posX}px\`;
                    cursorDot.style.top = \`\${posY}px\`;

                    cursorOutline.animate({
                        left: \`\${posX}px\`,
                        top: \`\${posY}px\`
                    }, { duration: 500, fill: "forwards" });
                });

                // Set up mutation observer to catch newly added elements (like projects loaded later)
                const observer = new MutationObserver(this.attachHoverEffects.bind(this, cursorOutline));
                observer.observe(document.body, { childList: true, subtree: true });
                this.attachHoverEffects(cursorOutline);
            }
        }, 100);
    }

    attachHoverEffects(cursorOutline) {
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-item');
        hoverElements.forEach(el => {
            // Remove old listeners to avoid duplicates if re-attaching
            const enterListener = () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'var(--accent-glow)';
            };
            const leaveListener = () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            };
            
            // Only add if not already added (using a data attribute flag)
            if (!el.dataset.cursorHoverAttached) {
                el.addEventListener('mouseenter', enterListener);
                el.addEventListener('mouseleave', leaveListener);
                el.dataset.cursorHoverAttached = "true";
            }
        });
    }
}

customElements.define('portfolio-nav', PortfolioNav);
customElements.define('portfolio-footer', PortfolioFooter);
customElements.define('custom-cursor', CustomCursor);
