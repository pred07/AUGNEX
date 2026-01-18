/**
 * localStorage Service
 * Handles all user data storage in browser localStorage
 * Replaces Firestore for user data to eliminate quota issues
 */

const STORAGE_KEYS = {
    USER: 'nytvnt_user',
    PROGRESS: 'nytvnt_progress',
    WALLET: 'nytvnt_wallet'
};

/**
 * Save user profile data
 */
export const saveUserData = (user) => {
    try {
        const userData = {
            uid: user.uid,
            email: user.email,
            username: user.displayName || user.email?.split('@')[0] || 'User',
            avatar: user.photoURL || `https://api.dicebear.com/9.x/dylan/svg?seed=${user.email}`,
            role: user.role || 'learner',
            publicId: user.publicId || generatePublicId(),
            socials: user.socials || { twitter: '', linkedin: '', website: '' },
            authProvider: user.providerData?.[0]?.providerId || 'unknown',
            createdAt: user.createdAt || new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Error saving user data:', error);
        return null;
    }
};

/**
 * Get user profile data
 */
export const getUserData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.USER);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = (updates) => {
    try {
        const currentUser = getUserData();
        if (!currentUser) return null;

        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
        return updatedUser;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
};

/**
 * Initialize progress data
 */
const initializeProgress = () => ({
    completedModules: {},
    xp: 0,
    unlockedBadges: [],
    unlockedMedals: [],
    purchasedModules: [],
    currentRank: 'NEOPHYTE'
});

/**
 * Get user progress
 */
export const getProgress = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        return data ? JSON.parse(data) : initializeProgress();
    } catch (error) {
        console.error('Error getting progress:', error);
        return initializeProgress();
    }
};

/**
 * Complete a module
 */
export const completeModule = (pathId, moduleId, xpReward = 100) => {
    try {
        const progress = getProgress();

        // Initialize path if not exists
        if (!progress.completedModules[pathId]) {
            progress.completedModules[pathId] = [];
        }

        // Add module if not already completed
        if (!progress.completedModules[pathId].includes(moduleId)) {
            progress.completedModules[pathId].push(moduleId);
            progress.xp += xpReward;
        }

        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
        return progress;
    } catch (error) {
        console.error('Error completing module:', error);
        return null;
    }
};

/**
 * Unlock a badge
 */
export const unlockBadge = (badgeId) => {
    try {
        const progress = getProgress();

        if (!progress.unlockedBadges.includes(badgeId)) {
            progress.unlockedBadges.push(badgeId);
        }

        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
        return progress;
    } catch (error) {
        console.error('Error unlocking badge:', error);
        return null;
    }
};

/**
 * Unlock a medal
 */
export const unlockMedal = (medalId) => {
    try {
        const progress = getProgress();

        if (!progress.unlockedMedals.includes(medalId)) {
            progress.unlockedMedals.push(medalId);
        }

        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
        return progress;
    } catch (error) {
        console.error('Error unlocking medal:', error);
        return null;
    }
};

/**
 * Initialize wallet data
 */
const initializeWallet = () => ({
    balance: 0,
    transactions: []
});

/**
 * Get wallet data
 */
export const getWallet = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WALLET);
        return data ? JSON.parse(data) : initializeWallet();
    } catch (error) {
        console.error('Error getting wallet:', error);
        return initializeWallet();
    }
};

/**
 * Update wallet balance
 */
export const updateWallet = (amount, reason = 'manual') => {
    try {
        const wallet = getWallet();
        const newBalance = wallet.balance + amount;

        if (newBalance < 0) {
            throw new Error('Insufficient balance');
        }

        wallet.balance = newBalance;
        wallet.transactions.push({
            amount,
            reason,
            timestamp: new Date().toISOString(),
            newBalance
        });

        localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(wallet));
        return wallet;
    } catch (error) {
        console.error('Error updating wallet:', error);
        throw error;
    }
};

/**
 * Purchase a module
 */
export const purchaseModule = (pathId, moduleId) => {
    try {
        const progress = getProgress();
        const wallet = getWallet();

        // Check if already purchased
        const purchaseKey = `${pathId}/${moduleId}`;
        if (progress.purchasedModules.includes(purchaseKey)) {
            return { success: true, message: 'Already purchased' };
        }

        // Check balance
        if (wallet.balance < 1) {
            return { success: false, message: 'Insufficient coins' };
        }

        // Deduct coin
        updateWallet(-1, `Unlock module: ${moduleId}`);

        // Add to purchased modules
        progress.purchasedModules.push(purchaseKey);
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));

        return { success: true, message: 'Module unlocked!' };
    } catch (error) {
        console.error('Error purchasing module:', error);
        return { success: false, message: error.message };
    }
};

/**
 * Clear all user data (on logout)
 */
export const clearUserData = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.WALLET);
        return true;
    } catch (error) {
        console.error('Error clearing user data:', error);
        return false;
    }
};

/**
 * Export user data for backup
 */
export const exportUserData = () => {
    try {
        return {
            user: getUserData(),
            progress: getProgress(),
            wallet: getWallet(),
            exportedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error exporting user data:', error);
        return null;
    }
};

/**
 * Import user data from backup
 */
export const importUserData = (data) => {
    try {
        if (data.user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        }
        if (data.progress) {
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
        }
        if (data.wallet) {
            localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(data.wallet));
        }
        return true;
    } catch (error) {
        console.error('Error importing user data:', error);
        return false;
    }
};

/**
 * Generate a unique public ID for user profiles
 */
const generatePublicId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'AG-';
    for (let i = 0; i < 4; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};
