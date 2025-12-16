import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user session:", error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (usernameOrEmail, password) => {
        // 1. Try Mock Credentials (legacy/demo)
        if (usernameOrEmail === 'admin' && password === 'admin') {
            const userData = {
                username: 'admin',
                role: 'admin',
                rank: 'Architect',
                xp: 99999,
                publicId: 'AG-88X1',
                avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=admin',
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        }

        if (usernameOrEmail === 'learner' && password === 'learner') {
            const userData = {
                username: 'learner',
                role: 'learner',
                rank: 'Neophyte',
                xp: 0,
                publicId: 'AG-22B9',
                avatar: 'https://api.dicebear.com/9.x/dylan/svg?seed=learner',
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        }

        // 2. Try Firebase Auth (Real Users)
        try {
            // Note: Firebase requires EMAIL. If the user entered a username here that isn't an email, this will fail.
            // For now, we assume 'Identity' field contains an email for real users.
            const userCredential = await signInWithEmailAndPassword(auth, usernameOrEmail, password);
            const user = userCredential.user;

            const userData = {
                username: user.displayName || user.email.split('@')[0],
                role: 'learner',
                rank: 'Neophyte',
                xp: 0,
                publicId: user.uid.slice(0, 8).toUpperCase(),
                avatar: user.photoURL || `https://api.dicebear.com/9.x/dylan/svg?seed=${user.email}`,
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
                authProvider: 'email',
                email: user.email
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
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

            const userData = {
                username: username,
                role: 'learner',
                rank: 'Neophyte',
                xp: 0,
                publicId: user.uid.slice(0, 8).toUpperCase(),
                avatar: `https://api.dicebear.com/9.x/dylan/svg?seed=${email}`,
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
                authProvider: 'email',
                email: email
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
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

            // Map Firebase user to App user structure
            const userData = {
                username: user.displayName || user.email.split('@')[0], // Fallback if no display name
                role: 'learner', // Default role for new users
                rank: 'Neophyte',
                xp: 0,
                publicId: user.uid.slice(0, 8).toUpperCase(), // Generate a short ID from UID
                avatar: user.photoURL || `https://api.dicebear.com/9.x/dylan/svg?seed=${user.email}`,
                socials: { twitter: '', linkedin: '', website: '' },
                lastUsernameChange: null,
                authProvider: 'google',
                email: user.email // Store email for real users
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error("Firebase Login Error:", error);
            throw error; // Propagate error to UI
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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

                    localStorage.setItem('user', JSON.stringify(newUser));
                    resolve(newUser);
                    return newUser;
                });
            }, 500);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, updateUserProfile, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
