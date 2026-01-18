import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Check, Package } from 'lucide-react';

export default function AdminBundles() {
    const [bundles, setBundles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ name: '', coins: 100, price: 5, currency: 'USD' });

    useEffect(() => {
        const q = query(collection(db, 'coin_bundles'), orderBy('price', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBundles(items);
            setLoading(false);
        }, (error) => {
            console.error("Failed to subscribe to bundles:", error);
            setLoading(false);
            // Don't set mock data for admin, just show empty or error state
        });
        return () => unsubscribe();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'coin_bundles'), {
                ...formData,
                price: Number(formData.price),
                coins: Number(formData.coins)
            });
            setIsCreating(false);
            setFormData({ name: '', coins: 100, price: 5, currency: 'USD' });
        } catch (error) {
            console.error("Error creating bundle:", error);
            alert("Failed to create bundle");
        }
    };

    const handleUpdate = async (id) => {
        try {
            await updateDoc(doc(db, 'coin_bundles', id), {
                ...formData,
                price: Number(formData.price),
                coins: Number(formData.coins)
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating bundle:", error);
            alert("Failed to update bundle");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this bundle?")) return;
        try {
            await deleteDoc(doc(db, 'coin_bundles', id));
        } catch (error) {
            console.error("Error deleting bundle:", error);
        }
    };

    const startEdit = (bundle) => {
        setEditingId(bundle.id);
        setFormData({ ...bundle });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Coin Bundles</h3>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                >
                    <Plus size={18} /> Add Bundle
                </button>
            </div>

            {isCreating && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
                                placeholder="e.g. Starter Pack"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Coins</label>
                            <input
                                type="number"
                                value={formData.coins}
                                onChange={e => setFormData({ ...formData, coins: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Price ($)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700">Save</button>
                            <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bundles.map(bundle => (
                    <div key={bundle.id} className="bg-white/5 rounded-xl border border-white/10 p-4 relative group">
                        {editingId === bundle.id ? (
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={formData.coins}
                                        onChange={e => setFormData({ ...formData, coins: e.target.value })}
                                        className="w-1/2 bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white"
                                    />
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-1/2 bg-black/40 border border-white/10 rounded px-2 py-1 text-sm text-white"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => handleUpdate(bundle.id)} className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">
                                        <Check size={16} />
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{bundle.name}</h4>
                                            <p className="text-sm text-gray-400">{bundle.coins} Coins</p>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-white">${bundle.price}</span>
                                </div>

                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(bundle)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(bundle.id)} className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {!loading && bundles.length === 0 && !isCreating && (
                    <div className="col-span-full text-center py-8 text-gray-400">
                        No bundles found. Create one to get started. (If creating fails, check console for permission errors).
                    </div>
                )}
            </div>
        </div>
    );
}
