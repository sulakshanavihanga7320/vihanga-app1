import React, { useState } from 'react';
import { Key, Lock, Unlock, Download, Eye, CheckCircle, XCircle, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const VideoAccess = () => {
    const { content, updateContent } = useSiteContent();
    const [accessCode, setAccessCode] = useState('');
    const [verifiedVideo, setVerifiedVideo] = useState(null);
    const [error, setError] = useState('');
    const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));

    const verifyCode = () => {
        setError('');
        setVerifiedVideo(null);

        const videos = content.videos || [];

        for (const video of videos) {
            const accessCodes = video.accessCodes || [];
            const codeData = accessCodes.find(ac => ac.code === accessCode.toUpperCase());

            if (codeData) {
                if (codeData.used) {
                    setError('This code has already been used!');
                    return;
                }

                // Mark code as used
                const updatedVideos = videos.map(v => {
                    if (v.id === video.id) {
                        return {
                            ...v,
                            views: (v.views || 0) + 1,
                            accessCodes: v.accessCodes.map(ac =>
                                ac.code === accessCode.toUpperCase()
                                    ? { ...ac, used: true, usedBy: sessionId, usedAt: new Date().toISOString() }
                                    : ac
                            )
                        };
                    }
                    return v;
                });

                updateContent({ ...content, videos: updatedVideos });
                setVerifiedVideo(video);
                return;
            }
        }

        setError('Invalid access code. Please check and try again.');
    };

    const downloadVideo = () => {
        if (verifiedVideo) {
            window.open(verifiedVideo.url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    {!verifiedVideo ? (
                        <motion.div
                            key="verify"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl"
                        >
                            <div className="text-center mb-12">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                                    <Key size={40} className="text-indigo-400" />
                                </div>
                                <h1 className="text-4xl font-black mb-4 tracking-tight">
                                    Secure <span className="text-indigo-500">Video Access</span>
                                </h1>
                                <p className="text-neutral-400 leading-relaxed">
                                    Enter your one-time access code to unlock your purchased video content.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-widest">
                                        Access Code
                                    </label>
                                    <input
                                        type="text"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                        placeholder="VID-XXXXXXXXX"
                                        className="w-full px-6 py-4 bg-black border border-neutral-800 rounded-2xl text-white text-center text-lg font-mono font-bold tracking-widest focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all uppercase"
                                        onKeyPress={(e) => e.key === 'Enter' && verifyCode()}
                                    />
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400"
                                    >
                                        <XCircle size={20} />
                                        <span className="text-sm font-bold">{error}</span>
                                    </motion.div>
                                )}

                                <button
                                    onClick={verifyCode}
                                    disabled={!accessCode}
                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 disabled:shadow-none"
                                >
                                    <Unlock size={20} />
                                    Verify & Unlock
                                </button>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5">
                                <p className="text-xs text-neutral-600 text-center leading-relaxed">
                                    🔒 Your access code is single-use only. Once verified, you'll have immediate access to download or view your video.
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl"
                        >
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                    className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-green-500/20"
                                >
                                    <CheckCircle size={40} className="text-green-400" />
                                </motion.div>
                                <h2 className="text-3xl font-black mb-4">Access Granted!</h2>
                                <p className="text-neutral-400">Your video is ready to view or download.</p>
                            </div>

                            <div className="bg-black/40 rounded-3xl p-8 mb-8 border border-neutral-800">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                                        <Video size={24} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{verifiedVideo.title}</h3>
                                        <p className="text-xs text-neutral-500">Unlocked with code: {accessCode}</p>
                                    </div>
                                </div>

                                <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 mb-6">
                                    {(() => {
                                        const url = verifiedVideo.url;
                                        if (url.includes('youtube.com') || url.includes('youtu.be')) {
                                            let videoId = '';
                                            if (url.includes('youtube.com/watch')) {
                                                videoId = new URL(url).searchParams.get('v');
                                            } else if (url.includes('youtu.be/')) {
                                                videoId = url.split('youtu.be/')[1].split('?')[0];
                                            }
                                            return (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        } else if (url.includes('vimeo.com')) {
                                            const videoId = url.split('vimeo.com/')[1].split('?')[0];
                                            return (
                                                <iframe
                                                    src={`https://player.vimeo.com/video/${videoId}`}
                                                    className="w-full h-full"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
                                            return (
                                                <video controls className="w-full h-full">
                                                    <source src={url} type={`video/${url.split('.').pop()}`} />
                                                </video>
                                            );
                                        } else {
                                            return (
                                                <iframe
                                                    src={url}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        }
                                    })()}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={downloadVideo}
                                        className="flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all"
                                    >
                                        <Download size={18} />
                                        Download
                                    </button>
                                    <button
                                        onClick={() => window.open(verifiedVideo.url, '_blank')}
                                        className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-sm transition-all"
                                    >
                                        <Eye size={18} />
                                        Open in New Tab
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                <p className="text-sm text-amber-400 font-bold flex items-center gap-2">
                                    <Lock size={16} />
                                    This code has been marked as used and cannot be reused.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VideoAccess;
