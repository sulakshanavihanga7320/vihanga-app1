import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, User, LogOut, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useSiteContent();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(localStorage.getItem('isUserAuthenticated') === 'true');

    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === 'isUserAuthenticated') {
                setIsUserAuthenticated(event.newValue === 'true');
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isUserAuthenticated');
        localStorage.removeItem('userProfile');
        setIsUserAuthenticated(false);
        navigate('/login');
    };

    const handleNavigation = (e, href) => {
        if (href.startsWith('/')) {
            setIsOpen(false);
            return;
        }

        e.preventDefault();
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Floating Glassmorphic Navbar */}
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="navbar-float"
            >
                <div className="flex items-center justify-between w-full gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                        <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                        >
                            <Sparkles size={20} className="text-white" />
                        </motion.div>
                        <span className="font-outfit text-white font-bold text-lg tracking-tight hidden sm:inline">VIHANGA</span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                whileHover={{ y: -2 }}
                                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {isUserAuthenticated ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/profile')}
                                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-colors"
                                    title="Profile"
                                >
                                    <User size={18} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/login')}
                                    className="hidden sm:block px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                                >
                                    Sign In
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/signup')}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                >
                                    <span className="hidden sm:inline">Get Started</span>
                                    <ArrowRight size={16} />
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg bg-white/10 text-white"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 mt-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden md:hidden w-96"
                        >
                            <div className="flex flex-col p-4 gap-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavigation(e, link.href)}
                                        className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="border-t border-white/10 mt-2 pt-2 flex flex-col gap-2">
                                    {!isUserAuthenticated && (
                                        <>
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="w-full px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors text-left"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                onClick={() => navigate('/signup')}
                                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                                            >
                                                Get Started
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer */}
            <div className="h-20" />
        </>
    );
};

export default Navbar;
