import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, Home, Map, Box, Award, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';

const SidebarItem = ({ icon: Icon, label, path, isActive }) => (
    <Link to={path}>
        <div className={cn(
            "relative p-3 rounded-xl transition-all duration-300 group flex items-center justify-center xl:justify-start xl:px-4 xl:gap-3",
            isActive
                ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
        )}>
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("hidden xl:block text-sm font-medium", isActive && "font-semibold")}>{label}</span>
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,255,157,0.8)]" />
            )}
        </div>
    </Link>
);

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex text-gray-100 overflow-hidden font-inter">
            {/* Sidebar - Fixed Narrow */}
            <motion.aside
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="fixed w-20 xl:w-64 h-screen border-r border-white/5 bg-surface/50 backdrop-blur-xl flex flex-col z-40"
            >
                <div className="p-6 flex items-center justify-center xl:justify-start gap-3 border-b border-white/5">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/50 shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                        <span className="font-bold font-orbitron text-lg">A</span>
                    </div>
                    <span className="hidden xl:block font-orbitron font-bold tracking-wider text-xl">AUGNEX</span>
                </div>

                <nav className="flex-1 flex flex-col gap-2 p-4 mt-4">
                    <SidebarItem icon={Home} label="Dashboard" path="/" isActive={location.pathname === '/'} />
                    <SidebarItem icon={Map} label="Learning Paths" path="/paths" isActive={location.pathname === '/paths'} />
                    <SidebarItem icon={Box} label="Modules" path="/modules" isActive={location.pathname === '/modules'} />
                    <SidebarItem icon={Award} label="Achievements" path="/achievements" isActive={location.pathname === '/achievements'} />
                </nav>

                <div className="p-4 border-t border-white/5">
                    {user && (
                        <div className="bg-surface/50 rounded-xl p-3 border border-white/5 mb-4 group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors" />
                                <div className="hidden xl:block overflow-hidden">
                                    <p className="text-sm font-bold font-rajdhani truncate text-white">{user.username}</p>
                                    <p className="text-xs text-primary font-mono">{user.rank}</p>
                                </div>
                            </div>

                            <div className="mt-3 hidden xl:block">
                                <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
                                    <span>XP Progress</span>
                                    <span>{user.xp} / 2000</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(user.xp / 2000) * 100}%` }}
                                        className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={logout}
                        className="w-full p-2 flex items-center justify-center xl:justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="hidden xl:block text-sm font-medium">Disconnect</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-20 xl:ml-64 relative min-h-screen overflow-y-auto overflow-x-hidden">
                {/* Top noise/grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none fixed" />
                <div className="relative z-10 p-6 xl:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
