import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, User, LogOut, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { language, setLanguage, t } = useSiteContent();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(localStorage.getItem('isUserAuthenticated') === 'true');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        { name: t('navbar.home'), href: '#home' },
        { name: t('navbar.about'), href: '#about' },
        { name: t('navbar.skills'), href: '#skills' },
        { name: t('navbar.projects'), href: '#projects' },
        { name: t('navbar.contact'), href: '#contact' },
    ];
        { name: t('navbar.store'), href: '/store', icon: '🛍️' },
        { name: t('navbar.lessons'), href: '/lessons', icon: '📖' },
        { name: t('navbar.live'), href: '/live', icon: '🔴' },
        { name: t('navbar.contact'), href: '#contact', icon: '✉️' },
    ];

    return (
        <>
            {/* Background Glow Effect */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-gradient-to-b from-indigo-500/5 via-purple-500/5 to-transparent blur-3xl pointer-events-none z-[99]" />
            
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
                scrolled ? 'py-3' : 'py-6'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className={`relative transition-all duration-700 ${
                            scrolled 
                                ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/10' 
                                : 'bg-black/40 backdrop-blur-md border border-white/5'
                        } rounded-2xl overflow-hidden`}
                        layout
                    >
                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative flex items-center justify-between px-3 py-2">
                            {/* Left Section: Status + Logo */}
                            <div className="flex items-center gap-2">
                                {/* Online/Offline Status Badge */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]"
                                >
                                    <div className="relative flex items-center gap-1.5">
                                        {isOnline && (
                                            <span className="absolute flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            </span>
                                        )}
                                        <motion.div
                                            animate={{
                                                scale: isOnline ? [1, 1.2, 1] : 1,
                                                backgroundColor: isOnline ? '#10b981' : '#ef4444'
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: isOnline ? Infinity : 0,
                                                repeatType: 'reverse'
                                            }}
                                            className={`relative w-2 h-2 rounded-full ${
                                                isOnline ? 'bg-emerald-500' : 'bg-red-500'
                                            }`}
                                        />
                                        <span className={`text-[8px] font-bold uppercase ${
                                            isOnline ? 'text-emerald-400' : 'text-red-400'
                                        }`}>
                                            {isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Logo Section */}
                                <Link to="/" className="flex items-center gap-2 group">
                                    <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <Terminal size={14} className="text-white" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-base font-black tracking-tight text-white">VIHANGA</span>
                                </Link>
                            </div>

                            {/* Center: Navigation */}
                            <div className="flex items-center">
                                <div className="flex items-center gap-0.5 bg-white/[0.02] rounded-lg p-0.5 border border-white/[0.05]">
                                    {navLinks.map((link, index) => {
                                        const isActive = location.pathname === link.href || (location.pathname === '/' && link.href === '#home');
                                        return (
                                            <Link
                                                key={link.name}
                                                to={link.href.startsWith('/') ? link.href : '/'}
                                                onClick={(e) => !link.href.startsWith('/') && handleNavigation(e, link.href)}
                                                onMouseEnter={() => setHoveredLink(index)}
                                                onMouseLeave={() => setHoveredLink(null)}
                                                className="relative"
                                            >
                                                <motion.div
                                                    className={`relative px-2 py-1.5 rounded-md transition-all duration-300 ${
                                                        isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                                                    }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="navBubble"
                                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-md"
                                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                        />
                                                    )}
                                                    {hoveredLink === index && !isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="absolute inset-0 bg-white/[0.05] rounded-md"
                                                        />
                                                    )}
                                                    <span className="relative z-10 flex items-center gap-1">
                                                        <span className="text-xs">{link.icon}</span>
                                                        <span className="text-[9px] font-bold uppercase tracking-wider">{link.name}</span>
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Section: User Controls */}
                            <div className="flex items-center gap-1.5">
                                {/* Language Switcher */}
                                <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                                    <Globe size={10} className="text-neutral-500" />
                                    {[
                                        { code: 'en', label: 'EN' },
                                        { code: 'si', label: 'සි' },
                                        { code: 'ta', label: 'த' },
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition-all ${
                                                language === lang.code
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                                    : 'text-neutral-500 hover:text-white'
                                            }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>

                                {/* User Profile & Logout */}
                                {isUserAuthenticated && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => navigate('/profile')}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-all"
                                        >
                                            <User size={11} />
                                            <span className="text-[8px] font-bold uppercase">Profile</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                                        >
                                            <LogOut size={11} />
                                            <span className="text-[8px] font-bold uppercase">Logout</span>
                                        </button>
                                    </div>
                                )}

                                {/* Search */}
                                <button
                                    onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
                                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-neutral-400 hover:text-white transition-all"
                                >
                                    <Search size={11} />
                                    <kbd className="text-[8px] font-mono text-neutral-500">⌘K</kbd>
                                </button>

                                {/* CTA Button */}
                                <a
                                    href="#contact"
                                    onClick={(e) => handleNavigation(e, '#contact')}
                                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[8px] font-bold uppercase tracking-wider"
                                >
                                    {t('navbar.contactCta')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
