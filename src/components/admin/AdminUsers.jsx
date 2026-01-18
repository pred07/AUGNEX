import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Coins, Trash2, Search } from 'lucide-react';
import { getAllUsers, promoteUserToAdmin, demoteAdminToLearner, adminAddCoins } from '../../lib/firestoreService';

const AdminUsers = ({ setSelectedUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

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

    const handlePromote = async (uid) => {
        if (!window.confirm("WARNING: promoting this user will give them full system access. Continue?")) return;
        const success = await promoteUserToAdmin(uid);
        if (success) loadUsers();
        else alert("Failed to promote user");
    };

    const handleDemote = async (uid) => {
        if (!window.confirm("Are you sure you want to remove Admin privileges from this user?")) return;
        const success = await demoteAdminToLearner(uid);
        if (success) loadUsers();
        else alert("Failed to demote user");
    };

    const filteredUsers = users.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search Control */}
            <div className="bg-surface/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
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
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading users...</td></tr>
                        ) : filteredUsers.map(user => (
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
                                        onClick={() => setSelectedUser && setSelectedUser(user)}
                                        className="border border-white/10 hover:border-primary/50"
                                    >
                                        MANAGE
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={async () => {
                                            const amount = prompt(`Add coins to ${user.username}:`, "100");
                                            if (amount && !isNaN(amount)) {
                                                const success = await adminAddCoins(user.id, parseInt(amount));
                                                if (success) {
                                                    alert("Coins added successfully");
                                                    loadUsers();
                                                } else {
                                                    alert("Failed to add coins");
                                                }
                                            }
                                        }}
                                        className="ml-2 text-yellow-400 border border-transparent hover:border-yellow-400/50 hover:bg-yellow-400/10"
                                    >
                                        <Coins size={14} className="mr-1" />
                                        GIFT
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
                {!loading && filteredUsers.length === 0 && (
                    <div className="p-12 text-center text-gray-500 font-mono">No targets found matching criteria.</div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
