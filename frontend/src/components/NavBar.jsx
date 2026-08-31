import ThemeToggle from './ThemeToggle.jsx'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router";
import { useSessionStore } from '../store/useSessionStore.js';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import axios from 'axios';

export default function Navbar({ page }) {
    let navigate = useNavigate();
    const user = useSessionStore((s) => s.user);
    const loggedIn = useSessionStore((s) => s.loggedIn)
    const setUser = useSessionStore((s) => s.setUser);
    const setLoggedIn = useSessionStore((s) => s.setLoggedIn);
    const addToast = useSessionStore((s) => s.addToast);

    // Logout 
    const logout = async () => {
        axios.post(`${PROTOCOL}://${API_DOMAIN}/auth/logout`, {}, { withCredentials: true })
            .catch((err) => {
                if (err.response?.status === 401) {
                    addToast(`Session has expired.  Please login.`, 3)
                    console.error(`Session expired.  Login.`);
                }
                else console.error(`Unexpected server error: ${err.response?.data?.message ?? err.message}`)
            })
            .finally(() => {
                setUser(null);
                setLoggedIn(false);
                addToast(`Logged out successfully.`, 0);
                navigate("/");
            })
    }

    return (
        <header className="bg-neutral text-neutral-content px-4 py-3">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0 flex-1">
                    <div className="text-xl">
                        <Link to="/" className="font-medium">kelseywilliams.co/</Link>
                        <span>{page}</span>
                    </div>
                    <ThemeToggle />
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
                    {loggedIn ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="bg-base-200 text-base-content text-sm rounded-full px-3 py-1 cursor-pointer">{user}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-base-content rounded-box z-10 w-40 p-2 shadow-sm">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><button onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary btn-sm w-full sm:w-auto">Login</Link>
                            <Link to="/register" className="btn btn-secondary btn-sm w-full sm:w-auto">Signup</Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    )
}