import Link from "next/link";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    // Soft, radial gradient background
    <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-gray-50 to-slate-100">
      
      <div className="max-w-4xl w-full space-y-12 text-center pt-10 pb-20">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-slate-600 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            System Operational
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.1]">
          Less clutter. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-800">
            More clarity.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
          A beautifully engineered URL shortener designed to seamlessly transform your lengthy links into sharp, brandable assets.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/shorten" 
            className="group flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-slate-900/20"
          >
            Start Shortening
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 text-left max-w-3xl mx-auto">
            <FeatureBox icon={<Zap className="w-5 h-5"/>} title="Lightning Fast" desc="Powered by Edge infrastructure for instant redirects." />
            <FeatureBox icon={<Shield className="w-5 h-5"/>} title="Secure & Reliable" desc="Built with modern Next.js architecture and NoSQL databases." />
            <FeatureBox icon={<BarChart3 className="w-5 h-5"/>} title="Analytics Ready" desc="Built-in click tracking infrastructure for future insights." />
        </div>
      </div>
    </main>
  );
}

// A small reusable component for the features
function FeatureBox({ icon, title, desc }) {
    return (
        <div className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                {icon}
            </div>
            <h3 className="text-slate-900 font-semibold mb-2">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}