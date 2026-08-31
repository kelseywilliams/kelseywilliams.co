import { useEffect, useState } from 'react';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function AboutContent() {
    const addToast = useSessionStore((s) => s.addToast);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/resource/about`)
            .then((res) => setContent(res.data.content))
            .catch((err) => addToast(err.response?.data?.message ?? err.message, 1))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="card bg-base-200 p-6 w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">About</h1>
            <p className="whitespace-pre-wrap">{content}</p>
        </div>
    );
}
