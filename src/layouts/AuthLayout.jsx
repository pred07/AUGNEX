import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            {/* Anonymous Mask GIF Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/anonymous-bg.gif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/60 z-[1]" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat z-10" />
            <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[200%] w-full pointer-events-none z-0" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-20 w-full max-w-md px-4"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
