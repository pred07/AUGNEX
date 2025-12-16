import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const BackgroundEffects = () => {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Base Grid - Subtle */}
            <div className={`absolute inset-0 bg-grid-pattern ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.05]'} transition-opacity duration-1000`} />

            {/* Scanning Line Animation (Dark Mode Only) */}
            {theme === 'dark' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[20%] animate-scan opacity-20" />
            )}

            {/* Ambient Glows */}
            <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] ${theme === 'dark' ? 'bg-primary/10' : 'bg-secondary/10'} transition-colors duration-1000`} />
            <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] ${theme === 'dark' ? 'bg-secondary/10' : 'bg-primary/10'} transition-colors duration-1000`} />

            {/* Particles (CSS based for performance simplicity) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse-slow" />
                <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse-slow delay-700" />
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-accent rounded-full animate-pulse-slow delay-1000" />
            </div>
        </div>
    );
};

export default BackgroundEffects;
