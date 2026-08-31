import { useState } from 'react';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function ContactForm() {
    const addToast = useSessionStore((s) => s.addToast);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            addToast('Message is required.', 1);
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/resource/contact`,
                { message: message.trim() },
                { withCredentials: true }
            );
            addToast('Message sent.', 0);
            setMessage('');
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card bg-base-200 p-6 w-full max-w-md flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Contact</h1>
            <textarea
                placeholder="Is my site buggy? Or something else? Let me know here."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea textarea-bordered w-full h-32"
                required
            />
            <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
}
