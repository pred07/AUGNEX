import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const QUOTES = [
    "Security is a process, not a product.",
    "The quietest systems are often the most secure.",
    "Trust, but verify.",
    "There is no patch for human stupidity.",
    "Everything is vulnerable in some way.",
    "Digital shadows hide the deepest secrets.",
];

const GreetingHeader = () => {
    const { user } = useAuth();
    const [time, setTime] = useState(new Date());
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const quoteTimer = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }, 8000); // Rotate every 8s
        return () => clearInterval(quoteTimer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).toUpperCase();
    };

    const getDisplayName = () => {
        if (user?.username) return user.username;
        if (user?.displayName) return user.displayName;
        if (user?.email) return user.email.split('@')[0];
        return 'OPERATOR';
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-white/5 pb-6">
            <div className="space-y-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-baseline gap-3"
                >
                    <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-text-main tracking-wide">
                        WELCOME BACK, <Link to="/profile" className="text-primary glow-text hover:text-text-main transition-colors">{getDisplayName()}</Link>
                    </h1>
                    <span className="text-xs font-mono py-1 px-2 border border-primary/30 text-primary bg-primary/5 rounded">
                        {user?.rank || 'NEOPHYTE'}
                    </span>
                </motion.div>

                <div className="h-6 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={quoteIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="text-primary/80 text-sm font-mono tracking-wide"
                        >
                            "{QUOTES[quoteIndex]}"
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            <div className="text-right font-mono text-secondary">
                <div className="text-2xl font-bold tracking-widest">{formatTime(time)}</div>
                <div className="text-xs text-secondary/70 tracking-wider text-right uppercase">{formatDate(time)}</div>
                <div className="text-[10px] text-muted mt-1 uppercase">Sys.Online • v2.4.0</div>
            </div>
        </div>
    );
};

export default GreetingHeader;
