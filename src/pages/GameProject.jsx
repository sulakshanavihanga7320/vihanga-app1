import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Gamepad2, Trophy, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameProject = () => {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-purple-500/30">
            <nav className="fixed top-0 w-full bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="p-2 hover:bg-neutral-900 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <span className="font-bold text-xl tracking-tight">Neon Drifter</span>
                    <a
                        href="/demo/game"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                    >
                        <Play size={16} fill="currentColor" /> Play Demo
                    </a>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6 border border-purple-500/20">
                            <Gamepad2 size={16} />
                            <span>WebGl Endless Runner</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                            Neon Drifter
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed mb-8">
                            A high-octane cyberpunk racing experience built directly for the browser.
                            Features procedural track generation, dynamic lighting, and a synthwave soundtrack.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            {["Unity WebGL", "C#", "React Wrapper", "Three.js"].map(tech => (
                                <span key={tech} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-300 font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl shadow-purple-900/20 group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
                            alt="Game Screenshot"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link to="/demo/game" className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                                <Play size={32} fill="currentColor" className="ml-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Trophy, title: "Global Leaderboards", desc: "Real-time ranking system using WebSocket connections." },
                        { icon: Users, title: "Multiplayer Mode", desc: "Race against ghost data from other players worldwide." },
                        { icon: Star, title: "Daily Challenges", desc: "New procedurally generated tracks every 24 hours." }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                            <feature.icon className="text-purple-400 mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-neutral-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default GameProject;
