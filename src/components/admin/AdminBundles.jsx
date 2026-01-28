import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Edit2, Save, X, Plus } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const AdminBundles = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPlan, setEditingPlan] = useState(null);

    // Default structure if DB is empty
    const defaultPlans = [
        { id: 'starter', name: 'Starter Agent', price: '$19', coins: '500', features: ['Access to Basic Modules'] },
        { id: 'pro', name: 'Elite Operative', price: '$49', coins: '1500', features: ['All Modules Unlocked'] },
        { id: 'enterprise', name: 'Cyber Warlord', price: '$99', coins: '3500', features: ['Lifetime Access'] }
    ];

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'bundles'));
            if (!querySnapshot.empty) {
                const dbPlans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPlans(dbPlans.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', ''))));
            } else {
                setPlans(defaultPlans);
            }
        } catch (error) {
            console.error("Error loading plans:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const planRef = doc(db, 'bundles', editingPlan.id);
            await setDoc(planRef, editingPlan);
            alert("Plan updated successfully!");
            setEditingPlan(null);
            loadPlans();
        } catch (error) {
            console.error("Error saving plan:", error);
            alert("Failed to save plan");
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-bold font-orbitron text-white">Pricing Plans Manager</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? <p>Loading...</p> : plans.map((plan) => (
                    <div key={plan.id} className="bg-surface/20 border border-white/10 rounded-xl p-6 relative group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                            <button
                                onClick={() => setEditingPlan(plan)}
                                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-primary transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                        </div>

                        <div className="space-y-2 font-mono text-sm text-gray-300">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Price:</span>
                                <span className="text-white font-bold">{plan.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Coins:</span>
                                <span className="text-yellow-400 font-bold">{plan.coins}</span>
                            </div>
                            <div className="pt-2 border-t border-white/5">
                                <span className="text-gray-500 block mb-1">Features:</span>
                                <ul className="list-disc list-inside text-xs space-y-1">
                                    {plan.features?.slice(0, 3).map((f, i) => (
                                        <li key={i}>{f}</li>
                                    ))}
                                    {(plan.features?.length > 3) && <li>...</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingPlan && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-xl p-8 max-w-lg w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold font-orbitron">Edit: {editingPlan.name}</h3>
                            <button onClick={() => setEditingPlan(null)}><X className="text-gray-500 hover:text-white" /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-1">Plan Name</label>
                                <input
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                    value={editingPlan.name}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 mb-1">Price</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                        value={editingPlan.price}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 mb-1">Coins</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                        value={editingPlan.coins}
                                        onChange={(e) => setEditingPlan({ ...editingPlan, coins: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-1">Features (comma separated)</label>
                                <textarea
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-white h-24"
                                    value={editingPlan.features?.join(', ')}
                                    onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split(',').map(s => s.trim()) })}
                                />
                            </div>

                            <Button type="submit" className="w-full mt-4">
                                <Save className="mr-2" size={16} /> Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBundles;
