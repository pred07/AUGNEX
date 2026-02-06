import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import {
    ChevronRight, ChevronDown, Lock, CheckCircle2, Circle,
    Shield, Terminal, Play, FileCode, MonitorPlay, Flag,
    ArrowRight, Globe, Cpu, Activity
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
                    ? `bg-surface border-${path.color.split('-')[1]}-500/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                    : "bg-surface/30 border-white/5 hover:border-white/10 hover:bg-surface/50"
            )}
        >
            {isSelected && (
                <div className={cn("absolute inset-0 opacity-5 bg-gradient-to-r pointer-events-none", path.color.replace('text-', 'from-'))} />
            )}

            {/* Selection Indicator Line */}
            {isSelected && (
                <motion.div
                    layoutId="activePathIndicator"
                    className={cn("absolute left-0 top-0 bottom-0 w-1", path.color.replace('text-', 'bg-'))}
                />
            )}

            <div className="flex items-start justify-between relative z-10 pl-2">
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
                "flex items-center justify-between p-4 border-b border-white/5 last:border-0 transition-all duration-200 group relative overflow-hidden",
                status === 'locked' ? "opacity-60 bg-black/40 grayscale cursor-not-allowed" : "cursor-pointer hover:bg-white/5",
                status === 'active' && "bg-white/[0.02]"
            )}
        >
            {/* Active Marker */}
            {status === 'active' && (
                <div className={cn("absolute left-0 top-0 bottom-0 w-0.5", pathColor.replace('text-', 'bg-'))} />
            )}

            <div className="flex items-center gap-4 relative z-10">
                <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center border transition-all duration-300",
                    status === 'completed' ? "bg-primary/20 border-primary text-primary" :
                        status === 'locked' ? "border-white/5 text-gray-700 bg-black/40" :
                            `border-white/20 text-white bg-black/60 group-hover:border-white/40`
                )}>
                    {status === 'completed' ? <CheckCircle2 size={14} /> :
                        status === 'locked' ? <Lock size={14} /> :
                            <span className={cn("w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]", pathColor)} />}
                </div>
                <div>
                    <div className={cn(
                        "text-sm font-bold font-rajdhani transition-colors",
                        status === 'locked' ? "text-gray-500" : "text-gray-200 group-hover:text-white"
                    )}>
                        {module.title}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1 uppercase">{getIcon()} {module.type || 'THEORY'}</span>
                        <span className="opacity-30">|</span>
                        <span>{module.duration}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                {status !== 'locked' && (
                    <div className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-black/40",
                        status === 'completed' ? "text-primary border-primary/20" : "text-gray-500"
                    )}>
                        +{module.xp} XP
                    </div>
                )}
                {status === 'active' && <Play size={14} className={cn("animate-pulse", pathColor)} />}
                {status === 'locked' && <Lock size={14} className="text-gray-800" />}
            </div>
        </motion.div>
    );
};

const LearningPaths = () => {
    const [selectedPathId, setSelectedPathId] = useState('forge');
    const { user } = useAuth();
    const { isModuleLocked, isModuleCompleted, progress, xp, currentRank } = useProgress(); // Destructure xp and currentRank
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

    // Global Stats Calculation
    const globalModulesCompleted = Object.values(progress).flat().length;

    return (
        <div className="max-w-7xl mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-orbitron text-white mb-2 tracking-tight">
                        OPERATIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PATHWAYS</span>
                    </h1>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest border-l-2 border-cyan-500/50 pl-4">
                        Select Protocol // Init Sequence
                    </p>
                </div>
                <div className="flex gap-4 text-xs font-mono text-gray-500 bg-black/30 p-2 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div> FORGE
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> EXPLOIT
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div> PROTECT
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel: Path Selection */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="space-y-3">
                        {[...LEARNING_PATHS].sort((a, b) => a.order - b.order).map((path) => (
                            <PathCard
                                key={path.id}
                                path={path}
                                isSelected={selectedPathId === path.id}
                                onClick={() => handlePathSelect(path.id)}
                            />
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-grid-white/[0.02]" />
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                            <Activity size={12} className="text-cyan-400" />
                            Global Status
                        </h4>
                        <div className="space-y-5 relative z-10">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-xs text-gray-400 font-mono">TOTAL XP</span>
                                <span className="text-2xl font-bold font-orbitron text-white text-shadow-neon">{xp.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-xs text-gray-400 font-mono">MODULES CLEARED</span>
                                <span className="text-xl font-bold font-mono text-white">{globalModulesCompleted}</span>
                            </div>
                            <div className="flex justify-between items-end pb-1">
                                <span className="text-xs text-gray-400 font-mono">RANK</span>
                                <span className="text-sm font-bold font-rajdhani text-cyan-400 tracking-wider flex items-center gap-2">
                                    {currentRank?.title || 'NEOPHYTE'}
                                </span>
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
                                className="glass-card rounded-xl overflow-hidden shadow-2xl min-h-[600px] border border-white/10 relative"
                            >
                                {/* Background Grid Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                                {/* HUD Header */}
                                <div className="p-8 border-b border-white/10 relative overflow-hidden">
                                    <div className={cn("absolute top-0 right-0 p-40 opacity-10 blur-3xl rounded-full translate-x-12 -translate-y-12 pointer-events-none", selectedPath.color.replace('text-', 'bg-'))} />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className={cn("inline-flex items-center gap-2 px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono uppercase tracking-widest mb-3 backdrop-blur-md", selectedPath.color, selectedPath.borderColor)}>
                                                    <Globe size={10} />
                                                    <span>ACTIVE PROTOCOL</span>
                                                </div>
                                                <h2 className="text-4xl font-bold text-white mb-2 font-orbitron tracking-wide">{selectedPath.title}</h2>
                                                <p className="text-gray-400 text-sm max-w-xl leading-relaxed">{selectedPath.description}</p>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <div className="text-4xl font-bold font-rajdhani text-white">{progressPercent}%</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">COMPLETION</div>
                                            </div>
                                        </div>

                                        {/* Smart Resume/Start Button */}
                                        {(() => {
                                            const allPathModules = selectedPath.sections.flatMap(s => s.modules);
                                            const nextModule = allPathModules.find(m => !isModuleCompleted(selectedPath.id, m.id));

                                            if (nextModule) {
                                                return (
                                                    <div className="mb-8">
                                                        <Button
                                                            onClick={() => navigate(`/modules/${nextModule.id}`)}
                                                            variant="primary"
                                                            className="w-full md:w-auto min-w-[200px] shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all ease-out duration-300"
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
                                                    <div className="mb-8 inline-block px-8 py-3 bg-primary/20 border border-primary text-primary rounded font-mono font-bold tracking-widest shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                                                        PATH COMPLETED // READY FOR DEPLOYMENT
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })()}

                                        {/* Progress Line */}
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className={cn("h-full box-shadow-[0_0_10px_currentColor]", selectedPath.color.replace('text-', 'bg-'))}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable Module List */}
                                <div className="max-h-[600px] overflow-y-auto p-6 space-y-8 custom-scrollbar relative z-10">
                                    {selectedPath.sections.map((section, sIdx) => (
                                        <div key={sIdx}>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-gray-600 rounded-sm" />
                                                {section.title}
                                                <span className="h-px flex-grow bg-white/5" />
                                            </h4>
                                            <div className="bg-black/20 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
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
                                <div className="px-6 py-4 border-t border-white/10 bg-black/60 backdrop-blur-md flex justify-between items-center text-[10px] font-mono text-gray-500 relative z-20">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        SECURE CONNECTION ESTABLISHED
                                    </span>
                                    <span>ID: {user?.publicId || 'ANONYMOUS'}</span>
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
