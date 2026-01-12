import React, { useState } from 'react';
import { Radio, Video, Link as LinkIcon, Plus, Trash2, Save, ExternalLink } from 'lucide-react';

const LiveSettings = ({ content, updateContent }) => {
    const [settings, setSettings] = useState(content.liveSettings || {
        isLive: false,
        title: 'Community Coding Session: Q&A + Live Debugging',
        videoUrl: '',
        zoomLink: '',
        youtubeLink: '',
        customLinks: []
    });

    const [newLinkLabel, setNewLinkLabel] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    const saveSettings = () => {
        updateContent({ ...content, liveSettings: settings });
        alert('Live settings saved successfully!');
    };

    const toggleLive = () => {
        const updated = { ...settings, isLive: !settings.isLive };
        setSettings(updated);
        updateContent({ ...content, liveSettings: updated });
    };

    const addCustomLink = () => {
        if (!newLinkLabel || !newLinkUrl) {
            alert('Please provide both label and URL!');
            return;
        }

        setSettings({
            ...settings,
            customLinks: [...(settings.customLinks || []), { label: newLinkLabel, url: newLinkUrl }]
        });
        setNewLinkLabel('');
        setNewLinkUrl('');
    };

    const removeCustomLink = (index) => {
        setSettings({
            ...settings,
            customLinks: settings.customLinks.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-8">
            {/* Live Status */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Radio size={24} className="text-red-400" />
                    Live Stream Status
                </h3>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLive}
                        className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${settings.isLive
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                    >
                        <span className={`w-3 h-3 rounded-full ${settings.isLive ? 'bg-white animate-pulse' : 'bg-neutral-600'}`} />
                        {settings.isLive ? 'LIVE NOW' : 'Offline'}
                    </button>
                    <p className="text-neutral-500 text-sm">
                        {settings.isLive ? 'Stream is visible to visitors' : 'Stream is hidden from visitors'}
                    </p>
                </div>
            </div>

            {/* Stream Details */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Video size={24} className="text-indigo-400" />
                    Stream Details
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                            Stream Title
                        </label>
                        <input
                            type="text"
                            value={settings.title}
                            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                            className="admin-input"
                            placeholder="e.g., Community Coding Session: Q&A"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                            Video Embed URL
                        </label>
                        <input
                            type="text"
                            value={settings.videoUrl}
                            onChange={(e) => setSettings({ ...settings, videoUrl: e.target.value })}
                            className="admin-input"
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                        />
                        <p className="text-xs text-neutral-600 mt-2">
                            Use YouTube embed URL format for best results
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <LinkIcon size={24} className="text-green-400" />
                    Quick Access Links
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                            Zoom Meeting Link
                        </label>
                        <input
                            type="text"
                            value={settings.zoomLink}
                            onChange={(e) => setSettings({ ...settings, zoomLink: e.target.value })}
                            className="admin-input"
                            placeholder="https://zoom.us/j/your-meeting-id"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-widest">
                            YouTube Live Link
                        </label>
                        <input
                            type="text"
                            value={settings.youtubeLink}
                            onChange={(e) => setSettings({ ...settings, youtubeLink: e.target.value })}
                            className="admin-input"
                            placeholder="https://youtube.com/live/your-stream"
                        />
                    </div>
                </div>
            </div>

            {/* Custom Links */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <ExternalLink size={24} className="text-purple-400" />
                    Custom Links
                </h3>

                {/* Add New Link */}
                <div className="bg-black/40 rounded-2xl p-6 border border-neutral-800 mb-6">
                    <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Add New Link</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={newLinkLabel}
                            onChange={(e) => setNewLinkLabel(e.target.value)}
                            className="admin-input"
                            placeholder="Link Label (e.g., Discord)"
                        />
                        <input
                            type="text"
                            value={newLinkUrl}
                            onChange={(e) => setNewLinkUrl(e.target.value)}
                            className="admin-input"
                            placeholder="https://..."
                        />
                    </div>
                    <button
                        onClick={addCustomLink}
                        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-500 transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Link
                    </button>
                </div>

                {/* Existing Links */}
                {settings.customLinks && settings.customLinks.length > 0 ? (
                    <div className="space-y-3">
                        {settings.customLinks.map((link, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-neutral-800 group hover:border-purple-500/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                                        <ExternalLink size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{link.label}</p>
                                        <p className="text-xs text-neutral-500 truncate max-w-md">{link.url}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeCustomLink(idx)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-600 text-sm text-center py-8">No custom links added yet</p>
                )}
            </div>

            {/* Save Button */}
            <button
                onClick={saveSettings}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
            >
                <Save size={20} />
                Save Live Settings
            </button>
        </div>
    );
};

export default LiveSettings;
