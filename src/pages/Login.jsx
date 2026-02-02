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

const Login = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Login with username/email and password
            await login(username, password);
            // Explicitly navigate after successful login
            navigate(from, { replace: true });
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
            // Explicitly navigate after successful login
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Google Sign-In failed');
            setIsSubmitting(false);
        }
    };

    // Secret Konami-style access to moderator login
    const handleSecretClick = (e) => {
        if (e.detail === 3) {
            navigate('/moderator');
        }
    }

    return (
        <AuthLayout>
            <div className="glass-card p-8 rounded-lg border-t border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-xl">
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-3 mb-2 cursor-default"
                        onClick={handleSecretClick}
                    >
                        <Shield className="text-primary w-12 h-12 animate-pulse-slow mx-auto" strokeWidth={1} />
                    </motion.div>
                    <h1 className="text-2xl font-orbitron font-bold tracking-widest text-white mt-4">
                        NYTVNT
                    </h1>
                    <p className="text-gray-400 text-xs tracking-wider mt-2">
                        Operational Intelligence Platform
                    </p>
                </div>

                <div className="space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="bg-red-500/10 border border-red-500/20 rounded p-3 flex gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Primary SSO Action */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isSubmitting}
                        className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 px-4 rounded transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg shadow-white/10 group"
                    >
                        {isSubmitting ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        <span className="font-bold">Continue with Google</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#0f1219] px-2 text-gray-500 font-mono">System Access</span>
                        </div>
                    </div>

                    <div className="bg-black/20 rounded p-4 border border-white/5">
                        <div className="flex items-center gap-2 mb-2 text-xs text-primary font-mono uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Threat Briefing
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            Current Threat Level: <span className="text-yellow-400">ELEVATED</span>.
                            New zero-day detected in standard lib dependencies.
                            Patch cycle initialized.
                        </p>
                    </div>

                </div>
            </div>

            {/* Flash Card Component - Still useful for waiting/loading */}
            <div className="h-24">
                <AnimatePresence mode='wait'>
                    <CyberTipCard />
                </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center gap-4 text-[10px] text-gray-600 font-mono uppercase">
                <span>Secure • Encrypted • Logged</span>
                <span className="text-gray-800">|</span>
                <button onClick={() => navigate('/moderator')} className="hover:text-gray-400 transition-colors">
                    Admin Protocol
                </button>
            </div>
        </AuthLayout>
    );
};

export default Login;
