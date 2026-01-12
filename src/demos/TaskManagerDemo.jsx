import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle2, Circle, ArrowLeft, GripVertical, Calendar, User, Search, Settings, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskManagerDemo = () => {
    const [tasks, setTasks] = useState([
        { id: "1", text: "Design System V2", status: "todo", assignee: "https://randomuser.me/api/portraits/women/44.jpg", tag: "Design" },
        { id: "2", text: "Q4 Marketing Strategy", status: "in-progress", assignee: "https://randomuser.me/api/portraits/men/32.jpg", tag: "Marketing" },
        { id: "3", text: "Fix Auth0 Integration", status: "todo", assignee: "https://randomuser.me/api/portraits/men/86.jpg", tag: "Dev" },
        { id: "4", text: "Client Meeting - TechCorp", status: "done", assignee: "https://randomuser.me/api/portraits/women/65.jpg", tag: "Meeting" },
    ]);
    const [newTask, setNewTask] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([{
            id: Date.now().toString(),
            text: newTask,
            status: "todo",
            assignee: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
            tag: "General"
        }, ...tasks]);
        setNewTask("");
    };

    const toggleStatus = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#0F1117] text-slate-300 font-sans selection:bg-indigo-500/30">
            {/* Sidebar (Visual only) */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-[#161922] border-r border-slate-800/50 p-6 hidden md:block">
                <Link to="/projects/taskmanager" className="flex items-center gap-3 text-slate-100 font-bold text-xl mb-12 hover:text-indigo-400 transition-colors">
                    <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">T</div>
                    TaskFlow.
                </Link>

                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Workspace</p>
                        <nav className="space-y-1">
                            {["Inbox", "My Tasks", "Upcoming", "Filters"].map(item => (
                                <button key={item} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item === "My Tasks" ? "bg-indigo-500/10 text-indigo-400" : "hover:bg-slate-800/50"}`}>
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 min-h-screen">
                {/* Topbar */}
                <header className="sticky top-0 z-40 bg-[#0F1117]/80 backdrop-blur-md border-b border-slate-800/50 px-8 h-16 flex items-center justify-between">
                    <div className="md:hidden">
                        <Link to="/projects/taskmanager" className="text-slate-100 font-bold"><ArrowLeft /></Link>
                    </div>
                    <div className="flex-1 max-w-xl mx-auto md:mx-0">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                            <input type="text" placeholder="Search tasks..." className="w-full bg-[#161922] border border-slate-700/50 rounded-lg py-1.5 pl-10 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors text-slate-200" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-slate-900"></div>
                    </div>
                </header>

                <div className="p-8 max-w-4xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar size={14} />
                                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={addTask} className="mb-10 group">
                        <div className="relative">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Add a new task..."
                                className="w-full bg-[#161922] border-none text-slate-200 text-lg placeholder:text-slate-600 focus:ring-0 p-0 py-4 border-b border-slate-800 focus:border-indigo-500/50 transition-colors bg-transparent"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg opacity-0 group-focus-within:opacity-100 transition-all hover:bg-indigo-500"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </form>

                    <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="space-y-2">
                        <AnimatePresence>
                            {tasks.map((task) => (
                                <Reorder.Item
                                    key={task.id}
                                    value={task}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative bg-[#161922] hover:bg-[#1C1F2A] border border-slate-800/50 rounded-xl p-4 flex items-center gap-4 transition-colors shadow-sm"
                                >
                                    <GripVertical className="text-slate-600 cursor-grab active:cursor-grabbing hover:text-slate-400" size={18} />

                                    <button
                                        onClick={() => toggleStatus(task.id)}
                                        className={`flex-shrink-0 transition-colors ${task.status === "done" ? "text-emerald-500" : "text-slate-600 hover:text-slate-400"
                                            }`}
                                    >
                                        {task.status === "done" ? <CheckCircle2 size={22} className="fill-emerald-500/20" /> : <Circle size={22} />}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <div className={`text-base font-medium truncate transition-all ${task.status === "done" ? "text-slate-500 line-through" : "text-slate-200"
                                            }`}>
                                            {task.text}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`text-[10px] font-semibold px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700/50 uppercase tracking-wide opacity-60`}>
                                            {task.tag}
                                        </span>
                                        <img
                                            src={task.assignee}
                                            alt="Assignee"
                                            className="w-6 h-6 rounded-full ring-2 ring-[#161922]"
                                            title="Assignee"
                                        />
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-slate-600 hover:text-red-400 p-1.5 rounded-md hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>
                </div>
            </main>
        </div>
    );
};

export default TaskManagerDemo;
