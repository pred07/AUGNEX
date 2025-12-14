import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { LEARNING_PATHS } from '../data/learningPaths';
import { RANKS, MEDALS } from '../data/achievements';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();
    // Map of pathId -> Set of completed moduleIds
    const [progress, setProgress] = useState({});
    const [xp, setXp] = useState(0);
    const [unlockedMedals, setUnlockedMedals] = useState([]);

    // Load progress from local storage on mount
    useEffect(() => {
        const storedProgress = localStorage.getItem('augnex_progress');
        const storedXp = localStorage.getItem('augnex_xp');
        const storedMedals = localStorage.getItem('augnex_medals');

        if (storedProgress) setProgress(JSON.parse(storedProgress));
        if (storedXp) setXp(parseInt(storedXp, 10));
        if (storedMedals) setUnlockedMedals(JSON.parse(storedMedals));
    }, []);

    // Save progress whenever it changes
    useEffect(() => {
        localStorage.setItem('augnex_progress', JSON.stringify(progress));
        localStorage.setItem('augnex_xp', xp.toString());
        localStorage.setItem('augnex_medals', JSON.stringify(unlockedMedals));
    }, [progress, xp, unlockedMedals]);

    const getCurrentRank = () => {
        // Find the highest rank where xp >= minXp
        return RANKS.slice().reverse().find(r => xp >= r.minXp) || RANKS[0];
    };

    const checkAchievements = (newProgress, currentXp) => {
        // Calculate stats for conditions
        const modulesCompleted = Object.values(newProgress).flat().length;
        const pathProgress = {};
        let pathsCompleted = [];

        LEARNING_PATHS.forEach(path => {
            const totalModules = path.sections.flatMap(s => s.modules).length;
            const completedInPath = newProgress[path.id]?.length || 0;
            pathProgress[path.id] = completedInPath;
            if (completedInPath >= totalModules) {
                pathsCompleted.push(path.id);
            }
        });

        const stats = {
            modulesCompleted,
            pathProgress,
            pathsCompleted,
            loginStreak: 1 // TODO: Implement real streak
        };

        const newMedals = [];
        let additionalXp = 0;

        MEDALS.forEach(medal => {
            if (!unlockedMedals.includes(medal.id)) {
                if (medal.condition(stats)) {
                    newMedals.push(medal.id);
                    additionalXp += medal.xpReward;
                    // In a real app, trigger a toast here
                    console.log(`🏅 UNLOCKED: ${medal.title}`);
                }
            }
        });

        if (newMedals.length > 0) {
            setUnlockedMedals(prev => [...prev, ...newMedals]);
            setXp(prev => prev + additionalXp);
        }
    };

    const markModuleComplete = (pathId, moduleId) => {
        setProgress(prev => {
            const pathProgress = prev[pathId] || [];
            if (!pathProgress.includes(moduleId)) {
                const newProgress = {
                    ...prev,
                    [pathId]: [...pathProgress, moduleId]
                };

                // Award base XP for module completion
                const MODULE_XP_REWARD = 100;
                setXp(currentXp => {
                    const updatedXp = currentXp + MODULE_XP_REWARD;
                    // Check achievements AFTER state update would technically be better with useEffect,
                    // but passing calculated values for immediate feedback
                    checkAchievements(newProgress, updatedXp);
                    return updatedXp;
                });

                return newProgress;
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
            xp,
            currentRank: getCurrentRank(),
            unlockedMedals,
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
