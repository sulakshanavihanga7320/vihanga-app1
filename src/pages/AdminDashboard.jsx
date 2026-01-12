import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, BookOpen, Users, Settings, LogOut,
    Plus, Search, Save, Trash2, Edit, X, Image as ImageIcon,
    Type, AlignLeft, DollarSign, Tag, Info, Layers, Code, RefreshCw,
    Video, Link as LinkIcon, Radio, MessageSquare, Package, Check, Clock, User
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { motion, AnimatePresence } from 'framer-motion';
import MediaGallery from '../components/MediaGallery';
import LiveSettings from '../components/LiveSettings';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const {
        content, updateHero, updateAbout, updateSkills, updateServices,
        updateProjects, updateLessons, replyToMessage, updateOrderStatus, updateContent
    } = useSiteContent();
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);


    // Section States
    const [heroData, setHeroData] = useState(content?.hero || {});
    const [aboutData, setAboutData] = useState(content?.about || { paragraphs: [] });

    useEffect(() => {
        if (content) {
            setHeroData(content.hero || {});
            setAboutData(content.about || { paragraphs: [] });
        }
    }, [content]);

    // Modal States
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);

    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [currentSkill, setCurrentSkill] = useState(null);

    // Messaging State
    const [replyText, setReplyText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);

    if (!content) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Content...</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const resetPersistence = () => {
        if (window.confirm('⚠️ This will reset ALL site content to defaults. Continue?')) {
            localStorage.removeItem('siteContent');
            window.location.reload();
        }
    };

    const exportData = () => {
        const dataStr = JSON.stringify(content, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vihanga-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const importData = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const importedData = JSON.parse(event.target.result);
                        localStorage.setItem('siteContent', JSON.stringify(importedData));
                        window.location.reload();
                    } catch (error) {
                        alert('Invalid JSON file!');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    // Save Handlers
    const saveHero = () => {
        updateHero(heroData);
        alert('Hero Section Updated!');
    };

    const saveAbout = () => {
        updateAbout(aboutData);
        alert('About Section Updated!');
    };

    // Project Logic
    const openProjectModal = (project = null) => {
        setCurrentProject(project || {
            id: Date.now(),
            title: "",
            category: "",
            image: "",
            description: "",
            tags: []
        });
        setIsProjectModalOpen(true);
    };

    const saveProject = (e) => {
        e.preventDefault();
        const updatedProjects = content.projects.find(p => p.id === currentProject.id)
            ? content.projects.map(p => p.id === currentProject.id ? currentProject : p)
            : [...content.projects, currentProject];

        updateProjects(updatedProjects);
        setIsProjectModalOpen(false);
    };

    const deleteProject = (id) => {
        if (window.confirm('Delete this project?')) {
            updateProjects(content.projects.filter(p => p.id !== id));
        }
    };

    // Lesson Logic
    const openLessonModal = (lesson = null) => {
        setCurrentLesson(lesson || {
            id: Date.now(),
            title: "",
            desc: "",
            level: "Beginner",
            duration: "",
            color: "from-blue-500 to-cyan-500",
            tags: [],
            rating: 5.0,
            price: 0,
            videoUrl: "",
            isLive: false,
            meetingLink: ""
        });
        setIsLessonModalOpen(true);
    };

    const saveLesson = (e) => {
        e.preventDefault();
        const updatedLessons = content.lessons.find(l => l.id === currentLesson.id)
            ? content.lessons.map(l => l.id === currentLesson.id ? currentLesson : l)
            : [...content.lessons, currentLesson];

        updateLessons(updatedLessons);
        setIsLessonModalOpen(false);
    };

    const deleteLesson = (id) => {
        if (window.confirm('Delete this lesson?')) {
            updateLessons(content.lessons.filter(l => l.id !== id));
        }
    };

    // Skill Logic
    const openSkillModal = (skill = null) => {
        setCurrentSkill(skill || { name: "", level: "Intermediate" });
        setIsSkillModalOpen(true);
    };

    const saveSkill = (e) => {
        e.preventDefault();
        const exists = content.skills.some(s => s.name === currentSkill.name);
        const updatedSkills = exists
            ? content.skills.map(s => s.name === currentSkill.name ? currentSkill : s)
            : [...content.skills, currentSkill];

        updateSkills(updatedSkills);
        setIsSkillModalOpen(false);
    };

    const deleteSkill = (name) => {
        if (window.confirm(`Remove ${name}?`)) {
            updateSkills(content.skills.filter(s => s.name !== name));
        }
    };

    // Messaging Logic
    const handleReply = (messageId) => {
        if (!replyText.trim()) return;
        replyToMessage(messageId, replyText);
        setReplyText("");
        alert("Reply Sent!");
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            <div className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 flex flex-col fixed h-full z-50">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-indigo-600/20">A</div>
                    <span className="font-bold text-lg tracking-tight">Vihanga Board</span>
                </div>

                <nav className="space-y-1 flex-1">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <NavItem icon={<Package size={18} />} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <NavItem icon={<MessageSquare size={18} />} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />

                    <div className="h-6" />
                    <p className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Content CMS</p>

                    <NavItem icon={<Settings size={18} />} label="Hero Section" active={activeTab === 'hero'} onClick={() => setActiveTab('hero')} />
                    <NavItem icon={<Info size={18} />} label="About Me" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
                    <NavItem icon={<Code size={18} />} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
                    <NavItem icon={<ShoppingBag size={18} />} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
                    <NavItem icon={<BookOpen size={18} />} label="Lessons" active={activeTab === 'lessons'} onClick={() => setActiveTab('lessons')} />
                    <NavItem icon={<Video size={18} />} label="Media Gallery" active={activeTab === 'media'} onClick={() => setActiveTab('media')} />
                    <NavItem icon={<Radio size={18} />} label="Live Settings" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
                </nav>

                <div className="space-y-2 pt-4 border-t border-neutral-800 mt-auto">
                    <button
                        onClick={exportData}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-neutral-500 hover:bg-white/5 rounded-xl transition-colors text-sm group"
                    >
                        <Package size={16} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-medium">Export Backup</span>
                    </button>
                    <button
                        onClick={importData}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-neutral-500 hover:bg-white/5 rounded-xl transition-colors text-sm group"
                    >
                        <Plus size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Import Data</span>
                    </button>
                    <button
                        onClick={resetPersistence}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-orange-400 hover:bg-orange-500/10 rounded-xl transition-colors text-sm group"
                    >
                        <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span className="font-medium">Reset All Data</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm"
                    >
                        <LogOut size={16} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-12 overflow-y-auto min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <header className="flex items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                Live System Monitor
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter capitalize text-white">
                                {activeTab.replace('-', ' ')}<span className="text-indigo-600">.</span>
                            </h1>
                            <p className="text-neutral-500 mt-1 font-medium italic">Manage your digital empire with precision.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-2xl">
                                <Search size={16} className="text-neutral-500" />
                                <input
                                    type="text"
                                    placeholder="Search command..."
                                    className="bg-transparent border-none outline-none text-xs text-white placeholder:text-neutral-600 w-40"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleRefresh}
                                className={`p-3 bg-neutral-900 border border-neutral-800 rounded-2xl hover:bg-neutral-800 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                            >
                                <RefreshCw size={18} className="text-indigo-400" />
                            </button>
                        </div>
                    </header>

                    {/* OVERVIEW */}
                    {activeTab === 'overview' && (
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard title="Total Revenue" value={`$${(content.orders || []).reduce((acc, curr) => acc + (curr.amount || 0), 0)}`} color="green" icon={<DollarSign size={20} />} trend="+12.5%" />
                                <StatCard title="Active Orders" value={content.orders?.length || 0} color="indigo" icon={<Package size={20} />} trend="+3" />
                                <StatCard title="Global Reach" value={(content.messages?.length || 0) + 142} color="purple" icon={<Users size={20} />} trend="+18%" />
                                <StatCard title="Avg. Rating" value="4.9" color="orange" icon={<Tag size={20} />} trend="Stable" />
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Clock size={20} className="text-indigo-400" /> Recent Activity</h2>
                                    <div className="space-y-6">
                                        {(content.orders || []).slice(-3).reverse().map(order => (
                                            <div key={order.id} className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-neutral-800/50">
                                                <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                                    <Package size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold">New Order: {order.itemName}</p>
                                                    <p className="text-xs text-neutral-500">{order.customerEmail} • {new Date(order.timestamp).toLocaleDateString()}</p>
                                                </div>
                                                <span className="text-sm font-bold text-green-400">${order.amount}</span>
                                            </div>
                                        ))}
                                        {(!content.orders || content.orders.length === 0) && <p className="text-neutral-500 text-sm">No recent activity found.</p>}
                                    </div>
                                </div>
                                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><MessageSquare size={20} className="text-purple-400" /> Latest Messages</h2>
                                    <div className="space-y-6">
                                        {(content.messages || []).slice(-3).reverse().map(msg => (
                                            <div key={msg.id} className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-neutral-800/50">
                                                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center">
                                                    <User size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold truncate">{msg.text}</p>
                                                    <p className="text-xs text-neutral-500">{msg.sessionId} • {new Date(msg.timestamp).toLocaleDateString()}</p>
                                                </div>
                                                <button onClick={() => setActiveTab('messages')} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"><Edit size={14} /></button>
                                            </div>
                                        ))}
                                        {(!content.messages || content.messages.length === 0) && <p className="text-neutral-500 text-sm">No new messages.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/40 border-b border-neutral-800">
                                        <th className="p-6 text-xs font-bold uppercase text-neutral-500 tracking-wider">Order ID / Customer</th>
                                        <th className="p-6 text-xs font-bold uppercase text-neutral-500 tracking-wider">Item / Type</th>
                                        <th className="p-6 text-xs font-bold uppercase text-neutral-500 tracking-wider">Amount</th>
                                        <th className="p-6 text-xs font-bold uppercase text-neutral-500 tracking-wider">Status</th>
                                        <th className="p-6 text-xs font-bold uppercase text-neutral-500 tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(content.orders || []).slice().reverse()
                                        .filter(o => o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) || o.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(order => (
                                            <tr key={order.id} className="border-b border-neutral-800 hover:bg-white/5 transition-colors group">
                                                <td className="p-6">
                                                    <p className="font-bold text-sm">#{order.id.toString().substr(-6)}</p>
                                                    <p className="text-xs text-neutral-500">{order.customerEmail}</p>
                                                </td>
                                                <td className="p-6 font-medium text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${order.type === 'lesson' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                                        {order.itemName}
                                                    </div>
                                                </td>
                                                <td className="p-6 text-sm font-bold text-neutral-200">${order.amount || 0}</td>
                                                <td className="p-6">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${order.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => updateOrderStatus(order.id, 'completed')} className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg" title="Mark Completed"><Check size={16} /></button>
                                                        <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg" title="Cancel Order"><X size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    {(!content.orders || content.orders.length === 0) && (
                                        <tr><td colSpan="5" className="p-20 text-center text-neutral-500">No orders placed yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* MESSAGES TAB */}
                    {activeTab === 'messages' && (
                        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
                            {/* Messages List */}
                            <div className="lg:col-span-1 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col">
                                <div className="p-6 border-b border-neutral-800 bg-black/20">
                                    <h3 className="font-bold flex items-center gap-2"><MessageSquare size={18} /> Conversations</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    {(content.messages || []).slice().reverse()
                                        .filter(m => m.sessionId.toLowerCase().includes(searchQuery.toLowerCase()) || m.text.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(msg => (
                                            <button
                                                key={msg.id}
                                                onClick={() => setSelectedMessage(msg)}
                                                className={`w-full p-6 text-left border-b border-neutral-800 hover:bg-white/5 transition-colors flex items-start gap-4 ${selectedMessage?.id === msg.id ? 'bg-indigo-600/10 border-r-4 border-r-indigo-600' : ''}`}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center shrink-0">
                                                    <User size={20} className="text-neutral-500" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-sm truncate">{msg.sessionId}</h4>
                                                        <span className="text-[10px] text-neutral-600">{new Date(msg.timestamp).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="text-xs text-neutral-500 truncate">{msg.text}</p>
                                                    {msg.replies?.length > 0 && <span className="inline-block mt-2 px-1.5 py-0.5 bg-green-500/10 text-green-500 text-[8px] font-bold uppercase rounded">Replied</span>}
                                                </div>
                                            </button>
                                        ))}
                                    {(!content.messages || content.messages.length === 0) && <p className="p-10 text-center text-neutral-500 text-sm">No messages yet.</p>}
                                </div>
                            </div>

                            {/* Conversation View */}
                            <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl flex flex-col overflow-hidden">
                                {selectedMessage ? (
                                    <>
                                        <div className="p-6 border-b border-neutral-800 bg-black/20 flex items-center' flex-col">
                                            <h3 className="font-bold flex items-center gap-2 text-indigo-400">User: {selectedMessage.sessionId}</h3>
                                            <p className="text-xs text-neutral-500 mt-1">Chat ID: {selectedMessage.id}</p>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                            {/* User Original Message */}
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0"><User size={16} /></div>
                                                <div className="space-y-2">
                                                    <div className="bg-neutral-800 p-4 rounded-2xl rounded-tl-none text-sm text-neutral-200 border border-neutral-700 max-w-lg">
                                                        {selectedMessage.text}
                                                    </div>
                                                    <span className="text-[10px] text-neutral-600 px-2">{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                                                </div>
                                            </div>

                                            {/* Admin Replies */}
                                            {selectedMessage.replies?.map((reply, i) => (
                                                <div key={i} className="flex gap-4 flex-row-reverse">
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0"><Check size={16} /></div>
                                                    <div className="space-y-2 text-right">
                                                        <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-indigo-900/20 max-w-lg">
                                                            {reply.text}
                                                        </div>
                                                        <span className="text-[10px] text-neutral-600 px-2">{new Date(reply.timestamp).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 border-t border-neutral-800 bg-black/20">
                                            <div className="flex gap-3">
                                                <input
                                                    type="text"
                                                    value={replyText}
                                                    onChange={e => setReplyText(e.target.value)}
                                                    placeholder="Type your reply..."
                                                    className="flex-1 admin-input"
                                                    onKeyDown={e => e.key === 'Enter' && handleReply(selectedMessage.id)}
                                                />
                                                <button onClick={() => handleReply(selectedMessage.id)} className="admin-btn-primary">Send Reply</button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-600">
                                        <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4"><MessageSquare size={32} /></div>
                                        <p>Select a message to view the conversation and reply</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* HERO EDITOR */}
                    {activeTab === 'hero' && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 max-w-3xl">
                            <div className="space-y-8">
                                <InputGroup label="Headline" icon={<Type size={18} />}>
                                    <input
                                        type="text" value={heroData.title || ''}
                                        onChange={e => setHeroData({ ...heroData, title: e.target.value })}
                                        className="admin-input"
                                    />
                                </InputGroup>
                                <InputGroup label="Subtitle" icon={<AlignLeft size={18} />}>
                                    <textarea
                                        rows="3" value={heroData.subtitle || ''}
                                        onChange={e => setHeroData({ ...heroData, subtitle: e.target.value })}
                                        className="admin-input"
                                    />
                                </InputGroup>
                                <InputGroup label="CTA Button" icon={<Layers size={18} />}>
                                    <input
                                        type="text" value={heroData.cta || ''}
                                        onChange={e => setHeroData({ ...heroData, cta: e.target.value })}
                                        className="admin-input"
                                    />
                                </InputGroup>
                                <button onClick={saveHero} className="admin-btn-primary">
                                    <Save size={18} /> Update Hero Section
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ABOUT EDITOR */}
                    {activeTab === 'about' && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 max-w-3xl">
                            <div className="space-y-8">
                                <InputGroup label="Section Title" icon={<Type size={18} />}>
                                    <input
                                        type="text" value={aboutData.title || ''}
                                        onChange={e => setAboutData({ ...aboutData, title: e.target.value })}
                                        className="admin-input"
                                    />
                                </InputGroup>
                                <InputGroup label="Profile Image URL" icon={<ImageIcon size={18} />}>
                                    <input
                                        type="text" value={aboutData.image || ''}
                                        onChange={e => setAboutData({ ...aboutData, image: e.target.value })}
                                        className="admin-input"
                                    />
                                </InputGroup>
                                {aboutData.paragraphs?.map((p, i) => (
                                    <InputGroup key={i} label={`Paragraph ${i + 1}`} icon={<AlignLeft size={18} />}>
                                        <textarea
                                            rows="3" value={p}
                                            onChange={e => {
                                                const newP = [...aboutData.paragraphs];
                                                newP[i] = e.target.value;
                                                setAboutData({ ...aboutData, paragraphs: newP });
                                            }}
                                            className="admin-input"
                                        />
                                    </InputGroup>
                                ))}
                                <button onClick={saveAbout} className="admin-btn-primary">
                                    <Save size={18} /> Update About Section
                                </button>
                            </div>
                        </div>
                    )}

                    {/* SKILLS EDITOR */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                                <p className="text-neutral-500 text-sm">Manage your technical skills displayed on the home page.</p>
                                <button onClick={() => openSkillModal()} className="admin-btn-orange">
                                    <Plus size={18} /> Add Skill
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(content.skills || [])
                                    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.level.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map((skill, i) => (
                                        <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl group hover:border-orange-500/50 transition-colors">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="font-bold text-lg">{skill.name}</h3>
                                                <div className="flex gap-2">
                                                    <button onClick={() => openSkillModal(skill)} className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400"><Edit size={14} /></button>
                                                    <button onClick={() => deleteSkill(skill.name)} className="p-2 hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 size={14} /></button>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full font-bold border border-orange-500/20">{skill.level}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* PROJECTS MANAGER */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                                <p className="text-neutral-500 text-sm">Manage your portfolio projects and detail pages.</p>
                                <button onClick={() => openProjectModal()} className="admin-btn-indigo">
                                    <Plus size={18} /> Add Project
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {(content.projects || [])
                                    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(p => (
                                        <div key={p.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-16 bg-neutral-800 rounded-xl overflow-hidden ring-1 ring-white/10">
                                                    <img src={p.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{p.title}</h3>
                                                    <p className="text-neutral-500 text-sm">{p.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openProjectModal(p)} className="p-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors"><Edit size={18} /></button>
                                                <button onClick={() => deleteProject(p.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* LESSONS MANAGER */}
                    {activeTab === 'lessons' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
                                <p className="text-neutral-500 text-sm">Create and edit interactive lessons or live meeting events.</p>
                                <button onClick={() => openLessonModal()} className="admin-btn-purple">
                                    <Plus size={18} /> Add Lesson
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {(content.lessons || [])
                                    .filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.level.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(l => (
                                        <div key={l.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between group hover:border-purple-500/50 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white shadow-lg`}>
                                                    <BookOpen size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">{l.title}</h3>
                                                    <div className="flex gap-4 mt-1.5 items-center">
                                                        <span className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded uppercase font-bold border border-neutral-700">{l.level}</span>
                                                        <span className="text-sm text-green-500 font-bold">{l.price === 0 ? 'Free' : `$${l.price}`}</span>
                                                        {l.isLive && <span className="flex items-center gap-1.5 text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase border border-red-500/20 animate-pulse"><Radio size={12} /> Live</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openLessonModal(l)} className="p-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors"><Edit size={18} /></button>
                                                <button onClick={() => deleteLesson(l.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* MEDIA GALLERY */}
                    {activeTab === 'media' && (
                        <MediaGallery content={content} updateContent={updateContent} />
                    )}

                    {/* LIVE SETTINGS */}
                    {activeTab === 'live' && (
                        <LiveSettings content={content} updateContent={updateContent} />
                    )}
                </div>
            </div>

            {/* MODALS */}
            {/* Project Modal */}
            <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title={content.projects?.find(p => p.id === currentProject?.id) ? 'Edit Project' : 'New Project'}>
                <form onSubmit={saveProject} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <InputGroup label="Title" icon={<Type size={16} />}>
                            <input type="text" required value={currentProject?.title} onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })} className="admin-input" />
                        </InputGroup>
                        <InputGroup label="Category" icon={<Tag size={16} />}>
                            <input type="text" required value={currentProject?.category} onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })} className="admin-input" />
                        </InputGroup>
                    </div>
                    <InputGroup label="Image URL" icon={<ImageIcon size={16} />}>
                        <input type="text" required value={currentProject?.image} onChange={e => setCurrentProject({ ...currentProject, image: e.target.value })} className="admin-input" />
                    </InputGroup>
                    <InputGroup label="Description" icon={<AlignLeft size={16} />}>
                        <textarea rows="3" required value={currentProject?.description} onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })} className="admin-input" />
                    </InputGroup>
                    <button type="submit" className="admin-btn-primary w-full shadow-xl shadow-indigo-600/30">Save Project</button>
                </form>
            </Modal>

            {/* Lesson Modal */}
            <Modal isOpen={isLessonModalOpen} onClose={() => setIsLessonModalOpen(false)} title={content.lessons?.find(l => l.id === currentLesson?.id) ? 'Edit Lesson' : 'New Lesson'}>
                <form onSubmit={saveLesson} className="space-y-6">
                    <InputGroup label="Title" icon={<Type size={16} />}>
                        <input type="text" required value={currentLesson?.title || ''} onChange={e => setCurrentLesson({ ...currentLesson, title: e.target.value })} className="admin-input" />
                    </InputGroup>

                    <div className="grid grid-cols-2 gap-6">
                        <InputGroup label="Price ($)" icon={<DollarSign size={16} />}>
                            <input type="number" required value={currentLesson?.price || 0} onChange={e => setCurrentLesson({ ...currentLesson, price: parseInt(e.target.value) })} className="admin-input" />
                        </InputGroup>
                        <InputGroup label="Level" icon={<Layers size={16} />}>
                            <select value={currentLesson?.level || 'Beginner'} onChange={e => setCurrentLesson({ ...currentLesson, level: e.target.value })} className="admin-input appearance-none">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </InputGroup>
                    </div>

                    <div className="flex items-center gap-6 p-4 bg-neutral-950 rounded-2xl border border-neutral-800">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox" id="isLive"
                                checked={currentLesson?.isLive || false}
                                onChange={e => setCurrentLesson({ ...currentLesson, isLive: e.target.checked })}
                                className="w-5 h-5 rounded bg-neutral-900 border-neutral-700 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="isLive" className="text-sm font-bold text-neutral-300 flex items-center gap-2 cursor-pointer">
                                <Radio size={16} className={currentLesson?.isLive ? 'text-red-500' : ''} /> Live Meeting Session
                            </label>
                        </div>
                    </div>

                    {currentLesson?.isLive ? (
                        <InputGroup label="Meeting Link (Zoom/Google Meet)" icon={<LinkIcon size={16} />}>
                            <input
                                type="text" required placeholder="https://zoom.us/j/..."
                                value={currentLesson?.meetingLink || ''}
                                onChange={e => setCurrentLesson({ ...currentLesson, meetingLink: e.target.value })}
                                className="admin-input border-red-500/30 focus:border-red-500"
                            />
                        </InputGroup>
                    ) : (
                        <InputGroup label="Video Embed URL (YouTube/Vimeo)" icon={<Video size={16} />}>
                            <input
                                type="text" required placeholder="https://www.youtube.com/embed/..."
                                value={currentLesson?.videoUrl || ''}
                                onChange={e => setCurrentLesson({ ...currentLesson, videoUrl: e.target.value })}
                                className="admin-input"
                            />
                        </InputGroup>
                    )}

                    <InputGroup label="Duration" icon={<Tag size={16} />}>
                        <input type="text" required placeholder="e.g. 45 min" value={currentLesson?.duration || ''} onChange={e => setCurrentLesson({ ...currentLesson, duration: e.target.value })} className="admin-input" />
                    </InputGroup>
                    <InputGroup label="Description" icon={<AlignLeft size={16} />}>
                        <textarea rows="3" required value={currentLesson?.desc || ''} onChange={e => setCurrentLesson({ ...currentLesson, desc: e.target.value })} className="admin-input" />
                    </InputGroup>
                    <button type="submit" className="admin-btn-primary w-full shadow-xl shadow-purple-600/30" style={{ background: '#9333ea' }}>Save Lesson</button>
                </form>
            </Modal>

            {/* Skill Modal */}
            <Modal isOpen={isSkillModalOpen} onClose={() => setIsSkillModalOpen(false)} title={content.skills?.find(s => s.name === currentSkill?.name) ? 'Edit Skill' : 'New Skill'}>
                <form onSubmit={saveSkill} className="space-y-6">
                    <InputGroup label="Skill Name" icon={<Code size={16} />}>
                        <input type="text" required value={currentSkill?.name || ''} onChange={e => setCurrentSkill({ ...currentSkill, name: e.target.value })} className="admin-input" />
                    </InputGroup>
                    <InputGroup label="Expertise Level" icon={<Layers size={16} />}>
                        <select value={currentSkill?.level || 'Intermediate'} onChange={e => setCurrentSkill({ ...currentSkill, level: e.target.value })} className="admin-input appearance-none">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                            <option>Expert</option>
                        </select>
                    </InputGroup>
                    <button type="submit" className="admin-btn-primary w-full shadow-xl shadow-orange-600/30" style={{ background: '#ea580c' }}>Save Skill</button>
                </form>
            </Modal>
        </div>
    );
};

