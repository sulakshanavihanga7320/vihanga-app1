import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Play, CheckCircle, Clock, ArrowLeft, BookOpen, Download,
    Radio, ExternalLink, Sparkles, Share2, MessageCircle, MoreVertical, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const LessonView = () => {
    const { id } = useParams();
    const { content } = useSiteContent();
    const [lesson, setLesson] = useState(null);
    const [progress, setProgress] = useState(() => {
        try {
            const raw = localStorage.getItem('lessonProgress');
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    });

    const lessons = content.lessons || [];

    useEffect(() => {
        const found = lessons.find(l => l.id === parseInt(id));
        setLesson(found);
    }, [id, lessons]);

    useEffect(() => {
        try {
            localStorage.setItem('lessonProgress', JSON.stringify(progress));
        } catch {
            // ignore
        }
    }, [progress]);

    useEffect(() => {
        if (!lesson) return;
        setProgress(prev => {
            const existing = prev[lesson.id];
            if (existing && existing.enrolled) return prev;
            return {
                ...prev,
                [lesson.id]: {
                    ...(existing || {}),
                    enrolled: true,
                    updatedAt: new Date().toISOString(),
                },
            };
        });
    }, [lesson]);

    const markCompleted = () => {
        if (!lesson) return;
        setProgress(prev => ({
            ...prev,
            [lesson.id]: {
                ...(prev[lesson.id] || {}),
                enrolled: true,
                completed: true,
                updatedAt: new Date().toISOString(),
            },
        }));
    };

    if (!lesson) return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-6">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            />
            <p className="text-neutral-400 font-black uppercase tracking-[0.2em] text-sm">Decoding Session Content...</p>
        </div>
    );

    const lessonProgress = progress[lesson.id] || {};
    const isCompleted = !!lessonProgress.completed;

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
            {/* Animated Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[130px]" />
            </div>

            {/* Futuristic Top Bar */}
            <header className="h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-[60]">
                <div className="flex items-center gap-8">
                    <Link
                        to="/lessons"
                        className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-all font-bold text-sm"
                    >
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="hidden md:inline uppercase tracking-widest text-[10px] font-black">Exit Terminal</span>
                    </Link>
                    <div className="h-6 w-px bg-white/10 hidden md:block" />
                    <div className="hidden lg:flex flex-col">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Active Course</span>
                        <span className="text-sm font-bold text-white truncate max-w-[300px]">{lesson.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {lesson.isLive && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 shadow-lg shadow-red-500/5"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                            Live Transmission
                        </motion.div>
                    )}
                    {isCompleted && (
                        <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                            <CheckCircle size={12} />
                            Completed
                        </span>
                    )}
                    <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                        <Share2 size={18} className="text-neutral-400" />
                    </button>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-xl">
                        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-[10px] font-black">
                            VB
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-6 lg:p-10 grid lg:grid-cols-[1fr_400px] gap-10 relative z-10">
                {/* Primary Content Area */}
                <div className="space-y-10">
                    {/* Video Player Section */}
                    <div className="relative group">
                        {/* Glow Behind Player */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                        <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl overflow-hidden ring-1 ring-white/5">
                            {lesson.isLive ? (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black p-12 text-center">
                                    <div className="relative">
                                        <div className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shadow-2xl relative z-10">
                                            <Radio size={56} />
                                        </div>
                                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
                                        <div className="absolute -inset-4 bg-red-500/5 rounded-full blur-2xl" />
                                    </div>
                                    <div className="max-w-md">
                                        <h2 className="text-4xl font-black mb-4 tracking-tight uppercase">Encryption Link Active</h2>
                                        <p className="text-neutral-400 font-medium leading-relaxed mb-10">
                                            This is a high-bandwidth live session. Join the virtual environment for real-time collaboration.
                                        </p>
                                        <a
                                            href={lesson.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-4 bg-red-600 hover:bg-red-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)]"
                                        >
                                            Enter Virtual Lab <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                lesson.videoUrl ? (
                                    (() => {
                                        const url = lesson.videoUrl;
                                        // YouTube detection
                                        if (url.includes('youtube.com') || url.includes('youtu.be')) {
                                            let videoId = '';
                                            if (url.includes('youtube.com/watch')) {
                                                videoId = new URL(url).searchParams.get('v');
                                            } else if (url.includes('youtu.be/')) {
                                                videoId = url.split('youtu.be/')[1].split('?')[0];
                                            } else if (url.includes('youtube.com/embed/')) {
                                                videoId = url.split('embed/')[1].split('?')[0];
                                            }
                                            return (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                                                    title={lesson.title}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        }
                                        // Vimeo detection
                                        else if (url.includes('vimeo.com')) {
                                            const videoId = url.split('vimeo.com/')[1].split('?')[0];
                                            return (
                                                <iframe
                                                    src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
                                                    title={lesson.title}
                                                    className="w-full h-full"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        }
                                        // Direct video file (mp4, webm, etc)
                                        else if (url.match(/\.(mp4|webm|ogg)$/i)) {
                                            return (
                                                <video
                                                    controls
                                                    className="w-full h-full"
                                                    poster={lesson.thumbnail || ''}
                                                >
                                                    <source src={url} type={`video/${url.split('.').pop()}`} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            );
                                        }
                                        // Generic iframe (for other embed URLs)
                                        else {
                                            return (
                                                <iframe
                                                    src={url}
                                                    title={lesson.title}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            );
                                        }
                                    })()
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-neutral-900/50">
                                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
                                            <Play size={32} className="text-neutral-700" />
                                        </div>
                                        <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Awaiting Data Stream...</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Meta Data & Description */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                                {lesson.isLive ? 'Real-Time Module' : 'Static Core'}
                            </span>
                            <span className="flex items-center gap-2 text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                                <Clock size={14} className="text-indigo-500/50" />
                                Duration: {lesson.duration}
                            </span>
                            <span className="flex items-center gap-2 text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                                <Sparkles size={14} className="text-amber-500/50" />
                                Masterclass Edition
                            </span>
                        </div>

                        <h1 className="text-5xl font-black mb-8 leading-tight tracking-tight">
                            {lesson.title}
                        </h1>

                        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl text-neutral-400 leading-relaxed font-medium mb-10">
                                    {lesson.desc}
                                </p>
                                <div className="p-8 rounded-3xl bg-black/40 border-l-4 border-indigo-500 text-neutral-400 italic font-medium leading-relaxed">
                                    "This module focuses on the practical implementation of modern architectures.
                                    By the end of this session, you'll have a production-ready mental model for this technology."
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={markCompleted}
                                    className={`flex items-center justify-center gap-3 h-12 px-8 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border transition-all ${isCompleted
                                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                        : 'bg-white/5 border-white/10 text-neutral-200 hover:bg-white/10'
                                        }`}
                                >
                                    <CheckCircle size={18} />
                                    {isCompleted ? 'Completed' : 'Mark as Completed'}
                                </button>
                                <button className="flex items-center justify-center gap-4 bg-white text-black h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all shadow-xl active:scale-[0.98]">
                                    <Download size={18} />
                                    Project Assets
                                </button>
                                <button className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 h-16 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all font-black text-white active:scale-[0.98]">
                                    <BookOpen size={18} />
                                    Technical Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cyber-Sidebar (Course Content) */}
                <aside className="space-y-6">
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl sticky top-28 ring-1 ring-white/5">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h3 className="font-black text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                                Session Modules
                            </h3>
                            <span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg text-[10px] font-black border border-indigo-500/20">
                                {lessons.length}
                            </span>
                        </div>

                        <div className="space-y-4 custom-scrollbar max-h-[calc(100vh-450px)] overflow-y-auto pr-2">
                            {lessons.map((l, i) => (
                                <Link
                                    to={`/lessons/${l.id}`}
                                    key={l.id}
                                    className={`group flex items-start gap-5 p-5 rounded-2xl transition-all border ${l.id === lesson.id ? 'bg-indigo-600/10 border-indigo-500/50 shadow-[0_10px_30px_rgba(79,70,229,0.1)]' : 'hover:bg-white/5 border-transparent'}`}
                                >
                                    <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${l.id === lesson.id ? 'border-indigo-500 bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'border-white/5 bg-black text-neutral-500 group-hover:border-white/20'}`}>
                                        {l.id === lesson.id ? <Play size={12} fill="currentColor" /> : (progress[l.id]?.completed ? <CheckCircle size={14} /> : i + 1)}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-bold leading-tight mb-2 transition-colors ${l.id === lesson.id ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                            {l.title}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-neutral-600 tracking-tighter">
                                                <Clock size={10} className="text-neutral-700" />
                                                {l.duration}
                                            </div>
                                            {l.isLive && (
                                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-red-500 tracking-tighter">
                                                    <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                                    Active
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Sidebar Footer Interaction */}
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <button className="w-full h-14 flex items-center justify-center gap-3 bg-black border border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white hover:border-indigo-500/30 transition-all">
                                <MessageCircle size={16} />
                                Discussion Lab
                            </button>
                        </div>
                    </div>

                    {/* Micro Stats / Ad */}
                    <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 overflow-hidden relative group">
                        <div className="relative z-10">
                            <h4 className="font-black text-[10px] uppercase tracking-widest text-indigo-300 mb-2">Completion Rate</h4>
                            <div className="text-3xl font-black mb-4 tracking-tighter">94.8% Success</div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '94.8%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,1)]"
                                />
                            </div>
                        </div>
                        <Layers size={80} className="absolute -bottom-6 -right-6 text-indigo-500/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default LessonView;
