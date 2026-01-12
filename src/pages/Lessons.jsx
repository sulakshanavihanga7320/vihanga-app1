import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Clock, Code, PlayCircle, Star, Hash, ArrowRight,
    Lock, CreditCard, X, CheckCircle, Radio, Sparkles, TrendingUp, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

const Lessons = () => {
    const { content, addOrder } = useSiteContent();
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [levelFilter, setLevelFilter] = useState('all');
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
        try {
            localStorage.setItem('lessonProgress', JSON.stringify(progress));
        } catch {
            // ignore
        }
    }, [progress]);

    const updateProgress = (lessonId, updates) => {
        setProgress(prev => ({
            ...prev,
            [lessonId]: {
                ...(prev[lessonId] || {}),
                ...updates,
                updatedAt: new Date().toISOString(),
            },
        }));
    };

    const getLessonStatus = (lessonId) => {
        const p = progress[lessonId];
        if (!p) return 'not-started';
        if (p.completed) return 'completed';
        return 'in-progress';
    };

    const getStatusConfig = (lessonId) => {
        const status = getLessonStatus(lessonId);
        if (status === 'completed') {
            return {
                label: 'Completed',
                className: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
            };
        }
        if (status === 'in-progress') {
            return {
                label: 'In Progress',
                className: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/40',
            };
        }
        return {
            label: 'Not Started',
            className: 'bg-white/5 text-neutral-400 border-white/10',
        };
    };

    const filteredLessons = lessons.filter((lesson) => {
        const matchesLevel =
            levelFilter === 'all' || (lesson.level || '').toLowerCase() === levelFilter.toLowerCase();
        const haystack = `${lesson.title} ${lesson.desc} ${(lesson.tags || []).join(' ')}`.toLowerCase();
        const matchesSearch = haystack.includes(searchTerm.toLowerCase());
        return matchesLevel && matchesSearch;
    });

    const stats = {
        total: lessons.length,
        enrolled: Object.keys(progress).length,
        completed: Object.values(progress).filter(p => p.completed).length,
    };

    const handlePurchase = (e) => {
        e.preventDefault();
        addOrder({
            type: 'lesson',
            itemId: selectedLesson.id,
            itemName: selectedLesson.title,
            amount: selectedLesson.price,
            customerEmail: formData.email,
            customerDetails: { email: formData.email }
        });

        updateProgress(selectedLesson.id, { enrolled: true });

        setTimeout(() => {
            setShowSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden">
            {/* Animated Ambient Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Header Section */}
            <div className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-xl"
                    >
                        <Sparkles size={14} />
                        <span>Future-Ready Curriculum</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
                    >
                        Master the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Craft.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-400 max-w-3xl mx-auto font-medium"
                    >
                        High-fidelity video courses and live sessions designed to accelerate your engineering career.
                        Zero fluff, pure implementation.
                    </motion.p>

                    <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-3">
                            {['all', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                                <button
                                    key={level}
                                    onClick={() => setLevelFilter(level)}
                                    className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${levelFilter === level
                                        ? 'bg-white text-black border-white'
                                        : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                                        }`}
                                >
                                    {level === 'all' ? 'All Levels' : level}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 min-w-[220px]">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search lessons, topics, or tags..."
                                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    Total: {stats.total}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                    Enrolled: {stats.enrolled}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                                    Completed: {stats.completed}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-6 pb-40 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredLessons.map((lesson, index) => (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group h-full"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-br ${lesson.color} rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200`} />

                            <div className="relative h-full bg-neutral-900/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden flex flex-col hover:border-white/20 transition-all duration-500 shadow-2xl">
                                {/* Lesson Media Placeholder / Header */}
                                <div className={`relative h-56 bg-gradient-to-br ${lesson.color} overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Glass Overlay on Header */}
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                                        <div className="flex flex-col gap-2">
                                            <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                                                {lesson.level}
                                            </span>
                                            {lesson.isLive && (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/80 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest text-white animate-pulse shadow-lg shadow-red-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                                                    Active Now
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                            {lesson.price === 0 ? <Sparkles size={18} /> : <Lock size={18} />}
                                        </div>
                                    </div>

                                    {/* Visual Decor */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                                        {lesson.isLive ? <Radio size={100} className="text-white animate-ping" /> : <PlayCircle size={100} className="text-white" />}
                                    </div>

                                    {/* Price Tag Floating */}
                                    <div className="absolute bottom-4 right-4 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-sm font-black text-white shadow-2xl transform group-hover:scale-105 transition-all">
                                        {lesson.price === 0 ? 'FREE ACCESS' : `$${lesson.price}.00`}
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4 text-neutral-500 text-[11px] font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-indigo-400" />
                                                {lesson.duration}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-neutral-700" />
                                            <span className="flex items-center gap-1.5">
                                                <TrendingUp size={12} className="text-emerald-400" />
                                                4.9 Rating
                                            </span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusConfig(lesson.id).className}`}>
                                            {getStatusConfig(lesson.id).label}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-indigo-400 transition-colors duration-300">
                                        {lesson.title}
                                    </h3>

                                    <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {lesson.desc}
                                    </p>

                                    {lesson.tags && lesson.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {lesson.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-widest text-neutral-400 border border-white/10"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-auto">
                                        {lesson.price === 0 ? (
                                            <Link
                                                to={`/lessons/${lesson.id}`}
                                                onClick={() => updateProgress(lesson.id, { enrolled: true })}
                                                className="group/btn relative w-full h-14 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all font-black text-xs uppercase tracking-widest text-white shadow-xl"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {lesson.isLive ? 'Enter Virtual Lab' : 'Initiate Session'}
                                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </span>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedLesson(lesson)}
                                                className="group/btn relative w-full h-14 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all font-black text-xs uppercase tracking-widest text-white shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                                <span className="relative z-10 flex items-center gap-2">
                                                    Unlock Intelligence
                                                    <Lock size={16} />
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium Checkout Modal */}
            <AnimatePresence>
                {selectedLesson && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setSelectedLesson(null); setShowSuccess(false); }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
                        >
                            {!showSuccess ? (
                                <div className="p-10">
                                    <div className="flex justify-between items-start mb-10">
                                        <div>
                                            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Transaction Secure</span>
                                            <h2 className="text-3xl font-bold mt-2 tracking-tight">{selectedLesson.title}</h2>
                                            <div className="text-5xl font-black text-white mt-4 flex items-baseline gap-1">
                                                <span className="text-2xl text-neutral-500">$</span>
                                                {selectedLesson.price}
                                                <span className="text-base text-neutral-500">.00</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedLesson(null)}
                                            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handlePurchase} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-1">Identity</label>
                                            <input
                                                required type="email" placeholder="you@domain.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-indigo-500/50 transition-all font-medium"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-1">Encryption Layer</label>
                                            <div className="relative">
                                                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 pl-14 text-white placeholder:text-neutral-700 outline-none focus:border-indigo-500/50 transition-all font-medium" />
                                                <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600" size={20} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <input required type="text" placeholder="MM / YY" className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-indigo-500/50 transition-all font-medium text-center" />
                                            <input required type="text" placeholder="CVC" className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-neutral-700 outline-none focus:border-indigo-500/50 transition-all font-medium text-center" />
                                        </div>

                                        <button type="submit" className="w-full h-16 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-neutral-200 transition-all mt-6 active:scale-[0.98]">
                                            Confirm Acquisition
                                        </button>
                                    </form>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-neutral-600">
                                        <Lock size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-center">Military-grade AES-256 encrypted checkout</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-indigo-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
                                    >
                                        <CheckCircle size={48} className="text-white" />
                                    </motion.div>
                                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Access Unlocked</h2>
                                    <p className="text-neutral-400 text-lg mb-10 font-medium">
                                        The intelligence core is now active on your dashboard.
                                    </p>
                                    <Link
                                        to={`/lessons/${selectedLesson.id}`}
                                        className="group relative w-full h-16 inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] shadow-xl"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Begin Learning Protocol
                                            <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Lessons;
