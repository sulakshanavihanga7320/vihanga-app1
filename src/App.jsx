import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Code2, Zap, BookOpen, MessageSquare, ChevronDown } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EcommerceProject from './pages/EcommerceProject';
import TaskManagerProject from './pages/TaskManagerProject';
import WeatherProject from './pages/WeatherProject';
import GameProject from './pages/GameProject';
import AppProject from './pages/AppProject';
import FilmProject from './pages/FilmProject';
import TemplateStore from './pages/TemplateStore';
import PreviewFrame from './pages/PreviewFrame';
import Lessons from './pages/Lessons';
import LessonView from './pages/LessonView';
import LiveSessions from './pages/LiveSessions';
import ChatWidget from './components/ChatWidget';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { SiteContentProvider } from './context/SiteContentContext';
import EcommerceDemo from './demos/EcommerceDemo';
import TaskManagerDemo from './demos/TaskManagerDemo';
import WeatherDemo from './demos/WeatherDemo';
import GameDemo from './demos/GameDemo';
import AppDemo from './demos/AppDemo';
import FilmDemo from './demos/FilmDemo';
import AgencyDemo from './demos/AgencyDemo';
import SaasDemo from './demos/SaasDemo';
import { SmartUI } from './components/SmartUI';
import CommandPalette from './components/CommandPalette';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import VideoAccess from './pages/VideoAccess';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserProfile from './pages/UserProfile';
import UserProtectedRoute from './components/UserProtectedRoute';

// Portfolio Components
const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="hero" className="min-h-screen relative overflow-hidden bg-dark-900 flex items-center justify-center pt-24">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <motion.div
                className="relative z-10 text-center max-w-4xl px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    Software Engineer & Developer
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl mx-auto"
                >
                    Building stunning digital experiences with React, Three.js, and cutting-edge web technologies
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
                >
                    <button className="glass-button glass-button-primary">
                        <MessageSquare className="w-5 h-5" />
                        Hire Me
                    </button>
                    <button className="glass-button glass-button-secondary">
                        <Download className="w-5 h-5" />
                        Download Extensions
                    </button>
                </motion.div>

                {/* 3D Scene Placeholder */}
                <motion.div
                    variants={itemVariants}
                    className="relative h-96 rounded-2xl glass-card overflow-hidden mt-16"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Code2 className="w-24 h-24 text-primary-500/50 mx-auto mb-4" />
                            <p className="text-neutral-400">3D Spline Scene Placeholder</p>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-16"
                >
                    <ChevronDown className="w-8 h-8 text-primary-400 mx-auto" />
                </motion.div>
            </motion.div>
        </section>
    );
};

