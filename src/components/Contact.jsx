import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const Contact = () => {
    const { t } = useSiteContent();
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-6 border border-primary-500/20">
                            <MessageSquare size={16} />
                            <span>{t('contact.badge', 'Get in Touch')}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('contact.titleLine1', "Let's Build Something")} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">{t('contact.titleHighlight', 'Extraordinary.')}</span>
                        </h2>
                        <p className="text-neutral-400 text-lg mb-12 leading-relaxed">
                            {t(
                                'contact.description',
                                "Have a project idea? I'm available for freelance work and open to discussing new opportunities. Let's turn your vision into a reality."
                            )}
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start group">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center text-primary-500 border border-neutral-800 group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-all">
                                    <Mail size={24} />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">Email</h3>
                                    <p className="text-neutral-400">contact@vihanga.dev</p>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center text-primary-500 border border-neutral-800 group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-white font-bold text-lg mb-1">{t('contact.locationLabel', 'Location')}</h3>
                                    <p className="text-neutral-400">{t('contact.locationValue', 'Mahavilachchiya, Anuradhapura, Sri Lanka')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-900/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-neutral-800 shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-neutral-600" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
                                    <input type="email" id="email" className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-neutral-600" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-neutral-300 mb-2">Project Type</label>
                                <div className="relative">
                                    <select id="type" defaultValue="" className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer">
                                        <option value="" disabled>Select what you need...</option>
                                        <option value="website">Custom Website</option>
                                        <option value="ecommerce">E-Commerce Store</option>
                                        <option value="mobile">Mobile Application</option>
                                        <option value="game">Game Development</option>
                                        <option value="film">Film/Media Portfolio</option>
                                        <option value="other">Other / Consultation</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Project Details</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-neutral-600" placeholder="Tell me about your project goals, timeline, and budget..."></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-primary-900/20 hover:shadow-primary-900/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                                {t('contact.submitCta', 'Send Request')} <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
