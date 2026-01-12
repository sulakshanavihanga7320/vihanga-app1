import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <Shield size={200} className="text-indigo-500" />
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                            Privacy <span className="text-indigo-500">Policy.</span>
                        </h1>

                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <Lock size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Introduction</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed">
                                    Your privacy is important to us. It is Vihanga's policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <Eye size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Information Collection</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed mb-4">
                                    We may collect information such as:
                                </p>
                                <ul className="list-disc list-inside text-neutral-500 space-y-2 ml-4">
                                    <li>Name and contact details provided via the contact form</li>
                                    <li>Usage data collected through analytics tools</li>
                                    <li>Account information if you purchase templates or courses</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <FileText size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Data Retention</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed">
                                    We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                                </p>
                            </section>

                            <section className="pt-8 border-t border-white/5">
                                <p className="text-neutral-500 text-sm italic">
                                    Last updated: January 2026. If you have any questions about how we handle user data and personal information, feel free to contact us.
                                </p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
