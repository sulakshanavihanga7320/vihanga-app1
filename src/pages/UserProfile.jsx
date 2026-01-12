import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [profile, setProfile] = useState({ email: '', displayName: '', bio: '', avatarUrl: '', password: '', createdAt: '', lastLoginAt: '' });

    useEffect(() => {
        try {
            const stored = localStorage.getItem('userProfile');
            if (stored) {
                setProfile(JSON.parse(stored));
            } else {
                const email = 'admin';
                setProfile({ email, displayName: 'Admin', bio: '', avatarUrl: '', password: 'password123', createdAt: new Date().toISOString(), lastLoginAt: '' });
            }
        } catch {
            setProfile({ email: 'admin', displayName: 'Admin', bio: '', avatarUrl: '', password: 'password123', createdAt: new Date().toISOString(), lastLoginAt: '' });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const next = { ...profile };
        if (!next.password) {
            next.password = 'password123';
        }
        localStorage.setItem('userProfile', JSON.stringify(next));
        setProfile(next);
        alert('Profile updated');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setProfile((prev) => ({ ...prev, avatarUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const initialLetter = (profile.displayName || profile.email || 'A').charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center overflow-hidden border border-indigo-500/60 shadow-lg">
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold">
                                {initialLetter}
                            </span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Admin Profile</h1>
                        <p className="text-neutral-400 text-sm">{profile.email || 'admin'}</p>
                        {profile.lastLoginAt && (
                            <p className="text-neutral-500 text-xs mt-1">Last login: {new Date(profile.lastLoginAt).toLocaleString()}</p>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Email</label>
                            <input
                                type="text"
                                value={profile.email}
                                disabled
                                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-500 px-4 py-3 rounded-xl cursor-not-allowed text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Admin Password</label>
                            <input
                                type="text"
                                value={profile.password || 'password123'}
                                disabled
                                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-400 px-4 py-3 rounded-xl cursor-not-allowed text-sm font-mono"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Display Name</label>
                            <input
                                type="text"
                                name="displayName"
                                value={profile.displayName}
                                onChange={handleChange}
                                className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="Admin"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="block w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                            />
                            <p className="text-[10px] text-neutral-600 mt-1">Upload a square image for best results.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-neutral-500 mb-1.5">Bio</label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-neutral-950 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Write something about yourself..."
                        />
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/20 mt-2">
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
