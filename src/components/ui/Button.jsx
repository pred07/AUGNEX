import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    disabled,
    ...props
}) => {
    const baseStyles = "relative font-rajdhani font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center overflow-hidden group";

    const variants = {
        primary: "bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_15px_rgba(0,255,157,0.3)]",
        secondary: "bg-secondary/10 text-secondary border border-secondary/50 hover:bg-secondary/20 hover:border-secondary hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]",
        ghost: "bg-transparent text-muted hover:text-white hover:bg-white/5",
        danger: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(255,0,60,0.3)]",
    };

    const sizes = {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], (isLoading || disabled) && "opacity-50 cursor-not-allowed", className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
        </motion.button>
    );
};

export default Button;
