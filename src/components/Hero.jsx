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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-black">
            {/* Mesh Gradient Background */}
            <div className="mesh-gradient" />

            {/* Interactive Background */}
            <InteractiveBackground />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="inline-block mb-8"
                    >
                        <div className="glass-card px-6 py-3 inline-block">
                            <span className="text-sm font-outfit font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                ✨ Welcome to my portfolio
                            </span>
                        </div>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-outfit font-bold tracking-tighter mb-8 gradient-text"
                    >
                        {t('hero.title', content.hero.title)}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('hero.subtitle', content.hero.subtitle)}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card-blue px-8 py-4 rounded-xl font-outfit font-bold text-white flex items-center gap-3 group glow-blue"
                        >
                            {t('hero.cta', content.hero.cta)}
                            <motion.span
                                group-hover={{ x: 5 }}
                                transition={{ type: "spring" }}
                            >
                                <ArrowRight size={20} />
                            </motion.span>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card px-8 py-4 rounded-xl font-outfit font-bold text-white"
                        >
                            {t('hero.contactButton', content.hero.contactButton)}
                        </motion.a>
                    </motion.div>

                    {/* Floating Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <span className="text-sm text-neutral-500">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border border-neutral-700 rounded-full flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
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
