import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star, Ticket, Coins, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import { getDoc, doc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { redeemCoupon as redeemCouponService } from '../lib/firestoreService';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    // Coupon State
    const [couponCode, setCouponCode] = useState('');
    const [redeeming, setRedeeming] = useState(false);
    const [message, setMessage] = useState(null);

    // Sales Modal State
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
    const [submitting, setSubmitting] = useState(false);

    // Default plans
    const defaultPlans = [
        {
            id: 'starter',
            name: 'Starter Agent',
            price: '$29',
            coins: '500',
            features: ['Access to Basic Modules', '24/7 Support', 'Community Access'],
            icon: Star,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'pro',
            name: 'Elite Operative',
            price: '$49',
            coins: '1500',
            features: ['All Modules Unlocked', 'Priority Support', 'Private Discord Channel', 'Certification'],
            icon: Zap,
            color: 'from-purple-500 to-pink-500',
            popular: true
        },
        {
            id: 'enterprise',
            name: 'Cyber Warlord',
            price: '$99',
            coins: '3500',
            features: ['Lifetime Access', '1-on-1 Mentorship', 'Custom Learning Path', 'Physical Swag Pack'],
            icon: Crown,
            color: 'from-amber-500 to-red-500'
        }
    ];

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, email: user.email, name: user.displayName || '' }));
        }
    }, [user]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'bundles'));
                if (!querySnapshot.empty) {
                    const dbPlans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPlans(dbPlans.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''))));
                } else {
                    setPlans(defaultPlans);
                }
            } catch (error) {
                console.error("Error fetching plans, using defaults", error);
                setPlans(defaultPlans);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

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
                // Simple refresh to show new balance
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

    const handleOpenModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleSubmitLead = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, 'inquiries'), {
                ...formData,
                plan: selectedPlan.name,
                planId: selectedPlan.id,
                userId: user?.uid || 'anonymous',
                createdAt: serverTimestamp(),
                status: 'pending'
            });

            alert(`Request received! We will contact you at ${formData.phone} shortly.`);
            setIsModalOpen(false);
            setFormData({ name: '', phone: '', email: user?.email || '', notes: '' });
        } catch (error) {
            console.error("Error submitting lead:", error);
            alert("Failed to send request. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-12 px-4 container mx-auto relative">
            {/* Sales Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-surface border border-white/10 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-orbitron font-bold text-white mb-2">Request Access</h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Interested in <span className="text-primary font-bold">{selectedPlan?.name}</span>?
                            Fill out the form below to receive a callback from our sales team.
                        </p>

                        <form onSubmit={handleSubmitLead} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">FULL NAME</label>
                                <input
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">EMAIL ADDRESS</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 outline-none"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">PHONE NUMBER</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 outline-none"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-400 mb-1">ADDITIONAL NOTES</label>
                                <textarea
                                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary/50 outline-none h-24 resize-none"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    placeholder="Any specific requirements?"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-black hover:bg-primary/90 mt-4 font-bold"
                                disabled={submitting}
                            >
                                {submitting ? 'SENDING...' : 'SUBMIT REQUEST'}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4"
                >
                    ACCESS PROTOCOLS
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 font-mono max-w-2xl mx-auto"
                >
                    Select your clearance level. Acquire coins to unlock advanced cyber-warfare modules.
                </motion.p>
            </div>

            {/* Coupon Redemption */}
            {user && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto mb-16"
                >
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Ticket size={40} className="text-primary" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Coins className="text-yellow-400" size={18} />
                            Redeem Voucher
                        </h3>

                        <form onSubmit={handleRedeem} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="ENTER CODE"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono placeholder:text-gray-600 focus:border-primary/50 outline-none uppercase"
                            />
                            <Button
                                type="submit"
                                disabled={redeeming || !couponCode}
                                className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20"
                            >
                                {redeeming ? '...' : 'CLAIM'}
                            </Button>
                        </form>
                        {message && (
                            <p className={`mt-3 text-xs font-mono ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message.text}
                            </p>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, index) => {
                    const Icon = plan.icon || Zap;
                    return (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className={`relative group bg-black/40 border ${plan.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/10'} rounded-2xl p-8 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 rounded-bl-lg font-mono">
                                    RECOMMENDED
                                </div>
                            )}

                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color || 'from-gray-700 to-gray-900'} flex items-center justify-center mb-6`}>
                                <Icon className="text-white w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-gray-500 font-mono">/ bundle</span>
                            </div>

                            <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/5">
                                <div className="flex items-center gap-2 text-yellow-400 font-mono font-bold">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                    {plan.coins} COINS
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Instant wallet credit</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features?.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full font-bold tracking-wider ${plan.popular ? 'bg-primary text-black hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20 border-0'}`}
                                variant="ghost"
                                onClick={() => handleOpenModal(plan)}
                            >
                                CONTACT SALES
                            </Button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Pricing;
