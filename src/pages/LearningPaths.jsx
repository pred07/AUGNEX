import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import {
    ChevronRight, ChevronDown, Lock, CheckCircle2, Circle,
    Shield, Terminal, Play, FileCode, MonitorPlay, Flag,
    ArrowRight, Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

const PathCard = ({ path, isSelected, onClick }) => {
    const Icon = path.icon;

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative cursor-pointer border rounded-lg p-6 transition-all duration-300 overflow-hidden",
                isSelected
                    ? `bg-surface border-${path.color.split('-')[1]}-500/50`
                    : "bg-surface/30 border-white/5 hover:border-white/10 hover:bg-surface/50"
            )}
        >
            {isSelected && (
                <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-r pointer-events-none", path.color.replace('text-', 'from-'))} />
            )}

            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "p-3 rounded-md bg-black/50 border border-white/10 transition-colors",
                        isSelected ? path.color : "text-gray-500 group-hover:text-gray-300"
                    )}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <h3 className={cn(
                            "text-xl font-bold font-rajdhani uppercase tracking-wide",
                            isSelected ? "text-white" : "text-gray-400 group-hover:text-white"
                        )}>
                            {path.title}
                        </h3>
                        <p className="text-xs font-mono text-gray-500">{path.subtitle}</p>
                    </div>
                </div>

                {isSelected ? <ChevronDown className="text-primary animate-bounce" /> : <ChevronRight className="text-gray-600 group-hover:text-gray-400" />}
            </div>
        </div>
    );
};

// Module Item Component for the HUD List
const ModuleItem = ({ module, status, pathColor, index }) => {
    const navigate = useNavigate();
    const getIcon = () => {
        switch (module.type) {
            case 'lab': return <MonitorPlay size={14} />;
            case 'ctf': return <Flag size={14} />;
            case 'theory':
            default: return <FileCode size={14} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => status !== 'locked' && navigate(`/modules/${module.id}`)}
            className={cn(
                "flex items-center justify-between p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group",
                status === 'locked' ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-6 h-6 rounded flex items-center justify-center border",
                    status === 'completed' ? "bg-primary/20 border-primary text-primary" :
                        status === 'locked' ? "border-white/10 text-gray-600 bg-black/20" :
                            `border-white/20 text-white bg-black/40`
                )}>
                    {status === 'completed' ? <CheckCircle2 size={12} /> :
                        status === 'locked' ? <Lock size={12} /> :
                            <span className={cn("w-1.5 h-1.5 rounded-full", pathColor.replace('text-', 'bg-'))} />}
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {module.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                        <span className="flex items-center gap-1 uppercase">{getIcon()} {module.type || 'THEORY'}</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/5",
                    status === 'completed' ? "text-primary border-primary/20" : "text-gray-600"
                )}>
                    {module.xp} XP
                </div>
                {status === 'active' && <Play size={14} className={cn("animate-pulse", pathColor)} />}
            </div>
        </motion.div>
    );
};

