import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, AlertCircle } from 'lucide-react';

const UserProfile = () => {
    const [profile, setProfile] = useState({ email: '', displayName: '', bio: '', avatarUrl: '', password: '', createdAt: '', lastLoginAt: '' });
    const [saveStatus, setSaveStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isUserAuthenticated = localStorage.getItem('isUserAuthenticated') === 'true';
        if (!isUserAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const stored = localStorage.getItem('userProfile');
            if (stored) {
                setProfile(JSON.parse(stored));
            } else {
                const email = localStorage.getItem('currentUserEmail');
                setProfile({ email: email || 'user@example.com', displayName: 'My Profile', bio: '', avatarUrl: '', password: '', createdAt: new Date().toISOString(), lastLoginAt: '' });
            }
        } catch {
            setProfile({ email: 'user@example.com', displayName: 'My Profile', bio: '', avatarUrl: '', password: '', createdAt: new Date().toISOString(), lastLoginAt: '' });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem('userProfile', JSON.stringify(profile));
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (err) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        
        // Limit file size to 5MB
        if (file.size > 5 * 1024 * 1024) {
            setSaveStatus('error-size');
            setTimeout(() => setSaveStatus(''), 3000);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setProfile((prev) => ({ ...prev, avatarUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const initialLetter = (profile.displayName || profile.email || 'A').charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
                    <p className="text-neutral-400">Update your profile information and photo</p>
                </div>

                <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-3xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                    {/* Profile Header */}
                    <div className="flex items-center gap-6 mb-12 pb-8 border-b border-neutral-800">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden border border-neutral-700 shadow-lg">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-white">
                                    {initialLetter}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{profile.displayName || 'User'}</h2>
                            <p className="text-neutral-400 text-sm mb-2">{profile.email}</p>
                            {profile.createdAt && (
                                <p className="text-neutral-500 text-xs">Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>

                    {/* Status Messages */}
                    {saveStatus === 'success' && (
                        <div className="mb-6 bg-green-500/10 border border-green-500/40 text-green-400 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2">
                            <Check size={18} />
                            Profile updated successfully!
                        </div>
                    )}
                    {saveStatus && saveStatus.startsWith('error') && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2">
                            <AlertCircle size={18} />
                            {saveStatus === 'error-size' ? 'Image must be less than 5MB' : 'Error saving profile. Please try again.'}
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-400 mb-2 tracking-[0.2em]">Display Name</label>
                            <input
                                type="text"
                                name="displayName"
                                value={profile.displayName}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-400 mb-2 tracking-[0.2em]">Email</label>
                            <input
                                type="email"
                                value={profile.email}
                                disabled
                                className="w-full bg-black/40 border border-neutral-800 text-neutral-500 px-4 py-3 rounded-xl cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-400 mb-2 tracking-[0.2em]">Profile Photo</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="block w-full text-sm text-neutral-400 cursor-pointer 
                                        file:mr-4 file:mb-2 file:px-4 file:py-2 file:rounded-lg 
                                        file:border-0 file:text-xs file:font-semibold 
                                        file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 
                                        file:text-white file:cursor-pointer
                                        hover:file:from-purple-500 hover:file:to-pink-500
                                        transition-all"
                                />
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-2 flex items-center gap-1">
                                <Upload size={14} /> Upload a square image for best results (Max 5MB)
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-400 mb-2 tracking-[0.2em]">Bio</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-black/40 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 mt-8"
                        >
                            <Check size={18} />
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
