// AdminDash.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function AdminDash() {
    const navigate = useNavigate();
    const addToast = useSessionStore((s) => s.addToast);

    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [projectSubmitting, setProjectSubmitting] = useState(false);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [blogSubmitting, setBlogSubmitting] = useState(false);

    const [aboutContent, setAboutContent] = useState('');
    const [aboutSubmitting, setAboutSubmitting] = useState(false);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/auth/admin`, { withCredentials: true })
            .then(() => setAuthorized(true))
            .catch(() => {
                addToast('You do not have permission to view this page.', 1);
                navigate('/');
            })
            .finally(() => setChecking(false));

        // Pre-fill with the current live content so a push doesn't blindly overwrite it
        axios.get(`${PROTOCOL}://${API_DOMAIN}/resource/about`)
            .then((res) => setAboutContent(res.data.content))
            .catch(() => {});
    }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        setProjectSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/resource/projects`,
                { name: projectName.trim(), link: projectLink.trim() },
                { withCredentials: true }
            );
            addToast('Project added.', 0);
            setProjectName('');
            setProjectLink('');
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setProjectSubmitting(false);
        }
    };

    const handlePostBlog = async (e) => {
        e.preventDefault();
        setBlogSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/resource/blog`,
                {
                    title: title.trim(),
                    date,
                    author: author.trim(),
                    tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
                    link: link.trim(),
                    content: content.trim(),
                },
                { withCredentials: true }
            );
            addToast('Blog post created.', 0);
            setTitle('');
            setDate('');
            setAuthor('');
            setTags('');
            setLink('');
            setContent('');
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setBlogSubmitting(false);
        }
    };

    const handlePostAbout = async (e) => {
        e.preventDefault();
        setAboutSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/resource/about`,
                { content: aboutContent.trim() },
                { withCredentials: true }
            );
            addToast('About page updated.', 0);
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setAboutSubmitting(false);
        }
    };

    if (checking || !authorized) return null;

    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl">
            <form onSubmit={handleAddProject} className="card bg-base-200 p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Add project</h1>
                <div className="flex gap-4">
                    <input
                        placeholder="Project name"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="input w-full input-bordered flex-1"
                        required
                    />
                    <input
                        placeholder="Project link"
                        type="text"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="input w-full input-bordered flex-1"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={projectSubmitting}>
                    {projectSubmitting ? 'Adding...' : 'Add project'}
                </button>
            </form>

            <form onSubmit={handlePostBlog} className="card bg-base-200 p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Blog creator</h1>
                <input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input w-full input-bordered"
                    required
                />
                <div className="flex gap-4">
                    <input
                        placeholder="Author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="input w-full input-bordered flex-1"
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input w-full input-bordered flex-1"
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <input
                        placeholder="Tags (comma separated)"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="input w-full input-bordered flex-1"
                    />
                    <input
                        placeholder="Link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="input w-full input-bordered flex-1"
                        required
                    />
                </div>
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full h-48"
                    required
                />
                <button type="submit" className="btn btn-primary" disabled={blogSubmitting}>
                    {blogSubmitting ? 'Posting...' : 'Post blog'}
                </button>
            </form>

            <form onSubmit={handlePostAbout} className="card bg-base-200 p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">About page</h1>
                <textarea
                    placeholder="Content"
                    value={aboutContent}
                    onChange={(e) => setAboutContent(e.target.value)}
                    className="textarea textarea-bordered w-full h-48"
                    required
                />
                <button type="submit" className="btn btn-primary" disabled={aboutSubmitting}>
                    {aboutSubmitting ? 'Pushing...' : 'Push about page'}
                </button>
            </form>
        </div>
    );
}