const LessonsSection = () => {
    const lessons = [
        {
            id: 1,
            title: "React Hooks Mastery",
            category: "React",
            difficulty: "Intermediate",
            thumbnail: "📚"
        },
        {
            id: 2,
            title: "Tailwind CSS Advanced",
            category: "CSS",
            difficulty: "Beginner",
            thumbnail: "🎨"
        },
        {
            id: 3,
            title: "3D Web with Three.js",
            category: "3D Graphics",
            difficulty: "Advanced",
            thumbnail: "🎯"
        },
        {
            id: 4,
            title: "State Management with Redux",
            category: "React",
            difficulty: "Intermediate",
            thumbnail: "⚙️"
        },
        {
            id: 5,
            title: "Framer Motion Animations",
            category: "Animation",
            difficulty: "Intermediate",
            thumbnail: "✨"
        },
        {
            id: 6,
            title: "Web Performance Optimization",
            category: "Performance",
            difficulty: "Advanced",
            thumbnail: "⚡"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="lessons" className="py-24 px-6 bg-dark-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                        Coding Lessons
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Master modern web development with comprehensive, hands-on lessons
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {lessons.map((lesson) => (
                        <motion.div
                            key={lesson.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="glass-card group overflow-hidden cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="h-40 bg-gradient-to-br from-primary-500/10 to-blue-500/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                                {lesson.thumbnail}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs font-semibold text-primary-400 bg-primary-500/20 px-3 py-1 rounded-full">
                                        {lesson.category}
                                    </span>
                                    <span className="text-xs font-semibold text-neutral-400 bg-neutral-800 px-3 py-1 rounded-full">
                                        {lesson.difficulty}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                                    {lesson.title}
                                </h3>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="glass-button glass-button-primary w-full"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Start Learning
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ServicesSection = () => {
    const services = [
        {
            id: 1,
            title: "Startup Web Development",
            price: "$2,999",
            description: "Perfect for new businesses needing a strong online presence",
            features: ["Responsive Design", "SEO Optimized", "3-4 pages", "Email Integration"]
        },
        {
            id: 2,
            title: "Professional Portfolio",
            price: "$1,999",
            description: "Showcase your work with an impressive portfolio site",
            features: ["Custom Design", "Project Showcase", "Contact Form", "Analytics"]
        },
        {
            id: 3,
            title: "E-Commerce Platform",
            price: "$4,999",
            description: "Full-featured online store with payment integration",
            features: ["Product Management", "Payment Gateway", "Inventory System", "Admin Panel"]
        },
        {
            id: 4,
            title: "Web App Development",
            price: "$5,999",
            description: "Complex web applications with advanced features",
            features: ["Full Stack Dev", "Database Design", "Real-time Features", "API Development"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="services" className="py-24 px-6 bg-dark-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                        Services & Packages
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Professional web development packages tailored to your needs
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{ y: -12, transition: { duration: 0.3 } }}
                            className={`glass-card p-8 flex flex-col h-full ${
                                service.id === 3 ? 'lg:scale-105 ring-2 ring-primary-500' : ''
                            }`}
                        >
                            {service.id === 3 && (
                                <div className="mb-4 inline-block">
                                    <span className="text-xs font-bold text-white bg-gradient-to-r from-primary-500 to-blue-500 px-4 py-2 rounded-full">
                                        POPULAR
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-white mb-2">
                                {service.title}
                            </h3>

                            <div className="mb-4">
                                <span className="text-3xl font-bold text-primary-400">
                                    {service.price}
                                </span>
                            </div>

                            <p className="text-neutral-400 text-sm mb-6 flex-grow">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300">
                                        <Zap className="w-4 h-4 text-primary-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`glass-button w-full ${
                                    service.id === 3
                                        ? 'glass-button-primary'
                                        : 'glass-button-secondary'
                                }`}
                            >
                                Request Order
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ExtensionsSection = () => {
    const extensions = [
        {
            id: 1,
            name: "React DevTools Pro",
            description: "Advanced debugging and profiling for React apps",
            downloads: 15420,
            icon: "⚛️"
        },
        {
            id: 2,
            name: "Tailwind CSS IntelliSense+",
            description: "Ultimate autocomplete for Tailwind CSS",
            downloads: 28950,
            icon: "🎨"
        },
        {
            id: 3,
            name: "3D Viewport Preview",
            description: "Real-time 3D preview for web components",
            downloads: 9850,
            icon: "🎯"
        },
        {
            id: 4,
            name: "API Mock Server",
            description: "Quick API mocking for development",
            downloads: 12340,
            icon: "🔌"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="extensions" className="py-24 px-6 bg-dark-900">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                        Custom Extensions
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Download my custom-built extensions to boost your development workflow
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {extensions.map((ext) => (
                        <motion.div
                            key={ext.id}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="glass-card p-8 flex flex-col md:flex-row items-start gap-6 group cursor-pointer"
                        >
                            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                {ext.icon}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                    {ext.name}
                                </h3>
                                <p className="text-neutral-400 text-sm mb-4">
                                    {ext.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                        <Download className="w-4 h-4 text-primary-400" />
                                        <span className="font-semibold text-white">{ext.downloads.toLocaleString()}</span>
                                        <span>downloads</span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="glass-button glass-button-primary flex-shrink-0"
                            >
                                <Download className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

function App() {
    return (
        <SiteContentProvider>
            <Router>
                <div className="min-h-screen font-sans bg-dark-900 text-neutral-100">
                    <SmartUI />
                    <CommandPalette />
                    <Navbar />

                    <Routes>
                        <Route path="/login" element={<UserLogin />} />
                        <Route path="/signup" element={<UserSignup />} />

                        <Route path="/" element={
                            <UserProtectedRoute>
                                <div>
                                    <HeroSection />
                                    <LessonsSection />
                                    <ServicesSection />
                                    <ExtensionsSection />
                                </div>
                            </UserProtectedRoute>
                        } />
                        <Route path="/profile" element={<UserProtectedRoute><UserProfile /></UserProtectedRoute>} />
                        <Route path="/store" element={<UserProtectedRoute><TemplateStore /></UserProtectedRoute>} />
                        <Route path="/lessons" element={<UserProtectedRoute><Lessons /></UserProtectedRoute>} />
                        <Route path="/lessons/:id" element={<UserProtectedRoute><LessonView /></UserProtectedRoute>} />
                        <Route path="/live" element={<UserProtectedRoute><LiveSessions /></UserProtectedRoute>} />
                        <Route path="/preview/:id" element={<UserProtectedRoute><PreviewFrame /></UserProtectedRoute>} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Project Detail Pages */}
                        <Route path="/projects/ecommerce" element={<UserProtectedRoute><EcommerceProject /></UserProtectedRoute>} />
                        <Route path="/projects/taskmanager" element={<UserProtectedRoute><TaskManagerProject /></UserProtectedRoute>} />
                        <Route path="/projects/weather" element={<UserProtectedRoute><WeatherProject /></UserProtectedRoute>} />
                        <Route path="/projects/game" element={<UserProtectedRoute><GameProject /></UserProtectedRoute>} />
                        <Route path="/projects/app" element={<UserProtectedRoute><AppProject /></UserProtectedRoute>} />
                        <Route path="/projects/film" element={<UserProtectedRoute><FilmProject /></UserProtectedRoute>} />

                        {/* Interactive Demos */}
                        <Route path="/demo/ecommerce" element={<UserProtectedRoute><EcommerceDemo /></UserProtectedRoute>} />
                        <Route path="/demo/taskmanager" element={<UserProtectedRoute><TaskManagerDemo /></UserProtectedRoute>} />
                        <Route path="/demo/weather" element={<UserProtectedRoute><WeatherDemo /></UserProtectedRoute>} />
                        <Route path="/demo/game" element={<UserProtectedRoute><GameDemo /></UserProtectedRoute>} />
                        <Route path="/demo/app" element={<UserProtectedRoute><AppDemo /></UserProtectedRoute>} />
                        <Route path="/demo/film" element={<UserProtectedRoute><FilmDemo /></UserProtectedRoute>} />
                        <Route path="/demo/agency" element={<UserProtectedRoute><AgencyDemo /></UserProtectedRoute>} />
                        <Route path="/demo/saas" element={<UserProtectedRoute><SaasDemo /></UserProtectedRoute>} />

                        {/* Legal Routes */}
                        <Route path="/privacy" element={<UserProtectedRoute><PrivacyPolicy /></UserProtectedRoute>} />
                        <Route path="/terms" element={<UserProtectedRoute><TermsOfService /></UserProtectedRoute>} />
                        <Route path="/video-access" element={<UserProtectedRoute><VideoAccess /></UserProtectedRoute>} />
                    </Routes>
                    <Footer />
                    <ChatWidget />
                </div>
            </Router>
        </SiteContentProvider>
    );
}

export default App;