// UI Components
const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-neutral-500 hover:bg-white/5 hover:text-white'}`}
    >
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const InputGroup = ({ label, icon, children }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-neutral-500 flex items-center gap-2">
            {icon} {label}
        </label>
        {children}
    </div>
);

const Modal = ({ isOpen, onClose, title, children }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-neutral-900 border border-neutral-800 w-full max-w-xl rounded-3xl overflow-hidden relative shadow-2xl"
                >
                    <div className="p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-800/20">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                        {children}
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const StatCard = ({ title, value, color, icon, trend }) => {
    const colors = {
        indigo: 'bg-indigo-600',
        purple: 'bg-purple-600',
        orange: 'bg-orange-600',
        green: 'bg-green-600'
    };
    const bg = colors[color] || 'bg-neutral-600';

    return (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-48 group hover:border-white/20 transition-all hover:-translate-y-1">
            <div className={`absolute -right-4 -top-4 w-28 h-28 ${bg} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
            <div className="flex items-center justify-between z-10">
                <span className="text-neutral-500 font-bold uppercase text-[10px] tracking-widest">{title}</span>
                <div className={`p-2.5 rounded-xl ${bg}/10 ${bg.replace('bg-', 'text-')} ring-1 ring-white/5`}>
                    {icon}
                </div>
            </div>
            <div className="z-10 mt-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-white">{value}</span>
                    {trend && (
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'text-green-400 bg-green-500/10' : 'text-neutral-500 bg-neutral-800'}`}>
                            {trend}
                        </span>
                    )}
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        className={`h-full ${bg} opacity-50`}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
