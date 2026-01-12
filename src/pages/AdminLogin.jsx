import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Mock Credentials
        if (username === 'admin' && password === 'password123') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin');
        } else {
            setError('Invalid credentials');
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
                    <p className="text-neutral-400 mt-2">Restricted access area.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Enter username"
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
                            />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 mt-4">
                        Login <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
