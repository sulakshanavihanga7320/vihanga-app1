import React from 'react';
import { motion } from 'framer-motion';
import {
    Gamepad2, Smartphone, Monitor, ShoppingBag,
    Film, Code, Sparkles, Box, ShieldCheck, Zap
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const iconMap = {
    Gamepad2,
    Smartphone,
    Monitor,
    ShoppingBag,
    Film,
    Code,
};

const Services = () => {
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
        <section id="services" className="py-32 relative overflow-hidden bg-neutral-950">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} />
                        <span>Core Offerings</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter"
                    >
                        Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Masterpieces.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-400 text-xl font-medium max-w-2xl mx-auto mt-8"
                    >
                        Crafting high-fidelity digital experiences that push the boundaries of modern technology.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {content.services.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Code;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                whileHover={{ y: -10 }}
                                className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-500 shadow-2xl overflow-hidden"
                            >
                                {/* Gradient Blob */}
                                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl -mr-20 -mt-20 transition-opacity duration-700`} />

                                {/* Icon Container */}
                                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-8 shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <div className="w-full h-full bg-neutral-900 rounded-[14px] flex items-center justify-center">
                                        <IconComponent className="text-white" size={30} />
                                    </div>
                                    {/* Neon Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`} />
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-400 leading-relaxed font-medium">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Revealable Detail / Link Indicator */}
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Available Protocol</span>
                                    <ShieldCheck className="text-neutral-700" size={16} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
