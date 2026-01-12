import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, BarChart3, Globe, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const SaasDemo = () => {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        NexusKit
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Docs</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign in</button>
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-20 pb-32 px-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-white to-white pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8 border border-indigo-100"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v2.0 is now live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight"
                    >
                        Ship your startup <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">in days, not months.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        The ultimate boilerplate for building production-ready SaaS applications.
                        Authentication, database, payments, and dashboard—all pre-configured.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 w-full sm:w-auto justify-center">
                            Deploy Now <ChevronRight size={20} />
                        </button>
                        <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
                            <Play size={18} fill="currentColor" /> Watch Demo
                        </button>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-6xl mx-auto mt-20 relative"
                >
                    <div className="absolute inset-0 bg-indigo-600 rounded-2xl blur-3xl opacity-10 transform translate-y-4" />
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="w-full max-w-sm mx-auto bg-slate-800/50 rounded-md h-6" />
                        </div>
                        <div className="relative aspect-[16/9] bg-slate-900">
                            {/* Mock UI Content */}
                            <div className="p-8 grid grid-cols-12 gap-6 h-full text-slate-300">
                                <div className="col-span-3 border-r border-slate-800 pr-6 space-y-4">
                                    <div className="h-8 w-32 bg-slate-800 rounded mb-8" />
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-full bg-slate-800/50 rounded" />)}
                                </div>
                                <div className="col-span-9 space-y-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="h-8 w-48 bg-slate-800 rounded" />
                                        <div className="h-8 w-24 bg-indigo-600/20 rounded border border-indigo-500/30" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-32 bg-slate-800/30 rounded-xl border border-slate-800 p-4">
                                                <div className="h-8 w-8 bg-indigo-500/20 rounded-lg mb-4" />
                                                <div className="h-4 w-24 bg-slate-700 rounded mb-2" />
                                                <div className="h-6 w-16 bg-slate-600 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-64 bg-slate-800/20 rounded-xl border border-slate-800 w-full flex items-end p-6 gap-4">
                                        {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75].map((h, i) => (
                                            <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500 transition-colors rounded-t-lg" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to launch</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Don't reinvent the wheel. We've included all the essential features you need to build a profitable SaaS business.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Authentication", desc: "Secure user signup/login w/ diverse providers." },
                            { icon: Globe, title: "Database", desc: "PostgreSQL fully integrated with Prisma ORM." },
                            { icon: BarChart3, title: "Analytics", desc: "Real-time dashboard and tracking built-in." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-20 px-6 border-b border-slate-100">
                <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-12 text-slate-400 font-semibold text-lg">
                    <div className="text-slate-900">TRUSTED BY 500+ FOUNDERS</div>
                    <span>Stripe</span>
                    <span>Vercel</span>
                    <span>Supabase</span>
                    <span>OpenAI</span>
                    <span>React</span>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center text-4xl font-bold text-slate-900 mb-16">Simple, transparent pricing</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: "Starter", price: "0", desc: "Perfect for hobby projects" },
                            { name: "Pro", price: "49", desc: "For serious founders", popular: true },
                            { name: "Team", price: "199", desc: "Scale your business" }
                        ].map((plan, i) => (
                            <div key={i} className={`rounded-2xl p-8 border ${plan.popular ? 'border-indigo-600 shadow-xl relative' : 'border-slate-200'}`}>
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <p className="text-slate-500 mb-8 text-sm">{plan.desc}</p>
                                <ul className="space-y-4 mb-8">
                                    {[1, 2, 3, 4].map(k => (
                                        <li key={k} className="flex items-center gap-3 text-sm text-slate-600">
                                            <Check size={16} className="text-green-500" /> Feature included
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-lg font-bold transition-colors ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                                    Choose {plan.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-slate-50 py-12 px-6 border-t border-slate-200">
                <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
                    <p>&copy; 2024 NexusKit. Built with React & Tailwind.</p>
                </div>
            </footer>
        </div>
    );
};

export default SaasDemo;
