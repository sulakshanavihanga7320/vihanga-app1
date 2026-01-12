import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Cpu, Hash, Terminal, Box, Zap, Layers } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const Skills = () => {
    const { content } = useSiteContent();

    const getSkillIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('javascript') || lower.includes('typescript')) return <Terminal size={18} />;
        if (lower.includes('react') || lower.includes('vue')) return <Layers size={18} />;
        if (lower.includes('node') || lower.includes('sql')) return <Cpu size={18} />;
        if (lower.includes('css') || lower.includes('tailwind')) return <Globe size={18} />;
        if (lower.includes('git')) return <Box size={18} />;
        return <Hash size={18} />;
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="skills" className="py-32 relative overflow-hidden bg-neutral-950">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} />
                        <span>Core Competencies</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter"
                    >
                        Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Weaponry.</span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {content.skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="relative group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.08] transition-all duration-500 shadow-2xl"
                        >
                            {/* Skill Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                {getSkillIcon(skill.name)}
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white transition-colors">
                                    {skill.name}
                                </h3>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-indigo-400 transition-colors">
                                    {skill.level}
                                </span>
                            </div>

                            {/* Modern Progress Bar */}
                            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                    className="absolute top-0 left-0 h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                                <div className={`absolute top-0 left-0 h-full bg-neutral-700 w-[${skill.level === 'Advanced' ? '90%' : skill.level === 'Intermediate' ? '70%' : '50%'}] transition-all duration-1000 group-hover:bg-indigo-400`} />
                            </div>

                            {/* Subtle Glow */}
                            <div className="absolute -inset-1 bg-indigo-500/0 group-hover:bg-indigo-500/5 rounded-[2.1rem] blur-xl transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
