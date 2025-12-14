import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { LEARNING_PATHS } from '../../data/learningPaths';
import { useProgress } from '../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

const ContinueLearningCard = () => {
    const { isModuleCompleted, isModuleLocked } = useProgress();
    const navigate = useNavigate();

    // Determine the "Next" module to show
    const activeModule = useMemo(() => {
        // Simple logic: Find the first unlocked but not completed module in the Forge path
        // In a real app, we'd track "last accessed"
        const forgePath = LEARNING_PATHS.find(p => p.id === 'forge');

        if (!forgePath) return null;

        const allModules = forgePath.sections.flatMap(s => s.modules);

        // Find first incomplete module that isn't locked
        // Or finding the First Locked one implies the previous was the last completed one.
        // Let's find the first one that is NOT completed.
        const nextUp = allModules.find(m => !isModuleCompleted('forge', m.id));

        return nextUp || allModules[allModules.length - 1]; // Default to last if all done
    }, [isModuleCompleted]);

    if (!activeModule) return null;

    // Calculate percentage for valid bar
    // This is a rough estimate based on module index
    const forgePath = LEARNING_PATHS.find(p => p.id === 'forge');
    const allModules = forgePath?.sections.flatMap(s => s.modules) || [];
    const currentIndex = allModules.findIndex(m => m.id === activeModule.id);
    const progressPercent = Math.round((currentIndex / allModules.length) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-surface border border-white/5 p-8 group hover:border-primary/30 transition-colors duration-500"
        >
            {/* Background graphic */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent skew-x-12 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12 group-hover:opacity-20 transition-all duration-500 text-primary">
                <ShieldCheck size={200} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase mb-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Active Operation
                    </div>

                    <h2 className="text-3xl font-orbitron font-bold text-white leading-tight">
                        {activeModule.title}
                    </h2>

                    <p className="text-gray-400 max-w-md">
                        Resume your training in the Forge path. Establish your baseline.
                    </p>

                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>Progress: {progressPercent}% of Forge</span>
                            <span>XP Reward: +100</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate(`/modules/${activeModule.id}`)}
                        className="w-full md:w-auto shadow-[0_0_20px_rgba(0,255,157,0.15)] group-hover:shadow-[0_0_30px_rgba(0,255,157,0.3)]"
                    >
                        <Play className="w-4 h-4 mr-2 fill-current" />
                        Resume Mission
                    </Button>
                    <span className="text-xs text-gray-500 font-mono">Module {activeModule.id.toUpperCase()}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ContinueLearningCard;
