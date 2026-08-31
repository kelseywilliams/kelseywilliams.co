// ForgotForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { PROTOCOL, API_DOMAIN } from '../config/index.js';
import { useSessionStore } from '../store/useSessionStore.js';

export default function ForgotForm() {
    const navigate = useNavigate();
    const addToast = useSessionStore((s) => s.addToast);

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/auth/send-recovery`,
                { email: email.trim() },
                { withCredentials: true }
            );
            addToast('Recovery code sent.', 0);
            setStep(2);
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (!code.trim()) {
            addToast('Enter the code sent to your email.', 1);
            return;
        }
        setStep(3);
    };

    const handleReset = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            addToast('Password is required.', 1);
            return;
        }
        if (password !== confirmPassword) {
            addToast('Passwords do not match.', 1);
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(
                `${PROTOCOL}://${API_DOMAIN}/auth/forgot`,
                { email: email.trim(), code: code.trim(), password },
                { withCredentials: true }
            );

            addToast('Password reset. Please log in.', 0);
            navigate('/login');
        } catch (err) {
            addToast(err.response?.data?.message ?? err.message, 1);
        } finally {
            setSubmitting(false);
        }
    };

    if (step === 1) {
        return (
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
                <form onSubmit={handleSendCode} className="card p-6 w-full max-w-md flex flex-col gap-4">
                    <label className="flex flex-col gap-1">
                        <input
                            name="email"
                            placeholder="Enter your account email..."
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input w-full input-bordered"
                            autoComplete="email"
                            required
                        />
                    </label>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send code'}
                    </button>
                </form>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col items-center gap-2 w-full max-w-md">
                <form onSubmit={handleCodeSubmit} className="card p-6 w-full max-w-md flex flex-col gap-4">
                    <label className="flex flex-col gap-1">
                        <input
                            name="code"
                            placeholder="Enter recovery code..."
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="input w-full input-bordered"
                            required
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">Next</button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-md">
            <form onSubmit={handleReset} className="card p-6 w-full max-w-md flex flex-col gap-4">
                <label className="flex flex-col gap-1">
                    <input
                        name="password"
                        placeholder="New password..."
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full input-bordered"
                        autoComplete="new-password"
                        required
                    />
                </label>
                <label className="flex flex-col gap-1">
                    <input
                        name="confirmPassword"
                        placeholder="Confirm new password..."
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input w-full input-bordered"
                        autoComplete="new-password"
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Resetting...' : 'Reset password'}
                </button>
            </form>
        </div>
    );
}