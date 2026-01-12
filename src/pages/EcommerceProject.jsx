import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EcommerceProject = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        "Real-time Inventory Management",
        "Secure Payment Gateway Integration (Stripe)",
        "Admin Dashboard for Analytics",
        "User Authentication & Authorization",
        "Responsive Product Grid",
        "Cart & Wishlist Functionality"
    ];

    const stack = [
        { name: "React", type: "Frontend" },
        { name: "Node.js", type: "Backend" },
        { name: "MongoDB", type: "Database" },
        { name: "Redux", type: "State Management" },
        { name: "TailwindCSS", type: "Styling" }
    ];

    return (
        <div className="pt-24 min-h-screen bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="mr-2" size={20} /> Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <span className="text-primary-500 font-medium tracking-wide">Featured Project</span>
                    <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">E-Commerce Platform</h1>
                    <p className="mt-4 text-xl text-neutral-400 max-w-3xl">
                        A scalable, full-stack shopping application built to simulate a real-world digital marketplace experience.
                    </p>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl mb-16 aspect-video bg-neutral-900 relative group"
                >
                    <img src="/images/project1.png" alt="E-Commerce Dashboard" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                This project addresses the need for a customizable and performant online store.
                                Users can browse products with advanced filtering, manage their cart, and proceed through a secure checkout process.
                                Admins have a dedicated dashboard to manage products, orders, and view sales analytics.
                            </p>
                            <p className="text-neutral-400 leading-relaxed">
                                The architecture is built on the MERN stack, ensuring a unified JavaScript experience from database to client.
                                State management is handled efficiently with Redux Toolkit, minimizing unnecessary re-renders.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start bg-neutral-900/50 p-4 rounded-xl border border-neutral-800/50">
                                        <CheckCircle2 className="text-primary-500 mt-1 mr-3 flex-shrink-0" size={18} />
                                        <span className="text-neutral-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800">
                            <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {stack.map((tech) => (
                                    <span key={tech.name} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300 border border-neutral-700">
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-neutral-900/30 p-6 rounded-2xl border border-neutral-800">
                            <h3 className="text-lg font-bold text-white mb-4">Project Links</h3>
                            <div className="space-y-3">
                                <Link to="/demo/ecommerce" className="flex items-center justify-center w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors font-medium">
                                    <ExternalLink size={18} className="mr-2" /> Live Demo
                                </Link>
                                <a href="#" className="flex items-center justify-center w-full py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors font-medium">
                                    <Github size={18} className="mr-2" /> Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcommerceProject;
