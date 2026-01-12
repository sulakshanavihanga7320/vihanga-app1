import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Star, Zap, Layout, Monitor, ArrowRight, X, CheckCircle, CreditCard, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

const TemplateStore = () => {
    const { addOrder } = useSiteContent();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({ email: "" });

    const templates = [
        {
            id: 1,
            title: "Ultra Portfolio",
            price: 49,
            category: "Personal Brand",
            rating: 4.9,
            sales: 128,
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            features: ["3D Hero Section", "Dark/Light Mode", "CMS Integrated"],
            tags: ["React", "Framer Motion", "Tailwind"],
            previewUrl: "/"
        },
        {
            id: 2,
            title: "SaaS Starter Kit",
            price: 79,
            category: "Business",
            rating: 5.0,
            sales: 85,
            image: "https://images.unsplash.com/photo-1481487484168-9b995ecc168d?q=80&w=2670&auto=format&fit=crop",
            features: ["Auth & Database", "Stripe Payment", "Admin Dashboard"],
            tags: ["Next.js", "Supabase", "Stripe"],
            previewUrl: "/demo/taskmanager"
        },
        {
            id: 3,
            title: "Luxe E-Commerce",
            price: 69,
            category: "Retail",
            rating: 4.8,
            sales: 210,
            image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670&auto=format&fit=crop",
            features: ["Cart & Checkout", "Product Filtering", "SEO Optimized"],
            tags: ["Shopify", "React", "Node.js"],
            previewUrl: "/demo/ecommerce"
        },
        {
            id: 4,
            title: "Agency Pro",
            price: 59,
            category: "Corporate",
            rating: 4.9,
            sales: 56,
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop",
            features: ["Case Study Layouts", "Client Portal", "Blog Section"],
            tags: ["Vue.js", "Nuxt", "Sanity"],
            previewUrl: "/demo/film"
        }
    ];

    const handlePurchase = (e) => {
        e.preventDefault();

        // Record order in context
        addOrder({
            type: 'template',
            itemId: selectedTemplate.id,
            itemName: selectedTemplate.title,
            amount: selectedTemplate.price,
            customerEmail: formData.email,
            customerDetails: { email: formData.email }
        });

        // Simulate processing
        setTimeout(() => {
            setShowSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-orange-500/30">
            {/* Header */}
            <div className="pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-6 border border-orange-500/20"
                    >
                        <Zap size={16} />
                        <span>Premium Resources</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400"
                    >
                        Digital Store
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        High-quality templates and starter kits to launch your next project faster.
                        Professionally designed, code-ready, and fully customizable.
                    </motion.p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {templates.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden group hover:border-orange-500/30 transition-all hover:bg-neutral-900"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <Link
                                        to={`/preview/${item.id}`}
                                        target="_blank"
                                        className="px-6 py-2 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                                    >
                                        <Eye size={18} /> Live Preview
                                    </Link>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-neutral-400">
                                            <div className="flex items-center gap-1">
                                                <Star className="text-yellow-400 fill-yellow-400" size={14} />
                                                <span className="text-white">{item.rating}</span>
                                            </div>
                                            <span>{item.sales} Sales</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold text-orange-400">
                                        ${item.price}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {item.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-neutral-400">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
                                    <div className="flex gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 rounded bg-neutral-800 text-neutral-400 text-xs font-medium border border-neutral-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSelectedTemplate(item)}
                                        className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors group/link px-4 py-2 hover:bg-orange-500/10 rounded-lg"
                                    >
                                        Buy Now <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Value Prop */}
            <div className="border-t border-neutral-800 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="w-12 h-12 mx-auto bg-neutral-800 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                            <Layout size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Modern Design</h3>
                        <p className="text-neutral-500 text-sm">Crafted with the latest design trends and best practices.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 mx-auto bg-neutral-800 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                            <Monitor size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Fully Responsive</h3>
                        <p className="text-neutral-500 text-sm">Look perfect on every device, from mobile to desktop.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 mx-auto bg-neutral-800 rounded-xl flex items-center justify-center text-orange-400 mb-4">
                            <Zap size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Fast Performance</h3>
                        <p className="text-neutral-500 text-sm">Optimized for speed and excellent SEO ranking.</p>
                    </div>
                </div>
            </div>

            {/* Purchase Modal */}
            <AnimatePresence>
                {selectedTemplate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setSelectedTemplate(null); setShowSuccess(false); }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 z-10"
                        >
                            <button
                                onClick={() => { setSelectedTemplate(null); setShowSuccess(false); }}
                                className="absolute top-4 right-4 p-2 hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {!showSuccess ? (
                                <>
                                    <div className="mb-8">
                                        <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                                        <h2 className="text-2xl font-bold mt-2">{selectedTemplate.title}</h2>
                                        <p className="text-3xl font-bold text-white mt-1">${selectedTemplate.price}</p>
                                    </div>

                                    <form onSubmit={handlePurchase} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Email Address</label>
                                            <input
                                                required type="email" placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-neutral-400 mb-1.5">Card Information</label>
                                            <div className="relative">
                                                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 pl-12 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input required type="text" placeholder="MM / YY" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                                            <input required type="text" placeholder="CVC" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                                        </div>

                                        <button type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transition-all mt-4 flex items-center justify-center gap-2">
                                            <Lock size={16} /> Pay ${selectedTemplate.price}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                                    <p className="text-neutral-400 mb-8">
                                        Thank you for your purchase. A download link has been sent to your email.
                                    </p>
                                    <button
                                        onClick={() => { setSelectedTemplate(null); setShowSuccess(false); }}
                                        className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TemplateStore;
