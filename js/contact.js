document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submitBtn');

    if (!contactForm || !formMessage || !submitBtn) return;

    // Helper to show message
    const showMessage = (msg, isError = false) => {
        formMessage.style.display = 'block';
        formMessage.textContent = msg;
        formMessage.style.backgroundColor = isError ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)';
        formMessage.style.color = isError ? '#ff3b30' : '#34c759';
        formMessage.style.border = \`1px solid \${isError ? '#ff3b30' : '#34c759'}\`;
    };

    // Helper to set loading state
    const setLoading = (isLoading) => {
        if (!submitBtn) return;

        submitBtn.disabled = isLoading;
        submitBtn.style.opacity = isLoading ? '0.7' : '1';
    };

    // Basic email validation regex
    const validateEmail = (email) => {
        const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        formMessage.style.display = 'none';

        // Get form values
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        const botField = formData.get('bot-field');

        // Validation
        if (!name || !email || !message) {
            showMessage('Please fill out all required fields.', true);
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', true);
            return;
        }

        // Honeypot check (bot prevention)
        if (botField) {
            // Silently "succeed" to fool the bot, but don't actually send
            contactForm.reset();
            showMessage('Message sent successfully! We will get back to you soon.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                contactForm.reset();
                showMessage('Message sent successfully! I will get back to you soon.');
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            showMessage('Oops! There was a problem submitting your form. Please try again later.', true);
            console.error('Form submission error:', error);
        } finally {
            setLoading(false);
        }
    });
});
