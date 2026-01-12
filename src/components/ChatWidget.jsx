import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/SiteContentContext';

const ChatWidget = () => {
    const { content, addMessage, replyToMessage } = useSiteContent();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    // Filter messages for this specific user session (using a mock userId for now)
    // In a real app, this would be based on auth or a persistent session ID
    const [sessionId] = useState(() => {
        let id = localStorage.getItem('chatSessionId');
        if (!id) {
            id = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatSessionId', id);
        }
        return id;
    });

    // Local state for the chat history in this window
    // We combine the messages from context that match this session
    const chatHistory = (content.messages || []).filter(m => m.sessionId === sessionId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsgText = inputValue.trim();
        const newMessage = {
            id: Date.now(),
            sessionId: sessionId,
            text: userMsgText,
            sender: 'user',
            replies: []
        };

        addMessage(newMessage);
        setInputValue("");

        // Generic AI Logic based on Site Content
        setTimeout(() => {
            let aiResponse = "";
            const text = userMsgText.toLowerCase();

            if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
                aiResponse = "Hello! I'm Vihanga's AI assistant. How can I help you today?";
            } else if (text.includes("project") || text.includes("work")) {
                const projects = content.projects?.map(p => p.title).join(", ") || "various web applications";
                aiResponse = `Vihanga has worked on several projects, including: ${projects}. You can see them in the Featured Projects section!`;
            } else if (text.includes("skill") || text.includes("language") || text.includes("tech")) {
                const skills = content.skills?.map(s => s.name).slice(0, 5).join(", ") || "JavaScript and React";
                aiResponse = `Vihanga is proficient in ${skills}, and more! Check the Skills section for the full list.`;
            } else if (text.includes("contact") || text.includes("email") || text.includes("hire")) {
                aiResponse = "You can contact Vihanga through the form at the bottom of the page or via the 'Hire Me' button in the navbar!";
            } else if (text.includes("price") || text.includes("cost") || text.includes("lesson")) {
                aiResponse = "Vihanga offers both free and premium lessons. You can browse them in the Lessons page!";
            } else {
                aiResponse = "That's interesting! I'll make sure Vihanga sees your message and gets back to you as soon as possible.";
            }

            // Add the AI reply as a reply to the message we just sent
            // Note: In our current SiteContentContext, 'replies' are usually added by admin via replyToMessage
            // We'll use the same mechanism but with an 'AI' label or just simulate it in UI
            // To make it persistent in the context, we'll use replyToMessage
            replyToMessage(newMessage.id, "🤖 AI: " + aiResponse);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl w-[380px] h-[550px] mb-4 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 p-5 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-lg">V</div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-indigo-600"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Vihanga AI Bot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-indigo-100 text-[10px] font-medium tracking-wide uppercase opacity-80">AI Assistant Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all backdrop-blur-md"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-neutral-950/30">
                            {chatHistory.length === 0 && (
                                <div className="text-center py-12 px-6">
                                    <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-400 border border-neutral-700 shadow-xl">
                                        <MessageCircle size={28} />
                                    </div>
                                    <h4 className="text-white font-bold mb-2">Welcome!</h4>
                                    <p className="text-sm text-neutral-500 leading-relaxed">Ask me anything about Vihanga's projects, skills, or services. I'm here to help!</p>
                                </div>
                            )}

                            {chatHistory.map((group) => (
                                <div key={group.id} className="space-y-4">
                                    {/* User Message */}
                                    <div className="flex justify-end pr-2">
                                        <div className="max-w-[85%] p-4 rounded-2xl rounded-tr-none text-sm bg-indigo-600 text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.3)]">
                                            {group.text}
                                        </div>
                                    </div>

                                    {/* AI/Admin Replies */}
                                    {group.replies && group.replies.map((reply, idx) => {
                                        const isAI = reply.text.startsWith("🤖 AI:");
                                        const cleanText = isAI ? reply.text.replace("🤖 AI: ", "") : reply.text;

                                        return (
                                            <div key={idx} className="flex justify-start pl-2">
                                                <div className="flex gap-3 max-w-[85%]">
                                                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold border ${isAI ? 'bg-purple-600/10 border-purple-500/30 text-purple-400' : 'bg-neutral-800 border-neutral-700 text-neutral-300'}`}>
                                                        {isAI ? 'AI' : 'VA'}
                                                    </div>
                                                    <div className={`p-4 rounded-2xl rounded-tl-none text-sm leading-relaxed ${isAI ? 'bg-neutral-900 text-neutral-200 border border-neutral-800 shadow-xl' : 'bg-indigo-600/10 text-indigo-100 border border-indigo-500/20'}`}>
                                                        {cleanText}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-5 bg-neutral-900/50 border-t border-neutral-800 shrink-0 backdrop-blur-xl">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-neutral-950/50 border border-neutral-800 rounded-2xl pl-5 pr-14 py-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-inner placeholder:text-neutral-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all flex items-center justify-center shadow-lg shadow-indigo-600/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></span>
                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">AI Agent Ready</p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all z-50 ring-1 ring-white/10 group"
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <MessageCircle size={30} className="group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-4 border-indigo-600 shadow-lg"></div>
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
