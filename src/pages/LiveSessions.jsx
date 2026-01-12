import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell, Users, MessageSquare, Mic, Play, Video, Send, MoreVertical, ExternalLink } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const LiveSessions = () => {
    const { content } = useSiteContent();
    const liveSettings = content.liveSettings || {
        isLive: true,
        title: 'Community Coding Session: Q&A + Live Debugging',
        videoUrl: 'https://www.youtube.com/embed/HAAL_TATfvU',
        zoomLink: '',
        youtubeLink: 'https://www.youtube.com/live/HAAL_TATfvU',
        customLinks: []
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';

        let embed = url;

        try {
            if (url.includes('youtube.com') || url.includes('youtu.be')) {
                // Already an embed URL
                if (url.includes('/embed/')) {
                    embed = url;
                } else {
                    let videoId = '';

                    // Standard watch URL
                    if (url.includes('youtube.com/watch')) {
                        const parsed = new URL(url);
                        videoId = parsed.searchParams.get('v') || '';
                    }
                    // Shortened youtu.be URL
                    else if (url.includes('youtu.be/')) {
                        videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
                    }
                    // Live URL like youtube.com/live/VIDEO_ID
                    else if (url.includes('/live/')) {
                        videoId = url.split('/live/')[1].split(/[?&]/)[0];
                    }

                    if (videoId) {
                        embed = `https://www.youtube.com/embed/${videoId}`;
                    }
                }

                // Ensure autoplay/mute params for YouTube embeds
                if (embed.includes('youtube.com/embed')) {
                    const hasQuery = embed.includes('?');
                    const params = 'autoplay=1&mute=1&rel=0&modestbranding=1';
                    embed = hasQuery ? `${embed}&${params}` : `${embed}?${params}`;
                }
            }
        } catch (e) {
            console.error('Failed to build embed URL', e);
        }

        // Fallback: return processed or original URL
        return embed;
    };

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const [liveChatMessages, setLiveChatMessages] = useState([
        { id: 1, user: "Alex D.", text: "Can't wait for this!" },
        { id: 2, user: "Sarah M.", text: "Is the Zoom link pinned?" },
        { id: 3, user: "DevBot", text: "Welcome everyone! Feel free to ask questions." }
    ]);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [liveChatMessages]);

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (!chatMessage.trim()) return;

        setLiveChatMessages([...liveChatMessages, {
            id: Date.now(),
            user: "You",
            text: chatMessage
        }]);
        setChatMessage("");
    };

    const upcomingStreams = content.upcomingStreams || [
        {
            id: 1,
            title: "Building a SaaS from Scratch",
            date: "Tomorrow",
            time: "10:00 AM EST",
            topic: "Full Stack Dev",
            viewers: 120
        },
        {
            id: 2,
            title: "Advanced React Patterns",
            date: "Jan 12",
            time: "2:00 PM EST",
            topic: "React",
            viewers: 85
        },
        {
            id: 3,
            title: "UI/UX Design Review",
            date: "Jan 15",
            time: "11:00 AM EST",
            topic: "Design",
            viewers: 200
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
            {/* Hero / Live Player Area */}
            <div className="pt-24 pb-12 px-6 border-b border-neutral-800 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            {liveSettings.isLive && (
                                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded text-xs font-bold uppercase tracking-wider animate-pulse">
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                    Live Now
                                </div>
                            )}
                            <h1 className="text-xl font-bold text-neutral-300">{liveSettings.title}</h1>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {liveSettings.zoomLink && (
                                <a
                                    href={liveSettings.zoomLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                                >
                                    <Video size={18} /> Join via Zoom
                                </a>
                            )}
                            {liveSettings.youtubeLink && (
                                <a
                                    href={liveSettings.youtubeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-black px-5 py-2 rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2"
                                >
                                    <Play size={18} fill="currentColor" /> YouTube
                                </a>
                            )}
                            {liveSettings.customLinks?.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full font-bold transition-all flex items-center gap-2"
                                >
                                    <ExternalLink size={18} /> {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-6 h-[600px] lg:h-[500px]">
                        {/* Video Player Main */}
                        <div className="lg:col-span-3 bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative group h-full">
                            {liveSettings.isLive && liveSettings.videoUrl ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={getEmbedUrl(liveSettings.videoUrl)}
                                    title="Live Stream"
                                    className="w-full h-full object-cover"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                                    <div className="text-center">
                                        <Video size={64} className="mx-auto mb-4 text-neutral-700" />
                                        <p className="text-neutral-500 font-bold">
                                            {liveSettings.isLive ? 'No live stream URL configured yet' : 'No live stream active'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Live Chat Sidebar */}
                        <div className="lg:col-span-1 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col h-full overflow-hidden">
                            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-800/50">
                                <h3 className="font-bold text-sm text-neutral-300">Live Chat</h3>
                                <MoreVertical size={16} className="text-neutral-500" />
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700">
                                {liveChatMessages.map((msg) => (
                                    <div key={msg.id} className="text-sm">
                                        <span className={`font-bold mr-2 ${msg.user === 'You' ? 'text-red-500' : 'text-neutral-400'}`}>{msg.user}:</span>
                                        <span className="text-neutral-300">{msg.text}</span>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleChatSubmit} className="p-3 border-t border-neutral-800 bg-neutral-900">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        placeholder="Say something..."
                                        className="w-full bg-neutral-800 text-white text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500 border border-neutral-700"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-neutral-700 text-white rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Schedule */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Calendar className="text-red-500" /> Upcoming Streams
                    </h2>
                    <div className="space-y-4">
                        {upcomingStreams.map((stream) => (
                            <motion.div
                                key={stream.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-red-500/20 transition-colors group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="text-center bg-neutral-800 rounded-xl p-3 min-w-[80px]">
                                        <div className="text-red-500 font-bold text-sm uppercase">{stream.date}</div>
                                        <div className="text-white font-bold text-lg">{stream.time.split(' ')[0]}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-red-400 font-bold uppercase tracking-wider mb-1">{stream.topic}</div>
                                        <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors">{stream.title}</h3>
                                        <p className="text-neutral-500 text-sm mt-1">{stream.viewers} waiting</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSubscribed(!isSubscribed)}
                                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isSubscribed ? 'bg-neutral-800 text-neutral-400' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20'}`}
                                >
                                    <Bell size={16} /> {isSubscribed ? 'Reminder Set' : 'Remind Me'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mentorship / 1-on-1 */}
                <div>
                    <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-3xl p-8 sticky top-24">
                        <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-red-900/20">
                            <Mic size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Book a 1-on-1 Session</h2>
                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            Need specific help with your project? Book a private 1-hour call with me for code review, career advice, or pair programming.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <CheckCircle className="text-green-500" size={16} /> Portfolio Review
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <CheckCircle className="text-green-500" size={16} /> React/Next.js Help
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-300">
                                <CheckCircle className="text-green-500" size={16} /> Career Guidance
                            </div>
                        </div>

                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors">
                            Book Now ($100/hr)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckCircle = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export default LiveSessions;
