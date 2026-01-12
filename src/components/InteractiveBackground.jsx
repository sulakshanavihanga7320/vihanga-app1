import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(mousePosition.x, springConfig);
    const mouseY = useSpring(mousePosition.y, springConfig);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Base Gradient */}
            <div className="absolute inset-0 bg-neutral-950" />

            {/* Large Animated Blobs (Parallax + Depth) */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"
            />
            <motion.div
                style={{ x: useTransform(mouseX, x => x * -0.8), y: useTransform(mouseY, y => y * -0.8) }}
                className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[140px]"
            />
            <motion.div
                style={{ x: useTransform(mouseX, x => x * 1.5), y: useTransform(mouseY, y => y * 1.5) }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px]"
            />

            {/* Glassmorphic Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.3 + 0.1
                    }}
                    animate={{
                        y: [null, "-20%", "20%"],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: Math.random() * 100 + 50,
                        height: Math.random() * 100 + 50,
                        x: useTransform(mouseX, x => x * (Math.random() * 2 - 1)),
                        y: useTransform(mouseY, y => y * (Math.random() * 2 - 1)),
                    }}
                    className="absolute bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm"
                />
            ))}

            {/* Grid Overlay for 3D sense */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 30%, transparent 100%)',
                    opacity: 0.1
                }}
            />
        </div>
    );
};

export default InteractiveBackground;
