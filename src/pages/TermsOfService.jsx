import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Gavel, AlertCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
                        <Scale size={200} className="text-purple-500" />
                    </div>

                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                            Terms of <span className="text-purple-500">Service.</span>
                        </h1>

                        <div className="space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <Gavel size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Agreement</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed">
                                    By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <FileText size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Use License</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed mb-4">
                                    Permission is granted to temporarily download one copy of the materials (information or software) on Vihanga's website for personal, non-commercial transitory viewing only.
                                </p>
                                <ul className="list-disc list-inside text-neutral-500 space-y-2 ml-4">
                                    <li>Modify or copy the materials;</li>
                                    <li>Use the materials for any commercial purpose;</li>
                                    <li>Attempt to decompile or reverse engineer any software;</li>
                                    <li>Remove any copyright or other proprietary notations.</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <AlertCircle size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Disclaimer</h2>
                                </div>
                                <p className="text-neutral-400 leading-relaxed">
                                    The materials on Vihanga's website are provided on an 'as is' basis. Vihanga makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section className="pt-8 border-t border-white/5">
                                <p className="text-neutral-500 text-sm italic">
                                    Last updated: January 2026. These terms are subject to change at any time without prior notice.
                                </p>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
