import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN, DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function LoginForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const setUser = useSessionStore((s) => s.setUser);
    const setLoggedIn = useSessionStore((s) => s.setLoggedIn);
    const addToast = useSessionStore((s) => s.addToast);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Process redirect
    // Set redirect destination and the internal/external flag.  This changes
    // whether the React router is used or if we use the browser to relocate
    let dest = "/";
    let internal = true;
    // Whitelisted redirects
    const routes = ["/", "/login", "/register", "/forgot", "/contact", "/about", "/admin"];
    const external = ["/chat"];
    const subdomains = ["", "api"];

    // Get redirect param.  Should be passed as entired url for security purposes.
    const redirect = searchParams.get("redirect");
    if (redirect) {
        const url = new URL(redirect);
        let subdomain;
        // Check that redirect hostname ends in the sites domain
        if (url.hostname === DOMAIN || url.hostname.endsWith(`.${DOMAIN}`)) {
            if (url.hostname === DOMAIN) subdomain = "";
            else subdomain = url.hostname.slice(0, url.hostname.length - DOMAIN.length - 1);
            // If the subdomain is allowed, set the destination to the pathname
            if (subdomains.includes(subdomain)) {
                // Determine if this will use window.location or React router
                if (routes.includes(url.pathname)) {
                    dest = url.pathname;
                    internal = true;
                } else if (external.includes(url.pathname)) {
                    dest = url.pathname;
                    internal = false;
                }
            }
        } // TODO send to reports to the api for logging. If someone is trying to
        // redirect to another domain, that must logged.
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            addToast(`Username or email and password is required.`, 3);
            return;
        }
        const payload = { 'username': identifier.trim(), 'password': password };

        setSubmitting(true);

        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/auth/login`,
                payload,
                { withCredentials: true }
            );

            const { data } = await axios.get(
                `${PROTOCOL}://${API_DOMAIN}/auth/user`,
                { withCredentials: true }
            )

            setUser(data.username);
            setLoggedIn(true);
            addToast(`Successfully logged in.`, 0);
            if (internal) {
                navigate(dest);
            } else {
                window.location.href = dest;
            }

        } catch(e) {
            addToast(`Invalid username or password. ${e}`, 1)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
            <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                    <input
                        name="username"
                        placeholder="Enter email or username..."
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="input w-full input-bordered"
                        autoComplete='username'
                        required
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <input
                        name="password"
                        placeholder="Enter password..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full input-bordered"
                        autoComplete='current-password'
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="flex gap-1">
                <Link to="/forgot" className="link link-primary">Forgot password?</Link>
                <span>or</span>
                <Link to="/register" className="link link-secondary">signup.</Link>
            </div>
        </div>
    )
}