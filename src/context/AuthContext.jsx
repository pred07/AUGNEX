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
import * as localStorageService from '../lib/localStorageService';
import { getUserProgress, createUserDocument } from '../lib/firestoreService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // 1. Check/Create Firestore Document (Self-healing context)
                    // We import these from lib/firestoreService which must be added to imports
                    let firestoreUser = await getUserProgress(firebaseUser.uid);

                    if (!firestoreUser) {
                        console.log("Creating missing Firestore document for:", firebaseUser.email);
                        await createUserDocument(firebaseUser.uid, {
                            email: firebaseUser.email,
                            username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                            photoURL: firebaseUser.photoURL,
                            role: firebaseUser.email === 'admin@nytvnt.dev' ? 'admin' : 'learner'
                        });
                        // Fetch again after creation to have the full object (wallet, etc)
                        firestoreUser = await getUserProgress(firebaseUser.uid);
                    }

                    // 2. Sync LocalStorage
                    const userData = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL,
                        providerData: firebaseUser.providerData,
                        role: firestoreUser?.role || (firebaseUser.email === 'admin@nytvnt.dev' ? 'admin' : 'learner'),
                        walletBalance: firestoreUser?.walletBalance || 0
                    };

                    localStorageService.saveUserData(userData);

                    if (mounted) {
                        setUser(userData);
                        setIsLoading(false);
                    }

                } catch (err) {
                    console.error("Auth State Sync Error:", err);
                    // Fallback to minimal auth if Firestore fails
                    if (mounted) {
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                        setIsLoading(false);
                    }
                }
            } else {
                if (mounted) {
                    setUser(null);
                    setIsLoading(false);
                }
            }
        });

        return () => {
            mounted = false;
            unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        try {
            // Verify credentials
            await signInWithEmailAndPassword(auth, email, password);
            // Auth listener will handle state update
        } catch (error) {
            console.error("Login Error:", error);
            throw new Error(error.message);
        }
    };

    const register = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update Firebase Auth profile
            await updateProfile(userCredential.user, {
                displayName: username
            });

            // Send verification email
            await sendEmailVerification(userCredential.user);

            // Save to localStorage
            localStorageService.saveUserData({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: username,
                photoURL: userCredential.user.photoURL,
                providerData: userCredential.user.providerData,
                role: 'learner'
            });

            return userCredential.user;
        } catch (error) {
            console.error("Registration Error:", error);
            throw new Error(error.message);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            // Save to localStorage
            localStorageService.saveUserData({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                providerData: result.user.providerData,
                role: result.user.email === 'admin@nytvnt.dev' ? 'admin' : 'learner'
            });

            return result.user;
        } catch (error) {
            console.error("Google Login Error:", error);
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            localStorageService.clearUserData();
        } catch (error) {
            console.error("Logout Error:", error);
            throw new Error(error.message);
        }
    };

    const updateUserProfile = async (userId, updates) => {
        try {
            // Update localStorage
            const updatedUser = localStorageService.updateUserProfile(updates);

            // Update local state
            setUser(updatedUser);

            return updatedUser;
        } catch (error) {
            console.error("Update Profile Error:", error);
            throw new Error(error.message);
        }
    };

    const changeUserPassword = async (newPassword) => {
        try {
            if (!auth.currentUser) {
                throw new Error("No user logged in");
            }

            await updatePassword(auth.currentUser, newPassword);
            return { success: true };
        } catch (error) {
            console.error("Change Password Error:", error);
            throw error;
        }
    };

    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        logout,
        updateUserProfile,
        changeUserPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
