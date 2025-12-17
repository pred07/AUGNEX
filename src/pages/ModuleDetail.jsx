import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    CheckCircle, Lock, AlertTriangle, Terminal, Clock, Award,
    ArrowRight, Shield, MonitorPlay, FileCode, List, ChevronRight, CheckCircle2, Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { QUIZZES } from '../data/quizzes';
import Quiz from '../components/quiz/Quiz';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import CyberButton from '../components/ui/CyberButton';

const ModuleDetail = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { markModuleComplete, isModuleCompleted, getNextModuleId, isModuleLocked } = useProgress();
    const { user } = useAuth();

    // Find module metadata
    const path = LEARNING_PATHS.find(p => p.sections.some(s => s.modules.some(m => m.id === moduleId)));
    const moduleData = path?.sections.flatMap(s => s.modules).find(m => m.id === moduleId);

    // Get all modules in a flat list for the sidebar
    const allModules = path?.sections.flatMap(s => s.modules) || [];
    const currentModuleIndex = allModules.findIndex(m => m.id === moduleId);

    const quizData = QUIZZES[moduleId];

    useEffect(() => {
        if (!moduleData) return;

        if (isModuleLocked(path.id, moduleId)) {
            navigate('/paths');
            return;
        }

        const loadContent = async () => {
            try {
                const module = await import(`../data/modules/${moduleId}.md?raw`);
                setContent(module.default);
            } catch (err) {
                console.error("Failed to load module:", err);
                setContent(`# Classified Data Missing\n\nThis intelligence file (${moduleId}.md) is currently inaccessible.`);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [moduleId, moduleData, path, isModuleLocked, navigate]);

    if (!moduleData || !path) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 font-mono">
                <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
                <h2 className="text-2xl font-bold text-white tracking-widest">ERROR: DATA CORRUPTED</h2>
                <button onClick={() => navigate('/paths')} className="text-primary hover:text-white transition-colors underline decoration-dotted underline-offset-4 mt-4">
                    // RETURN TO BASE
                </button>
            </div>
        );
    }

    const isCompleted = isModuleCompleted(path.id, moduleId);
    const nextModuleId = getNextModuleId(path.id, moduleId);
    const isAdmin = user?.role === 'admin';

    const handleComplete = () => {
        markModuleComplete(path.id, moduleId, moduleData.xp || 100);
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'lab': return <MonitorPlay size={14} />;
            case 'ctf': return <Shield size={14} />;
            default: return <FileCode size={14} />;
        }
    };

    // Helper to get path color as bg for the filled circle
    const getPathBgColor = () => {
        if (!path?.color) return 'bg-gray-500';
        return path.color.replace('text-', 'bg-');
    };

    return (
        <div className="max-w-7xl mx-auto pb-32 px-4 md:px-8">
            {/* Tactical Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-gray-500 mb-8 pt-8 uppercase tracking-widest">
                <span onClick={() => navigate('/paths')} className="hover:text-primary cursor-pointer transition-colors">OPS_CENTER</span>
                <span className="text-gray-700">/</span>
                <span className={cn("hover:text-white cursor-default", path.color)}>{path.title}</span>
                <span className="text-gray-700">/</span>
                <span className="text-white">{moduleId}</span>
            </div>

            {/* Header */}
            <div className="border-l-2 border-white/10 pl-6 mb-12 relative">
                <div className={cn("absolute -left-[3px] top-0 h-10 w-[4px] bg-gradient-to-b", path.color.replace('text-', 'from-'), "to-transparent")} />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-none tracking-tight">
                    {moduleData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                        {getTypeIcon(moduleData.type)} <span className="uppercase">{moduleData.type || 'THEORY'}</span>
                    </div>
                    <div className="flex items-center gap-2"><Clock size={14} /> <span>{moduleData.duration || '30m'}</span></div>
                    <div className="flex items-center gap-2 text-primary"><Award size={14} /> <span>+{moduleData.xp || 100} XP</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* LEFT COLUMN: Content & Actions */}
                <div className="lg:col-span-8 flex flex-col justify-between min-h-[500px]">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="prose prose-invert prose-lg max-w-none custom-markdown prose-p:text-gray-300 prose-strong:text-white"
                        >
                            {loading ? (
                                <div className="space-y-4 opacity-50">
                                    <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
                                    <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
                                </div>
                            ) : (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                            )}
                        </motion.div>

                        {/* Quiz Inline */}
                        {!isCompleted && quizData && (
                            <div className="mt-16 border-t border-white/10 pt-8">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Terminal className="text-primary" /> VALIDATION PROTOCOL
                                </h3>
                                <Quiz data={quizData} onComplete={handleComplete} />
                            </div>
                        )}
                    </div>

                    {/* BOTTOM ACTIONS AREA */}
                    <div className="mt-20 pt-8 border-t border-white/10">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                            AWAITING INPUT
                        </h4>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Complete Button */}
                            {(!quizData || isCompleted) && (
                                <CyberButton
                                    onClick={handleComplete}
                                    disabled={isCompleted}
                                    variant={isCompleted ? 'success' : 'primary'}
                                    className="flex-1"
                                >
                                    {isCompleted ? 'MODULE COMPLETE' : 'ACKNOWLEDGE & COMPLETE'}
                                </CyberButton>
                            )}

                            {/* Next Module Button */}
                            {nextModuleId && (
                                <button
                                    onClick={() => navigate(`/modules/${nextModuleId}`)}
                                    disabled={!isCompleted && !isAdmin}
                                    className={cn(
                                        "flex-1 flex items-center justify-between px-6 py-4 rounded border text-sm font-mono tracking-widest uppercase transition-all",
                                        (!isCompleted && !isAdmin)
                                            ? "border-white/5 text-gray-600 cursor-not-allowed bg-black/20"
                                            : "border-white/10 text-white bg-white/5 hover:bg-white/10 hover:border-white/20"
                                    )}
                                >
                                    <span className="flex flex-col items-start gap-1">
                                        <span className="text-[10px] text-gray-500">NEXT SEQUENCE</span>
                                        <span>PROCEED</span>
                                    </span>
                                    {(!isCompleted && !isAdmin) ? <Lock size={16} /> : <ArrowRight size={16} />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar / Upcoming Modules */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-surface/30 border border-white/5 rounded-xl p-0 overflow-hidden backdrop-blur-sm sticky top-24 max-h-[calc(100vh-8rem)] flex flex-col">
                        <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between shrink-0">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <List size={12} /> Sequence
                            </h4>
                            <span className="text-[10px] font-mono text-gray-600">
                                {currentModuleIndex + 1} / {allModules.length}
                            </span>
                        </div>

                        {/* Scrollable Container */}
                        <div className="divide-y divide-white/5 overflow-y-auto custom-scrollbar">
                            {allModules.map((mod) => {
                                const isActive = mod.id === moduleId;
                                const isModCompleted = isModuleCompleted(path.id, mod.id);
                                const isModLocked = isModuleLocked(path.id, mod.id);

                                return (
                                    <div
                                        key={mod.id}
                                        onClick={() => !isModLocked && navigate(`/modules/${mod.id}`)}
                                        className={cn(
                                            "p-4 transition-colors relative group",
                                            isActive ? "bg-white/5" : "hover:bg-white/5 cursor-pointer",
                                            isModLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                        )}
                                        ref={isActive ? (el) => el?.scrollIntoView({ behavior: 'smooth', block: 'center' }) : null}
                                    >
                                        {isActive && <div className={cn("absolute left-0 top-0 bottom-0 w-[2px]", path.color.replace('text-', 'bg-'))} />}

                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex-shrink-0">
                                                {isModCompleted ? (
                                                    // Filled circle for completed
                                                    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center", getPathBgColor())}>
                                                        <Check size={10} className="text-black stroke-[3]" />
                                                    </div>
                                                ) : isModLocked ? (
                                                    <Lock size={14} className="text-gray-600" />
                                                ) : isActive ? (
                                                    <div className={cn("w-3.5 h-3.5 rounded-full border-2 animate-pulse", path.color.replace('text-', 'border-'))} />
                                                ) : (
                                                    <div className="w-3.5 h-3.5 rounded-full border border-gray-600" />
                                                )}
                                            </div>
                                            <div>
                                                <div className={cn(
                                                    "text-sm font-medium mb-1 line-clamp-2",
                                                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300"
                                                )}>
                                                    {mod.title}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase">
                                                    <span>{mod.type || 'THEORY'}</span>
                                                    <span>•</span>
                                                    <span>{mod.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetail;
