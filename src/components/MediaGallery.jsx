import React, { useState } from 'react';
import { Upload, Video, Trash2, Copy, Check, Download, Eye, Lock, Key, FileVideo, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaGallery = ({ content, updateContent }) => {
    const [videos, setVideos] = useState(content.videos || []);
    const [uploadUrl, setUploadUrl] = useState('');
    const [uploadTitle, setUploadTitle] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [copiedCode, setCopiedCode] = useState(null);
    const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'
    const [uploadingFile, setUploadingFile] = useState(false);

    const generateAccessCode = () => {
        return 'VID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if it's a video file
        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file!');
            return;
        }

        setUploadingFile(true);

        // Convert file to base64 for storage (for demo purposes)
        // In production, you'd upload to a server/cloud storage
        const reader = new FileReader();
        reader.onload = (event) => {
            const videoData = event.target.result;

            const newVideo = {
                id: Date.now(),
                title: uploadTitle || file.name.replace(/\.[^/.]+$/, ''),
                url: videoData, // Base64 data URL
                fileName: file.name,
                fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                uploadedAt: new Date().toISOString(),
                accessCodes: [],
                views: 0,
                type: 'file'
            };

            const updatedVideos = [...videos, newVideo];
            setVideos(updatedVideos);
            updateContent({ ...content, videos: updatedVideos });
            setUploadTitle('');
            setUploadingFile(false);
            alert('Video uploaded successfully!');
        };

        reader.onerror = () => {
            alert('Failed to read file!');
            setUploadingFile(false);
        };

        reader.readAsDataURL(file);
    };

    const addVideo = () => {
        if (!uploadUrl || !uploadTitle) {
            alert('Please provide both URL and title!');
            return;
        }

        const newVideo = {
            id: Date.now(),
            title: uploadTitle,
            url: uploadUrl,
            uploadedAt: new Date().toISOString(),
            accessCodes: [],
            views: 0,
            type: 'url'
        };

        const updatedVideos = [...videos, newVideo];
        setVideos(updatedVideos);
        updateContent({ ...content, videos: updatedVideos });
        setUploadUrl('');
        setUploadTitle('');
    };

    const generateCodeForVideo = (videoId, orderId = null) => {
        const code = generateAccessCode();
        const updatedVideos = videos.map(v => {
            if (v.id === videoId) {
                return {
                    ...v,
                    accessCodes: [...(v.accessCodes || []), {
                        code,
                        orderId,
                        generatedAt: new Date().toISOString(),
                        used: false,
                        usedBy: null,
                        usedAt: null
                    }]
                };
            }
            return v;
        });
        setVideos(updatedVideos);
        updateContent({ ...content, videos: updatedVideos });
        return code;
    };

    const deleteVideo = (id) => {
        if (window.confirm('Delete this video? All access codes will be revoked.')) {
            const updatedVideos = videos.filter(v => v.id !== id);
            setVideos(updatedVideos);
            updateContent({ ...content, videos: updatedVideos });
        }
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Upload size={24} className="text-indigo-400" />
                    Upload New Video
                </h3>

                {/* Upload Mode Toggle */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setUploadMode('url')}
                        className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${uploadMode === 'url'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                    >
                        <LinkIcon size={18} />
                        URL Upload
                    </button>
                    <button
                        onClick={() => setUploadMode('file')}
                        className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${uploadMode === 'file'
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                    >
                        <FileVideo size={18} />
                        File Upload
                    </button>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Video Title"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                        className="admin-input"
                    />

                    {uploadMode === 'url' ? (
                        <>
                            <input
                                type="text"
                                placeholder="Video URL (YouTube, Vimeo, or Direct Link)"
                                value={uploadUrl}
                                onChange={(e) => setUploadUrl(e.target.value)}
                                className="admin-input"
                            />
                            <button onClick={addVideo} className="admin-btn-primary w-full">
                                <Upload size={18} /> Add from URL
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="video-file-input"
                                    disabled={uploadingFile}
                                />
                                <label
                                    htmlFor="video-file-input"
                                    className={`flex items-center justify-center gap-3 w-full py-6 px-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${uploadingFile
                                            ? 'border-neutral-700 bg-neutral-800/50 cursor-not-allowed'
                                            : 'border-neutral-700 hover:border-indigo-500 hover:bg-indigo-500/5'
                                        }`}
                                >
                                    {uploadingFile ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <Upload size={24} className="text-indigo-400" />
                                            </motion.div>
                                            <span className="text-neutral-400 font-bold">Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FileVideo size={24} className="text-neutral-500" />
                                            <div className="text-center">
                                                <p className="text-white font-bold mb-1">Click to upload video file</p>
                                                <p className="text-xs text-neutral-500">MP4, WebM, OGG supported</p>
                                            </div>
                                        </>
                                    )}
                                </label>
                            </div>
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                <p className="text-xs text-amber-400 font-bold">
                                    ⚠️ Note: Large video files will be stored in browser storage. For production, consider uploading to a cloud service (AWS S3, Cloudinary, etc.) and using the URL upload option.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Video Gallery */}
            <div className="grid grid-cols-1 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 group hover:border-indigo-500/50 transition-colors">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                    {video.type === 'file' ? <FileVideo size={28} /> : <Video size={28} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white">{video.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-xs text-neutral-500">
                                            Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}
                                        </p>
                                        {video.fileSize && (
                                            <>
                                                <span className="text-neutral-700">•</span>
                                                <p className="text-xs text-neutral-500">{video.fileSize}</p>
                                            </>
                                        )}
                                        <span className="text-neutral-700">•</span>
                                        <p className="text-xs text-neutral-500">{video.views || 0} views</p>
                                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-bold uppercase">
                                            {video.type === 'file' ? 'Local File' : 'URL'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteVideo(video.id)}
                                className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Access Codes Section */}
                        <div className="bg-black/40 rounded-2xl p-6 border border-neutral-800">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                    <Key size={16} className="text-indigo-400" />
                                    Access Codes ({video.accessCodes?.length || 0})
                                </h5>
                                <button
                                    onClick={() => {
                                        const code = generateCodeForVideo(video.id);
                                        alert(`New access code generated: ${code}`);
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors"
                                >
                                    + Generate Code
                                </button>
                            </div>

                            {video.accessCodes && video.accessCodes.length > 0 ? (
                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                    {video.accessCodes.map((access, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center justify-between p-3 rounded-xl ${access.used ? 'bg-neutral-800/50' : 'bg-indigo-500/5 border border-indigo-500/20'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${access.used ? 'bg-neutral-600' : 'bg-green-500 animate-pulse'}`} />
                                                <code className="text-sm font-mono font-bold text-white">{access.code}</code>
                                                {access.used && (
                                                    <span className="text-xs text-neutral-500">
                                                        Used {new Date(access.usedAt).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => copyCode(access.code)}
                                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                {copiedCode === access.code ? (
                                                    <Check size={16} className="text-green-500" />
                                                ) : (
                                                    <Copy size={16} className="text-neutral-500" />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-neutral-600 text-sm text-center py-4">No access codes generated yet</p>
                            )}
                        </div>

                        {/* Video Preview/URL */}
                        <div className="mt-4 p-4 bg-black/20 rounded-xl border border-neutral-800">
                            <p className="text-xs text-neutral-500 mb-2 font-bold uppercase tracking-widest">
                                {video.type === 'file' ? 'File Info:' : 'Video URL:'}
                            </p>
                            {video.type === 'file' ? (
                                <div className="flex items-center gap-2">
                                    <FileVideo size={16} className="text-indigo-400" />
                                    <p className="text-sm text-neutral-400 font-mono">{video.fileName}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-neutral-400 font-mono truncate">{video.url}</p>
                            )}
                        </div>
                    </div>
                ))}

                {videos.length === 0 && (
                    <div className="text-center py-20 text-neutral-500">
                        <Video size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold">No videos uploaded yet</p>
                        <p className="text-sm text-neutral-600 mt-2">Upload from URL or select a file from your computer</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaGallery;
