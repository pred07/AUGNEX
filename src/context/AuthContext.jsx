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

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get user data from localStorage
                let userData = localStorageService.getUserData();

                // If no data in localStorage, create new user profile
                if (!userData || userData.uid !== firebaseUser.uid) {
                    userData = localStorageService.saveUserData({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName,
                        photoURL: firebaseUser.photoURL,
                        providerData: firebaseUser.providerData,
                        role: firebaseUser.email === 'admin@nytvnt.dev' ? 'admin' : 'learner'
                    });
                }

                if (mounted) {
                    setUser(userData);
                    setIsLoading(false);
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
