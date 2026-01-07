import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import Button from '../components/ui/Button';

const Bootstrap = () => {
    const { user } = useAuth();
    const [targetEmail, setTargetEmail] = useState('');
    const [status, setStatus] = useState('');

    const promoteSelf = async () => {
        if (!user) return setStatus('Not logged in');
        setStatus('Promoting self...');
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { role: 'admin' });
            setStatus('Success! You are now an admin. Refresh the page.');
        } catch (error) {
            console.error(error);
            setStatus('Error: ' + error.message);
        }
    };

    const promoteOther = async () => {
        if (!targetEmail) return;
        setStatus(`Looking for ${targetEmail}...`);
        try {
            const q = query(collection(db, 'users'), where('email', '==', targetEmail));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setStatus('User not found.');
                return;
            }

            const targetDoc = snapshot.docs[0];
            await updateDoc(targetDoc.ref, { role: 'admin' });
            setStatus(`Success! ${targetEmail} is now an admin.`);
        } catch (error) {
            console.error(error);
            setStatus('Error: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-20 flex flex-col gap-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-red-500">SYSTEM BOOTSTRAP</h1>

            <div className="border border-white/20 p-6 rounded">
                <h2 className="text-xl mb-4">1. Promote Self ({user?.email})</h2>
                <Button onClick={promoteSelf}>Promote Me to Admin</Button>
            </div>

            <div className="border border-white/20 p-6 rounded">
                <h2 className="text-xl mb-4">2. Promote Other User</h2>
                <input
                    className="w-full bg-black border border-white/20 p-2 mb-4 text-white"
                    placeholder="Enter target email"
                    value={targetEmail}
                    onChange={e => setTargetEmail(e.target.value)}
                />
                <Button onClick={promoteOther}>Promote User</Button>
            </div>

            <div className="p-4 bg-gray-900 font-mono text-green-400">
                {status}
            </div>
        </div>
    );
};

export default Bootstrap;
