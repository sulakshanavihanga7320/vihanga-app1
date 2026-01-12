import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!email || !password) {
            setError('Please enter both email and password');
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        // Check if user exists in localStorage
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                const profile = {
                    email: user.email,
                    displayName: user.displayName || email.split('@')[0],
                    bio: user.bio || '',
                    avatarUrl: user.avatarUrl || '',
                    createdAt: user.createdAt,
                    lastLoginAt: new Date().toISOString(),
                };
                
                localStorage.setItem('isUserAuthenticated', 'true');
                localStorage.setItem('userProfile', JSON.stringify(profile));
                localStorage.setItem('currentUserEmail', email);
                navigate('/');
            } else {
                setError('Invalid email or password');
                setIsLoading(false);
            }
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
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
                        <Mail size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Sign in</h1>
                        <p className="text-neutral-500 text-xs mt-1">Access your account with email & password</p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-2xl text-xs text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-colors text-sm placeholder:text-neutral-600"
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
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-indigo-700 disabled:to-purple-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'} <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserLogin;

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="password123"
                            />
                        </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 mt-4 text-xs uppercase tracking-[0.22em]">
                        <span>Login</span>
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
