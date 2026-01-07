import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
    getWalletBalance,
    rechargeWallet,
    deductCoin
} from '../lib/firestoreService';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    const { user } = useAuth();
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        let mounted = true;
        const fetchBalance = async () => {
            if (!user) {
                if (mounted) {
                    setBalance(0);
                    setIsLoading(false);
                }
                return;
            }

            // Mock users
            if (user.username === 'admin' || user.username === 'learner') {
                const storedBalance = localStorage.getItem('nytvnt_wallet_balance');
                if (mounted) {
                    setBalance(storedBalance ? parseInt(storedBalance, 10) : (user.username === 'admin' ? 9999 : 5));
                    setIsLoading(false);
                }
                return;
            }

            // Real users
            try {
                const bal = await getWalletBalance(user.uid);
                if (mounted) setBalance(bal);
            } catch (err) {
                console.error("Failed to fetch wallet balance", err);
                if (mounted) setBalance(0);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        fetchBalance();
        return () => { mounted = false; };
    }, [user]);

    // Mock/Local Persist for Demo
    useEffect(() => {
        if ((user?.username === 'admin' || user?.username === 'learner') && !isLoading) {
            localStorage.setItem('nytvnt_wallet_balance', balance.toString());
        }
    }, [balance, user, isLoading]);

    const recharge = async (amount = 80) => {
        setIsProcessing(true);
        try {
            // Mock
            if (user?.username === 'admin' || user?.username === 'learner') {
                setBalance(prev => prev + amount);
                await new Promise(r => setTimeout(r, 500)); // Fake network
                return true;
            }

            // Real
            const newBal = await rechargeWallet(user.uid, amount);
            setBalance(newBal);
            console.log(`✅ Wallet recharged: +${amount} Coins`);
            return true;
        } catch (error) {
            console.error("Recharge failed:", error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Spending a coin to unlock a module
     * @param {string} pathId 
     * @param {string} moduleId 
     * @returns {Promise<boolean>} success
     */
    const unlockModule = async (pathId, moduleId) => {
        if (balance < 1) {
            console.warn("Insufficient funds");
            return false;
        }

        setIsProcessing(true);
        try {
            // Mock
            if (user?.username === 'admin' || user?.username === 'learner') {
                setBalance(prev => prev - 1);
                await new Promise(r => setTimeout(r, 500));
                return true;
            }

            // Real
            const success = await deductCoin(user.uid, pathId, moduleId);
            if (success === true) {
                // Fetch new balance to be sure, or decrement optimistically
                const newBal = await getWalletBalance(user.uid);
                setBalance(newBal);
            }
            return success;
        } catch (error) {
            console.error("Unlock failed:", error);
            return false;
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <WalletContext.Provider value={{
            balance,
            isLoading,
            isProcessing,
            recharge,
            unlockModule
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
