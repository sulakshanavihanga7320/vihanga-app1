import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContentContext = createContext();

const languageOptions = ['en', 'si', 'ta'];

const translations = {
    en: {
        navbar: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            store: 'Store',
            lessons: 'Lessons',
            live: 'Live',
            contact: 'Contact',
            contactCta: 'Initiate Contact',
        },
        hero: {
            title: 'Vihanga Board',
            subtitle: 'I build high-performance games, mobile apps, and professional websites with cutting-edge technology.',
            cta: 'Explore My Work',
            contactButton: 'Contact Me',
        },
        contact: {
            badge: 'Get in Touch',
            titleLine1: "Let's Build Something",
            titleHighlight: 'Extraordinary.',
            description: "Have a project idea? I'm available for freelance work and open to discussing new opportunities. Let's turn your vision into a reality.",
            locationLabel: 'Location',
            locationValue: 'Mahavilachchiya, Anuradhapura, Sri Lanka',
            submitCta: 'Send Request',
        },
    },
    si: {
        navbar: {
            home: 'මුල් පිටුව',
            about: 'මාව ගැන',
            skills: 'කුසලතා',
            projects: 'ව්‍යාපෘති',
            store: 'ගබඩාව',
            lessons: 'පාඩම්',
            live: 'සජීවී',
            contact: 'සම්බන්ධ වන්න',
            contactCta: 'සම්බන්ධ වන්න',
        },
        hero: {
            title: 'විහංගා බෝර්ඩ්',
            subtitle: 'මම ඉහළ කාර්ය සාධන ගේම්, ජංගම යෙදුම් සහ වෘත්තීය වෙබ් අඩවි නිර්මාණය කරනවා.',
            cta: 'මගේ වැඩ බැලීම',
            contactButton: 'මාව අමතන්න',
        },
        contact: {
            badge: 'සම්බන්ධ වන්න',
            titleLine1: 'ඔබගේ ව්‍යාපෘතිය',
            titleHighlight: 'එක්කට ගොඩ නගමු.',
            description: 'ඔබට ව්‍යාපෘති අදහසක් තිබේ නම්, මම ෆ්‍රීලෑන්ස් වැඩ සඳහා සහය ලබා දීමට Siddhaයි.',
            locationLabel: 'ස්ථානය',
            locationValue: 'මහවිලච්චිය, අනුරාධපුර, ශ්‍රී ලංකා',
            submitCta: 'ඉල්ලීම යවන්න',
        },
    },
    ta: {
        navbar: {
            home: 'முகப்பு',
            about: 'என்னை பற்றி',
            skills: 'திறன்கள்',
            projects: 'திட்டங்கள்',
            store: 'கடை',
            lessons: 'பாடங்கள்',
            live: 'நேரலை',
            contact: 'தொடர்பு',
            contactCta: 'தொடர்பு கொள்ளவும்',
        },
        hero: {
            title: 'விஹங்கா போர்ட்',
            subtitle: 'நான் உயர்தர விளையாட்டுகள், மொபைல் ஆப்கள் மற்றும் தொழில்முறை வலைத்தளங்களை உருவாக்குகிறேன்.',
            cta: 'என் பணிகளை பார்க்க',
            contactButton: 'என்னை தொடர்பு கொள்ளுங்கள்',
        },
        contact: {
            badge: 'தொடர்பு கொள்ளவும்',
            titleLine1: 'நாம் சேர்ந்து ஒரு',
            titleHighlight: 'சிறப்பு திட்டத்தை உருவாக்கலாம்.',
            description: 'ஒரு திட்ட யோசனை உள்ளதா? நான் ஃப்ரீலான்ஸ் பணிகளுக்கு தயார்.',
            locationLabel: 'இருப்பிடம்',
            locationValue: 'மகாவிலச்சிய, அனுராதபுரம், இலங்கை',
            submitCta: 'கோரிக்கையை அனுப்பவும்',
        },
    },
};

export const useSiteContent = () => useContext(SiteContentContext);

