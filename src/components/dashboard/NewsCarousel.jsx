import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Globe, AlertTriangle, Database } from 'lucide-react';

const NEWS_ITEMS = [
    {
        id: 1,
        category: "Vulnerability",
        title: "Zero-Day in popular RDP client detected",
        date: "2 HOURS AGO",
        icon: AlertTriangle,
        color: "text-accent"
    },
    {
        id: 2,
        category: "Industry",
        title: "Global cyber alliance forms new defensive pact",
        date: "1 DAY AGO",
        icon: Globe,
        color: "text-secondary"
    },
    {
        id: 3,
        category: "Patch Note",
        title: "Platform Update v2.4: New 'Red Team' tools added",
        date: "12 HOURS AGO",
        icon: Database,
        color: "text-primary"
    }
];

const NewsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const currentItem = NEWS_ITEMS[currentIndex];
    // Helper to get Icon component
    const Icon = currentItem.icon;

    return (
        <div className="bg-surface/30 border border-white/5 rounded-xl p-6 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-rajdhani font-bold text-gray-400 uppercase tracking-wider">Intel Feed</h3>
                <div className="flex gap-1">
                    {NEWS_ITEMS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-8 h-1 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-primary' : 'bg-white/10'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col gap-3 h-full justify-center"
                    >
                        <div className={`p-2 w-fit rounded bg-white/5 ${currentItem.color}`}>
                            <Icon size={24} />
                        </div>
                        <span className={`text-xs font-mono mb-1 ${currentItem.color}`}>{currentItem.category} • {currentItem.date}</span>
                        <h4 className="text-xl font-bold font-orbitron text-gray-200 leading-snug hover:text-white transition-colors cursor-pointer">
                            {currentItem.title}
                        </h4>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 items-center text-xs text-gray-500 hover:text-white transition-colors cursor-pointer group">
                <span>READ FULL REPORT</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export default NewsCarousel;
