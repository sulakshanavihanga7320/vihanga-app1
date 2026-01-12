import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

const Projects = () => {
    const { content } = useSiteContent();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="projects" className="py-32 bg-neutral-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Layers size={14} />
                            <span>Digital Showroom</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
                            Forged in <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Innovation.</span>
                        </h2>
                        <p className="text-neutral-400 text-xl font-medium">
                            A curated selection of high-fidelity applications and experimental prototypes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/store" className="group flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all shadow-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Explore Store</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {content && content.projects && content.projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            variants={item}
                            whileHover={{ y: -12 }}
                            className="flex flex-col relative group rounded-[2.5rem] bg-neutral-900/50 border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-neutral-900 shadow-2xl"
                        >
                            {/* Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                                {/* Hover Sparkle */}
                                <div className="absolute top-6 right-6 p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <Sparkles size={20} />
                                </div>
                            </div>

                            {/* Project Content */}
                            <div className="p-10 flex-1 flex flex-col relative z-10">
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-400 text-sm font-medium leading-relaxed mb-8 flex-1">
                                    {project.description}
                                </p>

                                {project.tags && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-black border border-white/5 text-neutral-500 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-all">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="pt-6 border-t border-white/5">
                                    {project.detailUrl ? (
                                        <Link
                                            to={project.detailUrl}
                                            className="group/link flex items-center justify-between w-full text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
                                        >
                                            View Architecture
                                            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    ) : (
                                        <div className="flex items-center justify-between gap-6">
                                            {project.links && project.links.github && (
                                                <a href={project.links.github} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                                                    <Github size={16} /> Source
                                                </a>
                                            )}
                                            {project.links && project.links.live && (
                                                <Link to={project.links.live} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">
                                                    <ExternalLink size={16} /> Protocol
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/[0.02] pointer-events-none transition-colors duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
