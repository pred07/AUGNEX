import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { LEARNING_PATHS } from '../data/learningPaths';
import { RANKS, MEDALS } from '../data/achievements';
import { BADGES, getBadgeByPathId } from '../data/badges';
import * as localStorageService from '../lib/localStorageService';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();

    // State
    const [progress, setProgress] = useState({});
    const [purchasedModules, setPurchasedModules] = useState([]);
    const [xp, setXp] = useState(0);
    const [unlockedMedals, setUnlockedMedals] = useState([]);
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load progress from localStorage when user logs in
    useEffect(() => {
        if (!user) {
            // Clear progress when logged out
            setProgress({});
            setPurchasedModules([]);
            setXp(0);
            setUnlockedMedals([]);
            setUnlockedBadges([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);

            // Load from localStorage
            const progressData = localStorageService.getProgress();
            const walletData = localStorageService.getWallet();

            setProgress(progressData.completedModules || {});
            setPurchasedModules(progressData.purchasedModules || []);
            setXp(progressData.xp || 0);
            setUnlockedMedals(progressData.unlockedMedals || []);
            setUnlockedBadges(progressData.unlockedBadges || []);

            console.log('✅ Progress loaded from localStorage');
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    const getCurrentRank = () => {
        return RANKS.slice().reverse().find(r => xp >= r.minXp) || RANKS[0];
    };

    const checkAchievements = (newProgress, currentXp) => {
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
            loginStreak: 1
        };

        // Check medals
        const newMedals = [];
        let additionalXp = 0;

        MEDALS.forEach(medal => {
            if (!unlockedMedals.includes(medal.id)) {
                if (medal.condition(stats)) {
                    newMedals.push(medal.id);
                    additionalXp += medal.xpReward;
                    console.log(`🏅 UNLOCKED: ${medal.title}`);
                    localStorageService.unlockMedal(medal.id);
                }
            }
        });

        // Check badges (path completion)
        const newBadges = [];
        for (const pathId of pathsCompleted) {
            const badge = getBadgeByPathId(pathId);
            if (badge && !unlockedBadges.includes(badge.id)) {
                newBadges.push(badge.id);
                console.log(`🎖️ BADGE UNLOCKED: ${badge.title}`);
                localStorageService.unlockBadge(badge.id);
            }
        }

        // Update state
        if (newMedals.length > 0) {
            setUnlockedMedals(prev => [...prev, ...newMedals]);
            setXp(prev => prev + additionalXp);
        }

        if (newBadges.length > 0) {
            setUnlockedBadges(prev => [...prev, ...newBadges]);
        }
    };

    const markModuleComplete = (pathId, moduleId, xpReward = 100) => {
        setProgress(prev => {
            const pathProgress = prev[pathId] || [];
            if (pathProgress.includes(moduleId)) {
                return prev; // Already completed
            }

            // Update localStorage
            const result = localStorageService.completeModule(pathId, moduleId, xpReward);

            if (result) {
                const newProgress = result.completedModules;

                // Award XP immediately
                setXp(result.xp);

                // Check achievements
                checkAchievements(newProgress, result.xp);

                return newProgress;
            }

            return prev;
        });
    };

    const addPurchasedModule = (moduleId) => {
        if (!purchasedModules.includes(moduleId)) {
            setPurchasedModules(prev => [...prev, moduleId]);
        }
    };

    const isModuleCompleted = (pathId, moduleId) => {
        return progress[pathId]?.includes(moduleId) || false;
    };

    const isModuleLocked = (pathId, moduleId) => {
        // Admins bypass everything
        if (user?.role === 'admin') return false;

        // Completed modules are never locked
        if (isModuleCompleted(pathId, moduleId)) return false;

        // Check if purchased
        if (purchasedModules.includes(moduleId)) return false;

        // Check sequence structure
        const path = LEARNING_PATHS.find(p => p.id === pathId);
        if (!path) return true;

        let allModules = [];
        path.sections.forEach(section => {
            allModules = [...allModules, ...section.modules];
        });

        const currentIndex = allModules.findIndex(m => m.id === moduleId);
        if (currentIndex === 0) return false; // First module always open

        // If not purchased, it is locked
        return true;
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
            purchasedModules,
            addPurchasedModule,
            xp,
            currentRank: getCurrentRank(),
            unlockedMedals,
            unlockedBadges,
            isLoading,
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
