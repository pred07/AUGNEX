import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
    { id: 1, type: 'gif', url: 'https://i.giphy.com/media/LMc7w09YDQM5hIwSFq/giphy.gif', alt: "Abstract Digital Network" },
    { id: 2, type: 'gif', url: 'https://i.giphy.com/media/UNbR67123jN5pL8g7i/giphy.gif', alt: "Cyberpunk City Loop" },
    { id: 3, type: 'gif', url: 'https://i.giphy.com/media/X0S1sZ76r76E0/giphy.gif', alt: "Server Room Lights" },
    { id: 4, type: 'gif', url: 'https://i.giphy.com/media/BHNTV990T8rMk/giphy.gif', alt: "Matrix Rain Code" },
    { id: 5, type: 'gif', url: 'https://i.giphy.com/media/11FuEnXyGsXTEc/giphy.gif', alt: "Dark Web Abstract" },
];

const CyberBackgroundSlides = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 8000); // Slower transition for GIFs to play out

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Background Media */}
                    <div className="absolute inset-0">
                        <img
                            src={SLIDES[currentSlide].url}
                            alt={SLIDES[currentSlide].alt}
                            className="w-full h-full object-cover opacity-40 blur-[2px] scale-105"
                        />
                    </div>

                    {/* Gradient overlays for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                    {/* Animated scan line effect override */}
                    <motion.div
                        animate={{ y: ['0%', '100%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-64 pointer-events-none"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Slide indicators removed */}
            {/* Slide title removed */}
        </div>
    );
};

export default CyberBackgroundSlides;
