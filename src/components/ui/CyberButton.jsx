import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2, Zap, CheckCircle2, Lock } from 'lucide-react';

const CyberButton = ({
    children,
    onClick,
    variant = 'primary', // primary, success, locked
    className,
    disabled = false,
    loading = false,
    icon: Icon = Zap
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        primary: {
            container: "border-primary/50 text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]",
            glitch: "bg-primary"
        },
        success: {
            container: "border-green-500/50 text-green-400 bg-green-500/5 cursor-default",
            glitch: "bg-green-500"
        },
        locked: {
            container: "border-gray-700 text-gray-500 bg-gray-900/50 cursor-not-allowed",
            glitch: "bg-gray-600"
        }
    };

    const currentVariant = disabled ? 'locked' : variant;
    const styles = variants[currentVariant];

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative group overflow-hidden px-8 py-4 w-full md:w-auto min-w-[200px]",
                "border transition-all duration-300 ease-out uppercase font-orbitron font-bold tracking-widest text-sm",
                styles.container,
                className
            )}
        >
            {/* Background Scanline */}
            {!disabled && (
                <motion.div
                    className={cn("absolute inset-0 opacity-10 translate-x-[-100%]", styles.glitch)}
                    animate={isHovered ? { x: ['100%', '-100%'] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
            )}

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50 transition-all group-hover:w-full group-hover:h-full group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50 transition-all group-hover:w-full group-hover:h-full group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                    <>
                        {currentVariant === 'success' && <CheckCircle2 className="w-5 h-5" />}
                        {currentVariant === 'locked' && <Lock className="w-5 h-5" />}
                        {currentVariant === 'primary' && <Icon className={cn("w-5 h-5", isHovered && "animate-pulse")} />}
                        <span>{children}</span>
                    </>
                )}
            </div>

            {/* Glitch Text Effect (Optional duplicate for effect, simplified here) */}
        </button>
    );
};

export default CyberButton;
