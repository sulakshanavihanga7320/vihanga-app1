import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart2, User, Bell, Plus, Activity, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppDemo = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="h-screen w-full bg-neutral-50 flex flex-col font-sans overflow-hidden">
            {/* Simulating Mobile Top Bar */}
            <div className="h-10 bg-white flex items-center justify-between px-6 pt-2 select-none">
                <span className="text-xs font-bold">9:41</span>
                <div className="flex gap-1.5">
                    <div className="w-4 h-2.5 bg-neutral-900 rounded-sm"></div>
                    <div className="w-0.5 h-2.5 bg-neutral-900/30 rounded-full"></div>
                </div>
            </div>

            {/* Back Button for Demo */}
            <Link to="/projects/app" className="absolute top-12 left-4 z-50 p-2 bg-white/80 rounded-full shadow-sm backdrop-blur-sm">
                <ArrowLeft size={20} className="text-neutral-600" />
            </Link>

            {/* Main Scrollable Area */}
            <div className="flex-1 overflow-y-auto pb-24">
                <header className="px-6 pt-4 pb-6 bg-white sticky top-0 z-10">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-neutral-500 text-sm font-medium">Good Morning,</p>
                            <h1 className="text-2xl font-bold text-neutral-900">Alex</h1>
                        </div>
                        <button className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors relative">
                            <Bell size={20} className="text-neutral-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                        {["Today", "Weekly", "Monthly"].map((t, i) => (
                            <button key={t} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-neutral-100 text-neutral-600'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="px-6 space-y-6">
                    {/* Activity Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-blue-100 font-medium mb-1">Total Steps</p>
                                    <h2 className="text-4xl font-bold">8,432</h2>
                                </div>
                                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                    <Activity size={24} />
                                </div>
                            </div>
                            <div className="w-full bg-blue-900/30 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "70%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-white rounded-full"
                                />
                            </div>
                            <p className="text-xs text-blue-100 mt-2 font-medium">70% of daily goal</p>
                        </div>

                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Calories", val: "1,240", unit: "kcal", color: "text-orange-500", bg: "bg-orange-50" },
                            { label: "Sleep", val: "7h 20m", unit: "time", color: "text-purple-500", bg: "bg-purple-50" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm"
                            >
                                <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center mb-4`}>
                                    <Activity size={18} className={stat.color} />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900">{stat.val}</h3>
                                <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Daily Progress */}
                    <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Activity</h3>
                            <button className="text-blue-600 text-sm font-semibold">See All</button>
                        </div>
                        <div className="flex items-end gap-3 h-32 justify-between">
                            {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`flex-1 rounded-t-lg ${i === 3 ? 'bg-blue-600' : 'bg-neutral-100'}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-3 text-xs text-neutral-400 font-bold uppercase">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-white border-t border-neutral-100 pb-6 pt-4 px-6 flex justify-between items-center relative shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-blue-600' : 'text-neutral-400'}`}>
                    <Home size={24} />
                    {activeTab === 'home' && <span className="w-1 h-1 bg-current rounded-full"></span>}
                </button>
                <button onClick={() => setActiveTab('stats')} className={`flex flex-col items-center gap-1 ${activeTab === 'stats' ? 'text-blue-600' : 'text-neutral-400'}`}>
                    <BarChart2 size={24} />
                    {activeTab === 'stats' && <span className="w-1 h-1 bg-current rounded-full"></span>}
                </button>
                <button className="bg-neutral-900 text-white p-4 rounded-full -mt-12 shadow-lg shadow-neutral-900/30 hover:scale-105 transition-transform">
                    <Plus size={24} />
                </button>
                <button onClick={() => setActiveTab('sleep')} className={`flex flex-col items-center gap-1 ${activeTab === 'sleep' ? 'text-blue-600' : 'text-neutral-400'}`}>
                    <Moon size={24} />
                    {activeTab === 'sleep' && <span className="w-1 h-1 bg-current rounded-full"></span>}
                </button>
                <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-blue-600' : 'text-neutral-400'}`}>
                    <User size={24} />
                    {activeTab === 'profile' && <span className="w-1 h-1 bg-current rounded-full"></span>}
                </button>
            </div>
        </div>
    );
};

export default AppDemo;
