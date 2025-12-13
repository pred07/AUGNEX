import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Input = React.forwardRef(({ className, type, label, error, icon: Icon, ...props }, ref) => {
    return (
        <div className="space-y-1">
            {label && <label className="text-xs font-orbitron text-gray-400 tracking-wider uppercase ml-1">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors duration-300">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "w-full bg-surface/50 border border-white/10 text-gray-100 px-4 py-2 text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-surface/80 transition-all duration-300",
                        Icon && "pl-10",
                        error && "border-accent/50 focus:border-accent focus:ring-accent/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-focus-within:border-primary/50 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-focus-within:border-primary/50 transition-colors duration-300" />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-accent font-mono ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
