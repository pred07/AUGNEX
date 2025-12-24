import { db } from './firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
    increment
} from 'firebase/firestore';

/**
 * Firestore Service Layer
 * Handles all Firestore operations for user progress tracking
 */

/**
 * Get user progress from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>} User progress data or null if not found
 */
export const getUserProgress = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user progress:', error);
        throw error;
    }
};

/**
 * Create initial user document in Firestore
 * @param {string} uid - User ID
 * @param {Object} userData - Initial user data
 * @returns {Promise<void>}
 */
export const createUserDocument = async (uid, userData) => {
    try {
        const userRef = doc(db, 'users', uid);
        const initialData = {
            ...userData,
            createdAt: serverTimestamp(),
            lastActive: serverTimestamp(),
            emailVerified: false,
            progress: {
                completedModules: {},
                unlockedBadges: [],
                unlockedMedals: [],
                xp: 0,
                lastUpdated: serverTimestamp()
            }
        };

        await setDoc(userRef, initialData);
        console.log('✅ User document created in Firestore');
    } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
    }
};

/**
 * Update user's last active timestamp
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export const updateLastActive = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            lastActive: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating last active:', error);
        // Don't throw - this is non-critical
    }
};

/**
 * Complete a module and update progress
 * @param {string} uid - User ID
 * @param {string} pathId - Learning path ID
 * @param {string} moduleId - Module ID
 * @param {number} xpReward - XP to award
 * @returns {Promise<void>}
 */
export const completeModule = async (uid, pathId, moduleId, xpReward = 100) => {
    try {
        const userRef = doc(db, 'users', uid);

        // Use dot notation to update nested field
        const updates = {
            [`progress.completedModules.${pathId}`]: arrayUnion(moduleId),
            'progress.xp': increment(xpReward),
            'progress.lastUpdated': serverTimestamp(),
            lastActive: serverTimestamp()
        };

        await updateDoc(userRef, updates);
        console.log(`✅ Module ${moduleId} completed, +${xpReward} XP`);
    } catch (error) {
        console.error('Error completing module:', error);
        throw error;
    }
};

/**
 * Award a badge to user
 * @param {string} uid - User ID
 * @param {string} badgeId - Badge ID
 * @returns {Promise<void>}
 */
export const awardBadge = async (uid, badgeId) => {
    try {
        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
            'progress.unlockedBadges': arrayUnion(badgeId),
            'progress.lastUpdated': serverTimestamp(),
            lastActive: serverTimestamp()
        });

        console.log(`🎖️ Badge awarded: ${badgeId}`);
    } catch (error) {
        console.error('Error awarding badge:', error);
        throw error;
    }
};

/**
 * Award a medal to user
 * @param {string} uid - User ID
 * @param {string} medalId - Medal ID
 * @returns {Promise<void>}
 */
export const awardMedal = async (uid, medalId) => {
    try {
        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
            'progress.unlockedMedals': arrayUnion(medalId),
            'progress.lastUpdated': serverTimestamp(),
            lastActive: serverTimestamp()
        });

        console.log(`🏅 Medal awarded: ${medalId}`);
    } catch (error) {
        console.error('Error awarding medal:', error);
        throw error;
    }
};

/**
 * Sync local progress data to Firestore (for migration)
 * @param {string} uid - User ID
 * @param {Object} localProgress - Progress data from localStorage
 * @returns {Promise<void>}
 */
export const syncLocalToFirestore = async (uid, localProgress) => {
    try {
        const userRef = doc(db, 'users', uid);

        // Check if user document exists
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            console.warn('User document does not exist, cannot sync');
            return;
        }

        const updates = {
            'progress.completedModules': localProgress.progress || {},
            'progress.xp': localProgress.xp || 0,
            'progress.unlockedBadges': localProgress.unlockedBadges || [],
            'progress.unlockedMedals': localProgress.unlockedMedals || [],
            'progress.lastUpdated': serverTimestamp(),
            lastActive: serverTimestamp()
        };

        await updateDoc(userRef, updates);
        console.log('✅ Local progress synced to Firestore');
    } catch (error) {
        console.error('Error syncing to Firestore:', error);
        throw error;
    }
};

/**
 * Update user profile information
 * @param {string} uid - User ID
 * @param {Object} updates - Profile updates
 * @returns {Promise<void>}
 */
export const updateUserProfile = async (uid, updates) => {
    try {
        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
            ...updates,
            lastActive: serverTimestamp()
        });

        console.log('✅ Profile updated');
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};