const LearningPaths = () => {
    const [selectedPathId, setSelectedPathId] = useState('forge');
    const { user } = useAuth();
    const { isModuleLocked, isModuleCompleted, progress, lastAccessedModule } = useProgress();
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    const selectedPath = LEARNING_PATHS.find(p => p.id === selectedPathId);

    // Auto-scroll to module list on mobile when path is selected
    const handlePathSelect = (pathId) => {
        setSelectedPathId(pathId);

        // On mobile, scroll to the module list after selecting a path
        if (window.innerWidth < 1024 && scrollRef.current) {
            setTimeout(() => {
                scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    // Stats
    const totalModules = selectedPath?.sections.flatMap(s => s.modules).length || 0;
    const completedCount = selectedPath?.sections.flatMap(s => s.modules).filter(m => isModuleCompleted(selectedPath.id, m.id)).length || 0;
    const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    return (
        <div className="max-w-7xl mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-orbitron text-white mb-2">OPERATIONAL PATHWAYS</h1>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                        Select Protocol // Init Sequence
                    </p>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div> FORGE
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div> EXPLOIT
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> PROTECT
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Path Selection */}
                <div className="lg:col-span-4 space-y-4">
                    {[...LEARNING_PATHS].sort((a, b) => a.order - b.order).map((path) => (
                        <PathCard
                            key={path.id}
                            path={path}
                            isSelected={selectedPathId === path.id}
                            onClick={() => handlePathSelect(path.id)}
                        />
                    ))}

                    <div className="mt-8 p-6 rounded-lg border border-white/5 bg-black/20 backdrop-blur-sm">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Global Status</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>TOTAL XP EARNED</span>
                                <span className="text-white">1,250</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>MODULES CLEARED</span>
                                <span className="text-white">12</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>CURRENT RANK</span>
                                <span className="text-cyan-400">SCRIPT KIDDIE</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: HUD/Content */}
                <div className="lg:col-span-8" ref={scrollRef}>
                    <AnimatePresence mode="wait">
                        {selectedPath && (
                            <motion.div
                                key={selectedPath.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-surface/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                            >
                                {/* HUD Header */}
                                <div className="p-8 border-b border-white/10 relative overflow-hidden">
                                    <div className={cn("absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full translate-x-12 -translate-y-12", selectedPath.color.replace('text-', 'bg-'))} />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className={cn("inline-flex items-center gap-2 px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono uppercase tracking-widest mb-2", selectedPath.color, selectedPath.borderColor)}>
                                                    <Globe size={10} />
                                                    <span>ACTIVE PROTOCOL</span>
                                                </div>
                                                <h2 className="text-3xl font-bold text-white mb-2">{selectedPath.title}</h2>
                                                <p className="text-gray-400 text-sm max-w-xl">{selectedPath.description}</p>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <div className="text-3xl font-bold font-mono text-white">{progressPercent}%</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">COMPLETION</div>
                                            </div>
                                        </div>

                                        {/* Smart Resume/Start Button */}
                                        {(() => {
                                            const allPathModules = selectedPath.sections.flatMap(s => s.modules);
                                            const nextModule = allPathModules.find(m => !isModuleCompleted(selectedPath.id, m.id));

                                            if (nextModule) {
                                                return (
                                                    <div className="mb-6">
                                                        <Button
                                                            onClick={() => navigate(`/modules/${nextModule.id}`)}
                                                            variant="primary"
                                                            className="w-full md:w-auto"
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                <Play size={16} className="fill-current" />
                                                                <span>CONTINUE: {nextModule.title}</span>
                                                            </span>
                                                        </Button>
                                                    </div>
                                                );
                                            } else if (progressPercent === 100) {
                                                return (
                                                    <div className="mb-6 inline-block px-6 py-3 bg-primary/20 border border-primary text-primary rounded font-mono font-bold tracking-widest">
                                                        PATH COMPLETED
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}

                                        {/* Progress Line */}
                                        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className={cn("h-full", selectedPath.color.replace('text-', 'bg-'))}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable Module List */}
                                <div className="max-h-[600px] overflow-y-auto p-6 space-y-8 custom-scrollbar">
                                    {selectedPath.sections.map((section, sIdx) => (
                                        <div key={sIdx}>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-sm" />
                                                {section.title}
                                            </h4>
                                            <div className="bg-black/20 border border-white/5 rounded-lg overflow-hidden">
                                                {section.modules.map((module, mIdx) => {
                                                    const locked = isModuleLocked(selectedPath.id, module.id);
                                                    const completed = isModuleCompleted(selectedPath.id, module.id);
                                                    const status = completed ? 'completed' : locked ? 'locked' : 'active';

                                                    return (
                                                        <ModuleItem
                                                            key={module.id}
                                                            module={module}
                                                            status={status}
                                                            pathColor={selectedPath.color}
                                                            index={mIdx}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer / Actions */}
                                <div className="p-4 border-t border-white/10 bg-black/40 flex justify-between items-center text-[10px] font-mono text-gray-500">
                                    <span>SECURE CONNECTION ESTABLISHED</span>
                                    <span>ID: {user?.uid || 'ANONYMOUS'}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default LearningPaths;
