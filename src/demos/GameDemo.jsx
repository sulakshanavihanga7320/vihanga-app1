import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Trophy, Zap, Shield, Crosshair, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GameDemo = () => {
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setScore(prev => prev + Math.floor(Math.random() * 100));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative selection:bg-cyan-500/30">
            {/* UI Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                    <div className="pointer-events-auto">
                        <Link to="/projects/game" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4">
                            <ArrowLeft size={20} /> Exit
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="bg-black/50 border border-cyan-500/30 px-6 py-2 rounded-lg backdrop-blur-md">
                                <span className="text-cyan-400 text-xs uppercase tracking-widest block mb-1">Score</span>
                                <span className="text-3xl font-bold tracking-tighter tabular-nums">{score.toLocaleString().padStart(6, '0')}</span>
                            </div>
                            <div className="bg-black/50 border border-purple-500/30 px-4 py-2 rounded-lg backdrop-blur-md flex items-center gap-2">
                                <Trophy size={16} className="text-purple-400" />
                                <span className="text-purple-100 font-bold">Rank #42</span>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-auto flex gap-4">
                        <button className="p-3 bg-black/50 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="bg-black/50 border border-white/10 p-4 rounded-xl backdrop-blur-md">
                        <div className="flex items-center gap-4 mb-2">
                            <Shield className="text-cyan-400" size={20} />
                            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-[80%] h-full bg-cyan-400" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Zap className="text-yellow-400" size={20} />
                            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-[45%] h-full bg-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-white/50 uppercase tracking-widest mb-2">Weapon System</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-red-400">
                            <Crosshair size={24} /> PLASMA RIFLE
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Menu / State */}
            {!isPlaying && (
                <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            NEON DRIFTER
                        </h1>
                        <p className="text-xl text-cyan-200 mb-12 tracking-widest uppercase">Cyberpunk Racing Protocol</p>

                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group relative px-12 py-6 bg-cyan-500 text-black font-black text-2xl uppercase tracking-widest hover:bg-cyan-400 transition-all clip-path-polygon"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
                        >
                            <span className="relative z-10 flex items-center gap-4">
                                Insert Coin <Play fill="currentColor" />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Simulated 3D Environment Background */}
            <div className={`absolute inset-0 bg-neutral-900 transition-transform duration-[20s] ease-linear ${isPlaying ? 'scale-150' : 'scale-100'}`}>
                {/* Grid Floor */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(transparent 95%, rgba(6, 182, 212, 0.3) 95%), linear-gradient(90deg, transparent 95%, rgba(168, 85, 247, 0.3) 95%)',
                        backgroundSize: '100px 100px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px)',
                        transformOrigin: '50% 100%',
                        animation: isPlaying ? 'moveGrid 1s linear infinite' : 'none'
                    }}
                />

                {/* Moving Particles/Stars */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            top: `${Math.random() * 50}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0
                        }}
                        animate={{
                            top: ['0%', '100%'],
                            opacity: [0, 1, 0],
                            scale: [0, 2]
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                        }}
                    />
                ))}

                <style>{`
                    @keyframes moveGrid {
                        from { background-position: 0 0; }
                        to { background-position: 0 100px; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default GameDemo;
