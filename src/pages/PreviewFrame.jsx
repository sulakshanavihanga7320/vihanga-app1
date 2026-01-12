import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Monitor, Smartphone, Tablet, ArrowLeft, ShoppingCart, ExternalLink, X } from 'lucide-react';

const PreviewFrame = () => {
    const { id } = useParams();
    const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
    const [template, setTemplate] = useState(null);

    // Mock data - in a real app this would come from a context or API
    const templates = [
        { id: 1, title: "Ultra Portfolio", price: 49, demoUrl: "/" },
        { id: 2, title: "SaaS Starter Kit", price: 79, demoUrl: "/demo/saas" },
        { id: 3, title: "Luxe E-Commerce", price: 69, demoUrl: "/demo/ecommerce" },
        { id: 4, title: "Agency Pro", price: 59, demoUrl: "/demo/agency" }
    ];

    useEffect(() => {
        const found = templates.find(t => t.id === parseInt(id));
        setTemplate(found);
    }, [id]);

    if (!template) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    const getFrameWidth = () => {
        switch (device) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    return (
        <div className="h-screen flex flex-col bg-neutral-900 overflow-hidden">
            {/* Top Control Bar */}
            <div className="h-16 bg-black border-b border-neutral-800 flex items-center justify-between px-6 z-50 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/store" className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-white font-bold text-sm hidden md:block">{template.title}</h1>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-500/20">Available Now</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-neutral-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setDevice('desktop')}
                        className={`p-2 rounded-md transition-all ${device === 'desktop' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}
                        title="Desktop View"
                    >
                        <Monitor size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('tablet')}
                        className={`p-2 rounded-md transition-all ${device === 'tablet' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}
                        title="Tablet View"
                    >
                        <Tablet size={18} />
                    </button>
                    <button
                        onClick={() => setDevice('mobile')}
                        className={`p-2 rounded-md transition-all ${device === 'mobile' ? 'bg-neutral-700 text-white shadow-sm' : 'text-neutral-500 hover:text-white'}`}
                        title="Mobile View"
                    >
                        <Smartphone size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <p className="text-xs text-neutral-400">Personal License</p>
                        <p className="text-lg font-bold text-white leading-none">${template.price}</p>
                    </div>
                    <Link
                        to="/store"
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-orange-900/20 transition-all flex items-center gap-2 text-sm"
                    >
                        <ShoppingCart size={16} /> Buy Now
                    </Link>
                    <a href={template.demoUrl} className="p-2 text-neutral-500 hover:text-white" title="Remove Frame">
                        <X size={20} />
                    </a>
                </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-neutral-900 flex justify-center overflow-hidden relative">
                <div
                    className={`transition-all duration-500 ease-in-out bg-white shadow-2xl overflow-hidden ${device !== 'desktop' ? 'my-8 rounded-2xl border-4 border-neutral-800' : 'w-full h-full'}`}
                    style={{ width: getFrameWidth() }}
                >
                    <iframe
                        src={template.demoUrl}
                        className="w-full h-full border-0 bg-white"
                        title="Template Preview"
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewFrame;
