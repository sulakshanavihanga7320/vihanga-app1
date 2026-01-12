import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
        if (isUserAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Validation
        if (!email || !password || !confirmPassword || !displayName) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (displayName.length < 2) {
            setError('Display name must be at least 2 characters');
            setIsLoading(false);
            return;
        }

        try {
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if email already exists
            if (users.some(u => u.email === email)) {
                setError('This email is already registered. Please login instead.');
                setIsLoading(false);
                return;
            }

            // Create new user
            const newUser = {
                email,
                password,
                displayName,
                bio: '',
                avatarUrl: '',
                createdAt: new Date().toISOString(),
            };

            // Add user to list
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Log user in
            const profile = {
                email: newUser.email,
                displayName: newUser.displayName,
                bio: newUser.bio,
                avatarUrl: newUser.avatarUrl,
                createdAt: newUser.createdAt,
                lastLoginAt: new Date().toISOString(),
            };

            localStorage.setItem('isUserAuthenticated', 'true');
            localStorage.setItem('userProfile', JSON.stringify(profile));
            localStorage.setItem('currentUserEmail', email);

            setSuccess('Account created successfully! Redirecting...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
            <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800/80 rounded-3xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/40">
                        <Mail size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
                        <p className="text-neutral-500 text-xs mt-1">Join our community today</p>
                    </div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-2xl text-xs font-medium flex items-start gap-2">
                            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/10 border border-green-500/40 text-green-400 px-4 py-3 rounded-2xl text-xs font-medium flex items-start gap-2">
                            <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-black/40 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors text-sm placeholder:text-neutral-600"
                            placeholder="John Doe"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="you@example.com"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="At least 6 characters"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="Repeat your password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-700 disabled:to-pink-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
