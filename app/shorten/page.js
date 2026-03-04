"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Type, ArrowRight, Check, AlertCircle, Loader2, Copy } from 'lucide-react';

export default function ShortenPage() {
    const [url, setUrl] = useState('');
    const [shorturl, setShorturl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setError('');
        setGeneratedUrl('');
        setIsLoading(true);
        setCopied(false);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, shorturl }),
            });

            const data = await response.json();

            if (response.ok) {
                setGeneratedUrl(`${window.location.origin}/${data.shorturl}`);
                setUrl('');
                setShorturl('');
            } else {
                setError(data.error || 'An error occurred.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6 bg-[#FAFAFA]">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-black/[0.03] p-6 sm:p-12"
            >
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-semibold text-black tracking-tight mb-2">Shorten your link</h1>
                    <p className="text-gray-400 font-light text-sm">Enter your destination URL below.</p>
                </div>
                
                <form onSubmit={handleGenerate} className="space-y-6">
                    
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest">Destination</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-black transition-colors">
                                <Link2 className="w-4 h-4" />
                            </div>
                            <input
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 focus:outline-none transition-all placeholder:text-gray-300 text-black text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest flex justify-between">
                            <span>Custom Alias</span>
                            <span className="text-gray-300">Optional</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-black transition-colors">
                                <Type className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. portfolio"
                                value={shorturl}
                                onChange={(e) => setShorturl(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 focus:outline-none transition-all placeholder:text-gray-300 text-black text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-4 px-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 text-sm"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Generate Link
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-center gap-3 mt-4">
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        {generatedUrl && (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-2 bg-gray-50 border border-gray-100 rounded-2xl mt-4 flex items-center justify-between">
                                    {/* FIX: We changed this from a div to an 'a' tag to make it clickable! */}
                                    <a 
                                        href={generatedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 truncate px-3 text-sm font-medium text-black hover:text-gray-500 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 rounded"
                                    >
                                        {generatedUrl}
                                    </a>
                                    <button 
                                        onClick={copyToClipboard}
                                        className="p-3 bg-white hover:bg-gray-100 border border-gray-100 rounded-xl transition-all text-black flex items-center justify-center shrink-0"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </main>
    );
}