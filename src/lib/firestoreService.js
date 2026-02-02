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

export const promoteUserToAdmin = async (targetUid) => {
    try {
        const userRef = doc(db, 'users', targetUid);
        await updateDoc(userRef, {
            role: 'admin',
            lastActive: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error promoting user:', error);
        return false;
    }
};

export const demoteAdminToLearner = async (targetUid) => {
    try {
        const userRef = doc(db, 'users', targetUid);
        await updateDoc(userRef, {
            role: 'learner',
            lastActive: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error demoting admin:', error);
        return false;
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

// [UPDATED] Deduct Coin with Dynamic Amount
export const deductCoin = async (uid, pathId, moduleId, cost = 1) => {
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
            if (balance < cost) {
                throw new Error("Insufficient Funds");
            }

            // 3. Deduct & Unlock
            transaction.update(userRef, {
                walletBalance: balance - cost,
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
 * Complete a module and update progress
 * @param {string} uid - User ID
 * @param {string} pathId - Learning path ID
 * @param {string} moduleId - Module ID
 * @param {number} xpReward - XP to award
 * @param {number} coinReward - Coins to award [NEW]
 * @returns {Promise<void>}
 */
export const completeModule = async (uid, pathId, moduleId, xpReward = 100, coinReward = 0) => {
    try {
        const userRef = doc(db, 'users', uid);
        const updates = {
            [`progress.completedModules.${pathId}`]: arrayUnion(moduleId),
            'progress.xp': increment(xpReward),
            'progress.lastUpdated': serverTimestamp(),
            lastActive: serverTimestamp()
        };

        // Add coin reward if applicable
        if (coinReward > 0) {
            updates['walletBalance'] = increment(coinReward);
        }

        await updateDoc(userRef, updates);
        console.log(`✅ Module ${moduleId} completed, +${xpReward} XP, +${coinReward} Coins`);
    } catch (error) {
        console.error('Error completing module:', error);
        throw error;
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
// [ADMIN] Create a new coupon
export const createCoupon = async (code, amount) => {
    try {
        if (!code || !amount) {
            console.error("Invalid coupon data");
            return false;
        }
        const cleanCode = code.toUpperCase().trim();
        if (cleanCode.length === 0) return false;

        const couponRef = doc(db, 'coupons', cleanCode);

        // Check if exists
        const snap = await getDoc(couponRef);
        if (snap.exists()) {
            return false; // Already exists
        }

        await setDoc(couponRef, {
            code: cleanCode,
            amount: parseInt(amount),
            createdAt: serverTimestamp(),
            usedBy: []
        });
        return true;
    } catch (error) {
        console.error("Error creating coupon:", error);
        return false;
    }
};

/**
 * Redeem a coupon
 * @param {string} userId - User ID
 * @param {string} code - Coupon Code
 * @returns {Promise<{success: boolean, message: string, amount?: number}>}
 */
export const redeemCoupon = async (userId, code) => {
    try {
        const cleanCode = code.toUpperCase().trim();
        const couponRef = doc(db, 'coupons', cleanCode);
        const userRef = doc(db, 'users', userId);

        return await runTransaction(db, async (transaction) => {
            const couponDoc = await transaction.get(couponRef);
            if (!couponDoc.exists()) {
                return { success: false, message: "Invalid coupon code." };
            }

            const couponData = couponDoc.data();
            if (couponData.usedBy && couponData.usedBy.includes(userId)) {
                return { success: false, message: "You have already used this coupon." };
            }

            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) throw "User not found";

            const currentBalance = userDoc.data().walletBalance || 0;
            const newBalance = currentBalance + couponData.amount;

            // Update user wallet
            transaction.update(userRef, { walletBalance: newBalance });

            // Update coupon usage
            transaction.update(couponRef, {
                usedBy: [...(couponData.usedBy || []), userId]
            });

            return { success: true, message: `Successfully redeemed ${couponData.amount} coins!`, amount: couponData.amount };
        });

    } catch (error) {
        console.error("Coupon redemption failed:", error);
        return { success: false, message: "Transaction failed. Please try again." };
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
