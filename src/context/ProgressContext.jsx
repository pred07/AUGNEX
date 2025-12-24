import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { LEARNING_PATHS } from '../data/learningPaths';
import { RANKS, MEDALS } from '../data/achievements';
import { BADGES, getBadgeByPathId } from '../data/badges';
import {
    getUserProgress,
    completeModule as firestoreCompleteModule,
    awardBadge as firestoreAwardBadge,
    awardMedal as firestoreAwardMedal,
    updateLastActive
} from '../lib/firestoreService';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();

    // State
    const [progress, setProgress] = useState({});
    const [xp, setXp] = useState(0);
    const [unlockedMedals, setUnlockedMedals] = useState([]);
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    // Load progress from Firestore when user logs in
    useEffect(() => {
        const loadProgress = async () => {
            if (!user) {
                // Clear progress when logged out
                setProgress({});
                setXp(0);
                setUnlockedMedals([]);
                setUnlockedBadges([]);
                setIsLoading(false);
                return;
            }

            // For mock users (admin/learner), use localStorage
            if (user.username === 'admin' || user.username === 'learner') {
                loadFromLocalStorage();
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);

                // Load from localStorage first for instant UI
                const cached = loadFromLocalStorage();

                // Then fetch from Firestore
                const firestoreData = await getUserProgress(user.uid || user.publicId);

                if (firestoreData && firestoreData.progress) {
                    // Use Firestore data as source of truth
                    const progressData = firestoreData.progress;
                    setProgress(progressData.completedModules || {});
                    setXp(progressData.xp || 0);
                    setUnlockedMedals(progressData.unlockedMedals || []);
                    setUnlockedBadges(progressData.unlockedBadges || []);

                    // Update localStorage cache
                    saveToLocalStorage({
                        progress: progressData.completedModules || {},
                        xp: progressData.xp || 0,
                        unlockedMedals: progressData.unlockedMedals || [],
                        unlockedBadges: progressData.unlockedBadges || []
                    });

                    console.log('✅ Progress loaded from Firestore');
                } else if (cached.hasData) {
                    // No Firestore data but have localStorage - keep it
                    console.log('📦 Using cached progress (no Firestore data yet)');
                }

                // Update last active
                if (user.uid) {
                    updateLastActive(user.uid).catch(err =>
                        console.warn('Could not update last active:', err)
                    );
                }
            } catch (error) {
                console.error('Error loading progress from Firestore:', error);
                // Fall back to localStorage on error
                loadFromLocalStorage();
            } finally {
                setIsLoading(false);
            }
        };

        loadProgress();
    }, [user]);

    // Helper: Load from localStorage
    const loadFromLocalStorage = () => {
        try {
            const storedProgress = localStorage.getItem('nytvnt_progress');
            const storedXp = localStorage.getItem('nytvnt_xp');
            const storedMedals = localStorage.getItem('nytvnt_medals');
            const storedBadges = localStorage.getItem('nytvnt_badges');

            let hasData = false;

            if (storedProgress) {
                setProgress(JSON.parse(storedProgress));
                hasData = true;
            }
            if (storedXp) {
                setXp(parseInt(storedXp, 10));
                hasData = true;
            }
            if (storedMedals) {
                setUnlockedMedals(JSON.parse(storedMedals));
                hasData = true;
            }
            if (storedBadges) {
                setUnlockedBadges(JSON.parse(storedBadges));
                hasData = true;
            }

            return { hasData };
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return { hasData: false };
        }
    };

    // Helper: Save to localStorage (cache)
    const saveToLocalStorage = (data) => {
        try {
            localStorage.setItem('nytvnt_progress', JSON.stringify(data.progress));
            localStorage.setItem('nytvnt_xp', data.xp.toString());
            localStorage.setItem('nytvnt_medals', JSON.stringify(data.unlockedMedals));
            localStorage.setItem('nytvnt_badges', JSON.stringify(data.unlockedBadges));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Save to localStorage whenever state changes (for cache)
    useEffect(() => {
        if (!isLoading) {
            saveToLocalStorage({ progress, xp, unlockedMedals, unlockedBadges });
        }
    }, [progress, xp, unlockedMedals, unlockedBadges, isLoading]);

    const getCurrentRank = () => {
        return RANKS.slice().reverse().find(r => xp >= r.minXp) || RANKS[0];
    };

    const checkAchievements = async (newProgress, currentXp, userId) => {
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

                // Award badge in Firestore if real user
                if (userId && user.username !== 'admin' && user.username !== 'learner') {
                    try {
                        await firestoreAwardBadge(userId, badge.id);
                    } catch (error) {
                        console.error('Error awarding badge in Firestore:', error);
                    }
                }
            }
        }

        // Update state
        if (newMedals.length > 0) {
            setUnlockedMedals(prev => [...prev, ...newMedals]);
            setXp(prev => prev + additionalXp);

            // Award medals in Firestore if real user
            if (userId && user.username !== 'admin' && user.username !== 'learner') {
                for (const medalId of newMedals) {
                    try {
                        await firestoreAwardMedal(userId, medalId);
                    } catch (error) {
                        console.error('Error awarding medal in Firestore:', error);
                    }
                }
            }
        }

        if (newBadges.length > 0) {
            setUnlockedBadges(prev => [...prev, ...newBadges]);
        }
    };

    const markModuleComplete = async (pathId, moduleId, xpReward = 100) => {
        // Optimistic update
        setProgress(prev => {
            const pathProgress = prev[pathId] || [];
            if (pathProgress.includes(moduleId)) {
                return prev; // Already completed
            }

            const newProgress = {
                ...prev,
                [pathId]: [...pathProgress, moduleId]
            };

            // Award XP immediately
            setXp(currentXp => currentXp + xpReward);

            // Check achievements
            const userId = user?.uid || user?.publicId;
            checkAchievements(newProgress, xp + xpReward, userId);

            // Sync to Firestore if real user
            if (userId && user.username !== 'admin' && user.username !== 'learner') {
                setIsSyncing(true);
                firestoreCompleteModule(userId, pathId, moduleId, xpReward)
                    .then(() => {
                        console.log('✅ Progress synced to Firestore');
                    })
                    .catch(error => {
                        console.error('❌ Failed to sync to Firestore:', error);
                        // TODO: Add retry logic or queue for later
                    })
                    .finally(() => {
                        setIsSyncing(false);
                    });
            }

            return newProgress;
        });
    };

    const isModuleCompleted = (pathId, moduleId) => {
        return progress[pathId]?.includes(moduleId) || false;
    };

    const isModuleLocked = (pathId, moduleId) => {
        // Admins bypass everything
        if (user?.role === 'admin') return false;

        // Completed modules are never locked
        if (isModuleCompleted(pathId, moduleId)) return false;

        // Check sequence structure
        const path = LEARNING_PATHS.find(p => p.id === pathId);
        if (!path) return true;

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
            unlockedBadges,
            isLoading,
            isSyncing,
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
