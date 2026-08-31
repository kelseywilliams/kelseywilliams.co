import { useEffect, useState } from 'react';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import axios from 'axios';

export default function ShowBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/resource/blog_list`)
            .then((res) => setBlogs(res.data))
            .catch((err) => setError(err.response?.data?.message ?? err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading blog...</p>;
    if (error) return <p>Failed to load blog: {error}</p>;

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Blogs</h1>
            <div className="border-2 border-neutral rounded-box p-3 flex flex-col gap-2">
                {blogs.map(({ title, date, link }) => (
                    <div key={link} className="card bg-base-200 p-3">
                        <div className="flex items-center justify-between">
                            <a href={link} className="font-medium">
                                {title}
                            </a>
                            <p className="text-sm text-base-content/70">
                                {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}