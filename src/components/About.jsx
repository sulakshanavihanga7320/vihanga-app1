import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Sparkles, Terminal, Cpu } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const About = () => {
    const { content } = useSiteContent();
    const [userImage, setUserImage] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        try {
            const userProfile = localStorage.getItem('userProfile');
            if (userProfile) {
                const profile = JSON.parse(userProfile);
                if (profile.avatarUrl) {
                    setUserImage(profile.avatarUrl);
                }
            }
        } catch (err) {
            console.log('Could not load user image');
        }
    }, []);

    return (
        <section id="about" className="py-32 relative overflow-hidden bg-neutral-950">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    className="grid md:grid-cols-2 gap-20 items-center"
                >
                    {/* Visual Side */}
                    <div className="relative group lg:pr-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative z-10 aspect-square rounded-[3rem] bg-neutral-900 overflow-hidden border border-white/10 group-hover:border-indigo-500/50 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src={userImage || content.about.image}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                            />
                            {/* Glass Overlay on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Floating Identity Badge */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Identity Core</p>
                                        <p className="font-bold text-white">Vihanga Board</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Backing Glow/Frames */}
                        <div className="absolute -z-10 top-12 -right-4 w-full h-full rounded-[3rem] border-2 border-indigo-500/10 backdrop-blur-sm group-hover:top-8 group-hover:right-0 transition-all duration-700" />
                        <div className="absolute -inset-4 bg-indigo-500/5 rounded-[4rem] blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />
                    </div>

                    {/* Content Side */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest"
                            >
                                <Sparkles size={14} />
                                <span>Origins & Vision</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter"
                            >
                                Architecture of <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Experience.</span>
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 text-neutral-400 text-lg font-medium leading-relaxed"
                        >
                            {content.about.paragraphs.map((p, i) => (
                                <p key={i} className="hover:text-neutral-300 transition-colors">
                                    {p}
                                </p>
                            ))}
                        </motion.div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all shadow-xl flex items-center gap-4"
                            >
                                <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-400">
                                    <Terminal size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Execution</p>
                                    <p className="text-white font-bold">100% Logic</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all shadow-xl flex items-center gap-4"
                            >
                                <div className="p-3 rounded-2xl bg-purple-600/10 text-purple-400">
                                    <Cpu size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Philosophy</p>
                                    <p className="text-white font-bold">Scalable Systems</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
