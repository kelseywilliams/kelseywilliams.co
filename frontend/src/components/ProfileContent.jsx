// ProfileContent.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function ProfileContent() {
    const navigate = useNavigate();
    const addToast = useSessionStore((s) => s.addToast);
    const setUser = useSessionStore((s) => s.setUser);
    const setLoggedIn = useSessionStore((s) => s.setLoggedIn);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        axios.get(`${PROTOCOL}://${API_DOMAIN}/auth/user`, { withCredentials: true })
            .then((res) => setProfile(res.data))
            .catch((err) => addToast(err.response?.data?.message ?? err.message, 1))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async () => {
        if (!window.confirm('Delete your account? This cannot be undone.')) return;

        setDeleting(true);
        try {
            await axios.delete(`${PROTOCOL}://${API_DOMAIN}/auth/delete`, { withCredentials: true });
            setUser(null);
            setLoggedIn(false);
            addToast('Account deleted.', 0);
            navigate('/');
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (!profile) return <p>Unable to load profile.</p>;

    return (
        <div className="card bg-base-200 p-6 w-full max-w-md flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Account Info</h1>
            <p><span className="font-medium">Username:</span> {profile.username}</p>
            <p><span className="font-medium">Email:</span> {profile.email}</p>
            <p><span className="font-medium">ID:</span> {profile.id}</p>
            <button className="btn btn-error btn-sm mt-2" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete account'}
            </button>
        </div>
    );
}