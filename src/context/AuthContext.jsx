import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    onAuthStateChanged,
    signOut,
    updatePassword
} from 'firebase/auth';
import { createUserDocument, getUserProgress, getEmailFromUsername } from '../lib/firestoreService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch additional data from Firestore
                    let firestoreData = null;
                    try {
                        firestoreData = await getUserProgress(firebaseUser.uid);
                    } catch (err) {
                        console.warn('Firestore fetch failed:', err);
                    }

                    // Deduct Session Cost (1 coin)
                    try {
                        const { deductSessionCost } = await import('../lib/firestoreService');
                        const newBalance = await deductSessionCost(firebaseUser.uid);
                        if (firestoreData) firestoreData.walletBalance = newBalance; // Update local state immediately
                    } catch (e) {
                        console.error("Session cost error", e);
                    }

                    if (mounted) {
                        const userData = {
                            uid: firebaseUser.uid,
                            username: firestoreData?.username || firebaseUser.displayName || firebaseUser.email.split('@')[0],
                            role: (firebaseUser.email === 'admin@nytvnt.dev') ? 'admin' : (firestoreData?.role || 'learner'),
                            rank: firestoreData?.rank || 'Neophyte',
                            xp: firestoreData?.progress?.xp || 0,
                            publicId: firebaseUser.uid.slice(0, 8).toUpperCase(),
                            avatar: firebaseUser.photoURL || `https://api.dicebear.com/9.x/dylan/svg?seed=${firebaseUser.email}`,
                            socials: firestoreData?.socials || { twitter: '', linkedin: '', website: '' },
                            lastUsernameChange: firestoreData?.lastUsernameChange || null,
                            authProvider: firebaseUser.providerData[0]?.providerId || 'email',
                            email: firebaseUser.email,
                            emailVerified: firebaseUser.emailVerified
                        };
                        setUser(userData);
                    }
                } catch (error) {
                    console.error("Error setting user context:", error);
                    // Don't clear user here, just might have partial data
                }
                if (mounted) setUser(null);
            }
            if (mounted) setIsLoading(false);
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const login = async (usernameOrEmail, password) => {
        // 2. Try Firebase Auth (Real Users)
        try {
            let emailToUse = usernameOrEmail;

            // If it doesn't look like an email, try to find the email by username
            if (!usernameOrEmail.includes('@')) {
                const foundEmail = await getEmailFromUsername(usernameOrEmail);
                if (foundEmail) {
                    emailToUse = foundEmail;
                } else {
                    throw new Error("User not found via username lookup.");
                }
            }

            await signInWithEmailAndPassword(auth, emailToUse, password);
            // Listener will handle state update
        } catch (error) {
            console.error("Login Error:", error);
            throw new Error(error.message);
        }
    };
    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username
            });

            // Create Firestore user document
            const userData = {
                uid: user.uid,
                username: username,
                role: 'learner',
                rank: 'Neophyte',
                xp: 0,
                publicId: user.uid.slice(0, 8).toUpperCase(),
                avatar: `https://api.dicebear.com/9.x/dylan/svg?seed=${email}`,
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
                authProvider: 'email',
                email: email,
                emailVerified: user.emailVerified
            };

            await createUserDocument(user.uid, userData);

            // Send verification email
            try {
                await sendEmailVerification(user);
            } catch (ignored) { }

            // Listener will handle state update
            return userData;
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check existence and create doc if needed
            const firestoreData = await getUserProgress(user.uid);
            if (!firestoreData) {
                const userData = {
                    uid: user.uid,
                    username: user.displayName || user.email.split('@')[0],
                    role: 'learner',
                    rank: 'Neophyte',
                    xp: 0,
                    publicId: user.uid.slice(0, 8).toUpperCase(),
                    avatar: user.photoURL || `https://api.dicebear.com/9.x/dylan/svg?seed=${user.email}`,
                    email: user.email,
                };
                await createUserDocument(user.uid, userData);
            }
            // Listener handles state
        } catch (error) {
            console.error("Firebase Login Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        localStorage.removeItem('user'); // Clear mock
        setUser(null);
        await signOut(auth);
    };

    const updateUserProfile = (userId, updates) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                setUser(prev => {
                    if (!prev) return null;
                    const newUser = { ...prev, ...updates };

                    // Validate username change limit
                    if (updates.username && updates.username !== prev.username) {
                        const now = new Date();
                        const lastChange = prev.lastUsernameChange ? new Date(prev.lastUsernameChange) : null;

                        if (lastChange) {
                            const oneMonthAgo = new Date();
                            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                            if (lastChange > oneMonthAgo) {
                                reject(new Error("Username can only be changed once per month."));
                                return prev;
                            }
                        }
                        newUser.lastUsernameChange = now.toISOString();
                    }



                    resolve(newUser);
                    return newUser;
                });
            }, 500);
        });
    };

    const changeUserPassword = async (newPassword) => {
        if (!auth.currentUser) throw new Error("No authenticated user.");
        try {
            await updatePassword(auth.currentUser, newPassword);
            return true;
        } catch (error) {
            console.error("Password Update Error:", error);
            // Re-authentication/recent-login might be required by Firebase
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, updateUserProfile, changeUserPassword, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
