import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        return new Promise((resolve, reject) => {
            // Fake network delay for realism
            setTimeout(() => {
                if (username === 'admin' && password === 'admin') {
                    const userData = {
                        username: 'admin',
                        rank: 'Neophyte',
                        xp: 1250,
                        streak: 3,
                        modulesCompleted: 4,
                        avatar: 'https://ui-avatars.com/api/?name=Admin&background=00ff9d&color=0a0e1a'
                    };
                    setUser(userData);
                    localStorage.setItem('user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials. Access Denied.'));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
