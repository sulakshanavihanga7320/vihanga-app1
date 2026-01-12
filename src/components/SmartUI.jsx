import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border border-indigo-500/50"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] rounded-full bg-indigo-500"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.2 }}
            />
        </>
    );
};

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-[10000]"
            style={{ scaleX }}
        />
    );
};

const BackToTop = () => {
    const [show, setShow] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-28 right-8 z-[49] w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-indigo-400 shadow-2xl hover:bg-neutral-800 transition-colors group"
                >
                    <svg className="w-full h-full absolute inset-0 -rotate-90">
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            className="text-neutral-800"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="transparent"
                            strokeDasharray="125.66"
                            style={{ pathLength: scrollYProgress }}
                            className="text-indigo-500"
                        />
                    </svg>
                    <motion.span
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ↑
                    </motion.span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export const SmartUI = () => {
    return (
        <>
            <CustomCursor />
            <ScrollProgress />
            <BackToTop />
        </>
    );
};
