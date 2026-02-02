import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    CheckCircle, Lock, AlertTriangle, Terminal, Clock, Award,
    ArrowRight, Shield, MonitorPlay, FileCode, List, ChevronRight, CheckCircle2, Check, Coins, Unlock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LEARNING_PATHS } from '../data/learningPaths';
import { QUIZZES } from '../data/quizzes';
import Quiz from '../components/quiz/Quiz';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext'; // [NEW]
import { cn } from '../lib/utils';
import CyberButton from '../components/ui/CyberButton';
import Button from '../components/ui/Button';

const ModuleDetail = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { markModuleComplete, isModuleCompleted, getNextModuleId, isModuleLocked, updateLastAccessed, addPurchasedModule } = useProgress();
    const { user } = useAuth();
    const { balance, unlockModule, isProcessing: isWalletProcessing } = useWallet(); // [NEW]

    // Find module metadata
    const path = LEARNING_PATHS.find(p => p.sections.some(s => s.modules.some(m => m.id === moduleId)));
    const moduleData = path?.sections.flatMap(s => s.modules).find(m => m.id === moduleId);

    // Get all modules in a flat list for the sidebar
    const allModules = path?.sections.flatMap(s => s.modules) || [];
    const currentModuleIndex = allModules.findIndex(m => m.id === moduleId);

    const quizData = QUIZZES[moduleId];

    // Check lock state
    const locked = isModuleLocked(path?.id, moduleId);

    useEffect(() => {
        if (!moduleData || locked) {
            setLoading(false);
            return;
        }

        updateLastAccessed(path.id, moduleId);

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
    }, [moduleId, moduleData, path, locked, navigate]); // Removed isModuleLocked from dep to avoid loop if state changes

    // [DYNAMIC ECONOMY]
    // Calculate unlock cost based on module index (simulated difficulty)
    // Basic (first 3): 1 Coin
    // Medium (next 5): 2 Coins
    // Advanced (rest): 3 Coins
    const getUnlockCost = () => {
        if (!path) return 1;
        const index = currentModuleIndex;
        if (index < 3) return 1;
        if (index < 8) return 2;
        return 3;
    };

    // Calculate completion reward (1 to 3 coins random)
    // In a real app, this should be consistent per module, but random is fun for "Loot".
    const getCompletionReward = () => {
        const index = currentModuleIndex;
        if (index < 5) return 1; // Early game: 1 coin guarunteed
        return Math.floor(Math.random() * 3) + 1; // 1-3 coins
    };

    const unlockCost = getUnlockCost();

    const handleUnlock = async () => {
        if (balance < unlockCost) return;

        const success = await unlockModule(path.id, moduleId, unlockCost);
        if (success) {
            addPurchasedModule(path.id, moduleId);
        }
    };

    const isCompleted = isModuleCompleted(path.id, moduleId);
    const nextModuleId = getNextModuleId(path.id, moduleId);
    const isAdmin = user?.role === 'admin';

    const handleComplete = async () => {
        // [ECONOMY] Award Coins on Completion
        // We do this by calling the service directly to ensure secure transaction
        const reward = getCompletionReward();

        try {
            // Update Context (Client State)
            markModuleComplete(path.id, moduleId, moduleData.xp || 100, reward);

            // Update Database (Server State)
            const { completeModule } = await import('../lib/firestoreService');
            if (user?.uid) {
                await completeModule(user.uid, path.id, moduleId, moduleData.xp || 100, reward);
                // Refresh wallet
                // We need a way to refresh wallet context. 
                // For now, next page load will catch it, or we trigger it if we had access to recharge().
            }
        } catch (e) {
            console.error("Completion error", e);
        }
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
                        {locked ? (
                            <div className="flex flex-col items-center justify-center py-20 border border-white/10 bg-black/40 rounded-xl backdrop-blur-sm">
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    <Lock className="w-10 h-10 text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2 tracking-widest uppercase font-orbitron">Restricted Access</h2>
                                <p className="text-gray-400 mb-8 max-w-md text-center font-mono text-sm leading-relaxed">
                                    This intelligence file is classified. Decryption requires <span className="text-white">Level {unlockCost}</span> clearance or a Coin override.
                                </p>

                                <div className="bg-black/40 px-8 py-6 rounded-lg border border-white/5 mb-8 flex items-center gap-8">
                                    <div className="text-right">
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Balance</div>
                                        <div className="text-2xl font-bold text-primary flex items-center justify-end gap-2">
                                            {balance} <Coins size={16} />
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Decryption Cost</div>
                                        <div className="text-2xl font-bold text-red-400 flex items-center gap-2">
                                            {unlockCost} <Coins size={16} />
                                        </div>
                                    </div>
                                </div>

                                <CyberButton
                                    onClick={handleUnlock}
                                    loading={isWalletProcessing}
                                    disabled={balance < unlockCost}
                                    icon={Unlock}
                                    variant="primary"
                                    className={cn("min-w-[280px]", balance < unlockCost && "border-red-500/30 text-red-500 hover:bg-red-500/10")}
                                >
                                    {balance < unlockCost ? "INSUFFICIENT FUNDS" : `UNLOCK ACCESS (-${unlockCost} COINS)`}
                                </CyberButton>

                                {balance < unlockCost && (
                                    <p className="mt-4 text-[10px] text-red-400 uppercase tracking-widest animate-pulse">
                                        Action Denied: Wallet Empty
                                    </p>
                                )}
                            </div>
                        ) : (
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
                        )}

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
                                    {isCompleted ? 'MODULE COMPLETE' : `ACKNOWLEDGE & COMPLETE (+${getCompletionReward()} COINS)`}
                                </CyberButton>
                            )}

                            {/* Next Module Button */}
                            {nextModuleId && (
                                <button
                                    onClick={() => navigate(`/modules/${nextModuleId}`)}
                                    // disabled={!isCompleted && !isAdmin} 
                                    // PERMISSION FIX: Allow checking next module even if not completed, 
                                    // if it's locked they'll just hit the lock screen.
                                    // But typically "Next" should be sequential?
                                    // Let's keep it sequential.
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
                                        onClick={() => navigate(`/modules/${mod.id}`)}
                                        className={cn(
                                            "p-4 transition-colors relative group",
                                            isActive ? "bg-white/5" : "hover:bg-white/5 cursor-pointer",
                                            isModLocked && "opacity-75" // Less opacity for locked but clickable
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
                                                    <Lock size={14} className="text-gray-500" />
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
