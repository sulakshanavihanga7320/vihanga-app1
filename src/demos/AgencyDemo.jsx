import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart, Globe, Zap, Users, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const AgencyDemo = () => {
    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                        <span className="text-xl font-bold tracking-tight">AgencyPro</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
                        <a href="#work" className="hover:text-blue-600 transition-colors">Work</a>
                        <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
                        <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
                        <a href="#blog" className="hover:text-blue-600 transition-colors">Blog</a>
                    </div>
                    <button className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
                        Let's Talk
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            #1 Digital Agency 2024
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-bold leading-tight mb-8 tracking-tight"
                        >
                            We build digital <br />
                            <span className="text-blue-600">experiences</span> that scale.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-neutral-500 mb-10 max-w-lg leading-relaxed"
                        >
                            Transform your brand with data-driven strategies and world-class design. We help ambitous companies grow faster.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                Start Your Project <ArrowRight size={20} />
                            </button>
                            <button className="px-8 py-4 rounded-full font-bold text-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                                View Case Studies
                            </button>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-neutral-100 rounded-[2.5rem] overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
                                alt="Team meeting"
                                className="w-full h-full object-cover"
                            />
                            {/* Floating Stats Card */}
                            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <BarChart size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500">Revenue Growth</p>
                                        <p className="text-xl font-bold">+245%</p>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="w-[75%] h-full bg-green-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Logo Cloud */}
            <section className="py-12 border-y border-neutral-100 bg-neutral-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-neutral-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Intercom', 'Descript', 'Notion', 'Grammarly', 'Linear'].map(brand => (
                            <span key={brand} className="text-2xl font-bold text-neutral-800">{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-bold mb-6">Full-service capabilities</h2>
                        <p className="text-xl text-neutral-500">We don't just build websites. We build comprehensive digital solutions that solve real business problems.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Globe, title: "Web Development", desc: "Blazing fast web apps built with Next.js and React." },
                            { icon: Zap, title: "Brand Strategy", desc: "Positioning your brand to stand out in a crowded market." },
                            { icon: Users, title: "Marketing", desc: "Data-driven campaigns that drive actual conversions." }
                        ].map((service, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all border border-neutral-100 group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-neutral-500 leading-relaxed mb-6">{service.desc}</p>
                                <a href="#" className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                                    Learn More <ArrowRight size={18} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-neutral-900 rounded-[3rem] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 px-6 py-24 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to scale your business?</h2>
                        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
                            Join 500+ companies that trust AgencyPro with their digital transformation.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                                Get Started Now
                            </button>
                            <button className="text-white px-8 py-4 rounded-full font-bold text-lg border border-neutral-700 hover:bg-neutral-800 transition-colors w-full sm:w-auto">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-neutral-100 py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">A</div>
                            <span className="text-lg font-bold">AgencyPro</span>
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Building the future of digital experiences for brands that dare to be different.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-blue-600">About</a></li>
                            <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                            <li><a href="#" className="hover:text-blue-600">Newsletter</a></li>
                            <li><a href="#" className="hover:text-blue-600">Events</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-blue-600">Terms</a></li>
                            <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                            <li><a href="#" className="hover:text-blue-600">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-400">
                    <p>&copy; 2024 AgencyPro Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neutral-900">Twitter</a>
                        <a href="#" className="hover:text-neutral-900">LinkedIn</a>
                        <a href="#" className="hover:text-neutral-900">Instagram</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AgencyDemo;
