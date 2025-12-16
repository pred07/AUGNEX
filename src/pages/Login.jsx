import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, User, Lock, AlertCircle, ChevronRight, Terminal, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
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
            if (isLogin) {
                // For login, username field can be username OR email
                await login(username, password);
            } else {
                // For registration, we need all fields
                if (!email) throw new Error("Email is required for registration");
                await register(email, password, username);
            }
        } catch (err) {
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
            <div className="glass-card p-8 rounded-lg border-t border-white/10 relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="text-center mb-8">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-3 mb-2"
                    >
                        <Shield className="text-primary w-8 h-8" />
                        <h1 className="text-2xl font-orbitron font-bold tracking-widest text-white">NYTVNT-OPS</h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-primary/70 font-mono text-xs tracking-[0.3em] uppercase"
                    >
                        Restricted Access // Level 4
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-accent/10 border border-accent/20 rounded-md p-3 flex items-start gap-3 overflow-hidden"
                            >
                                <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <p className="text-accent text-sm font-mono">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
                        <Input
                            label={isLogin ? "Identity" : "Username"}
                            type="text"
                            placeholder={isLogin ? "Username or Email" : "Choose a username"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={User}
                            autoComplete="username"
                            required
                        />

                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        icon={Mail}
                                        autoComplete="email"
                                        required={!isLogin}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Input
                            label="Key"
                            type="password"
                            placeholder={isLogin ? "Enter password" : "Create password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        isLoading={isSubmitting}
                        icon={ChevronRight}
                    >
                        {isLogin ? 'Authenticate' : 'Initialize Protocol'}
                    </Button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-primary/70 hover:text-primary text-xs font-mono tracking-wider uppercase transition-colors"
                        >
                            {isLogin ? "New User? Create Account" : "Already have access? Login"}
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-center text-xs text-gray-500 font-mono mb-3">EXTERNAL PROTOCOLS</p>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isSubmitting}
                            className="w-full bg-white text-black hover:bg-gray-100 font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            )}
                            Sign in with Google
                        </button>
                    </div>
                </form>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-widest"
            >
                Secure Connection Established • v0.9.1
            </motion.div>
        </AuthLayout>
    );
};

export default Login;
