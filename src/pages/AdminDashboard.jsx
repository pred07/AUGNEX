import React, { useState, useEffect } from 'react';
import { getAllUsers, adminAddCoins, createCoupon, getCoupons, deleteCoupon } from '../lib/firestoreService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Coins, Search, User, AlertTriangle, Ticket, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import CyberButton from '../components/ui/CyberButton';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [coinAmount, setCoinAmount] = useState(5);
    const [removeMode, setRemoveMode] = useState(false); // New state for removal
    const [processing, setProcessing] = useState(false);

    // Coupon State
    const [viewMode, setViewMode] = useState('users'); // 'users' or 'coupons'
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: '', amount: 100 });

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            return;
        }
        if (viewMode === 'users') loadUsers();
        if (viewMode === 'coupons') loadCoupons();
    }, [user, navigate, viewMode]);

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
        if (!confirm("Delete this coupon?")) return;
        setProcessing(true);
        await deleteCoupon(code);
        loadCoupons();
        setProcessing(false);
    };

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to load users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCoins = async () => {
        if (!selectedUser || !coinAmount) return;
        setProcessing(true);
        try {
            // Calculate amount based on mode (add or remove)
            const finalAmount = removeMode ? -parseInt(coinAmount) : parseInt(coinAmount);
            const success = await adminAddCoins(selectedUser.id, finalAmount);

            if (success) {
                // Refresh list to show new balance
                await loadUsers();
                setSelectedUser(null);
                alert(`Successfully ${removeMode ? 'removed' : 'added'} ${coinAmount} coins.`);
            } else {
                alert("Failed to add coins. Check console.");
            }
        } catch (e) {
            console.error(e);
            alert("Error transaction failed.");
        } finally {
            setProcessing(false);
        }
    };

    const handlePromote = async (uid) => {
        if (!window.confirm("WARNING: promoting this user will give them full system access. Continue?")) return;

        try {
            const { updateUserRole } = await import('../lib/firestoreService');
            const success = await updateUserRole(uid, 'admin');
            if (success) {
                loadUsers();
            } else {
                alert("Failed to promote user");
            }
        } catch (e) {
            console.error(e);
            alert("Error");
        }
    };

    const handleDemote = async (uid) => {
        if (!window.confirm("Are you sure you want to remove Admin privileges from this user?")) return;

        try {
            const { updateUserRole } = await import('../lib/firestoreService');
            const success = await updateUserRole(uid, 'learner');
            if (success) {
                loadUsers();
            } else {
                alert("Failed to demote user");
            }
        } catch (e) {
            console.error(e);
            alert("Error");
        }
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-20 text-center text-white">Loading Admin Interface...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-20 pt-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold font-orbitron text-white flex items-center gap-3">
                        <Shield className="text-red-500" size={40} />
                        ADMIN_CONSOLE
                    </h1>
                    <p className="text-gray-400 font-mono text-sm">Use strictly for authorized user management.</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white font-mono">{users.length}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Active Users</div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-surface/30 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by username, email, ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-red-500/50 focus:outline-none transition-colors font-mono"
                        />
                    </div>
                    <Button onClick={loadUsers} variant="outline" className="h-12">
                        REFRESH DATA
                    </Button>
                </div>
            </div>

            {/* View Switcher */}
            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                <button
                    onClick={() => setViewMode('users')}
                    className={`pb-4 px-2 text-sm font-mono uppercase tracking-widest transition-colors border-b-2 ${viewMode === 'users' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    User Management
                </button>
                <button
                    onClick={() => setViewMode('coupons')}
                    className={`pb-4 px-2 text-sm font-mono uppercase tracking-widest transition-colors border-b-2 ${viewMode === 'coupons' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
                >
                    Coupon System
                </button>
            </div>

            {viewMode === 'coupons' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Coupon */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface/30 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Ticket className="text-primary" /> Create Coupon
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
                                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white font-mono focus:border-primary/50 outline-none"
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
                                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white font-mono focus:border-primary/50 outline-none"
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
                        <div className="bg-surface/20 border border-white/5 rounded-xl overflow-hidden">
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
                                            <td className="p-4 text-primary font-bold">
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
            ) : (
                /* User Table (Existing) */
                <div className="bg-surface/20 border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black/40 text-gray-500 font-mono text-xs uppercase tracking-widest border-b border-white/10">
                            <tr>
                                <th className="p-4">User Identity</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Wallet Balance</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-sm text-gray-300">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-white font-bold">
                                                {user.username?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">{user.username || 'Unknown'}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                                <div className="text-[10px] text-gray-600 truncate max-w-[100px]" title={user.id}>{user.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase border ${user.role === 'admin' ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-gray-600 text-gray-400'
                                            }`}>
                                            {user.role || 'learner'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <Coins size={14} />
                                            {user.walletBalance || 0}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-green-400 text-xs">● Active</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedUser(user)}
                                            className="border border-white/10 hover:border-primary/50"
                                        >
                                            MANAGE
                                        </Button>
                                        {user.role === 'admin' && user.id !== user.uid && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDemote(user.id)}
                                                className="ml-2 text-red-500 border border-transparent hover:border-red-500/50 hover:bg-red-500/10"
                                            >
                                                DEMOTE
                                            </Button>
                                        )}
                                        {user.role !== 'admin' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handlePromote(user.id)}
                                                className="ml-2 text-primary border border-transparent hover:border-primary/50 hover:bg-primary/10"
                                            >
                                                PROMOTE
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className="p-12 text-center text-gray-500 font-mono">No targets found matching criteria.</div>
                    )}
                </div>
            )}

            {/* Coin Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-xl max-w-md w-full p-6 relative">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Coins className="text-primary" />
                            Provision Resources
                        </h2>

                        <div className="bg-black/30 p-4 rounded mb-6 border border-white/5">
                            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Target Recipient</div>
                            <div className="text-white font-bold text-lg">{selectedUser.username}</div>
                            <div className="text-xs text-gray-500 font-mono">{selectedUser.id}</div>
                            <div className="mt-4 flex justify-between items-end border-t border-white/5 pt-2">
                                <span className="text-xs text-gray-400">Current Balance</span>
                                <span className="text-primary font-mono text-xl font-bold">{selectedUser.walletBalance || 0}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => setRemoveMode(false)}
                                className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${!removeMode ? 'bg-primary text-black' : 'bg-black/40 text-gray-400 border border-white/10'}`}
                            >
                                ADD COINS
                            </button>
                            <button
                                onClick={() => setRemoveMode(true)}
                                className={`flex-1 py-2 rounded text-sm font-bold transition-colors ${removeMode ? 'bg-red-500 text-white' : 'bg-black/40 text-gray-400 border border-white/10'}`}
                            >
                                REMOVE COINS
                            </button>
                        </div>

                        <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">
                            {removeMode ? 'Amount to Remove' : 'Amount to Add'}
                        </label>
                        <input
                            type="number"
                            value={coinAmount}
                            onChange={(e) => setCoinAmount(e.target.value)}
                            min="1"
                            max="1000"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-lg mb-6 focus:border-primary/50 focus:outline-none"
                        />

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setSelectedUser(null)}
                            >
                                CANCEL
                            </Button>
                            <CyberButton
                                className="flex-1"
                                onClick={handleAddCoins}
                                disabled={processing}
                            >
                                {processing ? 'PROCESSING...' : (removeMode ? 'CONFIRM REMOVAL' : 'CONFIRM TRANSACTION')}
                            </CyberButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
