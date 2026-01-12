import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, Info, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FilmDemo = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-red-600/30 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-8 md:px-12 py-6 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link to="/projects/film" className="text-red-600 font-bold text-3xl tracking-tighter">VELVET.</Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-300">
                        <a href="#" className="hover:text-white transition-colors">Home</a>
                        <a href="#" className="hover:text-white transition-colors">Series</a>
                        <a href="#" className="hover:text-white transition-colors">Films</a>
                        <a href="#" className="hover:text-white transition-colors">New & Popular</a>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/projects/film" className="text-neutral-300 hover:text-white text-sm flex items-center gap-2">
                        <ArrowLeft size={16} /> Exit
                    </Link>
                    <div className="w-8 h-8 bg-red-600 rounded-md"></div>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative h-[80vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop"
                        alt="Hero Configuration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-32 left-8 md:left-12 max-w-2xl">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
                    >
                        CYBER<br />NOIR
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 text-sm font-medium text-green-400 mb-8"
                    >
                        <span>98% Match</span>
                        <span className="text-neutral-400">2024</span>
                        <span className="border border-neutral-600 px-1 text-neutral-400 rounded-sm text-xs">4K</span>
                        <span className="text-neutral-400">2h 14m</span>
                    </motion.div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg text-neutral-300 mb-10 leading-relaxed drop-shadow-md"
                    >
                        In a future where memories are currency, a rogue data broker discovers a conspiracy that threatens to rewrite human history.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4"
                    >
                        <button className="px-8 py-3 bg-white text-black font-bold rounded flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                            <Play fill="currentColor" size={20} /> Play
                        </button>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="px-8 py-3 bg-neutral-500/30 text-white font-bold rounded flex items-center gap-2 hover:bg-neutral-500/50 transition-colors backdrop-blur-sm"
                        >
                            <Info size={20} /> More Info
                        </button>
                    </motion.div>
                </div>
            </header>

            {/* Content Rows */}
            <div className="relative z-10 -mt-24 px-8 md:px-12 space-y-12 pb-24">
                {[
                    { title: "Trending Now", category: "Sci-Fi" },
                    { title: "Watch It Again", category: "Action" },
                    { title: "New Releases", category: "Drama" },
                ].map((row, i) => (
                    <div key={i}>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 group cursor-pointer">
                            {row.title} <ChevronDown size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -rotate-90" />
                        </h3>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="flex-shrink-0 w-64 aspect-video bg-neutral-800 rounded-md overflow-hidden relative group cursor-pointer"
                                >
                                    <img
                                        src={`https://source.unsplash.com/random/400x225?${row.category}&sig=${item}${i}`}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <div className="flex gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                                <Play fill="black" size={12} className="text-black ml-0.5" />
                                            </div>
                                            <div className="w-8 h-8 rounded-full border-2 border-neutral-500 flex items-center justify-center">
                                                <Plus size={16} />
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm">Episode {item}</p>
                                        <div className="flex gap-2 text-[10px] text-neutral-400 mt-1">
                                            <span className="text-green-400">9{item}% Match</span>
                                            <span>18+</span>
                                            <span>1h 30m</span>
                                        </div>
                                        <div className="mt-2 flex gap-2 text-[10px] text-white">
                                            <span>Slick</span>
                                            <span className="text-neutral-600">•</span>
                                            <span>Futuristic</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalOpen(false)}
                            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-24 md:left-1/2 md:-translate-x-1/2 md:w-[850px] bg-[#181818] z-50 rounded-t-xl md:rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="relative aspect-video">
                                <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop" alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
                                <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                    <X size={20} />
                                </button>

                                <div className="absolute bottom-12 left-12">
                                    <h2 className="text-5xl font-black mb-4">CYBER NOIR</h2>
                                    <div className="flex gap-4">
                                        <button className="px-8 py-2 bg-white text-black font-bold rounded flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                                            <Play fill="currentColor" size={20} /> Play
                                        </button>
                                        <button className="w-10 h-10 border-2 border-neutral-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-12 grid grid-cols-3 gap-8">
                                <div className="col-span-2">
                                    <div className="flex gap-4 text-sm font-medium mb-6">
                                        <span className="text-green-400">98% Match</span>
                                        <span>2024</span>
                                        <span>2h 14m</span>
                                        <span className="border border-neutral-600 px-1 rounded-sm text-xs h-fit pt-[1px]">HD</span>
                                    </div>
                                    <p className="text-white text-lg leading-relaxed mb-6">
                                        In a future where memories are currency, a rogue data broker discovers a conspiracy that threatens to rewrite human history. As he dig deeper, he realizes that his own past might be the key to the future.
                                    </p>
                                </div>
                                <div className="text-sm space-y-4">
                                    <div><span className="text-neutral-500">Cast:</span> <span className="text-white hover:underline cursor-pointer">Keanu Reeves, Ana de Armas</span></div>
                                    <div><span className="text-neutral-500">Genres:</span> <span className="text-white hover:underline cursor-pointer">Sci-Fi, Thiller, Cyberpunk</span></div>
                                    <div><span className="text-neutral-500">This movie is:</span> <span className="text-white hover:underline cursor-pointer">Mind-bending, Dark</span></div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilmDemo;
