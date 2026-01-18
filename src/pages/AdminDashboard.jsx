import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminUsers from '../components/admin/AdminUsers';
import AdminBundles from '../components/admin/AdminBundles';
import AdminCoupons from '../components/admin/AdminCoupons';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'admin') return null;

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
            </div>

            {/* View Switcher Protocol */}
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit mb-8 backdrop-blur-sm">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === 'users'
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    USER_MGMT
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button
                    onClick={() => setActiveTab('pricing')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === 'pricing'
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    ECONOMY_CTRL
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button
                    onClick={() => setActiveTab('coupons')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === 'coupons'
                        ? 'bg-primary text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    VOUCHER_SYS
                </button>
            </div>

            {/* Content Area */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'users' && <AdminUsers />}
                {activeTab === 'pricing' && <AdminBundles />}
                {activeTab === 'coupons' && <AdminCoupons />}
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
