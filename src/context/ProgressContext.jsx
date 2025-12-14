import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { LEARNING_PATHS } from '../data/learningPaths';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();
    // Map of pathId -> Set of completed moduleIds
    const [progress, setProgress] = useState({});

    // Load progress from local storage on mount
    useEffect(() => {
        const storedProgress = localStorage.getItem('augnex_progress');
        if (storedProgress) {
            setProgress(JSON.parse(storedProgress));
        }
    }, []);

    // Save progress whenever it changes
    useEffect(() => {
        localStorage.setItem('augnex_progress', JSON.stringify(progress));
    }, [progress]);

    const markModuleComplete = (pathId, moduleId) => {
        setProgress(prev => {
            const pathProgress = prev[pathId] || [];
            if (!pathProgress.includes(moduleId)) {
                return {
                    ...prev,
                    [pathId]: [...pathProgress, moduleId]
                };
            }
            return prev;
        });
    };

    const isModuleCompleted = (pathId, moduleId) => {
        return progress[pathId]?.includes(moduleId) || false;
    };

    const isModuleLocked = (pathId, moduleId) => {
        // 1. Admins bypass everything
        if (user?.role === 'admin') return false;

        // 2. Completed modules are never locked
        if (isModuleCompleted(pathId, moduleId)) return false;

        // 3. Check sequence structure
        const path = LEARNING_PATHS.find(p => p.id === pathId);
        if (!path) return true; // Invalid path

        // Flatten all modules in the path to find the index
        let allModules = [];
        path.sections.forEach(section => {
            allModules = [...allModules, ...section.modules];
        });

        const currentIndex = allModules.findIndex(m => m.id === moduleId);
        if (currentIndex === 0) return false; // First module always open

        // Check if previous module is completed
        const prevModule = allModules[currentIndex - 1];
        return !isModuleCompleted(pathId, prevModule.id);
    };

    const getNextModuleId = (pathId, currentModuleId) => {
        const path = LEARNING_PATHS.find(p => p.id === pathId);
        if (!path) return null;

        let allModules = [];
        path.sections.forEach(section => {
            allModules = [...allModules, ...section.modules];
        });

        const currentIndex = allModules.findIndex(m => m.id === currentModuleId);
        if (currentIndex !== -1 && currentIndex < allModules.length - 1) {
            return allModules[currentIndex + 1].id;
        }
        return null;
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            markModuleComplete,
            isModuleCompleted,
            isModuleLocked,
            getNextModuleId
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
