/* Vercel serverless handler for the contact form.
   Forwards submissions to CONTACT_FORWARD_URL (a Formspree endpoint like
   https://formspree.io/f/xxxxxxx). Set it in the Vercel project's environment
   variables. Without it the handler returns 503 with a direct-contact fallback,
   so a visitor never sees a false success. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPES = ['hello', 'idea', 'project', 'work', 'other'];
const TYPE_LABELS = {
    hello: 'Just saying hello',
    idea: 'An idea or collaboration',
    project: 'A project',
    work: 'Work or opportunity',
    other: 'Something else'
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

const rateLimited = (ip) => {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
    if (recent.length >= MAX_PER_WINDOW) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.clear();
    return false;
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed.' });
        return;
    }

    const body = req.body || {};
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const type = String(body.type || '').trim();
    const message = String(body.message || '').trim();

    if (body['bot-field']) {
        res.status(400).json({ error: 'The message could not be sent. Please use WhatsApp or email instead.' });
        return;
    }

    if (!name || !email || !message) {
        res.status(400).json({ error: 'Please fill out your name, email, and message.' });
        return;
    }

    if (!EMAIL_RE.test(email)) {
        res.status(400).json({ error: 'That email address does not look right. Check it and try again.' });
        return;
    }

    if (!TYPES.includes(type)) {
        res.status(400).json({ error: 'Choose what your message is about.' });
        return;
    }

    if (message.length > 5000 || name.length > 200) {
        res.status(400).json({ error: 'That message is too long. Please shorten it and try again.' });
        return;
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
    if (rateLimited(ip)) {
        res.status(429).json({ error: 'Too many messages from this connection in a short time. Please wait a few minutes, or use WhatsApp or email.' });
        return;
    }

    const forwardUrl = process.env.CONTACT_FORWARD_URL;
    if (!forwardUrl) {
        res.status(503).json({
            error: 'The message form is not connected yet. Please reach me on WhatsApp (+233 543 671 806) or email emmanueldrah10@gmail.com.'
        });
        return;
    }

    try {
        const upstream = await fetch(forwardUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                name,
                email,
                subject: `Personal website message: ${TYPE_LABELS[type]}`,
                message: `Topic: ${TYPE_LABELS[type]}\n\n${message}`
            })
        });

        if (!upstream.ok) {
            throw new Error(`Upstream responded ${upstream.status}`);
        }

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Contact forward failed:', error);
        res.status(502).json({
            error: 'There was a problem sending your message. Please try again, or use WhatsApp or email instead.'
        });
    }
};