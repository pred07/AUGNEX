import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

/**
 * Badge Component
 * Displays a badge with locked/unlocked states
 * 
 * @param {Object} badge - Badge data from badges.js
 * @param {boolean} unlocked - Whether the badge is unlocked
 * @param {string} className - Additional CSS classes
 */
const Badge = ({ badge, unlocked = false, className }) => {
    const Icon = badge.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: unlocked ? 1.05 : 1 }}
            className={cn(
                "relative group cursor-default",
                className
            )}
        >
            <div
                className={cn(
                    "relative p-6 rounded-xl border-2 transition-all duration-300",
                    unlocked
                        ? `${badge.bgColor} ${badge.borderColor} ${badge.glowColor}`
                        : "bg-black/40 border-white/5 opacity-50"
                )}
            >
                {/* Lock Overlay for Locked Badges */}
                {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm">
                        <Lock size={32} className="text-gray-600" />
                    </div>
                )}

                {/* Badge Icon */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className={cn(
                            "p-4 rounded-lg border transition-all duration-300",
                            unlocked
                                ? `${badge.color} ${badge.borderColor} bg-black/50`
                                : "text-gray-700 border-white/5 bg-black/20"
                        )}
                    >
                        <Icon size={32} />
                    </div>

                    <div className="text-center">
                        <h3
                            className={cn(
                                "text-sm font-bold font-rajdhani uppercase tracking-wider mb-1",
                                unlocked ? badge.color : "text-gray-600"
                            )}
                        >
                            {badge.title}
                        </h3>
                        <p className="text-[10px] font-mono text-gray-500 leading-tight">
                            {badge.description}
                        </p>
                    </div>
                </div>

                {/* Unlocked Indicator */}
                {unlocked && (
                    <div className="absolute top-2 right-2">
                        <div className={cn("w-2 h-2 rounded-full animate-pulse", badge.color.replace('text-', 'bg-'))} />
                    </div>
                )}
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 border border-white/10 rounded text-xs font-mono text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {unlocked ? 'UNLOCKED' : 'LOCKED - Complete the path to unlock'}
            </div>
        </motion.div>
    );
};

export default Badge;
