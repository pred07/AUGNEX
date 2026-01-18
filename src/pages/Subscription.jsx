import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Check, AlertCircle, CreditCard, Gift, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { redeemCoupon } from '../lib/firestoreService';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Subscription() {
    const { user } = useAuth();
    const [couponCode, setCouponCode] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    // Dynamic Bundles State
    const [bundles, setBundles] = useState([]);
    const [bundlesLoading, setBundlesLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'coin_bundles'), orderBy('price', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBundles(items);
            setBundlesLoading(false);
        }, (error) => {
            console.warn("Firestore access failed (likely rules). Using mock data.", error);
            // Fallback to mock data so UI doesn't break
            setBundles([
                { id: 'mock1', name: 'Starter Pack', coins: 100, price: 1 },
                { id: 'mock2', name: 'Pro Bundle', coins: 550, price: 5 },
                { id: 'mock3', name: 'Ultimate Stash', coins: 1200, price: 10 }
            ]);
            setBundlesLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleRedeem = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) return;

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const result = await redeemCoupon(user.uid, couponCode);
            if (result.success) {
                setMessage({ text: result.message, type: 'success' });
                setCouponCode('');
            } else {
                setMessage({ text: result.message, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: "Transaction failed. Please try again.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 bg-background relative overflow-hidden text-white font-inter">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-20" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none opacity-20" />

            <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-mono tracking-wider uppercase mb-2">
                        <Coins size={12} />
                        <span>Premium Currency</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span className="block text-white mb-2">Power Up Your</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-purple-400">
                            Learning Journey
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Acquire coins to unlock advanced modules, specialized paths, and exclusive content.
                        Instant delivery to your wallet.
                    </p>
                </motion.div>

                {/* Coin Bundles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {bundlesLoading ? (
                        <div className="col-span-3 flex justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <Loader className="w-8 h-8 animate-spin text-primary" />
                                <span className="text-gray-500 font-mono text-sm">Loading market data...</span>
                            </div>
                        </div>
                    ) : bundles.length > 0 ? (
                        bundles.map((bundle, index) => {
                            const isPopular = index === 1; // Assuming middle one is popular
                            return (
                                <motion.div
                                    key={bundle.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative group rounded-3xl p-1 transition-all duration-300 ${isPopular ? 'bg-gradient-to-b from-primary/50 to-purple-600/50 shadow-[0_0_40px_rgba(0,255,157,0.15)]' : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-primary/20 transition-colors duration-500" />

                                    <div className="relative h-full bg-[#0a0a0a] rounded-[22px] p-8 flex flex-col items-center text-center border border-white/5 overflow-hidden">
                                        {/* Glow Effect */}
                                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-primary/50 transition-colors" />

                                        {isPopular && (
                                            <div className="absolute top-5 right-5">
                                                <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full uppercase tracking-wider">
                                                    Popular
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-4 p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                            <Coins size={32} className={isPopular ? "text-primary" : "text-gray-400"} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-1">{bundle.name}</h3>
                                        <div className="flex items-baseline justify-center gap-1 mb-6">
                                            <span className="text-4xl font-bold text-white tracking-tighter">${bundle.price}</span>
                                        </div>

                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                                        <ul className="space-y-4 mb-8 text-sm text-gray-400 w-full px-4">
                                            <li className="flex items-center gap-3">
                                                <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Check size={10} /></div>
                                                <span className="text-white font-bold">{bundle.coins} Coins</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="p-1 rounded-full bg-white/10"><Check size={10} /></div>
                                                <span>Instant Wallet Credit</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <div className="p-1 rounded-full bg-white/10"><Check size={10} /></div>
                                                <span>Secure Processing</span>
                                            </li>
                                        </ul>

                                        <div className="mt-auto w-full">
                                            <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${isPopular
                                                    ? 'bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]'
                                                    : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}>
                                                <CreditCard size={16} />
                                                <span>Purchase</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-3 text-center py-12 text-gray-500">
                            Market currently closed.
                        </div>
                    )}
                </div>

                {/* Coupon Redemption Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative group perspective-1000">
                        {/* Ticket notches */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full z-20" />
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full z-20" />

                        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
                            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 text-purple-400">
                                    <Gift className="w-5 h-5" />
                                    <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80">Redeem Code</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Have a Gift Code?</h2>
                                <p className="text-gray-400 text-sm">Enter your promotional code to instantly add coins to your secure wallet.</p>

                                <form onSubmit={handleRedeem} className="space-y-4 pt-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            placeholder="ENTER CODE..."
                                            className="flex-1 bg-black/50 border border-white/10 focus:border-purple-500 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-600 outline-none transition-all"
                                        />
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'APPLY'}
                                        </button>
                                    </div>
                                    <AnimatePresence>
                                        {message.text && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className={`text-sm flex items-center gap-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                                            >
                                                {message.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
                                                {message.text}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>

                            {/* Decorative Right Side for Ticket Look */}
                            <div className="hidden md:flex flex-col items-center justify-center border-l-2 border-dashed border-white/10 pl-8 py-2">
                                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 mb-2">
                                    <Gift size={32} />
                                </div>
                                <span className="font-mono text-[10px] text-gray-500 uppercase rotate-90 origin-center translate-y-4">Valid Only</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
