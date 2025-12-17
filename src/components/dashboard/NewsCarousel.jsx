import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Globe, AlertTriangle, Database, Shield } from 'lucide-react';

const RSS_FEEDS = [
    { key: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
    { key: "Bleeping Computer", url: "https://www.bleepingcomputer.com/feed/" }
];

// Use rss2json service which is more reliable for client-side usage
// It converts RSS XML to JSON on the server side
const RSS2JSON_API = "https://api.rss2json.com/v1/api.json?rss_url=";

const NewsCarousel = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const allNews = [];

                for (const feed of RSS_FEEDS) {
                    try {
                        const response = await fetch(`${RSS2JSON_API}${encodeURIComponent(feed.url)}`);
                        const data = await response.json();

                        if (data.status === 'ok') {
                            data.items.forEach(item => {
                                allNews.push({
                                    title: item.title,
                                    link: item.link,
                                    date: new Date(item.pubDate),
                                    source: feed.key,
                                    // rss2json returns plaintext 'content' or 'description'
                                    snippet: item.description || item.content,
                                    category: "Cyber Intel",
                                    icon: Shield,
                                    color: "text-primary"
                                });
                            });
                        }
                    } catch (err) {
                        console.error(`Failed to fetch ${feed.key}:`, err);
                    }
                }

                // Sort by date (newest first) and take top 5
                const sortedNews = allNews
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 5);

                if (sortedNews.length > 0) {
                    setNewsItems(sortedNews);
                    setError(null);
                } else {
                    // Fallback to static data if API fails completely so UI doesn't look broken
                    console.warn("API failed, using fallback data");
                    const fallbackData = [
                        {
                            title: "System Update: Security Patches Applied",
                            link: "#",
                            date: new Date(),
                            source: "System",
                            snippet: "Routine security protocols have been updated.",
                            icon: Database,
                            color: "text-secondary"
                        }
                    ];
                    setNewsItems(fallbackData);
                    // Don't set error so we show fallback instead of "Disconnected"
                }

            } catch (err) {
                console.error(err);
                setError("Failed to initialize intelligence feed");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        if (newsItems.length === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % newsItems.length);
        }, 8000); // 8 seconds per slide for reading time
        return () => clearInterval(timer);
    }, [newsItems]);

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " YEARS AGO";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " MONTHS AGO";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " DAYS AGO";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " HOURS AGO";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " MINS AGO";
        return "JUST NOW";
    };

    if (loading) {
        return (
            <div className="bg-surface/30 border border-white/5 rounded-xl p-4 md:p-6 h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 relative">
                        <motion.div
                            className="absolute inset-0 border-2 border-primary/30 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin" />
                    </div>
                    <span className="text-xs font-mono text-primary/70 animate-pulse">ESTABLISHING UPLINK...</span>
                </div>
            </div>
        );
    }

    if (error || newsItems.length === 0) {
        return (
            <div className="bg-surface/30 border border-white/5 rounded-xl p-4 md:p-6 h-full flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-xs font-mono text-muted">FEED DISCONNECTED</p>
                </div>
            </div>
        );
    }

    const currentItem = newsItems[currentIndex];
    const Icon = currentItem.icon;

    return (
        <div className="bg-surface/30 border border-white/5 rounded-xl p-4 md:p-6 relative overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-rajdhani font-bold text-muted uppercase tracking-wider flex items-center gap-2">
                    <Globe size={14} className="text-primary animate-pulse" />
                    Global Intel
                </h3>
                <div className="flex gap-1">
                    {newsItems.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1 rounded-full transition-colors duration-300 cursor-pointer ${idx === currentIndex ? 'bg-primary w-6' : 'bg-white/10 w-2 hover:bg-white/30'
                                }`}
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
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 text-xs font-mono text-primary/80">
                                <span>{currentItem.source}</span>
                                <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                                <span>{formatTimeAgo(currentItem.date)}</span>
                            </div>
                        </div>

                        <h4
                            onClick={() => window.open(currentItem.link, '_blank')}
                            className="text-lg md:text-xl font-bold font-orbitron text-text-main leading-snug hover:text-primary transition-colors cursor-pointer line-clamp-3"
                        >
                            {currentItem.title}
                        </h4>

                        <div
                            className="text-sm text-muted line-clamp-2 font-inter opacity-70"
                            dangerouslySetInnerHTML={{ __html: currentItem.snippet }} // Note: RSS snippets can contain HTML
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div
                onClick={() => window.open(currentItem.link, '_blank')}
                className="mt-4 pt-4 border-t border-white/5 flex gap-2 items-center text-xs text-muted hover:text-text-main transition-colors cursor-pointer group"
            >
                <span>ACCESS FULL INTELLIGENCE</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
};

export default NewsCarousel;
