import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import InteractiveBackground from './InteractiveBackground';

const Hero = () => {
    const { content, t } = useSiteContent();

    const SocialLink = ({ href, icon }) => (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, color: '#a78bfa' }} // Tailwind's indigo-400
            whileTap={{ scale: 0.9 }}
            className="transition-colors duration-200"
        >
            {icon}
        </motion.a>
    );

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-neutral-950">
            {/* Interactive Background (Stable 3D Depth) */}
            <InteractiveBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col items-center mb-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                            {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening'} • Available for freelance
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-200">
                        {t('hero.title', content.hero.title)}
                    </h1>

                    <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        {t('hero.subtitle', content.hero.subtitle)}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2"
                        >
                            {t('hero.cta', content.hero.cta)} <ArrowRight size={20} />
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold transition-all backdrop-blur-sm"
                        >
                            {t('hero.contactButton', 'Contact Me')}
                        </motion.a>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-neutral-500">
                        <SocialLink href="#" icon={<Github size={24} />} />
                        <SocialLink href="#" icon={<Linkedin size={24} />} />
                        <SocialLink href="#" icon={<Twitter size={24} />} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
