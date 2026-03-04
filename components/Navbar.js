"use client"
import Link from 'next/link';
import { Link2, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 pt-4 sm:pt-6 pb-4 px-4 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent backdrop-blur-[2px]">
            <motion.nav 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto bg-white/60 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between w-full max-w-3xl"
            >
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="bg-black p-1.5 rounded-lg group-hover:bg-gray-800 transition-colors">
                        <Link2 className="w-4 h-4 text-white" />
                    </div>
                    {/* Hide "Links" text on ultra-small screens to save space */}
                    <span className="text-base sm:text-lg font-medium tracking-tight text-black">
                        Stenox<span className="text-gray-400 font-light hidden sm:inline">Links</span>
                    </span>
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-3 sm:space-x-6">
                    <Link 
                        href="/shorten" 
                        className="text-xs sm:text-sm font-medium text-gray-500 hover:text-black transition-colors"
                    >
                        Create Link
                    </Link>
                    <Link 
                        href="https://github.com" 
                        target="_blank"
                        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all"
                    >
                        <Github className="w-4 h-4" />
                        {/* Hide the word "GitHub" on mobile, keep the icon */}
                        <span className="hidden sm:inline">GitHub</span>
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}