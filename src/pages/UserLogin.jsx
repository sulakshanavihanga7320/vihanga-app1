import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
        if (isUserAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        // Only allow the admin account
        if (email === 'admin' && password === 'password123') {
            const existing = (() => {
                try {
                    const stored = localStorage.getItem('userProfile');
                    return stored ? JSON.parse(stored) : {};
                } catch {
                    return {};
                }
            })();

            const profile = {
                email,
                displayName: existing.displayName || 'Admin',
                bio: existing.bio || '',
                avatarUrl: existing.avatarUrl || '',
                password: 'password123',
                createdAt: existing.createdAt || new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
            };
            localStorage.setItem('isUserAuthenticated', 'true');
            localStorage.setItem('userProfile', JSON.stringify(profile));
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
            <div className="w-full max-w-xl bg-neutral-900/80 border border-neutral-800/80 rounded-3xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
                            <User size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Admin sign in</h1>
                            <p className="text-neutral-500 text-xs mt-1">Use <span className="font-mono text-neutral-300">admin / password123</span> to enter.</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Secure Portal
                        </span>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-2xl text-xs text-center font-medium flex items-center justify-center gap-2">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-[0.2em]">Email</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-colors text-sm placeholder:text-neutral-600"
                                placeholder="admin"
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
