import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Film, Award, Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FilmProject = () => {
    return (
        <div className="min-h-screen bg-black text-white font-serif selection:bg-red-900/30">
            <nav className="fixed top-0 w-full bg-gradient-to-b from-black/80 to-transparent z-50">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <span className="font-serif text-2xl tracking-widest uppercase">Velvet Cine</span>
                    <a
                        href="/demo/film"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white text-black font-sans text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                    >
                        Enter Studio
                    </a>
                </div>
            </nav>

            <header className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop"
                        alt="Cinema Background"
                        className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center max-w-4xl px-6"
                >
                    <p className="text-red-500 font-sans text-sm tracking-[0.3em] uppercase mb-6">Production Studio</p>
                    <h1 className="text-6xl md:text-8xl mb-8 leading-none">
                        Stories That <br /><span className="italic text-neutral-400">Transcend</span> Time.
                    </h1>
                    <p className="text-lg text-neutral-400 font-sans max-w-xl mx-auto mb-12 leading-relaxed">
                        A digital showcase for an award-winning independent film studio.
                        Featuring immersive video backgrounds, cinematic transitions, and a dark mode aesthetic.
                    </p>

                    <div className="flex justify-center gap-6 font-sans">
                        <Link to="/demo/film" className="group flex items-center gap-4 text-white hover:text-red-500 transition-colors">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-red-500 transition-colors">
                                <Play size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm tracking-widest uppercase">Watch Reel</span>
                        </Link>
                    </div>
                </motion.div>
            </header>

            <section className="bg-neutral-900 py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
                    {[
                        { icon: Film, title: "4K Streaming", desc: "Adaptive bitrate streaming for crystal clear quality on any device." },
                        { icon: Award, title: "Festival Circuit", desc: "Dedicated sections for awards, press kits, and festival screenings." },
                        { icon: Clapperboard, title: "Behind The Scenes", desc: "Interactive galleries showcasing the production process." }
                    ].map((feature, i) => (
                        <div key={i} className="text-center font-sans">
                            <feature.icon size={40} className="mx-auto mb-6 text-neutral-500" />
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FilmProject;
