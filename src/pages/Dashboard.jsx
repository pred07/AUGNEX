import React from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingHeader from '../components/dashboard/GreetingHeader';
import ContinueLearningCard from '../components/dashboard/ContinueLearningCard';
import NewsCarousel from '../components/dashboard/NewsCarousel';
import { Lock, FileCode, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { useProgress } from '../context/ProgressContext';

const MODULES = [
    { title: "Web Exploit Fundamentals", level: 1, status: "completed", type: "Web" },
    { title: "Network Reconnaissance", level: 2, status: "active", type: "Network" },
    { title: "Privilege Escalation", level: 3, status: "locked", type: "System" },
    { title: "Active Directory Basics", level: 4, status: "locked", type: "AD" },
];

// Helper to get all modules for display
const getAllModules = () => {
    // This could depend on the active path; for dashboard we might just show recent or popular
    // For this prototype, let's grab the first few from the 'Forge' path
    const forgePath = LEARNING_PATHS.find(p => p.id === 'forge');
    if (!forgePath) return [];

    // Flatten modules
    return forgePath.sections.flatMap(section => section.modules).slice(0, 4);
};

const Dashboard = () => {
    const { isModuleLocked, isModuleCompleted } = useProgress();
    const modules = getAllModules();

    const navigate = useNavigate();

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
                        <h3 className="text-lg text-gray-300">Available Modules (Forge)</h3>
                        <span className="text-xs text-primary font-mono cursor-pointer hover:underline" onClick={() => navigate('/paths')}>VIEW ALL PATHS</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modules.map((mod, idx) => {
                            const locked = isModuleLocked('forge', mod.id);
                            const completed = isModuleCompleted('forge', mod.id);
                            const status = completed ? 'completed' : locked ? 'locked' : 'active';

                            return (
                                <motion.div
                                    key={mod.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    onClick={() => !locked && navigate(`/modules/${mod.id}`)}
                                    className={`p-4 rounded-xl border transition-all duration-300 relative group overflow-hidden ${status === 'active'
                                        ? 'bg-surface/60 border-primary/30 shadow-[0_0_15px_rgba(0,255,157,0.05)] cursor-pointer hover:border-primary/50'
                                        : status === 'locked'
                                            ? 'bg-surface/20 border-white/5 opacity-60 cursor-not-allowed'
                                            : 'bg-surface/40 border-white/10 cursor-pointer hover:bg-surface/60'
                                        }`}
                                >
                                    {status === 'active' && <div className="absolute top-0 left-0 w-1 h-full bg-primary" />}

                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`p-2 rounded-lg ${status === 'active' ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-500'}`}>
                                            {status === 'locked' ? <Lock size={18} /> : (mod.type === 'Network' ? <Server size={18} /> : <FileCode size={18} />)}
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-500 uppercase border border-white/5 px-2 py-0.5 rounded">
                                            MODULE {mod.id.toUpperCase()}
                                        </span>
                                    </div>

                                    <h4 className={`font-bold text-lg mb-1 ${status === 'active' ? 'text-white' : 'text-gray-400'}`}>
                                        {mod.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-mono mb-3">{status.toUpperCase()}</p>

                                    {status === 'active' && (
                                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-2">
                                            <div className="bg-primary h-full w-[0%]" />
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
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
