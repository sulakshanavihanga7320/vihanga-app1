import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Plus, X, ArrowLeft, Search, Filter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EcommerceDemo = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const heroProduct = {
        name: "Sony WH-1000XM5",
        tagline: "Your World. Nothing Else.",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=2588&auto=format&fit=crop",
        price: 349
    };

    const products = [
        { id: 1, name: "Premium Wireless Headphones", price: 349, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", rating: 4.9 },
        { id: 2, name: "Analog Mechanical Watch", price: 599, category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", rating: 4.8 },
        { id: 3, name: "Leica Film Camera", price: 1250, category: "Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", rating: 5.0 },
        { id: 4, name: "Designer Desk Lamp", price: 189, category: "Furniture", image: "https://images.unsplash.com/photo-1507473888900-52e1ad14b7a7?w=800&q=80", rating: 4.7 },
        { id: 5, name: "Mechanical Keyboard", price: 149, category: "Tech", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", rating: 4.9 },
        { id: 6, name: "Minimalist Backpack", price: 129, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", rating: 4.6 },
    ];

    const categories = ["All", "Audio", "Tech", "Photography", "Furniture", "Accessories"];

    const addToCart = (product) => {
        setCart([...cart, { ...product, cartId: Date.now() }]);
        setIsCartOpen(true);
    };

    const removeFromCart = (cartId) => {
        setCart(cart.filter(item => item.cartId !== cartId));
    };

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-100 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/projects/ecommerce" className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <span className="text-2xl font-bold tracking-tight">L U X E .</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                            <Search size={22} />
                        </button>
                        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                            <Heart size={22} />
                        </button>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                            <ShoppingCart size={22} />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 h-5 w-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-20">
                <div className="relative h-[600px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={heroProduct.image}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>
                    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-white">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-indigo-400 font-medium tracking-widest uppercase mb-4"
                        >
                            New Arrival
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-7xl font-bold mb-6 leading-tight max-w-2xl"
                        >
                            {heroProduct.tagline}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-neutral-300 mb-10 max-w-lg"
                        >
                            Experience audio like never before with industry-leading noise cancellation.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-fit px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors"
                        >
                            Shop Now — ${heroProduct.price}
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
                        <p className="text-neutral-500">Curated selection of this season's finest equipment.</p>
                    </div>

                    <div className="flex gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-full border border-neutral-200">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                        ? "bg-neutral-900 text-white shadow-lg"
                                        : "text-neutral-600 hover:bg-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={product.id}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-4 bottom-4 flex justify-between items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-900 hover:text-white transition-colors"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                                    <p className="text-neutral-500 text-sm">{product.category}</p>
                                </div>
                                <span className="text-lg font-medium">${product.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-8 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center">
                                            <ShoppingCart size={32} />
                                        </div>
                                        <p className="text-lg">Your cart is empty</p>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <motion.div
                                            key={item.cartId}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-24 h-24 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-sm leading-tight pr-4">{item.name}</h4>
                                                        <button
                                                            onClick={() => removeFromCart(item.cartId)}
                                                            className="text-neutral-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-neutral-500 text-xs mt-1">{item.category}</p>
                                                </div>
                                                <p className="font-medium">${item.price}</p>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-neutral-100">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-neutral-500">Total</span>
                                    <span className="text-3xl font-bold tracking-tight">${total}</span>
                                </div>
                                <button className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 group">
                                    Checkout <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EcommerceDemo;
