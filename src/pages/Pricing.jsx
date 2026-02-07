import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Check, Ticket, Coins, Lock, Terminal, Shield, Cpu, Code, Target } from 'lucide-react';
import Button from '../components/ui/Button';
import { db } from '../lib/firebase';
import { redeemCoupon as redeemCouponService } from '../lib/firestoreService';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

const Pricing = () => {
    const { user } = useAuth();
    const { balance } = useWallet();

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [redeeming, setRedeeming] = useState(false);
    const [message, setMessage] = useState(null);

    const checkUnlock = (tier) => {
        if (!user) return alert("ACCESS DENIED: Authentication required.");

        if (tier === 'starter') return; // Already accepted

        if (tier === 'elite') {
            if (balance >= 1500) {
                // Logic to deduct would go here in future
                alert("Initiating Tier Upgrade... [Not Implemented: Deduct 1500 Coins]");
            } else {
                alert("INSUFFICIENT FUNDS. Complete more contracts or solve the Gatekeeper challenge.");
            }
        }

        if (tier === 'warlord') {
            if (balance >= 5000) {
                alert("Initiating Warlord Ascension... [Not Implemented: Deduct 5000 Coins]");
            } else {
                alert("ACCESS DENIED. Find the hidden flag or accumulate 5000 Coins.");
            }
        }
    };

    const handleRedeem = async (e) => {
        e.preventDefault();
        setMessage(null);
        setRedeeming(true);

        try {
            if (!user) {
                setMessage({ type: 'error', text: 'Please login first.' });
                return;
            }

            const result = await redeemCouponService(user.uid, couponCode);

            if (result.success) {
                setMessage({ type: 'success', text: result.message });
                setCouponCode('');
                setTimeout(() => window.location.reload(), 1500);
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Redemption failed.' });
        } finally {
            setRedeeming(false);
        }
    };

    const tiers = [
        {
            id: 'starter',
            name: 'Starter Agent',
            cost: 'FREE',
            subtext: 'Default Clearance',
            features: ['Access to Basic Modules', 'Community Access', 'Public Leaderboard'],
            icon: Terminal,
            color: 'from-blue-500 to-cyan-500',
            action: 'ACTIVE',
            active: true
        },
        {
            id: 'elite',
            name: 'Elite Operative',
            cost: '1500 ₡',
            subtext: 'OR Solve "Gatekeeper" CTF',
            features: ['Unlock Advanced Modules', 'Private Discord Channel', 'Certification', 'Priority Support'],
            icon: Cpu,
            color: 'from-purple-500 to-pink-500',
            action: 'UNLOCK TIER',
            popular: true
        },
        {
            id: 'warlord',
            name: 'Cyber Warlord',
            cost: '5000 ₡',
            subtext: 'OR Find Hidden Root Flag',
            features: ['Lifetime Access', '1-on-1 Mentorship', 'Custom Learning Path', 'Physical Swag Pack'],
            icon: Target,
            color: 'from-amber-500 to-red-500',
            action: 'INITIATE BREACH'
        }
    ];

    return (
        <div className="pt-24 pb-12 px-4 container mx-auto relative min-h-screen">

            {/* Wallet & Header Section */}
            <div className="flex flex-col items-center mb-16">
                {/* Wallet Status Card */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-black/40 border border-primary/50 rounded-2xl p-6 mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,157,0.15)] flex items-center gap-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">Current Balance</h2>
                            <div className="flex items-center gap-2 text-4xl font-bold text-white font-mono">
                                <span className="text-yellow-400">₡</span> {balance ?? 0}
                            </div>
                        </div>
                        <div className="h-12 w-px bg-white/10 hidden md:block"></div>
                        <div className="text-center md:text-left">
                            <h2 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">Mining Status</h2>
                            <div className="flex items-center gap-2 text-lg text-green-400 font-mono">
                                <Cpu size={18} className="animate-pulse" /> ACTIVE (0.05 ₡/hr)
                            </div>
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 text-center">
                    OPERATIONAL TIERS
                </h1>
                <p className="text-gray-400 font-mono text-center max-w-2xl">
                    You cannot buy rank here; you earn it. Complete contracts, solve challenges, or mine resources to unlock higher clearance levels.
                </p>
            </div>

            {/* Active Contracts / Earning Guide */}
            <div className="max-w-6xl mx-auto mb-16">
                <div className="flex items-center gap-2 mb-6">
                    <Terminal className="text-primary" size={20} />
                    <h3 className="text-xl font-orbitron font-bold text-white tracking-widest">ACTIVE CONTRACTS (WAYS TO EARN)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <Code className="text-blue-400 group-hover:scale-110 transition-transform" size={28} />
                            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-2 py-1 rounded font-mono">+ 15 ₡</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">Module Mastery</h4>
                        <p className="text-sm text-gray-400">Complete 50% of any Learning Path modules with a passing grade.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <Shield className="text-purple-400 group-hover:scale-110 transition-transform" size={28} />
                            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-1 rounded font-mono">+ 10 ₡</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">CTF Hunter</h4>
                        <p className="text-sm text-gray-400">Successfully capture a flag in any standalone challenge environment.</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <Ticket className="text-green-400 group-hover:scale-110 transition-transform" size={28} />
                            <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded font-mono">INVITE</span>
                        </div>
                        <h4 className="font-bold text-white mb-2">Shadow Network</h4>
                        <p className="text-sm text-gray-400">Find hidden access codes or receive an invitation from a Warlord.</p>
                    </div>
                </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                {tiers.map((tier, index) => {
                    const Icon = tier.icon;
                    return (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className={`relative group glass-card rounded-xl p-8 overflow-hidden hover:border-white/30 transition-all flex flex-col ${tier.popular ? 'border-primary shadow-[0_0_20px_rgba(0,255,157,0.15)]' : ''}`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg font-mono">
                                    POPULAR
                                </div>
                            )
                            }

                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6 shadow-lg`}>
                                <Icon className="text-white w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{tier.name}</h3>

                            <div className="mb-6">
                                <div className="text-3xl font-bold text-white font-mono flex items-center gap-2">
                                    {tier.cost}
                                </div>
                                <div className="text-xs text-primary font-mono mt-1 font-bold">
                                    {tier.subtext}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features?.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm group-hover:text-white transition-colors">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full font-bold tracking-wider ${tier.id === 'warlord' ? 'bg-red-900/50 hover:bg-red-800 text-red-100 border-red-800' : tier.popular ? 'bg-primary text-black hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20 border-0'}`}
                                variant={tier.id === 'warlord' ? 'outline' : 'solid'}
                                onClick={() => checkUnlock(tier.id)}
                                disabled={tier.active}
                            >
                                {tier.active ? 'CURRENT STATUS' : tier.action}
                            </Button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Access Code Section */}
            <div className="max-w-lg mx-auto text-center border-t border-white/10 pt-12">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-center gap-2 font-orbitron">
                    <Lock className="text-gray-500" size={18} />
                    HAVE AN ACCESS CODE?
                </h3>

                <div className="bg-black/30 border border-white/10 rounded-xl p-2 pl-4 flex items-center gap-2 focus-within:border-primary/50 transition-colors">
                    <input
                        type="text"
                        placeholder="ENTER ENCRYPTED KEY"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-transparent text-white font-mono placeholder:text-gray-600 outline-none uppercase tracking-wider"
                    />
                    <Button
                        onClick={handleRedeem}
                        disabled={redeeming || !couponCode}
                        className="bg-white/10 hover:bg-white/20 text-white border-0"
                    >
                        {redeeming ? 'DECRYPTING...' : 'ACCESS'}
                    </Button>
                </div>
                {message && (
                    <p className={`mt-4 text-xs font-mono ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {message.text}
                    </p>
                )}
            </div>

        </div >
    );
};

export default Pricing;
