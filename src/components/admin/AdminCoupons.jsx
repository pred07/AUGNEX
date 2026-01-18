import React, { useState, useEffect } from 'react';
import { createCoupon, getCoupons, deleteCoupon } from '../../lib/firestoreService';
import { Coins, Ticket, Trash2 } from 'lucide-react';
import CyberButton from '../ui/CyberButton';

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [newCoupon, setNewCoupon] = useState({ code: '', amount: 100 });

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        setLoading(true);
        try {
            const data = await getCoupons();
            setCoupons(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCoupon = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try {
            const success = await createCoupon(newCoupon.code, newCoupon.amount);
            if (success) {
                alert("Coupon created!");
                setNewCoupon({ code: '', amount: 100 });
                loadCoupons();
            } else {
                alert("Failed to create. Code might exist.");
            }
        } finally {
            setProcessing(false);
        }
    };

    const handleDeleteCoupon = async (code) => {
        if (!window.confirm("Delete this coupon?")) return;
        setProcessing(true);
        await deleteCoupon(code);
        loadCoupons();
        setProcessing(false);
    };

    if (loading) return <div className="text-gray-400">Loading vouchers...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Coupon */}
            <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Ticket className="text-purple-500" /> Create Coupon
                    </h3>
                    <form onSubmit={handleCreateCoupon} className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Code</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. WELCOME2026"
                                value={newCoupon.code}
                                onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white font-mono focus:border-purple-500/50 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Coin Amount</label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={newCoupon.amount}
                                onChange={e => setNewCoupon({ ...newCoupon, amount: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white font-mono focus:border-purple-500/50 outline-none"
                            />
                        </div>
                        <CyberButton type="submit" disabled={processing} className="w-full justify-center">
                            {processing ? 'CREATING...' : 'GENERATE COUPON'}
                        </CyberButton>
                    </form>
                </div>
            </div>

            {/* List Coupons */}
            <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black/40 text-gray-500 font-mono text-xs uppercase tracking-widest border-b border-white/10">
                            <tr>
                                <th className="p-4">Code</th>
                                <th className="p-4">Value</th>
                                <th className="p-4">Redeemed By</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-sm text-gray-300">
                            {coupons.map(coupon => (
                                <tr key={coupon.code} className="hover:bg-white/5">
                                    <td className="p-4 font-bold text-white tracking-wider">{coupon.code}</td>
                                    <td className="p-4 text-purple-400 font-bold">
                                        <div className="flex items-center gap-1"><Coins size={14} /> {coupon.amount}</div>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {coupon.usedBy?.length || 0} users
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDeleteCoupon(coupon.code)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {coupons.length === 0 && (
                                <tr><td colSpan="4" className="p-8 text-center text-gray-500">No active coupons.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
