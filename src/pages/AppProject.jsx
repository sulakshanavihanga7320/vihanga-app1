import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Smartphone, Activity, Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppProject = () => {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100">
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-100 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <span className="font-bold text-xl tracking-tight text-blue-600">Zenith.</span>
                    <a
                        href="/demo/app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        Live Preview <ExternalLink size={16} />
                    </a>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6">
                            #1 Health & Fitness App
                        </div>
                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Your Wellness, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Elevated.</span>
                        </h1>
                        <p className="text-xl text-neutral-500 leading-relaxed mb-8 max-w-lg">
                            Zenith tracks your physical activity, sleep patterns, and mindfulness moments in one beautiful interface.
                            Built with React Native for seamless performance on iOS and Android.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            {["React Native", "Expo", "Firebase", "Reanimated"].map(tech => (
                                <span key={tech} className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-600 font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className="h-14 px-8 rounded-xl bg-neutral-900 text-white font-bold flex items-center gap-3 hover:bg-neutral-800 transition-colors">
                                <span className="text-2xl"></span> App Store
                            </button>
                            <button className="h-14 px-8 rounded-xl bg-neutral-100 text-neutral-900 font-bold flex items-center gap-3 hover:bg-neutral-200 transition-colors">
                                <span className="text-xl">▶</span> Play Store
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-[300px] h-[600px] bg-neutral-900 rounded-[3rem] p-4 border-4 border-neutral-200 shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-20"></div>
                            <div className="w-full h-full bg-white rounded-[2.25rem] overflow-hidden relative">
                                <iframe
                                    src="/demo/app"
                                    className="w-full h-full border-0"
                                    title="App Demo"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-32 grid md:grid-cols-3 gap-12">
                    {[
                        { icon: Activity, title: "Smart Tracking", desc: "Automatic activity detection for walking, running, and cycling." },
                        { icon: Heart, title: "Health Metrics", desc: "Detailed analysis of your heart rate capability and recovery." },
                        { icon: Calendar, title: "Personal Plans", desc: "AI-generated workout schedules tailored to your goals." }
                    ].map((feature, i) => (
                        <div key={i} className="text-center">
                            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-neutral-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AppProject;
