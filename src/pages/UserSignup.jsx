import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, UserPlus, ArrowRight } from 'lucide-react';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
        if (isUserAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Simple demo signup – we just mark the user as authenticated
        localStorage.setItem('isUserAuthenticated', 'true');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-900/20">
                        <UserPlus size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-neutral-400 mt-2 text-sm">Sign up to access the full experience.</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Create a password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Repeat your password"
                            />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 mt-4">
                        Sign up <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-500">
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
