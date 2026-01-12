import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Book, Layout, AppWindow as App, Code, Zap, X, Shield, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const actions = [
        { id: 'home', title: 'Go to Home', icon: <Layout size={18} />, path: '/' },
        { id: 'lessons', title: 'Browse Lessons', icon: <Book size={18} />, path: '/lessons' },
        { id: 'store', title: 'Template Store', icon: <Zap size={18} />, path: '/store' },
        { id: 'live', title: 'Live Sessions', icon: <Code size={18} />, path: '/live' },
        { id: 'ecommerce', title: 'View eCommerce Project', icon: <App size={18} />, path: '/projects/ecommerce' },
        { id: 'taskmanager', title: 'View Task Manager', icon: <App size={18} />, path: '/projects/taskmanager' },
        { id: 'weather', title: 'View Weather App', icon: <App size={18} />, path: '/projects/weather' },
        { id: 'privacy', title: 'Privacy Policy', icon: <Shield size={18} />, path: '/privacy' },
        { id: 'terms', title: 'Terms of Service', icon: <Scale size={18} />, path: '/terms' },
    ];

    const filteredActions = actions.filter(action =>
        action.title.toLowerCase().includes(search.toLowerCase())
    );

    const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                togglePalette();
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [togglePalette]);

    const handleSelect = (path) => {
        navigate(path);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 border-b border-neutral-800">
                            <Search className="text-neutral-500 mr-3" size={20} />
                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search everything... (Try 'lessons')"
                                className="w-full bg-transparent py-4 text-white focus:outline-none placeholder:text-neutral-600"
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-800 rounded text-[10px] font-bold text-neutral-400">
                                <kbd>ESC</kbd>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                            {filteredActions.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredActions.map((action) => (
                                        <button
                                            key={action.id}
                                            onClick={() => handleSelect(action.path)}
                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all text-left group"
                                        >
                                            <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                                {action.icon}
                                            </div>
                                            <span className="font-medium">{action.title}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-neutral-500">No results found for "{search}"</p>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 bg-neutral-950/50 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1"><kbd className="bg-neutral-800 px-1 rounded text-[10px]">↑↓</kbd> Navigate</span>
                                <span className="flex items-center gap-1"><kbd className="bg-neutral-800 px-1 rounded text-[10px]">↵</kbd> Select</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Command size={12} />
                                <span>Press K to open</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