export const SiteContentProvider = ({ children }) => {
    // Default Data (Fallback)
    const defaultContent = {
        hero: {
            title: "Vihanga Board",
            subtitle: "I build high-performance games, mobile apps, and professional websites with cutting-edge technology.",
            cta: "Explore My Work"
        },
        about: {
            title: "About Me",
            paragraphs: [
                "As a dedicated software engineer, I thrive on turning complex problems into elegant concepts. My journey began with a curiosity for how things work on the web, which has evolved into a professional career building robust applications.",
                "I focus on delivering high-quality code that is both maintainable and performant. Whether it's front-end polish or back-end logic, I ensure every layer of the application is built with precision.",
                "When I'm not coding, you can find me staying updated with the latest tech trends, contributing to developer communities, or exploring new digital tools."
            ],
            image: "/assets/about-me.jpg"
        },
        skills: [
            { name: "JavaScript", level: "Advanced" },
            { name: "React.js", level: "Advanced" },
            { name: "Node.js", level: "Intermediate" },
            { name: "TypeScript", level: "Intermediate" },
            { name: "TailwindCSS", level: "Advanced" },
            { name: "Git & GitHub", level: "Advanced" },
            { name: "SQL", level: "Intermediate" },
            { name: "Next.js", level: "Intermediate" },
        ],
        services: [
            {
                id: 1,
                title: "Game Development",
                description: "Immersive 2D & 3D gaming experiences built with Unity and modern web technologies.",
                icon: "Gamepad2",
                gradient: "from-purple-500 to-indigo-500"
            },
            {
                id: 2,
                title: "App Development",
                description: "High-performance iOS and Android mobile applications designed for growth.",
                icon: "Smartphone",
                gradient: "from-blue-500 to-cyan-500"
            },
            {
                id: 3,
                title: "Professional Websites",
                description: "Corporate and personal brand websites that leave a lasting impression.",
                icon: "Monitor",
                gradient: "from-emerald-500 to-teal-500"
            }
        ],
        projects: [
            {
                id: 1,
                title: "E-Commerce Platform",
                category: "Full Stack",
                image: "/images/project1.png",
                detailUrl: "/projects/ecommerce",
                description: "A complete online store with cart, checkout, and admin dashboard.",
                tags: ["React", "Redux", "Node.js", "Stripe"]
            },
            {
                id: 2,
                title: "Task Management App",
                category: "Productivity",
                image: "/images/project2.png",
                detailUrl: "/projects/taskmanager",
                description: "Streamlined collaboration platform for teams to manage workflows efficiently.",
                tags: ["Next.js", "TypeScript", "Prisma"]
            },
            {
                id: 3,
                title: "Weather Dashboard",
                category: "Data Visualization",
                image: "/images/project3.png",
                detailUrl: "/projects/weather",
                description: "Real-time weather insights and interactive forecasts using dynamic APIs.",
                tags: ["Vue.js", "TailwindCSS", "API"]
            },
            {
                id: 4,
                title: "Neon Drifter",
                category: "Game Dev",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
                detailUrl: "/projects/game",
                description: "Cyberpunk racing experience built with Unity WebGL and procedural generation.",
                tags: ["Unity", "WebGL", "C#"]
            },
            {
                id: 5,
                title: "FitTrack Pro",
                category: "Mobile App",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
                detailUrl: "/projects/app",
                description: "Advanced biometric tracking and workout planner for fitness enthusiasts.",
                tags: ["React Native", "Firebase"]
            },
            {
                id: 6,
                title: "Cinematic Reel",
                category: "Media Arts",
                image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
                detailUrl: "/projects/film",
                description: "Premium showcase for filmmakers with high-fidelity video playback.",
                tags: ["Nuxt", "Sanity", "Vue.js"]
            }
        ],
        lessons: [
            {
                id: 1,
                title: "React Hooks Masterclass",
                desc: "Learn `useState`, `useEffect` and custom hooks from scratch.",
                level: "Beginner",
                duration: "45 min",
                color: "from-blue-500 to-cyan-500",
                tags: ["React", "Hooks"],
                rating: 4.9,
                price: 0,
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                isLive: false,
                meetingLink: ""
            },
            {
                id: 2,
                title: "Live Q&A: Web Architecture",
                desc: "Join me live to discuss scalable web architectures and best practices.",
                level: "Advanced",
                duration: "1h",
                color: "from-purple-500 to-indigo-500",
                tags: ["Architecture", "Live"],
                rating: 5.0,
                price: 0,
                videoUrl: "",
                isLive: true,
                meetingLink: "https://zoom.us/j/your-link"
            }
        ],
        messages: [],
        orders: []
    };

    // Language state (for English, Sinhala, Tamil)
    const [language, setLanguage] = useState(() => {
        try {
            const savedLang = localStorage.getItem('language') || 'en';
            return translations[savedLang] ? savedLang : 'en';
        } catch (e) {
            console.error('Failed to read language from localStorage', e);
            return 'en';
        }
    });

    // Site content state initialized from localStorage or default
    const [content, setContent] = useState(() => {
        try {
            const saved = localStorage.getItem('siteContent');
            if (saved) {
                const parsed = JSON.parse(saved);
                return {
                    ...defaultContent,
                    ...parsed,
                    messages: parsed.messages || [],
                    orders: parsed.orders || []
                };
            }
        } catch (e) {
            console.error("Failed to parse siteContent", e);
        }
        return defaultContent;
    });

    // Persist language
    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch (e) {
            console.error('Failed to save language to localStorage', e);
        }
    }, [language]);

    // Save content to localStorage on change
    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(content));
    }, [content]);

    // Update functions
    const updateHero = (newHero) => {
        setContent(prev => ({ ...prev, hero: { ...prev.hero, ...newHero } }));
    };

    const updateAbout = (newAbout) => {
        setContent(prev => ({ ...prev, about: { ...prev.about, ...newAbout } }));
    };

    const updateSkills = (newSkills) => {
        setContent(prev => ({ ...prev, skills: newSkills }));
    };

    const updateServices = (newServices) => {
        setContent(prev => ({ ...prev, services: newServices }));
    };

    const updateProjects = (newProjects) => {
        setContent(prev => ({ ...prev, projects: newProjects }));
    };

    const updateLessons = (newLessons) => {
        setContent(prev => ({ ...prev, lessons: newLessons }));
    };

    // New: Messaging Functions
    const addMessage = (msg) => {
        setContent(prev => ({
            ...prev,
            messages: [...(prev.messages || []), { ...msg, timestamp: new Date().toISOString() }]
        }));
    };

    const replyToMessage = (id, replyText) => {
        setContent(prev => ({
            ...prev,
            messages: (prev.messages || []).map(m =>
                m.id === id ? { ...m, replies: [...(m.replies || []), { text: replyText, sender: 'admin', timestamp: new Date().toISOString() }] } : m
            )
        }));
    };

    // New: Order Functions
    const addOrder = (order) => {
        setContent(prev => ({
            ...prev,
            orders: [...(prev.orders || []), { ...order, id: Date.now(), timestamp: new Date().toISOString(), status: 'pending' }]
        }));
    };

    const updateOrderStatus = (id, status) => {
        setContent(prev => ({
            ...prev,
            orders: (prev.orders || []).map(o => o.id === id ? { ...o, status } : o)
        }));
    };

    const updateContent = (newContent) => {
        setContent(newContent);
    };

    const t = (path, fallback) => {
        if (!path) return fallback || '';
        const segments = path.split('.');
        let value = translations[language];
        segments.forEach(seg => {
            if (value && typeof value === 'object') {
                value = value[seg];
            }
        });

        if (value == null) {
            let enValue = translations.en;
            segments.forEach(seg => {
                if (enValue && typeof enValue === 'object') {
                    enValue = enValue[seg];
                }
            });
            return enValue != null ? enValue : (fallback !== undefined ? fallback : path);
        }

        return value;
    };

    return (
        <SiteContentContext.Provider value={{
            content,
            updateHero,
            updateAbout,
            updateSkills,
            updateServices,
            updateProjects,
            updateLessons,
            addMessage,
            replyToMessage,
            addOrder,
            updateOrderStatus,
            updateContent,
            language,
            setLanguage,
            t,
        }}>
            {children}
        </SiteContentContext.Provider>
    );
};
