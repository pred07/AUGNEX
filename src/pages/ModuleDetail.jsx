import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { LEARNING_PATHS } from '../data/learningPaths';

// Helper to find module metadata across all paths
const findModuleById = (id) => {
    for (const path of LEARNING_PATHS) {
        for (const stage of path.stages) {
            const found = stage.modules.find(m => m.id === id);
            if (found) return { ...found, pathId: path.id, pathName: path.title };
        }
    }
    return null;
};

const ModuleDetail = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [moduleMeta, setModuleMeta] = useState(null);

    useEffect(() => {
        const meta = findModuleById(moduleId);
        setModuleMeta(meta);

        const loadContent = async () => {
            try {
                setLoading(true);
                // Dynamic import of markdown file
                // Note: In Vite, we can use import.meta.glob or simple fetch if in public
                // For this demo, we'll try to import dynamically
                const moduleContent = await import(`../data/modules/${moduleId}.md?raw`);
                setContent(moduleContent.default);
            } catch (err) {
                console.error("Failed to load module:", err);
                setError("Module content not found or access denied.");
            } finally {
                setLoading(false);
            }
        };

        if (moduleId) loadContent();
    }, [moduleId]);

    const handleComplete = () => {
        // Logic to mark complete would go here (update context/localstorage)
        navigate('/paths');
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (error || !moduleMeta) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                <AlertTriangle className="w-12 h-12 text-accent" />
                <h2 className="text-xl font-orbitron font-bold text-white">MODULE NOT FOUND</h2>
                <p className="text-gray-400">The requested module data could not be retrieved.</p>
                <Button onClick={() => navigate('/paths')} variant="ghost">Return to Paths</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-8 border-b border-white/5 pb-6">
                <Button variant="ghost" size="sm" onClick={() => navigate('/paths')} className="mb-4 pl-0 hover:bg-transparent hover:text-white">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Learning Paths
                </Button>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider">
                        {moduleMeta.pathName}
                    </span>
                    {moduleMeta.status === 'completed' && (
                        <span className="text-green-400 text-xs flex items-center gap-1 font-mono uppercase">
                            <CheckCircle size={12} /> Completed
                        </span>
                    )}
                </div>
                <h1 className="text-4xl font-orbitron font-bold text-white mb-2">{moduleMeta.title}</h1>
            </div>

            {/* Content Renderer */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface/30 border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>

                {/* Action Footer */}
                <div className="mt-16 pt-8 border-t border-white/5 flex justify-end">
                    <Button size="lg" onClick={handleComplete} className="shadow-lg shadow-primary/10">
                        <CheckCircle className="mr-2 w-5 h-5" /> Mark as Complete
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default ModuleDetail;
