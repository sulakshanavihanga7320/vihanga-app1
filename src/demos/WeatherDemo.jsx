import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, ArrowLeft, Search, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeatherDemo = () => {
    const [city, setCity] = useState("Tokyo");
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({
        temp: 24,
        condition: "Clear",
        location: "Tokyo, Japan",
        humidity: 45,
        wind: 12,
        feels: 26,
        bg: "from-blue-400 to-blue-200"
    });

    const weatherTypes = {
        Clear: { bg: "from-orange-400 to-rose-400", icon: Sun, color: "text-amber-100" },
        Cloudy: { bg: "from-slate-400 to-slate-200", icon: Cloud, color: "text-slate-100" },
        Rain: { bg: "from-indigo-900 to-slate-800", icon: CloudRain, color: "text-indigo-200" }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            const types = ["Clear", "Cloudy", "Rain"];
            const type = types[Math.floor(Math.random() * types.length)];
            setWeather({
                temp: Math.floor(Math.random() * 30) + 10,
                condition: type,
                location: `${city}, Connected`,
                humidity: Math.floor(Math.random() * 50) + 30,
                wind: Math.floor(Math.random() * 20) + 5,
                feels: Math.floor(Math.random() * 30) + 10,
            });
            setLoading(false);
        }, 1000);
    };

    const CurrentIcon = weatherTypes[weather.condition].icon;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${weatherTypes[weather.condition].bg} transition-colors duration-1000 font-sans p-6 md:p-12 relative overflow-hidden flex flex-col`}>
            <Link to="/projects/weather" className="absolute top-8 left-8 inline-flex items-center text-white/70 hover:text-white transition-colors bg-black/10 backdrop-blur-md px-4 py-2 rounded-full font-medium z-50">
                <ArrowLeft size={18} className="mr-2" /> Back
            </Link>

            {/* Background Animations */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        className={`absolute opacity-20 text-white top-${i * 20} left-${i * 30}`}
                    >
                        <Cloud size={200 + i * 50} />
                    </motion.div>
                ))}
            </div>

            <main className="max-w-6xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-12 items-center justify-center relative z-10">

                {/* Main Card */}
                <div className="flex-1 w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/20 shadow-2xl relative overflow-hidden"
                    >
                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative mb-12">
                            <input
                                type="text"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all font-medium"
                                placeholder="Search City..."
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={20} />
                        </form>

                        {/* Weather Display */}
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-80 flex items-center justify-center"
                                >
                                    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <div className="flex items-center justify-center gap-2 text-white/80 mb-6 bg-white/10 w-fit mx-auto px-4 py-1.5 rounded-full backdrop-blur-md">
                                        <MapPin size={16} />
                                        <span className="font-medium">{weather.location}</span>
                                    </div>

                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className="mb-6 inline-block"
                                    >
                                        <CurrentIcon size={120} className={`drop-shadow-2xl ${weatherTypes[weather.condition].color}`} />
                                    </motion.div>

                                    <h1 className="text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
                                        {weather.temp}°
                                    </h1>
                                    <p className="text-2xl font-medium text-white/90 mb-12">{weather.condition}</p>

                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { icon: Wind, val: `${weather.wind} km/h`, label: "Wind" },
                                            { icon: Droplets, val: `${weather.humidity}%`, label: "Hum" },
                                            { icon: Thermometer, val: `${weather.feels}°`, label: "Feels" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                                <item.icon className="mx-auto mb-2 text-white/70" size={20} />
                                                <div className="font-bold text-white">{item.val}</div>
                                                <div className="text-xs text-white/50">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Forecast Panel (Sidebar in Desktop) */}
                <div className="w-full md:w-80 space-y-4">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold">Next 5 Hours</h3>
                            <Navigation size={16} className="text-white/50" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-white/60 text-sm">{(new Date().getHours() + i) % 24}:00</span>
                                    <Cloud size={18} className="text-white/80" />
                                    <span className="font-bold">{weather.temp - i * 1}°</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white h-40 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className="relative z-10">
                            <h3 className="font-bold opacity-80">Air Quality</h3>
                            <p className="text-3xl font-black mt-1">Good</p>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative z-10">
                            <div className="h-full w-[80%] bg-emerald-400 rounded-full" />
                        </div>
                        <Wind className="absolute bottom-[-10px] right-[-10px] text-white/5 group-hover:rotate-45 transition-transform" size={100} />
                    </div>
                </div>

            </main>
        </div>
    );
};

export default WeatherDemo;
