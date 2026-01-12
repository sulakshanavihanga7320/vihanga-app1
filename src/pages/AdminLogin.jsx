import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validate inputs
        if (!email || !password) {
            setError('Please enter both email and password');
            setIsLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Mock Credentials - Change these to your admin credentials
        const ADMIN_EMAIL = 'admin@example.com';
        const ADMIN_PASSWORD = 'password123';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('adminEmail', email);
            navigate('/admin');
        } else {
            setError('Invalid email or password');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-900/20">
                        <Lock size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Portal</h1>
                    <p className="text-neutral-400 mt-2">Restricted access area - Email & Password required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="admin@example.com"
                                disabled={isLoading}
                            />
                        </div>
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
                                placeholder="Enter password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-6 p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-400">
                    <p className="font-semibold text-neutral-300 mb-2">Demo Credentials:</p>
                    <p>Email: <span className="text-neutral-200">admin@example.com</span></p>
                    <p>Password: <span className="text-neutral-200">password123</span></p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
