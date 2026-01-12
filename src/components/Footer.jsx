import { Github, Linkedin, Twitter, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-20 border-t border-neutral-900 bg-neutral-950 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-black tracking-tighter text-white mb-6 block">
                            VIHANGA<span className="text-indigo-500">.</span>
                        </Link>
                        <p className="text-neutral-500 text-sm max-w-sm leading-relaxed mb-8">
                            Crafting high-performance digital experiences with cutting-edge technologies.
                            Specialized in Full-Stack development and Interactive UI/UX.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            {['About', 'Skills', 'Projects', 'Store', 'Lessons'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-neutral-500 hover:text-indigo-400 text-sm transition-colors flex items-center gap-2 group">
                                        <div className="w-1 h-1 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Legal & Status</h4>
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Systems Operational</span>
                            </div>
                            <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                                Version 2.0.4-Stable
                            </p>
                            <div className="flex items-center gap-2 text-neutral-600 text-[10px] font-bold uppercase tracking-widest">
                                <ShieldCheck size={12} />
                                <span>SSL Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Vihanga Sulakshana. Handcrafted in Sri Lanka.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-neutral-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Privacy Policy</Link>
                        <Link to="/terms" className="text-neutral-600 hover:text-white text-[10px] font-bold uppercase tracking-widest">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
