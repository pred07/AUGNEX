import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { ChevronRight, Lock, LockOpen, CheckCircle2, Circle, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import Certificate from '../components/social/Certificate';

const PathCard = ({ path, isSelected, onClick }) => {
    const Icon = path.icon;

    return (
        <motion.div
            layout
            onClick={onClick}
            className={cn(
                "cursor-pointer group relative overflow-hidden rounded-xl border p-6 transition-all duration-300",
                isSelected
                    ? `bg-surface/80 ${path.borderColor} shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]`
                    : "bg-surface/30 border-white/5 hover:border-white/10 hover:bg-surface/50"
            )}
        >
            {isSelected && (
                <div className={cn("absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-current", path.color)} />
            )}

            <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-lg bg-surface border border-white/5 transition-colors", isSelected ? path.color : "text-gray-500 group-hover:text-gray-300")}>
                    <Icon size={24} />
                </div>
                {path.label && (
                    <span className={cn("text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded border border-white/5", path.color)}>
                        {path.label}
                    </span>
                )}
            </div>

            <h3 className={cn("text-xl font-bold mb-1 transition-colors", isSelected ? "text-white" : "text-gray-400 group-hover:text-gray-200")}>
                {path.title}
            </h3>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{path.subtitle}</p>

            {isSelected && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                >
                    <p className={cn("text-sm italic font-medium", path.color)}>"{path.philosophy}"</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{path.description}</p>

                    <div className="pt-4 flex items-center gap-4">
                        <Button variant="ghost" className={cn("border", path.borderColor, path.color, "hover:bg-white/5")} size="sm">
                            ENTER PATH <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

const ModuleList = ({ path }) => {
    const { isModuleLocked, isModuleCompleted } = useProgress();
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pl-4 border-l border-white/5 ml-4 md:ml-0 md:pl-0 md:border-l-0">
            {path.sections.map((section, idx) => (
                <div key={idx} className="relative">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-white/10" />
                        {section.title}
                    </h4>

                    <div className="grid gap-3">
                        {section.modules.map((module) => {
                            const locked = isModuleLocked(path.id, module.id);
                            const completed = isModuleCompleted(path.id, module.id);

                            return (
                                <div
                                    key={module.id}
                                    onClick={() => !locked && navigate(`/modules/${module.id}`)}
                                    className={cn(
                                        "p-4 rounded border flex items-center justify-between group transition-all",
                                        !locked ? "cursor-pointer hover:border-primary/50" : "cursor-not-allowed",
                                        completed ? "bg-primary/5 border-primary/20 text-gray-300" :
                                            !locked ? "bg-surface border-white/10 text-white shadow-lg" :
                                                "bg-transparent border-transparent text-gray-600 opacity-60"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {completed && <CheckCircle2 size={16} className="text-primary" />}
                                        {!completed && !locked && <Circle size={16} className={cn("animate-pulse", path.color)} />}
                                        {locked && <Lock size={16} />}
                                        <span className="font-mono text-sm">{module.title}</span>
                                    </div>

                                    {!locked && !completed && (
                                        <Button size="sm" variant="ghost" className="h-8 text-[10px] border border-white/10 hover:border-white/30">
                                            START
                                        </Button>
                                    )}
                                    {!locked && completed && (
                                        <Button size="sm" variant="ghost" className="h-8 text-[10px] text-primary hover:bg-primary/10">
                                            REVIEW
                                        </Button>
                                    )}
                                    {locked && isAdmin && (
                                        <span className="text-[10px] text-red-500 font-mono border border-red-500/30 px-2 py-0.5 rounded">
                                            ADMIN UNLOCKED
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const PathOverview = ({ path, onEnter }) => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
            <h3 className="text-xl text-primary font-mono uppercase tracking-widest">Mission Briefing</h3>
            <p className={cn("text-2xl font-light italic leading-relaxed text-gray-300", path.color)}>
                "{path.philosophy}"
            </p>
        </div>

        <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Operational Context</h4>
            <p className="text-gray-300 leading-relaxed text-lg">
                {path.description}
            </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-surface rounded-lg border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{path.sections.flatMap(s => s.modules).length}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Modules</div>
            </div>
            <div className="p-4 bg-surface rounded-lg border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">{path.role}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Role</div>
            </div>
            <div className="p-4 bg-surface rounded-lg border border-white/5 text-center">
                <div className="text-2xl font-bold text-white">
                    {path.id === 'forge' ? 'BEGINNER' : path.id === 'overwatch' ? 'EXPERT' : 'ADVANCED'}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Difficulty</div>
            </div>
        </div>

        <div className="pt-4 pb-4 md:pb-0">
            <Button onClick={onEnter} className="w-full py-6 text-lg tracking-widest font-bold shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_40px_rgba(0,255,157,0.4)] transition-all">
                ACCESS CURRICULUM <ChevronRight className="ml-2" />
            </Button>
        </div>
    </div>
);

const LearningPaths = () => {
    const [selectedPathId, setSelectedPathId] = useState('forge');
    const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'modules'
    const [showCert, setShowCert] = useState(false);
    const { user } = useAuth();
    const { isModuleCompleted } = useProgress();
    const detailRef = useRef(null);

    const selectedPath = LEARNING_PATHS.find(p => p.id === selectedPathId);

    // Calculate completion for selected path
    const totalModules = selectedPath?.sections.flatMap(s => s.modules).length || 0;
    const completedCount = selectedPath?.sections.flatMap(s => s.modules).filter(m => isModuleCompleted(selectedPath.id, m.id)).length || 0;
    const completionPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
    const isPathComplete = completionPercent === 100;

    // Reset view when path changes
    useEffect(() => {
        setViewMode('overview');
        setShowCert(false);
    }, [selectedPathId]);

    // Auto-scroll to details on mobile when path changes
    useEffect(() => {
        if (window.innerWidth < 1024 && detailRef.current) {
            setTimeout(() => {
                detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [selectedPathId]);

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            {showCert && (
                <Certificate
                    user={user}
                    path={selectedPath}
                    date={new Date().toLocaleDateString()}
                    onClose={() => setShowCert(false)}
                />
            )}

            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white">LEARNING PATHS</h1>
                <p className="text-gray-400 font-mono text-sm">Select a specialization. Progress is independent per path.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Path Selection List */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    {LEARNING_PATHS.map((path) => (
                        <PathCard
                            key={path.id}
                            path={path}
                            isSelected={selectedPathId === path.id}
                            onClick={() => setSelectedPathId(path.id)}
                        />
                    ))}
                </div>

                {/* Path Detail View */}
                <div className="lg:col-span-8" ref={detailRef}>
                    <AnimatePresence mode="wait">
                        {selectedPath && (
                            <motion.div
                                key={`${selectedPath.id}-${viewMode}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-surface/30 border border-white/5 rounded-2xl p-8 min-h-[600px] relative overflow-hidden"
                            >
                                {/* Admin Indicator */}
                                {user?.role === 'admin' && (
                                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono rounded flex items-center gap-2">
                                        <LockOpen size={12} />
                                        ADMIN OVERRIDE
                                    </div>
                                )}
                                {/* Decorative Backdrops */}
                                <div className={cn("absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl opacity-10 rounded-bl-[100px] pointer-events-none", selectedPath.color.replace('text-', 'from-'))} />

                                <div className="mb-10">
                                    <span className={cn("font-mono text-xs border px-2 py-1 rounded mb-4 inline-flex flex-wrap gap-1 items-center max-w-full", selectedPath.borderColor, selectedPath.color)}>
                                        <span className="whitespace-nowrap">CURRENT STATUS:</span>
                                        <span className="whitespace-normal text-right md:text-left">{selectedPath.role}</span>
                                    </span>
                                    <h2 className="text-3xl font-bold text-white mb-2">{selectedPath.title}</h2>

                                    {/* Progress Bar (Always visible) */}
                                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden flex gap-0.5 mt-4">
                                        <div
                                            className={cn("h-full transition-all duration-1000", selectedPath.color.replace('text-', 'bg-'))}
                                            style={{ width: `${completionPercent}%` }}
                                        />
                                    </div>

                                    {isPathComplete && (
                                        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                            <Button onClick={() => setShowCert(true)} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] border-0">
                                                <Award className="mr-2" /> CLAIM {selectedPath.title.toUpperCase()} CERTIFICATE
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {viewMode === 'overview' ? (
                                    <PathOverview path={selectedPath} onEnter={() => setViewMode('modules')} />
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                        <Button variant="ghost" size="sm" onClick={() => setViewMode('overview')} className="mb-6 hover:bg-white/5">
                                            ← BACK TO MISSION BRIEF
                                        </Button>
                                        <ModuleList path={selectedPath} />
                                    </div>
                                )}

                                <div className="mt-12 p-6 border border-white/5 rounded-xl bg-background/50 text-center">
                                    <p className="text-gray-500 font-mono text-xs mb-4">PROGRESSION PROTOCOL IN EFFECT</p>
                                    <p className="text-gray-400 text-sm max-w-lg mx-auto">
                                        {user?.role === 'admin'
                                            ? "Command Override Active. You have unrestricted access to all modules."
                                            : "Modules must be completed in sequence. Master the fundamentals before advancing."}
                                    </p>
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
