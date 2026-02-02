import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, User, Lock, AlertCircle, ChevronRight, Terminal, Mail, Info, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CYBER_TIPS = [
    { title: "Did you know?", text: "MFA blocks 99.9% of automated account attacks.", color: "text-blue-400" },
    { title: "Security Tip", text: "Sanitize all user inputs. SQL Injection is still #1.", color: "text-green-400" },
    { title: "Threat Intel", text: "Ransomware groups now use 'Double Extortion'.", color: "text-red-400" },
    { title: "Zero Trust", text: "Never Trust, Always Verify. Assume Breach.", color: "text-purple-400" },
    { title: "OpsSec", text: "Touch nothing unless you must. Burn everything when done.", color: "text-yellow-400" },
];

const CyberTipCard = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % CYBER_TIPS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const tip = CYBER_TIPS[index];

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-black/40 border border-white/5 rounded-lg p-4 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity">
                <Info size={16} />
            </div>
            <h4 className={`text-xs font-mono uppercase tracking-widest mb-2 ${tip.color} flex items-center gap-2`}>
                <Terminal size={12} /> {tip.title}
            </h4>
            <p className="text-gray-300 text-xs font-mono leading-relaxed">
                "{tip.text}"
            </p>
            {/* Progress Bar */}
            <motion.div
                className={`absolute bottom-0 left-0 h-0.5 ${tip.color.replace('text', 'bg')}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
            />
        </motion.div>
    );
};

const ModeratorLogin = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, register, loginWithGoogle, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Login with username/email and password
            await login(username, password);
        } catch (err) {
            // [SUPER ADMIN] Auto-recovery: REMOVED for Security Security.
            // Admin accounts must be managed via Firebase Console only.

            setError(err.message || 'Authentication failed');
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsSubmitting(true);
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message || 'Google Sign-In failed');
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md bg-[#0a0a0a] border border-[#333] p-8 relative shadow-2xl">
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50" />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary" />
                <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary" />

                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <Shield className="text-primary w-10 h-10" strokeWidth={1.5} />
                        <div className="space-y-1">
                            <h1 className="text-xl font-mono font-bold tracking-[0.2em] text-white">NYTVNT_OPS</h1>
                            <p className="text-[#444] font-mono text-[10px] tracking-[0.3em] uppercase">
                                :: SYSTEM SHUTDOWN PENDING ::
                            </p>
                        </div>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-900/10 border border-red-900/50 p-3 flex items-center gap-3"
                            >
                                <Terminal className="w-4 h-4 text-red-500" />
                                <span className="text-red-500 text-xs font-mono">ERROR: {error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-6">
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666] font-mono group-focus-within:text-primary transition-colors">:: Identity</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#333] focus:border-primary text-gray-200 py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#333]"
                                    placeholder="root@system"
                                />
                            </div>
                        </div>

                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666] font-mono group-focus-within:text-primary transition-colors">:: Access Key</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#333] focus:border-primary text-gray-200 py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#333]"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest py-3 transition-all flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? <span className="animate-pulse">Authenticating...</span> : (
                            <>
                                <span>Execute Protocol</span>
                                <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <div className="border-t border-[#222] pt-6 grid grid-cols-1">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="bg-transparent text-[#666] hover:text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-colors"
                        >
                            <span className="w-4 h-4 border border-[#333] rounded-full flex items-center justify-center text-xs">G</span>
                            Sync External Credentials
                        </button>
                    </div>
                </form>
            </div>

            {/* Flash Card Component */}
            <div className="h-24"> {/* Spacer to prevent jumping */}
                <AnimatePresence mode='wait'>
                    <CyberTipCard />
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-widest"
            >
                Secure Connection Established • v1.0.0
            </motion.div>
        </AuthLayout>
    );
};

export default ModeratorLogin;
