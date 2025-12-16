import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Lock, CheckCircle, ChevronRight, Box, ArrowRight } from 'lucide-react';
import { LEARNING_PATHS } from '../data/learningPaths';
import { useProgress } from '../context/ProgressContext';
import Button from '../components/ui/Button';

const ModulesLibrary = () => {
    const navigate = useNavigate();
    const { isModuleCompleted, isModuleLocked } = useProgress();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPath, setSelectedPath] = useState('all');

    // Flatten all modules into a single array with path metadata
    const allModules = useMemo(() => {
        return LEARNING_PATHS.flatMap(path =>
            path.sections.flatMap(section =>
                section.modules.map(module => ({
                    ...module,
                    pathId: path.id,
                    pathColor: path.color,
                    pathBorder: path.borderColor,
                    sectionTitle: section.title
                }))
            )
        );
    }, []);

    // Filter logic
    const filteredModules = useMemo(() => {
        return allModules.filter(module => {
            const matchesPath = selectedPath === 'all' || module.pathId === selectedPath;
            const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                module.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPath && matchesSearch;
        });
    }, [allModules, selectedPath, searchQuery]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-orbitron font-bold text-white tracking-wider flex items-center gap-3">
                    <Box className="text-primary" size={40} />
                    MISSION LIBRARY
                </h1>
                <p className="text-gray-400 font-mono text-sm max-w-2xl">
                    Access the complete database of {allModules.length} training modules. Search specific topics or browse by classification.
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-14 md:top-0 bg-background/80 backdrop-blur-md py-4 z-20 border-b border-white/5">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search modules..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-primary/50 focus:outline-none transition-colors"
                    />
                </div>

                {/* Path Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                    <button
                        onClick={() => setSelectedPath('all')}
                        className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap border transition-all ${selectedPath === 'all'
                            ? 'bg-white text-black border-white'
                            : 'bg-surface/30 text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        ALL MODULES
                    </button>
                    {LEARNING_PATHS.map(path => (
                        <button
                            key={path.id}
                            onClick={() => setSelectedPath(path.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap border transition-all ${selectedPath === path.id
                                ? `bg-primary/20 text-primary ${path.borderColor}`
                                : 'bg-surface/30 text-gray-400 border-white/10 hover:border-white/30'
                                }`}
                        >
                            {path.title.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredModules.map(module => {
                    const isCompleted = isModuleCompleted(module.pathId, module.id);
                    const isLocked = isModuleLocked(module.pathId, module.id);

                    return (
                        <div
                            key={module.id}
                            onClick={() => !isLocked && navigate(`/modules/${module.id}`)}
                            className={`group relative bg-surface/30 border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-all duration-300 ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_20px_-10px_rgba(0,255,157,0.3)]'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${module.pathBorder} ${module.pathColor} bg-black/40`}>
                                    {module.id.toUpperCase()}
                                </span>
                                {isCompleted && <CheckCircle className="text-primary" size={16} />}
                                {isLocked && <Lock className="text-gray-600" size={16} />}
                            </div>

                            <h3 className="text-lg font-rajdhani font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                                {module.title}
                            </h3>

                            <p className="text-xs text-gray-500 font-mono mb-4">
                                {module.sectionTitle}
                            </p>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="border border-white/10 hover:border-primary/50 text-xs"
                                icon={ArrowRight}
                            >
                                ACCESS
                            </Button>
                        </div>
                    );
                })}
            </div>

            {filteredModules.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                    <div className="bg-surface/50 p-4 rounded-full border border-white/5 mb-4 relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                        <Search className="w-8 h-8 text-gray-400 relative z-10" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-surface rounded-full flex items-center justify-center border border-white/10 z-20">
                            <span className="text-primary font-bold text-[10px]">!</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-orbitron font-bold text-white mb-2">NO MODULES DETECTED</h3>
                    <p className="text-gray-500 font-mono text-sm max-w-sm">
                        The queried parameters returned zero results. Verify search syntax or adjust filter classification.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ModulesLibrary;
