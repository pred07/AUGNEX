import { db } from './firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
    increment,
    runTransaction,
    collection,
    getDocs,
    deleteDoc,
    query,
    where,
    limit
} from 'firebase/firestore';

/**
 * Firestore Service Layer
 * Handles all Firestore operations for user progress tracking and wallet
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
            walletBalance: 20, // Sign-up bonus (Updated per requirements)
            progress: {
                completedModules: {},
                purchasedModules: [], // Track unlocked modules
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
        // console.error('Error updating last active:', error);
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
 * Update user's last accessed module
 * @param {string} uid - User ID
 * @param {Object} moduleData - { pathId, moduleId, timestamp }
 * @returns {Promise<void>}
 */
export const updateLastAccessedModule = async (uid, moduleData) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            'progress.lastAccessedModule': moduleData,
            lastActive: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating last accessed module:', error);
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

/**
 * Update user role (Admin only via rules)
 * @param {string} uid - User ID
 * @param {string} newRole - New role ('admin' or 'learner')
 * @returns {Promise<boolean>}
 */
export const updateUserRole = async (uid, newRole) => {
    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            role: newRole,
            lastActive: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating role:', error);
        return false;
    }
};

// --- WALLET FUNCTIONS ---

export const getWalletBalance = async (uid) => {
    try {
        const userRef = doc(db, 'users', uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
            return snap.data().walletBalance || 0;
        }
        return 0;
    } catch (error) {
        console.error("Error getting balance", error);
        return 0;
    }
};

export const rechargeWallet = async (uid, amount = 80) => {
    try {
        const userRef = doc(db, 'users', uid);
        await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(userRef);
            if (!sfDoc.exists()) throw "User does not exist!";

            const newBalance = (sfDoc.data().walletBalance || 0) + amount;
            transaction.update(userRef, { walletBalance: newBalance });
        });
        return await getWalletBalance(uid); // Return new balance
    } catch (error) {
        console.error("Recharge failed", error);
        throw error;
    }
};

export const deductCoin = async (uid, pathId, moduleId) => {
    const userRef = doc(db, 'users', uid);
    try {
        return await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(userRef);
            if (!sfDoc.exists()) throw "User does not exist!";

            const data = sfDoc.data();
            const balance = data.walletBalance || 0;
            const purchased = data.progress?.purchasedModules || [];

            // 1. Check if already purchased
            if (purchased.includes(moduleId)) {
                return true; // Already unlocked
            }

            // 2. Check Balance
            if (balance < 1) {
                throw new Error("Insufficient Funds");
            }

            // 3. Deduct & Unlock
            transaction.update(userRef, {
                walletBalance: balance - 1,
                'progress.purchasedModules': arrayUnion(moduleId)
            });

            return true;
        });
    } catch (error) {
        console.error("Transaction failed: ", error);
        return false;
    }
};

/**
 * Get email from username for login
 * @param {string} username 
 * @returns {Promise<string|null>} Email or null if not found
 */
export const getEmailFromUsername = async (username) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("username", "==", username), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data().email;
        }
        return null;
    } catch (error) {
        console.error("Error finding user by username:", error);
        return null;
    }
};

/**
 * Deduct 1 coin for session cost (login/refresh)
 * @param {string} uid - User ID
 * @returns {Promise<number|null>} New balance or null if failed
 */
export const deductSessionCost = async (uid) => {
    const userRef = doc(db, 'users', uid);
    try {
        return await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(userRef);
            if (!sfDoc.exists()) throw "User does not exist!";

            const currentBalance = sfDoc.data().walletBalance || 0;

            // Only deduct if they have coins
            if (currentBalance > 0) {
                const newBalance = currentBalance - 1;
                transaction.update(userRef, { walletBalance: newBalance });
                return newBalance;
            }
            return currentBalance; // No deduction if 0
        });
    } catch (error) {
        console.error("Session deduction failed:", error);
        return null;
    }
};

// [ADMIN] Get All Users
export const getAllUsers = async () => {
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// [ADMIN] Add Coins to User
export const adminAddCoins = async (targetUid, amount) => {
    try {
        const userRef = doc(db, 'users', targetUid);

        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) {
                throw new Error("User does not exist!");
            }

            const currentBalance = userDoc.data().walletBalance || 0;
            const newBalance = currentBalance + parseInt(amount);

            transaction.update(userRef, {
                walletBalance: newBalance
            });
        });
        return true;
    } catch (error) {
        console.error('Error adding coins:', error);
        return false;
    }
}


// --- COUPON SYSTEM ---

/**
 * Create a new coupon
 * @param {string} code - Coupon code (will be uppercased)
 * @param {number} amount - Coin amount
 * @returns {Promise<boolean>}
 */
export const createCoupon = async (code, amount) => {
    try {
        const cleanCode = code.toUpperCase().trim();
        const couponRef = doc(db, 'coupons', cleanCode);
        await setDoc(couponRef, {
            code: cleanCode,
            amount: parseInt(amount),
            createdAt: serverTimestamp(),
            usedBy: [] // Track UIDs who claimed it
        });
        return true;
    } catch (error) {
        console.error("Error creating coupon:", error);
        return false;
    }
};

/**
 * Get all coupons
 * @returns {Promise<Array>} List of coupons
 */
export const getCoupons = async () => {
    try {
        const q = query(collection(db, 'coupons'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return [];
    }
};

/**
 * Delete a coupon
 * @param {string} code 
 */
export const deleteCoupon = async (code) => {
    try {
        await deleteDoc(doc(db, 'coupons', code));
        return true;
    } catch (error) {
        console.error("Error deleting coupon", error);
        return false;
    }
};

/**
 * Redeem a coupon
 * @param {string} uid - User ID
 * @param {string} code - Coupon Code
 * @returns {Promise<{success: boolean, message: string, amount?: number}>}
 */
export const redeemCoupon = async (uid, code) => {
    const cleanCode = code.toUpperCase().trim();
    const couponRef = doc(db, 'coupons', cleanCode);
    const userRef = doc(db, 'users', uid);

    try {
        return await runTransaction(db, async (transaction) => {
            const couponSnap = await transaction.get(couponRef);
            if (!couponSnap.exists()) {
                throw "Invalid coupon code.";
            }

            const couponData = couponSnap.data();
            const usedBy = couponData.usedBy || [];

            if (usedBy.includes(uid)) {
                throw "You have already redeemed this coupon.";
            }

            // Award coins
            const userSnap = await transaction.get(userRef);
            if (!userSnap.exists()) throw "User not found.";

            const currentBalance = userSnap.data().walletBalance || 0;
            const newBalance = currentBalance + couponData.amount;

            // Updates
            transaction.update(userRef, { walletBalance: newBalance });
            transaction.update(couponRef, { usedBy: arrayUnion(uid) });

            return { success: true, message: `Redeemed ${couponData.amount} coins!`, amount: couponData.amount };
        });
    } catch (error) {
        let msg = "Redemption failed";
        if (typeof error === 'string') msg = error;
        console.error("Redeem error:", error);
        return { success: false, message: msg };
    }
};
