import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, User, Lock, AlertCircle, ChevronRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, isAuthenticated } = useAuth();
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
            await login(username, password);
            // Navigation happens in useEffect
        } catch (err) {
            setError(err.message || 'Authentication failed');
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
                        <h1 className="text-2xl font-orbitron font-bold tracking-widest text-white">AUGNEX</h1>
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
                            label="Identity"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={User}
                            autoComplete="username"
                            required
                        />

                        <Input
                            label="Key"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        isLoading={isSubmitting}
                        icon={ChevronRight}
                    >
                        Authenticate
                    </Button>

                    {/* Fake Oauth placeholders as per prompt */}
                    <div className="mt-6 pt-6 border-t border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                        <p className="text-center text-xs text-gray-500 font-mono mb-3">ALTERNATIVE PROTOCOLS (OFFLINE)</p>
                        <div className="flex gap-2 justify-center">
                            {/* <Button variant="ghost" size="sm" disabled>Google OAuth</Button> */}
                            {/* <Button variant="ghost" size="sm" disabled>GitHub Access</Button> */}
                            <div className="text-[10px] text-gray-600 font-mono flex items-center gap-2">
                                <Terminal size={12} />
                                <span>SSO_MODULE_NOT_LOADED</span>
                            </div>
                        </div>
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
