import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, CheckCircle, ArrowRight, Lock, Loader2, AlertTriangle } from 'lucide-react';
import { LEARNING_PATHS } from '../data/learningPaths';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const ModuleDetail = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const { markModuleComplete, isModuleCompleted, getNextModuleId, isModuleLocked } = useProgress();
    const { user } = useAuth();

    // Find module metadata
    const path = LEARNING_PATHS.find(p => p.stages.some(s => s.modules.some(m => m.id === moduleId)));
    const moduleData = path?.stages.flatMap(s => s.modules).find(m => m.id === moduleId);

    useEffect(() => {
        if (!moduleData) return;

        // Security check: If learner tries to access locked module via URL
        if (isModuleLocked(path.id, moduleId)) {
            navigate('/paths');
            return;
        }

        const loadContent = async () => {
            try {
                // Dynamically import the markdown file associated with the module ID
                // Using ?raw for Vite to import as text
                const module = await import(`../data/modules/${moduleId}.md?raw`);
                setContent(module.default);
            } catch (err) {
                console.error("Failed to load module:", err);
                setContent(`# Module Content Not Found\n\nThis module file (${moduleId}.md) has not been created yet.`);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [moduleId, moduleData, path, isModuleLocked, navigate]);

    if (!moduleData || !path) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-accent" />
                <h2 className="text-xl font-orbitron font-bold text-white">MODULE NOT FOUND</h2>
                <p className="text-gray-400">The requested module data could not be retrieved.</p>
                <button onClick={() => navigate('/paths')} className="text-primary hover:underline">Return to Paths</button>
            </div>
        );
    }

    const isCompleted = isModuleCompleted(path.id, moduleId);
    const nextModuleId = getNextModuleId(path.id, moduleId);
    const isAdmin = user?.role === 'admin';

    const handleComplete = () => {
        markModuleComplete(path.id, moduleId);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <button
                onClick={() => navigate('/paths')}
                className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
                <ChevronLeft size={20} /> Back to {path.title}
            </button>

            <div className="bg-surface/30 border border-white/5 rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
                {isAdmin && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-red-500/10 text-red-500 text-[10px] font-mono border border-red-500/20 rounded">
                        ADMIN MODE
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded border ${path.borderColor} ${path.color} bg-black/50 text-xs font-mono`}>
                        {path.id.toUpperCase()} PATH
                    </span>
                    <span className="text-gray-500 font-mono text-xs">MODULE {moduleId.toUpperCase()}</span>
                    {isCompleted && (
                        <span className="flex items-center gap-1 text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded">
                            <CheckCircle size={12} /> COMPLETED
                        </span>
                    )}
                </div>

                <h1 className="text-4xl md:text-5xl font-rajdhani font-bold text-white mb-6 leading-tight">
                    {moduleData.title}
                </h1>

                {/* Markdown Content */}
                <div className="prose prose-invert prose-lg max-w-none custom-markdown">
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-white/10 rounded w-3/4"></div>
                            <div className="h-4 bg-white/10 rounded w-1/2"></div>
                            <div className="h-40 bg-white/10 rounded w-full"></div>
                        </div>
                    ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    )}
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between bg-surface border border-white/10 p-6 rounded-xl sticky bottom-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted}
                        className={`px-6 py-3 rounded-lg font-bold font-orbitron transition-all flex items-center gap-2 ${isCompleted
                                ? 'bg-green-500/20 text-green-400 cursor-default'
                                : 'bg-primary hover:bg-primary-hover text-black shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]'
                            }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircle size={20} /> COMPLETED
                            </>
                        ) : (
                            "MARK AS COMPLETE"
                        )}
                    </button>
                </div>

                {nextModuleId ? (
                    <button
                        onClick={() => navigate(`/modules/${nextModuleId}`)}
                        // Admin can always go next; Learner can only go next if current is completed
                        disabled={!isCompleted && !isAdmin}
                        className={`group px-6 py-3 rounded-lg font-bold font-orbitron transition-all flex items-center gap-2 ${(!isCompleted && !isAdmin)
                                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                    >
                        NEXT MODULE
                        {(!isCompleted && !isAdmin) ? <Lock size={16} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                ) : (
                    <span className="text-gray-500 font-mono text-sm">PATH COMPLETE</span>
                )}
            </div>
        </div>
    );
};

export default ModuleDetail;
