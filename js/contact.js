document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('form-message');
    const submitBtn = document.getElementById('submitBtn');
    if (!form || !status || !submitBtn) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const TYPES = ['hello', 'idea', 'project', 'work', 'other'];

    const fieldOf = (input) => input.closest('.field');
    const setFieldError = (input, message) => {
        const field = fieldOf(input);
        if (!field) return;
        const err = field.querySelector('.field-error');
        field.classList.toggle('invalid', Boolean(message));
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (err) err.textContent = message || '';
    };

    const showStatus = (message, kind) => {
        status.textContent = message;
        status.className = 'form-status ' + kind;
    };
    const clearStatus = () => {
        status.textContent = '';
        status.className = 'form-status';
    };

    const validate = () => {
        const name = form.elements.name;
        const email = form.elements.email;
        const type = form.elements.type;
        const message = form.elements.message;
        let firstBad = null;

        const check = (input, ok, msg) => {
            setFieldError(input, ok ? '' : msg);
            if (!ok && !firstBad) firstBad = input;
        };

        check(name, name.value.trim().length > 0, 'Please tell me your name.');
        check(email, EMAIL_RE.test(email.value.trim()), 'That email address does not look right. Check it and try again.');
        check(type, TYPES.includes(type.value), 'Choose what your message is about.');
        check(message, message.value.trim().length > 0, 'Please write a message.');

        if (firstBad) {
            showStatus('Please check the highlighted fields.', 'err');
            firstBad.focus();
        }
        return !firstBad;
    };

    ['name', 'email', 'type', 'message'].forEach(n => {
        const input = form.elements[n];
        input?.addEventListener('input', () => setFieldError(input, ''));
        input?.addEventListener('change', () => setFieldError(input, ''));
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearStatus();
        if (!validate()) return;

        const payload = {
            name: form.elements.name.value.trim(),
            email: form.elements.email.value.trim(),
            type: form.elements.type.value,
            message: form.elements.message.value.trim(),
            'bot-field': form.elements['bot-field'].value
        };

        submitBtn.disabled = true;
        const originalLabel = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json().catch(() => ({}));

            if (response.ok && data.ok === true) {
                form.reset();
                showStatus('Message sent. I read every message myself and usually reply within 24 hours. If it is urgent, WhatsApp is fastest.', 'ok');
                window.trackEvent?.('form-submit', { status: 'ok' });
            } else {
                showStatus(data.error || 'There was a problem sending your message. Please try again, or use WhatsApp or email instead.', 'err');
                window.trackEvent?.('form-submit', { status: 'error', code: response.status });
            }
        } catch (error) {
            showStatus('There was a problem sending your message. Please try again, or use WhatsApp or email instead.', 'err');
            window.trackEvent?.('form-submit', { status: 'network-error' });
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
        }
    });
});