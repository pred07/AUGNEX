import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group ${className}`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
            <div className="relative z-10">
                {theme === 'dark' ? (
                    <Sun size={20} className="text-yellow-400 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                    <Moon size={20} className="text-blue-400 group-hover:-rotate-12 transition-transform duration-500" />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
