import { useEffect, useState } from 'react';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import axios from 'axios';

export default function ShowBlogs() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/resource/projects`)
            .then((res) => setProjects(res.data))
            .catch((err) => setError(err.response?.data?.message ?? err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Projects</h1>
            <div className="border-2 border-accent rounded-box p-3 flex flex-col gap-2">
                {projects.map(({name, link}) => (
                    <a href={link} key={link} className="card bg-base-200 p-3">
                        {name}
                    </a>
                ))}
            </div>
        </div>
    )
}