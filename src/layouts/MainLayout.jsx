import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, Home, Map, Box, Award, Settings, User, Shield, Coins } from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';

const SidebarItem = ({ icon: Icon, label, path, isActive }) => (
    <Link to={path}>
        <div className={cn(
            "relative p-3 transition-all duration-300 group flex items-center justify-center xl:justify-start xl:px-4 xl:gap-3 overflow-hidden",
            isActive
                ? "bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary text-primary"
                : "text-muted hover:text-text-main hover:bg-white/5 hover:border-l-2 hover:border-white/20 border-l-2 border-transparent"
        )}>
            <div className={cn("transition-transform duration-300", isActive && "translate-x-1")}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn("hidden xl:block text-sm font-medium transition-all duration-300", isActive && "translate-x-1 font-bold tracking-wide")}>{label}</span>
        </div>
    </Link>
);

import BackgroundEffects from '../components/layout/BackgroundEffects';

const MainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex text-gray-100 overflow-hidden font-inter transition-colors duration-500">
            <BackgroundEffects />

            {/* Desktop Sidebar - Hidden on Mobile */}
            <motion.aside
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="hidden md:flex fixed w-20 xl:w-64 h-screen border-r border-white/5 bg-surface/50 backdrop-blur-xl flex-col z-40 transition-colors duration-500"
            >
                <Link to="/" className="p-6 flex items-center justify-center xl:justify-start gap-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/50 shadow-[0_0_10px_rgba(0,255,157,0.2)] p-1">
                        <span className="font-mono font-bold text-lg leading-none pt-0.5">&gt;</span>
                    </div>
                    <span className="hidden xl:block font-orbitron font-bold tracking-wider text-xl text-white whitespace-nowrap">NYTVNT-OPS</span>
                </Link>

                <nav className="flex-1 flex flex-col gap-2 p-4 mt-4">
                    <SidebarItem icon={Home} label="Dashboard" path="/" isActive={location.pathname === '/'} />
                    <SidebarItem icon={Map} label="Learning Paths" path="/paths" isActive={location.pathname === '/paths'} />
                    <SidebarItem icon={Box} label="Library" path="/modules" isActive={location.pathname === '/modules'} />
                    <SidebarItem icon={Coins} label="Coins" path="/subscription" isActive={location.pathname === '/subscription'} />
                    <SidebarItem icon={Award} label="Service Record" path="/service-record" isActive={location.pathname === '/service-record'} />

                    {user?.role === 'admin' && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                            <SidebarItem icon={Shield} label="Admin Console" path="/admin" isActive={location.pathname === '/admin'} />
                        </div>
                    )}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4">
                    {/* Theme Toggle Removed */}

                    {user && (
                        <Link to="/service-record">
                            <div className="bg-surface/50 rounded-xl p-3 border border-white/5 mb-4 group hover:border-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors" />
                                    <div className="hidden xl:block overflow-hidden">
                                        <p className="text-sm font-bold font-rajdhani truncate text-text-main">{user.username}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-primary font-mono">{user.rank}</p>
                                            <Link to="/subscription" className="text-xs text-yellow-400 font-mono flex items-center gap-1 hover:text-yellow-300">
                                                <Coins size={10} /> {user.walletBalance || 0}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 hidden xl:block">
                                    <div className="flex justify-between text-[10px] text-muted mb-1 uppercase tracking-wider">
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
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="w-full p-2 flex items-center justify-center xl:justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="hidden xl:block text-sm font-medium">Disconnect</span>
                    </button>
                </div>
            </motion.aside >

            {/* Mobile Bottom Navigation - Visible < md */}
            < div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around px-2 transition-colors duration-500" >
                <Link to="/" className={cn("p-2 rounded-lg flex flex-col items-center gap-1", location.pathname === '/' ? "text-primary" : "text-muted")}>
                    <Home size={20} />
                    <span className="text-[10px] font-mono">Home</span>
                </Link>
                <Link to="/paths" className={cn("p-2 rounded-lg flex flex-col items-center gap-1", location.pathname === '/paths' ? "text-primary" : "text-muted")}>
                    <Map size={20} />
                    <span className="text-[10px] font-mono">Paths</span>
                </Link>

                {/* Center Action Button (Profile/User) */}
                <div className="relative -top-5">
                    <Link to="/service-record">
                        <div className={cn(
                            "w-12 h-12 rounded-full border shadow-[0_0_15px_rgba(0,255,157,0.3)] flex items-center justify-center backdrop-blur-md transition-all",
                            location.pathname === '/service-record'
                                ? "bg-primary/20 border-primary"
                                : "bg-surface border-primary/50"
                        )}>
                            <img src={user?.avatar} alt="Me" className="w-10 h-10 rounded-full" />
                        </div>
                    </Link>
                </div>

                <Link to="/modules" className={cn("p-2 rounded-lg flex flex-col items-center gap-1", location.pathname === '/modules' ? "text-primary" : "text-muted")}>
                    <Box size={20} />
                    <span className="text-[10px] font-mono">Lib</span>
                </Link>

                {
                    user?.role === 'admin' && (
                        <Link to="/admin" className={cn("p-2 rounded-lg flex flex-col items-center gap-1", location.pathname === '/admin' ? "text-primary" : "text-muted")}>
                            <Shield size={20} />
                            <span className="text-[10px] font-mono">Admin</span>
                        </Link>
                    )
                }

                <button onClick={logout} className="p-2 rounded-lg flex flex-col items-center gap-1 text-red-400">
                    <LogOut size={20} />
                    <span className="text-[10px] font-mono">Exit</span>
                </button>
            </div >

            {/* Mobile Top Bar (Branding) */}
            < div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4 transition-colors duration-500" >
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/50 p-0.5">
                        <span className="font-mono font-bold text-sm leading-none pt-0.5">&gt;</span>
                    </div>
                    <span className="font-orbitron font-bold tracking-wider text-lg text-text-main whitespace-nowrap">NYTVNT-OPS</span>
                </Link>
                {/* ThemeToggle Removed */}
            </div >

            {/* Main Content Area */}
            < main className="flex-1 ml-0 md:ml-20 xl:ml-64 relative min-h-screen overflow-y-auto overflow-x-hidden pb-32 md:pb-0 pt-16 md:pt-0" >
                {/* Remove old static grid, replaced by BackgroundEffects */}
                {/* <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none fixed" /> */}
                <div className="relative z-10 p-4 md:p-6 xl:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main >
        </div >
    );
};

export default MainLayout;
