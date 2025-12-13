import React from 'react';
import GreetingHeader from '../components/dashboard/GreetingHeader';
import ContinueLearningCard from '../components/dashboard/ContinueLearningCard';
import NewsCarousel from '../components/dashboard/NewsCarousel';
import { Lock, FileCode, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const MODULES = [
    { title: "Web Exploit Fundamentals", level: 1, status: "completed", type: "Web" },
    { title: "Network Reconnaissance", level: 2, status: "active", type: "Network" },
    { title: "Privilege Escalation", level: 3, status: "locked", type: "System" },
    { title: "Active Directory Basics", level: 4, status: "locked", type: "AD" },
];

const Dashboard = () => {
    return (
        <div className="space-y-8 pb-10">
            <GreetingHeader />

            <section>
                <ContinueLearningCard />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Module Overview - 2/3 Width */}
                <section className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-orbitron text-gray-300">Available Modules</h3>
                        <span className="text-xs text-primary font-mono cursor-pointer hover:underline">VIEW ALL PATHS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MODULES.map((mod, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                className={`p-4 rounded-xl border transition-all duration-300 relative group overflow-hidden ${mod.status === 'active'
                                        ? 'bg-surface/60 border-primary/30 shadow-[0_0_15px_rgba(0,255,157,0.05)]'
                                        : mod.status === 'locked'
                                            ? 'bg-surface/20 border-white/5 opacity-60'
                                            : 'bg-surface/40 border-white/10'
                                    }`}
                            >
                                {mod.status === 'active' && <div className="absolute top-0 left-0 w-1 h-full bg-primary" />}

                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-2 rounded-lg ${mod.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-500'}`}>
                                        {mod.status === 'locked' ? <Lock size={18} /> : (mod.type === 'Network' ? <Server size={18} /> : <FileCode size={18} />)}
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-500 uppercase border border-white/5 px-2 py-0.5 rounded">
                                        LVL {mod.level}
                                    </span>
                                </div>

                                <h4 className={`font-rajdhani font-bold text-lg mb-1 ${mod.status === 'active' ? 'text-white' : 'text-gray-400'}`}>
                                    {mod.title}
                                </h4>
                                <p className="text-xs text-gray-500 font-mono mb-3">{mod.type} Security</p>

                                {mod.status === 'active' && (
                                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-2">
                                        <div className="bg-primary h-full w-[65%]" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* News Feed - 1/3 Width */}
                <section className="h-full">
                    <NewsCarousel />
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
